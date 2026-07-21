/**
 * ITIP 2.0 - Ninja Theme Controller
 * 負責渲染切水果/點破氣球的特效，並更新專屬進度條
 */

class NinjaTheme {
    constructor() {
        this.targetEmojis = ['🎈', '🍉', '🍎', '🎯']; // 可以切換成不同圖案
        this.initDOM();
    }

    // 初始化主題的 HTML 結構 (蓋在原本的遊戲上)
    initDOM() {
        const wrapper = document.createElement('div');
        wrapper.id = 'ninja-theme-wrapper';
        
        wrapper.innerHTML = `
            <!-- 紅隊進度與特效區 -->
            <div class="ninja-progress-bar red"><div class="progress-fill red" id="ninja-prog-red"></div></div>
            <div class="ninja-zone red" id="ninja-zone-red"></div>
            
            <!-- 藍隊進度與特效區 -->
            <div class="ninja-progress-bar blue"><div class="progress-fill blue" id="ninja-prog-blue"></div></div>
            <div class="ninja-zone blue" id="ninja-zone-blue"></div>
        `;
        
        // 將特效層塞入原本預留的 theme-layer
        const themeLayer = document.getElementById('theme-layer');
        if (themeLayer) {
            themeLayer.appendChild(wrapper);
        } else {
            document.body.appendChild(wrapper);
        }
        
        console.log("🥷 [Theme: Ninja] 忍者修煉主題已載入！");
    }

    // ================= 接收來自 EventManager 的指令 =================

    // 播放答對特效 (切開！)
    playSuccessAnimation(team) {
        this.spawnTarget(team, 'slice-anim');
        this.updateProgress();
    }

    // 播放答錯特效 (掉落！)
    playWrongAnimation(team) {
        this.spawnTarget(team, 'miss-anim');
    }

    // ================= 內部動畫邏輯 =================

    // 在畫面上生成一瞬間的特效物件
    spawnTarget(team, animClass) {
        const zone = document.getElementById(`ninja-zone-${team}`);
        if (!zone) return;

        const target = document.createElement('div');
        target.className = `ninja-target ${animClass}`;
        
        // 隨機選一個圖案
        target.innerText = this.targetEmojis[Math.floor(Math.random() * this.targetEmojis.length)];
        
        zone.appendChild(target);

        // 動畫結束後自動清理 DOM，保持網頁順暢
        target.addEventListener('animationend', () => {
            target.remove();
        });
    }

    // 更新進度條高度 (讀取 ProgressTracker 的資料)
    updateProgress() {
        if (typeof ProgressTracker === 'undefined') return;
        
        // 計算百分比 (最高 100%)
        const redPercent = Math.min((ProgressTracker.redScore / ProgressTracker.winCondition) * 100, 100);
        const bluePercent = Math.min((ProgressTracker.blueScore / ProgressTracker.winCondition) * 100, 100);
        
        document.getElementById('ninja-prog-red').style.height = `${redPercent}%`;
        document.getElementById('ninja-prog-blue').style.height = `${bluePercent}%`;
    }
}

// 實例化控制器，讓 eventManager.js 可以呼叫 ThemeController.playSuccessAnimation()
const ThemeController = new NinjaTheme();
