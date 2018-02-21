// modals
const modalPre = document.getElementsByClassName('modal__pre');
const modalsPre = [...modalPre];

const username = document.getElementById('username');
const user = localStorage.getItem('username');
const displayUsername = document.getElementById('display-username');

/**
 * @description Loads the first modal when DOMContent is loaded
 */
document.addEventListener('DOMContentLoaded', function(evt) {
  setTimeout(function() {
    modalsPre[0].classList.add('modal-show');
  }, 400);
});

/**
 * @description Loads username modal and check if a username is stored already
 */
function userName() {
  modalsPre[0].classList.remove('modal-show');
  setTimeout(function() {
    modalsPre[1].classList.add('modal-show');
  }, 400);
  if (user) {
    username.setAttribute('value', user);
  } else {
    username.setAttribute('value', 'Guest');
  }
}

function gameMode() {
  // set the username
  localStorage.setItem('username', username.value);

  modalsPre[1].classList.remove('modal-show');
  setTimeout(function() {
    modalsPre[2].classList.add('modal-show');
  }, 400);
  displayUsername.innerHTML = localStorage.getItem('username');
}

function startGame() {}
