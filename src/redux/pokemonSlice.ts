import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import pokemonSrv from '../service/pokemonSrv';

export interface PokemonState {
  listPoks: Array<any>,
  nextUrl : string
}

const initialState: PokemonState = {
  listPoks: [],
  nextUrl : ''
  
}
export const getListOfPokFromSlice = createAsyncThunk(
    "pokemon/getListOfPok",
    async (url:any) => {
      const res = await pokemonSrv.getListOfPok(url.url);
      console.log(res + 'url ' + url)
      return res.data;
    }
  );
  export const getListOfUrlFromSlice = createAsyncThunk(
    "pokemon/getListOfUrl",
    async (url:any) => {
      const res = url?await pokemonSrv.getListOfUrlScroll(url): await pokemonSrv.getListOfUrl();
      return res.data;
    }
  );

export const PokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    
    
},
extraReducers(builder) {
    builder
        .addCase(getListOfPokFromSlice.pending, (state:any, action) => {
            state.status = "loading";
        })
        .addCase(getListOfPokFromSlice.fulfilled, (state:any, action) => {
            state.status = "succeeded";
         //   state.listPoks = action
           // state.listPoks = (oldArray:any) => [...oldArray, action]
           state.listPoks.push(action.payload)
            
        })
        .addCase(getListOfPokFromSlice.rejected, (state:any, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        .addCase(getListOfUrlFromSlice.pending, (state:any, action) => {
          state.status = "loading";
      })
      .addCase(getListOfUrlFromSlice.fulfilled, (state:any, action:any) => {
          state.status = "succeeded";
          state.nextUrl = action.payload.next;
          
      })
      .addCase(getListOfUrlFromSlice.rejected, (state:any, action) => {
          state.status = "failed";
          state.error = action.error.message;
      })
        // Use the `addOne` reducer for the fulfilled case
       
},
});

// Action creators are generated for each case reducer function

export default PokemonSlice.reducer