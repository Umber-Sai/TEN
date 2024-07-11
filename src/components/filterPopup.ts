import CustomRangeSlider from "../other/slider";
import { FilterByProps, FilterByRange, FilterSettings } from "../type/filterSettings.type";

export class FilterPopup {


    private template: HTMLElement | null = null;
    private rangeSliders: CustomRangeSlider[] = [];
    private motherElement: HTMLElement;


    constructor(motherElement : HTMLElement) {
        this.motherElement = motherElement;
    }

    async init() : Promise<void> {
        this.template = await fetch('./templates/filtersPopup.html')
            .then(resp => resp.text())
            .then(text => {
                return new DOMParser().parseFromString(text, 'text/html').body.firstChild as HTMLElement;
            });
        
        this.motherElement.appendChild(this.template!)
        
        const rangeSliders: HTMLCollectionOf<Element> = this.template!.getElementsByClassName('customRangeSlider')
        for (let i = 0; i < rangeSliders.length; i++) {
            const element: HTMLElement = rangeSliders[i] as HTMLElement;
            const id: string | undefined = element.parentElement?.className;
            const alias: { [key: string]: string } | null = JSON.parse(element.getAttribute('alias')!);
            const min: string | null = element.getAttribute('min')
            const max: string | null = element.getAttribute('max')
            if (min && max && alias && id) {
                this.rangeSliders.push(new CustomRangeSlider(id, element, max, min, alias));
            } else {
                console.error('Somethig went wrong with ' + element)
            }
        }

        // console.log(this.template)

        
    }

    public getFilterSettings () : FilterSettings {
        let filterByProps : FilterByProps = [];
        const propertyCharacteristics : NodeListOf<Element> = this.template!.querySelectorAll('input.btn:checked');
        for (let i = 0; i < propertyCharacteristics.length; i++) {
            const element : Element = propertyCharacteristics[i];
            filterByProps.push(element.id)
        }

        let filterByRange : FilterByRange = []
        for (let i = 0; i < this.rangeSliders.length; i++) {
            const element = this.rangeSliders[i];
            filterByRange.push({
                name : element.id,
                vals : [parseInt(element.minVal), parseInt(element.maxVal)]
            })
        }

        return [filterByProps, filterByRange]
    }   


}