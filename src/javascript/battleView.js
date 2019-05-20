import View from './view';
import Fighter from './Fighter';

class BattleView extends View {
    constructor(fighters) {
      super();
      
      this.createBattle(fighters);
    }

    createBattle(fighters) {
        this.element = this.createElement({ tagName: 'div', className: 'battle-container' });
        const startBattleButtonElement = this.createStartBattleButton('Start Fight', event => Fighter.fight(...fighters))
        const battleElement = this.createElement({ tagName: 'div', className: 'battle' });
        const fighterElements = fighters.map(fighter => fighter.element);
        battleElement.append(...fighterElements);
        this.element.append(startBattleButtonElement, battleElement)
        
    }

    createStartBattleButton(buttonText, handleClick) {
        const attributes = { type: 'button', id: 'battleButton'};
        const startBattleButtonElement = this.createElement({ 
            tagName: 'button', 
            className: 'battle-button',
            attributes
        });
        startBattleButtonElement.innerText = buttonText;
        startBattleButtonElement.addEventListener('click', event => handleClick(event));


        return startBattleButtonElement;
    }

    
}
export default BattleView;
