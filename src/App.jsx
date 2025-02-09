import React from 'react';
import { useState, useEffect } from 'react';
import './App.css'
import { fetchData } from './constants';
import Credits from './components/credits/Credits'

function App() {
  const [currentquestion, setCurrentQuestion] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [showScore, setShowscore] = useState(false)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleAnswer = (index, isCorrect) => {
    setSelectedAnswer(index)//stocker l'index de la réponse choisie
    /*if(isCorrect){
      setScore(score +1)
    }*/
  }

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setAnswered(true); //activer les couleurs pour les réponses.
    const isCorrect = questions[currentquestion].answerOptions[selectedAnswer].isCorrect;
    if (isCorrect){
      setScore(score + 1)
    }

    /*Ici, on passe à la question suivante après un délai:*/
    setTimeout(() => {
      const nextQuestion = currentquestion + 1;
        if (nextQuestion < questions.length) {
          setCurrentQuestion(nextQuestion);
          setAnswered(false);
          setSelectedAnswer(null);
        } else {
          setShowscore(true);
        }
      }, 2000);
  }

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
          const generatedQuestions = await fetchData();
          setQuestions(generatedQuestions);
          setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des questions :", error);
        setError("Impossible de charger les questions.");
        setLoading(false);
      }
    };
    
    /*Ici, on évite d'avoir plusieurs demandes à l'API. */
    if(questions.length === 0){
    fetchQuestions();
    }
  }, [questions]);

  return (
    <div className="app">
      <div className="app-container">
        <div className="title">Game of Thrones quiz</div>
        {loading ? 
          (<div>Chargement...</div>) 
          : error ? (<div className = 'error'>{error}</div>)
          : showScore ? (<div>You scored {score} of {questions.length}</div> )
          : (
            <div>
              <div className="questionText">{questions[currentquestion].questionText}</div>
              {questions[currentquestion].answerOptions.map(
                (option, index) => (
                  <button 
                  key={index} 
                  onClick={() => handleAnswer(index)} 
                  className = {`${answered ? 
                    option.isCorrect ?
                    "correct"
                    : selectedAnswer === index ?
                    " incorrect"
                    : "default"
                  : selectedAnswer === index ?"selected": "default"
                  }`}>
                    {option.answerText}
                  </button>
                ))
              }
              <button 
                className="submit" 
                disabled = {selectedAnswer === null || answered} 
                onClick={handleSubmit}>
                  Submit
              </button>
              <p 
              className="whichQuestion">
                Question {currentquestion +1} of {questions.length}
              </p>
            </div>
        )}
      </div> 
      <Credits/> 
    </div>
);
}

export default App;

/*{questions[0].questionText}: On accède au premier élément (index 0) d'un tableau nommé questions.
On accède à la propriété questionText de cet élément. */
/* questions[currentquestion] : C'est une variable (contenant un state) qui indique l'index actuel de la question dans le tableau.
Par exemple, si currentquestion = 0, on accède à la première question du tableau.*/
/*questions[0].answerOptions.map: Dans le 1er élément du tableau questions, on parcours les éléments de la propriété answerOptions.
(option, index) => : On nomme chacun de ces éléments option et on lui donne un numero d'index.
 <button>{option.answerText}</button>: pour chacun de ces elements nommés option, on prend la proriété answerText et on affiche son contenu dans un bouton.*/
 /*disabled="" : "" revient à ne pas définir l'attribut disabled en HTML).*/