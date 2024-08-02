/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import './Battle.css';

export default function Battle(props) {


    const pickedPokemon = props.pickedPokemon;
    const foundPokemon = props.foundPokemon;
    const setPage = props.setPage;
    const usersPokemonsName = props.usersPokemonsName;
    const setUsersPokemonsName = props.setUsersPokemonsName;

    const [battlePage, setBattlePage] = useState("battle");
    const [HPUser, setHPuser] = useState(pickedPokemon.hp);
    const [HPEnemy, setHPEnemy] = useState(foundPokemon.hp);

    
    const [active,setActive] = useState(false)
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 32) {
                battlePoke(event);

                if (HPEnemy > 2 && HPUser > 2) {
                    setActive(true)
                    setTimeout(() => {
                        setActive(false)
                    }, 1000);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [battlePage, HPUser, HPEnemy]);

    // useEffect(() => {
    //     const handleKeyDown = (event) => {
    //         if (event.keyCode === 32) {
    //             battlePoke(event);

    //             if (HPEnemy > 2 && HPUser > 2) {
    //                 document.querySelector('#choosen-pokemon').className = "active";
    //                 setTimeout(function () {
    //                     document.querySelector('#choosen-pokemon').classList.remove("active");
    //                 }, 1000);

    //                 document.querySelector('#encounter').className = "active";
    //                 setTimeout(function () {
    //                     document.querySelector('#encounter').classList.remove("active");
    //                 }, 1000);

    //                 document.querySelector('#fight-stats').className = "active";
    //                 setTimeout(function () {
    //                     document.querySelector('#fight-stats').classList.remove("active");
    //                 }, 1000);

    //                 document.querySelector('#user').className = "active";
    //                 setTimeout(function () {
    //                     document.querySelector('#user').classList.remove("active");
    //                 }, 1000);

    //                 document.querySelector('#enemy').className = "active";
    //                 setTimeout(function () {
    //                     document.querySelector('#enemy').classList.remove("active");
    //                 }, 1000);
    //                 document.querySelector('#attack-flash').className = "active";
    //                 setTimeout(function () {
    //                     document.querySelector('#attack-flash').classList.remove("active");
    //                 }, 1000);
    //             }
    //         }
    //     };

    //     window.addEventListener('keydown', handleKeyDown);

    //     return () => {
    //         window.removeEventListener('keydown', handleKeyDown);
    //     };
    // }, [battlePage, HPUser, HPEnemy]);

    const battlePoke = (event) => {
        event.preventDefault();

        let damage;
        let randomNum;

        randomNum = Math.floor(Math.random() * (255 - 217 + 1)) + 217;
        damage = ((((2 / 5 + 2) * pickedPokemon.attack * 60 / foundPokemon.deffense) / 50) + 2) * randomNum / 255;

        setHPEnemy(Math.max(HPEnemy - damage, 0));

        if (Math.max(HPEnemy - damage, 0) === 0) {
            console.log("win");
            setBattlePage("win");
            let includePokemon = false
            for (let i = 0; i < usersPokemonsName.length; i++) {
                if (usersPokemonsName[i].name === foundPokemon.name) {
                    includePokemon = true;
                }
            }
            if (includePokemon === false) {
                setUsersPokemonsName([...usersPokemonsName, foundPokemon])
            }

        }

        randomNum = Math.floor(Math.random() * (255 - 217 + 1)) + 217;
        damage = ((((2 / 5 + 2) * foundPokemon.attack * 60 / pickedPokemon.deffense) / 50) + 2) * randomNum / 255;

        setHPuser(Math.max(HPUser - damage, 0));

        if (Math.max(HPUser - damage, 0) === 0) {
            console.log("defeat");
            setBattlePage("defeat")
        }
    }

    const nextLoc = (event) => {
        event.preventDefault();

        setPage("locations");
    }


    return battlePage === "battle" ? (
        <div>
            <div id='pokemon-summary'>

                <div id="attack-flash" className={active ? 'active' : ''}></div>
                <div id="choosen-pokemon" className={active ? 'active' : ''}>
                    <h3>{pickedPokemon.name.charAt(0).toUpperCase() + pickedPokemon.name.slice(1).toLowerCase()}</h3>
                    <img id="user" src={pickedPokemon.img} alt="" />
                    <p>
                        HP: {pickedPokemon.hp}<br></br>
                        ATK: {pickedPokemon.attack}<br></br>
                        DEF: {pickedPokemon.deffense}<br></br>
                    </p>
                </div>


                <div id="fight-button">
                    <div id="fight-stats" className={active ? 'active' : ''}>
                        <h2>Your HP:{parseInt(HPUser * 100) / 100}</h2>
                        <h2>Enemy's HP:{parseInt(HPEnemy * 100) / 100}</h2><br />
                    </div>
                    <div id="press-space">Press Space</div>
                </div> <div id="encounter" className={active ? 'active' : ''}>
                    <h3>{foundPokemon.name.charAt(0).toUpperCase() + foundPokemon.name.slice(1).toLowerCase()}</h3>
                    <img id="enemy" src={foundPokemon.img} alt="" />
                    <p>
                        HP: {foundPokemon.hp}<br></br>
                        ATK: {foundPokemon.attack}<br></br>
                        DEF: {foundPokemon.deffense}<br></br>
                    </p>
                </div>
            </div>
        </div>
    ) : battlePage === "win" ? (
        <div>
            <h2>You've won!</h2>
            <p>You own {foundPokemon.name.charAt(0).toUpperCase() + foundPokemon.name.slice(1).toLowerCase()}</p>
            <div id="encounter">
                <h3>{foundPokemon.name.charAt(0).toUpperCase() + foundPokemon.name.slice(1).toLowerCase()}</h3>
                <img src={foundPokemon.img} alt="" />
                <p>
                    HP: {parseInt(foundPokemon.hp * 100) / 100}<br></br>
                    ATK: {foundPokemon.attack}<br></br>
                    DEF: {foundPokemon.deffense}<br></br>
                </p>
                <button onClick={nextLoc}>Next location</button>
            </div>


        </div>
    ) : battlePage === "defeat" ? (
        <div>
            <h2>You've lost!</h2>
            <p>Go to the next location.</p>
            <button id="lost-button" onClick={nextLoc}>Next location</button>
        </div>
    ) : (
        <div>

        </div>
    )

}