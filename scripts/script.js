const renderPokemonCard = res => {
    const elementCard = document.createElement("div");
    const cardFragmentHtml = '<div class="card"><img src="" class="card-img-top" alt=""><div class="card-body"><p class="card-text"></p></div></div>';
    elementCard.innerHTML = cardFragmentHtml;
    document.querySelector(".card-container").appendChild(elementCard);
    document.querySelector(".card-text").innerHTML = res.name;
    document.querySelector(".card-img-top").src = res.sprites.back_default;
}

const clearContent = () => {
    document.querySelector(".card-container").innerHTML = "";
    document.querySelector(".list-group").innerHTML = "";
}
const renderAlter = (alertText) => {
    const alertElement = document.createElement("div");
    const alertFragment = '<div class="alert alert-danger" role="alert"></div>'
    alertElement.innerHTML = alertFragment;
    document.querySelector(".alert-container").appendChild(alertElement);
    document.querySelector(".alert").innerHTML = alertText;
}


const getSinglePokemon = async search => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${search}`;
        const response = await fetch(url);
        const parsedRes = await response.json();
        clearContent()
        console.log(parsedRes);
        renderPokemonCard(parsedRes);
    }
    catch (error) {
        console.log(error)
        clearContent()
        renderAlter(`something went wrong with your search:${search}`)
    }

}
const renderPokemonList = (res) => {
    res.results.forEach((pokemon, i) => {
        let listElemnt = document.createElement("li");
        listElemnt.classList.add(`pokemon-${i + 1}`, "list-group-item")
        document.querySelector(".list-group").appendChild(listElemnt)
        listElemnt.innerHTML = `<button class="btn btn-link">${pokemon.name}</button>`
        document.querySelector(`.pokemon-${i + 1}`).onclick = () => {
            getSinglePokemon(i + 1);
        }

    });

}

const getAllPokemons = async () => {
    try {
        const url = "https://pokeapi.co/api/v2/pokemon/";
        const response = await fetch(url);
        const parsedRes = await response.json();
        clearContent()
        renderPokemonList(parsedRes);
    } catch (error) {
        console.log(error)
        clearContent()
        renderAlter("something went wrong with your srequest")
    }
}




window.onload = () => {
    document.querySelector("#search-button").addEventListener("click",
        () => {
            const searchTerm = document.querySelector(".form-control").value
            searchTerm && getSinglePokemon(searchTerm);

        })
    document.querySelector("#fetch-all").addEventListener("click",
        () => {
            getAllPokemons()

        })
}
