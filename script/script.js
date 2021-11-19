let listQuizzesInterval = setInterval(listQuizzesRequest, 1000);

let correctAnswers = 0;
let answeredQuestions = 0;
let loadedQuizzData;
let loadedQuizzID;
const frontPage = document.querySelector("body").innerHTML

listQuizzesRequest();

function listQuizzesRequest() {
    promisseGetQuizzes = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promisseGetQuizzes.then(listQuizzes);
}

function listQuizzes(answerListQuizzes) {
    let quizzes = answerListQuizzes.data;
    let quizzesListed = document.querySelector(".all-quizzes-listed");

    quizzesListed.innerHTML = "";
    for (let i = 0; i < quizzes.length; i++) {
        let quizz = quizzes[i];

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

      <!--create-quizzes-input-->
      <input type="url" class="create-quizzes-input create-quizz-url" placeholder="URL da imagem do seu quizz" required>

      <!--create-quizzes-input-->      
      <input type="number" min="0" class="create-quizzes-input create-quizz-questions" placeholder="Quantidade de perguntas do quizz" required>

      <!--create-quizzes-input-->
      <input type="number" min="0" class="create-quizzes-input create-quizz-levels" placeholder="Quantidade de níveis do quizz" required>
    </form>

    <!--create-quizzes-button-->
    <button class="create-quizzes-button" onclick="createQuizzQuestions()">Prosseguir pra criar perguntas</button>
  <section><!--create-quizzes-->
  `;
}

<<<<<<< HEAD
function createQuizzQuestions() {
    alert("teste");
=======
function createQuizzQuestions(){
  const arrayAcceptableCharacters = [
    "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q",
    "R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h",
    "i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y",
    "z","0","1","2","3","4","5","6","7","8","9","-",".","_","~",":","/",
    "?","#","[","]","@","!","$","&","'","(",")","*","+",",",";","="
  ];
  console.log(arrayAcceptableCharacters);

  const createQuizzTitle = document.querySelector(".create-quizz-title");
  const createQuizzURL = document.querySelector(".create-quizz-url");
  const createQuizzQuestions = document.querySelector(".create-quizz-questions");
  const createQuizzLevels = document.querySelector(".create-quizz-levels");

  createQuizzInputsEmpytValidation = (createQuizzTitle.value === "" || createQuizzURL.value === "" || 
                                      createQuizzQuestions.value === "" || createQuizzLevels.value === "");
  createQuizzInputTitleValidation = (createQuizzTitle.value.length < 20 || createQuizzTitle.value.length > 65);
  createQuizzInputQuestionsValidation = (createQuizzQuestions.value < 3);
  createQuizzInputLevelsValidation = (createQuizzLevels.value < 3);

  if(createQuizzInputsEmpytValidation){
    alert("Existem campos vazios, preeencha todos eles!");
    return;
  }

  if(createQuizzInputTitleValidation){
    if(createQuizzTitle.value.length < 20){
      alert("Campo do Título menor do que 20 caracteres!");
      return;
    }else{
      alert("Campo do Título maior do que 65 caracteres!");
      return;
    }
  }else{
    
  }

  if(createQuizzInputQuestionsValidation){
    alert("Campo de Perguntas no mínimo 3!");
    return;
  }

  if(createQuizzInputLevelsValidation){
    alert("Campo de Níveis no mínimo 3!");
    return;
  }
  
  if(createQuizzURL.value !== null){
    let iAcceptableCharacters = 0;
    for (let i = 0; i < createQuizzURL.value.length; i++) {
      for (let j = 0; j < arrayAcceptableCharacters.length; j++) {
        if (createQuizzURL.value[i] === arrayAcceptableCharacters[j]) {
          iAcceptableCharacters = iAcceptableCharacters + 1;
          console.log(iAcceptableCharacters);
        }
      }
    }
  
    if (iAcceptableCharacters !== createQuizzURL.value.length) {
      alert("Campo de URL inválido, informe uma URL válida!");
      return;
    }
  }

  alert("campos ok!");
>>>>>>> 30d82430a0979fbef92811cc3701cc4da308f69f
}





function getQuizzByID(element) {

    loadedQuizzID = element

    clearInterval(listQuizzesInterval);

    let pageContainer = document.querySelector(".container")

    askPromisse = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${element}`);
    askPromisse.then(promisseFulfilled);
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

        document.querySelector("header").scrollIntoView();
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

    correctAnswers, answeredQuestions = 0;
    loadedQuizzData = null;


    getQuizzByID(loadedQuizzID)
}

function backHomePage() {
    correctAnswers, answeredQuestions = 0;
    loadedQuizzData, loadedQuizzID = null;

    document.querySelector("body").innerHTML = frontPage;
    listQuizzesRequest();
    listQuizzesInterval = setInterval(listQuizzesRequest, 1000);

}