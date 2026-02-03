import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  // Show button when user scrolls down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      <div>
        {
          visible &&
        <div className='flex items-center justify-center animate-bounce'
        onClick={scrollToTop}
         style={{
          position: "fixed",
          bottom: "80px",
          right: "20px",
          height: "50px",
          width: "50px",
          borderRadius: "50%",
          backgroundColor: "#333",
          color: "#fff",
          border: "none",
          outline: "none",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
          zIndex: 1000,
        }}
        >
          {/* {visible && ( */}
            <button
              onClick={scrollToTop}
              style={{
                cursor: "pointer",
              }}
              title="Scroll to Top"
            >
              <FaArrowUp />
            </button>
          {/* )} */}
        </div>
        }
      </div>
    </>
  );
};

export default ScrollToTopButton;
