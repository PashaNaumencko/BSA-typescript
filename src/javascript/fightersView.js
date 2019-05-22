import View from './view';
import FighterView from './fighterView';
import { fighterService } from './services/fightersService';
import modalView from './modalView';
import FightView from './fightView';
import App from './app';
import Fighter from './Fighter';
import Alert from './alert';


class FightersView extends View {
  constructor(fighters) {
    super();
    
    this.handleClick = this.handleFighterClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this);
    this.handleFightButtonClick = this.handleFightButtonClick.bind(this);
    this.createFighters(fighters);
  }

  fightersDetailsMap = new Map();
  fighterViews = [];
  selectedFighters = [];

  createFighters(fighters) {

    const fightButtonElement = this.createFightButton('Create Fight', this.handleFightButtonClick);

    const fightersElement = fighters.map(fighter => {
      const fighterView = new FighterView(fighter, this.handleClick, this.handleCheckBoxClick);
      this.fighterViews.push(fighterView);
      return fighterView.element;
    });

    const fightersContainerElement = this.createElement({ tagName: 'div', className: 'fighters' });
    fightersContainerElement.append(...fightersElement);
    this.element = this.createElement({ tagName: 'div', className: 'fighters-container' });
    this.element.append(fightButtonElement, fightersContainerElement);
  }


  selectFighters() {
    try {
      this.selectedFighters = this.fighterViews.filter(fighter => fighter.selected).map(selectedFighter => {
        const selectedFighterId = selectedFighter.fighter._id;
        const currentSelectedFighter = this.fightersDetailsMap.get(selectedFighterId);
        const {name, source, health, attack, defense} = currentSelectedFighter;
        return new Fighter(name, source, health, attack, defense);
      });
    }
    catch (error) {
      const alertElement = new Alert('Something happened unexpectedly :(. Please repeat your action', true).element;
      this.element.parentNode.append(alertElement);
      console.warn(error);
    } 
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
    const alertElement = new Alert("Chars have sucessfully saved").element;
    this.element.parentNode.append(alertElement);
    this.fightersDetailsMap.set(id, currentFighter);
  }

  async handleFighterClick(event, fighter) {
    try {
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
    catch (error) {
      const alertElement = new Alert('Something happened unexpectedly :(. Please repeat your action', true).element;
      this.element.parentNode.append(alertElement);
      console.warn(error);
    } 
  }

  async handleCheckBoxClick(event, fighter) {
    try {
      event.stopPropagation();
      if (!this.fightersDetailsMap.has(fighter._id)) {
        const fighterDetails = await fighterService.getFighterDetails(fighter._id);
        this.fightersDetailsMap.set(fighter._id, fighterDetails);  
      }
    }
    catch (error) {
      const alertElement = new Alert('Something happened unexpectedly :(. Please repeat your action', true).element;
      this.element.parentNode.append(alertElement);
      console.warn(error);
    } 
  }

  handleFightButtonClick(event) {
    this.selectFighters();
    if(this.selectedFighters.length !== 2) {
      const alertElement = new Alert('Please select two fighers', true).element;
      this.element.parentNode.append(alertElement);
    }
    else {
      this.element.remove();
      const fightView = new FightView(this.selectedFighters);
      const fightElement = fightView.element;
      this.element.childNodes[0].remove();
      App.rootElement.append(fightElement);
    }
  }

  createFightButton(buttonText, handleFightButtonClick) {
    const attributes = { type: 'button', id: 'battleButton'};
    const fightButtonElement = this.createElement({ 
        tagName: 'button', 
        className: 'btn',
        attributes
    });
    fightButtonElement.innerText = buttonText;
    fightButtonElement.addEventListener('click', event => handleFightButtonClick(event));
    return fightButtonElement;
  }
}

export default FightersView;