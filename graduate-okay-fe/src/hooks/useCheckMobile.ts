import { useState, useEffect } from "react";

/**
 * 윈도우 사이즈를 체크하는 유틸 함수
 * @returns {number} 윈도우 innerwidth
 */
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
