
import React, { useEffect, useState } from 'react';
import axios from 'axios';



function FetchQuote() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = () => {
    axios
      .get('https://api.gameofthronesquotes.xyz/v1/random')
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }
  
  useEffect(() => {fetchData()},[])

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;
    

  return (
   <> <button onClick={fetchData}>Relancer la requête</button>
    <div>
      <h1>Mes données</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
    </>
  );

}
export default FetchQuote;