import { View, IAttributes } from './view';
import { IFighter } from './services/fightersService';

type FighterClickHandler = (event : Event, fighter : IFighter) => Promise<void> | void;

interface IFighterView {
  selected : boolean;
  fighter : IFighter;
  createFighter(fighter : IFighter, handleClick : FighterClickHandler, handleCheckBoxClick : FighterClickHandler) : void;
}

class FighterView extends View implements IFighterView {
  public selected : boolean = false;
  public fighter : IFighter;

  constructor(fighter : IFighter, handleClick : FighterClickHandler, handleCheckBoxClick : FighterClickHandler) {
    super();
    this.fighter = fighter;

    this.createFighter(fighter, handleClick, handleCheckBoxClick);
    
  }

  createFighter(fighter : IFighter, handleClick : FighterClickHandler, handleCheckBoxClick : FighterClickHandler) : void {
    const { name, source } = fighter;
    const nameElement : HTMLSpanElement = this.createName(name);
    const imageElement : HTMLImageElement = this.createImage(source);
    const checkBoxElement : HTMLInputElement = this.createCheckBox(name, fighter, handleCheckBoxClick);

    this.element = <HTMLDivElement>this.createElement({ tagName: 'div', className: 'fighter' });
    this.element.append(imageElement, nameElement, checkBoxElement);
    this.element.addEventListener('click', event => handleClick(event, fighter), false);
  }

  createName(name : string) : HTMLSpanElement {
    const nameElement : HTMLSpanElement = <HTMLSpanElement>this.createElement({ tagName: 'span', className: 'name' });
    nameElement.innerText = name;

    return nameElement;
  }

  createImage(source : string) : HTMLImageElement {
    const attributes : IAttributes = { src: source };
    const imgElement : HTMLImageElement = <HTMLImageElement>this.createElement({
      tagName: 'img',
      className: 'fighter-image',
      attributes
    });

    return imgElement;
  }

  createCheckBox(name : string, fighter : IFighter, handleCheckBoxClick : FighterClickHandler) : HTMLInputElement {
    const attributes : IAttributes = { type: 'checkbox', id: `${name}`, name: `${name}` };
    const checkBoxElement : HTMLInputElement = <HTMLInputElement>this.createElement({ 
        tagName: 'input', 
        className: 'checkbox',
        attributes
    });
    checkBoxElement.addEventListener('click', event => {
      this.selected = !this.selected;
      handleCheckBoxClick(event, fighter);
    });
    return checkBoxElement;
  }
}

export { FighterView, FighterClickHandler };