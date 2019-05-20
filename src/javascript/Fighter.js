import View from './view';

class Fighter extends View {
    constructor(name, source, health, attack, defense) {
        super();

        this.name = name;
        this.source = source;
        this.health = health;
        this.attack = attack;
        this.defense = defense;

        this.getHitPower = this.getHitPower.bind(this);
        this.getBlockPower = this.getBlockPower.bind(this);

        this.createFighter();
    }

    createFighter() {
        const nameElement = this.createName(this.name);
        const imageElement = this.createImage(this.source);
        const healthElement = this.createInfoSpan('health', this.health);
        const attackElement = this.createInfoSpan('attack', this.attack);
        const defenseElement = this.createInfoSpan('defense', this.defense);
    
        this.element = this.createElement({ tagName: 'div', className: 'fighter' });
        this.element.append(imageElement, nameElement, healthElement, attackElement, defenseElement);
    }

    createName(name) {
        const nameElement = this.createElement({ tagName: 'span', className: 'name' });
        nameElement.innerText = name;
    
        return nameElement;
    }
    
    createImage(source) {
        const attributes = { src: source };
        const imgElement = this.createElement({
          tagName: 'img',
          className: 'fighter-image',
          attributes
        });
        return imgElement;
    }

    createInfoSpan(field, value) {
        const infoSpanElement = this.createElement({ 
            tagName: 'span', 
            className: 'chars',
        });
        infoSpanElement.innerText = `${field}: ${value}`;
        return infoSpanElement;
    }

    getHitPower() {
        return this.attack * Fighter.criticalChance(1, 2);
    }

    getBlockPower() {
        return this.defense * Fighter.criticalChance(1, 2);
    }

    static criticalChance(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static fight(firstFighter, secondFighter) {

        let firstFighterPromise = new Promise((resolve, reject) => {
            let firstFighterHit = setInterval(() => {
                console.log('first hit second', secondFighter.health);
                secondFighter.health -= (firstFighter.getHitPower() - firstFighter.getBlockPower());
                if(secondFighter.health <= 0) {
                    clearInterval(firstFighterHit);
                    resolve(firstFighter.name);
                }
            }, 3000);   

            setTimeout(() => {
                let secondFighterHit = setInterval(() => {
                    console.log('second hit first', firstFighter.health);
                    firstFighter.health -= (secondFighter.getHitPower() - secondFighter.getBlockPower());
                    if(firstFighter.health <= 0) {
                        clearInterval(secondFighterHit);
                        resolve(secondFighter.name);
                    }
                }, 3000);
            }, 1000); 
        });

        // let secondFighterPromise = new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         let secondFighterHit = setInterval(() => {
        //             console.log('first', firstFighter.health);
        //             firstFighter.health -= (secondFighter.getHitPower() - secondFighter.getBlockPower());
        //             if(firstFighter.health <= 0) {
        //                 resolve(secondFighterHit);
        //             }
        //         }, 3000);
        //     }, 1000);   
        // });

        firstFighterPromise.then(result => { 
            alert(`Winner is: ${result}`);
            
         }, error => console.error("Rejected: " + error.message));
        // secondFighterPromise.then(result => clearInterval(result), error => console.error("Rejected: " + error.message));
    }
}
export default Fighter;