/*export const questions = [
    {
        questionText: 'What is the capital of France?',
        answerOptions: [
            { answerText: 'New York', isCorrect: false },
            { answerText: 'London', isCorrect: false },
            { answerText: 'Paris', isCorrect: true },
            { answerText: 'Rome', isCorrect: false },
        ],
    },
    {
        questionText: 'What is the capital of 2?',
        answerOptions: [
            { answerText: 'New York', isCorrect: false },
            { answerText: 'London', isCorrect: false },
            { answerText: 'Paris', isCorrect: true },
            { answerText: 'Rome', isCorrect: false },
        ],
    },
    {
        questionText: 'What is the capital of 3?',
        answerOptions: [
            { answerText: 'New York', isCorrect: false },
            { answerText: 'London', isCorrect: false },
            { answerText: 'Paris', isCorrect: true },
            { answerText: 'Rome', isCorrect: false },
        ],
    },
    {
        questionText: 'What is the capital of 4?',
        answerOptions: [
            { answerText: 'New York', isCorrect: false },
            { answerText: 'London', isCorrect: false },
            { answerText: 'Paris', isCorrect: true },
            { answerText: 'Rome', isCorrect: false },
        ],
    },
    {
        questionText: 'What is the capital of 5?',
        answerOptions: [
            { answerText: 'New York', isCorrect: false },
            { answerText: 'London', isCorrect: false },
            { answerText: 'Paris', isCorrect: true },
            { answerText: 'Rome', isCorrect: false },
        ],
    },
];*/

export const fetchData = async () => {
    try {
        const quoteResponse = await fetch("https://api.gameofthronesquotes.xyz/v1/random");
        /*Ici on récupère la citation(sentence) et le nom (character.name): */
        const quoteData = await quoteResponse.json();
        const charactersResponse = await fetch("https://api.gameofthronesquotes.xyz/v1/characters");
        /*Ici on récupère tous les persos de l'API : */
        const charactersData = await charactersResponse.json();

        /*Ici, on isole le nom du personnage qui a prononcé la citation. C'est la bonne réponse au quiz: */
        const correctCharacter = quoteData.character.name;
        /*Ici, on récupère tous les autres personnages incorrects: */
        const incorrectCharacters = charactersData.map((character) => character.name).filter((name)=>name !== correctCharacter);
        /*On mélange toutes les options de manière aléatoire pour ne pas toujours avoir la bonne réponse en première position:*/
        const mixIncorrect = incorrectCharacters.sort(() => 0.5 - Math.random());
        /*On en sélectionne trois: */
        const wrongOptions = mixIncorrect.slice(0, 3);

        console.log("citation:", quoteData.sentence)
        console.log("personnage correct:", correctCharacter)
        console.log("options de personnages incorrects:", wrongOptions)

        return [
            {
              questionText: `Who said: "${quoteData.sentence}"?`,
              answerOptions: [
                { answerText: correctCharacter, isCorrect: true },
                ...wrongOptions.map((name) => ({ answerText: name, isCorrect: false })), /* les "..." sont pour insérer le contenu du tableau wrongOptions dans le tableau, et pas le tableau entier.*/
              ].sort(() => 0.5 - Math.random()), // Mélanger les options
            },
          ];
    }

   catch (error) {
    console.error("une erreur est survenue lors de la récupération des données:", error);
    throw error;
   } 
};