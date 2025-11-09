# aichat-frontend

基於 React(React) + TypeScript(TypeScript) + Vite(Vite) 的前端，透過 GraphQL(GraphQL) 與部署在 Cloudflare Workers(Cloudflare Workers) 的後端對話，並針對 Cloudflare Pages(Cloudflare Pages) 部署情境最佳化。

## ✨ 功能 (Features)
- 即時雙向對話介面，保留訊息歷史並對應角色。
- 使用 GraphQL POST 請求與 Cloudflare Workers 溝通，支援 CORS。
- 內建錯誤提示、對話重置與提交狀態顯示。
- 透過環境變量自訂 GraphQL 端點，方便多環境部署。

## 📦 快速開始 (Getting Started)
1. 安裝依賴 (Install dependencies)
   ```bash
   npm install
   ```
2. 建立本地環境檔 (Create local env file)
   ```bash
   cp .env.example .env
   # 如果需要，修改 VITE_GRAPHQL_ENDPOINT
   ```
3. 啟動開發伺服器 (Start dev server)
   ```bash
   npm run dev
   ```
4. 打包產出 (Build for production)
   ```bash
   npm run build
   npm run preview
   ```

## ⚙️ 環境變量 (Environment Variables)
| 變量名稱 | 說明 |
| --- | --- |
| `VITE_GRAPHQL_ENDPOINT` | Cloudflare Workers GraphQL 端點，預設為 `https://yideng-aichat-proxy.wengjiaxin959.workers.dev/` |

## 🧱 重要檔案 (Key Files)
- `src/config.ts`：集中管理 GraphQL 端點。
- `src/services/ask.ts`：封裝 GraphQL 請求邏輯。
- `src/hooks/useChat.ts`：負責訊息狀態、錯誤與載入管理。
- `src/App.tsx`：主對話介面與提交表單。

## ☁️ 部署到 Cloudflare Pages (Deploy to Cloudflare Pages)
1. 將程式碼推送到 GitHub(GitHub) 儲存庫。
2. 在 Cloudflare Pages 主控台建立新專案並選擇「連線到 Git(Connect to Git)」。
3. 選擇包含本專案的儲存庫與分支。
4. Build 指令使用 `npm run build`，Build 輸出目錄為 `dist`。
5. 在 Pages 專案的「環境變量」區塊設定 `VITE_GRAPHQL_ENDPOINT`（若使用預設可略過）。
6. 儲存後 Cloudflare Pages 會自動執行部署，完成後即可透過 Pages 網址訪問。

## 🧪 驗證清單 (Verification)
- `npm run build` 應成功完成。
- 輸入訊息後，Cloudflare Workers 會回應 AI 內容。
- 遇到網路或 GraphQL 失敗時，UI 會顯示錯誤提示與重試按鈕。

Enjoy building! 🎉
