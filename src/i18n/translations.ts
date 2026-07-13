export type Lang = "ko" | "en";
export type CategorySlug = "text" | "calculator" | "converter" | "generator" | "developer" | "electronics" | "image";

export const languages: Lang[] = ["ko", "en"];

export const categorySlugs: CategorySlug[] = ["text", "calculator", "converter", "generator", "developer", "electronics", "image"];

export const baseTools = [
  { slug: "character-counter", category: "text", privacy: true },
  { slug: "remove-spaces", category: "text", privacy: true },
  { slug: "case-converter", category: "text", privacy: true },
  { slug: "percent-calculator", category: "calculator" },
  { slug: "discount-calculator", category: "calculator" },
  { slug: "vat-calculator", category: "calculator" },
  { slug: "date-calculator", category: "calculator" },
  { slug: "dday-calculator", category: "calculator" },
  { slug: "age-calculator", category: "calculator" },
  { slug: "bmi-calculator", category: "calculator" },
  { slug: "unit-converter", category: "converter" },
  { slug: "unix-timestamp-converter", category: "converter" },
  { slug: "pyeong-calculator", category: "converter" },
  { slug: "password-generator", category: "generator", privacy: true },
  { slug: "random-number-generator", category: "generator" },
  { slug: "lotto-number-generator", category: "generator" },
  { slug: "random-string-generator", category: "generator", privacy: true },
  { slug: "uuid-generator", category: "generator" },
  { slug: "qr-code-generator", category: "generator", privacy: true },
  { slug: "json-formatter", category: "developer", privacy: true },
  { slug: "base64-converter", category: "developer", privacy: true },
  { slug: "url-encoder-decoder", category: "developer", privacy: true },
  { slug: "csv-json-converter", category: "developer", privacy: true },
  { slug: "margin-calculator", category: "calculator" },
  { slug: "compound-interest-calculator", category: "calculator" },
  { slug: "loan-interest-calculator", category: "calculator" },
  { slug: "salary-net-calculator", category: "calculator" },
  { slug: "ohms-law-calculator", category: "electronics" },
  { slug: "led-resistor-calculator", category: "electronics" },
  { slug: "voltage-divider-calculator", category: "electronics" },
  { slug: "battery-life-calculator", category: "electronics" },
  { slug: "resistor-color-code-calculator", category: "electronics" },
  { slug: "capacitance-converter", category: "electronics" },
  { slug: "series-parallel-resistor-calculator", category: "electronics" },
  { slug: "filter-calculator", category: "electronics" },
  { slug: "awg-wire-size-converter", category: "electronics" },
  { slug: "dbm-watt-converter", category: "electronics" },
  { slug: "frequency-wavelength-converter", category: "electronics" },
  { slug: "rc-time-constant-calculator", category: "electronics" },
  { slug: "reactance-calculator", category: "electronics" },
  { slug: "image-resizer", category: "image", privacy: true },
  { slug: "image-compressor", category: "image", privacy: true },
  { slug: "webp-converter", category: "image", privacy: true },
  { slug: "image-cropper", category: "image", privacy: true },
  { slug: "image-rotate-flip", category: "image", privacy: true },
  { slug: "image-format-converter", category: "image", privacy: true },
  { slug: "image-mosaic", category: "image", privacy: true },
  { slug: "image-watermark", category: "image", privacy: true },
  { slug: "remove-image-metadata", category: "image", privacy: true },
  { slug: "image-color-picker", category: "image", privacy: true },
  { slug: "text-compare", category: "text", privacy: true },
] as const;

export type ToolSlug = (typeof baseTools)[number]["slug"];

type ToolText = {
  name: string;
  description: string;
  seoTitle?: string;
  intro: string;
  usage: string[];
  examples: string[];
  basis?: string;
  faq: { question: string; answer: string }[];
};

const koFaq = (name: string) => [
  { question: `${name} 입력값을 저장하나요?`, answer: "아니요. 입력한 내용은 서버에 저장하지 않으며 가능한 처리는 브라우저 안에서 끝납니다." },
  { question: "모바일에서도 쓸 수 있나요?", answer: "네. PC와 모바일 화면에서 모두 사용할 수 있도록 반응형으로 구성했습니다." },
  { question: "결과를 그대로 사용해도 되나요?", answer: "간단한 확인용으로 쓰기 좋습니다. 중요한 판단에는 별도 검토가 필요합니다." },
];

const enFaq = (name: string) => [
  { question: `Does ${name} save my input?`, answer: "No. Your input is not stored on a server. Supported actions run in your browser." },
  { question: "Can I use it on mobile?", answer: "Yes. The pages are responsive and work on desktop and mobile browsers." },
  { question: "Can I rely on the result?", answer: "Use the result as a quick reference. Important work should be checked separately." },
];

