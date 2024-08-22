import React, { useEffect, useState } from "react";
import styles from "./Formulario.module.css";
import axios from "axios";

const PokemonCard = ({ pokemonData }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(pokemonData.url);
        setPokemonDetails(response.data);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };

    fetchPokemonDetails();
  }, [pokemonData.url]);

  if (!pokemonDetails) {
    return null;
  }

  return (
    <div className={styles.infopoke}>
      <h2>{pokemonDetails.name}</h2>
      <img
        src={pokemonDetails.sprites.front_default}
        alt={pokemonDetails.name}
      />
      <p>
        TYPE:{" "}
        {pokemonDetails.types.map((typePoke) => typePoke.type.name).join(" ")}
      </p>
    </div>
  );
};

export default PokemonCard;
