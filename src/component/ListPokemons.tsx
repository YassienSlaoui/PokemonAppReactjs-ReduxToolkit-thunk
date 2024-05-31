import React, { useState,useEffect } from 'react';
import pokemonSrv from '../service/pokemonSrv';
import {useSelector,useDispatch} from 'react-redux';
import type { RootState } from '../redux/store';
import {getListOfPokFromSlice,getListOfUrlFromSlice} from '../redux/pokemonSlice';
import { AppDispatch } from "../redux/store";
import {
    Grid,
    GridColumn as Column,
    GridEvent,
    GridSelectionChangeEvent
  } from "@progress/kendo-react-grid";
function ListPokemons() {
  const pokemonn = useSelector((state: RootState) => state.pokemonn)
  const dispatch = useDispatch<AppDispatch>();
 
  const [Pokemon, setPokemon] = useState({
    name:'',
    abilities : [],
    base_experience:'',
    sprites:{
        front_shiny :''
    }

  })
  const [urlScroll, setUrlScroll] = useState('')
  const imgCell = (props :any) => {
    return (
      <td>
        <img src={props.dataItem.sprites.front_shiny} style={{ width: 100, height: 100 }} alt="" />
      </td>
    )
  }
  useEffect( () => {
     dispatch(getListOfUrlFromSlice(undefined)).then((res)=>{
            res.payload.results.forEach(async (element:any) => {
                await dispatch(getListOfPokFromSlice({url :element.url}));
            });
            
     })
        // pokemonSrv.getListOfUrl().then((res) => {
        //     setUrlScroll(res.data.next);
        //     res.data.results.forEach( async (element:any )=> {
        //         await dispatch(getListOfPokFromSlice({url :element.url}));
        //     // console.log('list' + listPokss + ' url : '+element.url )
        //         // pokemonSrv.getListOfPok(element.url).then((res) => {
        //         //     setListPoks(oldArray => [...oldArray, res.data]); 
        //         //     dispatch(getListOfPokAction(res.data));
        //         // })
            
            
        //     });       
        // })
     }, []);
     const scrollHandler = (event: GridEvent) => {
        const e = event.nativeEvent;
        if (
          e.target.scrollTop + 10 >=
          e.target.scrollHeight - e.target.clientHeight
        ) {
            dispatch(getListOfUrlFromSlice(pokemonn.nextUrl)).then((res)=>{
                res.payload.results.forEach(async (element:any) => {
                    await dispatch(getListOfPokFromSlice({url :element.url}));
                });
                
         })
            // pokemonSrv.getListOfUrlScroll(urlScroll).then((res) => {
            //     setUrlScroll(res.data.next);
                
            //     res.data.results.forEach(async (element:any )=> {
            //         await dispatch(getListOfPokFromSlice({url :element.url}));
            //         // pokemonSrv.getListOfPok(element.url).then((res) => {
            //         //     setListPoks(oldArray => [...oldArray, res.data]);
                       
            //         // })
            //     });       
            // })
        }
      };
      const onSelectionChange = (event: GridSelectionChangeEvent) => {
        console.log(event);
      };
      const rowDoubleClick = (event:any) =>{
        setPokemon(event.dataItem);
        console.log(event);
      }
  return (
    <div className = "row">
        <div className = "col-md-6 d-flex justify-content-start">
            <Grid
            onRowDoubleClick={rowDoubleClick}
                style={{ height: "500px" }}
                data={pokemonn.listPoks}
                onScroll={scrollHandler}
                onSelectionChange={onSelectionChange}
                fixedScroll={true}
            >
                <Column field="name" title="Name" width="250px" />
                <Column field="sprites.front_shiny" title="Picture" width="250px" cell={imgCell} />
            </Grid>
            <br />
        </div>
        <div className = "col-md-4 d-flex justify-content-end flex-column">
            <h4 className="text-center">Pokemon Detail (please do double click on Pokemon to get info)</h4>
            <div className="row">
                <span className='mb-auto mt-auto'>Name :{Pokemon.name}</span>
                <img src={Pokemon.sprites.front_shiny} alt="" />
            </div> 
            <div className="row">
                <span>Abilities :{Pokemon.abilities.map(
                      (abilitie:any) => 
                            <span> {abilitie.ability.name} </span>   
                       )}
                </span>
            </div>
            <div className="row ">
                <span>base experience : {Pokemon.base_experience}</span> 
            </div>
        </div>
            
            <br />
        


    {/* <h2 className="text-center">Pokemon List</h2>

        <div className = "row">
            <table className = "table table-striped table-bordered" id="infinite-table">

                <thead>
                    <tr>
                        <th> Name</th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listPoks.map(
                            pokumon => 
                            <tr key = {pokumon.name}>
                                    <td> {pokumon.name} </td>   
                                    <td>  <img src={pokumon.sprites.front_default} alt="" /></td>
                                   
                            </tr>
                        )
                    }
                </tbody>
            </table>

        </div> */}

    </div>
  );
};

export default ListPokemons;