import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

// eslint-disable-next-line react/prop-types
function Reveal({
  // eslint-disable-next-line react/prop-types
  children,
  // eslint-disable-next-line react/prop-types
  width = "fit-content",
  // eslint-disable-next-line react/prop-types
  delay = "0.25",
  // eslint-disable-next-line react/prop-types
  duration = "0.25",
  // eslint-disable-next-line react/prop-types
  y = 75,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      //fire
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: y },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: duration, delay: delay }}
      >
        {" "}
        {children}{" "}
      </motion.div>
    </div>
  );
}
export default Reveal;
