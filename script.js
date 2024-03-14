const getElement = (id) => {
  return document.getElementById(id);
};

// rules box
const openRulesBtn = getElement("show-rules-btn");
const closeRulesBtn = getElement("close-rules-btn");
const rulesContent = getElement("rules-content");
const rules = getElement("rules");

openRulesBtn.addEventListener("click", () => {
  rulesContent.classList.remove("rules-content-hide");
});

closeRulesBtn.addEventListener("click", () => {
  rulesContent.classList.add("rules-content-hide");
});

// setting score in local storage and updating the score in UI
const setLocalStorageAndUpdateUI = () => {
  const playerScore = window.localStorage.getItem("playerScore");
  const computerScore = window.localStorage.getItem("computerScore");

  if (!playerScore || !computerScore) {
    window.localStorage.setItem("playerScore", 0);
    window.localStorage.setItem("computerScore", 0);
  }

  const computerScoreEle = getElement("computer-score");
  const playerScoreEle = getElement("player-score");
  computerScoreEle.innerHTML = computerScore || 0;
  playerScoreEle.innerHTML = playerScore || 0;
};
setLocalStorageAndUpdateUI();

const getComputerChoice = () => {
  const options = ["fist", "scissor", "hand"];
  return options[Math.floor(Math.random() * options.length)];
};

const getGameResult = (playerChoice, computerChoice) => {
  console.log(playerChoice, computerChoice);
  if (playerChoice === computerChoice) {
    return "tie";
  }

  // fist
  if (playerChoice === "fist") {
    if (computerChoice === "scissor") return "win";
    if (computerChoice === "hand") return "lose";
  }

  // scissor
  if (playerChoice === "scissor") {
    if (computerChoice === "hand") return "win";
    if (computerChoice === "fist") return "lose";
  }

  // hand
  if (playerChoice === "hand") {
    if (computerChoice === "fist") return "win";
    if (computerChoice === "scissor") return "lose";
  }
};

const updateScore = (result) => {
  const playerScore = Number(window.localStorage.getItem("playerScore"));
  const computerScore = Number(window.localStorage.getItem("computerScore"));
  console.log(result);
  if (result === "win") {
    window.localStorage.setItem("playerScore", playerScore + 1);
  }
  if (result === "lose") {
    window.localStorage.setItem("computerScore", computerScore + 1);
  }

  setLocalStorageAndUpdateUI();
};

const updateGameSpaceUI = (result, playerChoice, computerChoice) => {
  let resUI = "";
  if (result === "win") resUI = "YOU WIN";
  if (result === "lose") resUI = "YOU LOST";
  if (result === "tie") resUI = "TIE UP";

  const resultStateDiv = `
	<div class="result-state">
			<div class="circle-container">
				<p>You Picked</p>
				<div class="result-option-circle ${playerChoice} ${
    result === "win" ? "win" : ""
  }">
					<img src="assets/${playerChoice}.png" alt="" />
				</div>
			</div>

			<div class="result-text">
				<h3>${resUI}</h3>
				${result === "tie" ? "" : "<p>AGAINST PC</p>"}
				<div class="play-again-btn" id="play-again-btn">${
          result === "tie" ? "REPLAY" : "PLAY AGAIN"
        }</div>
			</div>

			<div class="circle-container">
				<p>PC Picked</p>
				<div class="result-option-circle ${computerChoice} ${
    result === "lose" ? "win" : ""
  }">
					<img src="assets/${computerChoice}.png" alt="" />
				</div>
			</div>
		</div>`;

  const gameSpace = getElement("game-space");
  gameSpace.style.width = "40%";
  gameSpace.innerHTML = resultStateDiv;

  const playAgainBtn = getElement("play-again-btn");
  playAgainBtn.addEventListener("click", () => {
    setPlayStateUI();
  });
};

const nextBtn = getElement("next-btn");
const showNextBtn = () => {
  rules.style.right = "170px";
  nextBtn.classList.remove("hide-next");
};
const hideNextBtn = () => {
  rules.style.right = "40px";
  nextBtn.classList.add("hide-next");
};

const gameplay = (playerChoice) => {
  const computerChoice = getComputerChoice();
  const result = getGameResult(playerChoice, computerChoice);
  updateScore(result);
  updateGameSpaceUI(result, playerChoice, computerChoice);

  if (result === "win") {
    showNextBtn();
  }
};

