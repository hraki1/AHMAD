import { motion } from "framer-motion";

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center mt-5" style={{ height: "100%" }}>
      <motion.div
        className="spinner-border text-primary"
        role="status"
        style={{ width: "3rem", height: "3rem", borderWidth: "0.3em" }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
      >
        <span className="visually-hidden">Loading...</span>
      </motion.div>
    </div>
  );
};

export default Spinner;
