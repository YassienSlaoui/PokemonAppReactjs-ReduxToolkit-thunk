import axios from "axios"
import { getListOfPok, getListOfUrl, getListOfUrlScroll } from "../action/type"

const pokemonReducer = async(state = {listtPK:[]}, action:any ) =>{
    switch(action.type){
        case getListOfPok :
            return {...state, listtPK : action.value}
            
            
        case getListOfUrlScroll:
            return await axios.get(action.value)
        case getListOfUrl :
            return await axios.get(action.value)
    }
    return state
}

export default pokemonReducer