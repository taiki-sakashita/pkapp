import { getPokemonType } from '../utils/pokemon';
import React, {useState} from 'react';



export const Search = ( {pokemon} ) => {
  const [pokemonTypeURL, setPokemonTypeURL] = useState([]);

  let resPokemonTypes = pokemon.types.map((v) => {
  let typesURL = v.type.url;
  return typesURL;
});

  const TypeSearch = async(data) => {
    let _pokemonType = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonTypeDetail = await getPokemonType(pokemon);
        let jaTypeName = pokemonTypeDetail.names.find(name => name.language.name === "ja").name;
        console.log(jaTypeName);
        return jaTypeName.last;
      }))

    }
};
