const urlParams = new URLSearchParams(window.location.search)
const pokemonId = urlParams.get('id')

const urlBaseApi = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`

async function loadDeatilsPokemon(){
    try {
        const response = await fetch(urlBaseApi)
        const pokmeon = await response.json()

        exibirPokemon(pokmeon)
    } catch (error) {
        console.error('Erro ao carregar detalhes do Pokémon:', error)
    }
}


function exibirPokemon(pokemon){
    const container = document.getElementById('pokemonDetalhes')

    container.innerHTML = `
        <li class="detailItem ${pokemon.types[0].type.name}">
            <a href="index.html" class="btnVoltar">
               &larr;
            </a>  
            <h1 class="detailName">${pokemon.name}</h1>
            <h2 class="detailNumber">#${String(pokemon.id).padStart(3, '0')}</h2>
            <img class="detailImage" src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
        </li>

        <div class="detailInfo">
            
            <p><strong>Height:</strong> ${pokemon.height / 10} m</p>
            <p><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>
            <p><strong>Types:</strong> ${pokemon.types.map(type => type.type.name).join(', ')}</p>
            <p><strong>Abilities:</strong> ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
        </div>

    
    `
}

loadDeatilsPokemon()