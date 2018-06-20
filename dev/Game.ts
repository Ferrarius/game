class Game {

    private player1:PlayerOne;
    private player2:PlayerTwo;
    private enemy:Enemy;

    constructor() {
        this.player1 = new PlayerOne();
        this.player2 = new PlayerTwo();
        this.enemy = new Enemy();

        this.gameLoop();
    }

    private gameLoop() {
        this.player1.update();
        this.player2.update();
        this.enemy.update();

        if(Game.checkCollision(this.player1.getPosition(), this.enemy.getPosition())) {
            alert('Blauw');
            window.location.href = '/';
        }

        if(Game.checkCollision(this.player2.getPosition(), this.enemy.getPosition())) {
            alert('Rood');
            window.location.href = '/';
        }

        requestAnimationFrame(() => this.gameLoop())
    }

    static checkCollision(player:ClientRect, enemy:ClientRect) {
        return (player.left <= enemy.right && enemy.left <= player.right && player.top <= enemy.bottom && enemy.top <= player.bottom);
    }
}