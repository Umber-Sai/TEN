
// import { init2slider } from "../other/slider";
import CustomRangeSlider from "../other/slider.js";
import { FilterPopup } from "./filterPopup";
import { Products } from "./products";


export class Main {

    private filterPopup: FilterPopup;
    private cardMaster : Products = new Products();

    constructor() {
        const typeBar: HTMLElement | null = document.getElementById('typeBar')
        if (!typeBar) throw new Error('typeBar not found')
        this.filterPopup = new FilterPopup(typeBar);

        

        this.init()
    }

    async init() : Promise<void> {
        await this.filterPopup.init();
        document.getElementById('filter_accept')!.onclick = () => {
            const filtersSettings = this.filterPopup.getFilterSettings();
            console.log(filtersSettings);
            this.cardMaster.filter(filtersSettings)

        }
    }
}