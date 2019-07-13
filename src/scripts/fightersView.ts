import { View, IAttributes, Handler } from './view';
import { FighterView } from './fighterView';
import { FighterService, IFighter, IFighterGameDetails } from './services/fightersService';
import { modalView } from './modalView';
import FightView from './fightView';
import App from './app';
import Alert from './alertView';
import AlertView from './alertView';
import FighterInFightView from './fighterInFightView';


interface IFightersView {
  createFighters(fighters : IFighter[]) : void;
}

class FightersView extends View implements IFightersView {
  private fightersDetailsMap : Map<string, IFighterGameDetails> = new Map();
  private fighterViews : FighterView[] = [];
  private selectedFighters : FighterInFightView[] = [];
  private modal : modalView;

  constructor(fighters : IFighter[]) {
    super();
    
    this.handleFighterClick = this.handleFighterClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this);
    this.handleFightButtonClick = this.handleFightButtonClick.bind(this);
    this.createFighters(fighters);
  }

  public createFighters(fighters : IFighter[]) : void {

    const fightButtonElement : HTMLButtonElement = this.createFightButton('Create Fight', this.handleFightButtonClick);

    const fightersElement = fighters.map((fighter) => {
      const fighterView : FighterView = new FighterView(fighter, this.handleFighterClick, this.handleCheckBoxClick);
      this.fighterViews.push(fighterView);
      return fighterView.element;
    }) ;

    const fightersContainerElement = <HTMLDivElement>this.createElement({ tagName: 'div', className: 'fighters' });
    fightersContainerElement.append(...fightersElement);
    this.element = <HTMLDivElement>this.createElement({ tagName: 'div', className: 'fighters-container' });
    this.element.append(fightButtonElement, fightersContainerElement);
  }


  public selectFighters() : void {
    try {
      this.selectedFighters = this.fighterViews.filter(fighter => fighter.selected).map(selectedFighter => {
        const selectedFighterId : string = selectedFighter.fighter._id;
        const currentSelectedFighter : IFighterGameDetails = this.fightersDetailsMap.get(selectedFighterId);
        const { name, source, health, attack, defense } = currentSelectedFighter;
        return new FighterInFightView(name, source, health, attack, defense);
      });
      
    }
    catch (error) {
      if (error.type == TypeError) {
        const alertElement : HTMLDivElement = <HTMLDivElement>new Alert('Something happened unexpectedly :(. Please repeat your action', true).element;
        this.element.parentNode.append(alertElement);
        console.warn(error);
      } 
    } 

  }

  public createModal(fighterDetails : IFighterGameDetails) : void {
    this.modal = new modalView(fighterDetails, this.handleSubmit);
    const modalElement : HTMLDivElement = <HTMLDivElement>this.modal.element;
    this.element.appendChild(modalElement);
  }

  public handleSubmit(event : Event, id : string) : void {
    event.preventDefault();
    const currentFighter : IFighterGameDetails = this.fightersDetailsMap.get(id);
    const currentValues : HTMLInputElement[] = <HTMLInputElement[]>[...this.modal.formElement.elements].slice(0, -1);
    currentValues.forEach((field : HTMLInputElement) => {
      currentFighter[field.name] = field.value;
    });
    const alertElement : HTMLDivElement = <HTMLDivElement>new Alert("Chars have sucessfully saved").element;
    this.element.parentNode.append(alertElement);
    this.fightersDetailsMap.set(id, currentFighter);
  }

  public async handleFighterClick(event : Event, fighter : IFighterGameDetails) : Promise<void> {
    try {
      if (this.fightersDetailsMap.has(fighter._id)) {
        const fighterDetails : IFighterGameDetails = this.fightersDetailsMap.get(fighter._id);
        this.createModal(fighterDetails);
        
      }
      else {
        const fighterDetails : IFighterGameDetails = await FighterService.getFighterDetails(fighter._id);
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

  public async handleCheckBoxClick(event : Event, fighter : IFighterGameDetails) : Promise<void> {
    try {
      event.stopPropagation();
      if (!this.fightersDetailsMap.has(fighter._id)) {
        const fighterDetails : IFighterGameDetails = await FighterService.getFighterDetails(fighter._id);
        this.fightersDetailsMap.set(fighter._id, fighterDetails);  
      }
    }
    catch (error) {
      const alertElement : HTMLDivElement = <HTMLDivElement>new Alert('Something happened unexpectedly :(. Please repeat your action', true).element;
      this.element.parentNode.append(alertElement);
      console.warn(error);
    } 
  }

  public handleFightButtonClick(event : Event) : void { 
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

  public createFightButton(buttonText : string, handleFightButtonClick : Handler) : HTMLButtonElement {
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