async function displayPokemon() {
  const inputPokemon = document.getElementById("inputPokemon").value;

  const cardDisplay = document.querySelector(".pokemonCard");
  const pokemonName = document.getElementById("pokemonName");
  const displayPokemonImage = document.getElementById("displayImage");

  const hpDisplay = document.getElementById("hp");
  const attackDisplay = document.getElementById("attack");
  const defenseDisplay = document.getElementById("defense");
  const speedDisplay = document.getElementById("speed");

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${inputPokemon}`
    );

    //    response.ok     --- return TRUE(if found) or FALSE(if not found)
    if (!response.ok) {
      throw new Error("POKEMON NOT FOUND");
    } else {
      const data = await response.json();
      console.log(data);

      const fetchImage = await data.sprites.front_default; // .sprites.front_default ----  Extract image URL from the sprites object

      // STATS
      const hp = await data.stats[0].stat.name;
      const hpStats = await data.stats[0].base_stat;

      const attack = await data.stats[1].stat.name;
      const attackStats = await data.stats[1].base_stat;

      const defense = await data.stats[2].stat.name;
      const defenseStats = await data.stats[2].base_stat;

      const speed = await data.stats[5].stat.name;
      const speedStats = await data.stats[5].base_stat;

      pokemonName.textContent = `${data.name}`;
      hpDisplay.textContent = `${hp}: ${hpStats}`;
      attackDisplay.textContent = `${attack}: ${attackStats}`;
      defenseDisplay.textContent = `${defense}: ${defenseStats}`;
      speedDisplay.textContent = `${speed}: ${speedStats}`;

      displayPokemonImage.src = fetchImage; // .src  ---   to change the source of the image
      cardDisplay.style.display = "block";
    }
  } catch (error) {
    console.error(error);
    pokemonName.textContent = "POKEMON NOT FOUND";
    displayPokemonImage.src = "";
    displayPokemonImage.classList.replace("displayShow", "display"); //go back to display: none;
  }
}
