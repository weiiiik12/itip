const themes = [
    {
        name: "Balloon Pop",
        background: "linear-gradient(to top, #e0f4ff, #f0f4f8)", // 藍天
        ninjaProps: ["🎈"], // 氣球
        memoryBack: "☁️", // 雲朵卡背
        soundEffect: "pop.mp3"
    },
    {
        name: "Fruit Ninja",
        background: "url('../images/wood-bg.jpg')", // 木紋背景
        ninjaProps: ["🍉", "🍎", "🍊"], // 水果
        memoryBack: "🔪", // 飛鏢卡背
        soundEffect: "slice.mp3"
    },
    {
        name: "Space Defender",
        background: "url('../images/space-bg.jpg')", // 星空
        ninjaProps: ["🛸", "☄️", "👾"], // 飛碟與隕石
        memoryBack: "🚀", // 火箭卡背
        soundEffect: "laser.mp3"
    },
    {
        name: "Monster Hunter",
        background: "linear-gradient(to bottom, #2b1055, #7597de)", // 奇幻暗紫
        ninjaProps: ["👻", "👹", "👾", "🧟"], // 各種小怪獸
        memoryBack: "🛡️", // 盾牌卡背
        soundEffect: "bonk.mp3"
    },
    {
        name: "Bug Catcher",
        background: "linear-gradient(to bottom, #a8e063, #56ab2f)", // 草地綠
        ninjaProps: ["🦋", "🐛", "🐞", "🐝"], // 蟲蟲
        memoryBack: "🍃", // 樹葉卡背
        soundEffect: "net-swoosh.mp3"
    },
    {
        name: "Ocean World",
        background: "linear-gradient(to bottom, #1cb5e0, #000851)", // 深海藍
        ninjaProps: ["🐠", "🐡", "🐙", "🦀"], // 海洋生物
        memoryBack: "🐚", // 貝殼卡背
        soundEffect: "bubble.mp3"
    }
];

// 負責隨機抽籤的函數
function applyRandomTheme() {
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    // 把抽到的主題存起來，讓遊戲去讀取
    sessionStorage.setItem('current_theme', JSON.stringify(randomTheme));
}
