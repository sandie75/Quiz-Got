import React from 'react';
import { useState, useEffect } from 'react';
import './App.css'
import { fetchData } from './constants';

function App() {
  const [currentquestion, setCurrentQuestion] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [showScore, setShowscore] = useState(false)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const NextQuestion = () => {
    setAnswered(false);
    setSelectedAnswer(null);
    const nextQuestion = currentquestion + 1;
    if(nextQuestion < questions.length){
      setCurrentQuestion(nextQuestion)
    }else{
      setShowscore(true);
    }
  };

  const handleAnswer = (index, isCorrect) => {
    setAnswered(true)
    setSelectedAnswer(index)
    if(isCorrect){
      setScore(score +1)
    }
  }

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const generatedQuestions = await fetchData();
        setQuestions(generatedQuestions);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des questions :", error);
        setError("Impossible de charger les questions.")
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
  
    fetchQuestions();
  }, []
  );

  return (
    <div className="App">
      <div>
        <div>Quiz Game of Thrones</div>
        {loading ? 
          (<div>Chargement...</div>) 
          : error ? (<div className = 'error'>{error}</div>)
          : showScore ? <div>You scored {score} of {questions.length}</div> 
          : (
            <div>
              <div>{questions[currentquestion].questionText}</div>
              {questions[currentquestion].answerOptions.map(
                (option, index) => (
                  <button 
                  key={index} 
                  onClick={() => handleAnswer(index, option.isCorrect)} className =  {`${answered ? 
                    option.isCorrect ?
                    "correct"
                    : selectedAnswer === index ?
                    " incorrect"
                    : "default"
                  : "default"
                  }`}>
                    {option.answerText}
                  </button>
                ))
              }
              <button disabled = {!answered} onClick={NextQuestion}>Next question</button>
              <p>Question {currentquestion +1} of {questions.length}</p>
            </div>
        )}
      </div>  
    </div>
);
}

export default App;

/*handleAnswerOption = handleAnswer */

/*{questions[0].questionText}: On accède au premier élément (index 0) d'un tableau nommé questions.
On accède à la propriété questionText de cet élément. */
/* questions[currentquestion] : C'est une variable (contenant un state) qui indique l'index actuel de la question dans le tableau.
Par exemple, si currentquestion = 0, on accède à la première question du tableau.*/
/*questions[0].answerOptions.map: Dans le 1er élément du tableau questions, on parcours les éléments de la propriété answerOptions.
(option, index) => : On nomme chacun de ces éléments option et on lui donne un numero d'index.
 <button>{option.answerText}</button>: pour chacun de ces elements nommés option, on prend la proriété answerText et on affiche son contenu dans un bouton.*/
 /*disabled="" : "" revient à ne pas définir l'attribut disabled en HTML).*/