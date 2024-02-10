// Instead, import getFirestore and collection from the Firestore module
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const questions = [
  {
    question: "How many points is a touchdown worth?",
    answers: [
      { text: "3", correct: false },
      { text: "6", correct: true },
      { text: "7", correct: false },
      { text: "2", correct: false },
    ],
  },
  {
    question:
      "What is the term for stopping the opponent's offensive play without turning over possession?",
    answers: [
      { text: "Tackle", correct: true },
      { text: "Interception", correct: false },
      { text: "Fumble", correct: false },
      { text: "Touchdown", correct: false },
    ],
  },
  {
    question: "Which of these is NOT a position on a football team?",
    answers: [
      { text: "Quarterback", correct: false },
      { text: "Shortstop", correct: true },
      { text: "Linebacker", correct: false },
      { text: "Wide Receiver", correct: false },
    ],
  },
  {
    question:
      "What is the term for running the football into the opponent's end zone from the field of play?",
    answers: [
      { text: "Rush", correct: false },
      { text: "Field Goal", correct: false },
      { text: "Touchdown", correct: true },
      { text: "Sack", correct: false },
    ],
  },
  {
    question:
      "What is the maximum number of players allowed on the field per team?",
    answers: [
      { text: "11", correct: true },
      { text: "9", correct: false },
      { text: "227,462", correct: false },
      { text: "10", correct: false },
    ],
  },
  {
    question:
      "What is the term for catching the ball from the opposing team's kick?",
    answers: [
      { text: "No Clue", correct: false },
      { text: "Kickoff", correct: false },
      { text: "Return", correct: true },
      { text: "Snap", correct: false },
    ],
  },
  {
    question:
      "What is the term for a play where the quarterback throws the ball to a receiver?",
    answers: [
      { text: "Handoff", correct: false },
      { text: "Pass", correct: true },
      { text: "Rush", correct: false },
      { text: "Lebron James", correct: false },
    ],
  },
  {
    question:
      "What is it called when a player loses control of the ball and drops it?",
    answers: [
      { text: "Interception", correct: false },
      { text: "Fumble", correct: true },
      { text: "Offside", correct: false },
      { text: "Holding", correct: false },
    ],
  },
  {
    question:
      "What is the term for a defensive player catching a pass intended for an offensive player?",
    answers: [
      { text: "Tackle", correct: false },
      { text: "Interception", correct: true },
      { text: "Fumble", correct: false },
      { text: "Sack", correct: false },
    ],
  },
  {
    question:
      "What is it called when the kicker kicks the ball through the opponent's goal posts?",
    answers: [
      { text: "Punt", correct: false },
      { text: "Field Goal", correct: true },
      { text: "Touchdown", correct: false },
      { text: "Extra Point", correct: false },
    ],
  },
  {
    question: "Which of these results in a loss of yardage for the offense?",
    answers: [
      { text: "Sack", correct: true },
      { text: "Interception", correct: false },
      { text: "Fumble", correct: false },
      { text: "Rush", correct: false },
    ],
  },
  {
    question:
      "What is the term for a short kick used instead of a regular kickoff?",
    answers: [
      { text: "Punt", correct: false },
      { text: "Onside Kick", correct: true },
      { text: "Field Goal", correct: false },
      { text: "Hail Mary", correct: false },
    ],
  },
  {
    question:
      "What is it called when an offensive player moves before the snap?",
    answers: [
      { text: "Offside", correct: false },
      { text: "False Start", correct: true },
      { text: "Holding", correct: false },
      { text: "Pass Interference", correct: false },
    ],
  },
  {
    question:
      "What is the term for a pass thrown deep down the field as a last resort?",
    answers: [
      { text: "Slant", correct: false },
      { text: "Screen", correct: false },
      { text: "Hail Mary", correct: true },
      { text: "Flea Flicker", correct: false },
    ],
  },
  {
    question: "Who is the player that kicks field goals and extra points?",
    answers: [
      { text: "Punter", correct: false },
      { text: "Kicker", correct: true },
      { text: "Quarterback", correct: false },
      { text: "Linebacker", correct: false },
    ],
  },
  {
    question:
      "What is it called when a player grabs and holds onto another player?",
    answers: [
      { text: "Holding", correct: true },
      { text: "A Hug", correct: false },
      { text: "False Start", correct: false },
      { text: "Roughing the Passer", correct: false },
    ],
  },
  {
    question:
      "What is the term for a play where the quarterback hands the ball to a running back?",
    answers: [
      { text: "Pass", correct: false },
      { text: "Handoff", correct: true },
      { text: "Sack", correct: false },
      {
        text: "The QB Is Scared",
        correct: false,
      },
    ],
  },
  {
    question:
      "When a defensive player tackles the quarterback behind the line of scrimmage it is called a?",
    answers: [
      { text: "Sack", correct: true },
      { text: "Interception", correct: false },
      { text: "Fumble", correct: false },
      { text: "Rush", correct: false },
    ],
  },
  {
    question: "Who Is Your Absolute Favorite Coach?",
    answers: [
      { text: "Coach Lew", correct: true },
      { text: "Coach Tarell", correct: false },
      { text: "Coach Aaron", correct: false },
      { text: "Coach Davis", correct: false },
    ],
  },
];

