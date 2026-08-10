export const IMAGE_METADATA_CODEC_MANIFEST = {
  piexif: {
    id: "piexifjs",
    version: "1.0.6",
    license: "MIT",
    homepage: "https://github.com/hMatoba/piexifjs",
    script: {
      url: "https://cdn.jsdelivr.net/npm/piexifjs@1.0.6/piexif.js",
      sri: "sha256-p5n27Mp50rOcFPONla2DkH9KoNBk3BenFIh30fW9LQ0=",
    },
  },
  exifr: {
    id: "exifr",
    version: "7.1.3",
    license: "MIT",
    homepage: "https://github.com/MikeKovarik/exifr",
    script: {
      url: "https://cdn.jsdelivr.net/npm/exifr@7.1.3/dist/full.umd.js",
      sri: "sha256-K9BRF3gcEt3ZZd7oRt47P5hrXstMf2p48tLsHbfGWuc=",
    },
  },
} as const;
