// 创建牌堆
const suits = ['♠', '♥', '♦', '♣'];
const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let deck = [];

// 生成一副牌
function createDeck() {
    deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
}

// 打乱牌堆
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]; // 交换
    }
}

// 初始化牌堆并洗牌
createDeck();
shuffleDeck();
