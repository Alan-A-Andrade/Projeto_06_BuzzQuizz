let correctAnswers = 0;
let answeredQuestions = 0;
let loadedQuizzData;
let loadedQuizzID;
const frontPage = document.querySelector("body").innerHTML;

let userCreatedQuizzData = JSON.parse(localStorage.getItem("data"))
let userCreatedQuizzId = JSON.parse(localStorage.getItem("id"))
let userCreatedQuizzSecretKey = JSON.parse(localStorage.getItem("UniqueKey"))

if (userCreatedQuizzData != null) {
  let userCreatedQuizzDataStringifiedStoraged = JSON.stringify(userCreatedQuizzData.filter(filterNull))
  localStorage.setItem("data", userCreatedQuizzDataStringifiedStoraged)
}



listQuizzesRequest();
function listQuizzesRequest() {
  promisseGetQuizzes = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
  promisseGetQuizzes.then(listQuizzes);
  promisseGetQuizzes.then(nowLoading)
}

function listQuizzes(answerListQuizzes) {
  let quizzes = answerListQuizzes.data;
  let quizzesListed = document.querySelector(".all-quizzes-listed");
  quizzesListed.scrollIntoView()
  quizzesListed.innerHTML = "";
  for (let i = 0; i < quizzes.length; i++) {
    let quizz = quizzes[i];

    let isAnUserMadeQuizz = false

    if (userCreatedQuizzId !== null) {

      for (let j = 0; j < userCreatedQuizzId.length; j++) {

        if (quizz.id == userCreatedQuizzId[j]) {

          isAnUserMadeQuizz = true
        }
      }

      if (isAnUserMadeQuizz) {
        continue;
      }

    }

    quizzesListed.innerHTML += `
    <div class="all-quizzes-quizz" onclick="getQuizzByID(${quizz.id})">
      <!--all-quizzes-quizz-bg-->
      <img class="all-quizzes-quizz-bg" src="${quizz.image}">
      <!--all-quizzes-quizz-degrade-->
      <div class="all-quizzes-quizz-degrade"></div>
      <!--all-quizzes-quizz-title-->
      <div class="all-quizzes-quizz-title">
        <p>${quizz.title}</p>
      </div>
    </div><!--all-quizzes-quizz-->        
    `;
  }

  listCreatedUserQuizz(quizzes);
}

function createQuizz() {
  let pageContainer = document.querySelector(".container");
  pageContainer.innerHTML = "";
  pageContainer.innerHTML = `
<section class="create-quizzes">
  <!--create-quizzes-title-->
  <h2 class="create-quizzes-title">Comece pelo começo</h2>
  <!--create-quizzes-inputs-->
  <form class="create-quizzes-inputs">
    <!--create-quizzes-input-->
    <input type="text" class="create-quizzes-input create-quizz-title" placeholder="Título do seu quizz" required>
    <p class="create-quizz-title-feedback invalid-feedback hidden"></p><!--invalid-feedback-->
    <!--create-quizzes-input-->
    <input type="url" class="create-quizzes-input create-quizz-url" placeholder="URL da imagem do seu quizz" required>
    <p class="create-quizz-url-feedback invalid-feedback hidden"></p><!--invalid-feedback-->
    <!--create-quizzes-input-->      
    <input type="number" min="0" class="create-quizzes-input create-quizz-questions" placeholder="Quantidade de perguntas do quizz" required>
    <p class="create-quizz-questions-feedback invalid-feedback hidden"></p><!--invalid-feedback-->
    <!--create-quizzes-input-->
    <input type="number" min="0" class="create-quizzes-input create-quizz-levels" placeholder="Quantidade de níveis do quizz" required>
    <p class="create-quizz-levels-feedback invalid-feedback hidden"></p><!--invalid-feedback-->
  </form>
  <!--create-quizzes-button-->
  <button class="create-quizzes-button" onclick="createQuizzQuestions()">Prosseguir pra criar perguntas</button>
<section><!--create-quizzes-->
`;
}


