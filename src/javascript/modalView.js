import View from './view';

class modalView extends View {
  constructor(fighterDetails, handleSubmit) {
    super();
    this.createModal(fighterDetails, handleSubmit);
  }

  createModal(fighterDetails, handleSubmit) {
    const modalContentElement = this.createModalContent(fighterDetails, handleSubmit);

    this.element = this.createElement({ tagName: 'div', className: 'modal' });
    this.element.append(modalContentElement);
    this.element.addEventListener('click', event => {
        if (event.target === this.element) {
          this.element.parentNode.removeChild(this.element);
        }         
    }, false);
  }

  createModalContent(fighterDetails, handleSubmit) {
    const modalContentElement = this.createElement({ tagName: 'div', className: 'modal-content' });
    const modalHeaderElement = this.createModalHeader(fighterDetails.name);
    const modalBodyElement = this.createModalBody(fighterDetails, handleSubmit);
    const modalFooterElement = this.createModalFooter();
    modalContentElement.append(modalHeaderElement, modalBodyElement, modalFooterElement);

    return modalContentElement;
  }

  createModalHeader(fighterName) {
    const modalHeaderElement = this.createElement({ tagName: 'div', className: 'modal-header' });
    const headerElement = this.createHeader(`${fighterName}`);
    const closeButtonElement = this.createCloseButton('&times;');
    modalHeaderElement.append(headerElement, closeButtonElement);

    return modalHeaderElement;
  }

  createHeader(headerText) {
    const headerElement = this.createElement({ tagName: 'h2', className: 'header' });
    headerElement.innerText = headerText;
    return headerElement;
  }


  createCloseButton(buttonText) {
    const closeButtonElement = this.createElement({ tagName: 'span', className: 'close' });
    closeButtonElement.innerHTML = buttonText;
    closeButtonElement.addEventListener('click', event => this.element.parentNode.removeChild(this.element), false);
    return closeButtonElement;
  }


  createModalBody(fighterDetails, handleSubmit) {
    const { health, attack, defense, source } = fighterDetails;
    const modalBodyElement = this.createElement({ tagName: 'div', className: 'modal-body' });
    const figherImageElement = this.createFighterImage(source);
    this.formElement = this.createInfoForm('GET', fighterDetails._id, handleSubmit, {
      health: health,
      attack: attack,
      defense: defense,
    });

    modalBodyElement.append(figherImageElement, this.formElement);

    return modalBodyElement;
  }


  createInfoForm(method,  id, handleSubmit, fields = {}) {
    const attributes = { id: 'info-form', method };
    const formElement = this.createElement({
      tagName: 'form',
      className: 'info-form',
      attributes
    });

    Object.keys(fields).forEach(field => {
      const infoLabelElement = this.createInfoLabel(field);
      const figherFieldElement = this.createFigherField(field, fields[field]);
      formElement.append(infoLabelElement, figherFieldElement);
    });

    formElement.addEventListener('submit', event => handleSubmit(event, id, fields));

    return formElement;
  }

  createFighterImage(source) {
    const attributes = { src: source };
    const imgElement = this.createElement({
      tagName: 'img',
      className: 'fighter-image',
      attributes
    });

    return imgElement;
  }

  createFigherField(field, value) {
    const attributes = { type: 'number', id: `${field}`, name: `${field}` };
    const figherFieldElement = this.createElement({ 
        tagName: 'input', 
        className: 'input',
        attributes
    });
    figherFieldElement.value = value;
    return figherFieldElement;
  }

  createInfoLabel(field) {
    const attributes = { for: field };
    const infoLabelElement = this.createElement({ 
        tagName: 'label', 
        className: 'label',
        attributes
    });
    infoLabelElement.innerText = field;
    return infoLabelElement;
  }

  createModalFooter() {
    const modalFooterElement = this.createElement({ tagName: 'div', className: 'modal-footer' });
    const submitButtonElement = this.createSubmitButton('Save');
    modalFooterElement.append(submitButtonElement);

    return modalFooterElement;
  }

  createSubmitButton(buttonText) {
    const attributes = { type: 'submit', id: 'submit', form: 'info-form' };
    const submitButtonElement = this.createElement({ 
        tagName: 'button', 
        className: 'btn',
        attributes
    });
    submitButtonElement.innerText = buttonText;
    return submitButtonElement;
  }
}

export default modalView;