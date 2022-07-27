'use strict';

// globals

let totalVotes = 25;
let allThings = [];

// local storage

let gotThings = localStorage.getItem('myThings');
// console.log('gotThings', gotThings);

let parsedThings = JSON.parse(gotThings);
console.log(parsedThings);

// dom references

let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
// let resultsBtn = document.getElementById('show-results-btn');
// let resultsList = document.getElementById('results-list');

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

let testInt1 = 0;
let testInt2 = 0;
let testInt3 = 0;

function renderThings() {
  let imgOneIndex = getRandomNumber();
  let imgTwoIndex = getRandomNumber();
  let imgThreeIndex = getRandomNumber();

  while ((imgOneIndex === imgTwoIndex || imgOneIndex === imgThreeIndex || imgTwoIndex === imgThreeIndex || imgOneIndex === testInt1 || imgOneIndex === testInt2 || imgOneIndex === testInt3 || imgTwoIndex === testInt1 || imgTwoIndex === testInt2 || imgTwoIndex === testInt3 || imgThreeIndex === testInt1 || imgThreeIndex === testInt2 || imgThreeIndex === testInt3)) {
    imgTwoIndex = getRandomNumber();
    imgThreeIndex = getRandomNumber();
    imgOneIndex = getRandomNumber();
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
  testInt1 = imgOneIndex;
  testInt2 = imgTwoIndex;
  testInt3 = imgThreeIndex;
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
    renderChart();
    imgContainer.removeEventListener('click', handleClick);

    // STORE JAZZ TO LOCAL STORAGE

    // prep data for storage
    let stringedThings = JSON.stringify(allThings);
    
    // console.log(stringedThings); yah it works
    // now add to local storage
    
    localStorage.setItem('myThings', stringedThings);

    // resultsBtn.addEventListener('click', shareResults);
    // resultsBtn.className = 'clicks-allowed';
    // imgContainer.className = 'no-voting';
  } else {
    renderThings();
  }
}

// function shareResults(){
//   for (let i = 0; i < allThings.length; i++) {
//     let li = document.createElement('li');
//     li.textContent = `${allThings[i].name} had ${allThings[i].votes} votes and was seen ${allThings[i].views} times.`;
//     resultsList.appendChild(li);
//   }
if(gotThings){
  console.log('parsed things', parsedThings);
  //allThings = parsedThings;
  //rebuild things using parsedThings and constructor (in case you have to)
  for (let i=0; i < parsedThings.length; i++){
    if(parsedThings[i].name === 'sweep'){
      let reconThing = new Thing(parsedThings[i].name, 'png');
      reconThing.views = parsedThings[i].views;
      reconThing.votes = parsedThings[i].votes;
    } else {
      let reconThing = new Thing(parsedThings[i].name);
      reconThing.views = parsedThings[i].views;
      reconThing.votes = parsedThings[i].votes;
    }
  }
} else {
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
  new Thing('sweep', 'png');
  new Thing('tauntaun');
  new Thing('unicorn');
  new Thing('water-can');
  new Thing('wine-glass');
}


renderThings();

let canvasElem = document.getElementById('my-chart');

function renderChart() {

  let thingNames = [];
  let thingVotes = [];
  let thingViews = [];
  let thingColor = [];
  let newStep = [];
  // let newColor = []; this is all commented out as i was attempting something you cannot do but i like the spirit of where my mind took me

  for (let j = 0; j < allThings.length; j++) {
    thingNames.push(allThings[j].name);
    thingVotes.push(allThings[j].votes);
    thingViews.push(allThings[j].views);
    // used some of this guys code https://css-tricks.com/snippets/javascript/random-hex-color/
    newStep = Math.floor(Math.random() * 16777215).toString(16);
    thingColor.push(`#${newStep}`);
    // newColor.push(`#1A${newStep}`); //#1A......
  }
  // console.log(thingColor);
  // console.log(newColor);

  let myObj = {
    type: 'bar',
    data: {
      labels: thingNames,
      datasets: [{
        label: '# of Votes',
        data: thingVotes,
        backgroundColor: thingColor,
        borderColor: thingColor,
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: thingViews,
        borderColor: thingColor,
        borderWidth: 1.5
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  new Chart(canvasElem, myObj);
}

imgContainer.addEventListener('click', handleClick);

let butts = document.getElementById('clear');
butts.addEventListener('click', wipeMem);

function wipeMem(){
  localStorage.clear();
  location.reload();
  console.log('hey hey');
}