let titleQuizzInput;
let URLQuizzInput;
let questionsQuizzInput;
let levelsQuizzInput;
function createQuizzQuestions() {
  let pageContainer = document.querySelector(".container");
  const createQuizzTitle = document.querySelector(".create-quizz-title");
  const createQuizzURL = document.querySelector(".create-quizz-url");
  const createQuizzQuestions = document.querySelector(".create-quizz-questions");
  const createQuizzLevels = document.querySelector(".create-quizz-levels");

  const createQuizzTitleFeedback = document.querySelector(".create-quizz-title-feedback");
  const createQuizzURLFeedback = document.querySelector(".create-quizz-url-feedback");
  const createQuizzQuestionsFeedback = document.querySelector(".create-quizz-questions-feedback");
  const createQuizzLevelsFeedback = document.querySelector(".create-quizz-levels-feedback");

  createQuizzInputsEmpytValidation = (createQuizzTitle.value === "" || createQuizzURL.value === "" ||
    createQuizzQuestions.value === "" || createQuizzLevels.value === "");
  createQuizzInputTitleValidation = (createQuizzTitle.value.length < 20 || createQuizzTitle.value.length > 65);
  createQuizzInputQuestionsValidation = (createQuizzQuestions.value < 3);
  createQuizzInputLevelsValidation = (createQuizzLevels.value < 2);

  if (createQuizzInputsEmpytValidation) {
    if (createQuizzTitle.value !== "") {
      createQuizzTitleFeedback.innerHTML = "";
      createQuizzTitle.classList.remove("invalid-input");
      createQuizzTitleFeedback.classList.add("hidden");
    } else {
      createQuizzTitleFeedback.innerHTML = "";
      createQuizzTitleFeedback.innerHTML = "Este campo é obrigatório!";
      createQuizzTitle.classList.add("invalid-input");
      createQuizzTitleFeedback.classList.remove("hidden");
    }

    if (createQuizzURL.value !== "") {
      createQuizzURLFeedback.innerHTML = "";
      createQuizzURL.classList.remove("invalid-input");
      createQuizzURLFeedback.classList.add("hidden");
    } else {
      createQuizzURLFeedback.innerHTML = "";
      createQuizzURLFeedback.innerHTML = "Este campo é obrigatório!";
      createQuizzURL.classList.add("invalid-input");
      createQuizzURLFeedback.classList.remove("hidden");
    }

    if (createQuizzQuestions.value !== "") {
      createQuizzQuestionsFeedback.innerHTML = "";
      createQuizzQuestions.classList.remove("invalid-input");
      createQuizzQuestionsFeedback.classList.add("hidden");
    } else {
      createQuizzQuestionsFeedback.innerHTML = "";
      createQuizzQuestionsFeedback.innerHTML = "Este campo é obrigatório!";
      createQuizzQuestions.classList.add("invalid-input");
      createQuizzQuestionsFeedback.classList.remove("hidden");
    }

    if (createQuizzLevels.value !== "") {
      createQuizzLevelsFeedback.innerHTML = "";
      createQuizzLevels.classList.remove("invalid-input");
      createQuizzLevelsFeedback.classList.add("hidden");
    } else {
      createQuizzLevelsFeedback.innerHTML = "";
      createQuizzLevelsFeedback.innerHTML = "Este campo é obrigatório!";
      createQuizzLevels.classList.add("invalid-input");
      createQuizzLevelsFeedback.classList.remove("hidden");
    }

    return;
  }
  createQuizzTitleFeedback.innerHTML = "";
  createQuizzTitle.classList.remove("invalid-input");
  createQuizzTitleFeedback.classList.add("hidden");

  createQuizzURLFeedback.innerHTML = "";
  createQuizzURL.classList.remove("invalid-input");
  createQuizzURLFeedback.classList.add("hidden");

  createQuizzQuestionsFeedback.innerHTML = "";
  createQuizzQuestions.classList.remove("invalid-input");
  createQuizzQuestionsFeedback.classList.add("hidden");

  createQuizzLevelsFeedback.innerHTML = "";
  createQuizzLevels.classList.remove("invalid-input");
  createQuizzLevelsFeedback.classList.add("hidden");


  if (createQuizzInputTitleValidation) {
    if (createQuizzTitle.value.length < 20) {
      createQuizzTitleFeedback.innerHTML = "";
      createQuizzTitleFeedback.innerHTML = "Campo do Título menor do que 20 caracteres!";
      createQuizzTitle.classList.add("invalid-input");
      createQuizzTitleFeedback.classList.remove("hidden");

      return;
    } else {
      createQuizzTitleFeedback.innerHTML = "";
      createQuizzTitleFeedback.innerHTML = "Campo do Título maior do que 65 caracteres!";

      createQuizzTitle.classList.add("invalid-input");
      createQuizzTitleFeedback.classList.remove("hidden");

      return;
    }
  }
  createQuizzTitleFeedback.innerHTML = "";
  createQuizzTitle.classList.remove("invalid-input");
  createQuizzTitleFeedback.classList.add("hidden");

  validationURL(createQuizzURL, createQuizzURLFeedback);
  let urlInputInvalid = document.querySelector(".create-quizz-url.invalid-input");
  console.log(urlInputInvalid);
  if (urlInputInvalid !== null) {
    return;
  }

  if (createQuizzInputQuestionsValidation) {
    createQuizzQuestionsFeedback.innerHTML = "";
    createQuizzQuestionsFeedback.innerHTML = "Campo de Perguntas no mínimo 3!";
    createQuizzQuestions.classList.add("invalid-input");
    createQuizzQuestionsFeedback.classList.remove("hidden");

    return;
  }
  createQuizzQuestionsFeedback.innerHTML = "";
  createQuizzQuestions.classList.remove("invalid-input");
  createQuizzQuestionsFeedback.classList.add("hidden");


  if (createQuizzInputLevelsValidation) {
    createQuizzLevelsFeedback.innerHTML = "";
    createQuizzLevelsFeedback.innerHTML = "Campo de Níveis no mínimo 2!";
    createQuizzLevels.classList.add("invalid-input");
    createQuizzLevelsFeedback.classList.remove("hidden");

    return;
  }
  createQuizzLevelsFeedback.innerHTML = "";
  createQuizzLevels.classList.remove("invalid-input");
  createQuizzLevelsFeedback.classList.add("hidden");


  setTimeout(function () { alert("Campos preenchidos corretamente!"); }, 100);

  titleQuizzInput = createQuizzTitle.value;
  URLQuizzInput = createQuizzURL.value;
  questionsQuizzInput = createQuizzQuestions.value;
  levelsQuizzInput = createQuizzLevels.value;

  pageContainer.innerHTML = "";
  pageContainer.innerHTML = `
<section class="create-quizzes">
  <!--create-quizzes-title-->
  <h2 class="create-quizzes-title">Crie suas perguntas</h2>
  <div class="create-quizz-questions-content">
  </div><!--create-quizz-questions-content-->
  <!--create-quizzes-button-->
  <button class="create-quizzes-button" onclick="createArrayQuizzQuestions()">Prosseguir pra criar níveis</button>
<section><!--create-quizzes-->
`;

  const createQuizzQuestionsContent = document.querySelector(".create-quizz-questions-content");
  for (let i = 1; i <= questionsQuizzInput; i++) {
    if (i === 1) {
      createQuizzQuestionsContent.innerHTML += `
    <!--create-quizz-question-->
    <form class="create-quizz-question question${i}">
      <div class="create-quizz-questions-edit create-quizz-questions-edit-hidden">
        <!--create-quizz-correct-question-title-->
        <p class="create-quizzes-question-title create-quizz-correct-question${i}-title">Pergunta ${i}</p>

        <!--create-icon-->
        <img onclick="viewQuestion(this)" class="create-icon" src="./assets/Icons/create-icon.png">
      </div><!--create-quizz-questions-edit-->
      <div class="create-quizz-questions-edit-show">
        <!--create-quizz-correct-question-title-->
        <p class="create-quizzes-question-title create-quizz-correct-question${i}-title">Pergunta ${i}</p>
        
        <!--create-quizz-text-question-->
        <input type="text" class="create-quizzes-question-input create-quizz-text-question create-quizz-text-question${i}" placeholder="Texto da pergunta" required>
        <p class="create-quizz-text-feedback${i} invalid-feedback2 hidden"></p><!--invalid-feedback2-->
        <!--create-quizz-color-question-->
        <input type="text" maxlength="7" onkeydown="maskColor(this)" onkeyup="maskColor(this)" onkeypress="maskColor(this)" class="create-quizzes-question-input create-quizz-color-question create-quizz-color-question${i}" placeholder="Cor de fundo da pergunta" required>
        <p class="create-quizz-color-feedback${i} invalid-feedback2 hidden"></p><!--invalid-feedback2-->
        
        <!--create-quizz-correct-answer-title-->
        <p class="create-quizzes-question-title-correct-answer create-quizz-correct-answer-title">Resposta correta</p>
        
        <!--create-quizzes-input-->
        <input type="text" class="create-quizzes-question-input create-quizz-correct-answer create-quizz-correct-answer${i}" placeholder="Resposta correta" required><!--create-quizz-correct-answer-->
        <p class="create-quizz-correct-answer-feedback${i} invalid-feedback2 hidden"></p><!--invalid-feedback2-->
        <input type="url" class="create-quizzes-question-input create-quizz-correct-answer-url create-quizz-correct-answer-url${i}" placeholder="URL da imagem" required><!--create-quizz-correct-answer-url-->
        <p class="create-quizz-correct-answer-url-feedback${i} invalid-feedback2 hidden"></p><!--invalid-feedback2-->
        
        <!--create-quizz-incorrect-question1-title-->
        <p class="create-quizzes-question-title-incorrect-answer create-quizz-incorrect-question-title">Respostas incorretas</p>
        <!--create-quizzes-input-->
        <input type="text" class="create-quizzes-question-input create-quizz-incorrect-answer1 create-quizz-incorrect-answer1-${i}" placeholder="Resposta incorreta 1" required><!--create-quizz-incorrect-answer1-->
        <p class="create-quizz-incorrect-answer1-feedback${i} invalid-feedback2 hidden"></p><!--invalid-feedback2-->
        <input type="url" class="create-quizzes-question-input create-quizz-incorrect-answer1-url create-quizz-incorrect-answer1-${i}-url" placeholder="URL da imagem 1" required><!--create-quizz-incorrect-answer1-url-->
        <p class="create-quizz-incorrect-answer1-url-feedback${i} invalid-feedback2 hidden"></p><!--invalid-feedback2-->
        <!--create-quizzes-input-->
        <input type="text" class="create-quizzes-question-input create-quizz-incorrect-answer2 create-quizz-incorrect-answer2-${i} mt-32" placeholder="Resposta incorreta 2" required><!--create-quizz-incorrect-answer2-->
        <p class="create-quizz-incorrect-answer2-feedback${i} invalid-feedback2 hidden"></p><!--invalid-feedback2-->
        <input type="url" class="create-quizzes-question-input create-quizz-incorrect-answer2-url create-quizz-incorrect-answer2-${i}-url" placeholder="URL da imagem 2" required><!--create-quizz-incorrect-answer2-url-->
        <p class="create-quizz-incorrect-answer2-url-feedback${i} invalid-feedback2 hidden"></p><!--invalid-feedback2-->
        <!--create-quizzes-input-->
        <input type="text" class="create-quizzes-question-input create-quizz-incorrect-answer3 create-quizz-incorrect-answer3-${i} mt-32" placeholder="Resposta incorreta 3" required><!--create-quizz-incorrect-answer2-->
        <p class="create-quizz-incorrect-answer3-feedback${i} invalid-feedback2 hidden"></p><!--invalid-feedback2-->
        <input type="url" class="create-quizzes-question-input create-quizz-incorrect-answer3-url create-quizz-incorrect-answer3-${i}-url" placeholder="URL da imagem 3" required><!--create-quizz-incorrect-answer2-url-->      
        <p class="create-quizz-incorrect-answer3-url-feedback${i} invalid-feedback2 hidden"></p><!--invalid-feedback2-->
      </div><!--create-quizz-questions-hidden-->
    </form>   
    `;
    } else {
      createQuizzQuestionsContent.innerHTML += `
    <!--create-quizz-question-->
    <form class="create-quizz-question question${i}">
      <div class="create-quizz-questions-edit">
        <!--create-quizz-correct-question-title-->
        <p class="create-quizzes-question-title create-quizz-correct-question${i}-title">Pergunta ${i}</p>

        <!--create-icon-->
        <img onclick="viewQuestion(this)" class="create-icon" src="./assets/Icons/create-icon.png">
      </div><!--create-quizz-questions-edit-->

      <div class="create-quizz-questions-edit-hidden">
        <!--create-quizz-correct-question-title-->
        <p class="create-quizzes-question-title create-quizz-correct-question${i}-title">Pergunta ${i}</p>
        <!--create-quizz-text-question-->
        <input type="text" class="create-quizzes-question-input create-quizz-text-question create-quizz-text-question${i}" placeholder="Texto da pergunta" required>
        <p class="create-quizz-text-feedback${i} invalid-feedback2 hidden"></p><!--invalid-feedback2-->
        
        <!--create-quizz-color-question-->
        <input type="text" maxlength="7" onkeydown="maskColor(this)" onkeyup="maskColor(this)" onkeypress="maskColor(this)" onkeypress="maskColor(this)" class="create-quizzes-question-input create-quizz-color-question create-quizz-color-question${i}" placeholder="Cor de fundo da pergunta" required>
        <p class="create-quizz-color-feedback${i} invalid-feedback2 hidden"></p><!--invalid-feedback2-->
        
        <!--create-quizz-correct-answer-title-->
        <p class="create-quizzes-question-title-correct-answer create-quizz-correct-answer-title">Resposta correta</p>
        
        <!--create-quizzes-input-->
        <input type="text" class="create-quizzes-question-input create-quizz-correct-answer create-quizz-correct-answer${i}" placeholder="Resposta correta" required><!--create-quizz-correct-answer-->
        <p class="create-quizz-correct-answer-feedback${i} invalid-feedback2 hidden"></p><!--invalid-feedback2-->
        <input type="url" class="create-quizzes-question-input create-quizz-correct-answer-url create-quizz-correct-answer-url${i}" placeholder="URL da imagem" required><!--create-quizz-correct-answer-url-->
        <p class="create-quizz-correct-answer-url-feedback${i} invalid-feedback2 hidden"></p><!--invalid-feedback2-->
        
        <!--create-quizz-incorrect-question1-title-->
        <p class="create-quizzes-question-title-incorrect-answer create-quizz-incorrect-question-title">Respostas incorretas</p>
        
        <!--create-quizzes-input-->
        <input type="text" class="create-quizzes-question-input create-quizz-incorrect-answer1 create-quizz-incorrect-answer1-${i}" placeholder="Resposta incorreta 1" required><!--create-quizz-incorrect-answer1-->
        <p class="create-quizz-incorrect-answer1-feedback${i} invalid-feedback2 hidden"></p><!--invalid-feedback2-->
        <input type="url" class="create-quizzes-question-input create-quizz-incorrect-answer1-url create-quizz-incorrect-answer1-${i}-url" placeholder="URL da imagem 1" required><!--create-quizz-incorrect-answer1-url-->
        <p class="create-quizz-incorrect-answer1-url-feedback${i} invalid-feedback2 hidden"></p><!--invalid-feedback2-->
        <!--create-quizzes-input-->
        <input type="text" class="create-quizzes-question-input create-quizz-incorrect-answer2 create-quizz-incorrect-answer2-${i} mt-32" placeholder="Resposta incorreta 2" required><!--create-quizz-incorrect-answer2-->
        <p class="create-quizz-incorrect-answer2-feedback${i} invalid-feedback2 hidden"></p><!--invalid-feedback2-->
        <input type="url" class="create-quizzes-question-input create-quizz-incorrect-answer2-url create-quizz-incorrect-answer2-${i}-url" placeholder="URL da imagem 2" required><!--create-quizz-incorrect-answer2-url-->
        <p class="create-quizz-incorrect-answer2-url-feedback${i} invalid-feedback2 hidden"></p><!--invalid-feedback2-->
        <!--create-quizzes-input-->
        <input type="text" class="create-quizzes-question-input create-quizz-incorrect-answer3 create-quizz-incorrect-answer3-${i} mt-32" placeholder="Resposta incorreta 3" required><!--create-quizz-incorrect-answer2-->
        <p class="create-quizz-incorrect-answer3-feedback${i} invalid-feedback2 hidden"></p><!--invalid-feedback2-->
        <input type="url" class="create-quizzes-question-input create-quizz-incorrect-answer3-url create-quizz-incorrect-answer3-${i}-url" placeholder="URL da imagem 3" required><!--create-quizz-incorrect-answer2-url-->      
        <p class="create-quizz-incorrect-answer3-url-feedback${i} invalid-feedback2 hidden"></p><!--invalid-feedback2-->
      </div><!--create-quizz-questions-hidden-->
    </form>   
    `;
    }
  }
}