const setPlayStateUI = () => {
  const playStateDiv = `
<div class="play-state">
			<div class="first-two-option">
				<div class="fist option-circle" id="fist">
					<img src="assets/fist.png" alt="" />
				</div>
				<div class="upper-bar"></div>
				<div class="scissor option-circle" id="scissor">
					<img src="assets/scissor.png" alt="" />
				</div>
			</div>
			<div class="left-bar"></div>
			<div class="hand option-circle" id="hand">
				<img src="assets/hand.png" alt="" />
			</div>
			<div class="right-bar"></div>
		</div>
	`;
  const gameSpace = getElement("game-space");
  gameSpace.style.width = "30%";
  gameSpace.innerHTML = playStateDiv;

  hideNextBtn();

  const fistBtn = getElement("fist");
  const scissorBtn = getElement("scissor");
  const handBtn = getElement("hand");

  fistBtn.addEventListener("click", () => {
    gameplay("fist");
  });

  scissorBtn.addEventListener("click", () => {
    gameplay("scissor");
  });

  handBtn.addEventListener("click", () => {
    gameplay("hand");
  });
};
setPlayStateUI();

// whenever the user wins show, next btn and change the postion of rules

// gameplay logic
// win & lose refers to the player winning and losing
// const getComputerChoice = () => {
//   const options = ["fist", "scissor", "hand"];
//   return options[Math.floor(Math.random() * options.length)];
// };

// const getGameResult = (playerChoice, computerChoice) => {
//   console.log(playerChoice, computerChoice);
//   if (playerChoice === computerChoice) {
//     return "tie";
//   }

//   // fist
//   if (playerChoice === "fist") {
//     if (computerChoice === "scissor") return "win";
//     if (computerChoice === "hand") return "lose";
//   }

//   // scissor
//   if (playerChoice === "scissor") {
//     if (computerChoice === "hand") return "win";
//     if (computerChoice === "fist") return "lose";
//   }

//   // hand
//   if (playerChoice === "hand") {
//     if (computerChoice === "fist") return "win";
//     if (computerChoice === "scissor") return "lose";
//   }
// };

// const updateScore = (result) => {
//   const playerScore = Number(window.localStorage.getItem("playerScore"));
//   const computerScore = Number(window.localStorage.getItem("computerScore"));
//   console.log(result);
//   if (result === "win") {
//     window.localStorage.setItem("playerScore", playerScore + 1);
//   }
//   if (result === "lose") {
//     window.localStorage.setItem("computerScore", computerScore + 1);
//   }

//   setLocalStorageAndUpdateUI();
// };

// const updateGameSpaceUI = () => {
//   const resultStateDiv = `
// 	<div class="result-state">
// 			<div class="circle-container">
// 				<p>You Picked</p>
// 				<div class="result-option-circle fist">
// 					<img src="assets/fist.png" alt="" />
// 				</div>
// 			</div>

// 			<div class="result-text">
// 				<h3>YOU WIN</h3>
// 				<p>AGAINST PC</p>
// 				<div class="play-again-btn" id="play-again-btn">PLAY AGAIN</div>
// 			</div>

// 			<div class="circle-container">
// 				<p>PC Picked</p>
// 				<div class="result-option-circle hand">
// 					<img src="assets/hand.png" alt="" />
// 				</div>
// 			</div>
// 		</div>`;

//   const gameSpace = getElement("game-space");
//   gameSpace.style.width = "40%";
//   gameSpace.innerHTML = resultStateDiv;

//   const playAgainBtn = getElement("play-again-btn");
//   playAgainBtn.addEventListener("click", () => {
//     setPlayStateUI();
//   });
// };

// const showNextBtn = () => {
//   const nextBtn = getElement("next-btn");
//   rules.style.right = "170px";
//   nextBtn.classList.remove("hide-next");
// };

// const gameplay = (playerChoice) => {
//   const computerChoice = getComputerChoice();
//   const result = getGameResult(playerChoice, computerChoice);
//   updateScore(result);
//   updateGameSpaceUI(result);

//   if (result === "win") {
//     showNextBtn();
//   }
// };
