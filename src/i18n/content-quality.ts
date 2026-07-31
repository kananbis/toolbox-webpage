import type { CategorySlug, Lang, ToolSlug } from "./translations";

type Section = {
  title: string;
  body?: string;
  items?: string[];
};

type ToolEnhancement = {
  situations?: Section;
  options?: Section;
  interpretation?: Section;
  limitations?: Section;
  troubleshooting?: Section;
};

type CategoryEnhancement = {
  guide: Section[];
};

type FaqItem = {
  question: string;
  answer: string;
};

const toolEnhancements: Record<Lang, Partial<Record<ToolSlug, ToolEnhancement>>> = {
  ko: {
    "image-compressor": {
      situations: { title: "이 도구가 필요한 상황", items: ["블로그나 쇼핑몰에 올릴 이미지를 더 가볍게 만들 때", "모바일에서 로딩이 느린 JPG, PNG, WebP 파일을 줄일 때", "해상도는 유지하면서 품질 값을 조절해 용량을 줄이고 싶을 때"] },
      options: { title: "품질 값 선택 기준", body: "JPG와 WebP는 품질 값을 낮출수록 용량이 줄어들 수 있지만 세부 묘사가 손실될 수 있습니다. PNG는 사진보다 로고, 아이콘, 캡처 이미지에서 압축 효과가 다르게 나타날 수 있습니다." },
      interpretation: { title: "결과 확인 방법", body: "용량 감소율만 보지 말고 확대해서 글자, 얼굴, 경계선 주변에 깨짐이 생겼는지 확인하세요. 품질 차이가 눈에 띄면 품질 값을 조금 올리는 편이 좋습니다." },
      limitations: { title: "제한사항", body: "이미 충분히 압축된 이미지나 색상이 단순한 PNG는 기대보다 줄어들지 않을 수 있습니다. 투명도가 필요한 이미지는 JPG가 아니라 PNG 또는 WebP 출력을 사용해야 합니다." },
    },
    "image-resizer": {
      situations: { title: "언제 사용하면 좋은가요?", items: ["프로필 이미지나 썸네일 크기를 맞출 때", "웹 업로드 제한에 맞춰 가로세로 크기를 줄일 때", "원본 비율을 유지한 채 긴 변 기준으로 줄이고 싶을 때"] },
      options: { title: "크기 설정 기준", body: "원본 비율 유지 옵션을 사용하면 이미지가 찌그러지지 않습니다. 정확한 배너 규격이 필요할 때만 가로와 세로를 직접 지정하세요." },
      interpretation: { title: "리사이즈와 압축의 차이", body: "리사이즈는 픽셀 수를 줄이는 작업이고, 압축은 저장 품질이나 형식을 조정하는 작업입니다. 큰 사진은 먼저 크기를 줄인 뒤 압축하면 더 안정적으로 용량을 줄일 수 있습니다." },
      limitations: { title: "주의사항", body: "작은 이미지를 크게 확대하면 선명도가 좋아지지 않습니다. 확대가 필요한 경우 원본 해상도가 충분한 파일을 사용하는 것이 좋습니다." },
    },
    "image-format-converter": {
      situations: { title: "형식 선택 가이드", items: ["사진 공유와 호환성이 중요하면 JPG", "투명 배경이나 선명한 그래픽이 중요하면 PNG", "웹 용량을 줄이고 최신 브라우저 중심으로 사용하면 WebP"] },
      options: { title: "투명도와 품질", body: "JPG는 투명도를 지원하지 않습니다. 투명 PNG를 JPG로 바꾸면 배경색과 합성됩니다. WebP는 투명도를 유지하면서도 작은 용량을 기대할 수 있지만 일부 오래된 프로그램에서는 호환성이 떨어질 수 있습니다." },
      limitations: { title: "변환으로 해결되지 않는 것", body: "낮은 해상도나 이미 손상된 이미지를 다른 형식으로 바꿔도 원본 품질이 복원되지는 않습니다. 형식 변환은 호환성, 용량, 투명도 지원을 바꾸는 작업입니다." },
    },
    "image-color-picker": {
      situations: { title: "활용 예", items: ["로고 이미지에서 브랜드 색상 HEX 값 확인", "캡처 이미지의 버튼 색상 추출", "디자인 시안의 배경색과 텍스트 색상 비교"] },
      options: { title: "색상 값 해석", body: "HEX는 웹 CSS에서 쓰기 좋고, RGB는 화면 픽셀 값을 확인할 때 직관적입니다. HSL은 밝기와 채도를 조절하며 비슷한 색을 만들 때 유용합니다." },
      limitations: { title: "주의사항", body: "이미지가 축소되어 보여도 실제 픽셀 기준으로 색상을 읽습니다. 반투명 픽셀이나 체크무늬 미리보기 위에서 보이는 색은 배경과 합성되어 보일 수 있습니다." },
    },
    "pdf-merger": {
      situations: { title: "사용하기 좋은 경우", items: ["여러 계약서 PDF를 하나로 묶을 때", "스캔한 페이지 파일을 순서대로 합칠 때", "보고서 본문과 첨부 자료를 하나의 PDF로 정리할 때"] },
      options: { title: "순서 확인", body: "PDF 합치기는 선택한 파일의 페이지를 현재 목록 순서대로 새 문서에 복사합니다. 다운로드 전 파일 순서가 실제 문서 순서와 맞는지 확인하세요." },
      limitations: { title: "처리 제한", body: "암호화되었거나 손상된 PDF는 브라우저에서 읽지 못할 수 있습니다. 큰 PDF 여러 개를 합치면 브라우저 메모리를 많이 사용할 수 있으므로 원본을 보관하고 작업하세요." },
    },
    "audio-converter": {
      situations: { title: "출력 형식 선택", items: ["호환성과 작은 용량이 필요하면 MP3", "편집용 무압축 파일이 필요하면 WAV", "웹/오픈 포맷을 선호하면 OGG", "무손실 보관이 목적이면 FLAC"] },
      options: { title: "손실과 무손실", body: "MP3와 OGG는 손실 압축 형식입니다. FLAC은 무손실 형식이지만 MP3를 FLAC으로 바꾼다고 이미 손실된 음질이 복원되지는 않습니다." },
      limitations: { title: "브라우저 처리 주의", body: "큰 오디오 파일은 변환 전에 메모리 사용량이 커질 수 있습니다. 변환 중에는 페이지를 닫지 말고 결과가 생성된 뒤 재생 가능 여부를 확인하세요." },
    },
    "audio-cutter": {
      situations: { title: "자르기 결과가 필요한 상황", items: ["긴 녹음에서 필요한 말소리 구간만 저장", "효과음 앞뒤 무음 제거", "벨소리나 샘플로 쓸 짧은 구간 만들기"] },
      options: { title: "시간 선택 기준", body: "파형에서 대략적인 시작점과 종료점을 잡고, 필요하면 시간 입력으로 정밀하게 보정하세요. 출력 형식에 따라 정확한 구간을 위해 재인코딩이 필요할 수 있습니다." },
      limitations: { title: "음질과 형식", body: "MP3나 OGG로 저장하면 다시 손실 압축될 수 있습니다. 손실을 피하고 싶다면 원본이 무손실일 때 WAV 또는 FLAC 출력을 고려하세요." },
    },
    "audio-compressor": {
      situations: { title: "압축 방식 선택", items: ["말소리 공유용이면 낮은 MP3 비트레이트", "음악 품질을 어느 정도 유지하려면 192kbps 이상 MP3", "무손실을 유지하려면 FLAC 압축 수준 조정"] },
      options: { title: "비트레이트와 용량", body: "비트레이트를 낮추면 파일 크기는 줄어들 수 있지만 고음, 공간감, 배경음이 손상될 수 있습니다. FLAC 압축 수준은 음질이 아니라 처리 시간과 파일 크기에 영향을 줍니다." },
      troubleshooting: { title: "용량이 줄지 않을 때", body: "원본이 이미 낮은 비트레이트이거나 짧은 파일이면 감소 폭이 작을 수 있습니다. WAV 원본은 MP3나 OGG로 바꾸면 크게 줄어드는 경우가 많습니다." },
    },
    "audio-merger": {
      situations: { title: "합치기와 믹싱의 차이", body: "이 도구는 여러 파일을 순서대로 이어 붙이는 용도입니다. 여러 소리를 동시에 겹쳐 재생하는 멀티트랙 믹싱 도구는 아닙니다." },
      options: { title: "전환 옵션", body: "무음 삽입은 파일 사이에 쉬는 구간을 넣고, 크로스페이드는 앞 파일의 끝과 다음 파일의 시작을 겹쳐 부드럽게 연결합니다. 각 파일의 선택 구간이 너무 짧으면 긴 크로스페이드를 사용할 수 없습니다." },
      interpretation: { title: "예상 길이 계산", body: "전체 길이는 각 파일의 선택 구간, 삽입한 무음, 크로스페이드로 겹치는 시간을 반영해 계산됩니다. 실제 출력은 인코딩 방식에 따라 아주 작은 차이가 날 수 있습니다." },
    },
    "iphone-ringtone-maker": {
      situations: { title: "M4R 결과 이해", body: "M4R은 아이폰 벨소리에 쓰이는 MP4 계열 컨테이너입니다. 이 도구는 선택 구간을 AAC 오디오로 인코딩해 M4R 파일을 만듭니다." },
      options: { title: "길이와 페이드", body: "아이폰 벨소리는 짧게 쓰는 경우가 많으므로 30초 이하를 권장합니다. 페이드 아웃을 넣으면 음악 끝부분이 갑자기 끊기는 느낌을 줄일 수 있습니다." },
      limitations: { title: "아이폰 등록 주의", body: "다운로드만으로 벨소리가 자동 등록되지는 않습니다. 기기와 운영체제에 따라 GarageBand 또는 Apple 기기 관리 기능을 이용해 추가해야 합니다. 이 도구는 Apple Inc.와 제휴하지 않습니다." },
    },
    "character-counter": {
      situations: { title: "확인할 수 있는 값", body: "공백 포함 글자수, 공백 제외 글자수, 단어수, 줄 수를 한 번에 확인합니다. 자기소개서, 광고 문구, SNS 문장처럼 제한 길이가 있는 글을 점검할 때 유용합니다." },
      options: { title: "결과 해석", body: "서비스마다 글자수 기준이 다를 수 있습니다. 줄바꿈, 이모지, 조합형 문자, 공백을 어떻게 세는지 제출하려는 서비스의 기준과 함께 확인하세요." },
      limitations: { title: "주의사항", body: "이 도구의 결과는 브라우저 문자열 기준입니다. 특정 기관이나 플랫폼의 내부 계산 방식과 완전히 같다고 보장하지 않습니다." },
    },
    "date-calculator": {
      situations: { title: "계산 기준", body: "두 날짜 사이의 차이를 계산하거나 기준일에서 며칠 전후 날짜를 구합니다. 날짜 차이는 시간대와 시간 입력이 아니라 달력 날짜 기준으로 다룹니다." },
      options: { title: "포함/제외 기준 확인", body: "일정 계산에서는 시작일을 포함하는지 제외하는지에 따라 결과가 달라질 수 있습니다. 계약 기간이나 근무일 계산에는 해당 기관의 기준을 함께 확인하세요." },
      limitations: { title: "적용하지 않는 조건", body: "공휴일, 영업일, 회사 휴무일, 시간 단위 차이는 기본 날짜 계산에 포함되지 않습니다." },
    },
    "loan-interest-calculator": {
      situations: { title: "상환 방식 차이", items: ["원리금균등은 매월 납입액을 일정하게 맞추는 방식", "원금균등은 매월 갚는 원금이 같고 초반 납입액이 큰 방식", "만기일시상환은 기간 중 이자만 내고 만기에 원금을 갚는 방식"] },
      options: { title: "결과가 실제 금융기관과 다른 이유", body: "은행 계산에는 실행일, 첫 납입일, 일할 계산, 우대금리, 수수료, 세금, 중도상환 조건이 반영될 수 있습니다. 이 도구는 구조를 비교하는 참고 계산용입니다." },
      interpretation: { title: "비교할 값", body: "월 납입액만 보지 말고 총 이자, 총 상환액, 초반 현금 흐름을 함께 비교하세요." },
    },
    "percent-calculator": {
      situations: { title: "퍼센트 계산 유형", items: ["전체 값의 몇 퍼센트인지 계산", "A에서 B로 변할 때 증가율 또는 감소율 계산", "특정 비율에 해당하는 금액이나 수량 계산"] },
      options: { title: "공식", body: "A의 p%는 A x p / 100으로 계산합니다. 증가율은 (새 값 - 기존 값) / 기존 값 x 100입니다. 기존 값이 0이면 증가율 계산은 의미가 달라질 수 있습니다." },
      limitations: { title: "반올림", body: "소수점 결과는 표시 과정에서 반올림될 수 있습니다. 정산이나 세금 계산에는 원 단위 처리 기준을 별도로 확인하세요." },
    },
    "unit-converter": {
      situations: { title: "변환 기준", body: "길이, 무게, 온도처럼 고정 공식으로 계산할 수 있는 단위를 변환합니다. 환율이나 실시간 가격처럼 계속 바뀌는 값은 이 도구의 대상이 아닙니다." },
      options: { title: "온도 변환", body: "섭씨에서 화씨는 C x 9 / 5 + 32, 화씨에서 섭씨는 (F - 32) x 5 / 9로 계산합니다. 길이와 무게는 고정 배율을 사용합니다." },
      limitations: { title: "정밀도", body: "결과는 화면 표시를 위해 반올림될 수 있습니다. 실험, 설계, 계약에 쓰는 값은 필요한 자릿수로 다시 확인하세요." },
    },
  },
  en: {
    "image-compressor": {
      situations: { title: "When to Use This Tool", items: ["Make images lighter before uploading to blogs or stores", "Reduce slow-loading JPG, PNG, or WebP files", "Keep dimensions while adjusting quality and file size"] },
      options: { title: "Choosing a Quality Value", body: "For JPG and WebP, lower quality can reduce file size but may remove detail. PNG compression behaves differently depending on whether the image is a photo, logo, icon, or screenshot." },
      interpretation: { title: "How to Check the Result", body: "Do not judge only by file size. Zoom in and check text, faces, and edges. If artifacts are visible, increase the quality value." },
      limitations: { title: "Limits", body: "Already-compressed images may not shrink much. If transparency is required, use PNG or WebP instead of JPG." },
    },
    "image-resizer": {
      situations: { title: "Useful Cases", items: ["Resize profile images or thumbnails", "Fit upload size requirements", "Reduce the long side while keeping the original ratio"] },
      options: { title: "Size Settings", body: "Keeping the aspect ratio prevents distortion. Set width and height manually only when you need an exact banner or layout size." },
      interpretation: { title: "Resize vs Compression", body: "Resizing changes pixel dimensions. Compression changes storage quality or format. For large photos, resize first and then compress if needed." },
      limitations: { title: "Notes", body: "Enlarging a small image does not restore detail. Use a high-resolution original when you need a larger output." },
    },
    "image-format-converter": {
      situations: { title: "Format Guide", items: ["Use JPG for photos and broad compatibility", "Use PNG for transparency and crisp graphics", "Use WebP for smaller web images in modern browsers"] },
      options: { title: "Transparency and Quality", body: "JPG does not support transparency. Transparent PNG files are flattened against a background when saved as JPG. WebP can keep transparency but may be less compatible with older apps." },
      limitations: { title: "What Conversion Cannot Fix", body: "Changing format does not restore low resolution or damaged image detail. It mainly changes compatibility, file size, and transparency support." },
    },
    "image-color-picker": {
      situations: { title: "Use Cases", items: ["Find the HEX value from a logo", "Pick a button color from a screenshot", "Compare background and text colors from a design image"] },
      options: { title: "Reading Color Values", body: "HEX is convenient for CSS, RGB shows screen pixel values directly, and HSL is useful when adjusting brightness or saturation." },
      limitations: { title: "Notes", body: "The tool reads actual image pixels even if the preview is scaled. Semi-transparent pixels or checkerboard previews can appear visually mixed with the preview background." },
    },
    "pdf-merger": {
      situations: { title: "Useful Cases", items: ["Combine several contract PDFs", "Merge scanned page files in order", "Put a report and appendices into one PDF"] },
      options: { title: "Check the Order", body: "PDF merging copies pages into a new document using the current file order. Check the list before downloading." },
      limitations: { title: "Limits", body: "Encrypted or damaged PDFs may not be readable in the browser. Large PDF sets can use significant memory, so keep original files." },
    },
    "audio-converter": {
      situations: { title: "Choosing an Output Format", items: ["MP3 for compatibility and smaller files", "WAV for uncompressed editing", "OGG for an open web-oriented format", "FLAC for lossless storage"] },
      options: { title: "Lossy and Lossless", body: "MP3 and OGG are lossy formats. FLAC is lossless, but converting MP3 to FLAC does not restore quality that was already lost." },
      limitations: { title: "Browser Processing Notes", body: "Large audio files can use significant memory before conversion. Keep the page open during processing and test the result after download." },
    },
    "audio-cutter": {
      situations: { title: "Useful Cases", items: ["Save only the needed part of a long recording", "Remove silence before or after a sound effect", "Create a short sample or ringtone source"] },
      options: { title: "Selecting Time Ranges", body: "Use the waveform for a rough range and time inputs for precise adjustment. Some output formats require re-encoding for accurate cutting." },
      limitations: { title: "Quality and Format", body: "Saving as MP3 or OGG can apply lossy compression again. If the source is lossless, consider WAV or FLAC when you want to avoid lossy output." },
    },
    "audio-compressor": {
      situations: { title: "Compression Choices", items: ["Lower MP3 bitrate for speech sharing", "192kbps or higher MP3 for music with reasonable quality", "FLAC compression level when lossless output is required"] },
      options: { title: "Bitrate and File Size", body: "Lower bitrate can reduce size but may damage high frequencies, space, and background detail. FLAC compression level affects encoding time and file size, not sound quality." },
      troubleshooting: { title: "When Size Does Not Decrease", body: "Files that are already short or low bitrate may not shrink much. WAV sources often shrink significantly when converted to MP3 or OGG." },
    },
    "audio-merger": {
      situations: { title: "Merging vs Mixing", body: "This tool joins files one after another. It is not a multitrack mixer for layering sounds at the same time." },
      options: { title: "Transition Options", body: "Silence inserts a gap between files. Crossfade overlaps the end of one file and the beginning of the next. Very short selected ranges cannot use long crossfades." },
      interpretation: { title: "Estimated Duration", body: "The total duration reflects selected ranges, inserted silence, and crossfade overlap. Encoded output may differ by a very small amount." },
    },
    "iphone-ringtone-maker": {
      situations: { title: "Understanding M4R", body: "M4R is an MP4-family container used for iPhone ringtones. This tool encodes the selected section as AAC audio inside an M4R file." },
      options: { title: "Length and Fade", body: "Short ringtones are easier to manage, so 30 seconds or less is recommended. Fade out can make the ending feel less abrupt." },
      limitations: { title: "Adding to iPhone", body: "Downloading the file does not automatically install it as a ringtone. Depending on your device and OS, you may need GarageBand or Apple device management tools. This tool is not affiliated with Apple Inc." },
    },
    "character-counter": {
      situations: { title: "What It Counts", body: "The tool shows characters with spaces, characters without spaces, words, and lines. It is useful for forms, ads, profile text, and posts with length limits." },
      options: { title: "Reading Results", body: "Different services may count text differently. Check how your target platform handles line breaks, emoji, composed characters, and spaces." },
      limitations: { title: "Note", body: "Results follow browser string handling and may not exactly match every institution or platform." },
    },
    "date-calculator": {
      situations: { title: "Calculation Basis", body: "This tool calculates the difference between calendar dates or adds/subtracts days from a base date. It does not use time-of-day differences." },
      options: { title: "Inclusive Date Rules", body: "Schedules can differ depending on whether the start date is included. Contracts and work periods should be checked against the relevant rule." },
      limitations: { title: "What Is Not Included", body: "Public holidays, business days, company holidays, and time-of-day differences are not included in the basic date calculation." },
    },
    "loan-interest-calculator": {
      situations: { title: "Repayment Types", items: ["Equal payment keeps monthly payments mostly stable", "Equal principal repays the same principal amount each month and starts higher", "Interest-only pays interest during the period and principal at maturity"] },
      options: { title: "Why Bank Results Can Differ", body: "Banks may include execution date, first payment date, daily interest, discounts, fees, taxes, and early repayment conditions. This tool is for comparing repayment structures." },
      interpretation: { title: "What to Compare", body: "Compare total interest, total repayment, and early-month cash flow, not only the monthly payment." },
    },
    "percent-calculator": {
      situations: { title: "Percent Calculation Types", items: ["Calculate a percentage of a value", "Calculate increase or decrease from A to B", "Find an amount represented by a given percentage"] },
      options: { title: "Formula", body: "p% of A is A x p / 100. Increase rate is (new value - old value) / old value x 100. If the old value is 0, the meaning of increase rate changes." },
      limitations: { title: "Rounding", body: "Decimal values may be rounded for display. Check required rounding rules for settlement or tax work." },
    },
    "unit-converter": {
      situations: { title: "Conversion Basis", body: "This tool converts units with fixed formulas, such as length, weight, and temperature. It is not for values that change constantly, such as exchange rates or market prices." },
      options: { title: "Temperature Formula", body: "Celsius to Fahrenheit is C x 9 / 5 + 32. Fahrenheit to Celsius is (F - 32) x 5 / 9. Length and weight use fixed ratios." },
      limitations: { title: "Precision", body: "Results may be rounded for display. For experiments, engineering, or contracts, verify the required number of digits separately." },
    },
  },
};