let imaskColor = 0;
function maskColor(inputColor) {
  let valueColor = inputColor.value;

  if (imaskColor === 0 || valueColor === "") {
    let newValueColor = valueColor.replace(/(\d{0})/, "#");
    inputColor.value = newValueColor;

    imaskColor = 0;
  }

  imaskColor++;
}

function viewQuestion(iconEdit) {
  iconEdit.parentNode.classList.add("create-quizz-questions-edit-hidden");
  iconEdit.parentNode.parentNode.children[1].classList.remove("create-quizz-questions-edit-hidden");
  iconEdit.parentNode.parentNode.children[1].classList.remove("create-quizz-questions-edit-show");
  iconEdit.parentNode.parentNode.children[1].classList.add("flex-direction-column");
}

let validURLlink = false;
function validationURL(elementURL, elementURLFeedback) {
  const arrayAcceptableCharacters = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q",
    "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h",
    "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y",
    "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", ".", "_", "~", ":", "/",
    "?", "#", "[", "]", "@", "!", "$", "&", "'", "(", ")", "*", "+", ",", ";", "="
  ];
  const arrayAcceptableImageFormat = ["jpeg", "gif", "png", "svg", "jpg"];

  if (elementURL.value !== "") {
    let url = elementURL.value;
    let validURL = /^(ftp|http|https):\/\/[^ "]+$/.test(url);

    for (let i = 0; i < arrayAcceptableImageFormat.length; i++) {
      console.log(arrayAcceptableImageFormat[i]);
      console.log(elementURL.value.indexOf(arrayAcceptableImageFormat[i]));

      if (validURLlink) {
        continue;
      } else {
        if (elementURL.value.indexOf(arrayAcceptableImageFormat[i]) !== -1) {
          console.log("URL é uma imagem válida suportada!");
          validURLlink = true;
        }

        if (i === arrayAcceptableImageFormat.length - 1 && validURLlink === false) {
          elementURLFeedback.innerHTML = "";
          elementURLFeedback.innerHTML = "O valor informado não é uma URL válida, formato de imagem não suportado!";
          elementURL.classList.add("invalid-input");
          elementURLFeedback.classList.remove("hidden");

          return;
        }
      }
    }
    elementURLFeedback.innerHTML = "";
    elementURL.classList.remove("invalid-input");
    elementURLFeedback.classList.add("hidden");

    let iAcceptableCharacters = 0;
    for (let i = 0; i < elementURL.value.length; i++) {
      for (let j = 0; j < arrayAcceptableCharacters.length; j++) {
        if (elementURL.value[i] === arrayAcceptableCharacters[j]) {
          iAcceptableCharacters = iAcceptableCharacters + 1;
        }
      }
    }

    if (iAcceptableCharacters !== elementURL.value.length) {
      elementURLFeedback.innerHTML = "";
      elementURLFeedback.innerHTML = "O valor informado não é uma URL válida, caracteres inválidos!";
      elementURL.classList.add("invalid-input");
      elementURLFeedback.classList.remove("hidden");

      return;
    }
    elementURLFeedback.innerHTML = "";
    elementURL.classList.remove("invalid-input");
    elementURLFeedback.classList.add("hidden");

    if (validURL === true) {
      console.log("URL válida!");
      return validURL;
    } else {
      elementURLFeedback.innerHTML = "";
      elementURLFeedback.innerHTML = "O valor informado não é uma URL válida, link não acessível!";
      elementURL.classList.add("invalid-input");
      elementURLFeedback.classList.remove("hidden");

      return;
    }
  }
}

function validationColorHex(elementColorHex, elementColorHexFeedback) {
  const arrayAcceptableCharacters = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "A", "B", "C", "D", "E", "F",
    "a", "b", "c", "d", "e", "f",
    "#"
  ];

  if (elementColorHex.value !== null) {
    let iAcceptableCharacters = 0;
    for (let i = 0; i < elementColorHex.value.length; i++) {
      for (let j = 0; j < arrayAcceptableCharacters.length; j++) {
        if (elementColorHex.value[i] === arrayAcceptableCharacters[j]) {
          iAcceptableCharacters = iAcceptableCharacters + 1;
        }
      }
    }

    if (iAcceptableCharacters !== elementColorHex.value.length) {
      elementColorHexFeedback.innerHTML = "";
      elementColorHexFeedback.innerHTML = "O código hexadecimal informado não é válido, informe uma cor válida!";
      elementColorHex.classList.add("invalid-input");
      elementColorHexFeedback.classList.remove("hidden");

      return;
    }
    elementColorHexFeedback.innerHTML = "";
    elementColorHex.classList.remove("invalid-input");
    elementColorHexFeedback.classList.add("hidden");
  }
}

