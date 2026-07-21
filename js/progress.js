/**
 * ITIP 2.0 - 全域進度追蹤器 (Progress Tracker)
 * 負責管理紅藍兩隊的分數，並判斷獲勝條件
 */
class GameProgressTracker {
    constructor() {
        this.redScore = 0;
        this.blueScore = 0;
        
        // 預設 10 分獲勝。未來不同的主題 (例如大富翁要 20 步) 可以動態修改這個數值
        this.winCondition = 10; 
        
        console.log("📊 [ProgressTracker] 計分板已啟動，目標分數設定為：" + this.winCondition);
    }

    // 加分邏輯 (由 eventManager.js 呼叫)
    addScore(team, points = 1) {
        if (team === 'red') {
            this.redScore += points;
        } else if (team === 'blue') {
            this.blueScore += points;
        }

        console.log(`📈 戰況更新 -> 紅隊: ${this.redScore} | 藍隊: ${this.blueScore}`);
        this.checkWinCondition();
    }

    // 扣分邏輯
    deductScore(team, points = 0) {
        // 目前預設答錯不扣分。如果未來你想讓遊戲更刺激，可以把下面的註解拿掉：
        /*
        if (team === 'red') {
            this.redScore = Math.max(0, this.redScore - points);
        } else if (team === 'blue') {
            this.blueScore = Math.max(0, this.blueScore - points);
        }
        */
        console.log(`📉 答錯判定 -> 紅隊: ${this.redScore} | 藍隊: ${this.blueScore}`);
    }

    // 檢查是否有人達到獲勝條件
    checkWinCondition() {
        if (this.redScore >= this.winCondition) {
            this.triggerGameOver('red');
        } else if (this.blueScore >= this.winCondition) {
            this.triggerGameOver('blue');
        }
    }

    // 觸發遊戲結束，並發送廣播給主題模組去播放結算畫面
    triggerGameOver(winnerTeam) {
        console.log(`🏆 遊戲結束！獲勝隊伍是：${winnerTeam === 'red' ? '紅隊' : '藍隊'}`);
        
        const event = new CustomEvent('ITIP_GAME_OVER', { 
            detail: { winner: winnerTeam } 
        });
        document.dispatchEvent(event);
    }
}

// 實例化計分板，讓全域都可以使用
const ProgressTracker = new GameProgressTracker();
