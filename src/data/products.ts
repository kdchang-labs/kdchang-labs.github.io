/**
 * Single source for every product shown on the homepage and /products.
 * Copy is written from each product's own site and store listing; keep it
 * factual (what it does, where it runs) and update it when a product ships
 * a new platform.
 */

export type Category = "product" | "game" | "tool";

export type Platform = "web" | "chrome" | "ios" | "android";

export type PlatformStatus = {
  platform: Platform;
  /** Not yet in the store. Shown as "即將推出". */
  upcoming?: boolean;
};

export type Product = {
  id: string;
  name: string;
  /** One-line positioning, shown under the name. */
  summary: string;
  description: string;
  image: string;
  url: string;
  category: Category;
  platforms: PlatformStatus[];
};

export const categories: {
  id: Category;
  name: string;
  description: string;
}[] = [
  {
    id: "product",
    name: "產品",
    description: "陪你閱讀、學習與累積職涯能力的 App 與服務。",
  },
  {
    id: "game",
    name: "遊戲",
    description:
      "「物語」系列經營策略遊戲。在瀏覽器裡經營一間店、一家公司、一場選戰或一支球隊。",
  },
  {
    id: "tool",
    name: "工具",
    description: "裝在瀏覽器裡、處理日常工作的小工具。",
  },
];

export const platformLabels: Record<Platform, string> = {
  web: "網頁",
  chrome: "Chrome 擴充功能",
  ios: "iOS",
  android: "Android",
};

export const products: Product[] = [
  {
    id: "lifepicks",
    name: "LifePicks 人生推書店",
    summary: "依人生課題選書的線上獨立書店",
    description:
      "從自我探索、工作事業、感情關係、學習成長、身心健康、財富思維六個主題轉扭蛋選書。每本書附重點書摘與行動方案，可以收進個人書櫃、排定練習並記錄閱讀進度。",
    image: "/img/projects/lifepicksbookstore.webp",
    url: "https://www.lifepicksbookstore.com/",
    category: "product",
    platforms: [
      { platform: "web" },
      { platform: "ios" },
      { platform: "android" },
      { platform: "chrome" },
    ],
  },
  {
    id: "careertags",
    name: "CareerTags 職涯書籤",
    summary: "每天 15 分鐘，把軟實力練成職涯成果",
    description:
      "選定職涯階段與目標職位後，列出技能缺口並推薦附重點摘要的影片與 Podcast。從行動計劃排定練習、寫實踐日誌，再整理成 STAR 職場故事，面試與考核時直接引用。",
    image: "/img/projects/careertags.webp",
    url: "https://www.careertags.com/",
    category: "product",
    platforms: [
      { platform: "chrome" },
      { platform: "ios", upcoming: true },
      { platform: "android", upcoming: true },
    ],
  },
  {
    id: "certgym",
    name: "CertGym 證照道館",
    summary: "準備證照考試的刷題 App",
    description:
      "依官方考綱整理知識點，搭配歷屆試題與原創練習題。答錯的題目自動回到複習清單，另有閃卡與每日一題，零碎時間也能複習。免費開始使用，不需註冊帳號。",
    image: "/img/projects/certgym.webp",
    url: "https://www.certgym.com/",
    category: "product",
    platforms: [
      { platform: "ios", upcoming: true },
      { platform: "android", upcoming: true },
    ],
  },
  {
    id: "teabarstory",
    name: "手搖飲物語",
    summary: "從夜市攤車經營到手搖飲帝國",
    description:
      "研發配方、招募店員、跟上每週的流行趨勢。五個店面各有一個挑戰週要達標，把一台夜市攤車做成全球排隊的手搖飲品牌。",
    image: "/img/projects/teabarstory.jpg",
    url: "https://www.teabarstory.com",
    category: "game",
    platforms: [{ platform: "web" }],
  },
  {
    id: "waytounicorn",
    name: "獨角獸物語",
    summary: "從車庫新創衝上十億估值",
    description:
      "從爸媽家的車庫起步，開發產品、組建團隊、說服投資人，在現金燒光之前把公司做到估值 10 億美元。",
    image: "/img/projects/waytounicorn.jpg",
    url: "https://www.waytounicorn.com",
    category: "game",
    platforms: [{ platform: "web" }],
  },
  {
    id: "90daystocityhall",
    name: "市政廳物語",
    summary: "倒數 90 天的市長選戰",
    description:
      "安排行程、組建競選團隊、決定競選路線，撐過突發事件，在開票夜拿下新港市。當選後解鎖四年任期的治理模式，還能挑戰連任。",
    image: "/img/projects/90daystocityhall.png",
    url: "https://www.90daystocityhall.com",
    category: "game",
    platforms: [{ platform: "web" }],
  },
  {
    id: "nextbaseballace",
    name: "王牌球探物語",
    summary: "十六週後的職棒選秀會",
    description:
      "擔任職棒球團的新球探，跑遍全島球場看比賽、做測試、做家訪，撐過三次球探會議，在選秀會挑出下一位王牌。看得準不準，三年後才知道。",
    image: "/img/projects/nextbaseballace.png",
    url: "https://www.nextbaseballace.com",
    category: "game",
    platforms: [{ platform: "web" }],
  },
  {
    id: "happyprompt",
    name: "HappyPrompt",
    summary: "AI 提示詞管理工具",
    description:
      "選取網頁文字就能存成 Prompt，在 ChatGPT、Claude、Gemini 一鍵插入。內建行銷、人資、PM、程式等職能的提示詞庫。資料只存在瀏覽器，不需登入，可匯出備份。",
    image: "/img/projects/happyprompt.webp",
    url: "https://www.happyprompt.net/",
    category: "tool",
    platforms: [{ platform: "chrome" }],
  },
];

export const productsIn = (category: Category) =>
  products.filter((product) => product.category === category);
