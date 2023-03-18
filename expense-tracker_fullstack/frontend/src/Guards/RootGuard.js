import AuthGuard from "./AuthGuard";
import React from "react";

const RootGuard = ({ children }) => {
  return <AuthGuard>{children}</AuthGuard>;
};

export default RootGuard;