const categoryEnhancements: Record<Lang, Partial<Record<CategorySlug, CategoryEnhancement>>> = {
  ko: {
    audio: { guide: [
      { title: "오디오 도구 선택 가이드", body: "변환기는 형식을 바꾸고, 자르기는 필요한 구간만 저장하며, 압축은 용량을 줄이고, 합치기는 여러 파일을 순서대로 이어 붙입니다. 아이폰 벨소리 만들기는 M4R 출력에 특화되어 있습니다." },
      { title: "MP3, WAV, OGG, FLAC 차이", body: "MP3와 OGG는 손실 압축으로 용량을 줄이는 데 적합합니다. WAV는 편집용 무압축 파일에 가깝고 용량이 큽니다. FLAC은 무손실 압축이지만 MP3보다 큰 경우가 많습니다." },
      { title: "브라우저 메모리 주의", body: "오디오 파일은 디코딩 후 PCM 데이터로 커질 수 있습니다. 긴 FLAC이나 WAV 파일은 모바일에서 처리 시간이 길어지거나 실패할 수 있습니다." },
    ] },
    image: { guide: [
      { title: "이미지 작업 선택 가이드", body: "용량을 줄이고 싶으면 이미지 압축, 픽셀 크기를 바꾸려면 리사이즈, 파일 형식을 바꾸려면 형식 변환을 사용하세요. 색상 추출, 색상 대체, 투명화 도구는 픽셀 색상 기반 작업에 적합합니다." },
      { title: "JPG, PNG, WebP 선택 기준", body: "JPG는 사진과 호환성에 좋지만 투명도를 지원하지 않습니다. PNG는 투명 배경과 선명한 그래픽에 적합합니다. WebP는 웹에서 작은 용량을 기대할 수 있지만 일부 오래된 앱과 호환성이 떨어질 수 있습니다." },
      { title: "품질과 용량", body: "품질을 낮추면 용량이 줄 수 있지만 글자와 경계선이 깨질 수 있습니다. 중요한 이미지는 결과를 확대해서 확인하세요." },
    ] },
    pdf: { guide: [
      { title: "PDF 작업 차이", body: "PDF 합치기는 여러 파일을 하나로 묶고, 분할은 여러 결과 파일로 나누며, 페이지 추출은 선택한 페이지만 새 PDF로 저장합니다. 회전, 삭제, 번호, 워터마크 도구는 기존 문서를 새 파일로 다시 저장합니다." },
      { title: "처리 제한", body: "암호화되었거나 손상된 PDF는 브라우저에서 읽지 못할 수 있습니다. PDF 내용 인식, OCR, 잠금 해제, 전자서명은 현재 PDF 도구 범위에 포함되지 않습니다." },
      { title: "대용량 문서", body: "페이지 수가 많거나 이미지가 많은 PDF는 메모리를 많이 사용할 수 있습니다. 작업 전 원본 파일을 보관하고, 모바일에서는 작은 파일부터 시도하세요." },
    ] },
    converter: { guide: [
      { title: "값 변환과 파일 변환", body: "이 카테고리는 단위, 시간대, 타임스탬프처럼 값 자체를 변환하는 도구를 모읍니다. 이미지, 오디오, PDF 파일 변환은 각각의 전용 카테고리에서 제공합니다." },
      { title: "변환 기준과 반올림", body: "길이, 무게, 온도처럼 고정 공식이 있는 값은 브라우저에서 즉시 계산합니다. 표시 결과는 읽기 쉽도록 반올림될 수 있습니다." },
      { title: "실시간 데이터와의 차이", body: "환율이나 주가처럼 실시간 데이터가 필요한 변환은 외부 API 없이 정확히 제공하기 어렵습니다. 이 사이트의 변환기는 고정 기준이 있는 작업에 초점을 둡니다." },
    ] },
  },
  en: {
    audio: { guide: [
      { title: "Choosing an Audio Tool", body: "Use the converter to change formats, the cutter to save a range, the compressor to reduce file size, and the merger to join files in order. The iPhone ringtone maker is specialized for M4R output." },
      { title: "MP3, WAV, OGG, and FLAC", body: "MP3 and OGG are lossy formats suited for smaller files. WAV is closer to uncompressed editing audio and is large. FLAC is lossless but often larger than MP3." },
      { title: "Browser Memory", body: "Audio files can expand into large PCM data after decoding. Long FLAC or WAV files may be slow or fail on mobile devices." },
    ] },
    image: { guide: [
      { title: "Choosing an Image Tool", body: "Use image compression to reduce file size, resizing to change pixel dimensions, and format conversion to change JPG, PNG, or WebP output. Color tools work best for pixel-based color tasks." },
      { title: "JPG, PNG, and WebP", body: "JPG is good for photos and compatibility but does not support transparency. PNG is useful for transparent backgrounds and crisp graphics. WebP can be smaller on the web but may be less compatible with older apps." },
      { title: "Quality and File Size", body: "Lower quality can reduce file size but may introduce artifacts around text and edges. Check important images at a larger zoom." },
    ] },
    pdf: { guide: [
      { title: "PDF Task Differences", body: "Merging combines files, splitting creates multiple result files, and page extraction saves selected pages into one new PDF. Rotation, deletion, numbering, and watermark tools save a new edited PDF." },
      { title: "Processing Limits", body: "Encrypted or damaged PDFs may not be readable in the browser. OCR, unlocking, electronic signatures, and content recognition are outside the current PDF tool scope." },
      { title: "Large Documents", body: "PDFs with many pages or many images can use significant memory. Keep originals and try smaller files first on mobile." },
    ] },
    converter: { guide: [
      { title: "Value Conversion vs File Conversion", body: "This category is for values such as units, time zones, and timestamps. Image, audio, and PDF file conversion tools are provided in their own categories." },
      { title: "Conversion Basis and Rounding", body: "Values with fixed formulas, such as length, weight, and temperature, are calculated in the browser. Displayed results may be rounded for readability." },
      { title: "Difference from Live Data", body: "Conversions requiring live data, such as exchange rates or market prices, cannot be provided accurately without external APIs. These tools focus on fixed-reference conversions." },
    ] },
  },
};

