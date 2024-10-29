import Footer from "@/components/Designs/Footer";
import Navbar from "@/components/Designs/Navbar";
import GetLiquidityPoolCreatedByUser from "@/components/GetLiquidityPoolCreatedByUser";
import React from "react";

const liquiditypoolbyuser = () => {
  return (
    <div>
      <Navbar />
      <GetLiquidityPoolCreatedByUser />
      <Footer />
    </div>
  );
};

export default liquiditypoolbyuser;