let arrayCreatedQuestions = [];
let objectCreatedQuestion = {};
function createArrayQuizzQuestions(numberQuestions) {
  numberQuestions = questionsQuizzInput;

  let arrayAnswers = [];
  arrayCreatedQuestions = [];
  for (let i = 1; i <= numberQuestions; i++) {
    console.log(i);
    let questionForm = document.querySelector(`form:nth-child(${[i]})`);

    let textQuizzQuestion = document.querySelector(`.create-quizz-text-question${i}`);
    let colorQuizzQuestion = document.querySelector(`.create-quizz-color-question${i}`);
    let correctAnswerQuizzQuestion = document.querySelector(`.create-quizz-correct-answer${i}`);
    let correctAnswerURLQuizzQuestion = document.querySelector(`.create-quizz-correct-answer-url${i}`);
    let incorrectAnswer1QuizzQuestion = document.querySelector(`.create-quizz-incorrect-answer1-${i}`);
    let incorrectAnswer1URLQuizzQuestion = document.querySelector(`.create-quizz-incorrect-answer1-${i}-url`);
    let incorrectAnswer2QuizzQuestion = document.querySelector(`.create-quizz-incorrect-answer2-${i}`);
    let incorrectAnswer2URLQuizzQuestion = document.querySelector(`.create-quizz-incorrect-answer2-${i}-url`);
    let incorrectAnswer3QuizzQuestion = document.querySelector(`.create-quizz-incorrect-answer3-${i}`);
    let incorrectAnswer3URLQuizzQuestion = document.querySelector(`.create-quizz-incorrect-answer3-${i}-url`);

    let textQuizzQuestionFeedback = document.querySelector(`.create-quizz-text-feedback${i}`);
    let colorQuizzQuestionFeedback = document.querySelector(`.create-quizz-color-feedback${i}`);
    let correctAnswerQuizzQuestionFeedback = document.querySelector(`.create-quizz-correct-answer-feedback${i}`);
    let correctAnswerURLQuizzQuestionFeedback = document.querySelector(`.create-quizz-correct-answer-url-feedback${i}`);
    let incorrectAnswer1QuizzQuestionFeedback = document.querySelector(`.create-quizz-incorrect-answer1-feedback${i}`);
    let incorrectAnswer1URLQuizzQuestionFeedback = document.querySelector(`.create-quizz-incorrect-answer1-url-feedback${i}`);
    let incorrectAnswer2QuizzQuestionFeedback = document.querySelector(`.create-quizz-incorrect-answer2-feedback${i}`);
    let incorrectAnswer2URLQuizzQuestionFeedback = document.querySelector(`.create-quizz-incorrect-answer2-url-feedback${i}`);
    let incorrectAnswer3QuizzQuestionFeedback = document.querySelector(`.create-quizz-incorrect-answer3-feedback${i}`);
    let incorrectAnswer3URLQuizzQuestionFeedback = document.querySelector(`.create-quizz-incorrect-answer3-url-feedback${i}`);

    const emptyCondition = (textQuizzQuestion.value === "" || colorQuizzQuestion.value === "" ||
      correctAnswerQuizzQuestion.value === "" || correctAnswerURLQuizzQuestion.value === "" ||
      incorrectAnswer1QuizzQuestion.value === "" || incorrectAnswer1URLQuizzQuestion.value === "");

    if (emptyCondition) {
      alert(`Existem campos que não foram preenchidos, ou URL ou texto das Respostas da Pergunta ${[i]}, reveja os campos. Preencha ao menos uma das Respostas incorretas!`);

      if (textQuizzQuestion.value !== "") {
        textQuizzQuestionFeedback.innerHTML = "";
        textQuizzQuestion.classList.remove("invalid-input");
        textQuizzQuestionFeedback.classList.add("hidden");
      } else {
        textQuizzQuestionFeedback.innerHTML = "";
        textQuizzQuestionFeedback.innerHTML = "Este campo é obrigatório!";
        textQuizzQuestion.classList.add("invalid-input");
        textQuizzQuestionFeedback.classList.remove("hidden");
      }

      if (colorQuizzQuestion.value !== "") {
        colorQuizzQuestionFeedback.innerHTML = "";
        colorQuizzQuestion.classList.remove("invalid-input");
        colorQuizzQuestionFeedback.classList.add("hidden");
      } else {
        colorQuizzQuestionFeedback.innerHTML = "";
        colorQuizzQuestionFeedback.innerHTML = "Este campo é obrigatório!";
        colorQuizzQuestion.classList.add("invalid-input");
        colorQuizzQuestionFeedback.classList.remove("hidden");
      }

      if (correctAnswerQuizzQuestion.value !== "") {
        correctAnswerQuizzQuestionFeedback.innerHTML = "";
        correctAnswerQuizzQuestion.classList.remove("invalid-input");
        correctAnswerQuizzQuestionFeedback.classList.add("hidden");
      } else {
        correctAnswerQuizzQuestionFeedback.innerHTML = "";
        correctAnswerQuizzQuestionFeedback.innerHTML = "Este campo é obrigatório!";
        correctAnswerQuizzQuestion.classList.add("invalid-input");
        correctAnswerQuizzQuestionFeedback.classList.remove("hidden");
      }

      if (correctAnswerURLQuizzQuestion.value !== "") {
        correctAnswerURLQuizzQuestionFeedback.innerHTML = "";
        correctAnswerURLQuizzQuestion.classList.remove("invalid-input");
        correctAnswerURLQuizzQuestionFeedback.classList.add("hidden");
      } else {
        correctAnswerURLQuizzQuestionFeedback.innerHTML = "";
        correctAnswerURLQuizzQuestionFeedback.innerHTML = "Este campo é obrigatório!";
        correctAnswerURLQuizzQuestion.classList.add("invalid-input");
        correctAnswerURLQuizzQuestionFeedback.classList.remove("hidden");
      }

      if (incorrectAnswer1QuizzQuestion.value !== "") {
        incorrectAnswer1QuizzQuestionFeedback.innerHTML = "";
        incorrectAnswer1QuizzQuestion.classList.remove("invalid-input");
        incorrectAnswer1QuizzQuestionFeedback.classList.add("hidden");
      } else {
        incorrectAnswer1QuizzQuestionFeedback.innerHTML = "";
        incorrectAnswer1QuizzQuestionFeedback.innerHTML = "Este campo é obrigatório!";
        incorrectAnswer1QuizzQuestion.classList.add("invalid-input");
        incorrectAnswer1QuizzQuestionFeedback.classList.remove("hidden");
      }

      if (incorrectAnswer1URLQuizzQuestion.value !== "") {
        incorrectAnswer1URLQuizzQuestionFeedback.innerHTML = "";
        incorrectAnswer1URLQuizzQuestion.classList.remove("invalid-input");
        incorrectAnswer1URLQuizzQuestionFeedback.classList.add("hidden");
      } else {
        incorrectAnswer1URLQuizzQuestionFeedback.innerHTML = "";
        incorrectAnswer1URLQuizzQuestionFeedback.innerHTML = "Este campo é obrigatório!";
        incorrectAnswer1URLQuizzQuestion.classList.add("invalid-input");
        incorrectAnswer1URLQuizzQuestionFeedback.classList.remove("hidden");
      }

      return;
    }

    textQuizzQuestionFeedback.innerHTML = "";
    textQuizzQuestion.classList.remove("invalid-input");
    textQuizzQuestionFeedback.classList.add("hidden");

    colorQuizzQuestionFeedback.innerHTML = "";
    colorQuizzQuestion.classList.remove("invalid-input");
    colorQuizzQuestionFeedback.classList.add("hidden");

    correctAnswerQuizzQuestionFeedback.innerHTML = "";
    correctAnswerQuizzQuestion.classList.remove("invalid-input");
    correctAnswerQuizzQuestionFeedback.classList.add("hidden");

    correctAnswerURLQuizzQuestionFeedback.innerHTML = "";
    correctAnswerURLQuizzQuestion.classList.remove("invalid-input");
    correctAnswerURLQuizzQuestionFeedback.classList.add("hidden");

    incorrectAnswer1QuizzQuestionFeedback.innerHTML = "";
    incorrectAnswer1QuizzQuestion.classList.remove("invalid-input");
    incorrectAnswer1QuizzQuestionFeedback.classList.add("hidden");

    incorrectAnswer1URLQuizzQuestionFeedback.innerHTML = "";
    incorrectAnswer1URLQuizzQuestion.classList.remove("invalid-input");
    incorrectAnswer1URLQuizzQuestionFeedback.classList.add("hidden");



    //Text field " " validation
    if (questionForm.querySelector(".create-quizz-text-question").value.length < 20) {
      textQuizzQuestionFeedback.innerHTML = "";
      textQuizzQuestionFeedback.innerHTML = "Texto da Pergunta, deve ser no mínimo 20 caracteres!";
      textQuizzQuestion.classList.add("invalid-input");
      textQuizzQuestionFeedback.classList.remove("hidden");

      return;
    }
    textQuizzQuestionFeedback.innerHTML = "";
    textQuizzQuestion.classList.remove("invalid-input");
    textQuizzQuestionFeedback.classList.add("hidden");


    //Color field " " validation
    if (questionForm.querySelector(".create-quizz-color-question").value === "" || questionForm.querySelector(".create-quizz-color-question").value.length < 7) {
      if (questionForm.querySelector(".create-quizz-color-question").value === "") {
        colorQuizzQuestionFeedback.innerHTML = "";
        colorQuizzQuestionFeedback.innerHTML = "Não pode ser vazio, informe uma cor em formato hexadecimal!";
        colorQuizzQuestion.classList.add("invalid-input");
        colorQuizzQuestionFeedback.classList.remove("hidden");

        return;
      } else {
        colorQuizzQuestionFeedback.innerHTML = "";
        colorQuizzQuestionFeedback.innerHTML = "A cor hexadecimal deve conter no mínimo 7 caracteres!";
        colorQuizzQuestion.classList.add("invalid-input");
        colorQuizzQuestionFeedback.classList.remove("hidden");

        return;
      }
    }
    colorQuizzQuestionFeedback.innerHTML = "";
    colorQuizzQuestion.classList.remove("invalid-input");
    colorQuizzQuestionFeedback.classList.add("hidden");



    //Answers & URL fields " " validation
    if (questionForm.querySelector(".create-quizz-correct-answer").value === "" ||
      questionForm.querySelector(".create-quizz-correct-answer-url").value === "") {
      if (questionForm.querySelector(".create-quizz-correct-answer").value === "") {
        correctAnswerQuizzQuestionFeedback.innerHTML = "";
        correctAnswerQuizzQuestionFeedback.innerHTML = "Não pode ser vazio, informe uma pergunta!";
        correctAnswerQuizzQuestion.classList.add("invalid-input");
        correctAnswerQuizzQuestionFeedback.classList.remove("hidden");

        return;
      } else {
        correctAnswerURLQuizzQuestionFeedback.innerHTML = "";
        correctAnswerURLQuizzQuestionFeedback.innerHTML = "Não pode ser vazio, informe uma URL!";
        correctAnswerURLQuizzQuestion.classList.add("invalid-input");
        correctAnswerURLQuizzQuestionFeedback.classList.remove("hidden");

        return;
      }
    }
    correctAnswerQuizzQuestionFeedback.innerHTML = "";
    correctAnswerQuizzQuestion.classList.remove("invalid-input");
    correctAnswerQuizzQuestionFeedback.classList.add("hidden");

    correctAnswerURLQuizzQuestionFeedback.innerHTML = "";
    correctAnswerURLQuizzQuestion.classList.remove("invalid-input");
    correctAnswerURLQuizzQuestionFeedback.classList.add("hidden");

    if (
      (questionForm.querySelector(".create-quizz-incorrect-answer1").value !== "" ||
        questionForm.querySelector(".create-quizz-incorrect-answer1-url").value !== "") &&

      (questionForm.querySelector(".create-quizz-incorrect-answer2").value !== "" ||
        questionForm.querySelector(".create-quizz-incorrect-answer2-url").value !== "") ||

      (questionForm.querySelector(".create-quizz-incorrect-answer3").value !== "" ||
        questionForm.querySelector(".create-quizz-incorrect-answer3-url").value !== "")
    ) {
      if (
        (questionForm.querySelector(".create-quizz-incorrect-answer2").value === "" ||
          questionForm.querySelector(".create-quizz-incorrect-answer2-url").value === "") &&

        (questionForm.querySelector(".create-quizz-incorrect-answer3").value !== "" ||
          questionForm.querySelector(".create-quizz-incorrect-answer3-url").value !== "")
      ) {
        alert(`Por favor, preencha na sequência correta Pergunta ${i} - Resposta Incorreta 2 e sua URL devem ser preenchidas obrigatoriamente! Ou caso este não seja o problema, reveja se existe algum campo vazio de texto ou URL!`);
        return;
      }
    }

    if (
      ((questionForm.querySelector(".create-quizz-incorrect-answer1").value !== "" ||
        questionForm.querySelector(".create-quizz-incorrect-answer1-url").value !== "") &&

        (questionForm.querySelector(".create-quizz-incorrect-answer2").value !== "" ||
          questionForm.querySelector(".create-quizz-incorrect-answer2-url").value !== ""))
    ) {
      if (questionForm.querySelector(".create-quizz-incorrect-answer2").value === "" ||
        questionForm.querySelector(".create-quizz-incorrect-answer2-url").value === "") {
        if (questionForm.querySelector(".create-quizz-incorrect-answer2").value === "") {
          alert(`Reveja o campo de Resposta Incorreta 2 da Pergunta ${[i]}, não pode ser vazio!`);
          return;
        } else {
          alert(`Reveja o campo de URL da Imagem 2 da Pergunta ${[i]}, não pode ser vazio!`);
          return;
        }
      }
    }

    if (((questionForm.querySelector(".create-quizz-incorrect-answer1").value !== "" ||
      questionForm.querySelector(".create-quizz-incorrect-answer1-url").value !== "") &&

      (questionForm.querySelector(".create-quizz-incorrect-answer2").value !== "" ||
        questionForm.querySelector(".create-quizz-incorrect-answer2-url").value !== "") &&

      (questionForm.querySelector(".create-quizz-incorrect-answer3").value !== "" ||
        questionForm.querySelector(".create-quizz-incorrect-answer3-url").value !== ""))
    ) {
      if (questionForm.querySelector(".create-quizz-incorrect-answer3").value === "" ||
        questionForm.querySelector(".create-quizz-incorrect-answer3-url").value === "") {
        if (questionForm.querySelector(".create-quizz-incorrect-answer3").value === "") {
          alert(`Reveja o campo de Resposta Incorreta 3 da Pergunta ${[i]}, não pode ser vazio!`);
          return;
        } else {
          alert(`Reveja o campo de URL da Imagem 3 da Pergunta ${[i]}, não pode ser vazio!`);
          return;
        }
      } else if (questionForm.querySelector(".create-quizz-incorrect-answer2").value === "" ||
        questionForm.querySelector(".create-quizz-incorrect-answer2-url").value === "") {
        if (questionForm.querySelector(".create-quizz-incorrect-answer2").value === "") {
          alert(`Reveja o campo de Resposta Incorreta 2 da Pergunta ${[i]}, não pode ser vazio!`);
          return;
        } else {
          alert(`Reveja o campo de URL da Imagem 2 da Pergunta ${[i]}, não pode ser vazio!`);
          return;
        }
      }
    }

    validationColorHex(colorQuizzQuestion, colorQuizzQuestionFeedback);
    let colorInvalidHex = document.querySelector(`.create-quizzes-question-input.create-quizz-color-question.create-quizz-color-question${i}.invalid-input`);
    if (colorInvalidHex !== null) {
      return;
    }

    if (correctAnswerURLQuizzQuestion !== null) {
      console.log("Teste 1 - função");
      validationURL(correctAnswerURLQuizzQuestion, correctAnswerURLQuizzQuestionFeedback);
      console.log(validURLlink);
      let urlInvalidCorrectAnswer = document.querySelector(`.create-quizzes-question-input.create-quizz-correct-answer-url.create-quizz-correct-answer-url${i}.invalid-input`);
      console.log(urlInvalidCorrectAnswer);
      if (urlInvalidCorrectAnswer !== null) {
        console.log("Teste 1");
        return;
      } else {
        validationURL(correctAnswerURLQuizzQuestion, correctAnswerURLQuizzQuestionFeedback);
      }
    }

    if (incorrectAnswer1URLQuizzQuestion !== null) {
      console.log("Teste 2 - função");
      validationURL(incorrectAnswer1URLQuizzQuestion, incorrectAnswer1URLQuizzQuestionFeedback);
      console.log(validURLlink);
      let urlInvalidIncorrectAnswer1 = document.querySelector(`.create-quizzes-question-input.create-quizz-incorrect-answer1-url.create-quizz-incorrect-answer1-${i}-url.invalid-input`);
      console.log(urlInvalidIncorrectAnswer1);
      if (urlInvalidIncorrectAnswer1 !== null) {
        console.log("Teste 2");
        return;
      } else {
        validationURL(incorrectAnswer1URLQuizzQuestion, incorrectAnswer1URLQuizzQuestionFeedback);
      }
    }

    if (incorrectAnswer2URLQuizzQuestion !== null) {
      console.log("Teste 3 - função");
      validationURL(incorrectAnswer2URLQuizzQuestion, incorrectAnswer2URLQuizzQuestionFeedback);
      console.log(validURLlink);
      let urlInvalidIncorrectAnswer2 = document.querySelector(`.create-quizzes-question-input.create-quizz-incorrect-answer2-url.create-quizz-incorrect-answer2-${i}-url.invalid-input`);
      console.log(urlInvalidIncorrectAnswer2);
      if (urlInvalidIncorrectAnswer2 !== null) {
        console.log("Teste 3");
        return;
      } else {
        validationURL(incorrectAnswer2URLQuizzQuestion, incorrectAnswer2URLQuizzQuestionFeedback);
      }
    }

    if (incorrectAnswer3URLQuizzQuestion != null) {
      console.log("Teste 4 - função");
      validationURL(incorrectAnswer3URLQuizzQuestion, incorrectAnswer3URLQuizzQuestionFeedback);
      console.log(validURLlink);
      let urlInvalidIncorrectAnswer3 = document.querySelector(`.create-quizzes-question-input.create-quizz-incorrect-answer3-url.create-quizz-incorrect-answer3-${i}-url.invalid-input`);
      console.log(urlInvalidIncorrectAnswer3);
      if (urlInvalidIncorrectAnswer3 !== null) {
        console.log("Teste 4");
        return;
      } else {
        validationURL(incorrectAnswer3URLQuizzQuestion, incorrectAnswer3URLQuizzQuestionFeedback);
      }
    }

    arrayAnswers = [
      {
        text: questionForm.querySelector(".create-quizz-correct-answer").value,
        image: questionForm.querySelector(".create-quizz-correct-answer-url").value,
        isCorrectAnswer: true
      },
      {
        text: questionForm.querySelector(".create-quizz-incorrect-answer1").value,
        image: questionForm.querySelector(".create-quizz-incorrect-answer1-url").value,
        isCorrectAnswer: false
      },
      {
        text: questionForm.querySelector(".create-quizz-incorrect-answer2").value,
        image: questionForm.querySelector(".create-quizz-incorrect-answer2-url").value,
        isCorrectAnswer: false
      },
      {
        text: questionForm.querySelector(".create-quizz-incorrect-answer3").value,
        image: questionForm.querySelector(".create-quizz-incorrect-answer3-url").value,
        isCorrectAnswer: false
      }
    ];

    if (
      (questionForm.querySelector(".create-quizz-incorrect-answer2").value === "" ||
        questionForm.querySelector(".create-quizz-incorrect-answer2-url").value === "") &&
      (questionForm.querySelector(".create-quizz-incorrect-answer3").value === "" ||
        questionForm.querySelector(".create-quizz-incorrect-answer3-url").value === "")
    ) {
      let newArrayAnswers = arrayAnswers.slice(0, 2);

      objectCreatedQuestion["title"] = questionForm.querySelector(".create-quizz-text-question").value;
      objectCreatedQuestion["color"] = questionForm.querySelector(".create-quizz-color-question").value;
      objectCreatedQuestion["answers"] = newArrayAnswers;
      arrayCreatedQuestions.push(objectCreatedQuestion);
      objectCreatedQuestion = {};
    } else if (
      (questionForm.querySelector(".create-quizz-incorrect-answer3").value === "" ||
        questionForm.querySelector(".create-quizz-incorrect-answer3-url").value === "")
    ) {
      let newArrayAnswers = arrayAnswers.slice(0, 3);

      objectCreatedQuestion["title"] = questionForm.querySelector(".create-quizz-text-question").value;
      objectCreatedQuestion["color"] = questionForm.querySelector(".create-quizz-color-question").value;
      objectCreatedQuestion["answers"] = newArrayAnswers;
      arrayCreatedQuestions.push(objectCreatedQuestion);
      objectCreatedQuestion = {};
    } else {
      objectCreatedQuestion["title"] = questionForm.querySelector(".create-quizz-text-question").value;
      objectCreatedQuestion["color"] = questionForm.querySelector(".create-quizz-color-question").value;
      objectCreatedQuestion["answers"] = arrayAnswers;
      arrayCreatedQuestions.push(objectCreatedQuestion);
      objectCreatedQuestion = {};
    }
  }

  console.log(objectCreatedQuestion);
  console.log(arrayCreatedQuestions);
  setTimeout(function () { alert("Campos preenchidos corretamente!"); }, 100);

  createQuizzSetLevelsPage(levelsQuizzInput);
}



