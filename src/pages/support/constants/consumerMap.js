export const COLOR_MAP = [
  "rgba(255, 111, 49, 1)", // 1위
  "rgba(53, 171, 255, 1)", // 2위
  "rgba(155, 213, 255, 1)", // 3위
  "rgba(233, 246, 255, 1)", // 4위
  "rgba(255, 255, 255, 1)", // 5위
];

export const SPEECH_BUBBLE_MAP = {
  일자리제공형: "누군가의 일자리를\n지킨 따뜻한 소비를\n하셨군요!",
  지역사회공헌형: "지역을 아끼는 마음,\n소비로 보여주셨네요!",
  사회서비스제공형: "돌봄과 배려가 필요한 곳에,\n당신의 소비가 닿았어요.",
  혼합형: "다양한 사회문제를 동시에 돕는\n멋진 소비를 하셨네요!",
  "기타(창의ㆍ혁신)형": "사회에 선한 영향을 준\n당신의 소비, 함께 기억할게요.",
  예비형: "예비 사회적 기업에\n 선한 영향을 준\n 당신의 소비, 함께 기억할게요.",
};

export const KOR_TO_ENUM_MAP = {
  일자리제공형: "JOB_PROVISION",
  사회서비스제공형: "SOCIAL_SERVICE",
  혼합형: "MIXED",
  "기타(창의ㆍ혁신)형": "ETC",
  지역사회공헌형: "COMPANY_CONTRIBUTION",
  예비형: "PRE",
};

export const ENUM_TO_KOR_MAP = {
  JOB_PROVISION: "일자리제공형",
  SOCIAL_SERVICE: "사회서비스제공형",
  MIXED: "혼합형",
  ETC: "기타(창의ㆍ혁신)형",
  COMPANY_CONTRIBUTION: "지역사회공헌형",
  PRE: "예비형",
};
