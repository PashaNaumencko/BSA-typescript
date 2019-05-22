import View from './view';

class Alert extends View {
    constructor(message, isWarning = false) {
        super();

        this.createAlert(message, isWarning);
    }

    createAlert(message, isWarning) {
        this.element = this.createElement({ 
            tagName: 'div', 
            className: 'alert',
        });
        if (isWarning) {
            this.element.classList.add('red');
        }
        

        const messageElement = this.createMessage(message);
        const closeAlertElement = this.createCloseButton('&times;', event => this.element.remove());
        
        this.element.append(messageElement, closeAlertElement);
    }

    createMessage(message) {
        const messageElement = this.createElement({ tagName: 'span', className: 'message' });
        messageElement.innerText = message;
    
        return messageElement;
    }

    createCloseButton(buttonText, handleCloseClick) {
        const closeButtonElement = this.createElement({ tagName: 'span', className: 'close' });
        closeButtonElement.innerHTML = buttonText;
        closeButtonElement.addEventListener('click', event => handleCloseClick(event), false);
        return closeButtonElement;
    }
}
export default Alert;