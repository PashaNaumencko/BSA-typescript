import { View, IAttributes } from './view';

interface IFighterInFightView {
    name : string;
    source : string;
    health : number;
    attack : number;
    defense : number;
    createFighter() : void;
}

class FighterInFightView extends View implements IFighterInFightView {
    public name : string;
    public source : string;
    public health : number;
    public attack : number;
    public defense : number;

    constructor(name : string, source : string, health : number, attack : number, defense : number) {
        super();

        this.name = name;
        this.source = source;
        this.health = health;
        this.attack = attack;
        this.defense = defense;

        this.getHitPower = this.getHitPower.bind(this);
        this.getBlockPower = this.getBlockPower.bind(this);


        this.createFighter();
    }

    public createFighter() : void {
        const nameElement : HTMLSpanElement = this.createName(this.name);
        const imageElement : HTMLImageElement = this.createImage(this.source);
        const healthElement : HTMLSpanElement = this.createInfoSpan('health', this.health);
        const attackElement : HTMLSpanElement = this.createInfoSpan('attack', this.attack);
        const defenseElement : HTMLSpanElement = this.createInfoSpan('defense', this.defense);
    
        this.element = <HTMLDivElement>this.createElement({ tagName: 'div', className: 'fighter' });
        this.element.append(imageElement, nameElement, healthElement, attackElement, defenseElement);
    }

    public createName(name : string) : HTMLSpanElement {
        const nameElement : HTMLSpanElement = <HTMLSpanElement>this.createElement({ tagName: 'span', className: 'name' });
        nameElement.innerText = name;
    
        return nameElement;
    }
    
    public createImage(source : string) : HTMLImageElement {
        const attributes : IAttributes = { src: source };
        const imgElement : HTMLImageElement = <HTMLImageElement>this.createElement({
          tagName: 'img',
          className: 'fighter-image',
          attributes
        });
        return imgElement;
    }

    public createInfoSpan(field : string, value : number) : HTMLSpanElement {
        const infoSpanElement : HTMLSpanElement = <HTMLSpanElement>this.createElement({ 
            tagName: 'span', 
            className: 'chars',
        });
        infoSpanElement.innerText = `${field}: ${value}`;
        return infoSpanElement;
    }

    getHitPower() : number {
        return this.attack * FighterInFightView.criticalChance(1, 2);
    }

    getBlockPower() : number {
        return this.defense * FighterInFightView.criticalChance(1, 2);
    }

    public static criticalChance(min : number, max : number) : number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

export default FighterInFightView;