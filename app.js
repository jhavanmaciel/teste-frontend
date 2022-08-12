const pokelist = document.querySelector(".pokelist-container");
let j;
let minVal = document.querySelector("#min");
let maxVal = document.querySelector("#max");
let botao = document.querySelector("#filterBtn");
let nextBtn = document.createElement("button");
let prevBtn = document.createElement("button");
let loadBtn = document.createElement("button");
loadBtn.innerHTML = "Mais Pokemons";
nextBtn.innerHTML = ">> " + j;
nextBtn.classList.add("Btns");
prevBtn.classList.add("Btns");
loadBtn.classList.add("Btns");
let selectValue =document.querySelector("#quantity").options[document.querySelector("#quantity").selectedIndex].value;
let totalVal = document.querySelector("#maxValue").value;

nextBtn.addEventListener("click", function nextPage() {

    j++;
    console.log(j);
    if (minVal >= maxVal - selectValue) {
    alert("Final da Lista");
    return;
  }
 

  document.querySelector(".btn-container").appendChild(prevBtn);
  nextBtn.innerHTML =   j + " >>";
  if(j>1){
    prevBtn.style.display = 'block';
  }
  
  prevBtn.innerHTML = "<< " + (j - 1);
  minVal = parseFloat(minVal) + parseFloat(selectValue);
  fetchPokemon();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
prevBtn.addEventListener("click", function previousPage() {
     j--;
 
    if(j<=1){
      prevBtn.style.display = 'none';
  }
  document.querySelector(".btn-container").appendChild(prevBtn);
  minVal = parseFloat(minVal) - parseFloat(selectValue);
  nextBtn.innerHTML =   j + " >>";
  prevBtn.innerHTML = "<< " + (j - 1);

  fetchPokemon();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
loadBtn.addEventListener('click',function loadMore(){
  selectValue = (parseFloat(selectValue)+parseFloat(selectValue));
  fetchPokemon();
  window.scrollTo({ bottom: 40, behavior: 'smooth' });
  })

const fetchPokemon = () => {
  const promises = [];

  for (let i = minVal; i < parseFloat(minVal) + parseFloat(selectValue); i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
   
    promises.push(fetch(url).then((res) => res.json()));
  }
  Promise.all(promises).then((results) => {
    const pokemon = results.map((result) => ({
      name: result.name,
      image: result.sprites["front_default"],
      types: result.types.map((t) => t.type.name),
      hp: result.stats[0].base_stat,
      atk: result.stats[1].base_stat,
      def: result.stats[2].base_stat,
      spAtk: result.stats[3].base_stat,
      spDef: result.stats[4].base_stat,
      speed: result.stats[5].base_stat,
      id: result.id,
    }));

    displayPokemon(pokemon);
  });
};
let total;
const displayPokemon = (pokemon) => {
  console.log(pokemon);

  const pokemonHTMLString = pokemon
    .map(
      (newPokemon) =>
        (total = `
             
        <div class="pokemon ${newPokemon.types[0]}card">
            
            <h2 class="pokemon-title">#${newPokemon.id} ${newPokemon.name}</h2>
            <div class="image-container">
            <a href="https://www.pokemon.com/br/pokedex/${newPokemon.id}" target="_blank"><img class="card-image" src="${newPokemon.image}"/></a>          
            </div>
            <div class="stats-container"> 
            <p> HP: ${newPokemon.hp}</p>
            <p> Attack: ${newPokemon.atk}</p>
            <p> Defense: ${newPokemon.def}</p>
            <p> Sp. Atk: ${newPokemon.spAtk}</p>
            <p> Sp. Def: ${newPokemon.spDef}</p>
            <p> Speed: ${newPokemon.speed}</p>
            <p class="total"> Total: ${
              newPokemon.hp +
              newPokemon.atk +
              newPokemon.def +
              newPokemon.spAtk +
              newPokemon.spDef +
              newPokemon.speed
            }</p>
            </div>
            <span class="types-container">
            ${newPokemon.types.map((type) => `<span class="types ${type}"> ${type} </span>`)
              .join("")}
            </span>
        </div>
         `)
    )
    .join("");

  pokelist.innerHTML = pokemonHTMLString;
};
function filter() {
  j = 1;

  let btnContainer = document.querySelector(".btn-container");
    if(btnContainer.length > 0){

    }
  minVal = document.querySelector("#min").value;
  maxVal = document.querySelector("#max").value;

  // validações

  if (parseFloat(minVal) > parseFloat(maxVal)) {
    alert("O valor minimo não pode ser maior que o valor máximo!");
    return;
  }

  if (parseFloat(minVal) > (898)) {
    alert("Ainda não existem tantos Pokemons!");
    return;
  }

  if (parseFloat(maxVal) > (898)) {
    alert("Ainda não existem tantos Pokemons!");
    return;
  }

  if (minVal.length <=0) {
    alert("Insira o valor mínimo!");
    return;
  }
  if (maxVal.length <=0) {
    alert("Insira o valor máximo!");
    return;
  }
 

  if (document.querySelector("#quantity").value == 0) {
    selectValue = parseFloat(maxVal - minVal);
    console.log(selectValue);
    fetchPokemon();
    return;
  }

  if (document.querySelector("#lists").value == 1) {
    btnContainer.appendChild(loadBtn);
    loadBtn.style.display = "block";
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
    selectValue = document.querySelector("#quantity").options[document.querySelector("#quantity").selectedIndex].value;
    fetchPokemon();
    return;
  } else{
    loadBtn.style.display = "none";
  }

  selectValue = document.querySelector("#quantity").options[document.querySelector("#quantity").selectedIndex].value;
  btnContainer.appendChild(nextBtn);
  nextBtn.style.display = "block";
  btnContainer.appendChild(prevBtn);
  prevBtn.style.display = "none";
  nextBtn.innerHTML =   j + " >>";
  fetchPokemon();
}
botao.addEventListener("click", filter);
