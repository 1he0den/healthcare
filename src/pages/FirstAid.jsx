import React, { useEffect, useState } from 'react';
import SpotlightCard from '../components/SpotlightCard';
import apiClient from '../api/client';

const FirstAid = () => {
  const [resources, setResources] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await apiClient.get('/first-aid/resources');
        setResources(response.data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };
    fetchResources();
  }, []);

  if (!resources) return <div>Loading...</div>;

  return (
    <div>
      <h1 style={{ marginBottom: '30px', color: '#ff6b6b' }}>First Aid & Emergency Resources</h1>

      <h2 style={{ marginBottom: '20px' }}>Emergency Contacts</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {resources.emergency_contacts.map((contact, index) => (
          <SpotlightCard key={index} className="custom-spotlight-card" spotlightColor="rgba(255, 107, 107, 0.2)">
            <h3>{contact.name}</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '10px 0' }}>{contact.phone}</p>
            <p>{contact.description}</p>
          </SpotlightCard>
        ))}
      </div>

      <h2 style={{ marginBottom: '20px' }}>Coping Strategies</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {resources.coping_strategies.map((strategy, index) => (
          <SpotlightCard key={index} className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
            <h3>{strategy.title}</h3>
            <p style={{ margin: '10px 0' }}>{strategy.description}</p>
            <ul style={{ paddingLeft: '20px' }}>
              {strategy.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
};

export default FirstAid;
