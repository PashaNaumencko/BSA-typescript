import View from './view';
import FighterView from './fighterView';
import { fighterService } from './services/fightersService';
import modalView from './modalView';

class FightersView extends View {
  constructor(fighters) {
    super();
    
    this.handleClick = this.handleFighterClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createFighters(fighters);
  }

  fightersDetailsMap = new Map();

  createFighters(fighters) {
    const fighterElements = fighters.map(fighter => {
      const fighterView = new FighterView(fighter, this.handleClick);
      return fighterView.element;
    });

    this.element = this.createElement({ tagName: 'div', className: 'fighters' });
    this.element.append(...fighterElements);
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
    console.log('before', currentFighter);
    currentValues.forEach(field => {
      console.log(field.value);
      currentFighter[field.name] = field.value;
    });
    console.log('after', currentFighter);
    this.fightersDetailsMap.set(id, currentFighter);
    console.log('after', this.fightersDetailsMap);
  }

  async handleFighterClick(event, fighter) {
    console.log('clicked');
    // get from map or load info and add to fightersMap
    // show modal with fighter info
    // allow to edit health and power in this modal
    if (this.fightersDetailsMap.has(fighter._id)) {
      console.log('have been');
      console.log(this.fightersDetailsMap);
      const fighterDetails = this.fightersDetailsMap.get(fighter._id);
      this.createModal(fighterDetails);
      
    }
    else {
      console.log('not yet');
      console.log(this.fightersDetailsMap);
      const fighterDetails = await fighterService.getFighterDetails(fighter._id);
      this.fightersDetailsMap.set(fighter._id, fighterDetails);
      this.createModal(fighterDetails);
    }
    
  }



}

export default FightersView;