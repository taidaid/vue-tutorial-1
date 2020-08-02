var vm = new Vue({
  el: "#app",
  data: {
    turn: 0,
    player1: { health: 100 },
    player2: { health: 100 },
    actionLog: [],
  },
  methods: {
    nextTurn: function () {
      this.turn++;
    },
    logActions: function (player1Action, player2Action) {
      this.actionLog.push(player1Action, player2Action);
    },
    attack: function (event) {
      var special = event.target.id === "special-attack-button";
      var player1Atk = Math.floor(
        special ? Math.random() * 20 : Math.random() * 10
      );
      var player2Atk = Math.floor(Math.random() * 10);
      this.player2.health -= player1Atk;
      this.player1.health -= player2Atk;
      var player1Action = {
        name: special ? "special attack" : "attack",
        value: player1Atk,
        actor: "player1",
      };
      var player2Action = {
        name: "attack",
        value: player2Atk,
        actor: "player2",
      };

      this.logActions(player1Action, player2Action);
      this.nextTurn();
    },
    heal: function () {
      var player1Heal = Math.floor(Math.random() * 8);
      var player2Atk = Math.floor(Math.random() * 10);
      this.player1.health += player1Heal;
      this.player1.health -= player2Atk;
      var player1Action = {
        name: "heal",
        value: player1Heal,
        actor: "player1",
      };
      var player2Action = {
        name: "attack",
        value: player2Atk,
        actor: "player2",
      };

      this.logActions(player1Action, player2Action);
      this.nextTurn();
    },
    reset: function () {
      this.turn = 0;
      this.player1.health = 100;
      this.player2.health = 100;
      this.actionLog = [];
    },
  },
  computed: {
    player1HealthStyles: function () {
      return {
        backgroundColor: `${
          this.player1.health > 50
            ? "darkgreen"
            : this.player1.health > 30
            ? "green"
            : "red"
        } `,
        width: `${this.player1.health}%`,
      };
    },
    player2HealthStyles: function () {
      return {
        backgroundColor:
          this.player2.health > 50
            ? "darkgreen"
            : this.player2.health > 30
            ? "green"
            : "red",
        width: `${this.player2.health}%`,
      };
    },
    actionStyles: function (actionName) {
      function getBackgroundColor() {
        switch (actionName) {
          case "attack":
            return "red";
          case "special attack":
            return "darkred";
          case "heal":
            return "blue";
          default:
            return "black";
        }
      }

      return {
        backgroundColor: getBackgroundColor(actionName),
      };
    },
  },
});
