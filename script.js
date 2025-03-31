const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_imag');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1; // Variável para armazenar o ID do Pokémon atual

const fetchPokemon = async (pokemon) => {	
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);

    if (data) {   
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; 
        input.value = ''; // Limpa o campo de entrada após a pesquisa
        searchPokemon = data.id; // Atualiza o valor de searchPokemon com o ID do Pokémon encontrado
    }   else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();      
    renderPokemon(input.value.toLowerCase()); // Converte o valor de entrada para minúsculas antes de passar para renderPokemon
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
 
});
 
buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);