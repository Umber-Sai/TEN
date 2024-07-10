
import {FlatsData} from '../type/database.type'
import { FilterByProps, FilterByRange, FilterSettings } from '../type/filterSettings.type';


export class Products {
    data : FlatsData[] | null = null;
    templateTxt: string | null = null;
    motherElement: HTMLElement | null = document.getElementById('flats');
    buttonElement: HTMLElement | null = document.getElementById('btn')
    filters: string[] = ["rooms", "cost", "floor", "square"];


    constructor() {
        if(!this.motherElement) throw new Error('Mother Element "flats" not found');

        Promise.all(
            [
                fetch('https://gist.githubusercontent.com/Umber-Sai/456f70b577e706ee6367a0d726768af3/raw/498248eaf04111e8fbe4d0b73c7f2ba951f62c90/database.json'),
                fetch('./templates/card.html')
            ]
        ).then(async ([dataResp, templateResp]) => {
            this.data = await dataResp.json();
            this.templateTxt = await templateResp.text();
            if(!this.templateTxt) throw new Error('cards template not found');
            if(!this.data) throw new Error('flatsData not found');
            console.log(this.data)
            this.revealCards(this.data)
        });
    }

    // private filterBtnQuery(): void {
    //     let data: FlatsData[] = this.data!;
    //     this.filters.forEach((filter: string) => {
    //         const filterInput: HTMLInputElement | null = document.getElementById(filter) as HTMLInputElement;
    //         if(!filterInput) throw new Error(`"${filter}" input not found `);

    //         const filterVal: string = filterInput.value;
    //         if (filterVal) {
    //             data = data.filter(item => item[filter as keyof FlatsData].toString() === filterVal);
    //         }
    //     });
    //     this.motherElement!.innerHTML = ''
    //     this.revealCards();
    // }

    async revealCards (data : FlatsData[]): Promise<void> {
        this.motherElement!.innerHTML = ''

        data.forEach((flat : FlatsData) => {
            const card : HTMLElement = new DOMParser().parseFromString(
                this.templateTxt!
                .replace('{{id}}', flat.id.toString())
                .replace('{{cost}}', flat.cost.toString())
                .replace('{{square}}', flat.square.toString())
                .replace('{{rooms}}', flat.rooms.toString()),
                "text/html"
            ).body.firstChild as HTMLElement;
            
           this.motherElement!.appendChild(card)
        });
    }

    public filter (filterSettings : FilterSettings) : void {

        let flats = this.data!
        console.log(flats)

        filterSettings[0].forEach(filter => {
            flats = flats.filter(item => item.propertyCharacteristics?.[filter])
        })

        filterSettings[1].forEach( filter => {
            console.log(filter)
            if(filter.vals[0]) {
                
                flats = flats.filter(flat => {return filter.vals[0] <= flat[filter.name]});
                console.log(flats)
            }
            if(filter.vals[1]) {
                
                flats = flats.filter(flat => {return flat[filter.name] <= filter.vals[1]});
            }
        })

        console.log(flats)

        this.revealCards(flats)
    }
}

