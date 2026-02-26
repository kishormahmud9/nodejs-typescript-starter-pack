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

const userRegister = catchAsync(async(req,res,next)=>{
  const payload = req.body;
  const user = await authServices.registerUser(payload);
  sendResponse(res,{
    success:true,
    message:"User registered successfully",
    statusCode:201,
    data:user,
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



export const authControllers = {
  userLogin,
  userRegister,
  userLogout,
  userForgotPassword,
  userVerifyOTP
}