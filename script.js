const inputSearch = document.getElementById("SearchInput");
const btnConfirm = document.getElementById("ConfirmBtn");
const showPokemon = document.getElementById("ShowPokemon");

btnConfirm.addEventListener("click", () => {
    let pokemon_id = Number(inputSearch.value.trim());

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_id}/`)
        .then(response => {
            if(!response.ok) {
                if(pokemon_id > 1000) {
                    showPokemon.innerHTML = ""
                    let newDiv = document.createElement("div");
                    let newP = document.createElement("p");

                    newDiv.className = "ContainerError";
                    newP.className = "ErrorMsg";

                    newP.innerText = "No pokemon that youre looking for..."
                    
                    document.body.appendChild(newDiv);
                    newDiv.appendChild(newP);
                }
                throw new Error("Could not fetch");
            }

            return response.json()
        })
        .then(pokemon => {
            if(document.querySelector(".ContainerError")) {
                let divErrorContainer = document.querySelector(".ContainerError");
                divErrorContainer.innerHTML = ""
            }
            let pokemonContainer = document.createElement("div");
            let pokemonId = document.createElement("p");
            let pokemonName = document.createElement("p");
            let image_pokemonElement = document.createElement("img");
            let pokemonElement = document.createElement("p");
            
            pokemonContainer.className = "PokemonContainer";
            pokemonId.className = "PokemonId";
            pokemonName.className = "PokemonName";
            pokemonElement.className = "PokemonElement";
            image_pokemonElement.src = pokemon.sprites.front_default
            pokemonElement.innerText =  pokemon.types[0].type.name;
            pokemonId.innerText = "Id: "+pokemon.id;
            pokemonName.innerText = pokemon.name;            
            showPokemon.innerHTML = ""
            showPokemon.appendChild(pokemonContainer);
            pokemonContainer.appendChild(pokemonId);
            pokemonContainer.appendChild(pokemonName);
            pokemonContainer.appendChild(pokemonElement);
            pokemonContainer.appendChild(image_pokemonElement);
            
            
        })
        .catch(Error => console.error(Error))
}); 