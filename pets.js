const homePageLink = document.querySelector('#home');
const coloradoSheltersLink = document.querySelector('#colorado-shelters');

const currentUserLi = document.querySelector("#current-users");
const currentUserSelect = document.querySelector("#current-user-select");
const currentUserSelectContainer = document.querySelector("#current-user-select-container");
const userDropDown = document.querySelector('#user-dropdown')
const userPageButton = document.querySelector('#go-to-user-page')
const newUserSubmit = document.querySelector('#submit')

const createUser = document.querySelector('#create-user')
const newUserNav = document.querySelector('#new-user-nav')

const availableAnimalContainer = document.querySelector("#available-animals-container")
homePageLink.addEventListener("click", goToHomePage)
coloradoSheltersLink.addEventListener("click", goToSheltersPage)
newUserNav.addEventListener("click", () => {
    hideElement(createUser)
  })

usersURL = "https://denver-pet-finder.herokuapp.com/users"
animalsURL = "https://denver-pet-finder.herokuapp.com/animals"


fetch(usersURL)
    .then(parseJSON)
    .then(addUserOptions)

fetch(animalsURL)
    .then(parseJSON)
    .then(addAnimal)

function addAnimal(animals){
    animals.map(animal => {
        
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

        let animalShelter = document.createElement('h3')
        animalShelter.textContent = `Shelter: ${animal.shelter.name}`

        let animalStatus = document.createElement('h3')
        animalStatus.textContent = 'Status:'+` ${(animal.status)}`.toUpperCase()
        
        animalDetailsContainer.append(animalName, animalAge, animalGender, animalShelter, animalBreed, animalTemperament, animalStatus)
        animalImageContainer.append(animalImage)
        
        animalContainer.append(animalImageContainer, animalDetailsContainer) 
        availableAnimalContainer.append(animalContainer)

        let updateForm = document.createElement('form')

        updateForm.action = `https://denver-pet-finder.herokuapp.com/animals/${animal.id}`
        updateForm.method = "POST"
        updateForm.innerHTML = `
        <input type = "submit" name = "status" value = "Adopted">
        <input type = "hidden" name = "_method" value = "put">
        `        

        let deleteForm = document.createElement('form')

        deleteForm.action = `https://denver-pet-finder.herokuapp.com/animals/${animal.id}`
        deleteForm.method = "POST"
        deleteForm.innerHTML = `
        <input type = "submit" value = "Remove">
        <input type = "hidden" name = "_method" value = "delete">
        `
        animalDetailsContainer.append(updateForm, deleteForm)
    })    
}    


currentUserLi.addEventListener("click", () => {
    hideElement(currentUserSelect)
})

userPageButton.addEventListener('click', goToUserPage)

function parseJSON(response) {
    return response.json()    
}

function addUserOptions(users) {
    users.map(
        user => {
            let userOption = document.createElement('option')
            userOption.innerText = user.name
            userOption.value = user.id
            userDropDown.append(userOption)
        }
    )
}

function goToHomePage() {
    window.location = `https://denver-pet-finder.firebaseapp.com/index.html`
}

function goToSheltersPage() {
    window.location = `https://denver-pet-finder.firebaseapp.com/shelter.html`
}

function goToUserPage(){
    window.location = `https://denver-pet-finder.firebaseapp.com/user.html?id=${userDropDown.value}`
}

function hideElement(element) {
    if (element.style.display == "none") {
        element.style.display = "block";
    }
}


function goToAvailablePets(){
    window.location = `https://denver-pet-finder.firebaseapp.com/pets.html`
  }

