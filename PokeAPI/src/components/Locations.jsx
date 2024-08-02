/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react';
import './Locations.css';

export default function Locations(props) {
    
    const setFoundPokemon = props.setFoundPokemon;
    const setPage = props.setPage;
    const locations = props.locations;
    const setLocations = props.setLocations;

    /* const locationURL = 'https://pokeapi.co/api/v2/location';
    const [locations, setLocations] = useState([]);

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
    }, []); */
    if(locations.length === 1){
      location.reload();
    }

    const handleClick = async (event) => {

      
      
      console.log(event.target.textContent);
        try {
          const locationResponse = await fetch(`https://pokeapi.co/api/v2/location/${event.target.id}/`);
          const locationData = await locationResponse.json();
              
          const randomArea = Math.floor(Math.random() * locationData.areas.length);
          const areaResponse = await fetch(locationData.areas[randomArea].url);
          const areaData = await areaResponse.json();
    
          const randomEncounter = Math.floor(Math.random() * areaData.pokemon_encounters.length);
          const pokemonResponse = await fetch(areaData.pokemon_encounters[randomEncounter].pokemon.url);
          const pokemonData = await pokemonResponse.json();

          setFoundPokemon({
            name: pokemonData.name,
            img: pokemonData.sprites.front_default,
            hp: pokemonData.stats[0].base_stat,
            attack: pokemonData.stats[1].base_stat,
            deffense: pokemonData.stats[2].base_stat
            });
    
          console.log(locations);
          const restLocations = locations.filter(loc => loc.name !== event.target.textContent.toLowerCase());
          console.log(restLocations);
          setLocations(restLocations);
          console.log(locations);
            
          setPage("foundPokemon");

        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };
    
    return (
        <div id='locations'>
            {locations.map((loc, index) => (
                <div key={index} onClick={handleClick} id={loc.name}>{loc.name.toUpperCase()}</div>
            ))}
        </div>
    )
        
}