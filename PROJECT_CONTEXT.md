# Portfolio 網站專案 — 交接筆記

**最後更新:2026-08-18**

這份文件是給接手寫 code 的人看的背景說明,目的是讓你不用重新問一次「這是什麼專案」。跟 `vscodetodo_1.md` 是互補關係:這份講「整個專案的來龍去脈、設計決定、目前狀態」,`vscodetodo_1.md` 專門講「一項一項的待辦,含精確規格跟目前進度」。**建議兩份都讀完再開始動手。**

---

## 專案是什麼

一個作品集網站,屋主是設計系學生 Chai Gai Foon,主修 multimedia design。網站分 4 個頁面:**Home / Artwork / Resume / Contact**,外加一個作品詳情疊層。設計稿 100% 在 Figma 裡完成並反覆迭代過,不是一次定案的稿子。

Figma 檔案:https://www.figma.com/design/2ZgWK6lIbYXUo7F5Bjuv8o/portfolio
(canvas 頁面叫 `website`,所有 frame 都在同一個 canvas 上,不是 Figma 裡的分頁)

---

## 技術棧(已定案,已經在跑了)

| | |
|---|---|
| 框架 | **Next.js 16.3.1**(App Router、Turbopack) |
| | React 19.2.8 / TypeScript 5 |
| 樣式 | **CSS Modules**,沒有裝任何 UI 或動畫套件 |
| 字型 | Biryani(`next/font/google`,Light/Regular/SemiBold/Bold/Black) |
| 圖片 | `next/image`,`next.config.ts` 把 `images.qualities` 開到 `[75, 90]` |

**注意**:專案根目錄的 `AGENTS.md` 是 `next dev` 自動產生並維護的,它提醒 Next 16 有不少 breaking change,動手前先查 `node_modules/next/dist/docs/`。這不是誤植,不要刪。

已知的 Next 16 眉角(踩過的):
- `<Image fill>` 不能再搭配 `style.width` / `style.height`,會直接報錯。需要自訂尺寸就別用 `fill`,改用明確的 `width` / `height`。
- `fill` 會用 inline style 設定尺寸,**CSS class 蓋不過**。要改框位就只能靠 `object-position`。
- 動態路由的 `params` 是 Promise,要 `await`。`PageProps<'/路由'>` 這個 helper 要等 Next 產生過型別才存在,新路由第一次寫的時候用顯式型別比較保險。

---

## 四套設計稿與斷點

Figma 有 **390 / 768 / 1440 / 1920** 四組完整的頁面。關鍵認知:**它們不是同一個版面的四種尺寸,是各自手排的**——`image 92` 在 1440 稿位於 (585, 1123),到 1920 稿搬到 (1507, 177);Artwork 整頁高度 1440 是 9435、1920 是 8582、768 是 4693、390 是 3252。

各 frame 的 node id 與尺寸:

| 頁面 | 390 | 768 | 1440 | 1920 |
|---|---|---|---|---|
| Home | `420:851` 390×847 | `420:850` 768×685 | `395:387` 1440×1380 | `420:849` 1920×1708 |
| Artwork | `514:1747` 390×3252 | `473:1301` 768×4693 | `328:488` 1440×9435 | `454:1022` 1920×8582 |
| Resume | `514:1773` 390×1635 | `473:1346` 768×1213 | `275:351` 1440×2061 | `473:1140` 1920×2268 |
| Contact | `514:1799` 390×590 | `473:1395` 768×577 | `234:251` 1440×1221 | `473:1212` 1920×1458 |
| 作品詳情疊層 | `545:2050` 390×790 | `545:2036` 768×790 | `373:210` 1440×790 | `545:2024` 1920×790 |

其他常用節點:
- `show hover`(`373:244`)—— 作品 hover 的 component set,兩個 variant
- `Nav Item / …`(`377:130` / `377:136` / `377:142` / `377:148`)—— Artwork 分類子導覽的 component set,各含 Default / Hover / Pressed
- `option 390`(`507:1690`)—— 390 版的漢堡選單元件

**斷點策略**(寫在 `app/globals.css` 開頭的註解裡):

| 視窗寬度 | 用哪張稿 |
|---|---|
| ≤ 767.98 | 390 |
| 768 – 1199.98 | 768 |
| 1200 – 1727.98 | 1440 |
| ≥ 1728 | 1920 |

