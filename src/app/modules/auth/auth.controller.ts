import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { setCookie } from "../../utils/setCookie";
import { createUserToken } from "../../utils/userToken";
import { authServices } from "./auth.service";

const userLogin = catchAsync(async(req,res,next)=>{
    const {email,password} = req.body;
    const user = await authServices.loginUser({email,password});
    const token = await createUserToken(user)
   await setCookie(res,token)
   sendResponse(res,{
    success:true,
    message:"User logged in successfully",
    statusCode:200,
    data:token,
   })
})

const createCustomer = catchAsync(async(req,res,next)=>{
  const payload = req.body;
  const result = await authServices.registerCustomer(payload);
  sendResponse(res,{
    success:true,
    message:"Customer registered successfully",
    statusCode:201,
    data:result,
  })
})

const createEmployee = catchAsync(async(req,res,next)=>{
  const payload = req.body;
  const result = await authServices.registerEmployee(payload);
  sendResponse(res,{
    success:true,
    message:"Employee registered successfully",
    statusCode:201,
    data:result,
  })
})

const userLogout = catchAsync(async(req,res,next)=>{
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  })
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  })
  sendResponse(res,{
    success:true,
    message:"User logged out successfully",
    statusCode:200,
    data:null,
  })
})

const userForgotPassword = catchAsync(async(req,res,next)=>{
  const {email} = req.body;
  await authServices.forgotPassword_sendPassword(email);
  sendResponse(res,{
    success:true,
    message:"Password reset email sent successfully",
    statusCode:200,
    data:null,
  })
})


const userVerifyOTP = catchAsync(async(req,res,next)=>{
  const {email,otp} = req.body;
  const isOTPValid = await authServices.verifyOTP(email,otp);
  sendResponse(res,{
    success:true,
    message:"OTP verified successfully",
    statusCode:200,
    data:isOTPValid,
  })
})

const userChangePassword = catchAsync(async(req,res,next)=>{
  const {newPassword} = req.body;
  const email = req?.body?.email as string;
  await authServices.changePassword(newPassword,email);
  sendResponse(res,{
    success:true,
    message:"Password changed successfully",
    statusCode:200,
    data:null,
  })
})



export const authControllers = {
  userLogin,
  createCustomer,
  createEmployee,
  userLogout,
  userForgotPassword,
  userVerifyOTP,
  userChangePassword,
}
