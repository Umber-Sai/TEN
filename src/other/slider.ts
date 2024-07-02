

export class RangeSlider {

    private eggs : HTMLCollectionOf<Element> = document.getElementsByClassName('range-slider');

    constructor () {
        if(this.eggs) this.hatchEggs();
    }

    private hatchEggs(): void {
        for (let i = 0; i < this.eggs.length; i++) {
            const egg : Element = this.eggs[i];
            const maxRange : string | null = egg.getAttribute('range');
            if(!maxRange) {console.error ('You forget put "range"'); return };
            
            new Slider(egg, maxRange);
           
        }
    }

    
}

class Slider {

    private sliderBox : HTMLElement = document.createElement('div')
    private slider1 :HTMLInputElement | null = null;
    private slider2 :HTMLInputElement | null = null;
    private minValue : HTMLElement = document.createElement('div')
    private maxValue : HTMLElement = document.createElement('div')
    private track : HTMLElement | null = null
    private maxRange : string | null = '';

    constructor (motherElement : Element, maxRange: string) {
        this.maxRange = maxRange
        this.slider1 = new DOMParser().parseFromString(`<input type="range" min="0" max="${this.maxRange!}" value="0">`, 'text/html').body.firstChild as HTMLInputElement;
        this.slider2 = new DOMParser().parseFromString(`<input type="range" min="0" max="${this.maxRange!}" value="${this.maxRange}">`, 'text/html').body.firstChild as HTMLInputElement;

        this.track = document.createElement('div');
        this.track.className = 'slider-track';

        this.slider1.addEventListener("input", this.updateTrack.bind(this));
        this.slider2.addEventListener("input", this.updateTrack.bind(this));
    
        this.updateTrack();


        this.sliderBox.appendChild(this.track);
        this.sliderBox.appendChild(this.slider1);
        this.sliderBox.appendChild(this.slider2);

        motherElement.appendChild(this.maxValue)
        motherElement.appendChild(this.minValue)
    }

    private updateTrack(): void {
        const min = Math.min(parseInt(this.slider1!.value), parseInt(this.slider2!.value)) * (100 / +this.maxRange!);
        const max = Math.max(parseInt(this.slider1!.value), parseInt(this.slider2!.value)) * (100 / +this.maxRange!);
        this.track!.style.left = min + '%';
        this.track!.style.width = (max - min) + '%';
        console.log('slider1 ' +this.slider1!.value)
        console.log('slider2 ' +this.slider2!.value)
    }
}