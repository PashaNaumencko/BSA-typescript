import View from './view';
import Fighter from './Fighter';

class BattleView extends View {
    constructor(fighters) {
      super();
      
      this.createBattle(fighters);
    }

    createBattle(fighters) {
        this.element = this.createElement({ tagName: 'div', className: 'battle' });
        const fighterElements = fighters.map(fighter => fighter.element);
        this.element.append(...fighterElements);
        Fighter.fight(...fighters);
    }
}
export default BattleView;
