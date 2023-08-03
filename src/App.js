import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import { Card } from './components/Card/Card.js'
import Navbar from './components/Navbar/Navbar';
import { Search } from './utils/search';
export default App;

function App() {

  const initialURL = "https://pokeapi.co/api/v2/pokemon/";
  const [loding, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([])
  const [ nextURL, setNextURL ] = useState("");
  const [ prevURL, setPrevURL ] = useState("");
  const returnTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  };

useEffect(() => {
  const fetchPokemonData = async () => {
     //全てのポケモンデータを取得
    let res = await getAllPokemon(initialURL);
     //各ポケモンの詳細なデータを取得
    loadPokemon(res.results)
    setNextURL(res.next);
    setPrevURL(res.previous)
    setLoading(false);
  };
  fetchPokemonData();
}, []);

const loadPokemon = async (data) => {
  let _pokemonData = await Promise.all(
    data.map((pokemon) => {
      // console.log(pokemon);
      let pokemonRecord = getPokemon(pokemon.url);
      return pokemonRecord
    })
  )
    setPokemonData(_pokemonData)

};
// console.log(pokemonData)
const handleNextPage = async () => {
  setLoading(true);
  let data = await getAllPokemon(nextURL);
  //console.log(data);
  await loadPokemon(data.results);
  setNextURL(data.next);
  setPrevURL(data.previous);
  setLoading(false);
};
const handlePrevPage = async ()=> {
  if(!prevURL) return;

  setLoading(true);
  let data = await getAllPokemon(prevURL);
  await loadPokemon(data.results);
  setNextURL(data.next);
  setPrevURL(data.previous);
  setLoading(false);
};

  return (

  <>
    <Navbar />
    <div>{Search}</div>
    <div className="App">
    {loding ? (
        <h1>ロード中・・・</h1>
      ):(
        <>
          <div className='pokemonCardContainer'>
            {pokemonData.map((pokemon, i) => {
              return <Card key = {i} pokemon={pokemon} />;
            })}
          </div>
          <div className='btn'>
            <button onClick={() => {
              handlePrevPage();
              returnTop();
            }}>前へ</button>
            <button onClick={() => {
              handleNextPage();
              returnTop();
            }}>次へ</button>
          </div>
        </>
      )}
    </div>
  </>
  );
}
  if (window.matchMedia('(max-width: 767px)').matches) {
    console.log("スマホ")
} else if (window.matchMedia('(min-width:768px)').matches) {
    console.log("パソコン")
}