//user create quizz task set levels

function createQuizzSetLevelsPage(numLevels) {
  let pageContainer = document.querySelector(".container");
  pageContainer.innerHTML = "";
  pageContainer.innerHTML = `
    <section class="set-levels">
      <h1>Agora, decida os níveis</h1>
      <article>
        <h1>Nível 1</h1>
        <input class="level-Title" placeholder="Título do nível"></input>
        <h2 class="hidden">Título do nível: mínimo de 10 caracteres</h2>
        <input class="level-MinValue" placeholder="% de acerto mínima"></input>
        <h2 class="hidden">% de acerto mínima: um número inteiro entre 0 e 100</h2>
        <h2 class="hidden">É obrigatório existir pelo menos 1 nível cuja % de acerto mínima seja 0%</h2>
        <input class="level-imgURL" placeholder="URL da imagem do nível"></input>
        <h2 class="hidden">URL não é valida</h2>
        <textarea class="level-text"placeholder="Descrição do nível"></textarea>
        <h2 class="hidden">Descrição do nível: mínimo de 30 caracteres</h2>
      </article>
    </section>
    `
  let sectionLevel = document.querySelector("section")

  for (let i = 2; i <= numLevels; i++) {
    sectionLevel.innerHTML += `
      <article>
        <h1>Nível ${i}</h1>
        <img onclick="expandInput(this)" class="create-icon" src="./assets/Icons/create-icon.png">
        <input class="level-Title hidden" placeholder="Título do nível"></input>
        <h2 class="hidden">Título do nível: mínimo de 10 caracteres</h2>
        <input class="level-MinValue hidden" placeholder="% de acerto mínima"></input>
        <h2 class="hidden">% de acerto mínima: um número inteiro entre 0 e 100</h2>
        <h2 class="hidden">É obrigatório existir pelo menos 1 nível cuja % de acerto mínima seja 0%</h2>
        <input class="level-imgURL hidden" placeholder="URL da imagem do nível"></input>
        <h2 class="hidden">URL não é valida</h2>
        <textarea class="level-text hidden"placeholder="Descrição do nível"></textarea>
        <h2 class="hidden">Descrição do nível: mínimo de 30 caracteres</h2>
      </article>
      `
  }
  sectionLevel.innerHTML += `<button onclick="CreateQuizzLevelsArray(${numLevels})">Finalizar Quizz</button>`
}

