import { Outlet } from "react-router-dom";
import ScrollToTop from "../common/ScrollToTop";

const MinimalLayout = () => {
  return (
    <div className="App">
      <ScrollToTop />
      <Outlet />
    </div>
  );
};

export default MinimalLayout;
