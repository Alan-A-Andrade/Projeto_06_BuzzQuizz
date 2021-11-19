setInterval(listQuizzesRequest, 1000);
function listQuizzesRequest(){
  promisseGetQuizzes = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
  promisseGetQuizzes.then(listQuizzes);
}

function listQuizzes(answerListQuizzes){
  let quizzes = answerListQuizzes.data;
  let quizzesListed = document.querySelector(".all-quizzes-listed");

  quizzesListed.innerHTML = "";
  for(let i = 0 ; i < quizzes.length ; i++){
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

function getQuizzByID(quizzID) {
  alert(quizzID);

  let pageContainer = document.querySelector(".container");


  ///// em alguma parte do elemento terá informação do quizz que a pessoa está clicando
  //// essa informação ID unico do quizz

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
    pageContainer.innerHTML = ""
    console.log(quizzData.data.questions);

    pageContainer.innerHTML += `
    <section class="banner-quizz">
    <h1>${quizzData.data.title}</h1>
    <img src="${quizzData.data.image}" alt=""/>
    </section>

    <div class="question-card">
    <div class="answer-card">
    <img src="https://picsum.photos/600/400" alt=""/>
    <h1>Resposta Aqui</h1>
    </div>
    <div class="answer-card">
    <img src="https://picsum.photos/600/400" alt=""/>
    <h1>Resposta Aqui</h1>
    </div>
    <div class="answer-card">
    <img src="https://picsum.photos/600/400" alt=""/>
    <h1>Resposta Aqui</h1>
    </div>
    <div class="answer-card">
    <img src="https://picsum.photos/600/400" alt=""/>
    <h1>Resposta Aqui</h1>
    </div>
    </div>
    `
  }
}