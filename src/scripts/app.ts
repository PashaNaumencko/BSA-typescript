import FightersView from './fightersView';
import { FighterService } from './services/fightersService';
import { IFighter } from './services/fightersService';

interface IApp {
  startApp() : Promise<void> ;
}

class App implements IApp {
  constructor() {
    this.startApp();
  }

  static rootElement : HTMLElement = document.getElementById('root');
  static loadingElement : HTMLElement = document.getElementById('loading-overlay');

  async startApp() : Promise<void> {
    try {
      App.loadingElement.style.visibility = 'visible';
      
      const fighters : IFighter[] = await FighterService.getFighters();
      const fightersView : FightersView = new FightersView(fighters);
      const fightersElement : HTMLElement = fightersView.element;      

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