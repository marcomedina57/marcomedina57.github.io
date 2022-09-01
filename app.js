
const arregloPokemones = JSON.parse(poke_file);
const containerPokemons = document.getElementById('containerPokemons');
const containerGrid = document.getElementById('grid');
const divMensaje = document.getElementById('mensaje');
let arregloPokemonesFinal = {};
let arregloFinal = [];


const filtrarArray = (obj) => {
    if (!arregloPokemonesFinal[obj["name"]]){
        arregloPokemonesFinal[obj["name"]] = obj;
    }

     arregloFinal = Object.keys(arregloPokemonesFinal).map( (key)  => { 
        return {
        name: arregloPokemonesFinal[key]["name"],
        img: arregloPokemonesFinal[key]["ThumbnailImage"],
        type: arregloPokemonesFinal[key]["type"],
        height: arregloPokemonesFinal[key]["height"]
        }
     });

}

const buscarPokemon = () => {  

    containerPokemons.innerHTML = "";
    const textoBuscar = document.getElementById('buscar').value 

    if (textoBuscar.trim().length === 0) {
        return dibujarPokemones(arregloFinal);
    }
    const pokemonesBuscados = []

    for(let pokemon of arregloFinal){
        if (pokemon.name.trim().toUpperCase().includes(textoBuscar.trim().toUpperCase())){
            pokemonesBuscados.push(pokemon);
        }
    }

    if (pokemonesBuscados.length === 0){
        return divMensaje.innerHTML = `
        <div class="alert alert-danger" role="alert">
        No se encontraron resultados para <b>${textoBuscar}</b>
        </div>
        `
    }
    dibujarPokemones(pokemonesBuscados)
   
}

const dibujarPokemones = ( arreglo) => {
    divMensaje.innerHTML = '';
    for(let poke of arreglo)
    {
        const div = document.createElement('div');

        const pokemon = new Pokemon(poke.name, poke.img, poke.type, poke.height)
       div.classList.add('col');
       div.addEventListener('click', () => {
        mostrarPokemon(pokemon);
       })
       div.innerHTML = `
       <div class="card"">
               <img src="${pokemon.img}" class="card-img-top" alt="...">
               <div class="card-body">
                 <h5 class="text-center card-title">${pokemon.nombre}</h5>
               </div>
             </div>
       `
       containerPokemons.appendChild(div);
       
    }
}

const mostrarPokemon = (pokemon) => {
        let tipo = "";
        for(let i = 0; i < pokemon.tipo.length; i++){
        tipo += `${pokemon.tipo[i]} `;
        }

        Swal.fire({
            title: pokemon.nombre,
            text: `Tipo: ${tipo}, Peso: ${pokemon.peso}`,
            imageUrl: pokemon.img,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
        })
}

const mostrarPokemones = () => {
    

    const pokemones = arregloPokemones.result;
    for(let pokemon of pokemones)
    {
       filtrarArray(pokemon);
      
    }
    
    for(let pk of arregloFinal)
    {
        const pokemon = new Pokemon(pk["name"], pk["img"], pk["type"], pk["height"])
       const div = document.createElement('div');
       div.classList.add('col');
       div.addEventListener('click', () => {
        mostrarPokemon(pokemon);
       })
       div.innerHTML = `
       <div class="card"">
               <img src="${pokemon.img}" class="card-img-top" alt="...">
               <div class="card-body">
                 <h5 class="text-center card-title">${pokemon.nombre}</h5>
               </div>
        </div>
       `
       containerPokemons.appendChild(div);
       
    }

}


// Clases 

class Pokemon {

    constructor(nombre, img, tipo, peso, movimiento){
        this.nombre = nombre;
        this.img = img;
        this.tipo = tipo;
        this.peso = peso;
        this.movimiento = movimiento;
    }

}

// Init
mostrarPokemones();
