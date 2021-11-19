let listQuizzesInterval = setInterval(listQuizzesRequest, 1000);
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

function createQuizz(){
  let pageContainer = document.querySelector(".container");
  pageContainer.innerHTML = "";

  pageContainer.innerHTML = `
  <section class="create-quizzes">
    <!--create-quizzes-title-->
    <h2 class="create-quizzes-title">Comece pelo começo</h2>

    <!--create-quizzes-inputs-->
    <div class="create-quizzes-inputs">
      <!--create-quizzes-input-->
      <input class="create-quizzes-input" placeholder="Título do seu quizz">

      <!--create-quizzes-input-->
      <input class="create-quizzes-input" placeholder="URL da imagem do seu quizz">

      <!--create-quizzes-input-->      
      <input class="create-quizzes-input" placeholder="Quantidade de perguntas do quizz">

      <!--create-quizzes-input-->
      <input class="create-quizzes-input" placeholder="Quantidade de níveis do quizz">
    </div>

    <!--create-quizzes-button-->
    <button class="create-quizzes-button" onclick="createQuizzQuestions()">Prosseguir pra criar perguntas</button>
  <section><!--create-quizzes-->
  `;
}

function createQuizzQuestions(){
  alert("teste");
}


function getQuizzByID(element) {
  clearInterval(listQuizzesInterval);
  let pageContainer = document.querySelector(".container");

  askPromisse = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${element}`);
  askPromisse.then(promisseFulfilled);
  askPromisse.catch(promisseFail);

  function promisseFulfilled(answer) {
    showQuizzQuestions(answer);
  }

  function promisseFail(answer) {
    console.log(answer);
  }

  function showQuizzQuestions(quizzData) {
    pageContainer.innerHTML = "";

    //Add banner
    pageContainer.innerHTML += `
    <div class="quizz-conteiner">
      <section class="banner-quizz">
      <h1>${quizzData.data.title}</h1>
      <img src="${quizzData.data.image}" alt=""/>
      </section>
    </div>
    `;

    //Add N questions cards
    for (let i = 0; i < quizzData.data.questions.length; i++) {
      pageContainer.querySelector(".quizz-conteiner").innerHTML += `     
      <div class="question-card" data-identifier="question">
        <div style="background-color: ${quizzData.data.questions[i].color}" class="question-title">
        <h1>${quizzData.data.questions[i].title}</h1>
      </div>
      `;

      //Add M answers to N card
      let arrayNumbAnswer = [];
      for (let w = 0; w < quizzData.data.questions[i].answers.length; w++) {
        arrayNumbAnswer.push(w);
      }

      arrayNumbAnswer.sort(() => Math.random() - 0.5);
      for (let j = 0; j < quizzData.data.questions[i].answers.length; j++) {
        pageContainer.querySelector(".question-card:last-child").innerHTML += `
        <div class="answer-card ${quizzData.data.questions[i].answers[arrayNumbAnswer[j]].isCorrectAnswer}" data-identifier="answer">
          <div class="answer-img-container">
            <img src="${quizzData.data.questions[i].answers[arrayNumbAnswer[j]].image}" alt=""/>
          </div>
          <h1>${quizzData.data.questions[i].answers[arrayNumbAnswer[j]].text}</h1>
        </div>
        `;
      }
    }
  }
}