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
        this.element.style.height = this.height.toString()+'px';
        this.element.style.width = this.width.toString()+'px';
        this.element.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
        document.body.appendChild(this.element);
    }

    public getPosition() {
        return this.element.getBoundingClientRect()
    }

    public update() : void {
        this.element.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
        this.element.style.width = this.width.toString()+'px';
        this.element.style.height = this.height.toString()+'px';
    }
}