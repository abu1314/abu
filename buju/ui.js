// 更新余额和资金流水
function updateBalances() {
    document.getElementById('dealer-balance').innerText = `庄家剩余金额: ${dealerBalance}`;
    document.getElementById('player1-balance').innerText = `玩家1剩余金额: ${playerBalances[0]}`;
    document.getElementById('player2-balance').innerText = `玩家2剩余金额: ${playerBalances[1]}`;
    document.getElementById('player3-balance').innerText = `玩家3剩余金额: ${playerBalances[2]}`;
}

// 更新资金流水
function updateBalanceLog(logEntry) {
    const logContent = document.getElementById('log-content');
    const entry = document.createElement('div');
    entry.innerText = logEntry;
    logContent.appendChild(entry);
    logContent.scrollTop = logContent.scrollHeight; // 滚动到最新记录
}

// 初始化游戏
function initGame() {
    // 初始化数据和界面
    createDeck();
    shuffleDeck();
    updateBalances();
    updateBalanceLog("游戏初始化完成。");
}

// 开始游戏按钮的事件监听
document.getElementById('start-button').addEventListener('click', () => {
    playRound();
    updateBalanceLog("游戏开始！");
});

// 重新开始按钮的事件监听
document.getElementById('reset-button').addEventListener('click', () => {
    playerBalances = [1000, 1000, 1000];
    dealerBalance = 5000;
    updateBalances();
    updateBalanceLog("游戏已重置。");
});
