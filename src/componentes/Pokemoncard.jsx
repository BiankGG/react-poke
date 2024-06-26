import React from 'react'
import styles from './Formulario.module.css'

const PokemonCard = ({ pokemonData }) => {
  if (!pokemonData) {
    return null;
  }

  return (
    <div className={styles.infopoke}>
   <h2>{pokemonData.name}</h2>
      <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
      <p>
        TYPE:{" "}
        {pokemonData.types.map((typePoke) => typePoke.type.name).join(" ")}
      </p>
    </div>
  );
};

export default PokemonCard;