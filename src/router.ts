import { Apartament } from "./components/apartament";
import { Main } from "./components/main";
import { config } from "./config";

type RouteType = {
    name : string
    rout: string,
    style: string,
    template: string,
    load() : void
}

export class Router {

  
    
    routes : RouteType[];
    styleElement : HTMLElement | null = document.getElementById('styleElement')
    titleElement : HTMLElement | null = document.getElementById('titleElement');
    motherElement : HTMLElement | null = document.getElementById('content')

    constructor () {
        if(!this.motherElement) throw new Error('content Element not found')
        this.routes = [
            {
                name : 'main',
                rout : '#/main',
                style : './styles/main.css',
                template : './templates/main.html',
                load () {
                    new Main()
                }
            },
            {
                name : 'apartment',
                rout : '#/apartment',
                style : './styles/apartment.css',
                template : './templates/apartment.html',
                load () {
                    new Apartament()
                }
            }
        ]
    }

    public async openRoute (): Promise<void> {
        const urlRoute: string[] = window.location.hash.split('?');

        const newRout : RouteType | undefined= this.routes.find(item => item.rout === urlRoute[0]);
        if (newRout) {
            this.fillPage(newRout);
            return
        } else {
            window.location.href = config.startPage;
        }
    }

    private async fillPage (newRout : RouteType): Promise<void> {
        if(this.styleElement && this.titleElement) {
            this.styleElement.setAttribute('href', newRout.style);
            this.titleElement.innerText = newRout.name;
        } else {
            throw new Error('styleElement or titleElement Not found')
        }
        this.motherElement!.innerHTML = await fetch(newRout.template).then(resp => resp.text());
        newRout.load();
    }
}