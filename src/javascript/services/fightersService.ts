import { callApi } from '../helpers/apiHelper';

interface IFighters {
  [propName : number] : { _id: string, name: string, src: string }
}

interface IFighterDetails {
  _id: string;
  name: string;
  health: number;
  attack: number;
  defense: number;
  source: string;
}

class FighterService {
  static async getFighters() : Promise<IFighters> {
    try {
      const endpoint : string = 'fighters.json';
      const apiResult = await callApi(endpoint, 'GET');

      return JSON.parse(atob(apiResult.content));
    } catch (error) {
      throw error;
    }
  }

  static async getFighterDetails(_id) : Promise<IFighterDetails> {
    // implement this method
    // endpoint - `details/fighter/${_id}.json`;
    try {
      const endpoint : string = `details/fighter/${_id}.json`;
      const apiResult = await callApi(endpoint, 'GET');

      return JSON.parse(atob(apiResult.content));
    } catch (error) {
      throw error;
    }
  }
}

// export const fighterService = new FighterService();
export { FighterService, IFighters, IFighterDetails };