縮放方式是調 root font-size(`calc(100vw / 設計寬 × 16)`),所以設計稿的絕對座標可以直接照抄、寫成 `rem` 就會跟著螢幕縮放。低於設計寬度自由縮小,高於設計寬度只放大一點(390 上限 1.25×、768 上限 1.15×、1440 和 1920 不放大),超過就固定置中,滿版元素拉到螢幕邊緣。

---

## 視覺語言 / 設計決定(已定案,直接照著做,不用重新設計)

- **裝飾背景 motif**:主要頁面統一用「波浪曲線」(S-curve / wave)。**但作品詳情疊層是同心圓**,這是刻意的例外,不是漏改。
- **Footer**:黑底,右側大字標語「Design should be practical, not just pretty」+ 左下角版權「2026 copyright by Chai Gai Foon」。Home / Artwork / Resume 是完整版(含社群連結列表);**Contact 的 footer 刻意只留標語 + 版權**,因為 Contact 頁中間已經有一排大顆的社群 icon,footer 再放一次會重複。(注意:768 那張稿把社群連結畫回去了,跟 1440 / 1920 不一致,程式照 1440 / 1920 處理,見待辦 11。)
- **Header**:4 頁共用一套,logo(左)+ Home/Artwork/Resume/Contact 四個 nav 文字(右)+ 一個小方塊指示條標示目前頁面。**390 沒有橫排 nav,改成漢堡選單**(Figma 的 `option 390` 元件)。
- **Header 的 scroll 行為**:Artwork / Resume / Contact 這 3 頁的 header 往下滾動時**固定不動**。**Home 頁排除在外**——Home 的 header 是透明的、跟著頁面捲走,這是屋主明確指示的例外。
- **Header band 高度**:96(1440 的 Home/Resume/Contact)、113(1440 的 Artwork,只有它比較高)、123(1920)、52(768)、59(390)。
- **Home 頁文案**:標題「Do it practical!」,bio 文字:「I'm **Chai Gai Foon** — a multimedia design student who'd rather make something that works than something that just looks good. Between photography, hand-drawn illustration, 3D and poster design, I'm still figuring out which one I love most, so I do all of them.」(粗體只有「Chai Gai Foon」)。這版文案是參考過 https://www.timbengel.com/bio 的語氣後重寫的,不要換回更制式的自我介紹寫法。

### 幾個「看起來像 bug,其實是設計」的地方

這些都已經照做了,不要「順手修正」:

- 四段分類 intro 的排版**每段都不一樣**:標題字重(Visual Product / Animation 是 SemiBold,Studio Drawing / Poster Design 是 Regular)、字距、行高都不同。Poster Design 在 768 / 1440 / 1920 是**置中**,在 390 是**靠左**。
- Resume 第一段學歷敘述的字距是 2.7,第二段是 1.8。
- Artwork 的 nav 項目在 1440 是等距的,在 768 / 390 不是(Figma 手動改過每個 instance 的大小)。

---

## Artwork 頁的 4 個分類

Artwork 頁把 49 個圖塊依**實際內容**(不是檔名)分成 4 類,由上到下排列:

1. **Visual Product** —— 攝影 + 3D 設計的混合,從人像、建築到產品渲染跟 icon。
2. **2D & 3D Animation** —— logo 動畫、走路循環、定格動畫、2D/3D 短篇動畫故事。
3. **Studio Drawing** —— 鉛筆、炭筆、水彩的傳統紙上繪畫,觀察寫生跟人像。
4. **Poster Design** —— 字體排印、圖像、版面構成講故事,從電影海報到產品/月曆設計。

**這個分類邏輯很重要**:之後不管是篩選功能、還是資料檔/CMS,分類欄位都要照這 4 個,不要自己重新分類。

**49 個圖塊 = 48 件作品**:`vp-08` 跟 `vp-11` 是同一件 3D 作品(分層藍色圓盤上的冰山)的兩個裁切,Figma 把它放了兩次。程式用 `sameAs` 合併成一件,文案只要寫一次。

---

## 目前的程式結構

