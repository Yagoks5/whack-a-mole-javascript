const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    playButton: document.getElementById("play-button"),
    chooseDifficultyButton: document.getElementById("choose-difficulty-button"),
    caraDeBone: document.querySelector("#hat-guy"),
  },
  values: {
    timerId: null,
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    curretTime: 60,
  },
};

function countDowm() {
  state.values.curretTime--;
  state.view.timeLeft.textContent = state.values.curretTime;

  if (state.values.curretTime <= 0) {
    clearInterval(state.values.countDowmTimerId);
    clearInterval(state.values.timerId);

    messagesResult();
  }
}

function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function messagesResult() {
  if (state.values.result > 50) {
    alert(
      "Saia de casa urgentemente. Sua pontuação foi de: " + state.values.result
    );
  } else if (state.values.result > 30) {
    alert("Etcha lele, sua pontuação foi de: " + state.values.result);
  } else if (state.values.result >= 10 && state.values.result <= 20) {
    alert(
      "Boa pontuação carne fresca. Sua pontuação foi de: " + state.values.result
    );
  } else if (state.values.result > 5 && state.values.result <= 10) {
    alert(
      "Parabéns! Você fez sua obrigação. Sua pontuação foi de:  " +
        state.values.result
    );
  } else if (state.values.result <= 5) {
    alert("Só isso? Você fez " + state.values.result + " pontos");
  }
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });
  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
  state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitbox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
      }
    });
  });
}

function main() {
  moveEnemy();
  addListenerHitbox();
}

function startGame() {
  alert("Bora");
  main();
  state.values.countDowmTimerId = setInterval(countDowm, 1000);
}

function chooseDifficulty() {
  const option = prompt(
    "Escolha uma dificuldade: \n (Digite o número correspondente) \n1. Fácil \n2. Médio \n3. Difícil"
  );

  if (option == 1) {
    alert("Modo Fácil");
    state.values.gameVelocity = 1000;
  } else if (option == 2) {
    alert("Modo Padrão");

    state.values.gameVelocity = 700;
  } else if (option == 3) {
    alert("Modo Difícil");
    state.values.gameVelocity = 350;
  } else {
    alert("Opção errada, escolha 1, 2 ou 3.");
  }
}

state.view.playButton.addEventListener("click", startGame);
state.view.chooseDifficultyButton.addEventListener("click", chooseDifficulty);
state.view.caraDeBone.addEventListener("click", () => {
  alert("Por que você clicou aqui?");
  alert("Você sera redirecionado para outro lugar!!");
  window.location.href = "https://www.youtube.com/watch?v=jKcRDgobqzA";
});
