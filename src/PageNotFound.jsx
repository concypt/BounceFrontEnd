import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function PageNotFound() {
  return (
    <>
      <Navbar />
      <div className="not_found bounce_bg_circle">
        <h1>Error 404: Not found</h1>
      </div>
      <Footer />
    </>
  );
}

export default PageNotFound;