//expand inputs on levels creation

function expandInput(element) {

  let arrayHiddenInput = element.closest("article").querySelectorAll("input");

  for (let i = 0; i < arrayHiddenInput.length; i++) {

    arrayHiddenInput[i].classList.remove("hidden")

  }

  element.closest("article").querySelector("textarea").classList.remove("hidden")

  element.classList.add("hidden")

  element.closest("article").scrollIntoView()
}

//storage created levels data into arr to later use

let arrCreatedLevels = [];

function CreateQuizzLevelsArray(numLevels) {

  let minValueZeroPercente = false

  console.log(numLevels)

  let cleanPage = false;

  let verified = true

  for (i = 2; i <= numLevels + 1; i++) {

    let userLevel = document.querySelector(`article:nth-child(${i})`)

    if (cleanPage === true) {
      userLevel.querySelector(`h2:nth-of-type(${1})`).classList.add("hidden")
      userLevel.querySelector(".level-Title").classList.remove("failed-validation")
      userLevel.querySelector(`h2:nth-of-type(${2})`).classList.add("hidden")
      userLevel.querySelector(".level-MinValue").classList.remove("failed-validation")
      userLevel.querySelector(`h2:nth-of-type(${5})`).classList.add("hidden")
      userLevel.querySelector(".level-text").classList.remove("failed-validation")
      userLevel.querySelector(`h2:nth-of-type(${4})`).classList.add("hidden")
      userLevel.querySelector(".level-text").classList.remove("failed-validation")
    }

    verified = true
    console.log(i)

    if (userLevel.querySelector(".level-Title") === null || userLevel.querySelector(".level-Title").value.length < 10 || userLevel.querySelector(".level-Title").value.length === "") {
      userLevel.querySelector(`h2:nth-of-type(${1})`).classList.remove("hidden")
      arrCreatedLevels = []
      verified = false
      userLevel.querySelector(`h2:nth-of-type(${1})`).scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
      userLevel.querySelector(".level-Title").classList.add("failed-validation")
      cleanPage = true;
    }

    else if (userLevel.querySelector(".level-MinValue") === null || userLevel.querySelector(".level-MinValue").value === "" || userLevel.querySelector(".level-MinValue").value % 1 != 0 || userLevel.querySelector(".level-MinValue").value < 0 || userLevel.querySelector(".level-MinValue").value > 100) {
      userLevel.querySelector(`h2:nth-of-type(${2})`).classList.remove("hidden")
      arrCreatedLevels = []
      verified = false
      userLevel.querySelector(`h2:nth-of-type(${2})`).scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
      userLevel.querySelector(".level-MinValue").classList.add("failed-validation")
      cleanPage = true;
    }

    else if (userLevel.querySelector(".level-text") === null || userLevel.querySelector(".level-text").value.length < 30 || userLevel.querySelector(".level-text").value === "") {
      userLevel.querySelector(`h2:nth-of-type(${5})`).classList.remove("hidden")
      arrCreatedLevels = []
      verified = false
      userLevel.querySelector(`h2:nth-of-type(${5})`).scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
      userLevel.querySelector(".level-text").classList.add("failed-validation")
      cleanPage = true;
    }

    else if (userLevel.querySelector(".level-imgURL") === null || validateURL(userLevel.querySelector(".level-imgURL").value) === false || userLevel.querySelector(".level-imgURL").value === "") {
      userLevel.querySelector(`h2:nth-of-type(${4})`).classList.remove("hidden")
      arrCreatedLevels = []
      verified = false
      userLevel.querySelector(`h2:nth-of-type(${4})`).scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
      userLevel.querySelector(".level-text").classList.add("failed-validation")
      cleanPage = true;
    }


    else if (verified == true) {
      let objUserlevel =
      {
        title: userLevel.querySelector(".level-Title").value,
        image: userLevel.querySelector(".level-imgURL").value,
        text: userLevel.querySelector(".level-text").value,
        minValue: userLevel.querySelector(".level-MinValue").value,
      }

      arrCreatedLevels.push(objUserlevel);

    }

    else {
      verified = false
      return;
    }


  }

  if (verified === false) {
    return;
  }

  else if (verified === true) {

    for (i = 0; i < numLevels; i++) {

      if (arrCreatedLevels[i].minValue === "0") {

        minValueZeroPercente = true
      }

    }


    if (minValueZeroPercente === false) {
      alert("É obrigatório existir pelo menos 1 nível cuja % de acerto mínima seja 0%")
      arrCreatedLevels = []
      return;
    }

    console.log(arrCreatedLevels)
    sendCreatedQuizz(titleQuizzInput, URLQuizzInput, arrayCreatedQuestions, arrCreatedLevels);
  }

  else { }
}

