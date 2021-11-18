


function getQuizzByID(element) {


    ///// em alguma parte do elemento terá informação do quizz que a pessoa está clicando
    //// essa informação ID unico do quizz

    askPromisse = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${element}`);
    askPromisse.then(promisseFulfilled);
    askPromisse.catch(promisseFail);

    function promisseFulfilled(answer) {
        console.log(answer.data);

    }

    function promisseFail(answer) {
        console.log(answer);

    }
}