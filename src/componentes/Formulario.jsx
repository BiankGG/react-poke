import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Formulario.module.css";
import PokemonCard from "./Pokemoncard";

function Formulario() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    if (!pokemonName) {
      setPokemonData(null);
      return;
    }

    const fetchPoke = async () => {
      try {
        const pokemonURL = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
        const newPokemonData = await axios.get(pokemonURL);
        setPokemonData(newPokemonData.data);
      } catch (error) {
        console.error("not getting pokemon");
        setPokemonData(null);
      }
    };
    fetchPoke();
  }, [pokemonName]);

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
          
        />
      </form>

      <PokemonCard pokemonData={pokemonData} />

      {!pokemonData && pokemonName && <p>Pokemon not Found</p>}

      {!pokemonName && <p>Enter pokemon</p>}
    </div>
  );
}

export default Formulario;
