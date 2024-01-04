import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";

const LoginFail = () => {
    useEffect(() => {
        alert("로그인에 실패하였습니다.");
    }, [])
  return (
    <>
   <LoginForm/>
    </>
  );
};

export default LoginFail;
