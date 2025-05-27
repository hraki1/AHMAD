import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { motion, useAnimate } from "framer-motion";

const Modal = ({ children, open }) => {
  const [scope, animate] = useAnimate();

  const modalRoot = document.getElementById("root-modal");

  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (open) {
      scope.current?.showModal();
      requestAnimationFrame(() => {
        setShouldAnimate(true);
      });
    } else {
      setShouldAnimate(false); // triggers exit animation (if needed)
      animate(scope.current, { y: 100, opacity: 0 }, { duration: 0.3 });
      setTimeout(() => {
        scope.current?.close();
      }, 300);
    }
  }, [animate, open, scope]);

  if (!modalRoot) return null;

  console.log(open);
  console.log("");  

  return createPortal(
    <motion.dialog
      id="modal"
      style={{ zIndex: 9999, backgroundColor: 'rgb(27 49 84)' }} // هنا
      ref={scope}
        className=" col-12 col-md-6  rounded-4   text-white shadow border border-secondary"
      initial={{ y: 100, opacity: 0 }}
      animate={shouldAnimate ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
      transition={{ duration: 0.5 }}
      exit={!shouldAnimate ? { y: 100, opacity: 0 } : { y: 0, opacity: 1 }}
    >
      {children}
    </motion.dialog>,
    modalRoot
  );
};

export default Modal;
