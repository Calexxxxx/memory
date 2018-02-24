// modals
const modalPre = document.getElementsByClassName('modal__pre');
const modalsPre = [...modalPre];

// username
const username = document.getElementById('username');
const user = localStorage.getItem('username');
const displayUsername = document.getElementById('display-username');

// game window
const game = document.getElementById('game');
const score = document.getElementById('score');

// store the open cards in an array
let openCards = [];

// push all matched cards in an array
let matchedCards = [];

// get all star items
const starOne = document.getElementById('star-one');
const starTwo = document.getElementById('star-two');
const starThree = document.getElementById('star-three');

const starOneEnd = document.getElementById('star-one-end');
const starTwoEnd = document.getElementById('star-two-end');
const starThreeEnd = document.getElementById('star-three-end');

// timing functions
let min = document.getElementById('min');
let sec = document.getElementById('sec');
let minutes;
let second;
let timerActive = false;
let timerTime = 0;
let seconds = 0;

// move counts
let move = document.getElementById('move');
let moves = 0;

// cards a total of 16 cards each image is added twice to create pairs
const cards = [
  'img/img1.jpg',
  'img/img1.jpg',
  'img/img2.jpg',
  'img/img2.jpg',
  'img/img3.jpg',
  'img/img3.jpg',
  'img/img4.jpg',
  'img/img4.jpg',
  'img/img5.jpg',
  'img/img5.jpg',
  'img/img6.jpg',
  'img/img6.jpg',
  'img/img7.jpg',
  'img/img7.jpg',
  'img/img8.jpg',
  'img/img8.jpg'
];

// store the shuffled cards in an array
let shuffledArray = [];

// get the card deck
let cardDeck = document.getElementById('card-deck');

// end game modal
let endgame = document.getElementById('end-game');

let li = document.getElementsByClassName('game__deck__card');

let userEnd = localStorage.getItem('username');
let result = '';

let highscoreOld = 0;
let highscoreResult = 0;
let points = 0;

/**
 * @description Loads the first modal when DOMContent is loaded
 */
document.addEventListener('DOMContentLoaded', function(evt) {
  // loads the first modal when DOMContent is loaded with a little timeout for the animation
  setTimeout(function() {
    // adds class modal show to the first modal
    modalsPre[0].classList.add('modal-show');
  }, 600);
});

/**
 * @description Loads startGame modal and sets the username
 */
function setUsername() {
  // set the username
  if (!username.value) {
    localStorage.setItem('username', 'Guest');
  } else {
    localStorage.setItem('username', username.value);
  }

  modalsPre[0].classList.remove('modal-show');
  setTimeout(function() {
    modalsPre[1].classList.add('modal-show');
  }, 400);
  displayUsername.innerHTML = localStorage.getItem('username');
}

/**
 * @description start the timer
 */
function start() {
  if (timerActive) {
    return;
  }
  timerActive = true;
  seconds = setInterval(timer, 1000);
}

/**
 * @description timer function
 */
function timer() {
  timerTime++;
  min.innerText = add(Math.floor(timerTime / 60));
  sec.innerText = add(timerTime % 60);
  minutes = min.innerHTML;
  second = sec.innerHTML;
}

/**
 * @description add a 0 to the timer if less than 10
 */
