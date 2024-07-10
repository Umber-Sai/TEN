declare class customRangeSlider {
    constructor(id : string, element: HTMLElement, max: string, min: string, alias : {[key : string] : string} | null);
    id : string
    minVal : string
    maxVal : string
}

export default customRangeSlider;