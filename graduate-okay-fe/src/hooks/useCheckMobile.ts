import { useState, useEffect } from "react";

const useCheckMobile = () => {
  const [checkMobile, setCheckMobile] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  const handleResize = () => {
    setCheckMobile(window.innerWidth);
  };

  return checkMobile;
};
export default useCheckMobile;
