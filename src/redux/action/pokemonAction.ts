import { getListOfPok, getListOfUrl, getListOfUrlScroll } from "./type"

export const getListOfPokAction = (url: any) => {
    return {
        type: getListOfPok,
        value : url
    }
}

export const getListOfUrlAction = (url: any) => {
    return {
        type: getListOfUrl
    }
}
export const getListOfUrlScrollAction = (url: any) => {
    return {
        type: getListOfUrlScroll,
        value : url
    }
}