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

// all cards
let li = document.getElementsByClassName('game__deck__card');

// username for end modal
let userEnd = localStorage.getItem('username');
// result text for end modal
let result = '';
// highscore old to check against score
let highscoreOld = 0;
let highscoreResult = 0;
// amount of points
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
/**
 * @description shuffles the array with cards randomly
 * @return random shuffled array
 */
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
  // remove class from start modal
  modalsPre[1].classList.remove('modal-show');

  // adds fa-star class to the star elements
  starThree.classList.add('fa-star');
  starTwo.classList.add('fa-star');
  starOne.classList.add('fa-star');

  // adds fa-star class to the star elements
  starThreeEnd.classList.add('fa-star');
  starTwoEnd.classList.add('fa-star');
  starOneEnd.classList.add('fa-star');

  // little timeout before game board and score board are shown
  setTimeout(function() {
    game.classList.add('game-show');
    score.classList.add('score-show');
  }, 400);

  // start the timer
  start();

  // make sure moves are 0
  moves = 0;

  // set innerText to moves
  move.innerText = moves;

  // store shuffled cards in temp array
  shuffledArray = shuffle(cards);

  // loop over each card in the array
  for (let i = 0; i < shuffledArray.length; i++) {
    // create li
    let item = document.createElement('li');

    // create div
    let innerItem = document.createElement('div');

    // set class to li
    item.setAttribute('class', 'game__deck__card');

    // set id to li
    item.setAttribute('id', 'game-card');

    // add img to div as background
    innerItem.style = `background-image: url('${shuffledArray[i]}');`;

    // give each card an id the same as the img name
    innerItem.setAttribute('id', shuffledArray[i].substring(4, 8));

    // add class card to div
    innerItem.setAttribute('class', 'card');

    // add div to li
    item.appendChild(innerItem);

    // add li to ul card-deck
    cardDeck.appendChild(item);

    // add an event listener to the card
    item.addEventListener('click', click);
  }
}

/**
 * @description will pass click over to cardClicked used this to removeEventListener once the card is open
 * Will look for a better solution but this made it work
 */
function click(e) {
  // check if the target that is clicked is the li this because the li has a border if then return and do nothing
  if (e.target.tagName === 'LI') {
    return;
  } else if (e.target.tagName === 'DIV' && e.target.className === 'card') {
    // else if target is div with class card add the open class to the card
    e.target.parentNode.classList.add('game__deck__card-open');
  }
  // call card clicked
  cardClicked(e.target);
}

/**
 * @description will pass click over to cardClicked used this to removeEventListener once the card is open
 * Will look for a better solution but this made it work
 */
function cardClicked(e) {
  // console.log(e);
  // push the open card to a temp array
  openCards.push(e);

  // create temp array with all cards
  let cards = document.getElementsByClassName('game__deck__card');

  // if open cards array length is 1 remove the event listener from that card to prevent a double click
  if (openCards.length === 1) {
    openCards[0].parentNode.removeEventListener('click', click);
  } else if (openCards.length === 2) {
    // temporary remove all event listeners
    for (let i = 0; i < cards.length; i++) {
      cards[i].removeEventListener('click', click);
    }

    // add one to the moves
    moves = moves + 1;

    // update moves inner text
    move.innerText = moves;

    // call count stars to update the scoreboard stars
    countStars(moves);

    // if the two open cards are a match
    if (openCards[0].id === openCards[1].id) {
      // remove the event listener from the second open card
      openCards[1].parentNode.removeEventListener('click', click);

      // add matched class with timeout to allow turn animation to finish
      setTimeout(function() {
        openCards[0].parentNode.classList.add('matched');
        openCards[1].parentNode.classList.add('matched');
        openCards = [];
      }, 500);

      // move cards to matched cards for the count
      matchedCards.push(openCards[0]);
      matchedCards.push(openCards[1]);

      // add the event listener back to the cards after 400ms and then check for a match in the matched cards array to remove the eventListener again from all cards in the matched array to prevent people from clicking the same pair untill they made 8 matches
      for (let i = 0; i < cards.length; i++) {
        setTimeout(function() {
          cards[i].addEventListener('click', click);
        }, 400);
        setTimeout(function() {
          for (let j = 0; j < matchedCards.length; j++) {
            if (matchedCards[j].id === cards[i].firstChild.id) {
              cards[i].removeEventListener('click', click);
            }
          }
        }, 500);
      }

      // if the length of matchedCards = 16 this means all possible pairs have been made and the game can be ended
      if (matchedCards.length === 16) {
        endGame(moves);
      }
    } else {
      // if no match
      // add event listener back to the cards
      setTimeout(function() {
        for (let i = 0; i < cards.length; i++) {
          cards[i].addEventListener('click', click);
        }
      }, 1000);

      // add class not matched
      setTimeout(function() {
        openCards[0].parentNode.classList.add('not-matched');
        openCards[1].parentNode.classList.add('not-matched');
      }, 500);

      // call close card
      setTimeout(closeCard, 1000);
    }
  }
}

