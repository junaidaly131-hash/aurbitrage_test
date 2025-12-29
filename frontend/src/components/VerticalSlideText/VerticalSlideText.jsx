import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VerticalSlideText = ({ value }) => {
  const [prevValue, setPrevValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (prevValue !== value) {
        setPrevValue(value);
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <AnimatePresence>
      <motion.span
        key={value}
        initial="initial"
        animate="animate"
        sx={{ justifyContent: "center" }}
      >
        <motion.div
          variants={{
            initial: { y: "50%" },
            animate: { y: "-100%" },
          }}
          transition={{
            ease: "easeInOut",
            duration: 1,
          }}
        >
          {prevValue}
        </motion.div>
        <motion.div
          sx={{ position: "absolute", inset: 0 }}
          variants={{
            initial: { y: "100%" },
            animate: { y: "-50%" },
          }}
          transition={{
            ease: "easeInOut",
            duration: 1,
          }}
        >
          {value}
        </motion.div>
      </motion.span>
    </AnimatePresence>
  );
};

export default VerticalSlideText;
