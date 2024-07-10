
export type FilterSettings = [FilterByProps, FilterByRange]

export type FilterByProps = Array<string>

export type FilterByRange = Array<
    {
        name: string,
        vals: [number, number]
    }
>