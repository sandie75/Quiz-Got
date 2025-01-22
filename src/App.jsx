import React from 'react';
import FetchQuote from './components/fetchquote/FetchQuote';
import { questions } from './constants';
import { useState } from 'react';

function App() {
  const [currentquestion, setCurrentQuestion] = useState(0)

  return (
    <div className="App">
      <div>
        <div>Quiz App</div>
        <div>
          <div>{questions[currentquestion].questionText}</div>
          {questions[currentQuestion].answerOptions.map(
            (option, index) => (
              <button>{option.answerText}</button>
            ))
          }
          <button>Next question</button>
          <p>Question 1 of {questions.length}</p>
        </div>
      </div>
    </div>
  );
}

export default App;

/*{questions[0].questionText}: On accède au premier élément (index 0) d'un tableau nommé questions.
On accède à la propriété questionText de cet élément. */
/*questions[0].answerOptions.map: Dans le 1er élément du tableau questions, on parcours les éléments de la propriété answerOptions.
(option, index) => : On nomme chacun de ces éléments option et on lui donne un numero d'index.
 <button>{option.answerText}</button>: pour chacun de ces elements nommés option, on prend la proriété answerText et on affiche son contenu dans un bouton.*/