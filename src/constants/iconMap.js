export const categoryIconMap = {
  일자리제공형: "/svgs/type/Ic_Type_Work.svg",
  사회서비스제공형: "/svgs/type/Ic_Type_Service.svg",
  지역사회공헌형: "/svgs/type/Ic_Type_Region.svg",
  혼합형: "/svgs/type/Ic_Type_Intersection.svg",
  "기타(창의ㆍ혁신)형": "/svgs/type/Ic_Type_Etc.svg",
  예비: "/svgs/type/Ic_Type_Pre.svg",
};
export const businessTypeIconMap = {
  카페: "/svgs/categoryBar/Ic_Cafe.svg",
  음식점: "/svgs/categoryBar/Ic_Restaurent.svg",
  쇼핑: "/svgs/categoryBar/Ic_Shopping.svg",
  복합공간: "/svgs/categoryBar/Ic_Community.svg",
  "문화/예술": "/svgs/categoryBar/Ic_Culture_Artistry.svg",
  생활서비스: "/svgs/categoryBar/Ic_LivingService.svg",
  "교육/지원": "/svgs/categoryBar/Ic_Education.svg",
  "IT/디지털": "/svgs/categoryBar/Ic_IT_Digital.svg",
  "제조/운송": "/svgs/categoryBar/Ic_Manufacturing_Transportation.svg",
  기타: "/svgs/categoryBar/Ic_Etc.svg",
};

export const categoryNameMap = {
  CAFE: "카페",
  RESTAURANT: "음식점",
  SHOPPING: "쇼핑",
  COMPLEX_SPACE: "복합공간",
  CULTURE_ART: "문화/예술",
  LIVING_SERVICE: "생활서비스",
  EDUCATION: "교육/지원",
  IT_DIGITAL: "IT/디지털",
  MANUFACTURING_TRANSPORTATION: "제조/운송",
  ETC: "기타",
};

// 한글 → 영문 역변환
export const reverseCategoryNameMap = Object.fromEntries(
  Object.entries(categoryNameMap).map(([en, ko]) => [ko, en]),
);
