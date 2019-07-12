import { View, IAttributes, Handler } from './view';
import FighterView from './fighterView';
import { FighterService, IFighters, IFighterDetails } from './services/fightersService';
import { modalView } from './modalView';
import FightView from './fightView';
import App from './app';
import Fighter from './Fighter';
import Alert from './alertView';
import AlertView from './alertView';


class FightersView extends View {
  private fightersDetailsMap : Map<string, IFighterDetails> = new Map();
  private fighterViews : Fighter[] = [];
  private selectedFighters : Fighter[] = [];
  private modal : modalView;

  constructor(fighters : IFighters) {
    super();
    
    this.handleFighterClick = this.handleFighterClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this);
    this.handleFightButtonClick = this.handleFightButtonClick.bind(this);
    this.createFighters(fighters);
  }

  createFighters(fighters : IFighters) {

    const fightButtonElement = this.createFightButton('Create Fight', this.handleFightButtonClick);

    const fightersElement = fighters.map((fighter : { id: string, name: string, src: string }) => {
      const fighterView = new FighterView(fighter, this.handleClick, this.handleCheckBoxClick);
      this.fighterViews.push(fighterView);
      return fighterView.element;
    }) ;

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
      if (error.type == TypeError) {
        const alertElement = new Alert('Something happened unexpectedly :(. Please repeat your action', true).element;
        this.element.parentNode.append(alertElement);
        console.warn(error);
      } 
    } 

  }

  createModal(fighterDetails : IFighterDetails) : void {
    this.modal = new modalView(fighterDetails, this.handleSubmit);
    const modalElement : HTMLDivElement = <HTMLDivElement>this.modal.element;
    this.element.appendChild(modalElement);
  }

  handleSubmit(event : Event, id : string) : void {
    event.preventDefault();
    const currentFighter : IFighterDetails = this.fightersDetailsMap.get(id);
    const currentValues : HTMLInputElement[] = <HTMLInputElement[]>[...this.modal.formElement.elements].slice(0, -1);
    currentValues.forEach((field : HTMLInputElement) => {
      currentFighter[field.name] = field.value;
    });
    const alertElement : HTMLDivElement = <HTMLDivElement>new Alert("Chars have sucessfully saved").element;
    this.element.parentNode.append(alertElement);
    this.fightersDetailsMap.set(id, currentFighter);
  }

  async handleFighterClick(event : Event, fighter : IFighterDetails) : Promise<void> {
    try {
      if (this.fightersDetailsMap.has(fighter._id)) {
        const fighterDetails : IFighterDetails = this.fightersDetailsMap.get(fighter._id);
        this.createModal(fighterDetails);
        
      }
      else {
        const fighterDetails : IFighterDetails = await FighterService.getFighterDetails(fighter._id);
        this.fightersDetailsMap.set(fighter._id, fighterDetails);
        this.createModal(fighterDetails);
      }
    }
    catch (error) {
      const alertElement : HTMLDivElement = <HTMLDivElement>new Alert('Something happened unexpectedly :(. Please repeat your action', true).element;
      this.element.parentNode.append(alertElement);
      console.warn(error);
    } 
  }

  async handleCheckBoxClick(event : Event, fighter : IFighterDetails) : Promise<void> {
    try {
      event.stopPropagation();
      if (!this.fightersDetailsMap.has(fighter._id)) {
        const fighterDetails : IFighterDetails = await FighterService.getFighterDetails(fighter._id);
        this.fightersDetailsMap.set(fighter._id, fighterDetails);  
      }
    }
    catch (error) {
      const alertElement : HTMLDivElement = <HTMLDivElement>new Alert('Something happened unexpectedly :(. Please repeat your action', true).element;
      this.element.parentNode.append(alertElement);
      console.warn(error);
    } 
  }

  handleFightButtonClick(event : Event) : void { 
    this.selectFighters();
    if(this.selectedFighters.length !== 2) {
      const alertElement : HTMLDivElement = <HTMLDivElement>new AlertView('Please select two fighers', true).element;
      this.element.parentNode.append(alertElement);
    }
    else {
      this.element.remove();
      const fightView : FightView = new FightView(this.selectedFighters);
      const fightElement : HTMLDivElement = <HTMLDivElement>fightView.element;
      this.element.childNodes[0].remove();
      App.rootElement.append(fightElement);
    }
  }

  createFightButton(buttonText : string, handleFightButtonClick : Handler) : HTMLButtonElement {
    const attributes : IAttributes = { type: 'button', id: 'battleButton'};
    const fightButtonElement : HTMLButtonElement = <HTMLButtonElement>this.createElement({ 
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