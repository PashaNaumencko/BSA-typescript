import { View, IAttributes } from './view';
import Alert from './alertView';
import App from './app';

class Fighter extends View {
    private name : string;
    private source : string;
    private health : number;
    private attack : number;
    private defense : number;

    constructor(name : string, source : string, health : number, attack : number, defense : number) {
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

    createFighter() : void {
        const nameElement : HTMLSpanElement = this.createName(this.name);
        const imageElement : HTMLImageElement = this.createImage(this.source);
        const healthElement : HTMLSpanElement = this.createInfoSpan('health', this.health);
        const attackElement : HTMLSpanElement = this.createInfoSpan('attack', this.attack);
        const defenseElement : HTMLSpanElement = this.createInfoSpan('defense', this.defense);
    
        this.element = <HTMLDivElement>this.createElement({ tagName: 'div', className: 'fighter' });
        this.element.append(imageElement, nameElement, healthElement, attackElement, defenseElement);
    }

    createName(name : string) : HTMLSpanElement {
        const nameElement : HTMLSpanElement = <HTMLSpanElement>this.createElement({ tagName: 'span', className: 'name' });
        nameElement.innerText = name;
    
        return nameElement;
    }
    
    createImage(source : string) : HTMLImageElement {
        const attributes : IAttributes = { src: source };
        const imgElement : HTMLImageElement = <HTMLImageElement>this.createElement({
          tagName: 'img',
          className: 'fighter-image',
          attributes
        });
        return imgElement;
    }

    createInfoSpan(field : string, value : number) : HTMLSpanElement {
        const infoSpanElement : HTMLSpanElement = <HTMLSpanElement>this.createElement({ 
            tagName: 'span', 
            className: 'chars',
        });
        infoSpanElement.innerText = `${field}: ${value}`;
        return infoSpanElement;
    }


    getHitPower() : number {
        return this.attack * Fighter.criticalChance(1, 2);
    }

    getBlockPower() : number {
        return this.defense * Fighter.criticalChance(1, 2);
    }

    static criticalChance(min : number, max : number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static fight(firstFighter : Fighter, secondFighter : Fighter) : void {
        let fighterPromise : Promise<any> = new Promise((resolve, reject) => {
            let fightersHit = setInterval(() => {
                Fighter.simulateFirstFighterHit(firstFighter, secondFighter, fightersHit, resolve);
                Fighter.simulateSecondFighterHit(firstFighter, secondFighter, fightersHit, resolve); 
            }, 1500);   
        });
        fighterPromise.then(result => { 
            const alertElement : HTMLDivElement = <HTMLDivElement>new Alert(`WINNER IS: ${result}`).element;
            App.rootElement.append(alertElement);
        }).catch(error => console.warn(error));
    }

    static getFighterHealthElement(fighter) {
        return fighter.createInfoSpan('health', fighter.health);
    }

    static simulateFirstFighterHit(firstFighter, secondFighter, interval, resolve) {
        const firstFighterHealth = Fighter.getFighterHealthElement(firstFighter); 
        const oldFirstFighterHealth = firstFighter.element.childNodes[2];
        const secondFighterHealth = Fighter.getFighterHealthElement(secondFighter); 
        const oldSecondFighterHealth = secondFighter.element.childNodes[2];

        if(secondFighter.health <= 0) {
            clearInterval(interval); 
            secondFighter.health = 0; 
            oldSecondFighterHealth.replaceWith(secondFighterHealth);
            
            resolve(firstFighter.name);
        } 
        else if(firstFighter.health <= 0) {
            clearInterval(interval);
            firstFighter.health = 0;
            oldFirstFighterHealth.replaceWith(firstFighterHealth);
            
            resolve(secondFighter.name);
        }

        let hit = firstFighter.getHitPower() - secondFighter.getBlockPower();
        if (hit < 0) {
            hit = 0;
        }
        secondFighter.health -= hit;
        
        secondFighterHealth.classList.add('damage');
        oldSecondFighterHealth.replaceWith(secondFighterHealth);
    }

    static simulateSecondFighterHit(firstFighter, secondFighter, interval, resolve) {
        setTimeout(() => {
            const firstFighterHealth = Fighter.getFighterHealthElement(firstFighter); 
            const oldFirstFighterHealth = firstFighter.element.childNodes[2];
            const secondFighterHealth = Fighter.getFighterHealthElement(secondFighter); 
            const oldSecondFighterHealth = secondFighter.element.childNodes[2];

            if(firstFighter.health <= 0) {
                clearInterval(interval); 
                firstFighter.health = 0; 
                oldFirstFighterHealth.replaceWith(firstFighterHealth);
                 
                resolve(secondFighter.name);
            }
            else if(secondFighter.health <= 0) {
                clearInterval(interval); 
                secondFighter.health = 0;      
                oldSecondFighterHealth.replaceWith(secondFighterHealth);
                 
                resolve(firstFighter.name);
            }

            let hit = secondFighter.getHitPower() - firstFighter.getBlockPower();
            if (hit < 0) {
                hit = 0;
            }
            firstFighter.health -= hit;
            
            firstFighterHealth.classList.add('damage');
            oldFirstFighterHealth.replaceWith(firstFighterHealth);
        }, 500); 
    }
}
export default Fighter;