```
portfolio/
├── app/
│   ├── layout.tsx              根 layout,把 chrome 交給 SiteChrome
│   ├── globals.css             設計 token + 四個斷點的定義(先讀這份)
│   ├── page.tsx / .module.css  Home
│   ├── artwork/
│   │   ├── page.tsx            Artwork 列表(資料驅動的手排畫布)
│   │   └── [slug]/page.tsx     作品詳情全螢幕疊層
│   ├── resume/  contact/       各自 page.tsx + page.module.css
│   └── preview/
│       ├── page.tsx            開發用:多裝置寬度預覽
│       └── artwork/page.tsx    開發用:49 張縮圖對照 content key
├── components/
│   ├── SiteChrome.tsx          決定哪些路由要套 header/footer
│   ├── Header.tsx / Footer.tsx 全站共用
│   └── ArtworkNav.tsx          分類子導覽 + scroll-spy
├── lib/
│   ├── artwork.ts              49 個圖塊 × 4 斷點的座標、裁切、分類定義
│   ├── artwork-content.ts      作品文案(要屋主填)
│   ├── resume.ts  site.ts  nav.ts
└── public/assets/
    ├── images/artwork/ (48 檔) home/ resume/
    ├── decor/ (波浪與同心圓 SVG)  icons/  brand/  cv/
    └── _unused/                被取代掉的匯出檔,留著備查
```

`/preview` 跟 `/preview/artwork` 是開發用的,沒有任何連結指向它們,之後可以直接刪。

### 三個值得知道的實作決定

1. **Artwork 頁是資料驅動的。** 49 個圖塊各自帶四套座標當 CSS 變數寫在 `style` 裡,整份 CSS 只用四條 media query 切換要讀哪一套。要加斷點只需補資料,不用動版面。
2. **圖片裁切用 Figma 的裁切矩形還原,不是 `object-fit: cover`。** Figma 匯出的 PNG 是**未裁切的原圖**,裁切是 Figma 那邊的 transform。如果直接用 `cover` 置中裁,會切在完全不同的位置(例如 `17_image_81` 那朵紅花整個構圖都會跑掉)。所以 `lib/artwork.ts` 存了每個圖塊的 `crop` 百分比,分斷點——因為有幾個圖塊在不同斷點的裁切不一樣。
3. **hover 疊層跟詳情頁共用同一份文案。** 填了 `title` 就兩個一起開,沒填就維持普通圖片。疊層的尺寸用 CSS container query 跟著圖塊大小等比縮放(圖塊從 69px 寬到 886px 寬都有,寫死一組數值會爆掉)。

---

## 目前進度

| 項目 | 狀態 |
|---|---|
| Home / Resume / Contact / Artwork 四頁 | ✅ 四個斷點都完成,頁面高度跟 Figma frame 逐一對過 |
| 共用 Header / Footer | ✅ 四個斷點 |
| Artwork 分類子導覽 + scroll-spy(待辦 5) | ✅ |
| 作品詳情疊層 + 路由 + prev/next + 關閉(待辦 6) | ✅ 程式完成,⬜ 等文案 |
| 響應式(待辦 3) | ✅ |
| 48 件作品的文案(待辦 8) | ⬜ **1 / 48**,擋住最多東西的一項 |
| 影片素材(待辦 4 第 1 點) | ✅ 10 支都接上 YouTube 嵌入,詳情頁播放 |
| CV 檔案、社群連結網址(待辦 9) | ✅ 兩個都填進 `lib/site.ts` 了 |
| Header 指示條彈性動畫(待辦 7) | ✅ 左右兩邊各一顆彈簧,拉長與回彈都是算出來的 |

**程式端的待辦已經清空。** 剩下的 ⬜ 是在等屋主寫作品文案(待辦 8),以及公開前要定案的網址 slug(待辦 12,等 8 做完)。

詳情頁四個 frame 的高度現在是 740 / 950 / 790 / 940(390 / 768 / 1440 / 1920),各自貼合該尺寸裝置的可用高度(待辦 10)。

`npm run build` 目前是過的,10 條路由全部靜態產生,`tsc` 與 `eslint` 乾淨。

---

## 如果需要重新確認 Figma 現況

這份文件跟 `vscodetodo_1.md` 都可能因為屋主又動了 Figma 而過時(已經發生過好幾次:frame 高度改過、768 的 Artwork 從空殼變成完整版、390 整套後補、詳情頁從只有 1440 補成四套)。

裝 Figma 的 MCP plugin(`claude plugin install figma@claude-plugins-official`,裝完用 `/plugin` 授權),之後可以直接用 file key `2ZgWK6lIbYXUo7F5Bjuv8o` 查最新狀態。

實用經驗:
- 對整個 frame 呼叫 `get_design_context` 一次,會把該 frame 底下所有元素的座標、字級、字距、**以及圖片裁切矩形**全部吐出來,比一個節點一個節點問快非常多。
- `get_metadata` 只給座標,拿不到裁切跟字級。
- 抓出來的素材連結 7 天後過期,要用就馬上下載。
