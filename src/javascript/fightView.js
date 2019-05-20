import View from './view';
import Fighter from './Fighter';

class FightView extends View {
    constructor(fighters) {
      super();
      
      this.createFight(fighters);
    }

    createFight(fighters) {
        this.element = this.createElement({ tagName: 'div', className: 'fight-container' });
        const startFightButtonElement = this.createStartFightButton('Start Fight', event => Fighter.fight(...fighters))
        const fightElement = this.createElement({ tagName: 'div', className: 'fight' });
        const fighterElements = fighters.map(fighter => fighter.element);
        fightElement.append(...fighterElements);
        this.element.append(startFightButtonElement, fightElement)
        
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

    
}
export default FightView;
