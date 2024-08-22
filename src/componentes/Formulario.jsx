import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Formulario.module.css";
import PokemonCard from "./Pokemoncard";

function Formulario() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);


  const fetchAllPokemons = async () => {
    try {
      const allPokemonURL = `https://pokeapi.co/api/v2/pokemon?limit=1000`;
      const response = await axios.get(allPokemonURL);
      return response.data.results;
    } catch (error) {
      console.error("Error fetching all Pokémon data:", error);
      return [];
    }
  };


  useEffect(() => {
    const fetchPokemons = async () => {
      const allPokemons = await fetchAllPokemons();
      setPokemonData(allPokemons);
    };
    fetchPokemons();
  }, []);

 
  useEffect(() => {
    if (!pokemonName) {
      setFilteredPokemons([]);
      return;
    }

    const filtered = pokemonData.filter((pokemon) =>
      pokemon.name.startsWith(pokemonName.toLowerCase())
    );
    setFilteredPokemons(filtered);
  }, [pokemonName, pokemonData]);

  const handleInputChange = (e) => {
    setPokemonName(e.target.value);
  };

  return (
    <div className={styles.pokeinfo}>
      <h1>Find Your Pokemon!</h1>
      <form>
        <input
          type="text"
          value={pokemonName}
          onChange={handleInputChange}
          placeholder="Type Pokémon name..."
        />
      </form>

      <div className={styles.pokemonList}>
        {filteredPokemons.length ? (
          filteredPokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.name}
              pokemonData={{ name: pokemon.name, url: pokemon.url }}
            />
          ))
        ) : (
          <p>No Pokémon found</p>
        )}
      </div>

      {!pokemonName && <p>Enter Pokémon name</p>}
    </div>
  );
}

export default Formulario;
