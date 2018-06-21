class StartScreen {

    private game:Game;

    constructor(game:Game) {
        this.game = game;

        let image = document.createElement('img');
        image.src = 'http://blog.conqueryourdebt.org/wp-content/uploads/2013/05/Startnow_button-1024x700.jpg';
        image.style.width = '100%';

        image.addEventListener("click", () => this.game.startGame());

        document.body.appendChild(image);
    }
}
