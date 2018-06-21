"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function () {
    function GameObject(e, color, height, width, x, y) {
        this.x = x;
        this.y = y;
        this.element = document.createElement(e);
        this.element.style.backgroundColor = color;
        this.height = height;
        this.width = width;
        this.element.style.display = 'inline-block';
        this.element.style.position = 'absolute';
    }
    GameObject.prototype.getPosition = function () {
        return this.element.getBoundingClientRect();
    };
    GameObject.prototype.update = function () {
        this.element.style.height = this.height.toString() + 'px';
        this.element.style.width = this.width.toString() + 'px';
        this.element.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
        document.body.appendChild(this.element);
    };
    return GameObject;
}());
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        var _this = this;
        var width = 50;
        var height = 50;
        _this = _super.call(this, 'enemy', 'black', width, height, Math.floor((Math.random() * (window.innerWidth - width)) + 1), Math.floor((Math.random() * (window.innerHeight - height)) + 1)) || this;
        setInterval(function () { return _this.moveRandom(); }, 100);
        return _this;
    }
    Enemy.prototype.moveRandom = function () {
        var randomNumber = Math.floor(Math.random() * 4);
        switch (randomNumber) {
            case 0:
                this.y -= 50;
                break;
            case 1:
                this.x -= 50;
                break;
            case 2:
                this.y += 50;
                break;
            case 3:
                this.x += 50;
                break;
        }
        if (this.y < 0 || this.y > innerHeight - this.height - 50 || this.x < 0 || this.x > innerWidth - this.width - 50) {
            this.reset();
        }
    };
    Enemy.prototype.reset = function () {
        this.x = Math.floor((Math.random() * (window.innerWidth - this.width)) + 1);
        this.y = Math.floor((Math.random() * (window.innerHeight - this.height)) + 1);
    };
    return Enemy;
}(GameObject));
var Game = (function () {
    function Game() {
        this.screen = new StartScreen(this);
    }
    Game.prototype.startGame = function () {
        Game.clearScreens();
        this.screen = new GameScreen(this);
    };
    Game.prototype.endGame = function (winner) {
        Game.clearScreens();
        this.screen = new EndScreen(winner);
    };
    Game.clearScreens = function () {
        document.body.innerHTML = '';
    };
    return Game;
}());
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(name, x, y, color, upKey, leftKey, downKey, rightKey) {
        var _this = _super.call(this, name, color, 100, 100, x, y) || this;
        _this.score = 0;
        _this.name = name;
        _this.element.innerText = _this.score.toString();
        _this.element.style.fontSize = '50px';
        _this.element.style.textAlign = 'center';
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e, upKey, leftKey, downKey, rightKey); });
        return _this;
    }
    Player.prototype.onKeyDown = function (event, upKey, leftKey, downKey, rightKey) {
        switch (event.key) {
            case upKey:
                if (this.y > 0) {
                    this.y -= 50;
                }
                break;
            case leftKey:
                if (this.x > 0) {
                    this.x -= 50;
                }
                break;
            case downKey:
                if (this.y < window.innerHeight - this.height - 50) {
                    this.y += 50;
                }
                break;
            case rightKey:
                if (this.x < window.innerWidth - this.width - 50) {
                    this.x += 50;
                }
                break;
        }
    };
    Player.prototype.addScore = function () {
        this.score += 1;
        this.element.innerText = (this.score).toString();
    };
    return Player;
}(GameObject));
window.addEventListener("load", function () {
    new Game();
});
var EndScreen = (function () {
    function EndScreen(winner) {
        var h1 = document.createElement('h1');
        h1.innerText = winner.name + ' heeft gewonnen!';
        document.body.appendChild(h1);
    }
    return EndScreen;
}());
var GameScreen = (function () {
    function GameScreen(game) {
        this.game = game;
        this.player1 = new Player('player1', 0, 0, 'blue', 'w', 'a', 's', 'd');
        this.player2 = new Player('player2', 0, 100, 'red', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight');
        this.enemy = new Enemy();
        this.gameLoop();
    }
    GameScreen.prototype.gameLoop = function () {
        var _this = this;
        this.player1.update();
        this.player2.update();
        this.enemy.update();
        if (GameScreen.checkCollision(this.player1.getPosition(), this.enemy.getPosition())) {
            this.player1.addScore();
            this.enemy.reset();
        }
        if (GameScreen.checkCollision(this.player2.getPosition(), this.enemy.getPosition())) {
            this.player2.addScore();
            this.enemy.reset();
        }
        if (this.player1.score == 5) {
            this.game.endGame(this.player1);
        }
        else if (this.player2.score == 5) {
            this.game.endGame(this.player2);
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    GameScreen.checkCollision = function (player, enemy) {
        return (player.left <= enemy.right && enemy.left <= player.right && player.top <= enemy.bottom && enemy.top <= player.bottom);
    };
    return GameScreen;
}());
var StartScreen = (function () {
    function StartScreen(game) {
        var _this = this;
        this.game = game;
        var image = document.createElement('img');
        image.src = 'http://blog.conqueryourdebt.org/wp-content/uploads/2013/05/Startnow_button-1024x700.jpg';
        image.style.width = '100%';
        image.addEventListener("click", function () { return _this.game.startGame(); });
        document.body.appendChild(image);
    }
    return StartScreen;
}());
//# sourceMappingURL=main.js.map