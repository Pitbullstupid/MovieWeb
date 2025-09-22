// src/components/AnimatedPage.jsx
import { motion } from "framer-motion";
import { useNavigationType } from "react-router-dom";

const AnimatedPage = ({ children }) => {
  const navigationType = useNavigationType();

  // Xác định hướng hiệu ứng dựa vào navigationType
  const isBack = navigationType === "POP";

  const variants = {
    initial: { 
      opacity: 0, 
      x: isBack ? -80 : 80,   
      scale: 0.98             
    },
    animate: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { duration: 0.45, ease: "easeInOut" }
    },
    exit: { 
      opacity: 0, 
      x: isBack ? 80 : -80, 
      scale: 0.98,
      transition: { duration: 0.35, ease: "easeInOut" }
    }
  };

  return (
    <motion.div
      className="absolute inset-0 min-h-screen bg-[#272A39] will-change-transform"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
