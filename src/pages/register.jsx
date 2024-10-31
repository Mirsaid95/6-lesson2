import React from "react";
import { useForm } from "react-hook-form";
import { request } from "../config/request";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter your email in the correct format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const submit = (data) => {
    request
      .post("/register", data)
      .then((res) => {
        if (res.status == 200 || res.status > 200) {
          navigate("/");
        }
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  return (
    <div className="absolute w-[400px] p-[20px] text-white rounded-md bg-blue-900 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <h1 className="text-[30px] font-medium text-white text-center">
        Register
      </h1>
      
      <form
        className="mt-[20px] flex flex-col gap-4"
        onSubmit={handleSubmit(submit)}
      >
        <div className="mt-[20px]">
          <input
            className="p-[10px] w-full placeholder:text-black text-black"
            type="text"
            {...register("name")}
            placeholder="name"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="mt-[20px]">
          <input
            className="p-[10px] w-full placeholder:text-black text-black"
            type="email"
            {...register("email")}
            placeholder="email"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className="mt-[20px]">
          <input
            className="p-[10px] w-full placeholder:text-black text-black"
            type="password"
            {...register("password")}
            placeholder="password"
          />
        </div>
        <div className="link flex items-center gap-3 text-center w-full">
            <p className="text-red-500">If you have an account, click the </p>
            <Link to="/" className="text-[18px] text-white font-medium hover:text-green-500">Sign In</Link>
        </div>
        <button className="bg-green-500 p-[10px] mt-[20px] w-full rounded-md text-[20px] font-medium">
          Submit
        </button>
      </form>
    </div>
  );
};
