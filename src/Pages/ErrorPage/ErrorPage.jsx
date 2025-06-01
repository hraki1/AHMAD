import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Frown } from "lucide-react";

import Header from "../../Components/layout/Header/Header";
import TopHeader from "../../Components/layout/Header/TopHeader";

const ErrorPage = () => {
  return (
    <>
      <TopHeader />
      <Header />
      <motion.div
        className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark text-white px-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          background:
            "linear-gradient(to bottom right, #0f172a, #1e293b, #4b0082)",
        }}
      >
        <motion.div
          className="text-center"
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Frown size={80} className="text-primary mb-4 text-white" />
          <h1 className="display-1 text-white fw-bold mb-2">404</h1>
          <p className="fs-4 mb-4 text-info">Oops! There is Error occured!</p>
          <Link to="/" className="btn btn-primary btn-lg shadow">
            Go to Store
          </Link>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ErrorPage;