const successMessages = [
  "Nailed it! You must be a genius or something!",
  "Right on! You're cooking with gas now!",
  "You got it! Are you sure you're not cheating?",
  "Correct! You're on fire! (Not literally, of course.)",
  "Bingo! You must have eaten your brain food today!",
];

const incorrectMessages = [
  "Oops! That's not it. But hey, no one's perfect!",
  "Wrong! But don't worry, I still believe in you!",
  "Nope! But don't feel bad, even Einstein got things wrong!",
  "Incorrect! But hey, at least you're consistent!",
  "Missed it by that much! Keep your chin up, you'll get the next one!",
];

let currentQuestionIndex = 0;

function startQuiz() {
  // Code to start the quiz
  showQuestion(questions[currentQuestionIndex]);
}
let currentScore = 0;
let attempts = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let progressIndex = currentQuestionIndex + 1;
let currentScoreText = document.getElementById("user-score");
let currentUserDisplay = document.getElementById("current-user");
let currentCorrectAnswers = document.getElementById("correct-answers");
let currentIncorrectAnswers = document.getElementById("incorrect-answers");

let currentUser = null;
let userDocRef = null;
let questionTimeout = null;

const db = getFirestore();

// Other DOM elements
const progressText = document.getElementById("progress");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const form = document.getElementById("usernameForm");
const formWrapper = document.getElementById("form-wrapper");
const usernameWarning = document.getElementById("username-warning");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const userContainer = document.querySelector(".user-info-container");

function handleFormSubmit(e) {
  e.preventDefault();
  const usernameInput = document.getElementById("usernameInput");
  const username = usernameInput.value;
  document.getElementById("buttonClick").play();
  processUserData(username);
}

