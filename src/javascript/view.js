class View {
  element;

  createElement({ tagName, className = '', attributes = {} }) {
    // console.log(tagName, className, attributes);
    const element = document.createElement(tagName);
    element.classList.add(className);
    Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));

    return element;
  }
}

export default View;
