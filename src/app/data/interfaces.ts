type ResponseBody = {
    code: number,
    message: string,
    data?: Record<any,any>
}

type APIdataResponse = {
    page: number,
    limit: number,
    totalPage: number,
    total: number,
    totalFiltered: number,
    results: Array<{[key:string]: any}>,
}

type tableProps = {
    props: {
        id?: string
    },
    head?: string[],
    data?: APIdataResponse,
    columnToHide?: string[],
    hasAction?: boolean,
    isLoading?: boolean,
    filter: FilterProps,
}

type FilterProps = {
    enableFilter?: boolean
    filterField?: Array<string>
    filterObject?: {[key:string]:any} | undefined
    inputEvent?: (e:any, v:any) => void
    filterEvent?: (data:{[key:string]:any}) => void
    resetEvent?: () => void,
    paginationEvent?: (page:number) => void,
}

type Cards = {
    title: String
    counter: Number,
};