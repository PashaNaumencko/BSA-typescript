import View from './view';

class FighterView extends View {
  constructor(fighter, handleClick, handleCheckBoxClick) {
    super();
    this.selected = false;
    this.fighter = fighter;

    this.createFighter(fighter, handleClick, handleCheckBoxClick);
    
  }

  createFighter(fighter, handleClick, handleCheckBoxClick) {
    const { name, source } = fighter;
    const nameElement = this.createName(name);
    const imageElement = this.createImage(source);
    const checkBoxElement = this.createCheckBox(name, fighter, handleCheckBoxClick);

    this.element = this.createElement({ tagName: 'div', className: 'fighter' });
    this.element.append(imageElement, nameElement, checkBoxElement);
    this.element.addEventListener('click', event => handleClick(event, fighter), false);
  }

  createName(name) {
    const nameElement = this.createElement({ tagName: 'span', className: 'name' });
    nameElement.innerText = name;

    return nameElement;
  }

  createImage(source) {
    const attributes = { src: source };
    const imgElement = this.createElement({
      tagName: 'img',
      className: 'fighter-image',
      attributes
    });

    return imgElement;
  }

  createCheckBox(name, fighter, handleCheckBoxClick) {
    const attributes = { type: 'checkbox', id: `${name}`, name: `${name}` };
    const checkBoxElement = this.createElement({ 
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

export default FighterView;