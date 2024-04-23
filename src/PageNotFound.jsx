import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function PageNotFound() {
  return (
    <>
      <Navbar />
      <h1>Error 404: Not found</h1>
      <Footer />
    </>
  );
}

export default PageNotFound;
