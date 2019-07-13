import { View, IAttributes, Handler } from './view';
import App from './app';
import AlertView from './alertView';
import FighterInFightView from './fighterInFightView';
import Fight from './fight';

interface IFightView {
    createFight(fighters : FighterInFightView[]) : void;
}

class FightView extends View implements IFightView {
    constructor(fighters : FighterInFightView[]) {
      super();

      this.backHandleClick = this.backHandleClick.bind(this);
      this.createFight(fighters);
    }

    public createFight(fighters : FighterInFightView[]) : void {
        this.element = <HTMLDivElement>this.createElement({ tagName: 'div', className: 'fight-container' });
        const startFightButtonElement : HTMLButtonElement = this.createStartFightButton('Start Fight', event => {
            const alertElement : HTMLDivElement = <HTMLDivElement>new AlertView('LET THE FIGHT BEGINS').element;
            this.element.parentNode.append(alertElement);
            
            new Fight(fighters[0], fighters[1]);
        });
        const backButtonElement : HTMLButtonElement = this.createBackButton('Back', this.backHandleClick);
        const fightElement : HTMLDivElement = <HTMLDivElement>this.createElement({ tagName: 'div', className: 'fight' });
        const fighterElements : HTMLElement[] = fighters.map(fighter => fighter.element);
        fightElement.append(...fighterElements);
        this.element.append(startFightButtonElement, backButtonElement, fightElement);
    }

    public backHandleClick(event : Event) : void {
        this.element.remove();
        new App();
    }

    public createStartFightButton(buttonText : string, handleClick : Handler) : HTMLButtonElement {
        const attributes : IAttributes = { type: 'button', id: 'battleButton'};
        const startFightButtonElement : HTMLButtonElement = <HTMLButtonElement>this.createElement({ 
            tagName: 'button', 
            className: 'btn',
            attributes
        });
        startFightButtonElement.innerText = buttonText;
        startFightButtonElement.addEventListener('click', event => handleClick(event));


        return startFightButtonElement;
    }

    public createBackButton(buttonText : string, handleClick : Handler) : HTMLButtonElement {
        const attributes : IAttributes  = { type: 'button', id: 'battleButton'};
        const backButtonElement : HTMLButtonElement = <HTMLButtonElement>this.createElement({ 
            tagName: 'button', 
            className: 'btn',
            attributes
        });
        backButtonElement.innerText = buttonText;
        backButtonElement.addEventListener('click', event => handleClick(event));

        return backButtonElement;
    }
}
export default FightView;
