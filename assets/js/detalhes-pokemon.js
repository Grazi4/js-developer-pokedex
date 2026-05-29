const urlParams = new URLSearchParams(window.location.search)
const pokemonId = urlParams.get('id')
const urlBaseApi = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`


const buttons = document.querySelectorAll('.btnTab')
const contents = document.querySelectorAll('.tabContentItem')

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

            <div class="detailTypes">
                ${pokemon.types.map(type => `<span class="detailType ${type.type.name}">${type.type.name}</span>`).join(' ')}
            </div>

            <img class="detailImage" src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
        </li>


        <div class="detailInfo">

             <div class="tabsMenu">
                <button class="btnTab btnTabActive" data-tab="aboutTab">About</button>
                <button class="btnTab" data-tab="baseStatsTab">Base Status</button>
                <button class="btnTab" data-tab="evolutionTab">Evolution</button>
                <button class="btnTab" data-tab="movesTab">Moves</button>
            </div>

            <div class="tabsContent">
        
                <div id="aboutTab" class="tabContentItem tabContentActive">
                    <p><strong>Height:</strong> ${pokemon.height / 10} m</p>
                    <p><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>
                    <p><strong>Abilities:</strong> ${pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
                    <p><strong>Moves:</strong> ${pokemon.moves.slice(0, 5).map(m => m.move.name).join(', ')}...</p>
                </div>

        
                <div id="baseStatsTab" class="tabContentItem">
                    <p>HP: 45</p>
                    <p>Attack: 49</p>
                </div>

      
                <div id="evolutionTab" class="tabContentItem">
                    <p>Evolves to Ivysaur at Level 16.</p>
                </div>

             </div>



            
        </div>

    
    `
}

loadDeatilsPokemon()


buttons.forEach(button => {
  button.addEventListener('click', () => {

    buttons.forEach(btn => btn.classList.remove('btnTabActive'));
    contents.forEach(content => content.classList.remove('tabContentActive'));
    
    button.classList.add('btnTabActive');
    
    const targetTabId = button.getAttribute('data-tab');

    document.getElementById(targetTabId).classList.add('tabContentActive');
  })
})