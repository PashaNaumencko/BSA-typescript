import View from './view';
import FighterView from './fighterView';
import { fighterService } from './services/fightersService';
import modalView from './modalView';
import BattleView from './battleView';
import App from './app';
import Fighter from './Fighter';


class FightersView extends View {
  constructor(fighters) {
    super();
    
    this.handleClick = this.handleFighterClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createFighters(fighters);
  }

  fightersDetailsMap = new Map();
  fighterViews = [];

  createFighters(fighters) {

    const fighterElements = fighters.map(fighter => {
      const fighterView = new FighterView(fighter, this.handleClick);
      this.fighterViews.push(fighterView);
      return fighterView.element;
    });

    this.element = this.createElement({ tagName: 'div', className: 'fighters' });
    this.element.append(...fighterElements);
  }


  selectFighters() {
    this.fighterViews = this.fighterViews.filter(fighter => fighter.selected).map(selectedFighter => {
      const selectedFighterId = selectedFighter.fighter._id;
      console.log(selectedFighter);
      const currentSelectedFighter = this.fightersDetailsMap.get(selectedFighterId);
      console.log(currentSelectedFighter);
      const {name, source, health, attack, defense} = currentSelectedFighter;
      return new Fighter(name, source, health, attack, defense);
    });
    console.log(this.fighterViews);
  }

  createModal(fighterDetails) {
    this.modal = new modalView(fighterDetails, this.handleSubmit);
    const modalElement = this.modal.element;
    this.element.appendChild(modalElement);
  }

  handleSubmit(event, id) {
    event.preventDefault();
    const currentFighter = this.fightersDetailsMap.get(id);
    const currentValues = [...this.modal.formElement.elements].slice(0, -1);
    currentValues.forEach(field => {
      currentFighter[field.name] = field.value;
    });
    this.fightersDetailsMap.set(id, currentFighter);
  }

  async handleFighterClick(event, fighter) {
    console.log('clicked');
    // get from map or load info and add to fightersMap
    // show modal with fighter info
    // allow to edit health and power in this modal
    if (this.fightersDetailsMap.has(fighter._id)) {
      const fighterDetails = this.fightersDetailsMap.get(fighter._id);
      this.createModal(fighterDetails);
      
    }
    else {
      const fighterDetails = await fighterService.getFighterDetails(fighter._id);
      this.fightersDetailsMap.set(fighter._id, fighterDetails);
      this.createModal(fighterDetails);
    }
  }

  createBattleButton(buttonText) {
    const attributes = { type: 'button', id: 'battleButton'};
    const battleButtonElement = this.createElement({ 
        tagName: 'button', 
        className: 'battle-button',
        attributes
    });
    battleButtonElement.innerText = buttonText;
    battleButtonElement.addEventListener('click', event => {
      this.selectFighters();
      if(this.fighterViews.length !== 2) {
        alert("Please select two fighers");
      }
      else {
        this.element.remove();
        const battleView = new BattleView(this.fighterViews);
        const battleElement = battleView.element;
        App.rootElement.append(battleElement);
      }
    });
    return battleButtonElement;
  }
}

export default FightersView;