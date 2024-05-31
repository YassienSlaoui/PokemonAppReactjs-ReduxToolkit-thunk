import axios from "axios";
const url="https://pokeapi.co/api/v2/pokemon/";
class pokemonSrv {
    
     getListOfUrl =async()=>{
        return await axios.get(url)
    }
    getListOfUrlScroll =async(urlScroll:any)=>{
        return await axios.get(urlScroll)
    }
    getListOfPok =async(urls:any)=>{
        return await axios.get(urls)
    }

}
export default new pokemonSrv();