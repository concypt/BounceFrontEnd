import React, { useEffect, useState } from "react";

function Preloader() {
  return (
    <div>
      <div id="preloader">
        <div className="new-animated-preloader">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Preloader;