export const i18n = {
  ko: {
    siteName: "Toolbox",
    nav: {
      all: "전체",
      text: "텍스트",
      calculator: "계산기",
      converter: "변환기",
      generator: "생성기",
      developer: "개발자",
      electronics: "전자",
      image: "이미지",
      languageSwitch: "EN",
    },
    home: {
      title: "Toolbox - 무료 웹 도구 모음",
      description: "글자수 세기, 퍼센트 계산기, 날짜 계산기, 비밀번호 생성기 등 자주 쓰는 온라인 도구를 설치 없이 사용할 수 있습니다.",
      label: "무료 온라인 도구",
      h1: "무료 웹 도구 모음",
      body1: "글자수 세기, 퍼센트 계산기, 날짜 계산기, 비밀번호 생성기 등 자주 쓰는 온라인 도구를 설치 없이 사용할 수 있습니다.",
      body2: "입력한 내용은 서버로 전송하지 않고 현재 브라우저에서 처리합니다.",
      button: "모든 도구 보기",
      frequent: "자주 쓰는 도구",
      categories: "도구 카테고리",
      featured: "추천 도구",
    },
    common: {
      freeTool: "무료 온라인 도구",
      usage: "사용 방법",
      examples: "예시",
      basis: "계산 및 변환 기준",
      basisText: "이 도구는 입력값을 브라우저에서 즉시 처리합니다. 숫자 계산 도구는 소수점 반올림이 포함될 수 있으므로 중요한 업무에는 원본 기준을 함께 확인하세요.",
      privacyNote: "입력한 내용은 서버로 전송되지 않으며, 브라우저 안에서만 처리됩니다.",
      imagePrivacyNote: "선택한 이미지는 서버로 업로드되지 않으며, 현재 브라우저 안에서만 처리됩니다.",
      relatedTools: "관련 도구",
      ad: "광고 영역",
      toolsTitle: "전체 도구",
      toolsDescription: "계산기, 변환기, 텍스트 도구, 전자 계산기, 이미지 도구를 설치와 로그인 없이 사용할 수 있습니다. 각 도구 페이지에는 사용 방법, 예시, FAQ가 포함되어 있습니다.",
      categoryView: "카테고리 보기",
    },
    footer: {
      text: "계산기, 변환기, 텍스트 도구를 모은 무료 온라인 도구 사이트입니다.",
    },
    categories: {
      text: { name: "텍스트 도구", description: "글자수 확인, 단어수 계산, 공백 제거, 대소문자 변환을 바로 사용할 수 있습니다." },
      calculator: { name: "계산기", description: "퍼센트, 할인율, 부가세, 날짜, BMI, 마진율, 복리, 대출 이자를 간단히 계산합니다." },
      converter: { name: "변환기", description: "온도, 길이, 무게, 평수, 시간 값을 필요한 형식으로 변환합니다." },
      generator: { name: "생성기", description: "비밀번호, 랜덤 숫자, 랜덤 문자, UUID, QR 코드, 로또 번호를 바로 생성합니다." },
      developer: { name: "개발자 도구", description: "JSON, Base64, URL 인코딩, CSV/JSON 변환 작업을 빠르게 처리합니다." },
      electronics: { name: "전자 계산기", description: "옴의 법칙, 전압 분배기, LED 저항, 배터리 수명, RC/RL 필터, 리액턴스처럼 전자 회로에서 자주 쓰는 값을 계산합니다." },
      image: { name: "이미지 도구", description: "이미지 크기 변경, 용량 압축, 자르기, 회전, 모자이크, 워터마크, 포맷 변환처럼 자주 필요한 이미지 작업을 브라우저에서 처리합니다." },
    },
    tools: {
      "character-counter": { name: "글자수 세기", description: "입력한 글의 글자수, 공백 제외 글자수, 단어수, 줄 수를 바로 확인합니다.", intro: "자기소개서, 블로그 글, 광고 문구처럼 글자수 제한이 있는 문장을 빠르게 점검할 수 있습니다.", usage: ["텍스트 입력창에 내용을 붙여넣습니다.", "공백 포함/제외 글자수, 단어수, 줄 수를 확인합니다.", "필요하면 결과를 복사하거나 입력값을 초기화합니다."], examples: ["자기소개서 500자 제한 확인", "블로그 원고의 단어수와 줄 수 점검"], faq: koFaq("글자수 세기") },
      "remove-spaces": { name: "공백 제거기", description: "불필요한 공백, 앞뒤 공백, 줄바꿈을 선택해서 제거합니다.", intro: "복사한 텍스트에 섞인 공백과 줄바꿈을 원하는 방식으로 정리할 때 사용합니다.", usage: ["텍스트를 입력합니다.", "공백 처리 방식을 선택합니다.", "정리된 결과를 복사합니다."], examples: ["엑셀에서 복사한 문자열의 앞뒤 공백 제거", "여러 줄 주소를 한 줄로 정리"], faq: koFaq("공백 제거기") },
      "case-converter": { name: "대소문자 변환기", description: "영문 텍스트를 대문자, 소문자, 첫 글자 대문자로 바꿉니다.", intro: "영문 제목, 문장, 코드 식별자를 원하는 대소문자 형태로 바꿀 수 있습니다.", usage: ["영문 텍스트를 입력합니다.", "변환 방식을 선택합니다.", "결과를 복사합니다."], examples: ["문서 제목을 Title Case로 변경", "비교용 텍스트를 모두 소문자로 변환"], faq: koFaq("대소문자 변환기") },
      "percent-calculator": { name: "퍼센트 계산기", description: "비율, 증가율, 감소율을 입력값에 맞춰 계산합니다.", intro: "할인율, 성장률, 비중 계산처럼 자주 쓰는 퍼센트 계산을 세 가지 모드로 처리합니다.", usage: ["계산 모드를 선택합니다.", "A와 B 값을 입력합니다.", "계산 버튼을 눌러 결과를 봅니다."], examples: ["50,000원의 15%는 7,500원", "80에서 100으로 증가하면 25% 증가"], faq: koFaq("퍼센트 계산기") },
      "discount-calculator": { name: "할인율 계산기", description: "정가와 할인율을 입력해 할인 금액과 최종 가격을 확인합니다.", intro: "쇼핑, 견적, 프로모션 가격을 확인할 때 할인 금액과 결제 금액을 빠르게 계산합니다.", usage: ["정가를 입력합니다.", "할인율을 입력합니다.", "할인 금액과 최종 가격을 확인합니다."], examples: ["120,000원 20% 할인가는 96,000원", "35% 쿠폰 적용 후 결제 금액 계산"], faq: koFaq("할인율 계산기") },
      "vat-calculator": { name: "부가세 계산기", description: "공급가, 부가세, 합계 금액을 간단히 계산합니다.", intro: "대한민국 부가세 기본값인 10%를 기준으로 시작하며, 필요하면 세율을 직접 바꿀 수 있습니다.", usage: ["공급가 또는 합계 금액을 입력합니다.", "계산 기준을 선택하고 세율을 확인합니다.", "공급가, 부가세, 합계 금액을 비교합니다."], examples: ["세율 10%에서 공급가 100,000원의 부가세는 10,000원", "세율 10%에서 합계 110,000원의 공급가는 100,000원"], faq: koFaq("부가세 계산기") },
      "date-calculator": { name: "날짜 계산기", description: "두 날짜 사이의 일수와 특정 날짜 기준 전후 날짜를 계산합니다.", intro: "프로젝트 일정, 계약 기간, 마감일처럼 날짜 차이나 기준일 전후 날짜가 필요할 때 사용합니다.", usage: ["계산 모드를 선택합니다.", "달력 또는 일수 입력칸에 값을 넣습니다.", "결과 날짜와 일수 차이를 확인합니다."], examples: ["2026-01-01부터 2026-01-31까지 30일 차이", "기준일에서 100일 뒤 날짜 계산"], faq: koFaq("날짜 계산기") },
      "dday-calculator": { name: "D-day 계산기", description: "목표일까지 남은 날짜나 지난 날짜를 확인합니다.", intro: "시험, 여행, 기념일, 출시일 같은 목표 날짜까지 남은 기간을 간단히 볼 수 있습니다.", usage: ["기준 날짜를 선택합니다.", "목표 날짜를 선택합니다.", "D-day 결과를 확인합니다."], examples: ["시험일까지 D-30 계산", "기념일이 며칠 지났는지 확인"], faq: koFaq("D-day 계산기") },
      "age-calculator": { name: "나이 계산기", description: "생년월일과 기준일로 만 나이를 계산합니다.", intro: "생년월일을 기준으로 오늘 또는 원하는 날짜의 만 나이를 계산합니다.", usage: ["생년월일을 입력합니다.", "기준일을 선택합니다.", "만 나이를 확인합니다."], examples: ["1990-05-10 출생자의 현재 만 나이", "특정 기준일의 나이 계산"], faq: koFaq("나이 계산기") },
      "bmi-calculator": { name: "BMI 계산기", description: "키와 몸무게로 BMI 지수를 계산합니다.", intro: "키와 체중을 입력해 체질량지수를 빠르게 계산합니다.", usage: ["키(cm)를 입력합니다.", "몸무게(kg)를 입력합니다.", "BMI 값과 참고 범위를 봅니다."], examples: ["170cm, 65kg의 BMI 계산", "운동 전후 체중 변화 참고"], faq: koFaq("BMI 계산기") },
      "unit-converter": { name: "단위 변환기", description: "온도, 길이, 무게 단위를 한 화면에서 변환합니다.", intro: "길이, 무게, 온도처럼 자주 쓰는 단위를 브라우저에서 바로 바꿀 수 있습니다.", usage: ["변환 종류를 선택합니다.", "값과 입력 단위, 결과 단위를 고릅니다.", "변환 결과를 확인합니다."], examples: ["1m를 cm로 변환", "섭씨 25도를 화씨로 변환"], faq: koFaq("단위 변환기") },
      "password-generator": { name: "비밀번호 생성기", description: "길이와 문자 옵션을 선택해 랜덤 비밀번호를 만듭니다.", intro: "대문자, 소문자, 숫자, 특수문자 옵션을 조합해 브라우저에서 비밀번호를 생성합니다.", usage: ["길이와 포함할 문자 종류를 선택합니다.", "생성 버튼을 누릅니다.", "강도 표시를 보고 결과를 복사합니다."], examples: ["16자리 특수문자 포함 비밀번호 생성", "헷갈리는 문자를 제외한 비밀번호 만들기"], faq: koFaq("비밀번호 생성기") },
      "random-number-generator": { name: "랜덤 숫자 생성기", description: "최소값, 최대값, 개수를 정해 랜덤 숫자를 생성합니다.", intro: "추첨 번호, 샘플 데이터, 확인용 값이 필요할 때 사용할 수 있습니다.", usage: ["최소값과 최대값을 입력합니다.", "생성 개수를 정합니다.", "생성된 숫자를 확인합니다."], examples: ["1부터 45까지 숫자 6개 생성", "확인용 임의 ID 숫자 만들기"], faq: koFaq("랜덤 숫자 생성기") },
      "uuid-generator": { name: "UUID 생성기", description: "브라우저에서 UUID v4 값을 생성합니다.", intro: "개발 작업이나 고유 식별자에 사용할 UUID v4를 간단히 만들 수 있습니다.", usage: ["생성 개수를 입력합니다.", "생성 버튼을 누릅니다.", "필요한 UUID를 복사합니다."], examples: ["샘플 데이터 ID 생성", "파일명에 쓸 고유값 만들기"], faq: koFaq("UUID 생성기") },
      "qr-code-generator": { name: "QR 코드 생성기", description: "텍스트나 URL을 QR 코드로 생성합니다.", intro: "URL이나 짧은 문구를 QR 코드로 바꿔 화면에서 바로 확인할 수 있습니다.", usage: ["텍스트 또는 URL을 입력합니다.", "생성 버튼을 누릅니다.", "표시된 QR 코드를 확인합니다."], examples: ["웹사이트 주소 QR 코드 생성", "행사 안내 문구 QR 코드 만들기"], faq: koFaq("QR 코드 생성기") },
      "json-formatter": { name: "JSON 정리기", description: "JSON 포맷 정리, 압축, 유효성 검사를 한 번에 처리합니다.", intro: "API 응답이나 설정 JSON을 읽기 쉬운 형태로 정리하고 오류 여부를 확인합니다.", usage: ["JSON 문자열을 입력합니다.", "정리, 압축, 검사 중 필요한 기능을 선택합니다.", "오류 메시지가 나오면 해당 부분을 수정합니다."], examples: ["압축된 API 응답에 들여쓰기 적용", "배포 전 설정 JSON 유효성 검사"], faq: koFaq("JSON 정리기") },
      "base64-converter": { name: "Base64 변환기", description: "텍스트를 Base64로 인코딩하거나 Base64를 텍스트로 디코딩합니다.", intro: "짧은 문자열을 Base64로 바꾸거나 Base64 값을 다시 텍스트로 확인할 수 있습니다.", usage: ["텍스트 또는 Base64 문자열을 입력합니다.", "인코딩 또는 디코딩 버튼을 누릅니다.", "결과를 복사합니다."], examples: ["hello를 aGVsbG8=로 인코딩", "API 샘플의 Base64 값을 텍스트로 디코딩"], faq: koFaq("Base64 변환기") },
      "url-encoder-decoder": { name: "URL 인코더/디코더", description: "URL 문자열을 인코딩하거나 디코딩합니다.", intro: "쿼리 문자열, 한글 URL, 특수문자가 포함된 주소를 브라우저에서 바로 변환합니다.", usage: ["URL 또는 문자열을 입력합니다.", "인코딩 또는 디코딩을 선택합니다.", "변환된 결과를 복사합니다."], examples: ["한글 검색어를 URL 인코딩", "%ED%85%8C%EC%8A%A4%ED%8A%B8 값을 디코딩"], faq: koFaq("URL 인코더/디코더") },
      "unix-timestamp-converter": { name: "Unix Timestamp 변환기", description: "Unix 타임스탬프와 날짜 시간을 서로 변환합니다.", intro: "초 또는 밀리초 단위의 Unix timestamp를 읽기 쉬운 날짜로 바꾸거나 날짜를 timestamp로 변환합니다.", usage: ["변환 모드를 선택합니다.", "timestamp 또는 날짜 시간을 입력합니다.", "초, 밀리초, 로컬 시간을 확인합니다."], examples: ["1704067200을 날짜로 변환", "2026-01-01 00:00을 Unix timestamp로 변환"], faq: koFaq("Unix Timestamp 변환기") },
      "margin-calculator": { name: "마진율 계산기", description: "원가와 판매가로 마진 금액과 마진율을 계산합니다.", intro: "상품 판매가, 원가, 수수료를 기준으로 남는 금액과 마진율을 빠르게 확인합니다.", usage: ["판매가와 원가를 입력합니다.", "필요하면 수수료율을 입력합니다.", "마진 금액과 마진율을 확인합니다."], examples: ["판매가 50,000원, 원가 30,000원의 마진율 계산", "플랫폼 수수료 10%를 반영한 순마진 확인"], faq: koFaq("마진율 계산기") },
      "pyeong-calculator": { name: "평수 계산기", description: "제곱미터와 평 단위를 부동산 면적 기준으로 서로 변환합니다.", intro: "부동산 면적을 볼 때 자주 쓰는 m²와 평 단위를 간단히 바꿀 수 있습니다.", usage: ["변환 방향을 선택합니다.", "면적 값을 입력합니다.", "평 또는 제곱미터 결과를 확인합니다."], examples: ["84m²를 평으로 변환", "25평을 제곱미터로 변환"], faq: koFaq("평수 계산기") },
      "compound-interest-calculator": { name: "복리 계산기", description: "원금, 수익률, 기간으로 복리 결과를 계산합니다.", intro: "예금, 투자 시뮬레이션처럼 일정 수익률을 가정한 복리 결과를 간단히 계산합니다.", usage: ["초기 금액과 연 수익률을 입력합니다.", "기간과 월 추가 납입액을 입력합니다.", "최종 금액과 이자를 확인합니다."], examples: ["1,000만원을 연 5%로 10년 운용", "매월 30만원 추가 납입 시 복리 결과 계산"], faq: koFaq("복리 계산기") },
      "lotto-number-generator": { name: "로또 번호 생성기", description: "1부터 45까지 로또 번호 6개를 무작위로 생성합니다.", intro: "중복 없는 로또 번호 조합을 브라우저에서 간단히 만들 수 있습니다.", usage: ["생성할 조합 수를 입력합니다.", "생성 버튼을 누릅니다.", "정렬된 번호 조합을 확인합니다."], examples: ["로또 번호 5게임 생성", "중복 없는 6개 번호 추첨"], faq: koFaq("로또 번호 생성기") },
      "loan-interest-calculator": { name: "대출 이자 계산기", description: "대출 금액, 금리, 기간으로 월 상환액과 총 이자를 계산합니다.", intro: "원리금균등, 원금균등, 만기일시 방식의 예상 상환 금액을 비교할 수 있습니다.", usage: ["대출 금액, 연 금리, 기간을 입력합니다.", "상환 방식을 선택합니다.", "월 상환액과 총 이자를 확인합니다."], examples: ["3,000만원, 연 5%, 36개월 원리금균등 계산", "만기일시 상환의 월 이자 확인"], faq: koFaq("대출 이자 계산기") },
      "salary-net-calculator": { name: "연봉 실수령액 계산기", description: "연봉과 공제율로 월 예상 실수령액을 계산합니다.", intro: "연봉을 월 급여로 나누고 사용자가 정한 공제율을 적용해 예상 실수령액을 계산합니다.", usage: ["연봉을 입력합니다.", "비과세 월 금액과 공제율을 필요에 맞게 조정합니다.", "월 예상 실수령액과 공제액을 확인합니다."], examples: ["연봉 5,000만원의 월 예상 실수령액 계산", "공제율을 직접 조정해 보수적으로 추정"], faq: koFaq("연봉 실수령액 계산기") },
      "csv-json-converter": { name: "CSV JSON 변환기", description: "CSV를 JSON으로 변환하거나 JSON 배열을 CSV로 변환합니다.", intro: "간단한 표 데이터와 JSON 배열 데이터를 브라우저에서 서로 바꿀 수 있습니다.", usage: ["CSV 또는 JSON 배열을 입력합니다.", "변환 방향을 선택합니다.", "결과를 복사합니다."], examples: ["name,age CSV를 JSON 배열로 변환", "JSON 객체 배열을 CSV로 변환"], faq: koFaq("CSV JSON 변환기") },
      "random-string-generator": { name: "랜덤 문자열 생성기", description: "길이와 문자 종류를 선택해 랜덤 문자열을 생성합니다.", intro: "토큰, 코드, 샘플 키처럼 무작위 문자열이 필요할 때 사용합니다.", usage: ["문자열 길이와 생성 개수를 입력합니다.", "포함할 문자 종류를 선택합니다.", "생성된 문자열을 복사합니다."], examples: ["32자리 랜덤 토큰 생성", "숫자와 영문자를 섞은 확인용 코드 만들기"], faq: koFaq("랜덤 문자열 생성기") },
      "ohms-law-calculator": { name: "옴의 법칙 계산기", description: "전압, 전류, 저항, 전력 중 2개 값으로 나머지 값을 계산합니다.", intro: "전자 회로에서 자주 쓰는 V=I×R 관계를 기준으로 전압, 전류, 저항, 전력을 빠르게 계산합니다.", usage: ["전압(V), 전류(A), 저항(Ω), 전력(W) 중 알고 있는 값 2개를 입력합니다.", "계산 버튼을 누릅니다.", "나머지 값과 단위를 확인합니다."], examples: ["5V와 0.02A로 저항 250Ω 계산", "12V와 6Ω으로 전류 2A와 전력 24W 계산"], faq: koFaq("옴의 법칙 계산기") },
      "led-resistor-calculator": { name: "LED 저항 계산기", description: "공급 전압, LED 순방향 전압, 전류로 필요한 직렬 저항을 계산합니다.", intro: "LED를 전원에 연결할 때 필요한 직렬 저항값과 저항의 소비 전력을 계산합니다.", usage: ["공급 전압, LED 순방향 전압, LED 전류를 입력합니다.", "계산 버튼을 누릅니다.", "필요한 저항값과 소비 전력을 확인합니다."], examples: ["5V 전원, 2V LED, 20mA 조건의 저항 계산", "저항 소비 전력으로 적절한 정격 전력 확인"], faq: koFaq("LED 저항 계산기") },
      "voltage-divider-calculator": { name: "전압 분배기 계산기", description: "Vin, R1, R2로 전압 분배 출력 Vout을 계산합니다.", intro: "두 저항으로 구성된 기본 전압 분배 회로의 출력 전압을 계산하고 공식을 함께 확인합니다.", usage: ["Vin, R1, R2 값을 입력합니다.", "계산 버튼을 누릅니다.", "Vout과 공식을 확인합니다."], examples: ["Vin 5V, R1 10kΩ, R2 10kΩ일 때 Vout 2.5V", "센서 입력 전압 분배 값 확인"], faq: koFaq("전압 분배기 계산기") },
      "battery-life-calculator": { name: "배터리 수명 계산기", description: "배터리 용량과 소비 전류로 예상 사용 시간을 계산합니다.", intro: "mAh 단위 배터리 용량과 mA 단위 소비 전류를 기준으로 예상 사용 시간을 계산합니다.", usage: ["배터리 용량(mAh)을 입력합니다.", "소비 전류(mA)를 입력합니다.", "예상 사용 시간을 시간과 일 단위로 확인합니다."], examples: ["2000mAh 배터리와 100mA 부하의 사용 시간 계산", "저전력 장치의 예상 동작 일수 확인"], faq: koFaq("배터리 수명 계산기") },
      "resistor-color-code-calculator": { name: "저항 색상 코드 계산기", description: "4밴드 저항 색상으로 저항값과 허용오차를 계산합니다.", intro: "4밴드 저항의 첫째 자리, 둘째 자리, 배수, 허용오차 색상을 선택해 저항값을 확인합니다.", usage: ["1번 밴드와 2번 밴드 색상을 선택합니다.", "배수와 허용오차 밴드를 선택합니다.", "계산된 저항값과 허용오차를 확인합니다."], examples: ["갈색-검정-빨강-금색은 1kΩ ±5%", "노랑-보라-주황-금색은 47kΩ ±5%"], faq: koFaq("저항 색상 코드 계산기") },
      "capacitance-converter": { name: "커패시턴스 변환기", description: "커패시턴스 값을 pF, nF, µF, mF, F 단위로 변환합니다.", intro: "커패시턴스 값을 pF, nF, µF, mF, F 단위로 변환합니다. 회로도나 부품 표기에서 서로 다른 커패시터 단위를 빠르게 확인할 수 있습니다.", usage: ["값을 입력합니다.", "입력 단위를 pF, nF, µF, mF, F 중에서 선택합니다.", "모든 단위로 환산된 값을 확인합니다."], examples: ["100nF를 0.1µF와 100,000pF로 확인", "10µF 커패시터 값을 F, mF, nF로 변환"], faq: koFaq("커패시턴스 변환기") },
      "series-parallel-resistor-calculator": { name: "직렬/병렬 저항 계산기", description: "여러 저항을 직렬 또는 병렬로 연결했을 때의 합성 저항값을 계산합니다.", intro: "여러 개의 저항을 직렬 또는 병렬로 연결했을 때의 합성 저항값을 계산합니다.", usage: ["직렬 또는 병렬 계산 방식을 선택합니다.", "저항값을 줄바꿈 또는 콤마로 입력하고 단위를 선택합니다.", "합성 저항값을 Ω, kΩ, MΩ 단위로 확인합니다."], examples: ["1kΩ, 2kΩ, 3kΩ 직렬 합성 저항 계산", "10kΩ 두 개 병렬 연결 시 5kΩ 확인"], faq: koFaq("직렬/병렬 저항 계산기") },
      "filter-calculator": { name: "필터 계산기", description: "저항, 커패시터, 인덕터 값을 입력해 RC/RL 저역통과고역통과 필터의 차단 주파수를 계산합니다.", seoTitle: "RC/RL 필터 계산기 - 차단 주파수 계산", intro: "저항, 커패시터, 인덕터 값을 입력해 RC/RL 저역통과 또는 고역통과 필터의 차단 주파수를 계산합니다.", usage: ["RC 필터 또는 RL 필터 회로를 선택합니다.", "저역통과 또는 고역통과 필터 타입을 선택합니다.", "저항값과 커패시턴스 또는 인덕턴스 값을 단위와 함께 입력합니다.", "차단 주파수와 적용된 공식을 확인합니다."], examples: ["100Ω과 10µF의 RC 필터 차단 주파수 계산", "10Ω과 10mH의 RL 필터 차단 주파수 계산"], faq: koFaq("필터 계산기") },
      "awg-wire-size-converter": { name: "AWG 전선 변환기", description: "AWG 번호로 전선 직경, 단면적, 미터당 저항, 참고 허용 전류를 확인합니다.", intro: "AWG 번호를 선택해 전선 직경, 단면적, circular mils, 구리선 기준 미터당 저항과 참고 허용 전류를 확인합니다. 허용 전류는 조건에 따라 달라지므로 별도 기준을 확인해야 합니다.", usage: ["AWG 번호를 선택합니다.", "직경 mm, inch와 단면적 mm²를 확인합니다.", "미터당 저항과 참고 허용 전류를 확인합니다."], examples: ["AWG 24 전선 직경과 단면적 확인", "AWG 0과 AWG 00 크기 비교"], faq: koFaq("AWG 전선 변환기") },
      "dbm-watt-converter": { name: "dBm-W 변환기", description: "dBm, mW, W 단위의 RF 전력 값을 서로 변환합니다.", intro: "dBm, mW, W 단위의 RF 전력 값을 서로 변환합니다. 통신과 RF 회로에서 전력 단위를 빠르게 맞출 때 사용합니다.", usage: ["입력 단위를 dBm, mW, W 중에서 선택합니다.", "값을 입력합니다.", "dBm, mW, W 결과를 함께 확인합니다."], examples: ["0dBm이 1mW인지 확인", "1W를 30dBm으로 변환"], faq: koFaq("dBm-W 변환기") },
      "frequency-wavelength-converter": { name: "주파수-파장 변환기", description: "주파수와 파장을 공기/진공 기준으로 서로 변환합니다.", intro: "주파수 입력 시 파장을, 파장 입력 시 주파수를 계산합니다. 이 도구는 공기/진공 기준의 빛의 속도를 사용합니다.", usage: ["주파수에서 파장 또는 파장에서 주파수 변환 방향을 선택합니다.", "값과 단위를 입력합니다.", "주파수와 파장 결과 및 공식을 확인합니다."], examples: ["2.4GHz의 파장 계산", "10cm 파장을 주파수로 변환"], faq: koFaq("주파수-파장 변환기") },
      "rc-time-constant-calculator": { name: "RC 시간상수 계산기", description: "저항과 커패시터 값으로 RC 회로의 시간상수를 계산합니다.", intro: "저항과 커패시터 값으로 RC 회로의 시간상수 τ를 계산하고 1τ, 3τ, 5τ 시간을 함께 표시합니다.", usage: ["저항값과 커패시턴스 값을 단위와 함께 입력합니다.", "계산 버튼을 누릅니다.", "τ, 3τ, 5τ와 입력값 환산 결과를 확인합니다."], examples: ["10kΩ과 100µF의 시간상수 계산", "5τ 기준으로 거의 최종값에 도달하는 시간 확인"], faq: koFaq("RC 시간상수 계산기") },
      "reactance-calculator": { name: "리액턴스 계산기", description: "주파수와 커패시턴스 또는 인덕턴스로 리액턴스를 계산합니다.", intro: "주파수와 커패시턴스 또는 인덕턴스를 입력해 커패시터/인덕터 리액턴스를 계산합니다.", usage: ["커패시터 리액턴스 또는 인덕터 리액턴스를 선택합니다.", "주파수와 부품 값을 단위와 함께 입력합니다.", "리액턴스 값과 공식을 확인합니다."], examples: ["1kHz에서 100nF 커패시터의 Xc 계산", "10kHz에서 1mH 인덕터의 Xl 계산"], faq: koFaq("리액턴스 계산기") },
      "image-resizer": { name: "이미지 리사이즈", description: "JPG, PNG, WebP 이미지의 가로세로 크기를 브라우저에서 변경합니다.", intro: "이미지 파일을 선택하고 원하는 width와 height를 입력해 새 크기로 다시 렌더링합니다.", usage: ["JPG, PNG, WebP 이미지를 선택합니다.", "원본 크기를 확인한 뒤 변경할 width와 height를 입력합니다.", "비율 유지 옵션을 필요에 맞게 선택합니다.", "미리보기를 확인하고 다운로드합니다."], examples: ["프로필 이미지를 800×800으로 변경", "블로그 업로드용 이미지를 1200px 너비로 축소"], faq: koFaq("이미지 리사이즈") },
      "image-compressor": { name: "이미지 압축", description: "JPG, PNG, WebP 이미지의 품질 값을 조정해 파일 용량을 줄입니다. 선택한 이미지는 서버로 업로드되지 않고 브라우저에서 처리됩니다.", seoTitle: "이미지 압축 - JPG PNG WebP 용량 줄이기", intro: "이미지를 브라우저에서 다시 인코딩해 원본 용량과 압축 후 용량을 비교합니다.", usage: ["압축할 이미지를 선택합니다.", "품질 값을 10~100 사이에서 조정합니다.", "압축 후 용량과 미리보기를 확인합니다.", "압축 이미지를 다운로드합니다."], examples: ["웹 업로드 전 JPG 용량 줄이기", "WebP 이미지를 낮은 품질로 재압축"], faq: koFaq("이미지 압축") },
      "webp-converter": { name: "WebP 변환기", description: "JPG, PNG 이미지를 WebP 형식으로 변환합니다.", intro: "JPG 또는 PNG 이미지를 선택하고 WebP 품질 값을 정해 브라우저에서 변환합니다.", usage: ["JPG 또는 PNG 이미지를 선택합니다.", "WebP 품질 값을 설정합니다.", "변환 전후 용량과 미리보기를 확인합니다.", "WebP 파일을 다운로드합니다."], examples: ["PNG 배너를 WebP로 변환", "JPG 사진을 WebP로 변환해 용량 줄이기"], faq: koFaq("WebP 변환기") },
      "image-cropper": { name: "이미지 자르기", description: "이미지를 브라우저에서 원하는 영역만 잘라내고 다운로드할 수 있습니다. 선택한 이미지는 서버로 업로드되지 않습니다.", seoTitle: "이미지 자르기 - 온라인 이미지 크롭 도구", intro: "JPG, PNG, WebP 이미지에서 필요한 영역만 잘라 새 이미지로 저장합니다.", usage: ["이미지 파일을 선택합니다.", "비율 옵션과 x, y, width, height 값을 조정해 자를 영역을 정합니다.", "자른 이미지 미리보기와 결과 정보를 확인합니다.", "결과 이미지를 다운로드합니다."], examples: ["프로필 사진을 정사각형으로 자르기", "스크린샷에서 필요한 영역만 저장"], faq: [{ question: "선택한 이미지는 서버로 업로드되나요?", answer: "아니요. 선택한 이미지는 현재 브라우저 안에서만 처리됩니다." }, { question: "모바일에서도 이미지를 자를 수 있나요?", answer: "네. 모바일에서도 영역 값을 조정해 이미지를 자를 수 있습니다." }, { question: "자른 이미지의 화질은 원본과 같나요?", answer: "원본 형식으로 다시 인코딩하므로 브라우저와 형식에 따라 약간 달라질 수 있습니다." }] },
      "image-rotate-flip": { name: "이미지 회전뒤집기", description: "이미지를 브라우저에서 90도 회전하거나 좌우상하로 뒤집고 다운로드할 수 있습니다.", seoTitle: "이미지 회전뒤집기 - 온라인 이미지 방향 변경 도구", intro: "이미지 방향이 잘못된 사진을 회전하거나 좌우, 상하로 뒤집어 저장합니다.", usage: ["이미지 파일을 선택합니다.", "왼쪽/오른쪽/180도 회전 또는 좌우/상하 뒤집기 버튼을 누릅니다.", "결과 미리보기와 이미지 정보를 확인합니다.", "결과 이미지를 다운로드합니다."], examples: ["휴대폰 사진을 오른쪽으로 90도 회전", "스캔 이미지를 좌우 뒤집기"], faq: [{ question: "이미지가 서버로 업로드되나요?", answer: "아니요. 이미지 처리는 현재 브라우저 안에서 끝납니다." }, { question: "회전 후 이미지 크기가 바뀌나요?", answer: "90도 회전하면 가로와 세로가 서로 바뀝니다." }, { question: "PNG 투명 배경도 유지되나요?", answer: "PNG 또는 WebP처럼 투명을 지원하는 형식은 투명 배경을 유지할 수 있습니다." }] },
      "image-format-converter": { name: "이미지 포맷 변환기", description: "JPG, PNG, WebP 이미지를 브라우저에서 원하는 이미지 형식으로 변환하고 다운로드할 수 있습니다.", seoTitle: "이미지 포맷 변환기 - JPG PNG WebP 변환", intro: "JPG, PNG, WebP 이미지를 선택한 출력 형식으로 다시 인코딩합니다.", usage: ["JPG, PNG, WebP 이미지를 선택합니다.", "출력 포맷과 품질 값을 선택합니다.", "변환 전후 용량과 미리보기를 확인합니다.", "변환 이미지를 다운로드합니다."], examples: ["PNG 이미지를 JPG로 변환", "JPG 사진을 WebP로 변환"], faq: [{ question: "JPG, PNG, WebP를 모두 변환할 수 있나요?", answer: "브라우저가 지원하는 범위에서 JPG, PNG, WebP를 선택한 형식으로 변환할 수 있습니다." }, { question: "투명 배경은 유지되나요?", answer: "PNG와 WebP는 투명 배경을 유지할 수 있지만 JPG는 투명 영역이 흰색으로 처리될 수 있습니다." }, { question: "이미지가 서버로 업로드되나요?", answer: "아니요. 선택한 이미지는 서버로 업로드되지 않습니다." }, { question: "변환 후 화질이 달라질 수 있나요?", answer: "네. JPG와 WebP는 품질 값과 브라우저 인코딩 방식에 따라 화질이 달라질 수 있습니다." }] },
      "image-mosaic": { name: "이미지 모자이크", description: "사진이나 이미지에서 원하는 영역만 선택해 브라우저에서 모자이크 처리하고 다운로드할 수 있습니다. 선택한 이미지는 서버로 업로드되지 않습니다.", seoTitle: "이미지 모자이크 - 사진 부분 모자이크 도구", intro: "JPG, PNG, WebP 이미지에서 가리고 싶은 사각형 영역을 직접 선택해 모자이크 처리합니다.", usage: ["이미지 파일을 선택합니다.", "미리보기 위에서 마우스나 터치로 모자이크할 영역을 드래그합니다.", "모자이크 강도를 선택하고 적용 버튼을 누릅니다.", "필요하면 다른 영역에도 반복 적용한 뒤 다운로드합니다."], examples: ["사진에서 얼굴 일부 모자이크 처리", "스크린샷의 개인정보 영역 가리기"], faq: [{ question: "선택한 이미지는 서버로 업로드되나요?", answer: "아니요. 선택한 이미지는 현재 브라우저 안에서만 처리됩니다." }, { question: "얼굴이나 개인정보 일부만 가릴 수 있나요?", answer: "네. 사용자가 사각형으로 선택한 영역만 모자이크 처리할 수 있습니다." }, { question: "여러 영역에 모자이크를 적용할 수 있나요?", answer: "네. 한 영역을 적용한 뒤 다른 영역을 다시 선택해 반복 적용할 수 있습니다." }, { question: "모자이크 강도를 조절할 수 있나요?", answer: "네. 블록 크기를 바꿔 모자이크 강도를 조절할 수 있습니다." }] },
      "image-watermark": { name: "이미지 워터마크 넣기", description: "이미지에 텍스트 워터마크를 넣고 위치, 회전, 투명도를 조정해 다운로드합니다.", seoTitle: "이미지 워터마크 넣기 - 온라인 워터마크 도구", intro: "JPG, PNG, WebP 이미지에 원하는 문구를 워터마크로 추가합니다.", usage: ["이미지 파일을 선택합니다.", "워터마크 텍스트와 위치, 크기, 색상, 회전, 투명도를 설정합니다.", "미리보기를 확인합니다.", "워터마크가 들어간 이미지를 다운로드합니다."], examples: ["블로그 이미지에 사이트명 넣기", "상품 이미지에 저작권 문구 추가"], faq: [{ question: "이미지가 서버로 업로드되나요?", answer: "아니요. 브라우저 안에서만 처리됩니다." }, { question: "워터마크 위치를 바꿀 수 있나요?", answer: "네. 좌상단, 우상단, 중앙, 좌하단, 우하단 중 선택할 수 있습니다." }, { question: "투명도와 회전을 조절할 수 있나요?", answer: "네. 투명도와 회전 각도를 직접 설정할 수 있습니다." }] },
      "remove-image-metadata": { name: "EXIF 정보 제거기", description: "이미지를 브라우저 canvas로 다시 저장해 EXIF 등 메타데이터를 줄입니다.", seoTitle: "EXIF 정보 제거기 - 이미지 메타데이터 제거", intro: "사진을 다시 인코딩해 위치 정보나 촬영 정보 같은 메타데이터를 제거하는 데 도움을 줍니다.", usage: ["이미지 파일을 선택합니다.", "원본 파일명, 크기, 용량을 확인합니다.", "브라우저에서 다시 저장된 이미지를 다운로드합니다."], examples: ["사진 공유 전 EXIF 정보 제거", "업로드용 이미지에서 메타데이터 줄이기"], faq: [{ question: "모든 메타데이터가 제거되나요?", answer: "대부분 제거되지만 모든 형식의 메타데이터 제거를 보장하지는 않습니다." }, { question: "이미지가 서버로 업로드되나요?", answer: "아니요. 브라우저 안에서 다시 인코딩합니다." }, { question: "화질이 달라질 수 있나요?", answer: "다시 저장하는 과정에서 형식과 브라우저에 따라 달라질 수 있습니다." }] },
      "image-color-picker": { name: "이미지 색상 추출기", description: "이미지를 클릭해 픽셀 색상을 HEX, RGB, HSL 값으로 확인합니다.", seoTitle: "이미지 색상 추출기 - 이미지 컬러 피커", intro: "이미지에서 원하는 위치를 클릭해 해당 픽셀의 색상 값을 추출합니다.", usage: ["이미지 파일을 선택합니다.", "미리보기 이미지에서 색상을 알고 싶은 지점을 클릭합니다.", "HEX, RGB, HSL 값을 확인하고 복사합니다."], examples: ["로고 이미지에서 대표 색상 확인", "사진 속 특정 색상의 HEX 값 추출"], faq: [{ question: "색상은 어떻게 추출하나요?", answer: "브라우저 canvas에서 클릭한 픽셀의 RGB 값을 읽습니다." }, { question: "최근 색상 목록이 남나요?", answer: "현재 페이지 안에서 최근 선택한 색상을 표시합니다." }, { question: "이미지가 서버로 업로드되나요?", answer: "아니요. 선택한 이미지는 브라우저에서만 처리됩니다." }] },
      "text-compare": { name: "텍스트 비교 도구", description: "두 텍스트를 줄 단위로 비교해 추가, 삭제, 변경된 줄을 확인합니다.", seoTitle: "텍스트 비교 도구 - 온라인 문장 차이 비교", intro: "원본 텍스트와 비교 텍스트를 입력해 줄 단위 차이를 빠르게 확인합니다.", usage: ["원본 텍스트와 비교할 텍스트를 각각 입력합니다.", "필요하면 공백 무시 또는 대소문자 무시 옵션을 선택합니다.", "추가, 삭제, 변경된 줄과 요약을 확인합니다."], examples: ["문서 수정 전후 차이 확인", "설정 파일 두 버전 비교"], faq: [{ question: "입력한 텍스트가 서버로 전송되나요?", answer: "아니요. 텍스트 비교는 브라우저 안에서만 처리됩니다." }, { question: "공백 차이를 무시할 수 있나요?", answer: "네. 공백 무시 옵션을 사용할 수 있습니다." }, { question: "줄 단위로 비교하나요?", answer: "네. 현재 버전은 줄 단위 차이를 보여줍니다." }] },
    } satisfies Record<ToolSlug, ToolText>,
  },
  en: {
    siteName: "Toolbox",
    nav: { all: "All", text: "Text", calculator: "Calculators", converter: "Converters", generator: "Generators", developer: "Developer", electronics: "Electronics", image: "Images", languageSwitch: "KO" },
    home: {
      title: "Toolbox - Free Web Tools",
      description: "Use everyday tools like a character counter, percentage calculator, date calculator, and password generator directly in your browser.",
      label: "Free Online Tools",
      h1: "Free Web Tools",
      body1: "Use everyday tools like a character counter, percentage calculator, date calculator, and password generator directly in your browser.",
      body2: "Your input stays in your browser and is not uploaded or stored.",
      button: "View All Tools",
      frequent: "Common Tools",
      categories: "Tool Categories",
      featured: "Featured Tools",
    },
    common: {
      freeTool: "Free Online Tool",
      usage: "How to Use",
      examples: "Examples",
      basis: "Calculation and Conversion Notes",
      basisText: "This tool processes your input in the browser. Numeric results may include rounding, so verify important work separately.",
      privacyNote: "Your input is not sent to a server and is processed only in your browser.",
      imagePrivacyNote: "Selected images are not uploaded to a server and are processed only in your browser.",
      relatedTools: "Related Tools",
      ad: "Ad space",
      toolsTitle: "All Tools",
      toolsDescription: "Free calculators, converters, text tools, electronics calculators, and image tools you can use without installation or sign-in. Each tool page includes instructions, examples, and FAQ.",
      categoryView: "View category",
    },
    footer: { text: "A free online tools site for calculators, converters, and text utilities." },
    categories: {
      text: { name: "Text Tools", description: "Count characters and words, remove spaces, and convert letter case." },
      calculator: { name: "Calculators", description: "Calculate percentages, discounts, VAT, dates, BMI, margins, compound interest, and loan interest." },
      converter: { name: "Converters", description: "Convert temperature, length, weight, pyeong, and time values into the format you need." },
      generator: { name: "Generators", description: "Generate passwords, random numbers, random strings, UUIDs, QR codes, and lotto numbers." },
      developer: { name: "Developer Tools", description: "Handle JSON, Base64, URL encoding, and CSV/JSON conversion tasks quickly." },
      electronics: { name: "Electronics Calculators", description: "Calculate common electronics values such as Ohms law, voltage divider output, LED resistor values, battery life, RC/RL filters, and reactance." },
      image: { name: "Image Tools", description: "Resize, compress, crop, rotate, watermark, mosaic, and convert images directly in your browser." },
    },
    tools: {
      "character-counter": { name: "Character Counter", description: "Count characters, words, lines, and characters without spaces.", intro: "Use this character counter for posts, resumes, ads, and any text with length limits.", usage: ["Paste or type your text.", "Review character count, word count, and line count.", "Copy the result or reset the input."], examples: ["Check a 500-character bio limit", "Review word and line count for a draft"], faq: enFaq("Character Counter") },
      "remove-spaces": { name: "Remove Spaces", description: "Remove extra spaces, leading and trailing spaces, or line breaks.", intro: "Clean copied text by removing spaces and line breaks in the format you need.", usage: ["Enter your text.", "Choose how spaces should be removed.", "Copy the cleaned result."], examples: ["Trim copied spreadsheet text", "Convert a multi-line address into one line"], faq: enFaq("Remove Spaces") },
      "case-converter": { name: "Case Converter", description: "Convert English text to uppercase, lowercase, or title case.", intro: "Change English titles, sentences, and identifiers into the case format you need.", usage: ["Enter English text.", "Choose a conversion mode.", "Copy the converted text."], examples: ["Convert a heading to title case", "Normalize text to lowercase for comparison"], faq: enFaq("Case Converter") },
      "percent-calculator": { name: "Percentage Calculator", description: "Calculate percentages, ratios, increases, and decreases.", intro: "Use common percentage calculations for discounts, growth rates, and proportions.", usage: ["Choose a calculation mode.", "Enter values A and B.", "Run the calculation."], examples: ["15% of 50,000 is 7,500", "80 to 100 is a 25% increase"], faq: enFaq("Percentage Calculator") },
      "discount-calculator": { name: "Discount Calculator", description: "Enter the original price and discount rate to calculate the final price.", intro: "Quickly check sale prices, quotes, and promotion totals.", usage: ["Enter the original price.", "Enter the discount rate.", "Check the discount amount and final price."], examples: ["20% off 120,000 is 96,000", "Calculate the final price after a 35% coupon"], faq: enFaq("Discount Calculator") },
      "vat-calculator": { name: "VAT Calculator", description: "Calculate supply amount, VAT, and total amount.", intro: "Start with a default 10% VAT rate and adjust it when needed.", usage: ["Enter supply amount or total amount.", "Choose the calculation basis and VAT rate.", "Compare supply amount, VAT, and total."], examples: ["At 10%, VAT on 100,000 is 10,000", "At 10%, the supply amount from 110,000 total is 100,000"], faq: enFaq("VAT Calculator") },
      "date-calculator": { name: "Date Calculator", description: "Calculate days between dates or dates before and after a base date.", intro: "Use it for schedules, deadlines, contracts, and date differences.", usage: ["Choose a date mode.", "Enter dates or number of days.", "Review the result date and day difference."], examples: ["Jan 1 to Jan 31, 2026 is 30 days apart", "Find the date 100 days after a base date"], faq: enFaq("Date Calculator") },
      "dday-calculator": { name: "D-Day Calculator", description: "Check days remaining until a target date or days passed since it.", intro: "Calculate the remaining time until exams, trips, anniversaries, and launch dates.", usage: ["Select a base date.", "Select a target date.", "Check the D-Day result."], examples: ["Calculate D-30 until an exam", "Check how many days have passed since an anniversary"], faq: enFaq("D-Day Calculator") },
      "age-calculator": { name: "Age Calculator", description: "Calculate age from birth date and base date.", intro: "Find the age for today or any selected date.", usage: ["Enter a birth date.", "Select a base date.", "Check the age."], examples: ["Calculate age for a 1990-05-10 birth date", "Find age on a specific date"], faq: enFaq("Age Calculator") },
      "bmi-calculator": { name: "BMI Calculator", description: "Calculate BMI from height and weight.", intro: "Enter height and weight to calculate body mass index quickly.", usage: ["Enter height in cm.", "Enter weight in kg.", "Review BMI and reference range."], examples: ["BMI for 170cm and 65kg", "Compare weight changes over time"], faq: enFaq("BMI Calculator") },
      "unit-converter": { name: "Unit Converter", description: "Convert temperature, length, and weight units in one place.", intro: "Convert common length, weight, and temperature units directly in your browser.", usage: ["Choose a conversion type.", "Enter a value and select units.", "Check the converted result."], examples: ["Convert 1 meter to centimeters", "Convert 25°C to Fahrenheit"], faq: enFaq("Unit Converter") },
      "password-generator": { name: "Password Generator", description: "Create random passwords with length and character options.", intro: "Generate passwords from uppercase, lowercase, numbers, and symbols in your browser.", usage: ["Choose length and character types.", "Click generate.", "Review strength and copy the result."], examples: ["Generate a 16-character password with symbols", "Create a temporary password without confusing characters"], faq: enFaq("Password Generator") },
      "random-number-generator": { name: "Random Number Generator", description: "Generate random numbers from a minimum, maximum, and count.", intro: "Create draw numbers, sample data, or test values.", usage: ["Enter minimum and maximum values.", "Set how many numbers to generate.", "Check the generated numbers."], examples: ["Generate 6 numbers from 1 to 45", "Create random numeric test IDs"], faq: enFaq("Random Number Generator") },
      "uuid-generator": { name: "UUID Generator", description: "Generate UUID v4 values in your browser.", intro: "Create UUID v4 values for development tests and temporary identifiers.", usage: ["Enter how many UUIDs you need.", "Click generate.", "Copy the UUIDs."], examples: ["Create test data IDs", "Generate unique temporary file names"], faq: enFaq("UUID Generator") },
      "qr-code-generator": { name: "QR Code Generator", description: "Generate a QR code from text or a URL.", intro: "Turn URLs and short text into QR codes directly on the page.", usage: ["Enter text or a URL.", "Click generate.", "Check the displayed QR code."], examples: ["Generate a QR code for a website URL", "Create a QR code for event information"], faq: enFaq("QR Code Generator") },
      "json-formatter": { name: "JSON Formatter", description: "Format, minify, and validate JSON in one place.", intro: "Make API responses and JSON settings easier to read and check for errors.", usage: ["Enter JSON text.", "Choose format, minify, or validate.", "Fix any error message shown."], examples: ["Format a minified API response", "Validate JSON before deployment"], faq: enFaq("JSON Formatter") },
      "base64-converter": { name: "Base64 Converter", description: "Encode text to Base64 or decode Base64 to text.", intro: "Convert short text to Base64 or decode Base64 values back to readable text.", usage: ["Enter text or Base64.", "Choose encode or decode.", "Copy the result."], examples: ["Encode hello to aGVsbG8=", "Decode a Base64 API sample"], faq: enFaq("Base64 Converter") },
      "url-encoder-decoder": { name: "URL Encoder/Decoder", description: "Encode or decode URL strings.", intro: "Convert URLs, query strings, and text with special characters directly in your browser.", usage: ["Enter a URL or text.", "Choose encode or decode.", "Copy the converted result."], examples: ["Encode a search query for a URL", "Decode %20 and encoded Korean text"], faq: enFaq("URL Encoder/Decoder") },
      "unix-timestamp-converter": { name: "Unix Timestamp Converter", description: "Convert Unix timestamps and date times.", intro: "Convert Unix timestamps in seconds or milliseconds to readable dates, or turn dates into timestamps.", usage: ["Choose a conversion mode.", "Enter a timestamp or date time.", "Review seconds, milliseconds, and local time."], examples: ["Convert 1704067200 to a date", "Convert 2026-01-01 00:00 to Unix time"], faq: enFaq("Unix Timestamp Converter") },
      "margin-calculator": { name: "Margin Calculator", description: "Calculate margin amount and margin rate from cost and sale price.", intro: "Check product margin from sale price, cost, and optional fee rate.", usage: ["Enter sale price and cost.", "Add a fee rate if needed.", "Review margin amount and margin rate."], examples: ["Margin for a 50,000 sale price and 30,000 cost", "Net margin after a 10% platform fee"], faq: enFaq("Margin Calculator") },
      "pyeong-calculator": { name: "Pyeong Calculator", description: "Convert square meters and pyeong.", intro: "Convert common Korean real estate area units between m² and pyeong.", usage: ["Choose the conversion direction.", "Enter an area value.", "Check the converted result."], examples: ["Convert 84m² to pyeong", "Convert 25 pyeong to square meters"], faq: enFaq("Pyeong Calculator") },
      "compound-interest-calculator": { name: "Compound Interest Calculator", description: "Calculate compound growth from principal, rate, and period.", intro: "Estimate compound interest for savings or investments using an annual return assumption.", usage: ["Enter principal and annual rate.", "Enter period and optional monthly contribution.", "Check final amount and interest."], examples: ["10,000,000 at 5% for 10 years", "Add 300,000 monthly and calculate long-term growth"], faq: enFaq("Compound Interest Calculator") },
      "lotto-number-generator": { name: "Lotto Number Generator", description: "Generate six random lotto numbers from 1 to 45.", intro: "Create sorted lotto number sets without duplicates in your browser.", usage: ["Enter how many sets to generate.", "Click generate.", "Review the sorted number sets."], examples: ["Generate 5 lotto games", "Pick 6 unique numbers from 1 to 45"], faq: enFaq("Lotto Number Generator") },
      "loan-interest-calculator": { name: "Loan Interest Calculator", description: "Calculate monthly payment and total interest from loan amount, rate, and term.", intro: "Compare estimated payments for amortized, equal principal, and interest-only loans.", usage: ["Enter loan amount, annual rate, and term.", "Choose a repayment type.", "Review monthly payment and total interest."], examples: ["30,000,000 at 5% for 36 months", "Check monthly interest for an interest-only loan"], faq: enFaq("Loan Interest Calculator") },
      "salary-net-calculator": { name: "Salary Net Pay Calculator", description: "Estimate monthly take-home pay from annual salary and deduction rate.", intro: "Divide annual salary into monthly pay and apply an editable deduction rate for a simple net pay estimate.", usage: ["Enter annual salary.", "Adjust monthly tax-free amount and deduction rate.", "Review estimated monthly net pay and deductions."], examples: ["Estimate monthly net pay from a 50,000,000 salary", "Adjust deduction rate for a conservative estimate"], faq: enFaq("Salary Net Pay Calculator") },
      "csv-json-converter": { name: "CSV JSON Converter", description: "Convert CSV to JSON or JSON arrays to CSV.", intro: "Convert simple table data and JSON object arrays locally in your browser.", usage: ["Enter CSV or a JSON array.", "Choose the conversion direction.", "Copy the converted result."], examples: ["Convert name,age CSV to JSON", "Convert a JSON object array to CSV"], faq: enFaq("CSV JSON Converter") },
      "random-string-generator": { name: "Random String Generator", description: "Generate random strings with length and character options.", intro: "Create random tokens, temporary codes, and sample keys in your browser.", usage: ["Enter string length and count.", "Choose character types.", "Copy the generated strings."], examples: ["Generate a 32-character random token", "Create alphanumeric test codes"], faq: enFaq("Random String Generator") },
      "ohms-law-calculator": { name: "Ohms Law Calculator", description: "Calculate voltage, current, resistance, and power from any two known values.", intro: "Use the V=I×R relationship to calculate common circuit values directly in your browser.", usage: ["Enter any two values among voltage, current, resistance, and power.", "Click calculate.", "Review the remaining values with units."], examples: ["Calculate 250Ω from 5V and 0.02A", "Calculate 2A and 24W from 12V and 6Ω"], faq: enFaq("Ohms Law Calculator") },
      "led-resistor-calculator": { name: "LED Resistor Calculator", description: "Calculate the series resistor needed for an LED circuit.", intro: "Find the resistor value and resistor power dissipation from supply voltage, LED forward voltage, and LED current.", usage: ["Enter supply voltage, LED forward voltage, and LED current.", "Click calculate.", "Check resistor value and power dissipation."], examples: ["Calculate resistance for 5V supply, 2V LED, and 20mA", "Check resistor wattage for an LED circuit"], faq: enFaq("LED Resistor Calculator") },
      "voltage-divider-calculator": { name: "Voltage Divider Calculator", description: "Calculate voltage divider output from Vin, R1, and R2.", intro: "Calculate the output voltage of a basic two-resistor voltage divider and review the formula.", usage: ["Enter Vin, R1, and R2.", "Click calculate.", "Review Vout and the formula."], examples: ["Vin 5V, R1 10kΩ, R2 10kΩ gives 2.5V", "Check divider output for a sensor input"], faq: enFaq("Voltage Divider Calculator") },
      "battery-life-calculator": { name: "Battery Life Calculator", description: "Estimate battery runtime from capacity and current draw.", intro: "Estimate runtime using battery capacity in mAh and load current in mA.", usage: ["Enter battery capacity in mAh.", "Enter current draw in mA.", "Review estimated runtime in hours and days."], examples: ["Estimate runtime for 2000mAh and 100mA", "Check expected operating days for a low-power device"], faq: enFaq("Battery Life Calculator") },
      "resistor-color-code-calculator": { name: "Resistor Color Code Calculator", description: "Calculate 4-band resistor value and tolerance from colors.", intro: "Select the first digit, second digit, multiplier, and tolerance colors to read a 4-band resistor.", usage: ["Choose the first and second band colors.", "Choose multiplier and tolerance colors.", "Review resistance value and tolerance."], examples: ["Brown-black-red-gold is 1kΩ ±5%", "Yellow-violet-orange-gold is 47kΩ ±5%"], faq: enFaq("Resistor Color Code Calculator") },
      "capacitance-converter": { name: "Capacitance Converter", description: "Convert capacitance values between pF, nF, µF, mF, and F.", intro: "Convert capacitance values between pF, nF, µF, mF, and F. This is useful when reading capacitor markings, schematics, or datasheets.", usage: ["Enter a value.", "Choose the input unit from pF, nF, µF, mF, or F.", "Review the converted values in all units."], examples: ["Check that 100nF equals 0.1µF and 100,000pF", "Convert a 10µF capacitor value to F, mF, and nF"], faq: enFaq("Capacitance Converter") },
      "series-parallel-resistor-calculator": { name: "Series and Parallel Resistor Calculator", description: "Calculate the equivalent resistance of multiple resistors connected in series or parallel.", intro: "Calculate the equivalent resistance of multiple resistors connected in series or parallel.", usage: ["Choose series or parallel mode.", "Enter resistor values separated by new lines or commas and select a unit.", "Review the equivalent resistance in Ω, kΩ, and MΩ."], examples: ["Calculate 1kΩ, 2kΩ, and 3kΩ in series", "Check that two 10kΩ resistors in parallel equal 5kΩ"], faq: enFaq("Series and Parallel Resistor Calculator") },
      "filter-calculator": { name: "Filter Calculator", description: "Calculate the cutoff frequency of RC and RL low-pass or high-pass filters using resistor, capacitor, and inductor values.", seoTitle: "RC/RL Filter Calculator - Cutoff Frequency Calculator", intro: "Calculate the cutoff frequency of RC or RL low-pass and high-pass filters from resistor, capacitor, and inductor values.", usage: ["Choose RC filter or RL filter circuit.", "Choose low-pass or high-pass filter type.", "Enter resistance and capacitance or inductance with units.", "Review the cutoff frequency and the formula used."], examples: ["Calculate an RC cutoff frequency from 100Ω and 10µF", "Calculate an RL cutoff frequency from 10Ω and 10mH"], faq: enFaq("Filter Calculator") },
      "awg-wire-size-converter": { name: "AWG Wire Size Converter", description: "Convert AWG wire gauge to diameter, area, resistance per meter, and reference ampacity.", intro: "Choose an AWG number to view wire diameter, cross-sectional area, circular mils, copper resistance per meter, and reference ampacity. Current rating depends on insulation, temperature, wiring method, and standards.", usage: ["Select an AWG size.", "Review diameter in mm and inches and area in mm².", "Check resistance per meter and reference ampacity."], examples: ["Check diameter and area for AWG 24", "Compare AWG 0 and AWG 00 wire sizes"], faq: enFaq("AWG Wire Size Converter") },
      "dbm-watt-converter": { name: "dBm to Watt Converter", description: "Convert RF power values between dBm, mW, and W.", intro: "Convert RF power values between dBm, mW, and W for communication and RF circuit work.", usage: ["Choose the input unit from dBm, mW, or W.", "Enter a value.", "Review the result in dBm, mW, and W."], examples: ["Check that 0dBm equals 1mW", "Convert 1W to 30dBm"], faq: enFaq("dBm to Watt Converter") },
      "frequency-wavelength-converter": { name: "Frequency Wavelength Converter", description: "Convert frequency and wavelength using the vacuum/air reference speed.", intro: "Calculate wavelength from frequency or frequency from wavelength. This tool uses the speed of light in vacuum/air as a basic reference.", usage: ["Choose frequency-to-wavelength or wavelength-to-frequency.", "Enter value and unit.", "Review frequency, wavelength, and formula."], examples: ["Calculate wavelength for 2.4GHz", "Convert 10cm wavelength to frequency"], faq: enFaq("Frequency Wavelength Converter") },
      "rc-time-constant-calculator": { name: "RC Time Constant Calculator", description: "Calculate the RC time constant from resistor and capacitor values.", intro: "Calculate the RC time constant τ from resistor and capacitor values, including 1τ, 3τ, and 5τ times.", usage: ["Enter resistance and capacitance with units.", "Click calculate.", "Review τ, 3τ, 5τ, and converted input values."], examples: ["Calculate time constant for 10kΩ and 100µF", "Check 5τ as a practical near-final settling time"], faq: enFaq("RC Time Constant Calculator") },
      "reactance-calculator": { name: "Reactance Calculator", description: "Calculate capacitive or inductive reactance from frequency and component values.", intro: "Calculate capacitive or inductive reactance from frequency and capacitance or inductance values.", usage: ["Choose capacitive or inductive reactance.", "Enter frequency and component value with units.", "Review reactance and the formula."], examples: ["Calculate Xc for 100nF at 1kHz", "Calculate Xl for 1mH at 10kHz"], faq: enFaq("Reactance Calculator") },
      "image-resizer": { name: "Image Resizer", description: "Resize JPG, PNG, and WebP images directly in your browser.", intro: "Choose an image file and enter the target width and height to render a resized copy.", usage: ["Select a JPG, PNG, or WebP image.", "Check the original dimensions and enter the target width and height.", "Use the keep aspect ratio option if needed.", "Preview the result and download the resized image."], examples: ["Resize a profile image to 800×800", "Reduce a blog image to 1200px wide"], faq: enFaq("Image Resizer") },
      "image-compressor": { name: "Image Compressor", description: "Reduce JPG, PNG, and WebP file size by adjusting image quality. Selected images are not uploaded to a server and are processed in your browser.", seoTitle: "Image Compressor - Reduce JPG, PNG, and WebP File Size", intro: "Re-encode an image in your browser and compare the original and compressed file sizes.", usage: ["Select an image to compress.", "Adjust the quality value from 10 to 100.", "Check the compressed size and preview.", "Download the compressed image."], examples: ["Reduce JPG size before uploading", "Re-compress a WebP image at lower quality"], faq: enFaq("Image Compressor") },
      "webp-converter": { name: "WebP Converter", description: "Convert JPG and PNG images to WebP format.", intro: "Select a JPG or PNG image and choose WebP quality to convert it in your browser.", usage: ["Select a JPG or PNG image.", "Set the WebP quality value.", "Check the before and after file sizes and preview.", "Download the WebP file."], examples: ["Convert a PNG banner to WebP", "Convert a JPG photo to WebP to reduce file size"], faq: enFaq("WebP Converter") },
      "image-cropper": { name: "Image Cropper", description: "Crop an image directly in your browser and download the selected area. Your image is not uploaded to a server.", seoTitle: "Image Cropper - Online Image Cropping Tool", intro: "Crop the area you need from a JPG, PNG, or WebP image and save it as a new image.", usage: ["Select an image file.", "Choose an aspect ratio and adjust x, y, width, and height.", "Review the cropped preview and result information.", "Download the cropped image."], examples: ["Crop a profile photo to a square", "Save only part of a screenshot"], faq: [{ question: "Is my image uploaded to a server?", answer: "No. The selected image is processed only in your browser." }, { question: "Can I crop images on mobile?", answer: "Yes. You can adjust the crop values on mobile screens." }, { question: "Does the cropped image keep the original quality?", answer: "The cropped image is re-encoded in the browser, so quality can vary slightly by format and browser." }] },
      "image-rotate-flip": { name: "Image Rotate and Flip", description: "Rotate images by 90 degrees or flip them horizontally or vertically directly in your browser.", seoTitle: "Image Rotate and Flip - Online Image Rotation Tool", intro: "Fix image orientation by rotating left, rotating right, rotating 180 degrees, or flipping the image.", usage: ["Select an image file.", "Use rotate or flip buttons.", "Review the preview and result information.", "Download the processed image."], examples: ["Rotate a phone photo 90 degrees right", "Flip a scanned image horizontally"], faq: [{ question: "Is my image uploaded to a server?", answer: "No. Image processing happens only in your browser." }, { question: "Does the image size change after rotation?", answer: "A 90-degree rotation swaps width and height." }, { question: "Is PNG transparency preserved?", answer: "Transparency can be preserved for formats such as PNG and WebP that support it." }] },
      "image-format-converter": { name: "Image Format Converter", description: "Convert JPG, PNG, and WebP images to another format directly in your browser and download the result.", seoTitle: "Image Format Converter - Convert JPG, PNG, and WebP", intro: "Re-encode JPG, PNG, and WebP images into the output format you choose.", usage: ["Select a JPG, PNG, or WebP image.", "Choose the output format and quality value.", "Check the before and after file sizes and preview.", "Download the converted image."], examples: ["Convert a PNG image to JPG", "Convert a JPG photo to WebP"], faq: [{ question: "Can I convert JPG, PNG, and WebP images?", answer: "Yes, within the image formats supported by your browser." }, { question: "Is transparency preserved?", answer: "PNG and WebP can preserve transparency, but JPG may render transparent areas with a white background." }, { question: "Is my image uploaded to a server?", answer: "No. The selected image is not uploaded to a server." }, { question: "Can image quality change after conversion?", answer: "Yes. JPG and WebP quality can change depending on the quality value and browser encoder." }] },
      "image-mosaic": { name: "Image Mosaic Tool", description: "Select part of an image and apply a mosaic pixelation effect directly in your browser. Your image is not uploaded to a server.", seoTitle: "Image Mosaic Tool - Pixelate Part of an Image Online", intro: "Manually select a rectangular area in a JPG, PNG, or WebP image and apply a mosaic effect before downloading it.", usage: ["Select an image file.", "Drag over the preview with a mouse or touch to choose the mosaic area.", "Choose the mosaic block size and apply it.", "Repeat on other areas if needed, then download the image."], examples: ["Pixelate part of a face in a photo", "Hide personal information in a screenshot"], faq: [{ question: "Is my image uploaded to a server?", answer: "No. The selected image is processed only in your browser." }, { question: "Can I hide only part of a face or personal information?", answer: "Yes. Only the rectangle you select is pixelated." }, { question: "Can I apply mosaic to multiple areas?", answer: "Yes. Apply one area, then select another area and apply again." }, { question: "Can I adjust the mosaic strength?", answer: "Yes. Change the block size to make the mosaic finer or stronger." }] },
      "image-watermark": { name: "Image Watermark Tool", description: "Add a text watermark to an image, adjust position, rotation, and opacity, then download it.", seoTitle: "Image Watermark Tool - Add Watermark Online", intro: "Add a custom text watermark to a JPG, PNG, or WebP image.", usage: ["Select an image file.", "Enter watermark text and choose position, size, color, rotation, and opacity.", "Review the preview.", "Download the watermarked image."], examples: ["Add a site name to blog images", "Add a copyright note to product images"], faq: [{ question: "Is my image uploaded to a server?", answer: "No. It is processed only in your browser." }, { question: "Can I change the watermark position?", answer: "Yes. Choose top-left, top-right, center, bottom-left, or bottom-right." }, { question: "Can I adjust opacity and rotation?", answer: "Yes. Use the opacity and rotation settings." }] },
      "remove-image-metadata": { name: "Remove Image Metadata", description: "Re-save an image through browser canvas to remove most EXIF and metadata fields.", seoTitle: "Remove Image Metadata - Remove EXIF Online", intro: "Re-encode a photo in your browser to help remove location, camera, and other embedded metadata.", usage: ["Select an image file.", "Check the original file name, dimensions, and size.", "Download the re-saved image."], examples: ["Remove EXIF before sharing a photo", "Reduce metadata from an upload image"], faq: [{ question: "Is every metadata field removed?", answer: "Most metadata is removed, but removal of every field is not guaranteed." }, { question: "Is my image uploaded to a server?", answer: "No. It is re-encoded in your browser." }, { question: "Can image quality change?", answer: "Yes. Re-saving can change quality depending on the format and browser." }] },
      "image-color-picker": { name: "Image Color Picker", description: "Click an image to read pixel colors as HEX, RGB, and HSL.", seoTitle: "Image Color Picker - Extract Colors from an Image", intro: "Pick a point on an image and get the exact color value from that pixel.", usage: ["Select an image file.", "Click a point in the preview.", "Review and copy HEX, RGB, and HSL values."], examples: ["Get a brand color from a logo", "Extract the HEX value of a color in a photo"], faq: [{ question: "How are colors picked?", answer: "The tool reads the clicked pixel from a browser canvas." }, { question: "Are recent colors shown?", answer: "Yes. Recent picks are shown on the current page." }, { question: "Is my image uploaded to a server?", answer: "No. The selected image is processed only in your browser." }] },
      "text-compare": { name: "Text Compare Tool", description: "Compare two texts line by line and find added, removed, or changed lines.", seoTitle: "Text Compare Tool - Compare Text Differences Online", intro: "Paste original and changed text to quickly review line-by-line differences.", usage: ["Enter the original text and comparison text.", "Choose ignore whitespace or ignore case if needed.", "Review added, removed, changed lines, and the summary."], examples: ["Compare two document versions", "Check differences between two config files"], faq: [{ question: "Is my text sent to a server?", answer: "No. Text comparison runs only in your browser." }, { question: "Can I ignore whitespace?", answer: "Yes. Use the ignore whitespace option." }, { question: "Does it compare line by line?", answer: "Yes. This version shows line-level differences." }] },
    } satisfies Record<ToolSlug, ToolText>,
  },
} as const;

