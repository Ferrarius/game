# Game
## Checklist
- [x] De code van het individuele project staat op GitHub.
- [x] De game is online speelbaar.
- [x] De game bevat minimaal één van de onderstaande extra uitdagingen.
- [x] De game heeft een startscherm en een eindscherm.
- [x] Er zijn geen bugs.
- [x] Het project maakt gebruik van deze OOP principes.
    - [x] Classes
    - [x] Encapsulation
    - [x] Composition
    - [x] Inheritance
- [x] De GitHub pagina bevat een ReadMe bestand. Dit bestand bevat:
    - [x] Per bovengenoemd OOP principe een uitleg: waar is het toegepast, en waarom is het
        op die plek toegepast. De uitleg is inclusief code voorbeelden.
    - [x] Een klassendiagram van de game.
    - [x] Een link naar de peer review die in week 6 is gedaan
## Extra opdrachten
- [ ] De game ziet er zeer verzorgd uit dankzij goed uitgewerkt UI design en artwork.
- [ ] De game bevat een hiscore lijst. Scores worden bewaard nadat de game is afgesloten.
- [ ] De game werkt met Canvas in plaats van DOM elementen
- [x] De game bevat local of online multiplayer.
- [ ] De game werkt op mobiele schermen en ondersteunt touchscreen controls.
- [ ] De game maakt gebruik van device api's zoals de camera, microfoon, gyroscoop of GPS.
- [ ] De game gebruikt een externe library uit de lijst in deze modulewijzer.
## Toelichting
### Classes
Om de game zo dynamisch en overzichtelijk mogelijk te maken gebruik ik classes om verschillende code van verschillende onderdelen in een bepaalde class te zetten. Ook maak ik hier gebruik van properties en methods en roep ik deze later op.
Voorbeeld van een class:
```
    class GameObject {

        protected element:HTMLElement;
        protected height:number;
        protected width: number;
        protected x:number;
        protected y:number;

        constructor(e:string, color:string, height:number, width:number, x:number, y:number) {
            this.x = x;
            this.y = y;

            this.element = document.createElement(e);
            this.element.style.backgroundColor = color;
            this.height = height;
            this.width = width;
            this.element.style.display = 'inline-block';
            this.element.style.position = 'absolute';
        }

        public getPosition() {
            return this.element.getBoundingClientRect()
        }

        public update() : void {
            this.element.style.height = this.height.toString()+'px';
            this.element.style.width = this.width.toString()+'px';
            this.element.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
            document.body.appendChild(this.element);
        }
    }
```
### Encapsulation
Om sommige onderdelen in de code prive te houden voor andere classes gebruik ik encapsulation. Encapsulation is mogelijk door de volgende soorten:
- Public (Deze onderdelen zijn overal te bereiken)
De onderstaande methode in de player class is public gemaakt omdat deze bijvoorbeeld in de game class opgeroepen moet kunnen worden.
```
    public addScore() {
        this.score+=1;
        this.element.innerText = (this.score).toString();
    }
```
- Protected (Deze onderdelen zijn te bereiken voor de class zelf en alle ervende classes)
De volgende properties van de GameObject class zijn protected, omdat je ze alleen in erfende classes wilt gebruiken.
```
    protected element:HTMLElement;
    protected height:number;
    protected width: number;
    protected x:number;
    protected y:number;
```
- Private (Deze onderdelen zijn alleen te bereiken in de class zelf)
De volgende methode in de player class is private gemaakt omdat deze alleen in de player class zelf moet kunnen worden gebruikt.
```
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
```
### Composition
Om andere classes in een andere class te gebruiken, gebruik ik composition. Ik kan zo in 1 class een instantie van een andere class aanmaken. Zoals je ziet in onderstaand voorbeeld, maak ik in de game class gebruik van composition omdat er in de game class instanties van de andere classes aangemaakt moeten worden.
```
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
                this.player1.addScore();
                this.enemy.reset();
            }

            if(Game.checkCollision(this.player2.getPosition(), this.enemy.getPosition())) {
                this.player2.addScore();
                this.enemy.reset();
            }

            requestAnimationFrame(() => this.gameLoop())
        }

        static checkCollision(player:ClientRect, enemy:ClientRect) {
            return (player.left <= enemy.right && enemy.left <= player.right && player.top <= enemy.bottom && enemy.top <= player.bottom);
        }
    }
```
### Inheritance
Als verschillende classes dezelfde code moeten kunnen gebruiken en om geen dubbele code te krijgen gebruik ik inheritance, dit gebeurt door middel van het extenden van een class waar code in staat die in elke class gebruikt moet worden. Dit kan je zien in onderstaand voorbeeld, hier extend de enemy class het gameobject class.
```
    /// <reference path="GameObject.ts"/>

    class Enemy extends GameObject {

        constructor() {
            let width = 50;
            let height = 50;

            super('enemy', 'black', width, height, Math.floor((Math.random() * (window.innerWidth-width)) + 1),     Math.floor((Math.random() * (window.innerHeight-height)) + 1));

            setInterval(() => this.moveRandom(), 100);
        }

        private moveRandom() {
            let randomNumber = Math.floor(Math.random() * 4);

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

            for(let i=0; i<50; i++) {
                console.log(this.x, this.y);
                if (this.y-i === window.innerHeight || this.x-i === window.innerWidth || this.y+i === window.innerHeight || this.x+i === window.innerWidth || this.y+i === 0 || this.x+i === 0 || this.y-i === 0 || this.x-i === 0) {
                    this.reset();
                }
            }
        }

        public reset() {
            this.x = Math.floor((Math.random() * (window.innerWidth-this.width)) + 1);
            this.y = Math.floor((Math.random() * (window.innerHeight-this.height)) + 1)
        }
    }
```
## Classdiagram
![Classdiagram](https://github.com/Ferrarius/game/Class Diagram for ATM.png)
