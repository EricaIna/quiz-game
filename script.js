const _question = document.getElementById("question");
const _options = document.querySelector(".quiz-options");
const _checkBtn = document.getElementById("check-answer");
const _playAgainBtn = document.getElementById("play-again");
const _result = document.getElementById("result");
const _correctScore = document.getElementById("correct-score");
const _totalQuestion = document.getElementById("total-question");

let correctAnswer = "",
  correctScore = (askedCount = 0),
  totalQuestion = 10;
let previousQuestion = null;

const artQuestions = [
  {
    question: "Who painted the Mona Lisa?",
    options: [
      "Leonardo da Vinci",
      "Pablo Picasso",
      "Vincent van Gogh",
      "Michelangelo",
    ],
    correctAnswer: "Leonardo da Vinci",
  },
  {
    question: "Which famous artist is known for his drip painting technique?",
    options: [
      "Jackson Pollock",
      "Salvador Dali",
      "Andy Warhol",
      "Claude Monet",
    ],
    correctAnswer: "Jackson Pollock",
  },
  {
    question: "Which Dutch painter cut off part of his ear?",
    options: [
      "Vincent van Gogh",
      "Rembrandt",
      "Johannes Vermeer",
      "Hieronymus Bosch",
    ],
    correctAnswer: "Vincent van Gogh",
  },
  {
    question: "Who created the sculpture 'David'?",
    options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
    correctAnswer: "Michelangelo",
  },
  {
    question:
      "Which artistic style is characterized by distorted and exaggerated features?",
    options: ["Expressionism", "Impressionism", "Cubism", "Realism"],
    correctAnswer: "Expressionism",
  },
  {
    question: "The 'Starry Night' painting was created by which artist?",
    options: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Claude Monet",
    ],
    correctAnswer: "Vincent van Gogh",
  },
  {
    question:
      "Who painted 'The Persistence of Memory' featuring melting clocks?",
    options: [
      "Salvador Dali",
      "Frida Kahlo",
      "Piet Mondrian",
      "Georges Seurat",
    ],
    correctAnswer: "Salvador Dali",
  },
  {
    question:
      "Which art movement focused on capturing fleeting moments of light and color?",
    options: [
      "Impressionism",
      "Abstract Expressionism",
      "Surrealism",
      "Pop Art",
    ],
    correctAnswer: "Impressionism",
  },
  {
    question: "Who is known for creating the 'Campbell's Soup Cans' series?",
    options: [
      "Andy Warhol",
      "Roy Lichtenstein",
      "Jackson Pollock",
      "Mark Rothko",
    ],
    correctAnswer: "Andy Warhol",
  },
  {
    question:
      "What is the technique of creating an image using small pieces of colored glass or other materials?",
    options: ["Mosaic", "Sculpture", "Woodcut", "Collage"],
    correctAnswer: "Mosaic",
  },
];

// load question from custom artQuestions array
function loadQuestion() {
  if (askedCount >= totalQuestion) {
    _result.innerHTML = `<p>All available questions have been exhausted.</p>`;
    _playAgainBtn.style.display = "block";
    _checkBtn.style.display = "none";
    return;
  }

  const randomIndex = Math.floor(Math.random() * artQuestions.length);
  const selectedQuestion = artQuestions[randomIndex];

  _result.innerHTML = "";
  showQuestion(selectedQuestion);
}

function eventListeners() {
  _checkBtn.addEventListener("click", checkAnswer);
  _playAgainBtn.addEventListener("click", restartQuiz);
}

document.addEventListener("DOMContentLoaded", function () {
  loadQuestion();
  eventListeners();
  _totalQuestion.textContent = totalQuestion;
  _correctScore.textContent = correctScore;
});

// display question and options
function showQuestion(data) {
  _question.textContent = data.question;
  _checkBtn.disabled = false;
  correctAnswer = data.correctAnswer;
  let incorrectAnswer = data.options.filter(
    (option) => option !== correctAnswer
  );
  let optionsList = incorrectAnswer;
  optionsList.splice(
    Math.floor(Math.random() * (incorrectAnswer.length + 1)),
    0,
    correctAnswer
  );

  _options.innerHTML = `
        ${optionsList
          .map(
            (option, index) => `
            <li>${index + 1}. <span>${option}</span></li>
        `
          )
          .join("")}
    `;
  selectOption();
}

// options selection
function selectOption() {
  _options.querySelectorAll("li").forEach(function (option) {
    option.addEventListener("click", function () {
      if (_options.querySelector(".selected")) {
        const activeOption = _options.querySelector(".selected");
        activeOption.classList.remove("selected");
      }
      option.classList.add("selected");
    });
  });
}

// answer checking
function checkAnswer() {
  _checkBtn.disabled = true;
  if (_options.querySelector(".selected")) {
    let selectedAnswer = _options.querySelector(".selected span").textContent;
    if (selectedAnswer === correctAnswer) {
      correctScore++;
      _result.innerHTML = `<p><i class="fas fa-check"></i>Correct Answer!</p>`;
    } else {
      _result.innerHTML = `<p><i class="fas fa-times"></i>Incorrect Answer!</p> <small><b>Correct Answer: </b>${correctAnswer}</small>`;
    }
    checkCount();
  } else {
    _result.innerHTML = `<p><i class="fas fa-question"></i>Please select an option!</p>`;
    _checkBtn.disabled = false;
  }
}

function checkCount() {
  askedCount++;
  setCount();
  if (askedCount === totalQuestion) {
    setTimeout(function () {
      _result.innerHTML += `<p>Your score is ${correctScore}.</p>`;
      _playAgainBtn.style.display = "block";
      _checkBtn.style.display = "none";
    }, 3000);
  } else {
    setTimeout(function () {
      loadQuestion();
    }, 3000);
  }
}

function setCount() {
  _totalQuestion.textContent = totalQuestion;
  _correctScore.textContent = correctScore;
}

function restartQuiz() {
  correctScore = askedCount = 0;
  _playAgainBtn.style.display = "none";
  _checkBtn.style.display = "block";
  _checkBtn.disabled = false;
  setCount();
  loadQuestion();
}
