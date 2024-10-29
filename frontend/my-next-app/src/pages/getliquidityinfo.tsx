import Footer from "@/components/Designs/Footer";
import Navbar from "@/components/Designs/Navbar";
import GetCurrentLiquidity from "@/components/GetCurrentLiquidity";
import React from "react";

const getliquidityinfo = () => {
  return (
    <div>
      <Navbar />
      <GetCurrentLiquidity />
      <Footer />
    </div>
  );
};

export default getliquidityinfo;