function processUserData(username) {
  // Ensure username is not empty
  if (!username) {
    usernameWarning.textContent = "Please enter a username.";
    return;
  }

  // Define userDocRef here after username is set
  userDocRef = doc(db, "userScores", username);

  currentUser = username;

  currentUserDisplay.innerHTML = `<span>${username}</span>`;

  // Default the score and answers to zero
  currentScoreText.innerHTML = `<span>Score:</span> 0`;
  currentCorrectAnswers.innerHTML = `Correct: <span>0</span>`;
  currentIncorrectAnswers.innerHTML = `Incorrect: <span>0</span>`;

  // Check if username already exists in Firestore
  getDoc(userDocRef)
    .then((docSnapshot) => {
      if (docSnapshot.exists()) {
        // Username exists. This is a returning user. Update their existing data.
        const userData = docSnapshot.data();
        currentScore = userData.score; // You might want to reset or update this score based on your quiz logic
        correctAnswers = userData.correctAnswers;
        incorrectAnswers = userData.incorrectAnswers;

        // Update the UI for a returning user
        formWrapper.style.display = "none";
        currentScoreText.innerHTML = `Score: <span>${currentScore}<span>`;
        // Optionally reset or update the quiz for the returning user
      } else {
        // This is a new user. Initialize their data in Firestore.
        setDoc(
          userDocRef,
          {
            score: 0, // Set initial score to 0 for new user
            correctAnswers: 0,
            incorrectAnswers: 0,
          },
          { merge: true }
        )
          .then(() => {
            // Update the UI after setting up a new user
            formWrapper.style.display = "none";
            currentScoreText.innerHTML = `Score: <span>0</span>`;
          })
          .catch((error) => {
            console.error("Error adding new user document: ", error);
          });
      }
    })
    .catch((error) => {
      console.error("Error getting document:", error);
    });
}

function showQuestion(question) {
  // Code to display the question and answers
  updateProgressBar();
  restartButton.style.display = "none";
  attempts = 0;

  progressText.innerHTML = `<span>${progressIndex}</span> of <span>${questions.length}</span>`;
  questionElement.textContent = question.question;
  answerButtonsElement.textContent = "";

  if (currentQuestionIndex >= questions.length - 1) {
    // Disable the Next button if it's the last question
    nextButton.disabled = true;
  } else {
    // Enable the Next button for all other questions
    nextButton.disabled = false;
  }

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(index));
    answerButtonsElement.appendChild(button);
  });
  questionElement.style.opacity = "0";
  questionElement.style.transform = "translateY(20px)";
  setTimeout(() => {
    questionElement.style.opacity = "1";
    questionElement.style.transform = "translateY(0)";
  }, 50);
}

function selectAnswer(answerIndex) {
  const selectedAnswer = questions[currentQuestionIndex].answers[answerIndex];
  const selectedButton = answerButtonsElement.children[answerIndex];
  const answerButtons = document.getElementsByClassName("btn");

  clearTimeout(questionTimeout);

  if (selectedAnswer.correct === true) {
    updateProgressBar();
    playCorrectSound();
    correctAnswers++;
    currentCorrectAnswers.innerHTML = `Correct: <span>${correctAnswers}</span>`;
    currentScore += 10;
    currentScoreText.innerHTML = `Score: <span>${currentScore}</span>`;
    const randomIndex = Math.floor(Math.random() * successMessages.length);
    const successMessage = successMessages[randomIndex];
    selectedButton.style.backgroundColor = "green";
    selectedButton.style.backgroundImage = "none";
    for (let button of answerButtons) {
      button.disabled = true;
      button.style.pointerEvents = "none";
    }
    if (attempts === 2) {
      currentScore += 10;
    }
  } else {
    playIncorrectSound();
    const randomIndex = Math.floor(Math.random() * incorrectMessages.length);
    const incorrectMessage = incorrectMessages[randomIndex];
    selectedButton.style.backgroundColor = "red";
    selectedButton.style.backgroundImage = "none";
    attempts++;
    if (currentScore !== 0) {
      currentScore -= 10;
    } else {
      currentScore = currentScore;
    }
    if (attempts === 2) {
      incorrectAnswers++;
      currentIncorrectAnswers.innerHTML = `Incorrect: <span>${incorrectAnswers}</span>`;
      const correctAnswerIndex = questions[
        currentQuestionIndex
      ].answers.findIndex((answer) => answer.correct === true);
      const correctButton = answerButtonsElement.children[correctAnswerIndex];
      correctButton.style.backgroundColor = "green";
      correctButton.style.backgroundImage = "none";
      for (let button of answerButtons) {
        button.disabled = true;
        button.style.pointerEvents = "none";
      }
    }
  }
  // If the answer is correct or max attempts reached, decide what to do next
  if (selectedAnswer.correct === true || attempts === 2) {
    if (currentQuestionIndex === questions.length - 1) {
      handleEndOfQuiz();
    } else {
      // If there are more questions, set a delay for moving to the next question
      questionTimeout = setTimeout(moveToNextQuestion, 3000);
    }
  }
}

