import View from './view';
import Fighter from './Fighter';
import App from './app';
import FightersView from './fightersView';
import { fighterService } from './services/fightersService';

class FightView extends View {
    constructor(fighters) {
      super();

      this.backHandleClick = this.backHandleClick.bind(this);
      this.createFight(fighters);
    }

    createFight(fighters) {
        this.element = this.createElement({ tagName: 'div', className: 'fight-container' });
        const startFightButtonElement = this.createStartFightButton('Start Fight', event => {
            alert("LET`S FIGHT BEGINS");
            Fighter.fight(...fighters);
        });
        const backButtonElement = this.createBackButton('Back', this.backHandleClick);
        const fightElement = this.createElement({ tagName: 'div', className: 'fight' });
        const fighterElements = fighters.map(fighter => fighter.element);
        fightElement.append(...fighterElements);
        this.element.append(startFightButtonElement, backButtonElement, fightElement);
    }

    async backHandleClick(event) {
        try {
            this.element.remove();
            const fighters = await fighterService.getFighters();
            const fightersView = new FightersView(fighters);
            const fightersElement = fightersView.element;      
            App.rootElement.append(fightersElement);
        }
        catch (error) {
            console.warn(error);
        } 
        
    }

    createStartFightButton(buttonText, handleClick) {
        const attributes = { type: 'button', id: 'battleButton'};
        const startFightButtonElement = this.createElement({ 
            tagName: 'button', 
            className: 'battle-button',
            attributes
        });
        startFightButtonElement.innerText = buttonText;
        startFightButtonElement.addEventListener('click', event => handleClick(event));


        return startFightButtonElement;
    }

    createBackButton(buttonText, handleClick) {
        const attributes = { type: 'button', id: 'battleButton'};
        const backButtonElement = this.createElement({ 
            tagName: 'button', 
            className: 'battle-button',
            attributes
        });
        backButtonElement.innerText = buttonText;
        backButtonElement.addEventListener('click', event => handleClick(event));

        return backButtonElement;
    }

    
}
export default FightView;
