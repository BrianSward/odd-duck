'use strict';
console.log('test');

// globals

let totalVotes = 25;
let allThings = [];

// dom references

let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultsBtn = document.getElementById('show-results-btn');
let resultsList = document.getElementById('results-list');

// constructor

function Thing(name, photoExtension = 'jpg') {
  this.name = name;
  this.photo = `img/${name}.${photoExtension}`;
  this.views = 0;
  this.votes = 0;

  allThings.push(this);
}

Thing.allThings = [];

function getRandomNumber() {
  return Math.floor(Math.random() * allThings.length);
}

function renderThings() {
  let imgOneIndex = getRandomNumber();
  let imgTwoIndex = getRandomNumber();
  let imgThreeIndex = getRandomNumber();

  while (imgOneIndex === imgTwoIndex || imgOneIndex === imgThreeIndex || imgTwoIndex === imgThreeIndex) {
    imgTwoIndex = getRandomNumber();
    imgThreeIndex = getRandomNumber();
  }
  imgOne.alt = allThings[imgOneIndex].name;
  imgOne.src = allThings[imgOneIndex].photo;
  allThings[imgOneIndex].views++;
  imgTwo.src = allThings[imgTwoIndex].photo;
  imgTwo.alt = allThings[imgTwoIndex].name;
  allThings[imgTwoIndex].views++;
  imgThree.alt = allThings[imgThreeIndex].name;
  imgThree.src = allThings[imgThreeIndex].photo;
  allThings[imgOneIndex].views++;
}

function handleClick(event) {
  if (event.target === imgContainer) {
    alert('Please click on an image');
  }
  totalVotes--;
  let imgClicked = event.target.alt;
  for (let i = 0; i < allThings.length; i++) {
    if (imgClicked === allThings[i].name) {
      allThings[i].votes++;
      break;
    }
  }
  if (totalVotes === 0) {
    imgContainer.removeEventListener('click', handleClick);
    resultsBtn.addEventListener('click', shareResults);
    resultsBtn.className = 'clicks-allowed';
    imgContainer.className = 'no-voting';
  } else {
    renderThings();
  }
}

function shareResults(){
  for (let i = 0; i < allThings.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allThings[i].name} had ${allThings[i].votes} votes and was seen ${allThings[i].views} times.`;
    resultsList.appendChild(li);
  }
}

new Thing('bag');
new Thing('banana');
new Thing('bathroom');
new Thing('boots');
new Thing('breakfast');
new Thing('bubblegum');
new Thing('chair');
new Thing('cthulhu');
new Thing('dog-duck');
new Thing('dragon');
new Thing('pen');
new Thing('pet-sweep');
new Thing('scissors');
new Thing('shark');
new Thing('sweep','png');
new Thing('tauntaun');
new Thing('unicorn');
new Thing('water-can');
new Thing('wine-glass');

renderThings();

imgContainer.addEventListener('click', handleClick);
