let listQuizzesInterval = setInterval(listQuizzesRequest, 10000);

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

function createQuizz(){
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

let titleQuizzInput;
let URLQuizzInput;
let questionsQuizzInput;
let levelsQuizzInput;
function createQuizzQuestions(){
  let pageContainer = document.querySelector(".container");
  const createQuizzTitle = document.querySelector(".create-quizz-title");
  const createQuizzURL = document.querySelector(".create-quizz-url");
  const createQuizzQuestions = document.querySelector(".create-quizz-questions");
  const createQuizzLevels = document.querySelector(".create-quizz-levels");
  const arrayAcceptableCharacters = [
    "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q",
    "R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h",
    "i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y",
    "z","0","1","2","3","4","5","6","7","8","9","-",".","_","~",":","/",
    "?","#","[","]","@","!","$","&","'","(",")","*","+",",",";","="
  ];

  createQuizzInputsEmpytValidation = (createQuizzTitle.value === "" || createQuizzURL.value === "" || 
                                      createQuizzQuestions.value === "" || createQuizzLevels.value === "");
  createQuizzInputTitleValidation = (createQuizzTitle.value.length < 20 || createQuizzTitle.value.length > 65);
  createQuizzInputQuestionsValidation = (createQuizzQuestions.value < 3);
  createQuizzInputLevelsValidation = (createQuizzLevels.value < 2);

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
    alert("Campo de Níveis no mínimo 2!");
    return;
  }
  
  if(createQuizzURL.value !== null){
    let iAcceptableCharacters = 0;
    for (let i = 0; i < createQuizzURL.value.length; i++) {
      for (let j = 0; j < arrayAcceptableCharacters.length; j++) {
        if (createQuizzURL.value[i] === arrayAcceptableCharacters[j]) {
          iAcceptableCharacters = iAcceptableCharacters + 1;
        }
      }
    }
  
    if (iAcceptableCharacters !== createQuizzURL.value.length) {
      alert("Campo de URL inválido, informe uma URL válida!");
      return;
    }
  }

  alert("Campos preenchidos corretamente!");
  
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
  for(let i = 1; i <= questionsQuizzInput; i++){
    if(i === 1){
      createQuizzQuestionsContent.innerHTML += `
      <!--create-quizz-question-->
      <form class="create-quizz-question question${i}">
        <div class="create-quizz-questions-edit create-quizz-questions-edit-hidden">
          <!--create-quizz-correct-question-title-->
          <p class="create-quizzes-question-title create-quizz-correct-question${i}-title">Pergunta ${i}</p>
  
          <!--fa fa-pencil-square-o-->
          <i class="fa fa-pencil-square-o icon-edit" aria-hidden="true" onclick="viewQuestion(this)"></i>
        </div><!--create-quizz-questions-edit-->
  
        <div class="create-quizz-questions-edit-show">
          <!--create-quizz-correct-question-title-->
          <p class="create-quizzes-question-title create-quizz-correct-question${i}-title">Pergunta ${i}</p>
          
          <!--create-quizz-text-question-->
          <input type="text" class="create-quizzes-question-input create-quizz-text-question" placeholder="Texto da pergunta" required>
          
          <!--create-quizz-color-question-->
          <input type="text" maxlength="7" onkeypress="maskColor(this)" class="create-quizzes-question-input create-quizz-color-question" placeholder="Cor de fundo da pergunta" required>
          
          
          <!--create-quizz-correct-answer-title-->
          <p class="create-quizzes-question-title-correct-answer create-quizz-correct-answer-title">Resposta correta</p>
          
          <!--create-quizzes-input-->
          <input type="text" class="create-quizzes-question-input create-quizz-correct-answer" placeholder="Resposta correta" required><!--create-quizz-correct-answer-->
          <input type="url" class="create-quizzes-question-input create-quizz-correct-answer-url" placeholder="URL da imagem" required><!--create-quizz-correct-answer-url-->
          
          
          <!--create-quizz-incorrect-question1-title-->
          <p class="create-quizzes-question-title-incorrect-answer create-quizz-incorrect-question-title">Respostas incorretas</p>
          
          <!--create-quizzes-input-->
          <input type="text" class="create-quizzes-question-input create-quizz-incorrect-answer1" placeholder="Resposta incorreta 1" required><!--create-quizz-incorrect-answer1-->
          <input type="url" class="create-quizzes-question-input create-quizz-incorrect-answer1-url" placeholder="URL da imagem 1" required><!--create-quizz-incorrect-answer1-url-->
          
          <!--create-quizzes-input-->
          <input type="text" class="create-quizzes-question-input create-quizz-incorrect-answer2 mt-32" placeholder="Resposta incorreta 2" required><!--create-quizz-incorrect-answer2-->
          <input type="url" class="create-quizzes-question-input create-quizz-incorrect-answer2-url" placeholder="URL da imagem 2" required><!--create-quizz-incorrect-answer2-url-->
          
          <!--create-quizzes-input-->
          <input type="text" class="create-quizzes-question-input create-quizz-incorrect-answer3 mt-32" placeholder="Resposta incorreta 3" required><!--create-quizz-incorrect-answer2-->
          <input type="url" class="create-quizzes-question-input create-quizz-incorrect-answer3-url" placeholder="URL da imagem 3" required><!--create-quizz-incorrect-answer2-url-->      
        </div><!--create-quizz-questions-hidden-->
      </form>   
      `;
    }else{
      createQuizzQuestionsContent.innerHTML += `
      <!--create-quizz-question-->
      <form class="create-quizz-question question${i}">
        <div class="create-quizz-questions-edit">
          <!--create-quizz-correct-question-title-->
          <p class="create-quizzes-question-title create-quizz-correct-question${i}-title">Pergunta ${i}</p>
  
          <!--fa fa-pencil-square-o-->
          <i class="fa fa-pencil-square-o icon-edit" aria-hidden="true" onclick="viewQuestion(this)"></i>
        </div><!--create-quizz-questions-edit-->
  
        <div class="create-quizz-questions-edit-hidden">
          <!--create-quizz-correct-question-title-->
          <p class="create-quizzes-question-title create-quizz-correct-question${i}-title">Pergunta ${i}</p>
          
          <!--create-quizz-text-question-->
          <input type="text" class="create-quizzes-question-input create-quizz-text-question" placeholder="Texto da pergunta" required>
          
          <!--create-quizz-color-question-->
          <input type="text" maxlength="7" onkeypress="maskColor(this)" class="create-quizzes-question-input create-quizz-color-question" placeholder="Cor de fundo da pergunta" required>
          
          
          <!--create-quizz-correct-answer-title-->
          <p class="create-quizzes-question-title-correct-answer create-quizz-correct-answer-title">Resposta correta</p>
          
          <!--create-quizzes-input-->
          <input type="text" class="create-quizzes-question-input create-quizz-correct-answer" placeholder="Resposta correta" required><!--create-quizz-correct-answer-->
          <input type="url" class="create-quizzes-question-input create-quizz-correct-answer-url" placeholder="URL da imagem" required><!--create-quizz-correct-answer-url-->
          
          
          <!--create-quizz-incorrect-question1-title-->
          <p class="create-quizzes-question-title-incorrect-answer create-quizz-incorrect-question-title">Respostas incorretas</p>
          
          <!--create-quizzes-input-->
          <input type="text" class="create-quizzes-question-input create-quizz-incorrect-answer1" placeholder="Resposta incorreta 1" required><!--create-quizz-incorrect-answer1-->
          <input type="url" class="create-quizzes-question-input create-quizz-incorrect-answer1-url" placeholder="URL da imagem 1" required><!--create-quizz-incorrect-answer1-url-->
          
          <!--create-quizzes-input-->
          <input type="text" class="create-quizzes-question-input create-quizz-incorrect-answer2 mt-32" placeholder="Resposta incorreta 2" required><!--create-quizz-incorrect-answer2-->
          <input type="url" class="create-quizzes-question-input create-quizz-incorrect-answer2-url" placeholder="URL da imagem 2" required><!--create-quizz-incorrect-answer2-url-->
          
          <!--create-quizzes-input-->
          <input type="text" class="create-quizzes-question-input create-quizz-incorrect-answer3 mt-32" placeholder="Resposta incorreta 3" required><!--create-quizz-incorrect-answer2-->
          <input type="url" class="create-quizzes-question-input create-quizz-incorrect-answer3-url" placeholder="URL da imagem 3" required><!--create-quizz-incorrect-answer2-url-->      
        </div><!--create-quizz-questions-hidden-->
      </form>   
      `;
    }
  }
}

