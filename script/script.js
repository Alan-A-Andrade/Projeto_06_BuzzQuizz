


function getQuizzByID(element) {

    let pageContainer = document.querySelector(".container")


    ///// em alguma parte do elemento terá informação do quizz que a pessoa está clicando
    //// essa informação ID unico do quizz

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


        let i = 0;

        let j = 0;
        let questionData = quizzData.data.questions[0]
        let answerData = questionData.answer
        console.log(quizzData.data)
        console.log(quizzData.data.questions);
        console.log(quizzData.data.questions[i]);
        console.log(quizzData.data.questions[i].title);
        console.log(quizzData.data.questions[i].answers);
        console.log(quizzData.data.questions[i].answers[j]); //embaralhar J
        console.log(quizzData.data.questions[i].answers[j].image)
        console.log(quizzData.data.questions[i].answers[j].text)
        console.log(quizzData.data.questions[i].answers[j].isCorrectAnswer)
        console.log(quizzData.data.questions[i].answers.length)
        //for (let x< 0)


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
                `     <div class="question-card">
        <div style="background-color: ${quizzData.data.questions[i].color}" class="question-title">
        <h1>${quizzData.data.questions[i].title}</h1>
        </div>`

            for (let j = 0; j < quizzData.data.questions[i].answers.length; j++) {
                pageContainer.querySelector(".question-card:last-child").innerHTML +=
                    `
                <div class="answer-card ${quizzData.data.questions[i].answers[j].isCorrectAnswer}">
                <div class="answer-img-container">
                <img src="${quizzData.data.questions[i].answers[j].image}" alt=""/>
                </div>
                <h1>${quizzData.data.questions[i].answers[j].text}</h1>
                </div>`


            }

        }

        //add N questions to M Question Card


        /*
        <div class="question-card">
        <div style="background-color: ${quizzData.data.questions[0].color}" class="question-title">
        <h1>${quizzData.data.questions[i].title}</h1>
        </div>
 
        <div class="answer-card ${quizzData.data.questions[i].answers[j].isCorrectAnswer}">
        <div class="answer-img-container">
        <img src="${quizzData.data.questions[i].answers[j].image}" alt=""/>
        </div>
        <h1>${quizzData.data.questions[i].answers[j].text}</h1>
        </div>
    
         </div>
        </div>
        */



    }
}