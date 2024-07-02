import { RangeSlider } from '../other/slider';
import {FlatsData} from '../type/database.type'


export class Products {
    data : FlatsData[] | null = null;
    motherElement: HTMLElement | null = document.getElementById('flats');
    buttonElement: HTMLElement | null = document.getElementById('btn')
    filters: string[] = ["rooms", "cost", "floor", "square"];


    constructor() {
        if(!this.motherElement) throw new Error('Mother Element "flats" not found');
        const url: string = 'https://gist.githubusercontent.com/Umber-Sai/456f70b577e706ee6367a0d726768af3/raw/18c911817a11d135fb3906619cf5fabe8bd2f648/database.json'
        fetch(url)
            .then( async (resp) => {return await resp.json()})
            .then( data => {
                this.data = data;
                console.log(data)
                this.revealCards(data);
            });

        if (this.buttonElement) {
            this.buttonElement.addEventListener('click', this.filterBtnQuery.bind(this) )
        } else {
            console.error('Filter button not found')
        }

        // new Slider('slider1', 'slider2', 'slider-track', 50);
        // new RangeSlider()
    }

    private filterBtnQuery(): void {
        let data: FlatsData[] = this.data!;
        this.filters.forEach((filter: string) => {
            const filterInput: HTMLInputElement | null = document.getElementById(filter) as HTMLInputElement;
            if(!filterInput) throw new Error(`"${filter}" input not found `);

            const filterVal: string = filterInput.value;
            if (filterVal) {
                data = data.filter(item => item[filter as keyof FlatsData].toString() === filterVal);
            }
        });
        this.motherElement!.innerHTML = ''
        this.revealCards(data);
    }

    async revealCards (data: FlatsData[]): Promise<void> {
        const template: string = await fetch('../templates/card.html')
            .then( async (resp: Response) => await resp.text());

        data.forEach((flat : FlatsData) => {
            const card : HTMLElement = new DOMParser().parseFromString(
                template
                .replace('{{id}}', flat.id.toString())
                .replace('{{cost}}', flat.cost.toString())
                .replace('{{square}}', flat.square.toString())
                .replace('{{rooms}}', flat.rooms.toString()),
                "text/html"
            ).body.firstChild as HTMLElement;
            
           this.motherElement!.appendChild(card)
        });
    }
}