const toolBasis = {
  ko: {
    "character-counter": "공백 포함 글자수는 띄어쓰기, 탭, 줄바꿈을 포함해 계산합니다. 공백 제외 글자수는 띄어쓰기, 탭, 줄바꿈을 제외하고 계산합니다. 단어 수는 공백을 기준으로 텍스트를 나누어 계산합니다.",
    "remove-spaces": "전체 공백 제거는 띄어쓰기, 탭, 줄바꿈을 모두 제거합니다. 전체 텍스트 앞뒤 공백 제거는 입력값의 시작과 끝에 있는 공백만 제거합니다. 모든 줄 앞뒤 공백 제거는 각 줄마다 앞뒤 공백을 개별적으로 제거합니다.",
    "case-converter": "영문 텍스트를 브라우저의 문자열 처리 기준에 따라 대문자, 소문자, 단어 첫 글자 대문자 형식으로 변환합니다. 한글, 숫자, 특수문자는 대소문자 변환 대상이 아닙니다.",
    "percent-calculator": "A의 B%는 `A × B / 100`으로 계산합니다. A가 B의 몇 퍼센트인지는 `A / B × 100`으로 계산합니다. 증가율 또는 감소율은 `(변경 후 값 - 변경 전 값) / 변경 전 값 × 100`으로 계산합니다.",
    "discount-calculator": "할인 금액은 `정가 × 할인율 / 100`으로 계산합니다. 최종 가격은 `정가 - 할인 금액`으로 계산합니다.",
    "vat-calculator": "부가세는 `공급가 × 세율`로 계산합니다. 합계 금액은 `공급가 + 부가세`로 계산합니다. 합계 금액에서 공급가를 역산할 때는 `합계 금액 / (1 + 세율)`을 사용합니다. 기본 세율은 10%이며, 사용자가 직접 변경할 수 있습니다.",
    "date-calculator": "날짜 차이는 `종료일 - 시작일`을 기준으로 계산합니다. N일 후 날짜는 `기준일 + N일`, N일 전 날짜는 `기준일 - N일`로 계산합니다.",
    "dday-calculator": "D-day는 `목표일 - 기준일`의 일수로 계산합니다. 결과가 양수이면 목표일까지 남은 날짜를 의미하고, 음수이면 목표일이 지난 날짜를 의미합니다.",
    "age-calculator": "만 나이는 기준일의 연도에서 출생 연도를 뺀 뒤 계산합니다. 기준일이 해당 연도의 생일 전이면 1살을 차감합니다.",
    "bmi-calculator": "BMI는 `체중(kg) / 키(m)^2`으로 계산합니다. 결과는 참고용이며, 의학적 진단이나 건강 상태 판단을 대신하지 않습니다.",
    "unit-converter": "길이는 `1 m = 100 cm`, `1 inch = 2.54 cm`, `1 ft = 0.3048 m`, `1 mil = 0.001 inch` 기준으로 변환합니다. 무게는 `1 kg = 1000 g`, `1 lb = 453.59237 g` 기준으로 변환합니다. 온도는 `F = C × 9 / 5 + 32`, `K = C + 273.15` 기준으로 변환합니다.",
    "unix-timestamp-converter": "Unix Timestamp는 `1970-01-01 00:00:00 UTC`부터 경과한 시간을 나타내는 값입니다. 입력값의 크기에 따라 초 또는 밀리초 단위로 판단하고, 결과는 사용자의 로컬 시간 기준으로 표시합니다.",
    "pyeong-calculator": "1평은 `3.305785㎡` 기준으로 계산합니다. 평수는 `㎡ / 3.305785`로 계산합니다. 제곱미터는 `평 × 3.305785`로 계산합니다.",
    "json-formatter": "`JSON.parse`로 입력값의 유효성을 검사합니다. 정리된 JSON은 `JSON.stringify`를 사용해 들여쓰기 형식으로 생성합니다. 압축 결과는 공백과 줄바꿈을 제거한 JSON 문자열로 생성합니다. 입력한 내용은 서버로 전송하지 않고 브라우저 안에서만 처리합니다.",
    "base64-converter": "텍스트는 UTF-8 기준으로 Base64 인코딩합니다. Base64 값은 UTF-8 텍스트로 디코딩합니다. 잘못된 Base64 입력값은 디코딩할 수 없으므로 오류로 표시합니다.",
    "url-encoder-decoder": "URL 인코딩은 `encodeURIComponent` 기준으로 처리합니다. URL 디코딩은 `decodeURIComponent` 기준으로 처리합니다. URL에 포함하기 어려운 공백, 한글, 특수문자를 안전한 문자열로 변환할 때 사용할 수 있습니다.",
    "csv-json-converter": "CSV를 JSON으로 변환할 때는 첫 번째 줄을 헤더로 사용합니다. 각 CSV 행은 헤더 이름을 키로 갖는 JSON 객체로 변환합니다. JSON을 CSV로 변환할 때는 객체 배열의 키를 CSV 헤더로 사용합니다.",
    "margin-calculator": "수수료는 `판매가 × 수수료율 / 100`으로 계산합니다. 마진은 `판매가 - 원가 - 수수료`로 계산합니다. 마진율은 `마진 / 판매가 × 100`으로 계산합니다.",
    "compound-interest-calculator": "월 복리 기준으로 계산합니다. 월 이율은 `연 이율 / 12`로 환산합니다. 매월 잔액에 월 이율을 적용한 뒤, 월 추가 납입액을 더해 다음 달 잔액을 계산합니다. 단순 복리 공식은 `최종 금액 = 원금 × (1 + 이율)^기간`이며, 이자는 `최종 금액 - 원금`으로 계산합니다.",
    "loan-interest-calculator": "원리금균등 방식은 매월 같은 상환액을 납부하는 방식으로 계산합니다. 원금균등 방식은 매월 같은 원금을 상환하고, 남은 원금에 대해 이자를 계산합니다. 만기일시 방식은 매월 이자만 납부하고, 마지막에 원금을 한 번에 상환하는 방식으로 단순 계산합니다. 실제 대출 조건, 수수료, 금융기관 기준에 따라 결과는 달라질 수 있습니다.",
    "salary-net-calculator": "연봉을 12개월로 나눈 뒤, 월 비과세 금액을 제외한 과세 대상 금액에 사용자가 입력한 공제율을 적용합니다. 실제 세금, 4대 보험, 공제 기준은 연도와 개인 조건에 따라 달라질 수 있으므로 결과는 단순 추정값으로 봐야 합니다.",
    "ohms-law-calculator": "옴의 법칙 `V = I × R`을 기준으로 계산합니다. 전력은 `P = V × I`, `P = V^2 / R`, `P = I^2 × R` 공식을 사용합니다. 입력한 값의 조합에 따라 계산 가능한 나머지 값을 구합니다.",
    "led-resistor-calculator": "필요한 직렬 저항은 `R = (Vs - Vf) / If`로 계산합니다. 여기서 `Vs`는 공급 전압, `Vf`는 LED 순방향 전압, `If`는 LED 전류입니다. 저항의 소비 전력은 `P = I^2 × R`로 계산합니다.",
    "voltage-divider-calculator": "전압 분배기 출력 전압은 `Vout = Vin × R2 / (R1 + R2)`로 계산합니다. R1은 입력 전압 쪽 저항, R2는 접지 쪽 저항 기준입니다.",
    "battery-life-calculator": "예상 사용 시간은 `배터리 용량(mAh) / 소비 전류(mA)`로 계산합니다. 실제 사용 시간은 배터리 방전 특성, 온도, 회로 효율, 부하 변화에 따라 달라질 수 있습니다.",
    "resistor-color-code-calculator": "4밴드 저항 기준으로 계산합니다. 저항값은 `(1번 숫자 × 10 + 2번 숫자) × 배수`로 계산합니다. 허용오차는 4번 밴드 색상을 기준으로 표시합니다.",
    "capacitance-converter": "커패시턴스 단위는 `1 F = 1000 mF`, `1 mF = 1000 µF`, `1 µF = 1000 nF`, `1 nF = 1000 pF` 기준으로 변환합니다. `µF`와 `uF`는 같은 단위로 봅니다.",
    "series-parallel-resistor-calculator": "직렬 합성 저항은 `Rtotal = R1 + R2 + R3 + ...`로 계산합니다. 병렬 합성 저항은 `1 / Rtotal = 1/R1 + 1/R2 + 1/R3 + ...`로 계산합니다. 병렬 계산에서는 0Ω 또는 음수 저항값을 사용할 수 없습니다.",
    "filter-calculator": "RC 필터의 차단 주파수는 fc = 1 / (2πRC)로 계산합니다. RL 필터의 차단 주파수는 fc = R / (2πL)로 계산합니다. 저역통과와 고역통과는 차단 주파수 계산값 자체가 달라지는 것이 아니라, 차단 주파수를 기준으로 어느 주파수 대역을 통과시키는지가 달라집니다. 차단 주파수 fc에서는 출력이 입력의 약 70.7%, 즉 -3 dB 수준이 됩니다.",
    "awg-wire-size-converter": "AWG 전선 직경은 `d(inch) = 0.005 × 92^((36 - AWG) / 39)` 공식으로 계산합니다. 단면적과 구리 저항값은 계산된 직경을 바탕으로 산출한 참고값입니다. 허용 전류는 절연재, 온도, 배선 방식, 규격에 따라 달라지므로 별도 기준을 확인해야 합니다.",
    "dbm-watt-converter": "dBm에서 mW로 변환할 때는 `P(mW) = 10^(dBm / 10)`을 사용합니다. mW에서 dBm으로 변환할 때는 `dBm = 10 × log10(P(mW))`를 사용합니다. W와 mW는 `P(mW) = P(W) × 1000` 기준으로 변환합니다.",
    "frequency-wavelength-converter": "공기/진공 기준 광속 `c = 299,792,458 m/s`를 사용합니다. 파장은 `λ = c / f`로 계산합니다. 주파수는 `f = c / λ`로 계산합니다. 매질에 따라 전파 속도가 달라질 수 있으므로 실제 환경에서는 차이가 발생할 수 있습니다.",
    "rc-time-constant-calculator": "RC 시간상수는 `τ = R × C`로 계산합니다. 1τ, 3τ, 5τ 값을 함께 표시합니다. 일반적으로 1τ에서는 약 63.2% 충전 또는 약 36.8% 방전 상태가 됩니다. 5τ는 최종값에 거의 가까워지는 시간으로 자주 사용됩니다.",
    "reactance-calculator": "커패시터 리액턴스는 `Xc = 1 / (2πfC)`로 계산합니다. 인덕터 리액턴스는 `Xl = 2πfL`로 계산합니다. 주파수, 커패시턴스, 인덕턴스 값은 선택한 단위에 맞게 환산한 뒤 계산합니다.",
    "image-resizer": "이미지 리사이즈는 원본 이미지를 브라우저 canvas에 그린 뒤 지정한 width/height로 다시 렌더링합니다. 선택한 이미지는 서버로 업로드되지 않으며 현재 브라우저 안에서만 처리됩니다. 일부 브라우저에서는 이미지 형식 지원 범위가 다를 수 있습니다.",
    "image-compressor": "이미지 압축은 브라우저에서 지원하는 이미지 인코딩 방식을 사용해 품질 값을 조정합니다. JPG와 WebP는 품질 값이 반영되지만, PNG는 브라우저 구현에 따라 품질 옵션 효과가 제한될 수 있습니다. 선택한 이미지는 서버로 업로드되지 않습니다.",
    "webp-converter": "WebP 변환은 브라우저의 WebP 인코딩 지원을 사용합니다. JPG와 PNG 이미지를 canvas에 그린 뒤 WebP 형식으로 다시 인코딩합니다. 일부 브라우저에서는 WebP 인코딩 지원 범위가 다를 수 있습니다.",
    "image-cropper": "이미지 자르기는 원본 이미지를 브라우저 canvas에 그린 뒤, 사용자가 선택한 영역의 좌표와 크기를 기준으로 새 이미지로 렌더링합니다. 선택한 이미지는 서버로 업로드되지 않고 현재 브라우저 안에서만 처리됩니다.",
    "image-rotate-flip": "이미지 회전과 뒤집기는 원본 이미지를 브라우저 canvas에 다시 그리는 방식으로 처리합니다. 회전 각도와 뒤집기 방향에 따라 canvas 좌표계를 변환한 뒤 결과 이미지를 생성합니다. 선택한 이미지는 서버로 업로드되지 않습니다.",
    "image-format-converter": "이미지 포맷 변환은 원본 이미지를 브라우저 canvas에 그린 뒤, 선택한 출력 형식으로 다시 인코딩하는 방식으로 처리합니다. JPG와 WebP는 품질 값을 조정할 수 있으며, PNG는 브라우저 지원 범위에 따라 품질 설정이 제한될 수 있습니다. 투명 배경이 있는 이미지를 JPG로 변환하면 투명 영역은 흰색 배경으로 처리될 수 있습니다.",
    "image-mosaic": "이미지 모자이크는 선택한 영역을 브라우저 canvas에서 작은 크기로 축소한 뒤 다시 확대해 픽셀 블록처럼 보이게 만드는 방식으로 처리합니다. 선택한 이미지는 서버로 업로드되지 않고 현재 브라우저 안에서만 처리됩니다.",
    "image-watermark": "이미지 워터마크는 원본 이미지를 브라우저 canvas에 그린 뒤 선택한 위치에 텍스트를 합성하는 방식으로 처리합니다. 글자 크기, 색상, 회전 각도, 투명도는 canvas에 그릴 때 적용됩니다. 선택한 이미지는 서버로 업로드되지 않습니다.",
    "remove-image-metadata": "브라우저 canvas로 다시 저장하는 방식은 대부분의 이미지 메타데이터를 제거하지만, 모든 형식의 메타데이터 제거를 보장하지는 않습니다.",
    "image-color-picker": "이미지 색상 추출은 브라우저 canvas에 그린 이미지에서 사용자가 클릭한 좌표의 픽셀 데이터를 읽어 HEX, RGB, HSL 값으로 변환합니다.",
    "text-compare": "텍스트 비교는 원본 텍스트와 비교 텍스트를 줄 단위로 나누어 같은 위치의 줄을 비교합니다. 공백 무시 옵션은 모든 공백을 제거한 값으로 비교하고, 대소문자 무시 옵션은 소문자로 변환한 값으로 비교합니다.",
  },
  en: {
    "character-counter": "Characters with spaces include spaces, tabs, and line breaks. Characters without spaces exclude spaces, tabs, and line breaks. Word count is calculated by splitting the text on whitespace.",
    "remove-spaces": "Remove all spaces removes spaces, tabs, and line breaks. Trim whole text removes only whitespace at the start and end of the input. Trim every line removes leading and trailing whitespace from each line individually.",
    "case-converter": "English text is converted to uppercase, lowercase, or title case based on the browser's string handling. Korean text, numbers, and special characters are not affected by letter case conversion.",
    "percent-calculator": "B% of A is calculated as `A × B / 100`. A as a percentage of B is calculated as `A / B × 100`. Increase or decrease rate is calculated as `(new value - old value) / old value × 100`.",
    "discount-calculator": "Discount amount is calculated as `original price × discount rate / 100`. Final price is calculated as `original price - discount amount`.",
    "vat-calculator": "VAT is calculated as `supply amount × rate`. Total amount is calculated as `supply amount + VAT`. To derive the supply amount from the total, the tool uses `total amount / (1 + rate)`. The default rate is 10%, and you can change it manually.",
    "date-calculator": "Date difference is calculated from `end date - start date`. A date after N days is calculated as `base date + N days`, and a date before N days is calculated as `base date - N days`.",
    "dday-calculator": "D-Day is calculated as the number of days in `target date - base date`. A positive result means days remaining until the target date, while a negative result means the target date has passed.",
    "age-calculator": "Age is calculated by subtracting the birth year from the base year. If the birthday has not occurred yet in the base year, one year is subtracted.",
    "bmi-calculator": "BMI is calculated as `weight(kg) / height(m)^2`. The result is for reference only and does not replace medical diagnosis or health assessment.",
    "unit-converter": "Length uses `1 m = 100 cm`, `1 inch = 2.54 cm`, `1 ft = 0.3048 m`, and `1 mil = 0.001 inch`. Weight uses `1 kg = 1000 g` and `1 lb = 453.59237 g`. Temperature uses `F = C × 9 / 5 + 32` and `K = C + 273.15`.",
    "unix-timestamp-converter": "A Unix timestamp represents elapsed time since `1970-01-01 00:00:00 UTC`. The tool determines seconds or milliseconds from the input size and displays the result in the user's local time.",
    "pyeong-calculator": "1 pyeong is based on `3.305785㎡`. Pyeong is calculated as `㎡ / 3.305785`. Square meters are calculated as `pyeong × 3.305785`.",
    "json-formatter": "`JSON.parse` validates the input. Formatted JSON is generated with `JSON.stringify` using indentation. Minified output is generated as a JSON string without spaces and line breaks. Your input is processed only in the browser and is not sent to a server.",
    "base64-converter": "Text is encoded to Base64 using UTF-8. Base64 values are decoded back to UTF-8 text. Invalid Base64 input cannot be decoded and is shown as an error.",
    "url-encoder-decoder": "URL encoding uses `encodeURIComponent`. URL decoding uses `decodeURIComponent`. Use it to convert spaces, Korean text, and special characters into a safer string for URLs.",
    "csv-json-converter": "When converting CSV to JSON, the first row is used as the header. Each CSV row becomes a JSON object using header names as keys. When converting JSON to CSV, keys from the object array are used as CSV headers.",
    "margin-calculator": "Fee is calculated as `sale price × fee rate / 100`. Margin is calculated as `sale price - cost - fee`. Margin rate is calculated as `margin / sale price × 100`.",
    "compound-interest-calculator": "This calculator uses monthly compounding. The monthly rate is converted from `annual rate / 12`. Each month, the monthly rate is applied to the balance, then the monthly contribution is added to get the next month's balance. The simple compound formula is `final amount = principal × (1 + rate)^period`, and interest is calculated as `final amount - principal`.",
    "loan-interest-calculator": "Amortized repayment is calculated as a fixed monthly payment. Equal principal repayment pays the same principal amount each month and calculates interest on the remaining balance. Interest-only repayment is a simple estimate where monthly interest is paid and the principal is repaid at maturity. Actual loan terms, fees, and lender rules can change the result.",
    "salary-net-calculator": "Annual salary is divided by 12, then the monthly tax-free amount is excluded before applying the deduction rate entered by the user. Actual tax, insurance, and deduction rules can vary by year and personal situation, so the result should be treated as a simple estimate.",
    "ohms-law-calculator": "The calculation is based on Ohm's law, `V = I × R`. Power uses `P = V × I`, `P = V^2 / R`, and `P = I^2 × R`. The tool calculates the remaining values from the combination of values you enter.",
    "led-resistor-calculator": "The required series resistor is calculated as `R = (Vs - Vf) / If`. Here, `Vs` is the supply voltage, `Vf` is the LED forward voltage, and `If` is the LED current. Resistor power is calculated as `P = I^2 × R`.",
    "voltage-divider-calculator": "Voltage divider output is calculated as `Vout = Vin × R2 / (R1 + R2)`. R1 is the resistor on the input voltage side, and R2 is the resistor on the ground side.",
    "battery-life-calculator": "Estimated runtime is calculated as `battery capacity(mAh) / current draw(mA)`. Actual runtime can vary with battery discharge characteristics, temperature, circuit efficiency, and load changes.",
    "resistor-color-code-calculator": "This calculator uses the 4-band resistor standard. Resistance is calculated as `(first digit × 10 + second digit) × multiplier`. Tolerance is displayed from the fourth band color.",
    "capacitance-converter": "Capacitance units are converted using `1 F = 1000 mF`, `1 mF = 1000 µF`, `1 µF = 1000 nF`, and `1 nF = 1000 pF`. `µF` and `uF` are treated as the same unit.",
    "series-parallel-resistor-calculator": "Series equivalent resistance is calculated as `Rtotal = R1 + R2 + R3 + ...`. Parallel equivalent resistance is calculated as `1 / Rtotal = 1/R1 + 1/R2 + 1/R3 + ...`. Parallel calculations cannot use 0Ω or negative resistance values.",
    "filter-calculator": "The cutoff frequency of an RC filter is calculated as fc = 1 / (2πRC). The cutoff frequency of an RL filter is calculated as fc = R / (2πL). Low-pass and high-pass filters use the cutoff frequency as the same reference point, but they pass or attenuate different frequency ranges. At the cutoff frequency, the output is about 70.7% of the input, or -3 dB.",
    "awg-wire-size-converter": "AWG wire diameter is calculated with `d(inch) = 0.005 × 92^((36 - AWG) / 39)`. Cross-sectional area and copper resistance are reference values derived from the calculated diameter. Current rating depends on insulation, temperature, wiring method, and standards, so it should be verified separately.",
    "dbm-watt-converter": "To convert dBm to mW, the tool uses `P(mW) = 10^(dBm / 10)`. To convert mW to dBm, it uses `dBm = 10 × log10(P(mW))`. W and mW are converted using `P(mW) = P(W) × 1000`.",
    "frequency-wavelength-converter": "The tool uses the vacuum/air speed of light, `c = 299,792,458 m/s`. Wavelength is calculated as `λ = c / f`. Frequency is calculated as `f = c / λ`. Propagation speed can vary by medium, so real-world results may differ.",
    "rc-time-constant-calculator": "The RC time constant is calculated as `τ = R × C`. The tool also shows 1τ, 3τ, and 5τ. In general, 1τ corresponds to about 63.2% charged or about 36.8% discharged. 5τ is commonly used as a near-final settling time.",
    "reactance-calculator": "Capacitive reactance is calculated as `Xc = 1 / (2πfC)`. Inductive reactance is calculated as `Xl = 2πfL`. Frequency, capacitance, and inductance values are converted according to the selected units before calculation.",
    "image-resizer": "Image resizing draws the source image to a browser canvas and renders it again at the specified width and height. Selected images are not uploaded to a server and are processed only in your browser. Image format support can vary by browser.",
    "image-compressor": "Image compression uses the image encoding methods supported by the browser and adjusts the quality value. JPG and WebP generally use the quality setting, while PNG quality support can be limited depending on the browser implementation. Selected images are not uploaded to a server.",
    "webp-converter": "WebP conversion uses the browser's WebP encoding support. The JPG or PNG image is drawn to a canvas and encoded again as WebP. WebP encoding support can vary by browser.",
    "image-cropper": "Image cropping draws the original image onto a browser canvas and renders a new image from the selected coordinates and size. Selected images are not uploaded to a server and are processed only in your browser.",
    "image-rotate-flip": "Image rotation and flipping are processed by redrawing the original image on a browser canvas. The canvas coordinate system is transformed based on the rotation angle or flip direction before generating the result image. Selected images are not uploaded to a server.",
    "image-format-converter": "Image format conversion draws the original image onto a browser canvas and re-encodes it into the selected output format. JPG and WebP support quality settings, while PNG quality control may be limited depending on browser support. When converting transparent images to JPG, transparent areas may be rendered with a white background.",
    "image-mosaic": "Image mosaic processing is done by scaling the selected area down on a browser canvas and then scaling it back up to create a pixelated block effect. Selected images are not uploaded to a server and are processed only in your browser.",
    "image-watermark": "Image watermarking draws the source image onto a browser canvas and composites text at the selected position. Font size, color, rotation, and opacity are applied while drawing on the canvas. Selected images are not uploaded to a server.",
    "remove-image-metadata": "Re-saving through a browser canvas removes most image metadata, but it may not guarantee removal of every metadata field.",
    "image-color-picker": "Image color picking reads pixel data from the clicked canvas coordinate and converts it to HEX, RGB, and HSL values.",
    "text-compare": "Text comparison splits the original and comparison text into lines and compares lines at the same positions. Ignore whitespace compares values after removing whitespace, and ignore case compares lowercased values.",
  },
} satisfies Record<Lang, Partial<Record<ToolSlug, string>>>;

