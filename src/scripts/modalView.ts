import { View, IAttributes } from './view';
import { IFighterGameDetails } from './services/fightersService';

interface IFields {
  health: number;
  attack: number;
  defense: number;
}

interface IModalView {
  formElement : HTMLFormElement;
  createModal(fighterDetails : IFighterGameDetails, handleSubmit : SubmitHandler) : void;
}

type SubmitHandler = (event : Event, id: string) => void;

class modalView extends View implements IModalView {
  public formElement : HTMLFormElement;
  constructor(fighterDetails : IFighterGameDetails, handleSubmit : SubmitHandler) {
    super();
    this.createModal(fighterDetails, handleSubmit);
  }

  public createModal(fighterDetails : IFighterGameDetails, handleSubmit : SubmitHandler) : void {
    const modalContentElement : HTMLDivElement = this.createModalContent(fighterDetails, handleSubmit);

    this.element = <HTMLDivElement>this.createElement({ tagName: 'div', className: 'modal' });
    this.element.append(modalContentElement);
    this.element.addEventListener('click', event => {
        if (event.target === this.element) {
          this.element.parentNode.removeChild(this.element);
        }         
    }, false);
  }

  public createModalContent(fighterDetails : IFighterGameDetails, handleSubmit : (event : Event, id: string) => void) : HTMLDivElement {
    const modalContentElement : HTMLDivElement = <HTMLDivElement>this.createElement({ tagName: 'div', className: 'modal-content' });
    const modalHeaderElement : HTMLHeadingElement = this.createModalHeader(fighterDetails.name);
    const modalBodyElement : HTMLDivElement = this.createModalBody(fighterDetails, handleSubmit);
    const modalFooterElement : HTMLDivElement = this.createModalFooter();
    modalContentElement.append(modalHeaderElement, modalBodyElement, modalFooterElement);

    return modalContentElement;
  }

  public createModalHeader(fighterName) : HTMLDivElement {
    const modalHeaderElement : HTMLDivElement = <HTMLDivElement>this.createElement({ tagName: 'div', className: 'modal-header' });
    const headerElement : HTMLHeadingElement = this.createHeader(`${fighterName}`);
    const closeButtonElement : HTMLSpanElement = this.createCloseButton('&times;');
    modalHeaderElement.append(headerElement, closeButtonElement);

    return modalHeaderElement;
  }

  public createHeader(headerText : string) : HTMLHeadingElement {
    const headerElement : HTMLHeadingElement = <HTMLHeadingElement>this.createElement({ tagName: 'h2', className: 'header' });
    headerElement.innerText = headerText;
    return headerElement;
  }

  public createCloseButton(buttonText : string) : HTMLSpanElement {
    const closeButtonElement : HTMLSpanElement = <HTMLSpanElement>this.createElement({ tagName: 'span', className: 'close' });
    closeButtonElement.innerHTML = buttonText;
    closeButtonElement.addEventListener('click', event => this.element.remove(), false);
    return closeButtonElement;
  }


  public createModalBody(fighterDetails : IFighterGameDetails, handleSubmit : (event : Event, id: string) => void) : HTMLDivElement {
    const { health, attack, defense, source } = fighterDetails;
    const modalBodyElement : HTMLDivElement = <HTMLDivElement>this.createElement({ tagName: 'div', className: 'modal-body' });
    const figherImageElement : HTMLImageElement = this.createFighterImage(source);
    this.formElement = this.createInfoForm('GET', fighterDetails._id, handleSubmit, {
      health: health,
      attack: attack,
      defense: defense,
    });

    modalBodyElement.append(figherImageElement, this.formElement);

    return modalBodyElement;
  }


  public createInfoForm(method : string,  id : string, handleSubmit : (event : Event, id: string) => void, fields : IFields) : HTMLFormElement {
    const attributes : IAttributes = { id: 'info-form', method }; //{ id : string, method : string }
    const formElement : HTMLFormElement = <HTMLFormElement>this.createElement({
      tagName: 'form',
      className: 'info-form',
      attributes
    });

    Object.keys(fields).forEach(field => {
      const infoLabelElement : HTMLSpanElement = this.createInfoLabel(field);
      const figherFieldElement : HTMLInputElement = this.createFigherField(field, fields[field]);
      formElement.append(infoLabelElement, figherFieldElement);
    });

    formElement.addEventListener('submit', event => handleSubmit(event, id));  // , fields

    return formElement;
  }

  public createFighterImage(source : string) : HTMLImageElement {
    const attributes : IAttributes = { src: source }; // { src : string } 
    const imgElement : HTMLImageElement = <HTMLImageElement>this.createElement({
      tagName: 'img',
      className: 'fighter-image',
      attributes
    });

    return imgElement;
  }

  public createFigherField(field : string, value : string) : HTMLInputElement {
    const attributes : IAttributes = { type: 'number', id: `${field}`, name: field, min: '1', max: '100' }; // { type : string, id : string, name : string, min : string, max : string }
    const figherFieldElement : HTMLInputElement = <HTMLInputElement>this.createElement({ 
        tagName: 'input', 
        className: 'input',
        attributes
    });
    figherFieldElement.value = value;
    return figherFieldElement;
  }

  public createInfoLabel(field : string) : HTMLLabelElement {
    const attributes : IAttributes = { for: field }; // { for : string }
    const infoLabelElement : HTMLLabelElement = <HTMLLabelElement>this.createElement({ 
        tagName: 'label', 
        className: 'label',
        attributes
    });
    infoLabelElement.innerText = field;
    return infoLabelElement;
  }

  public createModalFooter() : HTMLDivElement {
    const modalFooterElement : HTMLDivElement = <HTMLDivElement>this.createElement({ tagName: 'div', className: 'modal-footer' });
    const submitButtonElement : HTMLButtonElement = this.createSubmitButton('Save');
    modalFooterElement.append(submitButtonElement);

    return modalFooterElement;
  }

  public createSubmitButton(buttonText : string) : HTMLButtonElement {
    const attributes : IAttributes = { type: 'submit', id: 'submit', form: 'info-form' }; // { type: string, id: string, form: string }
    const submitButtonElement :	HTMLButtonElement = <HTMLButtonElement>this.createElement({ 
        tagName: 'button', 
        className: 'btn',
        attributes
    });
    submitButtonElement.innerText = buttonText;
    return submitButtonElement;
  }
}

export { modalView };