/**
 * @description will remove open and not-matched classes and empty the open cards array
 */
function closeCard() {
  for (let i = 0; i < openCards.length; i++) {
    openCards[i].parentNode.classList.remove('game__deck__card-open');
    openCards[i].parentNode.classList.remove('not-matched');
  }

  openCards = [];
}

/**
 * @description when the user made 8 succesful matches
 */
function endGame(moves) {
  // get the username
  userEnd = localStorage.getItem('username');

  // close the scoreboard
  game.classList.remove('game-show');
  // close the card deck
  score.classList.remove('score-show');

  // check how many moves the user made if less than 18 3 stars else between 18-22 2 stars and above 23 1 start
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

  // get the highscore if there is one
  highscoreOld = localStorage.getItem('highscore');

  // if there is a highscore check if current points are greater than the current highscore
  // if this is the case set highscoreResult to points else to highscoreOld
  // and store in localStorage if value is changed
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

  // set only if you played longer than 59 seconds
  if (minutes > 0) {
    document.getElementById('min-end').innerText = minutes + ' minutes ';
  }
  // set seconds innetText
  document.getElementById('sec-end').innerText = second + ' seconds';
  // set username innerText
  document.getElementById('user-end').innerText = userEnd;
  // set amount of moves made
  document.getElementById('moves-end').innerText = moves;
  // set result string
  document.getElementById('result-text').innerText = result;
  // set highscore innerText
  document.getElementById('highscore').innerText = highscoreResult;
  // set score innerText
  document.getElementById('score-results').innerText = points;

  // show the modal
  setTimeout(function() {
    endgame.classList.add('modal-show');
  }, 400);
}

/**
 * @description when called all values are set back to basic values
 */
function reset() {
  // three full stars
  starThree.classList.add('fa-star');
  starTwo.classList.add('fa-star');
  starOne.classList.add('fa-star');

  // empty card deck
  cardDeck.innerHTML = '';

  // empty shuffledArray
  shuffledArray = [];

  // remove the end modal
  endgame.classList.remove('modal-show');

  // empty openCards
  openCards = [];
  // empty matchedCards
  matchedCards = [];

  // timerTime back to 0
  timerTime = 0;

  // seconds back to 0
  seconds = 0;

  // moves back to 0
  moves = 0;

  // points back to 0
  points = 0;

  // show the card deck and scoreboard
  setTimeout(function() {
    game.classList.add('game-show');
    score.classList.add('score-show');
  }, 400);

  // call start game
  startGame();
  // start the timer
  start();
}

/**
 * @description updates stars on the scoreboard during the game
 */
function countStars(moves) {
  if (moves >= 18) {
    starThree.classList.remove('fa-star');

    if (moves >= 23) {
      starTwo.classList.remove('fa-star');
    }
  }
}
