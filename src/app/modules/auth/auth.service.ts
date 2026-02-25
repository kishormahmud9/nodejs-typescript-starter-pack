
import { prisma } from "../../db_connection";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";


const db = prisma as any;

const loginUser = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;

  const user = await db.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (user.isBlocked) {
    throw new ApiError(httpStatus.FORBIDDEN, "User is blocked");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  return user
};

const registerUser = async (payload: {
  name: string;
  email: string;
  password: string;
  contactNo: string;
}) => {
  const existing = await db.user.findUnique({
    where: { email: payload.email },
    select: { id: true },
  });
  if (existing) {
    throw new ApiError(httpStatus.CONFLICT, "Email already exists");
  }

  const hashed = await bcrypt.hash(payload.password, 8);

  const created = await db.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashed,
      contactNo: payload.contactNo,
      isBlocked: false,
    },
  });

 return created
};

export const authServices = { loginUser, registerUser };
