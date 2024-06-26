import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [
            { role: 'system', content: 'You are a chatbot that replies in a comical and Singlish manner.' },
            { role: 'user', content: input }
          ],
          max_tokens: 150,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
        }
      );
      setResponse(res.data.choices[0].message.content);
      setInput(''); // Clear input field after submission
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Singlish Chatbot</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
          />
          <button type="submit">Send</button>
        </form>
        {response && (
          <div className="response">
            <h2>Response:</h2>
            <p>{response}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
