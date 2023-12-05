# <img width = "100%" src = "https://user-images.githubusercontent.com/75983289/164976416-004d3626-3a5c-4eb5-95d6-e94d1833a392.png"/>
한신대학교 재학생 누구나 본인의 졸업요건을 조회할 수 있는 웹사이트v2 <br/>
[기존 프로젝트](https://github.com/Graduate-Ok/Graduation-Okay-)를 v2로 타입스크립트로 마이그레이션 및 기능 개선

[![Netlify Status](https://api.netlify.com/api/v1/badges/6789c66e-df70-4553-9451-84c768d4853e/deploy-status)](https://app.netlify.com/sites/graduate-okay/deploys)

| [졸업가능 서비스 바로가기](https://graduate-okay.netlify.app) | 
|:---:|

## 프로젝트 개요 👀
#### 프로젝트 선정 이유
1. 기존 한신대학교 졸업사정 셀프 테스트는 졸업 예정자인 학우들만 결과를 확인할 수 있음
2. 학과 사무실에 셀프 테스트 양식을 작성하여 직접 제출해야함
3. 학과/학번별로 졸업요건이 상이하기 때문에 졸업요건을 정확하게 파악하기 어려움
4. 졸업사정 셀프 테스트 결과를 조교가 직접 체크해야 하기 때문에 결과지를 받는 데 많은 시간이 소요됨
#### 프로젝트 목적 및 기대효과
1. 학우들이 웹 사이트에서 학업성적확인서 PDF만 올려서 빠르고 간편하게 본인의 졸업요건을 파악하고 부족한 부분을 알 수 있게 도와줌
2. 조교들은 졸업 요건을 확인하는 업무를 하지 않아도 되기 때문에 업무 부담이 줄어서 다른 업무에 보다 더 집중할 수 있음
3. 타 대학도 기존 우리 학교와 졸업 요건 확인을 수기로 하기 때문에 이 프로젝트를 통해 정확한 결과 도출 및 시간 절약을 할 수 있는 기대효과

## FE TEAM 🧐

<table border>
  <tbody>
    <tr>
      <td align="center" width="200px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/75983289?v=4"  alt=""/>
        프론트엔드<br/>
        <a href="https://github.com/pangkyu">
          <img src="https://img.shields.io/badge/팡규-000000?style=flat-round&logo=GitHub&logoColor=white"/>
        </a>
      </td>
     </tr>
  </tbody>
</table>

## 개선 기능 💡 

<details>
<summary>검색 시 디바운싱 적용</summary>

## 디바운싱 적용
검색 기능 사용 시, input으로 값이 들어올 때마다 API를 호출하는 문제가 발생했습니다. <br/>
이를 해결하기 위해 따로 버튼을 누르지 않아도 검색이 되도록 구현 방향을 잡았습니다. <br/>
`Debounce`를 적용하여 입력을 측정하여 일정 시간이 넘기전에 입력을 받으면 API호출을 하지 않도록 작성했습니다.<br/>

![디바운싱 적용후](https://github.com/Graduate-Okay/Graduate-Okay-FE/assets/75983289/3dd7d168-3882-4fcf-becd-0490d78b010d) 
```ts
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};
```

</details>

<details>
<summary>반응형 웹</summary>

## 반응형 웹 적용
다양한 기기에서 동일한 사용자 경험을 제공하고자 미디어 쿼리와 윈도우 크기를 받아와 반응형 디자인을 적용했습니다.
  
![반응형 웹 적용](https://github.com/Graduate-Okay/Graduate-Okay-FE/assets/75983289/065fa207-1d04-4c9f-bf24-3cbb5bbf48c3)
```ts
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
```
```ts
const deviceSizes = {
  mobile: 375,
  tablet: 768,
  laptop: 1024,
  largeLaptop: 1440,
};

const device = {
  mobile: `screen and (min-width : ${deviceSizes.mobile}px)`,
  tablet: `screen and (min-width : ${deviceSizes.tablet}px)`,
  laptop: `screen and (min-width : ${deviceSizes.laptop}px)`,
  largeLaptop: `screen and (min-width : ${deviceSizes.largeLaptop}px)`,
};

const theme = {
  device,
  deviceSizes,
  colors,
  fonts,
};
```

</details>

## UI

<details>
<summary>메인 페이지</summary>

## 메인 페이지 

왼쪽 : 모바일, 오른쪽 : 테블릿 이상 사이즈

<table border>
  <tbody>
    <tr>
      <td align="center" width="50%">
        <img src = 'https://github.com/Graduate-Okay/Graduate-Okay-FE/assets/75983289/6ebd7319-efc0-4359-96bd-3b8d65158aa0' alt='gif' />
      </td>
      <td align="center" width="50%">
        <img src = 'https://github.com/Graduate-Okay/Graduate-Okay-FE/assets/75983289/0a39d6c1-aac2-446b-ad71-ed3c9959fa21'  alt='gif' />   
      </td>
     </tr>
  </tbody>
</table>

</details>

<details>
<summary>공지사항 페이지</summary>
  
## 공지사항 페이지
<table border>
  <tbody>
    <tr>
      <td align="center" width="50%">
        <img src = 'https://github.com/Graduate-Okay/Graduate-Okay-FE/assets/75983289/d6e0f781-9002-4c12-b82a-3d86360ae2b1' alt='gif' />
      </td>
     </tr>
  </tbody>
</table>
</details>

<details>
<summary>인기교양추천 페이지</summary>
  
## 인기교양추천 페이지
<table border>
  <tbody>
    <tr>
      <td align="center" width="50%">
        <img src = '' alt='gif' />
      </td>
     </tr>
  </tbody>
</table>
</details>

<details>
<summary>졸업요건조회 페이지</summary>
  
## 졸업요건조회 페이지
<table border>
  <tbody>
    <tr>
      <td align="center" width="50%">
        <img src = '' alt='gif' />
      </td>
     </tr>
  </tbody>
</table>
</details>

<details>
<summary>마이 페이지</summary>
  
## 로그인 & 마이 페이지
<table border>
  <tbody>
    <tr>
      <td align="center" width="50%">
        <img src = '' alt='gif' />
      </td>
     </tr>
  </tbody>
</table>
</details>

## 유즈케이스
![제목 없는 다이어그램 drawio](https://github.com/Graduate-Okay/Graduate-Okay-FE/assets/75983289/8fd77727-4bb4-45e9-80e2-1d406292f136)



## 로컬 환경 테스트
```terminal
git clone https://github.com/Graduate-Okay/Graduate-Okay-FE.git
yarn install
yarn start
```

## FE STACK 🛠
 <div align=left> 
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">    
  <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">    
  <br/>
  
  <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=Netlify&logoColor=white"> 
  <img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <br>
</div>