function updateProgressBar() {
  var totalQuestions = questions.length;
  var currentQuestionNumber = currentQuestionIndex + 1; // Assuming currentQuestionIndex starts from 0
  var progressPercentage = (currentQuestionNumber / totalQuestions) * 100;

  // Update the progress bar width
  document.getElementById("progress-bar").style.width =
    progressPercentage + "%";

  // Update the text if needed
  progressText.innerHTML = `<span>${currentQuestionNumber}</span> of <span>${totalQuestions}</span>`;
}

function moveToNextQuestion() {
  updateProgressBar();
  document.getElementById("nextQuestionSound").play();
  currentQuestionIndex++;
  progressIndex = currentQuestionIndex + 1;
  showQuestion(questions[currentQuestionIndex]);
  progressText.innerHTML = `<span>${progressIndex}</span> of <span>${questions.length}</span>`;
  currentScoreText.innerHTML = `Score: <span>${currentScore}</span>`;

  for (let button of answerButtons) {
    button.disabled = false;
    button.style.pointerEvents = "all";
  }
}

nextButton.addEventListener("click", () => {
  document.getElementById("buttonClick").play();
  // Check if it's not the last question before incrementing currentQuestionIndex
  if (currentQuestionIndex < questions.length - 1) {
    updateProgressBar();
    currentQuestionIndex++;
    progressIndex = currentQuestionIndex + 1; // Update progressIndex
    showQuestion(questions[currentQuestionIndex]);
    progressText.innerHTML = `<span>${progressIndex}</span> of <span>${questions.length}</span>`;
    currentScoreText.innerHTML = `Score: <span>${currentScore}</span>`;
  }
  // Check again if the current question is now the last one, then disable the "Next" button
  if (currentQuestionIndex >= questions.length - 1) {
    nextButton.disabled = true;
  }
  if (questionTimeout) {
    clearTimeout(questionTimeout);
    questionTimeout = null;
  }
});

previousButton.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    progressIndex = currentQuestionIndex + 1; // Adjust progressIndex accordingly
    showQuestion(questions[currentQuestionIndex]);
    progressText.innerHTML = `<span>${progressIndex}</span> of <span>${questions.length}</span>`;
    currentScoreText.innerHTML = `Score: <span>${currentScore}</span>`;
  }
  if (questionTimeout) {
    clearTimeout(questionTimeout);
    questionTimeout = null;
  }
});
form.addEventListener("submit", handleFormSubmit);

const restartButton = document.getElementById("restart-btn");

restartButton.addEventListener("click", () => {
  if (!currentUser) {
    console.error("No current user defined");
    return;
  }
  userContainer.classList.remove("move");
  userContainer.classList.add("user-info-container");
  currentUserDisplay.innerHTML = `<span>${currentUser}</span>`;
  currentScoreText.innerHTML = `<span>Score:</span> 0`;
  currentCorrectAnswers.innerHTML = `Correct: <span>0</span>`;
  currentIncorrectAnswers.innerHTML = `Incorrect: <span>0</span>`;

  currentQuestionIndex = 0;
  currentScore = 0;
  attempts = 0;
  correctAnswers = 0;
  incorrectAnswers = 0;
  progressIndex = 1;

  // Update Firestore with the reset values
  setDoc(
    userDocRef,
    {
      score: currentScore,
      attempts,
      correctAnswers,
      incorrectAnswers,
      progressIndex,
    },
    { merge: true }
  ) // Using merge option to update the document without overwriting other fields
    .then(() => {
      // Update the UI to reflect the quiz restart
      restartButton.style.display = "none";
      previousButton.style.display = "block";
      nextButton.style.display = "block";
      progressText.innerHTML = `<span>${progressIndex}</span> of <span>${questions.length}</span>`;
      currentScoreText.innerHTML = `Score: <span>${currentScore}</span>`;
      showQuestion(questions[0]); // Start the quiz from the first question
    })
    .catch((error) => {
      console.error("Error resetting user data in Firestore: ", error);
    });
});

