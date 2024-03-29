import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

interface StarRateProps {
  score?: number;
}

const StarRate: React.FC<StarRateProps> = ({ score }) => {
  const rate = score;
  const AVG_RATE = rate ? rate : 0;
  const STAR_IDX_ARR = ["first", "second", "third", "fourth", "last"];
  const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);
  const calcStarRates = useCallback(() => {
    let tempStarRatesArr = [0, 0, 0, 0, 0];
    let starVerScore = (AVG_RATE * 70) / 5;
    let idx = 0;
    while (starVerScore > 14) {
      tempStarRatesArr[idx] = 14;
      idx += 1;
      starVerScore -= 14;
    }
    tempStarRatesArr[idx] = starVerScore;
    return tempStarRatesArr;
  }, [AVG_RATE]);

  useEffect(() => {
    setRatesResArr(calcStarRates());
  }, [AVG_RATE, calcStarRates]);

  return (
    <StarRateWrap>
      {STAR_IDX_ARR.map((item: string, idx: number) => {
        return (
          <span key={`${item}_${idx}_${score}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="23"
              viewBox="0 0 14 13"
              fill="#cacaca"
            >
              <clipPath id={`${item}StarClip${score}`}>
                <rect width={`${ratesResArr[idx]}`} height="39" />
              </clipPath>
              <path
                id={`${item}Star${score}`}
                d="M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z"
                transform="translate(-2 -2)"
              />
              <use
                clipPath={`url(#${item}StarClip${score})`}
                href={`#${item}Star${score}`}
                fill="#966fd6"
              />
            </svg>
          </span>
        );
      })}
    </StarRateWrap>
  );
};

export default StarRate;

const StarRateWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
