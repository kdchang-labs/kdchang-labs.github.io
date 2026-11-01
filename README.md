# KD LABs

## 中英文版本

- 繁體中文是預設語言（`/`），英文版在 `/en/`，設定方式跟 ai.kdchang.com 一樣。
- 英文內容放在 `i18n/en/`：頁面在 `docusaurus-plugin-content-pages/`、文章在 `docusaurus-plugin-content-blog/`（檔名跟中文版相同）、學習資源在 `docusaurus-plugin-content-docs/current/`，介面文字在 `code.json` 與 `docusaurus-theme-classic/*.json`。
- 產品資料（`src/data/products.ts`）的英文寫在每個產品的 `en` 欄位。
- 新增或修改元件裡的 `<Translate>` 文字後，執行 `npm run write-translations -- --locale en` 再補上英文。
- `npm run start:en` 預覽英文版（開發模式一次只跑一個語言，語言切換要用 `npm run build && npm run serve` 測）。
- 新增頁面或改標題後執行 `npm run og`，會同時產生中英文的社群分享圖。
