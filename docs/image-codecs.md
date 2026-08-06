# Image Codec Operations

## Current Deployment Scope

The image format converter currently enables browser-native still image conversion plus APNG frame extraction and lazy-loaded external codecs for AVIF output, HEIC input, TIFF input, GIF frame extraction, and ZIP export:

- Input: JPG/JPEG/JFIF, PNG, APNG full-frame PNG ZIP extraction, WebP, AVIF, GIF first frame or full-frame PNG ZIP extraction, BMP, SVG, HEIC/HEIF, TIFF/TIF, PNG-based ICO
- Output: JPG, PNG, WebP, AVIF, BMP, PNG-based multi-size ICO, PNG ZIP for APNG frames, TIFF pages, GIF frames, and ICO embedded sizes
- Processing: browser APIs and a Web Worker
- User files: never uploaded to the site server, external CDN, or external conversion API
- File analysis: reads file headers to show detected format, GIF frame count, ICO embedded sizes, TIFF page count where possible, and disabled codec reasons before conversion
- Codec loading: AVIF output uses `@jsquash/avif` from a version-pinned external ESM CDN only when AVIF output is selected and native AVIF encoding is unavailable. HEIC, TIFF, GIF frame extraction, and ZIP scripts are loaded from version-pinned jsDelivr URLs only when needed, with SRI where script tags are used. `src/utils/codec-loader.ts` also provides timeout, CORS-only fetch, `credentials: "omit"`, SHA-256 verification, promise caching, status tracking, and disposal for future fetch-based assets.

PNG ZIP output is intentionally available only for multi-result operations: APNG frame extraction, GIF frame extraction, TIFF page export, and ICO embedded-size extraction. It is disabled for single still-image inputs such as JPG or normal PNG.

APNG frame extraction uses local PNG chunk parsing plus browser PNG decoding, so it does not require a separate APNG codec. ZIP download still lazy-loads JSZip.

Animated GIF/WebP re-encoding remains disabled until verified animation encoder assets are configured.

## Feature Flags

Feature flags are defined in `src/utils/image-converter-codecs.ts`.

Enabled:

- `basicStillFormats`
- `svgInput`
- `apngFrameZip`
- `bmpInput`
- `bmpOutput`
- `avifNative`
- `avifExternalEncode`
- `heifInput`
- `tiffInput`
- `icoInput`
- `icoOutput`
- `animatedGif`
- `multiPageTiff`
- `zipOutput`

Disabled pending verification:

- `animatedWebp`

## External Codec Policy

Heavy codec JavaScript and WASM must not be copied into this site's static assets by default.

Before enabling a codec:

1. Select an official npm package or official release artifact.
2. Pin an exact version and exact file path.
3. Record the license, homepage, and required notices.
4. Record SHA-256 for every executable JavaScript, Worker, WASM, or ZIP library asset.
5. Add only version-pinned external CDN URLs to the codec manifest.
6. Load assets through `loadCodec()` from `src/utils/codec-loader.ts`.
7. Verify CORS, CSP, Worker compatibility, and browser support.
8. Confirm the codec does not upload user image data.
9. Add tests for normal, boundary, and damaged files.
10. Update the UI support table, FAQ, privacy policy, and this document.

Do not use `latest`, branch URLs, unverified mirrors, or CDN URLs without integrity data.

## Current Codec Manifest

The manifest contains the built-in PNG-based ICO implementation, enabled external AVIF/HEIC/TIFF/GIF/ZIP codec assets, and a disabled placeholder for animated WebP:

