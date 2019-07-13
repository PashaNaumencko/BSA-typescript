import { View, Handler } from './view';

interface IAlertView {
    createAlert(message : string, isWarning : boolean) : void;
}

class AlertView extends View implements IAlertView {
    constructor(message : string, isWarning : boolean = false) {
        super();

        this.createAlert(message, isWarning);
    }

    public createAlert(message : string, isWarning : boolean) : void {
        this.element = <HTMLDivElement>this.createElement({ 
            tagName: 'div', 
            className: 'alert',
        });
        if (isWarning) {
            this.element.classList.add('red');
        }
        

        const messageElement : HTMLSpanElement = this.createMessage(message);
        const closeAlertElement : HTMLSpanElement = this.createCloseButton('&times;', event => this.element.remove());
        
        this.element.append(messageElement, closeAlertElement);
    }

    public createMessage(message : string) : HTMLSpanElement {
        const messageElement : HTMLSpanElement = <HTMLSpanElement>this.createElement({ tagName: 'span', className: 'message' });
        messageElement.innerText = message;
    
        return messageElement;
    }

    public createCloseButton(buttonText : string, handleCloseClick : Handler) : HTMLSpanElement {
        const closeButtonElement : HTMLSpanElement = <HTMLSpanElement>this.createElement({ tagName: 'span', className: 'close' });
        closeButtonElement.innerHTML = buttonText;
        closeButtonElement.addEventListener('click', event => handleCloseClick(event), false);
        return closeButtonElement;
    }
}
export default AlertView;