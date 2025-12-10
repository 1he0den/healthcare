import React, { useEffect, useState } from 'react';
import SpotlightCard from '../components/SpotlightCard';
import apiClient from '../api/client';

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [stats, setStats] = useState(null);
  const [newEntry, setNewEntry] = useState({ title: '', content: '', entry_date: new Date().toISOString().split('T')[0] });

  const fetchEntries = async () => {
    try {
      const response = await apiClient.get('/journal/entries');
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching journal entries:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await apiClient.get('/journal/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching journal stats:', error);
    }
  };

  useEffect(() => {
    fetchEntries();
    fetchStats();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/journal/entries', newEntry);
      setNewEntry({ title: '', content: '', entry_date: new Date().toISOString().split('T')[0] });
      fetchEntries();
      fetchStats();
    } catch (error) {
      console.error('Error creating journal entry:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await apiClient.delete(`/journal/entries/${id}`);
        fetchEntries();
        fetchStats();
      } catch (error) {
        console.error('Error deleting entry:', error);
      }
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '30px' }}>Journal</h1>

      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div style={{ background: '#333', padding: '20px', borderRadius: '15px', textAlign: 'center' }}>
            <h3>Total Entries</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#5227FF' }}>{stats.total_entries || 0}</p>
          </div>
          <div style={{ background: '#333', padding: '20px', borderRadius: '15px', textAlign: 'center' }}>
            <h3>This Month</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#5227FF' }}>{stats.entries_this_month || 0}</p>
          </div>
          <div style={{ background: '#333', padding: '20px', borderRadius: '15px', textAlign: 'center' }}>
            <h3>Streak</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#5227FF' }}>{stats.current_streak || 0} days</p>
          </div>
        </div>
      )}

      <div style={{ marginBottom: '40px', background: '#2a2a2a', padding: '20px', borderRadius: '15px' }}>
        <h2>New Entry</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="text"
            placeholder="Title"
            value={newEntry.title}
            onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
            style={{ padding: '10px', borderRadius: '5px', border: 'none', color: 'black' }}
            required
          />
          <textarea
            placeholder="How are you feeling today?"
            value={newEntry.content}
            onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
            style={{ padding: '10px', borderRadius: '5px', border: 'none', minHeight: '100px', color: 'black' }}
            required
          />
          <input
            type="date"
            value={newEntry.entry_date}
            onChange={(e) => setNewEntry({ ...newEntry, entry_date: e.target.value })}
            style={{ padding: '10px', borderRadius: '5px', border: 'none', color: 'black' }}
            required
          />
          <button type="submit" style={{ padding: '10px', borderRadius: '5px', border: 'none', background: '#5227FF', color: 'white', cursor: 'pointer' }}>
            Save Entry
          </button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {entries.map((entry) => (
          <SpotlightCard key={entry.id} className="custom-spotlight-card" spotlightColor="rgba(82, 39, 255, 0.2)">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h3>{entry.title}</h3>
              <button 
                onClick={() => handleDelete(entry.id)}
                style={{ background: 'transparent', border: 'none', color: '#ff6b6b', cursor: 'pointer', fontSize: '1.2rem' }}
                title="Delete entry"
              >
                &times;
              </button>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#aaa' }}>{entry.entry_date}</p>
            <p style={{ marginTop: '10px' }}>{entry.content}</p>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
};

export default Journal;
