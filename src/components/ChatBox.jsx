import { Configuration, OpenAIApi } from 'openai';
import React, { useState } from 'react'
import './chatBox.css';

function ChatBox() {
    const config = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    })
    const openai = new OpenAIApi(config);

    const [prompt, setPrompt] = useState('')
    const [result, setResult] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)


    const handleChange = async () => {
        setLoading(true)
        try {
            // Add a delay of 3 seconds
            await new Promise(resolve => setTimeout(resolve, 3000));
            const response = await openai.createCompletion({
                model: "text-davinci-001",
                prompt: prompt,
                temperature: 0,
                max_tokens: 7
            })
            setResult(response.data.choices[0].text);
            setLoading(false);
        } catch (error) {
            setError(error);
            console.log(error);
        }
        setLoading(false);
    }

    const handleClick = async () => {
        // Add a delay of 3 seconds
        await new Promise(resolve => setTimeout(resolve, 3000));
        handleChange();
    }
    return (
        <div className="chat-container">

            <textarea
                className="chat-input"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                name='' id='' cols='30' rows='10'
                placeholder='ask me anything'
            />
            <button
                className="chat-button"
                onClick={handleClick}
            >
                {loading ? 'Generating....' : 'Generate'}
            </button>

            {result ? (
                <div className="chat-result">
                    <p>{result}</p>
                </div>
            ) : error ? (
                <div className="chat-error">
                    <p>Request exceeded:{error.message} </p>
                </div>
            ) : null}
        </div>
    )
}

export default ChatBox;