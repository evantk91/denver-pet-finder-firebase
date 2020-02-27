const param = new URLSearchParams(window.location.search)
const id = param.get('id')

const userHeader = document.querySelector('.user-header');
const homePageLink = document.querySelector('#home-page');
const browseAnimalsLink = document.querySelector('#browse-pets');
const coloradoSheltersLink = document.querySelector('#colorado-shelters');

const favoritesHeader = document.querySelector('#favorite-animals-header');
const favoriteAnimalsContainer = document.querySelector('#favorite-animals-container');
const favoritesDropDown = document.querySelector("#favorites-dropdown")
const addUserAnimal = document.querySelector("#add-useranimal-form")

document.addEventListener('DOMContentLoaded', () => {
    fetchAnimals()
    homePageLink.addEventListener("click", goToHomePage)
    browseAnimalsLink.addEventListener("click", goToBrowseAnimals)
    coloradoSheltersLink.addEventListener("click", goToShelters)
})

fetch(`https://denver-pet-finder.herokuapp.com/users/${id}`)
    .then(parseJSON)
    .then(user => {
        (displayUser(user))
        let userId = document.querySelector('#user_id')
        userId.value = id 
        
    })




function displayUser(user) {
    let h1 = document.createElement('h1')
    h1.innerText = `${user.name}\'s Favorite Animals:`
    userHeader.appendChild(h1)

    user.animals.map(animal => {
        
        let animalContainer = document.createElement('section')
        animalContainer.classList = "animal-container"
        let animalDetailsContainer = document.createElement('section')
        animalDetailsContainer.classList = "animal-details-container"
        let animalImageContainer = document.createElement('section')
        animalImageContainer.classList = "animal-image-container"

        let animalImage = document.createElement('img')
        animalImage.classList = "animal-image"
        animalImage.src = animal.picture
        
        let animalName = document.createElement('h3')
        animalName.textContent = animal.name
        
        let animalAge = document.createElement('h3')
        animalAge.textContent = `Age: ${animal.age}`

        let animalGender = document.createElement('h3')
        animalGender.textContent = `${animal.gender}`

        let animalBreed = document.createElement('h3')
        animalBreed.textContent = `Breed: ${animal.breed}`

        let animalTemperament = document.createElement('h3')
        animalTemperament.textContent = `Characteristics: ${animal.temperament}`

        let animalStatus = document.createElement('h3')
        animalStatus.textContent = 'Status:'+` ${(animal.status)}`.toUpperCase()
        
        animalDetailsContainer.append(animalName, animalAge, animalGender, animalBreed, animalTemperament, animalStatus)
        animalImageContainer.append(animalImage)
        
        animalContainer.append(animalImageContainer, animalDetailsContainer) 
        favoriteAnimalsContainer.append(animalContainer)
        
        if (animal.status.toUpperCase() === "AVAILABLE"){
            console.log(animal)
            let headToShelter = document.createElement('h4')
            headToShelter.innerHTML = `<a href="https://www.google.com/maps/place/${animal.shelter.address}">Adopt ${animal.name}?<a/>`
            animalDetailsContainer.append(headToShelter)
        } 


    })  
}

function addAnimalOptions(animal){
    let animalOption = document.createElement('option')
    animalOption.innerText = animal.name
    animalOption.value = animal.id 
    favoritesDropDown.append(animalOption)
}

function fetchAnimals(){
    fetch('https://denver-pet-finder.herokuapp.com/animals/')
        .then(parseJSON)
        .then(animals => {
            animals.map(addAnimalOptions)
})
}



function parseJSON(response) {
    return response.json()
}

function goToHomePage() {
    window.location = `https://denver-pet-finder.firebaseapp.com/index.html`
}

function goToBrowseAnimals() {
    window.location = `https://denver-pet-finder.firebaseapp.com/pets.html`
}

function goToShelters() {
    window.location = `https://denver-pet-finder.firebaseapp.com/shelter.html`
}