import UserGuestAuthGuard from "@/hoc/UserGuestAuthGuard";
import React from "react";

const cart = () => {
  return <div>cart</div>;
};

export default UserGuestAuthGuard(cart);
