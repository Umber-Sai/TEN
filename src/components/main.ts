import { init2slider } from "../other/slider";
import { Products } from "./products";


export class Main {

    private rangeSliders: HTMLCollectionOf<Element> = document.getElementsByClassName('customRangeSlider');
    constructor () {
        new Products()
        // setTimeout(() => {init2slider('id66', 'id66b', 'id661', 'id662', 'id66i1', 'id66i2')}, 0);

        for (let i = 0; i < this.rangeSliders.length; i++) {
            const element : HTMLElement = this.rangeSliders[i] as HTMLElement;
            const alias: {[key : string] : string} | null = JSON.parse(element.getAttribute('alias')!);
            const min = element.getAttribute('min')
            const max = element.getAttribute('max')
            setTimeout(() => {init2slider(element, max!, min!, alias)}, 0);
            
        }
    }
}