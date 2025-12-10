import React, { useEffect, useState } from 'react';
import Stepper, { Step } from '../components/Stepper';
import apiClient from '../api/client';

const Assessments = () => {
  const [available, setAvailable] = useState([]);
  const [activeAssessment, setActiveAssessment] = useState(null);

  useEffect(() => {
    const fetchAvailable = async () => {
      try {
        const response = await apiClient.get('/assessments/available');
        setAvailable(response.data);
      } catch (error) {
        console.error('Error fetching assessments:', error);
      }
    };
    fetchAvailable();
  }, []);

  const startAssessment = (type) => {
    setActiveAssessment(type);
  };

  if (activeAssessment) {
    return (
      <div>
        <button onClick={() => setActiveAssessment(null)} style={{ marginBottom: '20px', background: 'transparent', border: '1px solid white', color: 'white', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>
          &larr; Back to list
        </button>
        <Stepper
          initialStep={1}
          onStepChange={(step) => console.log(step)}
          onFinalStepCompleted={() => {
            console.log("Assessment completed!");
            apiClient.post(`/assessments/${activeAssessment}/submit`, {});
            alert('Assessment submitted!');
            setActiveAssessment(null);
          }}
          backButtonText="Previous"
          nextButtonText="Next"
        >
          <Step>
            <h2>Question 1</h2>
            <p>How have you been feeling lately?</p>
            <textarea style={{ width: '100%', marginTop: '10px', padding: '10px', color: 'black' }} placeholder="Your answer..." />
          </Step>
          <Step>
            <h2>Question 2</h2>
            <p>Have you had trouble sleeping?</p>
            <select style={{ width: '100%', marginTop: '10px', padding: '10px', color: 'black' }}>
              <option>No</option>
              <option>Yes, a little</option>
              <option>Yes, a lot</option>
            </select>
          </Step>
          <Step>
            <h2>Final Step</h2>
            <p>Ready to submit?</p>
          </Step>
        </Stepper>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ marginBottom: '30px' }}>Assessments</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {/* Mocking available if empty because backend might return empty list */}
        {(available.length > 0 ? available : ['Depression', 'Anxiety', 'Stress']).map((item, index) => (
          <div key={index} style={{ background: '#2a2a2a', padding: '20px', borderRadius: '15px' }}>
            <h3>{typeof item === 'string' ? item : item.name}</h3>
            <button
              onClick={() => startAssessment(typeof item === 'string' ? item : item.id)}
              style={{ marginTop: '15px', padding: '10px 20px', borderRadius: '5px', border: 'none', background: '#5227FF', color: 'white', cursor: 'pointer' }}
            >
              Start Assessment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assessments;
