import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Cookies from "js-cookie";
import { request } from "../config/request";
import { toast } from "react-toastify";
import { saveState } from "../config/storage";

const loginSchema = z.object({
  email: z.string().email("Please enter your email in the correct format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const Login = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const submit = (data) => {
    request
      .post("/login", data)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          const userData = {
            accessToken: res.data.accessToken,
            user: res.data.user
          };
          saveState("user", userData);
          toast.success("Login successful!");
          navigate("/app", {
            replace: true,
          });
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Invalid credentials");
        console.error("Login error:", error);
      });
  };

  return (
    <>
      <div className="absolute w-[400px] p-[20px] text-white rounded-md bg-blue-900 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <h1 className="text-[30px] font-medium text-white text-center">
          Login
        </h1>
        <form
          className="mt-[20px] flex flex-col gap-4"
          onSubmit={handleSubmit(submit)}
        >
          <div className="mt-[20px]">
            <input
              className="p-[10px] w-full text-black placeholder:text-gray-500"
              type="email"
              {...register("email")}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="mt-[20px]">
            <input
              className="p-[10px] w-full text-black placeholder:text-gray-500"
              type="password"
              {...register("password")}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 mt-1 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <p>Don't have an account?</p>
            <Link to="/register" className="flex items-center gap-2">
              <p className="text-red-500 text-[18px] font-medium hover:text-red-400">Sign Up</p>
            </Link>
          </div>
          <button className="bg-green-500 p-[10px] mt-[20px] w-full rounded-md text-[20px] font-medium hover:bg-green-600 transition-colors">
            Login
          </button>
        </form>
      </div>
    </>
  );
};
