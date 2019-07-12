interface IAttributes {
  [propName : string] : string;
}

interface IElementProps {
  tagName: string;
  className?: string;
  attributes?: IAttributes;
}

// interface IElement { 
//   element: HTMLElement;
// }

type Handler = (event : Event) => void;

class View {
  public element: HTMLElement;

  public createElement(elementProps : IElementProps): HTMLElement {
    const { tagName, className = '', attributes = {} } = elementProps;
    const element: HTMLElement = document.createElement(tagName);
    element.classList.add(className);
    Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));

    return element;
  }
}

export { View, IAttributes, Handler };
