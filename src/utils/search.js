import { getPokemonType } from '../utils/pokemon';
// eslint-disable-next-line
import React, {useState} from 'react';



export const Search = ( {pokemon} ) => {// eslint-disable-next-line
  const [pokemonTypeURL, setPokemonTypeURL] = useState([]);
// eslint-disable-next-line
  let resPokemonTypes = pokemon.types.map((v) => {
  let typesURL = v.type.url;
  return typesURL;
});
// eslint-disable-next-line
  const TypeSearch = async(data) => {
// eslint-disable-next-line
    let _pokemonType = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonTypeDetail = await getPokemonType(pokemon);
        let jaTypeName = pokemonTypeDetail.names.find(name => name.language.name === "ja").name;
        console.log(jaTypeName);
        return jaTypeName.last;
      }))

    }
};