function add(time) {
  if (time < 10) {
    return `0${time}`;
  }
  return time;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

/**
 * @description will start the selected game mode
 */
function startGame() {
  modalsPre[1].classList.remove('modal-show');

  starThree.classList.add('fa-star');
  starTwo.classList.add('fa-star');
  starOne.classList.add('fa-star');

  starThreeEnd.classList.add('fa-star');
  starTwoEnd.classList.add('fa-star');
  starOneEnd.classList.add('fa-star');

  setTimeout(function() {
    game.classList.add('game-show');
    score.classList.add('score-show');
  }, 400);

  start();

  moves = 0;

  move.innerText = moves;

  shuffledArray = shuffle(cards);

  for (let i = 0; i < shuffledArray.length; i++) {
    let item = document.createElement('li');
    let innerItem = document.createElement('div');
    item.setAttribute('class', 'game__deck__card');
    item.setAttribute('id', 'game-card');
    innerItem.style = `background-image: url('${shuffledArray[i]}');`;
    innerItem.setAttribute('id', shuffledArray[i].substring(4, 8));
    innerItem.setAttribute('class', 'card');
    item.appendChild(innerItem);
    cardDeck.appendChild(item);
    item.addEventListener('click', click);
  }
}

function click(e) {
  if (e.target.tagName === 'LI') {
    return;
  } else if (e.target.tagName === 'DIV' && e.target.className === 'card') {
    e.target.parentNode.classList.add('game__deck__card-open');
  }

  cardClicked(e.target);
}

function cardClicked(e) {
  openCards.push(e);

  let cards = document.getElementsByClassName('game__deck__card');

  if (openCards.length === 1) {
    openCards[0].parentNode.removeEventListener('click', click);
  } else if (openCards.length === 2) {
    for (let i = 0; i < cards.length; i++) {
      cards[i].removeEventListener('click', click);
    }

    moves = moves + 1;

    move.innerText = moves;

    countStars(moves);

    if (openCards[0].id === openCards[1].id) {
      openCards[1].parentNode.removeEventListener('click', click);

      setTimeout(function() {
        openCards[0].parentNode.classList.add('matched');
        openCards[1].parentNode.classList.add('matched');
        openCards = [];
      }, 500);

      matchedCards.push(openCards[0]);
      matchedCards.push(openCards[1]);

      for (let i = 0; i < cards.length; i++) {
        setTimeout(function() {
          cards[i].addEventListener('click', click);
        }, 400);
      }

      if (matchedCards.length === 16) {
        endGame(moves);
      }
    } else {
      setTimeout(function() {
        for (let i = 0; i < cards.length; i++) {
          cards[i].addEventListener('click', click);
        }
      }, 1000);

      setTimeout(function() {
        openCards[0].parentNode.classList.add('not-matched');
        openCards[1].parentNode.classList.add('not-matched');
      }, 500);

      setTimeout(closeCard, 1000);
    }
  }
}

function closeCard() {
  for (let i = 0; i < openCards.length; i++) {
    openCards[i].parentNode.classList.remove('game__deck__card-open');
    openCards[i].parentNode.classList.remove('not-matched');
  }

  openCards = [];
}

function endGame(moves) {
  game.classList.remove('game-show');
  score.classList.remove('score-show');

  if (moves < 18) {
    // full star
    starThreeEnd.classList.add('fa-star');
    // full star
    starTwoEnd.classList.add('fa-star');
    // full star
    starOneEnd.classList.add('fa-star');

    result = `Awesome!!!! ${userEnd} you master this.`;

    points = Math.floor(11000 / moves);
  } else if (moves >= 18 && moves <= 22) {
    // no star
    starThreeEnd.classList.remove('fa-star');
    // full star
    starTwoEnd.classList.add('fa-star');
    // full star
    starOneEnd.classList.add('fa-star');

    result = `Great Job, ${userEnd} you Won!!!`;

    points = Math.floor(10000 / moves);
  } else if (moves >= 23) {
    // no star
    starThreeEnd.classList.remove('fa-star');
    // no star
    starTwoEnd.classList.remove('fa-star');
    // full star
    starOneEnd.classList.add('fa-star');

    result = `Nice ${userEnd}, keep practicing!`;

    points = Math.floor(9000 / moves);
  }

  highscoreOld = localStorage.getItem('highscore');

  if (highscoreOld) {
    if (highscoreOld > points) {
      highscoreResult = highscoreOld;
    } else {
      highscoreResult = points;

      localStorage.setItem('highscore', points);
    }
  } else {
    highscoreResult = points;

    localStorage.setItem('highscore', points);
  }
  console.log(minutes);

  if (minutes > 0) {
    document.getElementById('min-end').innerText = minutes + ' minutes ';
  }
  document.getElementById('sec-end').innerText = second + ' seconds';

  document.getElementById('user-end').innerText = userEnd;

  document.getElementById('moves-end').innerText = moves;

  document.getElementById('result-text').innerText = result;

  document.getElementById('highscore').innerText = highscoreResult;

  document.getElementById('score-results').innerText = points;

  setTimeout(function() {
    endgame.classList.add('modal-show');
  }, 400);
}

function reset() {
  starThree.classList.add('fa-star');
  starTwo.classList.add('fa-star');
  starOne.classList.add('fa-star');

  cardDeck.innerHTML = '';

  shuffledArray = [];

  endgame.classList.remove('modal-show');

  openCards = [];
  matchedCards = [];

  timerTime = 0;
  seconds = 0;

  moves = 0;

  points = 0;

  setTimeout(function() {
    game.classList.add('game-show');
    score.classList.add('score-show');
  }, 400);
  startGame();
  start();
}

function countStars(moves) {
  if (moves >= 18) {
    starThree.classList.remove('fa-star');

    if (moves >= 23) {
      starTwo.classList.remove('fa-star');
    }
  }
}
