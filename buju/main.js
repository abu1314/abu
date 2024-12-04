const { createApp, reactive } = Vue;

createApp({
  data() {
    return {
      deck: [],
      dealerBalance: 5000,
      playerBalances: [1000, 1000, 1000],
      playerBets: [1, 1, 1],
      gameStarted: false,
      log: [],
      winner: null,
      playerCards: {
        dealer: [],
        player1: [],
        player2: [],
        player3: [],
      },
      playerResults: {
        dealer: { type: "", points: 0 },
        player1: { type: "", points: 0 },
        player2: { type: "", points: 0 },
        player3: { type: "", points: 0 },
      },
    };
  },
  methods: {
    createDeck() {
      const suits = ["♠", "♥", "♦", "♣"];
      const values = Array.from({ length: 10 }, (_, i) => i + 1);
      this.deck = [];
      suits.forEach(suit => {
        values.forEach(value => {
          this.deck.push({ value, suit });
        });
      });
      this.shuffleDeck();
    },

    shuffleDeck() {
      for (let i = this.deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
      }
    },

    dealCards() {
      this.playerCards.dealer = [this.deck.pop(), this.deck.pop()];
      this.playerCards.player1 = [this.deck.pop(), this.deck.pop()];
      this.playerCards.player2 = [this.deck.pop(), this.deck.pop()];
      this.playerCards.player3 = [this.deck.pop(), this.deck.pop()];
      
      this.playerResults.dealer = this.getResult(this.playerCards.dealer);
      this.playerResults.player1 = this.getResult(this.playerCards.player1);
      this.playerResults.player2 = this.getResult(this.playerCards.player2);
      this.playerResults.player3 = this.getResult(this.playerCards.player3);
    },

    getResult(cards) {
      const [card1, card2] = cards;
      if (card1.value === card2.value) {
        return { type: "对子", points: 0 };
      }
      return { type: "点数", points: (card1.value + card2.value) % 10 };
    },

    updateBalance() {
      const logContent = [];
      for (let i = 0; i < 3; i++) {
        const bet = this.playerBets[i];
        const result = this.playerResults[`player${i + 1}`];
        const dealerResult = this.playerResults.dealer;

        if (dealerResult.type === result.type && dealerResult.points >= result.points) {
          // 庄家胜
          this.playerBalances[i] -= bet;
          this.dealerBalance += bet;
          logContent.push(`玩家${i + 1} 输，扣除 ${bet} 元`);
        } else {
          // 玩家胜
          this.playerBalances[i] += bet;
          this.dealerBalance -= bet;
          logContent.push(`玩家${i + 1} 赢，获得 ${bet} 元`);
        }
      }

      this.log = logContent;
    },

    startGame() {
      this.createDeck();
      this.dealCards();
      this.updateBalance();
      this.gameStarted = true;
    },

    resetGame() {
      this.dealerBalance = 5000;
      this.playerBalances = [1000, 1000, 1000];
      this.playerBets = [1, 1, 1];
      this.deck = [];
      this.gameStarted = false;
      this.log = [];
      this.playerCards = {
        dealer: [],
        player1: [],
        player2: [],
        player3: [],
      };
      this.playerResults = {
        dealer: { type: "", points: 0 },
        player1: { type: "", points: 0 },
        player2: { type: "", points: 0 },
        player3: { type: "", points: 0 },
      };
    },
  },
  template: `
    <div>
      <div class="container">
        <div class="player" v-if="gameStarted">
          <h2>庄家</h2>
          <div class="cards">
            <span v-for="card in playerCards.dealer" :key="card.suit + card.value">{{ card.suit }}{{ card.value }}</span>
          </div>
          <p>点数: {{ playerResults.dealer.type }} - {{ playerResults.dealer.points }}</p>
        </div>

        <div class="player" v-if="gameStarted">
          <h2>玩家 1</h2>
          <div class="cards">
            <span v-for="card in playerCards.player1" :key="card.suit + card.value">{{ card.suit }}{{ card.value }}</span>
          </div>
          <p>点数: {{ playerResults.player1.type }} - {{ playerResults.player1.points }}</p>
        </div>

        <div id="log-content" class="player" v-if="gameStarted">
          <h3>资金流水</h3>
          <div v-for="(entry, index) in log" :key="index">{{ entry }}</div>
        </div>

        <div class="player" v-if="gameStarted">
          <h2>玩家 3</h2>
          <div class="cards">
            <span v-for="card in playerCards.player3" :key="card.suit + card.value">{{ card.suit }}{{ card.value }}</span>
          </div>
          <p>点数: {{ playerResults.player3.type }} - {{ playerResults.player3.points }}</p>
        </div>

        <div class="player" v-if="gameStarted">
          <h2>玩家 2</h2>
          <div class="cards">
            <span v-for="card in playerCards.player2" :key="card.suit + card.value">{{ card.suit }}{{ card.value }}</span>
          </div>
          <p>点数: {{ playerResults.player2.type }} - {{ playerResults.player2.points }}</p>
        </div>
      </div>
      <button @click="startGame" :disabled="gameStarted">开始游戏</button>
      <button @click="resetGame" :disabled="!gameStarted">重新开始</button>
    </div>
  `,
}).mount("#app");
