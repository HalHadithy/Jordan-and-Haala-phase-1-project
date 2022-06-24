let clientContact = {}
let clientObject = {}

// Grab DOM elements
const carouselSlide = document.querySelector(".carousel-slide");
const carouselImages = document.querySelectorAll(".carousel-slide img");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const carouselPhotos = document.querySelectorAll(".event-photos")
const additionalPhotos = document.querySelector("#additional-photos")

const content = document.querySelector("body")
const darkBtn = document.querySelector("#dark-change");

const newClientFrm = document.querySelector('#new-client')
const newClientName = document.querySelector("#client-name")
const newClientEmail = document.querySelector('#client-email')
const newClientNumber = document.querySelector('#client-number')
const newClientInspo = document.querySelector('#client-inspo')
const newClientComment = document.querySelector('#client-comment')

const couplesBanner = document.querySelector('.couples-details')
const eventNameLoc = couplesBanner.querySelector(".event-name")
const eventDescriptionLoc = couplesBanner.querySelector(".event-description")
const eventLocationLoc = couplesBanner.querySelector(".event-location")



fetch('http://localhost:3000/eventComponents')
  .then(response => response.json())
  .then(showCoupleImages)



function showCoupleImages(coupleDatabase){
    showDetailedInfo(coupleDatabase[0])
    coupleDatabase.forEach(createCoupleImage)

}

//creating the banner images for each event, and adding a click event to make the ramen 
function createCoupleImage(e,index){
    console.log(carouselPhotos[index])
    carouselPhotos[index].src = e.eventPhotos [0]
    carouselPhotos[index].addEventListener('click', () => showDetailedInfo(e))
}


function showDetailedInfo(e){
    removeAllChildNodes(additionalPhotos)

    clientObject =e
    eventNameLoc.textContent = clientObject.eventName
    eventDescriptionLoc.textContent = clientObject.eventDescription
    eventLocationLoc.textContent = clientObject.eventLocation
    showEventPhotos(clientObject.eventPhotos)
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


function showEventPhotos(array){ 
    array.forEach((photo)=>{
        let cImage = document.createElement('img')
        let cDiv = document.createElement('div')
        cImage.src = photo
        cImage.class = "removable-photos"
        additionalPhotos.append(cDiv)
        cDiv.append(cImage)
    })
}



// Keep track of which image we're currently on in carousel
let counter = 0;

// Grab image width so we know how much to move across screen
const size = (carouselImages[0].clientWidth* 0.25);

// Start on first image - not duplicate(not #last-clone)
// Move one photo forward
carouselSlide.style.transform = `translateX(${-size * counter}px)`;

// Checks counter value against length of img array (-1 to account for clone) to follow position of images on screen
// Once we reach end of image array, jump back to start (carouselImages.length - counter)
// Add transition styling and timing
nextBtn.addEventListener('click', () => {
    console.log("carouselImages.length: ", carouselImages.length);
    console.log("counter: ", counter);
    // Make transition instant - avoids bug of scrolling through images too fast,
    // scrolling too fast will display no image,
    // no image === undefined, throwing an ref error
    console.log(carouselImages.length)
    if(counter >= carouselImages.length - 1) {
        counter = carouselImages.length - counter;
        return;
    }
    console.log("Clicked!");//DO NOT REMOVE -- FN BREAKS WITHOUT CONSOLE.LOG(), I DON'T KNOW WHY.

    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter ++;
    carouselSlide.style.transform = `translateX(${-size * counter}px)`;
}); 

prevBtn.addEventListener('click', () => {
    if(counter <=0) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter --;
    carouselSlide.style.transform = `translateX(${-size * counter}px)`;
    console.log("Clicked!");//DO NOT REMOVE -- FN BREAKS WITHOUT CONSOLE.LOG(), I DON'T KNOW WHY.
}); 



// Darkmode -- toggle CSS class to apply styling on btn click. 
darkBtn.addEventListener('click', () => {
    darkBtn.classList.toggle('active');
    content.classList.toggle('night');
})




//adding client info 
newClientFrm.addEventListener('submit', clickEvent => {
    clickEvent.preventDefault()

    clientContact = {
        "name": newClientName.value,
        "email": newClientEmail.value,
        "number": newClientNumber.value,
        "inspo": newClientInspo.value,
        "comment": newClientComment.value
    }
    newClientFrm.reset() 
})