let createdQuizzUser = {};
function sendCreatedQuizz(createdQuizzTitle, createdQuizzImage, createdQuizzArrayQuestions, createdQuizzArrayLevels) {
  createdQuizzUser["title"] = createdQuizzTitle;
  createdQuizzUser["image"] = createdQuizzImage;
  createdQuizzUser["questions"] = createdQuizzArrayQuestions;
  createdQuizzUser["levels"] = createdQuizzArrayLevels;

  console.log(createdQuizzUser);
  nowLoading();

  promisseSendCreatedQuizz = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", createdQuizzUser);
  promisseSendCreatedQuizz.then(sendCreatedQuizzSucess);
  promisseSendCreatedQuizz.then(storeUserCreatedQuizz);
  promisseSendCreatedQuizz.then(nowLoading)
  promisseSendCreatedQuizz.catch(sendCreatedQuizzFailure);
}

function sendCreatedQuizzSucess(answerSendCreatedQuizz) {
  console.log(answerSendCreatedQuizz.data);

  let arrayQuizzCreated = answerSendCreatedQuizz.data;

  let pageContainer = document.querySelector(".container");
  pageContainer.innerHTML = "";
  pageContainer.innerHTML = `
  <!--created-quizz-success-title-->
  <h2 class="created-quizz-success-title">Seu quizz está pronto!</h2>
  <!--created-quizz-success-quizz-->
  <div class="created-quizz-success-quizz">
    <!--created-quizz-success-quizz-bg-->
    <img class="created-quizz-success-quizz-bg" src="${arrayQuizzCreated.image}">
    <!--created-quizz-success-quizz-degrade-->
    <div class="created-quizz-success-quizz-degrade" onclick="getQuizzByID(${arrayQuizzCreated.id})"></div>
    <!--created-quizz-success-quizz-title-->
    <div class="created-quizz-success-quizz-title">
      <p>${arrayQuizzCreated.title}</p>
    </div>
  </div>
  <!--created-quizz-success-quizz-button-->
  <button class="created-quizz-success-quizz-button" onclick="getQuizzByID(${arrayQuizzCreated.id})">Acessar Quizz</button>
  <!--created-quizz-success-quizz-link-->
  <a class="created-quizz-success-quizz-link" onclick="backHomePage()">Voltar pra home</a> 
  `;

  alert("Quizz criado com sucesso, parabéns!");
}

function sendCreatedQuizzFailure(errorSendCreatedQuizz) {
  console.log(errorSendCreatedQuizz.response);

  alert(`Não foi possível enviar seu quizz, em virturde de ter ocorrido um erro ${errorSendCreatedQuizz.response.status}`);
  backHomePage();
}

function validateURL(url) {

  const arrayAcceptableCharacters = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q",
    "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h",
    "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y",
    "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", ".", "_", "~", ":", "/",
    "?", "#", "[", "]", "@", "!", "$", "&", "'", "(", ")", "*", "+", ",", ";", "="
  ];


  if (url !== null) {
    let iAcceptableCharacters = 0;
    for (let i = 0; i < url.length; i++) {
      for (let j = 0; j < arrayAcceptableCharacters.length; j++) {
        if (url[i] === arrayAcceptableCharacters[j]) {
          iAcceptableCharacters = iAcceptableCharacters + 1;
        }
      }
    }

    if (iAcceptableCharacters !== url.length) {
      alert("Campo de URL inválido, informe uma URL válida!");
      return false;
    }
  }

  return true;

}



function listCreatedUserQuizz(quizzData) {

  if (userCreatedQuizzId == "") {

    document.querySelector(".user-quizzes-none").classList.remove("hidden")
    document.querySelector(".user-quizzes-listed").classList.add("hidden")
  }

  else {

    document.querySelector(".user-quizzes-none").classList.add("hidden")
    document.querySelector(".user-quizzes-listed").classList.remove("hidden")

    let container = document.querySelector(".user-quizzes-listed-all")
    container.innerHTML = "";



    for (let j = 0; j < userCreatedQuizzData.length; j++) {

      if (userCreatedQuizzData[j] === null) {
        continue;
      }

      else {


        container.innerHTML += `
          <div class="all-quizzes-quizz">
          <div class="user-quizz-options">
          <img onclick="editQuizz(${userCreatedQuizzData[j].id})" class="create-icon" src="./assets/Icons/create-icon-white.png">
          <img onclick="deleteQuizz(${userCreatedQuizzData[j].id})" class="create-icon" src="./assets/Icons/DeleteIconWhite.png">
          </div>
          <img onclick="getQuizzByID(${userCreatedQuizzData[j].id})" class="all-quizzes-quizz-bg" src="${userCreatedQuizzData[j].image}">
          <div onclick="getQuizzByID(${userCreatedQuizzData[j].id})" class="all-quizzes-quizz-degrade"></div>
          <div onclick="getQuizzByID(${userCreatedQuizzData[j].id})" class="all-quizzes-quizz-title">
          <p>${userCreatedQuizzData[j].title}</p>
          </div>
          </div>      
                `;

      }


    }

  }

}

