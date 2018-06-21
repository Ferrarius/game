/// <reference path="GameObject.ts"/>

class Player extends GameObject {

    public name:string;
    public score:number = 0;

    constructor(name:string, x:number, y:number, color:string, upKey:string, leftKey:string, downKey:string, rightKey:string) {
        super(name, color, 100, 100, x, y);

        this.name = name;
        this.element.innerText = this.score.toString();
        this.element.style.fontSize = '50px';
        this.element.style.textAlign = 'center';

        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e, upKey, leftKey, downKey, rightKey));
    }

    private onKeyDown(event:KeyboardEvent, upKey:string, leftKey:string, downKey:string, rightKey:string):void {
        switch(event.key) {
            case upKey:
                if(this.y !> 0) {
                    this.y -= 50;
                }
                break;
            case leftKey:
                if(this.x !> 0 ) {
                    this.x -= 50;
                }
                break;
            case downKey:
                if(this.y !< window.innerHeight-this.height-50) {
                    this.y += 50;
                }
                break;
            case rightKey:
                if(this.x !< window.innerWidth-this.width-50) {
                    this.x += 50;
                }
                break;
        }
    }

    public addScore() {
        this.score+=1;
        this.element.innerText = (this.score).toString();
    }
}