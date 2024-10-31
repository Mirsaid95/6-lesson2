import React from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const MainLayout = () => {
  const user = Cookies.get("user");
  if (!user) {
    return <Navigate replace={true} to={"/"} />;
  }

  return (
    <>
      <header className="p-5 bg-blue-500">
        <div className="max-w-[1240px] mx-auto">
          <h1 className="text-[20px] font-medium text-white">CRUD</h1>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

