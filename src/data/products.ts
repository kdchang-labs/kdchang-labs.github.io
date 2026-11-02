/**
 * Single source for every product shown on the homepage and /products.
 * Copy is written from each product's own site and store listing; keep it
 * factual (what it does, where it runs) and update it when a product ships
 * a new platform.
 *
 * The top-level text is Traditional Chinese; `en` holds the English version.
 * Components read the data through the locale-aware helpers at the bottom
 * (localizedCategories / localizedProducts / platformLabelsFor), never the raw
 * arrays, so both languages stay in one place.
 */

export type Category = "product" | "game" | "tool";

export type Platform = "web" | "chrome" | "ios" | "android";

export type PlatformStatus = {
  platform: Platform;
  /** Not yet in the store. Shown as "即將推出" / "coming soon". */
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
  /** Temporarily left off the site (homepage, /products). Remove to show again. */
  hidden?: boolean;
  en: {
    name: string;
    summary: string;
    description: string;
    /** English page of the product, when it has its own URL. */
    url?: string;
  };
};

export type Locale = "zh-Hant" | "en";

type CategoryInfo = {
  id: Category;
  name: string;
  description: string;
};

const categories: (CategoryInfo & {
  en: Omit<CategoryInfo, "id">;
})[] = [
  {
    id: "product",
    name: "產品",
    description: "陪你閱讀、學習、旅行與累積職涯能力的 App 與服務。",
    en: {
      name: "Products",
      description:
        "Apps and services that help you read, learn, travel and build your career.",
    },
  },
  {
    id: "game",
    name: "遊戲",
    description:
      "「物語」系列經營策略遊戲。在瀏覽器裡經營一間店、一家公司、一場選戰或一支球隊。",
    en: {
      name: "Games",
      description:
        "The Monogatari series of management strategy games. Run a shop, a company, a campaign or a scouting department, right in your browser.",
    },
  },
  {
    id: "tool",
    name: "工具",
    description: "裝在瀏覽器裡、處理日常工作的小工具。",
    en: {
      name: "Tools",
      description: "Small browser tools for everyday work.",
    },
  },
];

const platformLabels: Record<Locale, Record<Platform, string>> = {
  "zh-Hant": {
    web: "網頁",
    chrome: "Chrome 擴充功能",
    ios: "iOS",
    android: "Android",
  },
  en: {
    web: "Web",
    chrome: "Chrome extension",
    ios: "iOS",
    android: "Android",
  },
};

