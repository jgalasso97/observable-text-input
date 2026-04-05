import { useState } from 'react'
import './App.css'

function App() {
// State variables to manage the input, results, and UI status
  const [text, setText] = useState('');
  const [length, setLength] = useState(0);
  const [numVowels, setNumVowels] = useState(0);  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //Handle the form submission

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prevent submission if the field is empty
    if (!text.trim()) return;
    //console.log('handling submission')

    setIsLoading(true);
    setError(null);
    setLength(0);
    setNumVowels(0);

    try {
      const [lengthRes, vowelRes] = await Promise.all([
      fetch('http://localhost:3000/length', {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
      body: JSON.stringify({ text: text }),
      }),
      fetch('http://localhost:3000/num_vowels', {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
      body: JSON.stringify({ text: text }),
      }),
    ]);
      
      if (lengthRes.status >= 400) {
        setError(`Request for text length failed with status code ${lengthRes.status}: ${lengthRes.statusText}`);
        throw new Error(`Request for text length failed with status code ${lengthRes.status}: ${lengthRes.statusText}`)
      }
      if (vowelRes.status >= 400) {
        setError(`Request for vowel count failed with status code ${vowelRes.status}: ${vowelRes.statusText}`);
        throw new Error(`Request for vowel count failed with status code ${vowelRes.status}: ${vowelRes.statusText}`)
      }

      const lengthData = await lengthRes.json();
      const vowelData = await vowelRes.json();

      // Update the state with the fetched data
      setLength(lengthData.length);
      setNumVowels(vowelData.vowel_count); 

    } catch (err) {
      // Handle any errors that occur during the fetch
      console.log('An error occurred while fetching text length and number of vowels: ' , err)
    } finally {
      // Always turn off the loading state when finished
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginBottom:'.25rem'}}>Text Length and Vowel Counter</h2>
      
      {/* Instructions */}
      <p style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginBottom:'1rem'}}>
        Please enter a text input of your choosing in the field below and click "Submit" to see the text length and vowel count.
      </p>

      {/* Form with a text input and a submit button */}
      <form style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginBottom:'1rem'}} onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here"
          disabled={isLoading}
          style={{padding: '.5rem', fontSize: '1rem', marginRight: '1rem', borderRadius: '.25rem'}}
        />
        <button 
          type="submit" 
          disabled={isLoading || !text.trim()}
          style={{ 
            padding: '0.5rem 1rem', 
            fontSize: '1rem', 
            cursor: (isLoading || !text.trim()) ? 'not-allowed' : 'pointer',
            backgroundColor: (isLoading || !text.trim()) ? '#E0E0E0' : '#3399FF',
            color: 'white',
            border: 'none',
            borderRadius: '.5rem'
          }}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {/* Display area to show API results */}
      <div>
        <h3 style={{marginBottom: '.5rem'}}>Results</h3>
        
        {isLoading && <p>Fetching data from the server...</p>}
        
        {error && <p style={{ color: '#f44336' }}>Error: {error}</p>}
        
        {!isLoading && !error && length > 0 && <p>The length of the text is {length} and the text contains {numVowels} {numVowels === 1 ? "vowel" : "vowels"}</p>}
        
        {!isLoading && !error && length === 0 && numVowels === 0 && <p>No results to display yet. Submit text above.</p>}
      </div>
    </div>
  );
}

export default App;