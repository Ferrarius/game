class GameScreen {

    private game:Game;
    private player1:Player;
    private player2:Player;
    private enemy:Enemy;

    constructor(game:Game) {
        this.game = game;
        this.player1 = new Player('player1', 0, 0, 'blue', 'w', 'a', 's', 'd');
        this.player2 = new Player('player2', 0, 100, 'red', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight');
        this.enemy = new Enemy();

        this.gameLoop();
    }

    private gameLoop() {
        this.player1.update();
        this.player2.update();
        this.enemy.update();

        if(GameScreen.checkCollision(this.player1.getPosition(), this.enemy.getPosition())) {
            this.player1.addScore();
            this.enemy.reset();
        }

        if(GameScreen.checkCollision(this.player2.getPosition(), this.enemy.getPosition())) {
            this.player2.addScore();
            this.enemy.reset();
        }

        if(this.player1.score == 5) {
            this.game.endGame(this.player1);
        } else if (this.player2.score == 5) {
            this.game.endGame(this.player2);
        }

        requestAnimationFrame(() => this.gameLoop())
    }

    static checkCollision(player:ClientRect, enemy:ClientRect) {
        return (player.left <= enemy.right && enemy.left <= player.right && player.top <= enemy.bottom && enemy.top <= player.bottom);
    }
}