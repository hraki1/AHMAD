import React, { useEffect, useState } from "react";

export default function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Swap To Top When Click */
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      id="site-scroll"
      onClick={handleClick}
      style={{ display: visible ? "block" : "none", cursor: "pointer" }}
    >
      <i className=" fa-solid fa-arrow-up"></i>
    </div>
  );
}
