// 游戏核心逻辑 - gameLogic.js

// 仅在顶部声明一次 deck 变量
let dealerBalance = 5000;
let playerBalances = [1000, 1000, 1000]; // 玩家1、玩家2、玩家3的初始余额
let playerBets = [1, 1, 1]; // 玩家1、玩家2、玩家3的初始赌注
let deck = []; // 牌堆变量，只在这里声明一次

// 创建牌堆
function createDeck() {
    const suits = ['♠', '♥', '♦', '♣'];
    deck = [];  // 清空deck数组，确保每次游戏开始时创建新的牌堆
    for (let suit of suits) {
        for (let value = 1; value <= 10; value++) {
            deck.push({ value, suit });
        }
    }
    shuffleDeck(); // 洗牌
}

// 洗牌
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// 发牌
function dealCards() {
    let dealerCards = [deck.pop(), deck.pop()];
    let player1Cards = [deck.pop(), deck.pop()];
    let player2Cards = [deck.pop(), deck.pop()];
    let player3Cards = [deck.pop(), deck.pop()];

    // 更新显示的牌
    displayCards('dealer', dealerCards);
    displayCards('player1', player1Cards);
    displayCards('player2', player2Cards);
    displayCards('player3', player3Cards);

    // 计算点数和判断胜负
    let dealerResult = getResult(dealerCards);
    let player1Result = getResult(player1Cards);
    let player2Result = getResult(player2Cards);
    let player3Result = getResult(player3Cards);

    // 更新结果
    displayResult('dealer', dealerResult);
    displayResult('player1', player1Result);
    displayResult('player2', player2Result);
    displayResult('player3', player3Result);

    // 比较结果并更新余额
    updateBalance(dealerResult, player1Result, 0);
    updateBalance(dealerResult, player2Result, 1);
    updateBalance(dealerResult, player3Result, 2);
}

// 计算牌型，返回结果（点数或对子）
function getResult(cards) {
    const [card1, card2] = cards;
    if (card1.value === card2.value) {
        return { type: '对子', points: 0 }; // 对子
    }
    return { type: '点数', points: (card1.value + card2.value) % 10 }; // 点数，取个位数
}

// 显示牌
function displayCards(player, cards) {
    let cardsContainer = document.getElementById(`${player}-cards`);
    cardsContainer.innerHTML = '';
    cards.forEach(card => {
        cardsContainer.innerHTML += `<div class="card">${card.suit}${card.value}</div>`;
    });
}

// 显示胜负结果
function displayResult(player, result) {
    let resultContainer = document.getElementById(`${player}-result`);
    resultContainer.innerHTML = `牌型: ${result.type} (${result.points})`;
}

// 更新玩家和庄家余额
function updateBalance(dealerResult, playerResult, playerIndex) {
    let logContent = document.getElementById('log-content');
    let bet = playerBets[playerIndex];
    let balanceElement = document.getElementById(`player${playerIndex + 1}-balance`);
    let resultText = '';

    // 判断胜负
    if (dealerResult.type === playerResult.type) {
        if (dealerResult.points >= playerResult.points) {
            // 庄家胜
            playerBalances[playerIndex] -= bet;
            dealerBalance += bet;
            resultText = `庄家胜，玩家${playerIndex + 1}扣除 ${bet} 元`;
        } else {
            // 玩家胜
            playerBalances[playerIndex] += bet;
            dealerBalance -= bet;
            resultText = `玩家${playerIndex + 1}胜，获得 ${bet} 元`;
        }
    } else if (dealerResult.type === '对子' && playerResult.type !== '对子') {
        // 对子大于点数
        playerBalances[playerIndex] -= bet;
        dealerBalance += bet;
        resultText = `庄家胜，玩家${playerIndex + 1}扣除 ${bet} 元`;
    } else {
        // 玩家胜
        playerBalances[playerIndex] += bet;
        dealerBalance -= bet;
        resultText = `玩家${playerIndex + 1}胜，获得 ${bet} 元`;
    }

    // 更新显示余额
    balanceElement.innerHTML = `剩余金额: ${playerBalances[playerIndex]}`;
    logContent.innerHTML += `<p>${resultText}</p>`;
    document.getElementById('dealer-balance').innerHTML = `庄家剩余金额: ${dealerBalance}`;
}

// 点击开始游戏
document.getElementById('start-button').addEventListener('click', function() {
    createDeck();
    dealCards();
});

// 点击重新开始
document.getElementById('reset-button').addEventListener('click', function() {
    // 重新初始化
    dealerBalance = 5000;
    playerBalances = [1000, 1000, 1000];
    playerBets = [1, 1, 1];
    deck = [];

    // 重置显示
    document.getElementById('dealer-balance').innerHTML = `庄家剩余金额: ${dealerBalance}`;
    for (let i = 0; i < 3; i++) {
        document.getElementById(`player${i + 1}-balance`).innerHTML = `剩余金额: ${playerBalances[i]}`;
    }

    // 清空牌和结果
    ['dealer', 'player1', 'player2', 'player3'].forEach(player => {
        document.getElementById(`${player}-cards`).innerHTML = '';
        document.getElementById(`${player}-result`).innerHTML = '';
    });

    // 清空资金流水
    document.getElementById('log-content').innerHTML = '';
});