export function getToolBasis(lang: Lang, slug: ToolSlug) {
  return toolBasis[lang][slug];
}

export function isLang(value: string | undefined): value is Lang {
  return value === "ko" || value === "en";
}

export function getCategoryItems(lang: Lang) {
  return categorySlugs.map((slug) => ({
    slug,
    path: `/${lang}/tools/${slug}`,
    ...i18n[lang].categories[slug],
  }));
}

export function getTools(lang: Lang) {
  return baseTools.map((tool) => ({
    ...tool,
    category: tool.category as CategorySlug,
    path: `/${lang}/tools/${tool.slug}`,
    ...i18n[lang].tools[tool.slug],
  }));
}

export function getToolsByCategory(lang: Lang, category: CategorySlug) {
  return getTools(lang).filter((tool) => tool.category === category);
}

export function getTool(lang: Lang, slug: string) {
  return getTools(lang).find((tool) => tool.slug === slug);
}

export function getRelatedTools(lang: Lang, slug: string, limit = 3) {
  if (["image-resizer", "image-compressor", "webp-converter", "image-cropper", "image-rotate-flip", "image-format-converter", "image-mosaic", "image-watermark", "remove-image-metadata", "image-color-picker"].includes(slug)) {
    const relatedByImageTool: Record<string, string[]> = {
      "image-cropper": ["image-resizer", "image-compressor", "webp-converter"],
      "image-rotate-flip": ["image-resizer", "image-cropper", "webp-converter"],
      "image-format-converter": ["webp-converter", "image-compressor", "image-resizer"],
      "image-mosaic": ["image-cropper", "image-resizer", "image-compressor", "image-format-converter"],
      "image-watermark": ["image-resizer", "image-compressor", "image-format-converter"],
      "remove-image-metadata": ["image-compressor", "image-format-converter", "webp-converter"],
      "image-color-picker": ["image-cropper", "image-resizer", "image-format-converter"],
    };
    return (relatedByImageTool[slug] ?? ["image-resizer", "image-compressor", "webp-converter"])
      .filter((toolSlug) => toolSlug !== slug)
      .map((toolSlug) => getTool(lang, toolSlug))
      .filter((tool): tool is NonNullable<ReturnType<typeof getTool>> => Boolean(tool));
  }

  if (slug === "filter-calculator") {
    return ["rc-time-constant-calculator", "reactance-calculator", "capacitance-converter", "ohms-law-calculator"]
      .map((toolSlug) => getTool(lang, toolSlug))
      .filter((tool): tool is NonNullable<ReturnType<typeof getTool>> => Boolean(tool));
  }

  const tool = getTool(lang, slug);
  if (!tool) return [];

  return getTools(lang).filter((item) => item.category === tool.category && item.slug !== slug).slice(0, limit);
}
