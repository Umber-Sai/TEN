export type FlatsData = {
    id: number;
    cost: number;
    square: number;
    floor: number;
    maxFloor: number;
    rooms: number;
    img: string;
    propertyCharacteristics: {
        [key: string]: boolean;
    };
} & {
    [key: string]: number;
};