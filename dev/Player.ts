/// <reference path="GameObject.ts"/>

class Player extends GameObject {

    public score:number = 0;

    constructor(name:string, x:number, y:number, color:string, upKey:string, leftKey:string, downKey:string, rightKey:string) {
        super(name, color, 100, 100, x, y);

        this.element.innerText = this.score.toString();
        this.element.style.fontSize = '50px';
        this.element.style.textAlign = 'center';

        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e, upKey, leftKey, downKey, rightKey));
    }

    private onKeyDown(event:KeyboardEvent, upKey:string, leftKey:string, downKey:string, rightKey:string):void {
        switch(event.key){
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
    }

    public addScore() {
        this.score+=1;
        this.element.innerText = (this.score).toString();
    }
}