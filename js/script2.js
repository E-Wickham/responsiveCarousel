const prev  = document.querySelector('.prev');
const next = document.querySelector('.next');
const track = document.querySelector('.track');
const carousel = document.querySelector('.carousel-inner');
let carouselWidth = carousel.offsetWidth;
let scrWidth = window.innerWidth;
let cardDisplay;

//Declare amount of slides will change space
let slideChange = 1;


// place previous button where it belongs on the slider
prev.style.transform = `translate(-${(carouselWidth + 25)}px, -20px)`;

// identify max number of cards on display based on screenwidth
function widthFinder(){
	 if((scrWidth < 991) && (scrWidth > 768)) {
		cardDisplay = 2;
		next.style.transform='translate(3px,-20px)';
	 } else if (scrWidth < 769) {
		cardDisplay = 1;
		next.style.transform='translate(17px,-20px)';
	 } else {
		cardDisplay = 4;
		next.style.transform='translate(0,-20px)';
	 }
}

//	identify number of divs on display in carousel.
let cards = document.getElementsByClassName('card-container');
let cardCount = cards.length;
//console.log(`Number of divs: ${cardCount}`);

//	if the cardCount is lower than cardDisplay (based on screen size is) then reduce the number of screens on display
function cardScenario() {
	 if (cardCount < cardDisplay) {
		  // change the number of cards to display
		  //4 spots, < 4 cards
		  console.log("less cards than there are spots for cards");
		  track.style.justifyContent = "center";
		  prev.style.display = 'none';
		  next.style.display = 'none';
	 } else if (cardCount == cardDisplay) {
		  //even solution
		  console.log('buttons disappear');
		  track.style.justifyContent = "flex-start";
		  prev.style.display = 'none';
		  next.style.display = 'none';
	 } else {
		  track.style.justifyContent = "flex-start";
		  prev.style.display = 'block';
		  next.style.display = 'block';
	 }
}

window.addEventListener('resize', () => {
  carouselWidth = document.querySelector('.carousel-container').offsetWidth;
  scrWidth = window.innerWidth;
  prev.style.transform = `translate(-${(carouselWidth + 25)}px, -20px)`;
  widthFinder();
  cardScenario();
});

let index = 0;

function infiniteLoop(){
  if (direction === 1|| direction === null) {
    track.prepend(track.lastElementChild);
  } else {
    track.appendChild(track.firstElementChild);
    let c = document.getElementsByClassName("card-container");
    let c3 = c[(cardDisplay-1)];
    c3.style.animation = "append-animate-right .4s";
    c3.addEventListener('animationend', function(){
      c3.style.animation = 'none';
    });
  }
  track.style.transform = 'translate(0)';
};

let direction;

next.addEventListener('click', () => {
  index++;
  direction = -1;
  carousel.style.justifyContent = 'flex-start';
  for (let i =0; i < slideChange; i++) {
  	infiniteLoop();
  }
});

prev.addEventListener('click', () => {
  direction = 1;
  carousel.style.justifyContent = 'flex-end';
  index--;
  for (let i =0; i < slideChange; i++) {
    	infiniteLoop();
  }

});

widthFinder();
cardScenario();