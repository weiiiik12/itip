/**
 * ITIP 2.0 - 資料大管家 (API Manager)
 * 負責從 Google Sheets (或 JSON) 讀取 Books, Units, Vocabulary 的資料，
 * 並提供給大廳 (Lobby) 與核心遊戲 (Core Games) 使用。
 */

class GameAPI {
    constructor() {
        // 存放從資料庫抓下來的原始資料
        this.database = {
            books: [],
            units: [],
            vocabulary: []
        };
        
        // 標記是否已經載入完畢
        this.isLoaded = false;
    }

    /**
     * 1. 核心載入功能 (系統啟動時呼叫)
     * 這裡預留了串接 Google Apps Script (Web App) 或 CSV 的介面
     */
    async loadData(sourceUrl) {
        console.log("⏳ [API] 正在從資料庫載入教材資料...");
        try {
            // 假設來源回傳的是包含三個陣列的 JSON 物件
            const response = await fetch(sourceUrl);
            const data = await response.json();

            // 將資料存入大管家的口袋
            this.database.books = data.books || [];
            this.database.units = data.units || [];
            this.database.vocabulary = data.vocabulary || [];
            
            this.isLoaded = true;
            console.log("✅ [API] 資料載入成功！", this.database);
            return true;

        } catch (error) {
            console.error("❌ [API] 資料載入失敗：", error);
            return false;
        }
    }

    /**
     * 2. 提供給大廳 (Lobby) 的查詢功能
     */
    // 取得所有書本 (對應 Books 表單)
    getAllBooks() {
        return this.database.books.filter(book => book.status === 10 || book.Status === 'Active');
    }

    // 根據書本 ID 取得底下的單元 (對應 Units 表單)
    getUnitsByBookId(bookID) {
        return this.database.units.filter(unit => unit.book_ID === bookID);
    }

    /**
     * 3. 提供給遊戲引擎 (Core Games) 的出題功能
     * 大廳設定好後，會呼叫這個函式把題目存入 sessionStorage，讓遊戲網頁讀取
     */
    async prepareGameData(unitID) {
        console.log(`🔍 [API] 正在準備單元 ${unitID} 的遊戲題目...`);
        
        // 根據 unit_ID 篩選出該單元的所有單字 (對應 Vocabulary 表單)
        const unitVocab = this.database.vocabulary.filter(vocab => vocab.unit_ID === unitID);
        
        if (unitVocab.length === 0) {
            console.warn(`⚠️ [API] 警告：單元 ${unitID} 裡面沒有找到任何單字！`);
            return null;
        }

        // 將篩選好的資料存入瀏覽器的 sessionStorage
        // 這樣待會跳轉到 quiz.html 或 matching.html 時，遊戲就能直接拿到這些單字
        sessionStorage.setItem('itip_current_vocab', JSON.stringify(unitVocab));
        console.log(`🎯 [API] 已將 ${unitVocab.length} 個單字送入遊戲準備區 (sessionStorage)！`);
        
        return unitVocab;
    }
}

// 實例化大管家，供全域使用
const ITIP_Data = new GameAPI();
