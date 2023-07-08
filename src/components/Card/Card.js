import React, { useEffect, useState } from 'react'
import "./Card.css"
import { getPokemonAbility, getPokemonType,getPokemonName  } from '../../utils/pokemon';


export const Card = ({ pokemon }) => {
  const [pokemonTypeURL, setPokemonTypeURL] = useState([]);
  const [pokemonName, setPokemonName] = useState([]);
  const [pokemonAbility, setPokemonAbility] = useState([]);

  let resPokemonTypes = pokemon.types.map((v) => {
    let typesURL = v.type.url;
    return typesURL;
  });

  const loadPokemonType = async (data) => {
    let _pokemonType = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonTypeDetail = await getPokemonType(pokemon);
        let jaName = pokemonTypeDetail.names.find(name => name.language.name === "ja").name;
        return jaName;
      })
    );
    let joinedTypes = _pokemonType.join(" / ");
    setPokemonTypeURL(joinedTypes);
  };
  //ability = 特性
  let resPokemonAbility = pokemon.abilities.map((v) => {
    let AbilityURL = v.ability.url;
    return AbilityURL;
  });

  const loadPokemonAbility = async (data) => {
    let _pokemonAbility = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonAbilityDetail = await getPokemonAbility(pokemon);
        let jaName = pokemonAbilityDetail.names.find(name => name.language.name === "ja").name;
        return jaName
      })
    );
    let joinedAbilitys = _pokemonAbility.join(" / ")
    setPokemonAbility(joinedAbilitys);
  };

  let pokemonNameDetail = pokemon.species.url;

  const loadPokemonName = async (data) => {
    let response = await fetch(data);
    let result = await response.json();
    let jaName = result.names.find(name => name.language.name === "ja").name;
    setPokemonName(jaName)
  };

  useEffect(() => {
    loadPokemonType(resPokemonTypes);
    loadPokemonName(pokemonNameDetail);
    loadPokemonAbility(resPokemonAbility)
  },[])

  console.log(pokemon);

  return (
    <div className="card">
      <div className="cardImg">
        <img src={pokemon.sprites.front_default} alt='' />
      </div>
      <h3 className='cardName'>{pokemonName}</h3>
      <div className='cardTypes'>
        <span>タイプ :</span>
        {//pokemon.types.map((v) => {
         // return (
          // <div key={type.type.name}>
            // <span className='typeName'>{type.type.name}</span>
          // </div>);
        }
        {pokemonTypeURL}
      </div>
      <div className='cardInfo'>
        <div className='cardData'>
        <p className='title'>重さ: {pokemon.weight}</p>
        </div>
        <div className='cardData'>
        <p className='title'>高さ: {pokemon.height}</p>
        </div>
        <div className='cardData'>
        <p className='title'>特性: {pokemonAbility}</p>
        </div>
      </div>
    </div>
  );
};

export default Card
