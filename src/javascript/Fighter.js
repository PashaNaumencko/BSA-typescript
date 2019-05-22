import View from './view';
import Alert from './alert';
import App from './app';

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
        let fighterPromise = new Promise((resolve, reject) => {
            let fightersHit = setInterval(() => {
                Fighter.simulateFirstFighterHit(firstFighter, secondFighter, fightersHit, resolve);
                Fighter.simulateSecondFighterHit(firstFighter, secondFighter, fightersHit, resolve); 
            }, 1500);   
        });
        fighterPromise.then(result => { 
            const alertElement = new Alert(`WINNER IS: ${result}`).element;
            App.rootElement.append(alertElement);
        }).catch(error => console.warn(error));
    }

    static getFighterHealthElement(fighter) {
        return fighter.createInfoSpan('health', fighter.health);
    }

    static simulateFirstFighterHit(firstFighter, secondFighter, interval, resolve) {
        const firstFighterHealth = Fighter.getFighterHealthElement(firstFighter); 
        const secondFighterHealth = Fighter.getFighterHealthElement(secondFighter);
        if(secondFighter.health <= 0) {
            clearInterval(interval);  
            secondFighter.health = 0;
            secondFighter.element.childNodes[2].replaceWith(Fighter.getFighterHealthElement(secondFighter));  
            firstFighterHealth.classList.remove('damage');
            secondFighterHealth.classList.remove('damage');         
            resolve(firstFighter.name);
        } 
        else if(firstFighter.health <= 0) {
            clearInterval(interval);
            firstFighter.health = 0;
            firstFighter.element.childNodes[2].replaceWith(Fighter.getFighterHealthElement(firstFighter));
            firstFighterHealth.classList.remove('damage');
            secondFighterHealth.classList.remove('damage');
            resolve(secondFighter.name);
        }

        let hit = firstFighter.getHitPower() - firstFighter.getBlockPower();
        if (hit < 0) {
            hit = 0;
        }
        secondFighter.health -= hit;
        
        secondFighterHealth.classList.add('damage');
        secondFighter.element.childNodes[2].replaceWith(secondFighterHealth);
    }

    static simulateSecondFighterHit(firstFighter, secondFighter, interval, resolve) {
        setTimeout(() => {
            const firstFighterHealth = Fighter.getFighterHealthElement(firstFighter); 
            const secondFighterHealth = Fighter.getFighterHealthElement(secondFighter); 
            if(firstFighter.health <= 0) {
                clearInterval(interval);  
                firstFighter.health = 0;
                firstFighter.element.childNodes[2].replaceWith(Fighter.getFighterHealthElement(firstFighter)); 
                firstFighterHealth.classList.remove('damage');
                secondFighterHealth.classList.remove('damage');
                resolve(secondFighter.name);
            }
            else if(secondFighter.health <= 0) {
                clearInterval(interval); 
                secondFighter.health = 0;
                secondFighter.element.childNodes[2].replaceWith(Fighter.getFighterHealthElement(secondFighter));     
                firstFighterHealth.classList.remove('damage');
                secondFighterHealth.classList.remove('damage');
                resolve(firstFighter.name);
            }

            let hit = secondFighter.getHitPower() - secondFighter.getBlockPower();
            if (hit < 0) {
                hit = 0;
            }
            firstFighter.health -= hit;
            
            firstFighterHealth.classList.add('damage');
            firstFighter.element.childNodes[2].replaceWith(firstFighterHealth);
        }, 500); 
    }
}
export default Fighter;
