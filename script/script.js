let correctAnswers = 0;
let answeredQuestions = 0;
let loadedQuizzData;
let loadedQuizzID;
const frontPage = document.querySelector("body").innerHTML;


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
  }

  if(createQuizzInputQuestionsValidation){
    alert("Campo de Perguntas no mínimo 3!");
    return;
  }

  if(createQuizzInputLevelsValidation){
    alert("Campo de Níveis no mínimo 2!");
    return;
  }
  

  if (createQuizzInputQuestionsValidation) {
      alert("Campo de Perguntas no mínimo 3!");
      return;
  }

  if (createQuizzInputLevelsValidation) {
      alert("Campo de Níveis no mínimo 3!");
      return;
  }

  if (createQuizzURL.value !== null) {
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
          <input type="text" maxlength="7" onkeydown="maskColor(this)" onkeyup="maskColor(this)" onkeypress="maskColor(this)" class="create-quizzes-question-input create-quizz-color-question" placeholder="Cor de fundo da pergunta" required>
          
          
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
          <input type="text" maxlength="7" onkeydown="maskColor(this)" onkeyup="maskColor(this)" onkeypress="maskColor(this)" onkeypress="maskColor(this)" class="create-quizzes-question-input create-quizz-color-question" placeholder="Cor de fundo da pergunta" required>
          
          
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
  const arrayAcceptableImageFormat = ["jpeg", "gif", "png", "svg", "jpg"];
  let url = elementURL.value;
  let validURL = /^(ftp|http|https):\/\/[^ "]+$/.test(url);

  if(elementURL.value !== ""){
    let validURLlink = false;
    for (let i = 0; i < arrayAcceptableImageFormat.length; i++) {
      console.log(arrayAcceptableImageFormat[i]);
      console.log(elementURL.value.indexOf(arrayAcceptableImageFormat[i]));

      if(validURLlink){
        continue;
      }else{
        if(elementURL.value.indexOf(arrayAcceptableImageFormat[i]) !== -1){
          console.log("URL é uma imagem válida suportada!");
          validURLlink = true;
        }
  
        if(i === arrayAcceptableImageFormat.length - 1 && validURLlink === false){
          alert(`Campo de URL ${elementStr} está inválido na Pergunta ${[elementNumber]}, pois não é uma imagem ou é uma imagem com formato não suportado (os formatos suportados são: PNG, JPG, SVG, GIF e JPEG), informe uma imagem válida!`);
          return;
        }
      }
    }

    let iAcceptableCharacters = 0;
    for (let i = 0; i < elementURL.value.length; i++) {
      for (let j = 0; j < arrayAcceptableCharacters.length; j++) {
        if (elementURL.value[i] === arrayAcceptableCharacters[j]) {
          iAcceptableCharacters = iAcceptableCharacters + 1;
        }
      }
    }   
    
    if (iAcceptableCharacters !== elementURL.value.length) {
      alert(`Campo de URL ${elementStr} está inválido na Pergunta ${[elementNumber]}, pois existem caracteres inválidos, informe uma URL válida!`);
      return;
    }

    if (validURL === true) {
      console.log("URL válida!");
      return validURL;
    } else {
      alert(`Campo de URL ${elementStr} está inválido na Pergunta ${[elementNumber]}, pois não foi possível acessar a mesma, informe uma URL válida!`);
      return;
    }
  }
}

function validationColorHex(elementColorHex, elementNumber) {
  const arrayAcceptableCharacters = [
    "0","1","2","3","4","5","6","7","8","9",
    "A","B","C","D","E","F",
    "a","b","c","d","e","f",
    "#"
  ];

  if(elementColorHex.value !== null){
    let iAcceptableCharacters = 0;
    for (let i = 0; i < elementColorHex.value.length; i++) {
      for (let j = 0; j < arrayAcceptableCharacters.length; j++) {
        if (elementColorHex.value[i] === arrayAcceptableCharacters[j]) {
          iAcceptableCharacters = iAcceptableCharacters + 1;
        }
      }
    }
  
    if (iAcceptableCharacters !== elementColorHex.value.length) {
      alert(`Campo de color Hexadecimal está inválido na Pergunta ${[elementNumber]}, informe uma cor hexadecimal válida!`);
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

    validationURL(questionForm.querySelector(".create-quizz-correct-answer-url"), i, "Resposta correta");

    //Color field " " validation
    if(questionForm.querySelector(".create-quizz-color-question").value === "" || questionForm.querySelector(".create-quizz-color-question").value.length < 7){
      if(questionForm.querySelector(".create-quizz-color-question").value === ""){
        alert(`Reveja o campo de cor da Pergunta ${[i]}, não pode ser vazio!`);
        return; 
      }else{
        alert(`Reveja o campo de cor da Pergunta ${[i]}, não menos do que 7 caracteres!`);
        return; 
      }
    }

    validationColorHex(questionForm.querySelector(".create-quizz-color-question"), i);

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
  <input class="level-MinValue" placeholder="% de acerto mínima"></input>
  <input class="level-imgURL" placeholder="URL da imagem do nível"></input>
  <input class="level-text"placeholder="Descrição do nível"></input>
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
    <input class="level-MinValue hidden" placeholder="% de acerto mínima"></input>
    <input class="level-imgURL hidden" placeholder="URL da imagem do nível"></input>
    <input class="level-text hidden"placeholder="Descrição do nível"></input>
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

    element.classList.add("hidden")

    element.closest("article").scrollIntoView()
}

//storage created levels data into arr to later use

let arrCreatedLevels = [];

function CreateQuizzLevelsArray(numLevels) {

    let minValueZeroPercente = false

    for (i = 2; i <= numLevels + 1; i++) {

        let userLevel = document.querySelector(`article:nth-child(${i})`)


        if (userLevel.querySelector(".level-Title").value.length < 10) {
            alert("Título do nível: mínimo de 10 caracteres")
            arrCreatedLevels = []
            return;
        }

        else if (userLevel.querySelector(".level-MinValue").value === "" || userLevel.querySelector(".level-MinValue").value % 1 != 0 || userLevel.querySelector(".level-MinValue").value < 0 || userLevel.querySelector(".level-MinValue").value > 100) {
            alert("% de acerto mínima: um número inteiro entre 0 e 100")
            arrCreatedLevels = []
            return;
        }

        else if (userLevel.querySelector(".level-text").value.length < 30) {
            alert("Título do nível: mínimo de 30 caracteres")
            arrCreatedLevels = []
            return;
        }

        else if (validateURL(userLevel.querySelector(".level-imgURL").value) === false) {
            alert("URL não é valida")
            arrCreatedLevels = []
            return;
        }


        let objUserlevel =
        {
            title: userLevel.querySelector(".level-Title").value,
            image: userLevel.querySelector(".level-imgURL").value,
            text: userLevel.querySelector(".level-text").value,
            minValue: userLevel.querySelector(".level-MinValue").value,
        }

        arrCreatedLevels.push(objUserlevel);

    }


    for (i = 0; i < numLevels; i++) {

        if (arrCreatedLevels[i].minValue === "0") {

            minValueZeroPercente = true
        }

    }


    if (minValueZeroPercente === false) {
        alert("É obrigatório existir pelo menos 1 nível cuja % de acerto mínima seja 0%")
        arrCreatedLevels = []
        return
    }

    console.log(arrCreatedLevels)
    sendCreatedQuizz(titleQuizzInput, URLQuizzInput, arrayCreatedQuestions, arrCreatedLevels);
}

let createdQuizzUser = {};
function sendCreatedQuizz(createdQuizzTitle, createdQuizzImage, createdQuizzArrayQuestions, createdQuizzArrayLevels){
  createdQuizzUser["title"] = createdQuizzTitle;
  createdQuizzUser["image"] = createdQuizzImage;
  createdQuizzUser["questions"] = createdQuizzArrayQuestions;
  createdQuizzUser["levels"] = createdQuizzArrayLevels;

  console.log(createdQuizzUser);

  promisseSendCreatedQuizz = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", createdQuizzUser);
  promisseSendCreatedQuizz.then(sendCreatedQuizzSucess);
  promisseSendCreatedQuizz.then(storeUserCreatedQuizz);
  promisseSendCreatedQuizz.catch(sendCreatedQuizzFailure);
}

function sendCreatedQuizzSucess(answerSendCreatedQuizz){
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

function sendCreatedQuizzFailure(errorSendCreatedQuizz){
  console.log(errorSendCreatedQuizz.response);

  alert(`Não foi possível enviar seu quizz, em virturde de ter ocorrido um erro ${errorSendCreatedQuizz.response.status}`);
  window.location.reload(true);
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

        for (let i = 0; i < quizzData.length; i++) {

            let isAnUserMadeQuizz = false

            for (let j = 0; j < userCreatedQuizzId.length; j++) {

                if (quizzData[i].id == userCreatedQuizzId[j]) {

                    isAnUserMadeQuizz = true
                }
            }

            if (!isAnUserMadeQuizz) {
                continue;
            }

            container.innerHTML += `
            <div class="all-quizzes-quizz" onclick="getQuizzByID(${quizzData[i].id})">
            <img class="all-quizzes-quizz-bg" src="${quizzData[i].image}">
            <div class="all-quizzes-quizz-degrade"></div>
            <div class="all-quizzes-quizz-title">
            <p>${quizzData[i].title}</p>
            </div>
            </div>      
            `;
        }



    }

}

let userCreatedQuizzData = JSON.parse(localStorage.getItem("data"))
let userCreatedQuizzId = JSON.parse(localStorage.getItem("id"))
let userCreatedQuizzSecretKey = JSON.parse(localStorage.getItem("UniqueKey"))

let userCreatedQuizzDataStringified;
let userCreatedQuizzIdStringified;
let userCreatedQuizzSecretKeyStringified;

if (userCreatedQuizzId === null) {

    userCreatedQuizzData = []
    userCreatedQuizzId = []
    userCreatedQuizzSecretKey = {}

}

function storeUserCreatedQuizz(resposta) {
    userCreatedQuizzData.push(resposta.data)
    userCreatedQuizzId.push(resposta.data.id)
    userCreatedQuizzSecretKey[resposta.data.id] = resposta.data.key


    userCreatedQuizzDataStringified = JSON.stringify(userCreatedQuizzData)
    userCreatedQuizzIdStringified = JSON.stringify(userCreatedQuizzId)
    userCreatedQuizzSecretKeyStringified = JSON.stringify(userCreatedQuizzSecretKey)

    localStorage.setItem("data", userCreatedQuizzDataStringified)
    localStorage.setItem("id", userCreatedQuizzIdStringified)
    localStorage.setItem("UniqueKey", userCreatedQuizzSecretKeyStringified)
}



function getQuizzByID(element) {

    loadedQuizzID = element

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

    correctAnswers, answeredQuestions = 0;
    loadedQuizzData = null;


    getQuizzByID(loadedQuizzID)
}

function backHomePage() {
    correctAnswers, answeredQuestions = 0;
    loadedQuizzData, loadedQuizzID = null;

    document.querySelector("body").innerHTML = frontPage;
    listQuizzesRequest();


}