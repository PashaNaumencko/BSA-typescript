import { View } from './view';
import App from './app';
import AlertView from './alertView';
import FighterInFightView from './fighterInFightView';

type Resolve = (name : string) => void;

interface IFight {
    fight(firstFighter : FighterInFightView, secondFighter : FighterInFightView) : void;
}

class Fight extends View implements IFight {
    private firstFighter : FighterInFightView;
    private secondFighter : FighterInFightView;

    constructor(firstFighter : FighterInFightView, secondFighter : FighterInFightView) {
        super();

        this.firstFighter = firstFighter;
        this.secondFighter = secondFighter;

        this.fight(this.firstFighter, this.secondFighter);
    }

    public fight(firstFighter : FighterInFightView, secondFighter : FighterInFightView) : void {
        let fighterPromise : Promise<any> = new Promise((resolve, reject) => {
            let fightersHit = setInterval(() => {
                Fight.simulateFirstFighterHit(firstFighter, secondFighter, fightersHit, resolve);
                Fight.simulateSecondFighterHit(firstFighter, secondFighter, fightersHit, resolve); 
            }, 1500);   
        });
        fighterPromise.then(result => { 
            const alertElement : HTMLDivElement = <HTMLDivElement>new AlertView(`WINNER IS: ${result}`).element;
            App.rootElement.append(alertElement);
        }).catch(error => console.warn(error));
    }

    public static getFighterHealthElement(fighter : FighterInFightView) : HTMLSpanElement {
        return fighter.createInfoSpan('health', fighter.health);
    }

    public static simulateFirstFighterHit(firstFighter : FighterInFightView, secondFighter : FighterInFightView, interval : NodeJS.Timeout, resolve : Resolve) : void {
        const firstFighterHealth : HTMLSpanElement = Fight.getFighterHealthElement(firstFighter); 
        const oldFirstFighterHealth : HTMLSpanElement = <HTMLSpanElement>firstFighter.element.childNodes[2];
        const secondFighterHealth : HTMLSpanElement = Fight.getFighterHealthElement(secondFighter); 
        const oldSecondFighterHealth : HTMLSpanElement = <HTMLSpanElement>secondFighter.element.childNodes[2];

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

        let hit : number = firstFighter.getHitPower() - secondFighter.getBlockPower();
        if (hit < 0) {
            hit = 0;
        }
        secondFighter.health -= hit;
        
        secondFighterHealth.classList.add('damage');
        oldSecondFighterHealth.replaceWith(secondFighterHealth);
    }

    public static simulateSecondFighterHit(firstFighter : FighterInFightView, secondFighter : FighterInFightView, interval : NodeJS.Timeout, resolve : Resolve) : void {
        setTimeout(() => {
            const firstFighterHealth : HTMLSpanElement = Fight.getFighterHealthElement(firstFighter); 
            const oldFirstFighterHealth : HTMLSpanElement = <HTMLSpanElement>firstFighter.element.childNodes[2];
            const secondFighterHealth : HTMLSpanElement = Fight.getFighterHealthElement(secondFighter); 
            const oldSecondFighterHealth : HTMLSpanElement = <HTMLSpanElement>secondFighter.element.childNodes[2];

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

            let hit : number = secondFighter.getHitPower() - firstFighter.getBlockPower();
            if (hit < 0) {
                hit = 0;
            }
            firstFighter.health -= hit;
            
            firstFighterHealth.classList.add('damage');
            oldFirstFighterHealth.replaceWith(firstFighterHealth);
        }, 500); 
    }
}
export default Fight;
