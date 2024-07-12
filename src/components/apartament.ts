export class Apartament {

    private id : string = window.location.hash.split('id=')[1]
    constructor() {
        console.log(this.id)
    }
}