const products: Product[] = [
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
    en: {
      name: "LifePicks",
      summary: "An online indie bookstore that picks books by life theme",
      description:
        "Spin the gacha machine to draw a book from six themes: self-discovery, work and career, relationships, learning and growth, health and wellbeing, and money mindset. Every book comes with key takeaways and an action plan, and you can add it to your shelf, schedule practice and track your reading.",
    },
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
    en: {
      name: "CareerTags",
      summary: "Turn soft skills into career results, 15 minutes a day",
      description:
        "Pick your career stage and target role to see your skill gaps, with recommended videos and podcasts that come with key summaries. Schedule practice from your action plan, keep a practice journal, then turn it into STAR stories you can use in interviews and reviews.",
    },
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
    hidden: true,
    platforms: [
      { platform: "ios", upcoming: true },
      { platform: "android", upcoming: true },
    ],
    en: {
      name: "CertGym",
      summary: "A practice-question app for certification exams",
      description:
        "Key concepts organized by the official exam outline, with past exam questions and original practice questions. Questions you get wrong go back to your review list automatically, and flashcards and a daily question let you study in spare moments. Free to start, no account needed.",
    },
  },
  {
    id: "explorestamp",
    name: "ExploreStamp 探索印記",
    summary: "把每一次旅行，蓋成一枚印章",
    description:
      "收錄臺灣、日本、韓國、歐美等 15 個國家與地區的景點，整理成主題路線。人到現場用定位打卡，才能蓋下印章，還能把照片和印章做成明信片。景點資料隨 App 安裝、離線可用，不用登入，打卡紀錄與照片預設留在手機。",
    image: "/img/projects/explorestamp.webp",
    url: "https://www.explorestamp.com/",
    category: "product",
    platforms: [
      { platform: "ios", upcoming: true },
      { platform: "android", upcoming: true },
    ],
    en: {
      name: "ExploreStamp",
      summary: "Turn every trip into a stamp",
      description:
        "Sights across 15 countries and regions, including Taiwan, Japan, Korea, Europe and North America, organized into themed routes. Check in by location at the spot itself to collect its stamp, then turn your photo and stamp into a postcard. Sight data ships with the app and works offline, no sign-in is needed, and your check-ins and photos stay on your phone by default.",
      url: "https://www.explorestamp.com/en/",
    },
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
    en: {
      name: "Tea Bar Story",
      summary: "From a night market cart to a boba empire",
      description:
        "Develop recipes, hire staff and keep up with each week's trends. Each of the five shops has a challenge week to clear on the way to turning one night market cart into a boba brand with lines around the world.",
      url: "https://www.teabarstory.com/en",
    },
  },
  {
    id: "waytounicorn",
    name: "車庫獨角獸物語",
    summary: "從車庫新創衝上十億估值",
    description:
      "從爸媽家的車庫起步，開發產品、組建團隊、說服投資人，在現金燒光之前把公司做到估值 10 億美元。",
    image: "/img/projects/waytounicorn.jpg",
    url: "https://www.garageunicorn.com",
    category: "game",
    platforms: [{ platform: "web" }],
    en: {
      name: "Garage Unicorn",
      summary: "From a garage startup to a billion-dollar valuation",
      description:
        "Start in your parents' garage. Build the product, hire the team and win over investors, and reach a US$1 billion valuation before the cash runs out.",
      url: "https://www.garageunicorn.com/en",
    },
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
    en: {
      name: "90 Days to City Hall",
      summary: "A 90-day countdown to the mayoral election",
      description:
        "Plan your schedule, build a campaign team, choose your campaign strategy and survive the surprises to win New Harbor City on election night. Winning unlocks a four-year term in governing mode, and a shot at re-election.",
      url: "https://www.90daystocityhall.com/en",
    },
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
    en: {
      name: "Next Baseball Ace",
      summary: "Sixteen weeks to the pro baseball draft",
      description:
        "As a pro team's new scout, travel to ballparks across the island to watch games, run tryouts and make home visits. Survive three scouting meetings and pick the next ace at the draft. Whether you read them right, you'll find out three years later.",
      url: "https://www.nextbaseballace.com/en",
    },
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
    en: {
      name: "HappyPrompt",
      summary: "An AI prompt manager",
      description:
        "Select text on any page to save it as a prompt, then insert it into ChatGPT, Claude or Gemini in one click. Includes a prompt library for marketing, HR, product management, engineering and more. Your data stays in your browser: no sign-in needed, and you can export a backup.",
    },
  },
];

/** Product as shown on the page: text and URL already in one language. */
export type LocalizedProduct = Omit<Product, "en">;

const asLocale = (locale: string): Locale =>
  locale === "en" ? "en" : "zh-Hant";

export function localizedCategories(locale: string): CategoryInfo[] {
  return categories.map(({ en, ...zh }) =>
    asLocale(locale) === "en" ? { ...zh, ...en } : zh,
  );
}

export function localizedProducts(locale: string): LocalizedProduct[] {
  return products
    .filter((product) => !product.hidden)
    .map(({ en, ...zh }) =>
      asLocale(locale) === "en"
        ? { ...zh, ...en, url: en.url ?? zh.url }
        : zh,
    );
}

export function productsIn(
  category: Category,
  locale: string,
): LocalizedProduct[] {
  return localizedProducts(locale).filter(
    (product) => product.category === category,
  );
}

export function platformLabelsFor(locale: string): Record<Platform, string> {
  return platformLabels[asLocale(locale)];
}
