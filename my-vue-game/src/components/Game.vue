<template>
    <div class="game-container">
      <div class="dealer-container">
        <h3>庄家</h3>
        <p>金额: ¥{{ dealerAmount }}</p>
        <div>牌: {{ dealerCards }}</div>
      </div>
      <div class="players-container">
        <div class="player player1">
          <h3>玩家1</h3>
          <p>金额: ¥{{ player1Amount }}</p>
          <p>下注: ¥{{ player1Bet }}</p>
          <div>牌: {{ player1Cards }}</div>
        </div>
        <div class="log-container">
          <h3>资金流水</h3>
          <div id="log-content">
            <div v-for="log in logContent" :key="log.id">{{ log.message }}</div>
          </div>
        </div>
        <div class="player player3">
          <h3>玩家3</h3>
          <p>金额: ¥{{ player3Amount }}</p>
          <p>下注: ¥{{ player3Bet }}</p>
          <div>牌: {{ player3Cards }}</div>
        </div>
      </div>
    
      <div class="player player2">
        <h3>玩家2</h3>
        <p>金额: ¥{{ player2Amount }}</p>
        <p>下注: ¥{{ player2Bet }}</p>
        <div>牌: {{ player2Cards }}</div>
      </div>
      <div>
        <button @click="startGame">开始游戏</button>
        <button @click="continueGame" :disabled="remainingDeck.length === 0">继续游戏</button>
        <button @click="resetGame">重新开始</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // 初始金额
        dealerAmount: 5000,
        player1Amount: 1000,
        player2Amount: 1000,
        player3Amount: 1000,
    
        // 初始下注金额
        player1Bet: 1,
        player2Bet: 1,
        player3Bet: 1,
    
        // 玩家和庄家牌
        dealerCards: [],
        player1Cards: [],
        player2Cards: [],
        player3Cards: [],
    
        // 游戏日志
        logContent: [],
    
        // 牌堆
        deck: [],
        remainingDeck: [],
      };
    },
    methods: {
      // 初始化牌堆
      initDeck() {
        const suits = ['♠', '♥', '♦', '♣'];
        const points = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
        const deck = [];
    
        suits.forEach(suit => {
          points.forEach(point => {
            deck.push([point, suit]);
          });
        });
    
        return deck;
      },
    
      // 洗牌
      shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
      },
    
      // 发牌
      dealCards() {
        const deck = this.remainingDeck.length > 0 ? this.remainingDeck : this.shuffleDeck(this.initDeck());
    
        // 庄家发两张牌
        this.dealerCards = [deck.pop(), deck.pop()];
    
        // 玩家1、玩家2、玩家3发两张牌
        this.player1Cards = [deck.pop(), deck.pop()];
        this.player2Cards = [deck.pop(), deck.pop()];
        this.player3Cards = [deck.pop(), deck.pop()];
    
        // 更新剩余的牌
        this.remainingDeck = deck;
      },
    
      // 计算点数
      getHandPoints(cards) {
        const isPair = cards[0][0] === cards[1][0];
        if (isPair) {
          return 11; // 对子比任何点数大
        }
        const sum = parseInt(cards[0][0]) + parseInt(cards[1][0]);
        return sum % 10;
      },
    
      // 更新下注
      updateBets(player, result) {
        if (result === 'win') {
          if (player === 1) {
            this.player1Bet = Math.max(this.player1Bet - 1, 1);
          } else if (player === 2) {
            this.player2Bet = Math.max(this.player2Bet - 1, 1);
          } else if (player === 3) {
            this.player3Bet = Math.floor(Math.random() * 10) + 1;
          }
        } else if (result === 'lose') {
          if (player === 1) {
            this.player1Bet += 1;
          } else if (player === 2) {
            this.player2Bet += 2;
          }
        }
      },
    
      // 比较牌型和结果
      compareHands() {
        const dealerPoints = this.getHandPoints(this.dealerCards);
        const player1Points = this.getHandPoints(this.player1Cards);
        const player2Points = this.getHandPoints(this.player2Cards);
        const player3Points = this.getHandPoints(this.player3Cards);
    
        // 玩家1
        if (player1Points > dealerPoints) {
          const winAmount = this.player1Bet * (this.player1Cards[0][0] === this.player1Cards[1][0] ? 2 : 1); // 双倍赔付对子
          this.player1Amount += winAmount;
          this.dealerAmount -= winAmount;
          this.logContent.push({ id: Date.now(), message: `玩家1胜利，资金变动：+${winAmount} 元` });
          this.updateBets(1, 'win');
        } else if (player1Points < dealerPoints) {
          this.player1Amount -= this.player1Bet;
          this.dealerAmount += this.player1Bet;
          this.logContent.push({ id: Date.now(), message: `玩家1失败，资金变动：-${this.player1Bet} 元` });
          this.updateBets(1, 'lose');
        } else {
          this.logContent.push({ id: Date.now(), message: `玩家1与庄家点数相同，庄家胜` });
        }
    
        // 玩家2
        if (player2Points > dealerPoints) {
          const winAmount = this.player2Bet * (this.player2Cards[0][0] === this.player2Cards[1][0] ? 2 : 1);
          this.player2Amount += winAmount;
          this.dealerAmount -= winAmount;
          this.logContent.push({ id: Date.now(), message: `玩家2胜利，资金变动：+${winAmount} 元` });
          this.updateBets(2, 'win');
        } else if (player2Points < dealerPoints) {
          this.player2Amount -= this.player2Bet;
          this.dealerAmount += this.player2Bet;
          this.logContent.push({ id: Date.now(), message: `玩家2失败，资金变动：-${this.player2Bet} 元` });
          this.updateBets(2, 'lose');
        } else {
          this.logContent.push({ id: Date.now(), message: `玩家2与庄家点数相同，庄家胜` });
        }
    
        // 玩家3
        if (player3Points > dealerPoints) {
          const winAmount = this.player3Bet * (this.player3Cards[0][0] === this.player3Cards[1][0] ? 2 : 1);
          this.player3Amount += winAmount;
          this.dealerAmount -= winAmount;
          this.logContent.push({ id: Date.now(), message: `玩家3胜利，资金变动：+${winAmount} 元` });
          this.updateBets(3, 'win');
        } else if (player3Points < dealerPoints) {
          this.player3Amount -= this.player3Bet;
          this.dealerAmount += this.player3Bet;
          this.logContent.push({ id: Date.now(), message: `玩家3失败，资金变动：-${this.player3Bet} 元` });
          this.updateBets(3, 'lose');
        } else {
          this.logContent.push({ id: Date.now(), message: `玩家3与庄家点数相同，庄家胜` });
        }
      },
    
      // 开始新一轮游戏
      startGame() {
        this.logContent = [];
        this.dealerAmount = 5000;
        this.player1Amount = 1000;
        this.player2Amount = 1000;
        this.player3Amount = 1000;
        this.dealerCards = [];
        this.player1Cards = [];
        this.player2Cards = [];
        this.player3Cards = [];
        this.remainingDeck = this.shuffleDeck(this.initDeck());
        this.dealCards();
      },
    
      // 继续游戏
      continueGame() {
        if (this.remainingDeck.length >= 6) {
          this.dealCards(); // 发牌，直到剩余的牌张不足够
          this.compareHands();
        } else {
          alert('牌堆已空，无法继续游戏！');
        }
      },
    
      // 重新开始
      resetGame() {
        this.logContent = [];
        this.dealerAmount = 5000;
        this.player1Amount = 1000;
        this.player2Amount = 1000;
        this.player3Amount = 1000;
        this.dealerCards = [];
        this.player1Cards = [];
        this.player2Cards = [];
        this.player3Cards = [];
        this.remainingDeck = this.shuffleDeck(this.initDeck());
      },
    },
  };
  </script>
  
  <style scoped>
  .game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  .dealer-container, .players-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .player {
    margin: 10px;
    padding: 20px;
    background: #f4f4f4;
    border-radius: 10px;
    text-align: center;
  }
  
  button {
    padding: 10px;
    margin: 5px;
    cursor: pointer;
  }
  </style>
  