| Codec | Version | CDN URL | SHA-256 | License | Status |
|---|---|---|---|---|---|
| AVIF encode | @jsquash/avif 2.1.1 | `https://esm.sh/@jsquash/avif@2.1.1?bundle&target=es2022` | `3fd1901a22a4e2de4a142c0feca880787270001e35f497fb0695083a3f0f054d` | Apache-2.0 | enabled for AVIF output when native encode is unavailable |
| AVIF encode WASM | @jsquash/avif 2.1.1 | `https://cdn.jsdelivr.net/npm/@jsquash/avif@2.1.1/codec/enc/avif_enc.wasm` | `d9f2a95164362af48558d176e619becfd49dd97b50b86c679b47100860522b3d` | Apache-2.0 | loaded by the AVIF encoder |
| AVIF encode MT WASM | @jsquash/avif 2.1.1 | `https://cdn.jsdelivr.net/npm/@jsquash/avif@2.1.1/codec/enc/avif_enc_mt.wasm` | `202d7ec9fb7d658df7cbf17fd85d83da724ac9551818c2d5161c858353a683a4` | Apache-2.0 | loaded only when threaded AVIF encoding is usable |
| AVIF encode Worker | @jsquash/avif 2.1.1 | `https://cdn.jsdelivr.net/npm/@jsquash/avif@2.1.1/codec/enc/avif_enc_mt.worker.mjs` | `89a64cae14ec07dec00cdd6df943fad039501e9eef1748fb1504508d4252bafe` | Apache-2.0 | loaded only when threaded AVIF encoding is usable |
| HEIF | heic2any 0.0.4 | `https://cdn.jsdelivr.net/npm/heic2any@0.0.4/dist/heic2any.min.js` | `0963cfa50e9e1e7e6af929a40a81e3e898a673f1270eafa6917dd137e4968164` | MIT | enabled for HEIC/HEIF input only |
| TIFF | UTIF.js 3.1.0 | `https://cdn.jsdelivr.net/npm/utif@3.1.0/UTIF.js` | `e3e76115f49571e39624c3316a76b3c4c5b2c5ca518dfec4b66a9f7af8c6d059` | MIT | enabled for TIFF input and pages |
| ICO | built-in PNG ICO reader/writer | none | not applicable | site code | enabled for PNG-based ICO only |
| GIF frames | gifuct-js 1.0.0 | `https://cdn.jsdelivr.net/npm/gifuct-js@1.0.0/dist/gifuct-js.min.js` | `4a8ca0d929fcf7461536907a1ba7808d8969149221f08b70fa8864d62e620220` | MIT | enabled for GIF frame PNG ZIP extraction |
| ZIP | JSZip 3.10.1 | `https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js` | `acc7e41455a80765b5fd9c7ee1b8078a6d160bbbca455aeae854de65c947d59e` | MIT OR GPL-3.0-or-later | enabled for APNG frame PNG ZIP, TIFF page PNG ZIP, and GIF frame PNG ZIP |

## Privacy

When external codecs are enabled, the browser may request codec files from the configured CDN. The selected image file, decoded pixels, metadata, frames, pages, and generated result files must remain inside the browser.

External codec requests must use:

- `credentials: "omit"`
- version-pinned URLs
- SHA-256 verification before execution when fetched manually
- no user file data in URL query strings, request bodies, headers, or analytics events

## CSP Notes

The active codec CDN domains are `cdn.jsdelivr.net` and `esm.sh`. Production CSP should allow them narrowly:

- `script-src 'self' https://cdn.jsdelivr.net https://esm.sh`
- `connect-src 'self' https://cdn.jsdelivr.net https://esm.sh` if fetch-based codec loading is enabled later
- `worker-src 'self' blob:` if required by the worker strategy
- `img-src 'self' blob: data:` for local previews

Avoid broad `https:` or `*` allowances.

## Test Checklist

Before enabling a disabled feature:

- Normal file converts successfully.
- Unsupported variants fail with a clear user message.
- Damaged files do not expose stack traces.
- CDN timeout and CORS failures show retryable codec errors.
- SHA-256 mismatch prevents execution.
- Worker cancellation restores UI state.
- Large files respect memory limits.
- `npm run build` passes.
- Built static assets do not include heavy codec WASM files from the site domain.
