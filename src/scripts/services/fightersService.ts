import { callApi } from '../helpers/apiHelper';

interface IFighter {
  _id: string;
  name: string;
  source: string;
} 


interface IFighterGameDetails {
  _id: string;
  name: string;
  health: number;
  attack: number;
  defense: number;
  source: string;
}

class FighterService {
  public static async getFighters() : Promise<IFighter[]> {
    try {
      const endpoint : string = 'fighters.json';
      const apiResult = await callApi(endpoint, 'GET');

      return JSON.parse(atob(apiResult.content));
    } catch (error) {
      throw error;
    }
  }

  public static async getFighterDetails(_id : string) : Promise<IFighterGameDetails> {
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
export { FighterService, IFighter, IFighterGameDetails };
