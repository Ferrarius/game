class EndScreen {

    constructor(winner:Player) {
        let h1 = document.createElement('h1');
        h1.innerText = winner.name+' heeft gewonnen!';
        document.body.appendChild(h1);
    }
}