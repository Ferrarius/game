class Game {

    public screen:StartScreen|GameScreen|EndScreen;

    constructor() {
        this.screen = new StartScreen(this);
    }

    public startGame() {
        Game.clearScreens();
        this.screen = new GameScreen(this);
    }

    public endGame(winner:Player) {
        Game.clearScreens();
        this.screen = new EndScreen(winner);
    }

    static clearScreens() {
        document.body.innerHTML = '';
    }
}