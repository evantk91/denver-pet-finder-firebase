const shelterContainer = document.querySelector(".shelter-container") 
const petsLink = document.querySelector("#browse-pets")
const home = document.querySelector('#home')
const footer = document.querySelector('#footer')
const currentUser = document.querySelector("#current-users")
const currentUserSelect = document.querySelector("#current-user-select")
const currentUserSelectContainer = document.querySelector("#current-user-select-container")
const userDropDown = document.querySelector('#user-dropdown')
const createUser = document.querySelector("#create-user")
const newUserNav = document.querySelector("#new-user-nav")
const userPageButton = document.querySelector("#go-to-user-page")

document.addEventListener('DOMContentLoaded', () => {
    home.addEventListener("click", goHome)
    userPageButton.addEventListener("click", goToUserPage)
    createUserOptions()
    petsLink.addEventListener('click', goToAvailablePets)
    fetchShelters()
    
})

function fetchShelters(){
    fetch('http://localhost:3000/shelters')
        .then(response => response.json())
        .then(shelterDetails)
}

    



function shelterDetails(shelters){
    shelters.forEach(shelterCardCreator)
}

function shelterCardCreator(shelter){
    let shelterCard = document.createElement('shelter-card')
    shelterCard.className = 'shelter-card'
    shelterCard.id = shelter.id
    let shelterClicker = document.createElement('section')
    let shelterName = document.createElement('h3')
    let shelterImage = document.createElement('img')
    let shelterMap = document.createElement('h5')
    shelterMap.innerHTML = `<a href="https://www.google.com/maps/place/${shelter.address}">${shelter.address}<a/>`
    shelterMap.className = 'shelter-map'
    shelterImage.src = shelter.image
    shelterImage.className = "shelter-image"
    shelterClicker.className = "shelter-clicker"
    shelterName.innerText = shelter.name
    shelterCard.append(shelterClicker, shelterMap)
    shelterClicker.append(shelterName, shelterImage)
    shelterContainer.append(shelterCard)
    shelterClicker.addEventListener('click', () => {
        visitShelterWebsite(shelter)

    })
}

function goHome(){
    window.location = "http://localhost:3001/"
}
function createUserOptions(){
    fetch("http://localhost:3000/users")
        .then(response => response.json())
        .then(users => users
                .map(user=> {
                    let userOption = document.createElement('option')
                    userOption.innerText = user.name
                    userOption.value = user.id 
                    userDropDown.append(userOption)
    }))
}


function goToUserPage(){
  window.location = `http://localhost:3001/user.html?id=${userDropDown.value}`
}

function goToShelterPage(){
  window.location = `http://localhost:3001/shelter.html`
}

function goToAvailablePets(){
  window.location = `http://localhost:3001/pets.html`
}


currentUser.addEventListener("click", () => {
    hideElement(currentUserSelect)
  })

newUserNav.addEventListener("click", () => {
    hideElement(createUser)
})

  
  
function hideElement(element) {
    if (element.style.display === "none") {
    element.style.display = "block";
    }
}

function visitShelterWebsite(shelter){
    window.location = `${shelter.link}`
}
function searchShelterAddress(shelter){
    document.window = `${shelter.address}`
}
