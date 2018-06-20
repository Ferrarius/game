/// <reference path="GameObject.ts"/>

class Enemy extends GameObject {

    constructor() {
        let width = 50;
        let height = 50;

        super('enemy', 'black', width, height, Math.floor((Math.random() * (window.innerWidth-width)) + 1), Math.floor((Math.random() * (window.innerHeight-height)) + 1));

        setInterval(() => this.moveRandom(), 10);
    }

    private moveRandom() {
        let randomNumber = Math.floor(Math.random() * 4);

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

        for(let i=0; i<5; i++) {
            if (this.y-i === window.innerHeight || this.x-i === window.innerWidth || this.y+i === window.innerHeight || this.x+i === window.innerWidth) {
                this.reset();
            }
        }
    }

    private reset() {
        this.x = Math.floor((Math.random() * (window.innerWidth-this.width)) + 1);
        this.y = Math.floor((Math.random() * (window.innerHeight-this.height)) + 1)
    }
}