
import React, { useState, useEffect } from 'react';
import Locations from './components/Locations';
import './App.css';
import Battle from './components/Battle';
import UsersPokemons from './components/UsersPokemons';
import NoFoundPokemon from './components/NoFoundPokemon';
import FoundPokemon from './components/FoundPokemon';


function App() {
  
  const [page, setPage] = useState('locations');
  const [foundPokemon, setFoundPokemon] = useState("");
  const [pickedPokemon, setPickedPokemon] = useState("");
  const [locations, setLocations] = useState([]);
  const [usersPokemonsName, setUsersPokemonsName] = useState([]);
 
  const usersPokemon = [
    "https://pokeapi.co/api/v2/pokemon/bulbasaur",
    "https://pokeapi.co/api/v2/pokemon/charizard",
    "https://pokeapi.co/api/v2/pokemon/poliwhirl"
  ];

  
  useEffect(() => {
    console.log('useEff');
    const fetchUsersPokemons = async () => {
      try {
        const fetchPromises = usersPokemon.map(async (pokemonUrl) => {
          const response = await fetch(pokemonUrl);
          const pokemonData = await response.json();
          return {
            name: pokemonData.name,
            img: pokemonData.sprites.front_default,
            hp: pokemonData.stats[0].base_stat,
            attack: pokemonData.stats[1].base_stat,
            deffense: pokemonData.stats[2].base_stat
          };
        });
  
        const newPokemons = await Promise.all(fetchPromises);
        setUsersPokemonsName(newPokemons);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchUsersPokemons();
  }, []);

  const locationURL = 'https://pokeapi.co/api/v2/location';
    
  useEffect(() => {
      console.log("useEff");
      const fetchData = async () => {
          try {
            const response = await fetch(locationURL);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log(data.results.slice(0, 20));
            setLocations(data.results.slice(0, 20));
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
  }, []);
   
  return page === "locations" ? (
    <div>
      <Locations setPage={setPage} setFoundPokemon={setFoundPokemon} locations={locations} setLocations={setLocations}/>
    </div>
    
  ) : page === "noFoundPokemon" ? (
    <div>
      <NoFoundPokemon/>
    </div>
    
  ) : page === "foundPokemon" ? (
    <div>
      <FoundPokemon setPage={setPage} foundPokemon={foundPokemon}/>
    </div>
    
  ) : page === "usersPokemons" ? (
    <div>
      <UsersPokemons setPickedPokemon={setPickedPokemon} setPage={setPage} usersPokemonsName={usersPokemonsName}/>
    </div>
    
  ) : page === "battle" ? (
      <div>
        <Battle pickedPokemon={pickedPokemon} foundPokemon={foundPokemon}
        setPage={setPage} usersPokemonsName={usersPokemonsName} setUsersPokemonsName={setUsersPokemonsName}/>
      </div>
      
  ) : (
    <div>

    </div>
  )

}

export default App;