function updateLeaderBoardUI() {
  // Get top 5 scores from Firestore
  const scoresQuery = query(
    collection(db, "userScores"),
    orderBy("score", "desc"),
    orderBy("timestamp", "desc"),
    limit(5)
  );

  getDocs(scoresQuery)
    .then((querySnapshot) => {
      const leaderBoardList = document.getElementById("leaderboard");
      leaderBoardList.innerHTML = ""; // Clear existing leaderboard entries

      let rank = 0;
      // Check if there are no leaders or the highest score is zero
      if (
        querySnapshot.empty ||
        (querySnapshot.docs[0] && querySnapshot.docs[0].data().score === 0)
      ) {
        leaderBoardList.innerHTML =
          '<span class="no-leaders">No Leaders Yet... Be The First</span>';
        return;
      }

      querySnapshot.forEach((doc) => {
        rank++; // Increment rank with each document
        const data = doc.data();
        const listItem = document.createElement("li");
        listItem.className = "list-item";
        listItem.innerText = `${rank}. ${doc.id}: ${data.score}`;

        // Add a trophy icon to the top player
        if (rank === 1) {
          listItem.innerHTML = `<i class="fa-solid fa-trophy"></i> ${listItem.innerText}`;
          listItem.classList.add("first-item");
        }

        // Add a 'last-item' class to the last player if it's the 5th item
        if (rank === 5) {
          listItem.classList.add("last-item");
        }

        leaderBoardList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching leaderboard data from Firestore: ", error);
    });
}
var sound = document.getElementById("correctOrNah");

// Function to play correct sound (first 0.3 seconds)
function playCorrectSound() {
  sound.currentTime = 0; // Start at the beginning
  sound.play();

  // Stop after 0.3 seconds
  setTimeout(() => {
    sound.pause();
    sound.currentTime = 0; // Reset for next time
  }, 500); // 300 milliseconds = 0.3 seconds
}

// Function to play incorrect sound (excluding last 0.2 seconds)
function playIncorrectSound() {
  const durationToPlay = sound.duration - 0.2; // Calculate when to stop
  sound.currentTime = 0.6; // Start after the correct sound part
  sound.play();

  // Stop before the last 0.2 seconds
  setTimeout(() => {
    sound.pause();
    sound.currentTime = 0; // Reset for next time
  }, durationToPlay * 1000); // Convert to milliseconds
}

// Call this function initially to populate the leaderboard when the page loads
function handleEndOfQuiz() {
  document.getElementById("quizOverSound").play();
  document.getElementById("question").textContent = "";
  document.getElementById("answer-buttons").textContent = "";
  previousButton.style.display = "none";
  nextButton.style.display = "none";
  restartButton.style.display = "flex";
  progressText.innerHTML = "<strong>Quiz Completed</strong>";

  userContainer.classList.remove("user-info-container");
  userContainer.classList.add("move");

  // Define the Firestore document reference for the current user
  const userDocRef = doc(db, "userScores", currentUser);

  // Update Firestore with the end of quiz data for the current user
  setDoc(
    userDocRef,
    {
      score: currentScore,
      correctAnswers: correctAnswers,
      incorrectAnswers: incorrectAnswers,
      timestamp: serverTimestamp(),
    },
    { merge: true }
  )
    .then(() => {
      updateLeaderBoardUI();
    })
    .catch((error) => {
      console.error("Error updating user score in Firestore: ", error);
    });
}
updateLeaderBoardUI();

startQuiz();
