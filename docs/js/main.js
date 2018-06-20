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
        this.element.style.height = this.height.toString() + 'px';
        this.element.style.width = this.width.toString() + 'px';
        this.element.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
        document.body.appendChild(this.element);
    }
    GameObject.prototype.getPosition = function () {
        return this.element.getBoundingClientRect();
    };
    GameObject.prototype.update = function () {
        this.element.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
        this.element.style.width = this.width.toString() + 'px';
        this.element.style.height = this.height.toString() + 'px';
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
        setInterval(function () { return _this.moveRandom(); }, 10);
        return _this;
    }
    Enemy.prototype.moveRandom = function () {
        var randomNumber = Math.floor(Math.random() * 4);
        switch (randomNumber) {
            case 0:
                this.y -= 5;
                break;
            case 1:
                this.x -= 5;
                break;
            case 2:
                this.y += 5;
                break;
            case 3:
                this.y += 5;
                break;
        }
        for (var i = 0; i < 5; i++) {
            if (this.y - i === window.innerHeight || this.x - i === window.innerWidth || this.y + i === window.innerHeight || this.x + i === window.innerWidth) {
                this.reset();
            }
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
        this.player1 = new PlayerOne();
        this.player2 = new PlayerTwo();
        this.enemy = new Enemy();
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.player1.update();
        this.player2.update();
        this.enemy.update();
        if (Game.checkCollision(this.player1.getPosition(), this.enemy.getPosition())) {
            alert('Blauw');
            window.location.href = '/';
        }
        if (Game.checkCollision(this.player2.getPosition(), this.enemy.getPosition())) {
            alert('Rood');
            window.location.href = '/';
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.checkCollision = function (player, enemy) {
        return (player.left <= enemy.right && enemy.left <= player.right && player.top <= enemy.bottom && enemy.top <= player.bottom);
    };
    return Game;
}());
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(name, x, y, color, upKey, leftKey, downKey, rightKey) {
        var _this = _super.call(this, name, color, 100, 100, x, y) || this;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e, upKey, leftKey, downKey, rightKey); });
        return _this;
    }
    Player.prototype.onKeyDown = function (event, upKey, leftKey, downKey, rightKey) {
        switch (event.key) {
            case upKey:
                this.y -= 50;
                break;
            case leftKey:
                this.x -= 50;
                break;
            case downKey:
                this.y += 50;
                break;
            case rightKey:
                this.x += 50;
                break;
        }
    };
    return Player;
}(GameObject));
var PlayerOne = (function (_super) {
    __extends(PlayerOne, _super);
    function PlayerOne() {
        return _super.call(this, 'player1', 0, 0, 'blue', 'w', 'a', 's', 'd') || this;
    }
    return PlayerOne;
}(Player));
var PlayerTwo = (function (_super) {
    __extends(PlayerTwo, _super);
    function PlayerTwo() {
        return _super.call(this, 'player2', 0, 100, 'red', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight') || this;
    }
    return PlayerTwo;
}(Player));
window.addEventListener("load", function () {
    new Game();
});
//# sourceMappingURL=main.js.map