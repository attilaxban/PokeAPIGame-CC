export default function NoFoundPokemon(props){
    
    const setPage = props.setPage

    return(
        <div>
            <h1>This location doesn't seem to have any pokémon</h1>
            <button onClick={() => setPage("locations")}>Back</button>
        </div>
    )
}