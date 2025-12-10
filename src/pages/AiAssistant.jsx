import React, { useState, useEffect } from 'react';
import apiClient from '../api/client';

const AiAssistant = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your mental health assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await apiClient.get('/ai/conversations');
        setHistory(response.data.conversations || []);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };
    fetchHistory();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await apiClient.post('/ai/chat', { message: input });
      // Backend returns { response: "...", conversation_id: "..." }
      setMessages(prev => [...prev, { role: 'assistant', content: response.data.response }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '20px', height: 'calc(100vh - 140px)' }}>
      {/* Sidebar for History */}
      <div style={{ width: '250px', background: '#2a2a2a', borderRadius: '15px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ marginBottom: '15px' }}>History</h3>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {history.length === 0 ? (
            <p style={{ color: '#aaa', fontSize: '0.9rem' }}>No previous conversations</p>
          ) : (
            history.map((conv, i) => (
              <div key={i} style={{ padding: '10px', borderBottom: '1px solid #444', cursor: 'pointer' }}>
                Conversation {i + 1}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ marginBottom: '20px' }}>AI Assistant</h1>
        
        <div style={{ flex: 1, overflowY: 'auto', background: '#2a2a2a', borderRadius: '15px', padding: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {messages.map((msg, index) => (
            <div key={index} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '70%' }}>
              <div style={{ 
                background: msg.role === 'user' ? '#5227FF' : '#444', 
                padding: '10px 15px', 
                borderRadius: '15px',
                borderBottomRightRadius: msg.role === 'user' ? '0' : '15px',
                borderBottomLeftRadius: msg.role === 'assistant' ? '0' : '15px'
              }}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && <div style={{ alignSelf: 'flex-start', color: '#aaa' }}>Typing...</div>}
        </div>

        <form onSubmit={sendMessage} style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            style={{ flex: 1, padding: '15px', borderRadius: '10px', border: 'none', background: '#fff', color: 'black' }}
          />
          <button type="submit" style={{ padding: '0 30px', borderRadius: '10px', border: 'none', background: '#5227FF', color: 'white', cursor: 'pointer' }}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default AiAssistant;
