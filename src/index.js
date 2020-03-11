console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

document.addEventListener('DOMContentLoaded', function() {
  getPictures();
  getBreeds();

  let h = document.querySelector('h1');
  colorClick(h);

  filter();
})

let getPictures = () => {
  fetch(imgUrl)
  .then(resp => resp.json())
  .then(json => showImages(json['message']))
}

let showImages = (array) => {
  array.map(image => {
    addImage(image);
  })
}

let addImage = (imgUrl) => {
  const div = document.getElementById('dog-image-container'); //why can't this be outside addImage()?

  const newImg = document.createElement('img');
  newImg.src = imgUrl;
  // debugger
  div.append(newImg);
}

let getBreeds = () => {
  fetch(breedUrl)
  .then(resp => resp.json())
  // .then(json => console.log(Object.keys(json['message'])))
  .then(json => showBreeds(Object.keys(json['message'])))
}

let showBreeds = (array) => {
  array.map(breed => {
    addBreed(breed);
  })
}

let addBreed = (breed) => {
  //create
  const list = document.getElementById('dog-breeds');
  const newBreed = document.createElement('li');
  newBreed.innerText = breed;
  colorClick(newBreed);
  list.append(newBreed);
}

let colorClick = (el) => {
  el.addEventListener('click', function() {
    el.style.color = "green";
  })
}

let filter = () => {
  const dropdown = document.getElementById('breed-dropdown');
  const defaultOption = document.createElement('option');
  defaultOption.innerText = "--";
  dropdown.prepend(defaultOption);
  defaultOption.selected = true;

  dropdown.addEventListener('change', e => {
    let letter = e.target.value;
    const breeds = Array.from(document.getElementById('dog-breeds').children);
    debugger

    for (const breed of breeds) {
      if (letter === "--") {
        breed.style.display = ""
      } else if (breed.innerText[0] !== letter) {
        breed.style.display = "none";
      } else {
        breed.style.display = "";
      }
    }
  })
}