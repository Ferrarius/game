/// <reference path="GameObject.ts"/>

class Player extends GameObject {

    constructor(name:string, x:number, y:number, color:string, upKey:string, leftKey:string, downKey:string, rightKey:string) {
        super(name, color, 100, 100, x, y);
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
}