import { View, IAttributes, Handler } from './view';
import Fighter from './Fighter';
import App from './app';
import AlertView from './alertView';

// interface IFighters {
//     id: string;
//     name: string;
//     src: string;
// }

class FightView extends View {
    constructor(fighters : Fighter) {
      super();

      this.backHandleClick = this.backHandleClick.bind(this);
      this.createFight(fighters);
    }

    createFight(fighters) {
        this.element = <HTMLDivElement>this.createElement({ tagName: 'div', className: 'fight-container' });
        const startFightButtonElement = this.createStartFightButton('Start Fight', event => {
            const alertElement : HTMLDivElement = <HTMLDivElement>new AlertView('LET THE FIGHT BEGINS').element;
            this.element.parentNode.append(alertElement);
            Fighter.fight(...fighters);
        });
        const backButtonElement = this.createBackButton('Back', this.backHandleClick);
        const fightElement = this.createElement({ tagName: 'div', className: 'fight' });
        const fighterElements = fighters.map(fighter => fighter.element);
        fightElement.append(...fighterElements);
        this.element.append(startFightButtonElement, backButtonElement, fightElement);
    }

    backHandleClick(event : Event) {
        this.element.remove();
        new App();
    }

    createStartFightButton(buttonText : string, handleClick : Handler) : HTMLButtonElement {
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

    createBackButton(buttonText : string, handleClick : Handler) : HTMLButtonElement {
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