function editQuizz(quizzID) {
  alert("Clicou em Editar")
}

function filterNull(arrayElement) {
  if (arrayElement != null) {
    return true
  }
}




function deleteQuizz(quizzID) {


  if (confirm('Tem certeza que deseja deletar esse quizz?')) {
    nowLoading()
    let objDelete =
    {
      headers: { "Secret-Key": userCreatedQuizzSecretKey[quizzID] },
    }

    let promisse = axios.delete(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quizzID}`, objDelete);


    promisse.then(promisseSucess);
    promisse.then(nowLoading())
    promisse.catch(promisseFail)


    function promisseSucess() {
      const index = userCreatedQuizzId.indexOf(quizzID);

      if (index > -1) {
        userCreatedQuizzId.splice(index, 1);
      }

      delete userCreatedQuizzData[index];
      delete userCreatedQuizzSecretKey[quizzID];


      let userCreatedQuizzDataStringified;
      let userCreatedQuizzIdStringified;
      let userCreatedQuizzSecretKeyStringified;


      userCreatedQuizzDataStringified = JSON.stringify(userCreatedQuizzData)
      userCreatedQuizzIdStringified = JSON.stringify(userCreatedQuizzId)
      userCreatedQuizzSecretKeyStringified = JSON.stringify(userCreatedQuizzSecretKey)

      localStorage.setItem("data", userCreatedQuizzDataStringified)
      localStorage.setItem("id", userCreatedQuizzIdStringified)
      localStorage.setItem("UniqueKey", userCreatedQuizzSecretKeyStringified)

      window.location.reload()

    }

    function promisseFail(answer) {
      console.log(answer)

    }

  } else {

  }

}


if (userCreatedQuizzId === null || userCreatedQuizzId == "") {

  userCreatedQuizzData = []
  userCreatedQuizzId = []
  userCreatedQuizzSecretKey = {}

}

function storeUserCreatedQuizz(resposta) {
  userCreatedQuizzData.push(resposta.data)
  userCreatedQuizzId.push(resposta.data.id)
  userCreatedQuizzSecretKey[resposta.data.id] = resposta.data.key

  let userCreatedQuizzDataStringified;
  let userCreatedQuizzIdStringified;
  let userCreatedQuizzSecretKeyStringified;


  userCreatedQuizzDataStringified = JSON.stringify(userCreatedQuizzData)
  userCreatedQuizzIdStringified = JSON.stringify(userCreatedQuizzId)
  userCreatedQuizzSecretKeyStringified = JSON.stringify(userCreatedQuizzSecretKey)

  localStorage.setItem("data", userCreatedQuizzDataStringified)
  localStorage.setItem("id", userCreatedQuizzIdStringified)
  localStorage.setItem("UniqueKey", userCreatedQuizzSecretKeyStringified)
}



function getQuizzByID(element) {
  nowLoading()
  loadedQuizzID = element

  let pageContainer = document.querySelector(".container")
  pageContainer.scrollIntoView()

  askPromisse = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${element}`);
  askPromisse.then(promisseFulfilled);
  askPromisse.then(nowLoading);
  askPromisse.catch(promisseFail);

  function promisseFulfilled(answer) {

    showQuizzQuestions(answer)

  }

  function promisseFail(answer) {
    console.log(answer);

  }

  function showQuizzQuestions(quizzData) {

    pageContainer.innerHTML = ""

    //add banner
    pageContainer.innerHTML += `
      <div class="quizz-conteiner">
      <section class="banner-quizz">
      <h1>${quizzData.data.title}</h1>
      <img src="${quizzData.data.image}" alt=""/>
      </section>
      </div>`

    //add N questions cards
    for (let i = 0; i < quizzData.data.questions.length; i++) {

      pageContainer.querySelector(".quizz-conteiner").innerHTML +=
        `     <div class="question-card not-answered" data-identifier="question">
      <div style="background-color: ${quizzData.data.questions[i].color}" class="question-title">
      <h1>${quizzData.data.questions[i].title}</h1>
      </div>`

      //add M answers to N card

      let arrayNumbAnswer = [];

      for (let w = 0; w < quizzData.data.questions[i].answers.length; w++) {
        arrayNumbAnswer.push(w);
      }

      arrayNumbAnswer.sort(() => Math.random() - 0.5);

      for (let j = 0; j < quizzData.data.questions[i].answers.length; j++) {

        pageContainer.querySelector(".question-card:last-child").innerHTML += `
              <div onclick="selectAnswer(this)" class="answer-card ${quizzData.data.questions[i].answers[arrayNumbAnswer[j]].isCorrectAnswer}" data-identifier="answer">
              <div class="answer-img-container">
              <img src="${quizzData.data.questions[i].answers[arrayNumbAnswer[j]].image}" alt=""/>
              </div>
              <h1>${quizzData.data.questions[i].answers[arrayNumbAnswer[j]].text}</h1>
              </div> `
      }
    }

    loadedQuizzData = quizzData;

    document.querySelector("header").scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }
}

function selectAnswer(element) {

  if (element.classList.contains(true)) {
    correctAnswers++;
  }

  const questionCard = element.closest(".question-card")
  const nodeListAnswers = questionCard.querySelectorAll(".answer-card")

  for (let i = 0; i < nodeListAnswers.length; i++) {

    if (nodeListAnswers[i].classList.contains(false)) {
      nodeListAnswers[i].classList.add("answer-false")

    }
    else (
      nodeListAnswers[i].classList.add("answer-true")
    )
    nodeListAnswers[i].removeAttribute("onclick")
  }


  for (let i = 0; i < nodeListAnswers.length; i++) {

    if (element !== nodeListAnswers[i]) {
      nodeListAnswers[i].classList.add("answer-not-selected")
    }
  }
  questionCard.classList.remove("not-answered")

  let nextQuestion = document.querySelector(".not-answered")

  if (nextQuestion === null && answeredQuestions !== 0) {

    awardScreen();
    nextQuestion = document.querySelector(".award-screen")

    setTimeout(scrollToNextQuestion, 2000)

  }

  else {
    setTimeout(scrollToNextQuestion, 2000)
  }

  function scrollToNextQuestion() {
    nextQuestion.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
  }

  answeredQuestions++;
}


function awardScreen() {

  let pageContainer = document.querySelector(".container");
  let numQuestions = loadedQuizzData.data.questions.length
  let numLevels = loadedQuizzData.data.levels.length
  let arrLevelsMinValue = [];
  let answerPercentage = Math.round(100 * correctAnswers / numQuestions);
  let indexLevel;

  for (let i = 0; i < numLevels; i++) {
    arrLevelsMinValue.push(loadedQuizzData.data.levels[i].minValue)
  }

  for (let i = 0; i < arrLevelsMinValue.length; i++) {

    if (parseInt(arrLevelsMinValue[i]) <= answerPercentage) {
      indexLevel = i
    }
  }


  pageContainer.querySelector(".quizz-conteiner").innerHTML += `
      <div class="question-card award-screen" data-identifier="question" data-identifier="quizz-result">
      <div style="background-color: #EC362D" class="question-title">
      <h1>${answerPercentage}% de acerto: ${loadedQuizzData.data.levels[indexLevel].title}</h1>
      </div>
      <div class="img-text-box">
      <img src="${loadedQuizzData.data.levels[indexLevel].image}" alt=""/>
      <h1>${loadedQuizzData.data.levels[indexLevel].text}</h1>
      </div>
      </div>
      <nav class="nav-quizz">
      <button onclick="resetQuizz()">Reiniciar Quizz</button>
      <h1 onclick="backHomePage()">Voltar para home</h1>
      </nav> `

}

function resetQuizz() {

  correctAnswers = 0
  answeredQuestions = 0;
  loadedQuizzData = null;
  getQuizzByID(loadedQuizzID)
}

function backHomePage() {
  correctAnswers = 0;
  answeredQuestions = 0;
  loadedQuizzData, loadedQuizzID = null;

  document.querySelector("body").innerHTML = frontPage;
  listQuizzesRequest();


}

function nowLoading() {

  let nowLoadingDiv = document.querySelector(".now-loading");
  nowLoadingDiv.classList.toggle("hidden")

}
