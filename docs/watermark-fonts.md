# Watermark font notice

This document records the font policy used by the image watermark tool.

## Scope

- User font uploads are not supported.
- Users cannot enter an external font URL.
- System fonts are referenced from the user's device and are not redistributed by this site.
- Hosted web fonts are loaded only when the user selects that font.
- User image files and generated images are not sent to the font CDN.

## Font loading

The tool uses the browser `FontFace` API for hosted web fonts. A selected font and weight are loaded once per page session and cached with a Promise cache. Rendering waits for the selected web font before measuring and drawing text on Canvas.

System fonts do not require network downloads and may look different depending on the operating system.

## System fonts

| Font option | Source | Files distributed by this site | Notes |
|---|---|---:|---|
| System Sans | User device | No | Uses `system-ui`, Segoe UI, Arial, and sans-serif fallbacks. |
| System Serif | User device | No | Uses Georgia, Times New Roman, and serif fallbacks. |
| System Monospace | User device | No | Uses ui-monospace, Consolas, Courier New, and monospace fallbacks. |

## Hosted web fonts

The hosted web fonts are loaded only after selection. Noto Korean fonts use the official Google Fonts CSS endpoint because it supplies the required Korean glyph subsets reliably. The remaining web fonts use exact Fontsource CDN URLs through jsDelivr. The URLs are kept in `src/components/ToolRunner.astro` so the UI and renderer share the same font registry.

| Font | Package/version | Source | License | Language coverage used | CDN asset |
|---|---|---|---|---|---|
| Noto Sans KR | Google Fonts CSS | Google Fonts | SIL Open Font License 1.1 | Korean, Latin | `https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap` |
| Noto Serif KR | Google Fonts CSS | Google Fonts | SIL Open Font License 1.1 | Korean, Latin | `https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;700&display=swap` |
| Roboto | Fontsource 5.3.0 | Google / Fontsource | Apache License 2.0 | Latin | `https://cdn.jsdelivr.net/fontsource/fonts/roboto:vf@5.3.0/latin-wght-normal.woff2` |
| Lora | Fontsource 5.3.0 | Google / Fontsource | SIL Open Font License 1.1 | Latin | `https://cdn.jsdelivr.net/fontsource/fonts/lora:vf@5.3.0/latin-wght-normal.woff2` |
| Bebas Neue | Fontsource 5.3.0 | Google / Fontsource | SIL Open Font License 1.1 | Latin | `https://cdn.jsdelivr.net/fontsource/fonts/bebas-neue@5.3.0/latin-400-normal.woff2` |

## License notes

- Fontsource CDN URLs are versioned and should remain pinned to exact versions.
- Noto fonts are distributed under the SIL Open Font License 1.1.
- Roboto is distributed under Apache License 2.0 through Fontsource.
- OFL fonts may be used, embedded, bundled, modified, and redistributed under the license terms, but derivative fonts must respect Reserved Font Name conditions when applicable.
- The watermark output is a raster image. Font files are not embedded in the downloaded image.

## CDN and CSP notes

If a Content Security Policy is configured, allow only the required font CDN domain instead of broad wildcards.

Recommended minimum when these hosted fonts are enabled:

```txt
style-src 'self' https://fonts.googleapis.com;
font-src 'self' https://cdn.jsdelivr.net https://fonts.gstatic.com data:;
connect-src 'self' https://cdn.jsdelivr.net;
```

No cookies or credentials are required for font file requests.

## Upgrade procedure

1. Confirm the font family, source, and license have not changed.
2. Update the selected font URL in the watermark font registry when needed.
3. Test that the font loads only after selection.
4. Verify Korean fallback warnings for Latin-only fonts.
5. Run `npm run build`.