const faqOverrides: Record<Lang, Partial<Record<ToolSlug, FaqItem[]>>> = {
  ko: {
    "image-compressor": [
      { question: "품질 값을 낮추면 무엇이 달라지나요?", answer: "파일 크기는 줄어들 수 있지만 글자, 경계선, 어두운 영역에 압축 흔적이 생길 수 있습니다." },
      { question: "PNG 파일이 잘 줄어들지 않는 이유는 무엇인가요?", answer: "PNG는 이미지 내용에 따라 압축 효율이 크게 달라집니다. 사진처럼 색 변화가 많은 이미지는 JPG나 WebP가 더 작을 수 있습니다." },
      { question: "이미지 해상도도 바뀌나요?", answer: "압축은 주로 저장 품질과 형식을 조정합니다. 픽셀 크기를 바꾸려면 이미지 리사이즈 도구를 사용하세요." },
    ],
    "image-resizer": [
      { question: "비율 유지 옵션은 왜 필요한가요?", answer: "원본 가로세로 비율을 유지해야 이미지가 눌리거나 늘어나지 않습니다." },
      { question: "이미지를 크게 만들면 선명해지나요?", answer: "아니요. 확대는 픽셀 수만 늘릴 뿐 원본에 없던 세부 정보를 복원하지 않습니다." },
      { question: "용량을 줄이려면 리사이즈와 압축 중 무엇을 먼저 하나요?", answer: "큰 사진은 먼저 필요한 크기로 줄이고, 그 다음 압축하면 용량 감소 효과가 안정적입니다." },
    ],
    "image-format-converter": [
      { question: "JPG로 바꾸면 투명 배경이 유지되나요?", answer: "아니요. JPG는 투명도를 지원하지 않아 배경색과 합성됩니다." },
      { question: "WebP는 언제 쓰면 좋나요?", answer: "웹에서 작은 용량이 중요하고 최신 브라우저 중심으로 사용할 때 적합합니다." },
      { question: "형식 변환으로 화질이 좋아질 수 있나요?", answer: "원본보다 품질이 좋아지지는 않습니다. 변환은 호환성, 용량, 투명도 지원을 바꾸는 작업입니다." },
    ],
    "image-color-picker": [
      { question: "HEX와 RGB는 무엇이 다른가요?", answer: "HEX는 CSS에 쓰기 쉬운 16진수 표기이고 RGB는 빨강, 초록, 파랑 값을 0부터 255로 표시합니다." },
      { question: "확대된 미리보기에서도 실제 픽셀 색상을 읽나요?", answer: "네. 화면에 맞춰 축소되어 보여도 실제 이미지 좌표의 픽셀 값을 읽도록 처리합니다." },
      { question: "반투명 픽셀은 어떻게 보이나요?", answer: "반투명 픽셀은 미리보기 배경과 섞여 보일 수 있으므로 HEX/RGB 값과 투명도 표시를 함께 확인하세요." },
    ],
    "pdf-merger": [
      { question: "PDF 순서를 바꿀 수 있나요?", answer: "파일 목록에서 순서를 조정한 뒤 합치면 해당 순서대로 페이지가 복사됩니다." },
      { question: "암호가 걸린 PDF도 합칠 수 있나요?", answer: "암호화된 PDF는 브라우저에서 읽지 못할 수 있습니다." },
      { question: "원본 PDF가 수정되나요?", answer: "아니요. 원본 파일은 그대로 두고 새 PDF 파일을 생성합니다." },
    ],
    "audio-converter": [
      { question: "MP3와 FLAC의 차이는 무엇인가요?", answer: "MP3는 손실 압축으로 용량이 작고, FLAC은 무손실 압축으로 음질 정보를 보존하지만 용량이 클 수 있습니다." },
      { question: "MP3를 FLAC으로 바꾸면 음질이 좋아지나요?", answer: "아니요. 이미 손실된 음질 정보는 FLAC으로 변환해도 복원되지 않습니다." },
      { question: "WAV 출력은 언제 쓰나요?", answer: "편집 프로그램에서 다루기 쉬운 무압축 계열 파일이 필요할 때 사용합니다. 대신 용량이 커질 수 있습니다." },
    ],
    "audio-cutter": [
      { question: "자르면 음질이 변하나요?", answer: "출력 형식에 따라 재인코딩이 발생할 수 있습니다. MP3나 OGG 출력은 손실 압축이 다시 적용될 수 있습니다." },
      { question: "파형과 시간 입력 중 무엇을 사용해야 하나요?", answer: "파형으로 구간을 빠르게 잡고, 정확한 위치가 필요하면 시간 입력으로 보정하세요." },
      { question: "긴 파일은 왜 느린가요?", answer: "브라우저에서 오디오를 디코딩하고 선택 구간을 다시 인코딩해야 하므로 재생 시간이 길고 파일이 클수록 오래 걸립니다." },
    ],
    "audio-compressor": [
      { question: "비트레이트를 낮추면 어떤 변화가 있나요?", answer: "용량은 줄어들 수 있지만 음질 손실이 커질 수 있습니다. 말소리와 음악에 적합한 값이 다릅니다." },
      { question: "FLAC 압축 수준은 음질 설정인가요?", answer: "아니요. FLAC 압축 수준은 무손실 상태에서 인코딩 시간과 파일 크기에 영향을 주는 설정입니다." },
      { question: "압축했는데 더 커질 수 있나요?", answer: "원본 형식과 선택한 출력 설정에 따라 결과가 원본보다 커질 수 있습니다." },
    ],
    "audio-merger": [
      { question: "서로 다른 형식도 합칠 수 있나요?", answer: "지원되는 형식이면 공통 출력 조건으로 변환해 하나의 파일로 합칩니다." },
      { question: "크로스페이드가 무엇인가요?", answer: "앞 파일의 끝과 다음 파일의 시작을 겹쳐 자연스럽게 이어지게 하는 전환 효과입니다." },
      { question: "멀티트랙 믹싱도 가능한가요?", answer: "아니요. 이 도구는 여러 파일을 순서대로 이어 붙이는 도구입니다." },
    ],
    "iphone-ringtone-maker": [
      { question: "M4R 파일이 무엇인가요?", answer: "아이폰 벨소리에 사용되는 MP4 계열 컨테이너이며 일반적으로 AAC 오디오를 포함합니다." },
      { question: "만든 파일이 자동으로 아이폰에 등록되나요?", answer: "아니요. 다운로드 후 기기와 운영체제에 맞는 추가 등록 과정이 필요합니다." },
      { question: "FLAC 입력도 결과가 FLAC인가요?", answer: "아니요. 아이폰 벨소리용 M4R을 만들기 위해 AAC로 변환됩니다." },
    ],
    "character-counter": [
      { question: "공백 포함과 공백 제외는 어떻게 다른가요?", answer: "공백 포함은 띄어쓰기와 줄바꿈을 함께 세고, 공백 제외는 공백 문자를 빼고 계산합니다." },
      { question: "이모지도 한 글자로 세나요?", answer: "브라우저 문자열 처리 방식에 따라 일부 이모지나 조합 문자는 기대와 다르게 계산될 수 있습니다." },
      { question: "제출 사이트의 글자수와 다를 수 있나요?", answer: "네. 각 서비스가 줄바꿈, 공백, 특수문자를 세는 기준이 다를 수 있습니다." },
    ],
    "date-calculator": [
      { question: "날짜 차이는 시작일을 포함하나요?", answer: "도구의 표시 기준을 확인해야 합니다. 일정이나 계약에서는 시작일 포함 여부에 따라 결과가 달라질 수 있습니다." },
      { question: "공휴일이나 영업일도 계산하나요?", answer: "기본 날짜 계산은 달력 날짜 기준이며 공휴일과 영업일은 별도로 반영하지 않습니다." },
      { question: "시간대가 결과에 영향을 주나요?", answer: "이 도구는 날짜 단위 계산에 초점을 두며 시간대 비교가 필요하면 시간대 변환기를 사용하세요." },
    ],
    "loan-interest-calculator": [
      { question: "원리금균등과 원금균등은 무엇이 다른가요?", answer: "원리금균등은 월 납입액을 일정하게 맞추고, 원금균등은 매월 같은 원금을 갚아 초반 납입액이 더 큽니다." },
      { question: "은행 결과와 왜 다를 수 있나요?", answer: "실제 금융기관은 실행일, 일할 계산, 우대금리, 수수료, 세금 등을 반영할 수 있습니다." },
      { question: "중도상환수수료도 포함되나요?", answer: "기본 계산에는 포함되지 않습니다. 실제 대출 조건은 금융기관 약관을 확인해야 합니다." },
    ],
    "percent-calculator": [
      { question: "증가율 공식은 무엇인가요?", answer: "증가율은 (새 값 - 기존 값) / 기존 값 x 100으로 계산합니다." },
      { question: "기존 값이 0이면 증가율을 계산할 수 있나요?", answer: "기존 값이 0이면 일반적인 증가율 공식의 분모가 0이 되어 해석에 주의해야 합니다." },
      { question: "결과는 반올림되나요?", answer: "화면 표시를 위해 소수점이 반올림될 수 있습니다. 정산에는 필요한 자릿수를 별도로 확인하세요." },
    ],
    "unit-converter": [
      { question: "단위 변환 기준은 고정인가요?", answer: "길이, 무게, 온도처럼 고정 공식이 있는 단위는 정해진 배율이나 공식으로 계산합니다." },
      { question: "환율도 변환할 수 있나요?", answer: "아니요. 환율은 실시간 데이터가 필요하므로 외부 API 없이 제공하지 않습니다." },
      { question: "소수점 결과가 정확한가요?", answer: "계산은 브라우저 숫자 연산을 사용하며 화면 표시 과정에서 반올림될 수 있습니다." },
    ],
  },
  en: {
    "image-compressor": [
      { question: "What changes when I lower quality?", answer: "The file may become smaller, but artifacts can appear around text, edges, and dark areas." },
      { question: "Why does PNG sometimes shrink very little?", answer: "PNG compression depends heavily on image content. Photos with many colors may be smaller as JPG or WebP." },
      { question: "Does compression resize the image?", answer: "Compression mainly changes storage quality or format. Use the image resizer to change pixel dimensions." },
    ],
    "image-resizer": [
      { question: "Why keep the aspect ratio?", answer: "Keeping the original ratio prevents the image from being stretched or squeezed." },
      { question: "Does enlarging make an image sharper?", answer: "No. Enlarging adds pixels but does not restore missing detail." },
      { question: "Should I resize or compress first?", answer: "For large photos, resize to the needed dimensions first, then compress if needed." },
    ],
    "image-format-converter": [
      { question: "Does JPG keep transparency?", answer: "No. JPG does not support transparency, so transparent areas are flattened against a background." },
      { question: "When should I use WebP?", answer: "Use WebP when web file size matters and modern browser support is acceptable." },
      { question: "Can format conversion improve quality?", answer: "It cannot create detail that is not in the source. It mainly changes compatibility, size, and transparency support." },
    ],
    "image-color-picker": [
      { question: "What is the difference between HEX and RGB?", answer: "HEX is a compact CSS-friendly value, while RGB shows red, green, and blue channels from 0 to 255." },
      { question: "Does it read actual pixels from a scaled preview?", answer: "Yes. The click position is mapped back to the image pixel coordinates." },
      { question: "How are semi-transparent pixels shown?", answer: "They may look mixed with the preview background, so check the displayed color values and transparency information together." },
    ],
    "pdf-merger": [
      { question: "Can I change the PDF order?", answer: "Yes. Reorder the file list before merging." },
      { question: "Can encrypted PDFs be merged?", answer: "Encrypted PDFs may not be readable in the browser." },
      { question: "Is the original PDF modified?", answer: "No. A new PDF is created and the original files are not changed." },
    ],
    "audio-converter": [
      { question: "What is the difference between MP3 and FLAC?", answer: "MP3 is lossy and smaller. FLAC is lossless but can be larger." },
      { question: "Does MP3 to FLAC improve sound quality?", answer: "No. Converting to FLAC does not restore quality already lost in MP3." },
      { question: "When should I use WAV output?", answer: "Use WAV when you need an uncompressed editing-friendly file. It can be large." },
    ],
    "audio-cutter": [
      { question: "Does trimming change audio quality?", answer: "Some output formats require re-encoding. MP3 or OGG output can apply lossy compression again." },
      { question: "Should I use the waveform or time inputs?", answer: "Use the waveform for quick selection and time inputs for precise adjustment." },
      { question: "Why are long files slow?", answer: "The browser needs to decode audio and encode the selected result, so longer and larger files take more time." },
    ],
    "audio-compressor": [
      { question: "What happens when bitrate is lowered?", answer: "File size can decrease, but quality loss can increase. Speech and music need different settings." },
      { question: "Is FLAC compression level a quality setting?", answer: "No. FLAC remains lossless; compression level affects encoding time and file size." },
      { question: "Can the compressed result be larger?", answer: "Yes. Depending on the source and output settings, the result can be larger than the original." },
    ],
    "audio-merger": [
      { question: "Can I merge different formats?", answer: "Supported formats can be converted to common output settings and merged." },
      { question: "What is crossfade?", answer: "Crossfade overlaps the end of one file with the beginning of the next for a smoother transition." },
      { question: "Is this a multitrack mixer?", answer: "No. This tool joins files in sequence rather than layering sounds." },
    ],
    "iphone-ringtone-maker": [
      { question: "What is an M4R file?", answer: "It is an MP4-family container used for iPhone ringtones and commonly contains AAC audio." },
      { question: "Is the ringtone installed automatically?", answer: "No. You need to add the downloaded file to your iPhone using a suitable device workflow." },
      { question: "Is FLAC input exported as FLAC?", answer: "No. It is converted to AAC inside an M4R ringtone file." },
    ],
    "character-counter": [
      { question: "What is the difference between with spaces and without spaces?", answer: "With spaces counts spaces and line breaks. Without spaces removes whitespace from the count." },
      { question: "Are emoji counted as one character?", answer: "Some emoji and composed characters may be counted differently depending on browser string handling." },
      { question: "Can another service show a different count?", answer: "Yes. Each platform may count line breaks, spaces, and special characters differently." },
    ],
    "date-calculator": [
      { question: "Is the start date included?", answer: "Check the displayed rule. Schedules and contracts can differ depending on inclusive date handling." },
      { question: "Does it count holidays or business days?", answer: "No. The basic calculation uses calendar dates and does not include holidays or business days." },
      { question: "Do time zones affect the result?", answer: "This tool focuses on date-level calculation. Use the time zone converter for time zone comparisons." },
    ],
    "loan-interest-calculator": [
      { question: "How are equal payment and equal principal different?", answer: "Equal payment keeps monthly payments mostly stable. Equal principal repays the same principal each month and starts higher." },
      { question: "Why can bank results differ?", answer: "Banks may include execution date, daily interest, discounts, fees, taxes, and other loan conditions." },
      { question: "Are early repayment fees included?", answer: "No. Basic results do not include early repayment fees. Check the lender's terms." },
    ],
    "percent-calculator": [
      { question: "What is the increase rate formula?", answer: "Increase rate is (new value - old value) / old value x 100." },
      { question: "Can I calculate increase from zero?", answer: "If the old value is zero, the normal formula divides by zero and needs special interpretation." },
      { question: "Are results rounded?", answer: "Values may be rounded for display. Check required decimal places for settlement work." },
    ],
    "unit-converter": [
      { question: "Are conversion factors fixed?", answer: "Units such as length, weight, and temperature use fixed ratios or formulas." },
      { question: "Can it convert exchange rates?", answer: "No. Exchange rates require live data and are not provided without an external API." },
      { question: "Are decimal results exact?", answer: "The browser performs numeric calculations and displayed values may be rounded." },
    ],
  },
};

export const getToolEnhancement = (lang: Lang, slug: ToolSlug) => toolEnhancements[lang][slug];
export const getCategoryEnhancement = (lang: Lang, slug: CategorySlug) => categoryEnhancements[lang][slug];
export const getFaqOverride = (lang: Lang, slug: ToolSlug) => faqOverrides[lang][slug];
