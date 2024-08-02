import React, { useState, useEffect } from 'react';
import './UsersPokemons.css';

export default function UsersPokemons(props){
    
  //const pickedPokemon = props.pickedPokemon
  const setPickedPokemon = props.setPickedPokemon;
  const setPage = props.setPage;
  const usersPokemonsName = props.usersPokemonsName;

  
  const handleChoose = async (event) => {

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${event.target.id.toLowerCase()}`);
    const data = await response.json();
    setPickedPokemon({
      name: data.name,
      img: data.sprites.front_default,
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      deffense: data.stats[2].base_stat
    })
    setPage("battle");
  }
  return (
   
      <div className='users-pokemons'>
        {usersPokemonsName.map((pokemon, index) => (
          <div className='users-pokemon' id={pokemon.name} key={index}>
            <h2 id="user-pokemon">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase()}</h2>
            <img src={pokemon.img} alt={pokemon.name} />
            <p>
              HP: {pokemon.hp}<br></br>
              ATK: {pokemon.attack}<br></br>
              DEF: {pokemon.deffense}<br></br>
            </p>
            <button id={pokemon.name} onClick={handleChoose}>Pick {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase()}</button>
          </div>
        ))}
      </div>
    
    )
 

}