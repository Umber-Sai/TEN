import { config } from "../config"

export class Header {

    scrollToProducts: HTMLElement | null = document.getElementById('scrollToProducts')
    constructor() {
        this.scrollToProducts!.onclick = () => {
            let product: HTMLElement | null = document.getElementById('products');
            if (!product) {
                location.href = '#/main';
                window.onload = () => {
                    product = document.getElementById('products'); 
                }
            };
            if (!product) throw new Error('section product not found');
            product.scrollIntoView({ 'behavior': 'smooth' })
        }
    }
}