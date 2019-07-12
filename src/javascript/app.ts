import FightersView from './fightersView';
import { FighterService } from './services/fightersService';

class App {
  constructor() {
    this.startApp();
  }

  static rootElement : HTMLElement = document.getElementById('root');
  static loadingElement : HTMLElement = document.getElementById('loading-overlay');

  async startApp() {
    try {
      App.loadingElement.style.visibility = 'visible';
      
      const fighters = await FighterService.getFighters();
      const fightersView = new FightersView(fighters);
      const fightersElement = fightersView.element;      

      App.rootElement.append(fightersElement);
    } catch (error) {
      console.warn(error);
      App.rootElement.innerText = 'Failed to load data';
    } finally {
      App.loadingElement.style.visibility = 'hidden';
    }
  }
}

export default App;