let imaskColor = 0;
function maskColor(inputColor){
  let valueColor = inputColor.value;

  if(imaskColor === 0 || valueColor === ""){
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
}

function validationURL(elementURL, elementNumber, elementStr) {
  const arrayAcceptableCharacters = [
    "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q",
    "R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h",
    "i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y",
    "z","0","1","2","3","4","5","6","7","8","9","-",".","_","~",":","/",
    "?","#","[","]","@","!","$","&","'","(",")","*","+",",",";","="
  ];

  if(elementURL.value !== null){
    let iAcceptableCharacters = 0;
    for (let i = 0; i < elementURL.value.length; i++) {
      for (let j = 0; j < arrayAcceptableCharacters.length; j++) {
        if (elementURL.value[i] === arrayAcceptableCharacters[j]) {
          iAcceptableCharacters = iAcceptableCharacters + 1;
        }
      }
    }
  
    if (iAcceptableCharacters !== elementURL.value.length) {
      alert(`Campo de URL ${elementStr} inválida na Pergunta ${[elementNumber]}, informe uma URL válida!`);
      return;
    }
  }
}

let arrayCreatedQuestions = [];
let objectCreatedQuestion = {};
function createArrayQuizzQuestions(numberQuestions){
  numberQuestions = questionsQuizzInput;

  let arrayAnswers = [];
  arrayCreatedQuestions = [];
  for(let i = 1; i <= numberQuestions; i++){
    let questionForm = document.querySelector(`form:nth-child(${[i]})`);

    //Text field " " validation
    if(questionForm.querySelector(".create-quizz-text-question").value < 20){
      alert(`Reveja o campo de texto da Pergunta ${[i]}, deve ser no mínimo 20 caracteres!`);
      return;
    }

    //Color field " " validation
    if(questionForm.querySelector(".create-quizz-color-question").value === ""){
      alert(`Reveja o campo de cor da Pergunta ${[i]}, não pode ser vazio!`);
      return;      
    }

    //Answers & URL fields " " validation
    if(questionForm.querySelector(".create-quizz-correct-answer").value === "" ||
    questionForm.querySelector(".create-quizz-correct-answer-url").value === ""){
      if(questionForm.querySelector(".create-quizz-correct-answer").value === ""){
        alert(`Reveja o campo de Resposta Correta da Pergunta ${[i]}, não pode ser vazio!`);
        return;
      }else{
        alert(`Reveja o campo de URL da Imagem da Resposta Correta da Pergunta ${[i]}, não pode ser vazio!`);
        return;
      }
    }else if(
      (questionForm.querySelector(".create-quizz-incorrect-answer1").value === "" || 
      questionForm.querySelector(".create-quizz-incorrect-answer1-url").value === "") &&

      (questionForm.querySelector(".create-quizz-incorrect-answer2").value === "" ||
      questionForm.querySelector(".create-quizz-incorrect-answer2-url").value === "") &&

      (questionForm.querySelector(".create-quizz-incorrect-answer3").value === "" ||
      questionForm.querySelector(".create-quizz-incorrect-answer3-url").value === "")
    ){
      alert(`Existem campos que não foram preenchidos, ou URL ou texto das Respostas Incorretas da Pergunta ${[i]}, preencha ao menos 1 das Respostas Incorretas, informando a sua respectiva URL e texto!`);
      return;     
    }else if(
      (questionForm.querySelector(".create-quizz-incorrect-answer1").value === "" || 
      questionForm.querySelector(".create-quizz-incorrect-answer1-url").value === "") &&

      ((questionForm.querySelector(".create-quizz-incorrect-answer2").value !== "" ||
      questionForm.querySelector(".create-quizz-incorrect-answer2-url").value !== "") ||

      (questionForm.querySelector(".create-quizz-incorrect-answer3").value !== "" ||
      questionForm.querySelector(".create-quizz-incorrect-answer3-url").value !== ""))      
    ){
      alert(`Por favor, preencha na sequência correta - Pergunta ${i}: 
      Caso 1 - Usuário deseja somente 2 Respostas Incorretas: Resposta Incorreta 1 e sua URL seguida da Resposta Incorreta 2 e sua URL, Não preencha a Resposta Incorreta 1 e Resposta Incorreta 3 ou a Resposta Incorreta 2 e Resposta Incorreta 3, siga a sequência!
      
      Caso 2 - Usuário deseja somente 1 Resposta Incorreta: Seja preenchida somente a Resposta Incorreta 2 e sua URL ou Resposta Incorreta 3 e sua URL isoladamente, por gentileza, preencha somente a Resposta Incorreta 1, siga a sequência!`);
      return;
    }else if(
      (questionForm.querySelector(".create-quizz-incorrect-answer1").value !== "" || 
      questionForm.querySelector(".create-quizz-incorrect-answer1-url").value !== "") &&

      (questionForm.querySelector(".create-quizz-incorrect-answer2").value !== "" ||
      questionForm.querySelector(".create-quizz-incorrect-answer2-url").value !== "") ||

      (questionForm.querySelector(".create-quizz-incorrect-answer3").value !== "" ||
      questionForm.querySelector(".create-quizz-incorrect-answer3-url").value !== "")    
    ){
      if(
        (questionForm.querySelector(".create-quizz-incorrect-answer2").value === "" ||
        questionForm.querySelector(".create-quizz-incorrect-answer2-url").value === "") &&

        (questionForm.querySelector(".create-quizz-incorrect-answer3").value !== "" ||
        questionForm.querySelector(".create-quizz-incorrect-answer3-url").value !== "")
      ){
        alert(`Por favor, preencha na sequência correta Pergunta ${i} - Resposta Incorreta 2 e sua URL devem ser preenchidas obrigatoriamente! Ou caso este não seja o problema, reveja se existe algum campo vazio de texto ou URL!`);
        return;
      }
    }

    if(
      ((questionForm.querySelector(".create-quizz-incorrect-answer1").value !== "" || 
      questionForm.querySelector(".create-quizz-incorrect-answer1-url").value !== "") &&

      (questionForm.querySelector(".create-quizz-incorrect-answer2").value !== "" ||
      questionForm.querySelector(".create-quizz-incorrect-answer2-url").value !== ""))
    ){
      if(questionForm.querySelector(".create-quizz-incorrect-answer2").value === "" ||
      questionForm.querySelector(".create-quizz-incorrect-answer2-url").value === ""){
        if(questionForm.querySelector(".create-quizz-incorrect-answer2").value === ""){
          alert(`Reveja o campo de Resposta Incorreta 2 da Pergunta ${[i]}, não pode ser vazio!`);
          return;
        }else{
          alert(`Reveja o campo de URL da Imagem 2 da Pergunta ${[i]}, não pode ser vazio!`);
          return;
        }
      }  
    }
    
    if(
      ((questionForm.querySelector(".create-quizz-incorrect-answer1").value !== "" || 
      questionForm.querySelector(".create-quizz-incorrect-answer1-url").value !== "") &&

      (questionForm.querySelector(".create-quizz-incorrect-answer2").value !== "" ||
      questionForm.querySelector(".create-quizz-incorrect-answer2-url").value !== "") &&

      (questionForm.querySelector(".create-quizz-incorrect-answer3").value !== "" ||
      questionForm.querySelector(".create-quizz-incorrect-answer3-url").value !== ""))
    ){
      if(questionForm.querySelector(".create-quizz-incorrect-answer3").value === "" ||
      questionForm.querySelector(".create-quizz-incorrect-answer3-url").value === ""){
        if(questionForm.querySelector(".create-quizz-incorrect-answer3").value === ""){
          alert(`Reveja o campo de Resposta Incorreta 3 da Pergunta ${[i]}, não pode ser vazio!`);
          return;
        }else{
          alert(`Reveja o campo de URL da Imagem 3 da Pergunta ${[i]}, não pode ser vazio!`);
          return;
        }
      } else if(questionForm.querySelector(".create-quizz-incorrect-answer2").value === "" ||
      questionForm.querySelector(".create-quizz-incorrect-answer2-url").value === ""){
        if(questionForm.querySelector(".create-quizz-incorrect-answer2").value === ""){
          alert(`Reveja o campo de Resposta Incorreta 2 da Pergunta ${[i]}, não pode ser vazio!`);
          return;
        }else{
          alert(`Reveja o campo de URL da Imagem 2 da Pergunta ${[i]}, não pode ser vazio!`);
          return;
        }
      }   
    }
    
    validationURL(questionForm.querySelector(".create-quizz-correct-answer-url"), i, "Resposta correta");
    validationURL(questionForm.querySelector(".create-quizz-incorrect-answer1-url"), i, "Resposta incorreta 1");
    validationURL(questionForm.querySelector(".create-quizz-incorrect-answer2-url"), i, "Resposta incorreta 2");
    validationURL(questionForm.querySelector(".create-quizz-incorrect-answer3-url"), i, "Resposta incorreta 3");

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

    if(
    (questionForm.querySelector(".create-quizz-incorrect-answer2").value === "" || 
    questionForm.querySelector(".create-quizz-incorrect-answer2-url").value === "") &&
    (questionForm.querySelector(".create-quizz-incorrect-answer3").value === "" ||
    questionForm.querySelector(".create-quizz-incorrect-answer3-url").value === "")
    ){
      let newArrayAnswers= arrayAnswers.slice(0, 2);

      objectCreatedQuestion["title"] = questionForm.querySelector(".create-quizz-text-question").value;
      objectCreatedQuestion["color"] = questionForm.querySelector(".create-quizz-color-question").value;
      objectCreatedQuestion["answers"] = newArrayAnswers;
      arrayCreatedQuestions.push(objectCreatedQuestion);
      objectCreatedQuestion = {};
    }else if(
      (questionForm.querySelector(".create-quizz-incorrect-answer3").value === "" ||
      questionForm.querySelector(".create-quizz-incorrect-answer3-url").value === "")      
    ){
      let newArrayAnswers= arrayAnswers.slice(0, 3);

      objectCreatedQuestion["title"] = questionForm.querySelector(".create-quizz-text-question").value;
      objectCreatedQuestion["color"] = questionForm.querySelector(".create-quizz-color-question").value;
      objectCreatedQuestion["answers"] = newArrayAnswers;
      arrayCreatedQuestions.push(objectCreatedQuestion);
      objectCreatedQuestion = {};
    }else{
      objectCreatedQuestion["title"] = questionForm.querySelector(".create-quizz-text-question").value;
      objectCreatedQuestion["color"] = questionForm.querySelector(".create-quizz-color-question").value;
      objectCreatedQuestion["answers"] = arrayAnswers;
      arrayCreatedQuestions.push(objectCreatedQuestion);
      objectCreatedQuestion = {};
    }
  }

  console.log(objectCreatedQuestion);
  console.log(arrayCreatedQuestions);
  alert("Campos preenchidos corretamente!");
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