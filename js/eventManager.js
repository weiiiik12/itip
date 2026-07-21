/**
 * ITIP 2.0 - 全域事件管理器 (Event Manager)
 * 負責監聽核心遊戲的對錯判定，並橋接「進度計分板」與「主題動畫」
 */
class GameEventManager {
    constructor() {
        this.init();
    }

    init() {
        // 監聽來自第一層 Core Games 的自訂事件 'ITIP_GAME_EVENT'
        document.addEventListener('ITIP_GAME_EVENT', (e) => this.handleGameEvent(e));
        console.log("✅ [EventManager] 已啟動，正在全天候監聽遊戲事件...");
    }

    // 處理接收到的事件
    handleGameEvent(event) {
        // 解構出事件攜帶的詳細資訊
        const { type, team, coreGame } = event.detail;
        console.log(`[EventManager] 📡 收到廣播 -> 事件: ${type} | 隊伍: ${team} | 來源: ${coreGame}`);

        // 依照事件類型，指派給對應的處理中心
        switch (type) {
            case 'CORRECT_ANSWER':
                this.onCorrectAnswer(team);
                break;
            case 'WRONG_ANSWER':
                this.onWrongAnswer(team);
                break;
            default:
                console.warn(`[EventManager] ⚠️ 未知的事件類型: ${type}`);
        }
    }

    // 處理「答對」邏輯
    onCorrectAnswer(team) {
        // 1. 通知進度追蹤器 (progress.js) 加分
        // 使用 typeof 檢查是為了防呆，確保即便 progress.js 還沒寫好，程式也不會當機
        if (typeof ProgressTracker !== 'undefined') {
            ProgressTracker.addScore(team, 1);
        }

        // 2. 通知第二層主題模組 (themes/.../layout.js) 播放華麗特效
        if (typeof ThemeController !== 'undefined') {
            ThemeController.playSuccessAnimation(team);
        } else {
            // 如果還沒載入主題，就在控制台印出預設的回饋（開發測試用）
            console.log(`✨ [預設回饋] 通知畫面：${team === 'red' ? '紅隊' : '藍隊'} 答對特效發動！`);
        }
    }

    // 處理「答錯」邏輯
    onWrongAnswer(team) {
        // 1. 通知進度追蹤器扣分 (或維持不變，依遊戲規則而定)
        if (typeof ProgressTracker !== 'undefined') {
            ProgressTracker.deductScore(team, 0); // 預設答錯不扣分，可隨時改
        }

        // 2. 通知主題模組播放失敗/震動特效
        if (typeof ThemeController !== 'undefined') {
            ThemeController.playWrongAnimation(team);
        } else {
            console.log(`❌ [預設回饋] 通知畫面：${team === 'red' ? '紅隊' : '藍隊'} 答錯特效發動！`);
        }
    }
}

// 實例化並啟動事件管理器
const GlobalEventManager = new GameEventManager();
