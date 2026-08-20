import type { Lang } from "@/i18n/translations";

export type SiteUpdate = {
  date: string;
  toolSlug?: string;
  title: string;
  summary: string;
  details: string[];
};

const updates: Record<Lang, SiteUpdate[]> = {
  ko: [
    {
      date: "2026-08-20",
      toolSlug: "image-to-pdf",
      title: "이미지 PDF 변환기 썸네일·순서·회전·페이지 방향 기능 추가",
      summary: "여러 이미지를 축소 미리보기로 확인하고 순서를 바꾸거나 회전한 뒤, 세로 또는 가로 페이지 방향으로 하나의 PDF 파일을 만들 수 있습니다.",
      details: ["필요할 때만 이미지 썸네일 표시", "위로·아래로 버튼으로 이미지 순서 변경", "회전 버튼으로 각 이미지를 시계 방향 90도 회전", "A4·Letter·이미지 크기 기준에서 세로 또는 가로 방향 선택"],
    },
    {
      date: "2026-08-18",
      toolSlug: "pdf-splitter",
      title: "PDF 합치기·분할·페이지 추출기 썸네일 확인 기능 추가",
      summary: "PDF 합치기에서는 파일별 첫 페이지를, PDF 분할기와 페이지 추출기에서는 문서의 페이지 썸네일을 필요할 때만 표시할 수 있습니다.",
      details: ["분할기에서 체크한 페이지를 페이지 범위에 하나의 그룹으로 자동 입력", "페이지 추출기에서 체크한 페이지를 추출 범위에 자동 입력", "예: (1,3,4)는 선택한 세 페이지를 하나의 PDF로 저장"],
    },
    {
      date: "2026-08-18",
      toolSlug: "image-color-replacer",
      title: "이미지 색상 도구의 색상 선택 기준 개선",
      summary: "색상 대체와 특정 색상 투명화에서 색조와 채도를 함께 고려하도록 조정했습니다.",
      details: ["연속 영역 선택 흐름 정리", "단색 배경·로고·아이콘에 적합한 범위와 실사 사진의 제한 사항 안내"],
    },
    {
      date: "2026-08-18",
      toolSlug: "remove-image-metadata",
      title: "사진 EXIF·메타데이터 편집 기능 확장",
      summary: "JPG와 HEIC/HEIF 사진의 촬영 정보, GPS, 작성자 정보를 확인하고 지원 범위에서 수정 또는 제거할 수 있게 했습니다.",
      details: ["GPS만 선택 제거", "결과 파일을 다시 읽어 변경 사항 확인", "사진 압축 데이터 재인코딩을 피하는 처리 방식"],
    },
    {
      date: "2026-08-18",
      toolSlug: "image-watermark",
      title: "이미지 워터마크 반복 배치 추가",
      summary: "한 곳 배치 외에 가로·세로 개수만으로 반복 워터마크를 균등 배치할 수 있게 했습니다.",
      details: ["격자와 엇갈림 배열", "웹폰트 선택 시 지연 로드", "미리보기와 다운로드에 같은 배치 계산 적용"],
    },
    {
      date: "2026-08-18",
      toolSlug: "image-rotate-flip",
      title: "이미지 자유 회전과 캔버스 확장 추가",
      summary: "1도 단위 회전과 회전된 이미지 전체를 유지하기 위한 자동 캔버스 확장을 추가했습니다.",
      details: ["-180도부터 180도까지 조절", "투명·단색 배경 선택", "원본 기준 단일 렌더링으로 누적 재샘플링 방지"],
    },
  ],
  en: [
    {
      date: "2026-08-20",
      toolSlug: "image-to-pdf",
      title: "Added thumbnails, ordering, rotation, and page orientation to Image to PDF",
      summary: "You can preview multiple selected images, reorder or rotate them, and create one PDF with portrait or landscape pages.",
      details: ["Show image thumbnails only when needed", "Move images up or down in the list", "Rotate each image 90 degrees clockwise", "Choose portrait or landscape for A4, Letter, or image-sized pages"],
    },
    {
      date: "2026-08-18",
      toolSlug: "pdf-splitter",
      title: "Added thumbnail checks to PDF merge, split, and extraction tools",
      summary: "PDF Merge can show the first page of each file, while PDF Splitter and Page Extractor can show page thumbnails only when requested.",
      details: ["Selected splitter pages are inserted into the page-range field as one group", "Selected extractor pages are inserted into the extraction range", "For example, (1,3,4) saves the selected pages as one PDF"],
    },
    {
      date: "2026-08-18",
      toolSlug: "image-color-replacer",
      title: "Improved color selection rules for image color tools",
      summary: "Color replacement and transparency now consider hue and saturation in addition to color distance.",
      details: ["Clarified connected-area selection", "Added guidance for flat-color graphics and limitations with real-world photos"],
    },
    {
      date: "2026-08-18",
      toolSlug: "remove-image-metadata",
      title: "Expanded photo EXIF and metadata editing",
      summary: "JPG and HEIC/HEIF photo metadata can now be viewed and, where supported, edited or removed.",
      details: ["Remove GPS data only", "Re-read output files to verify changes", "Avoid pixel re-encoding when metadata-only rewriting is supported"],
    },
    {
      date: "2026-08-18",
      toolSlug: "image-watermark",
      title: "Added repeated image watermark placement",
      summary: "Watermarks can now be distributed evenly by choosing only the number of columns and rows.",
      details: ["Grid and staggered layouts", "Web fonts load only when selected", "Preview and download share the same placement calculations"],
    },
    {
      date: "2026-08-18",
      toolSlug: "image-rotate-flip",
      title: "Added free rotation and canvas expansion",
      summary: "The image rotation tool now supports one-degree adjustments and automatic canvas expansion.",
      details: ["Adjust from -180 to 180 degrees", "Choose transparent or solid padding", "Render once from the original to avoid cumulative resampling"],
    },
  ],
};

export const getSiteUpdates = (lang: Lang) => updates[lang];
