import React from "react";
import LargeNav from "./LargeNav";
import SmallNav from "./SmallNav";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import CartPopUp from "../CartPopUp";

export default function NavContainer() {
  const isTablet = useMediaQuery({
    query: "(min-width: 955px)",
  });

  return (
    <nav
      className={`flex items-center justify-between h-24  shadow-xl nav-text min-w-max `}
    >
      <Link to="/home">
        <div className="ml-4 lg:ml-16 logo-text">Stop Shop</div>
      </Link>

      {isTablet ? <LargeNav /> : <SmallNav />}
      <CartPopUp />
    </nav>
  );
}
