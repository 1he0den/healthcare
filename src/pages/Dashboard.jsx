import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedContent from '../components/AnimatedContent';
import apiClient from '../api/client';

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/monitoring/dashboard');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <AnimatedContent
        distance={150}
        direction="horizontal"
        reverse={false}
        duration={1.2}
        ease="bounce.out"
        initialOpacity={0.2}
        animateOpacity
        scale={1.1}
        threshold={0.2}
        delay={0.3}
      >
        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Welcome back!</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '40px' }}>
          Track your mental health journey, journal your thoughts, and get support when you need it.
        </p>
      </AnimatedContent>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <Link to="/journal" style={{ textDecoration: 'none', color: 'white' }}>
          <div style={{ background: '#5227FF', padding: '20px', borderRadius: '15px', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s' }}>
            <h3>Write Journal</h3>
            <p>Log your thoughts today</p>
          </div>
        </Link>
        <Link to="/assessments" style={{ textDecoration: 'none', color: 'white' }}>
          <div style={{ background: '#ff6b6b', padding: '20px', borderRadius: '15px', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s' }}>
            <h3>Take Assessment</h3>
            <p>Check your mental state</p>
          </div>
        </Link>
        <Link to="/ai-chat" style={{ textDecoration: 'none', color: 'white' }}>
          <div style={{ background: '#00e5ff', padding: '20px', borderRadius: '15px', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s', color: 'black' }}>
            <h3>Chat with AI</h3>
            <p>Get instant support</p>
          </div>
        </Link>
      </div>

      {data && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{ background: '#333', padding: '20px', borderRadius: '15px' }}>
            <h3>Mood Trend</h3>
            <p>{JSON.stringify(data.mood_trend)}</p>
            {(!data.mood_trend || data.mood_trend.length === 0) && <p style={{color: '#aaa'}}>No data yet</p>}
          </div>
          <div style={{ background: '#333', padding: '20px', borderRadius: '15px' }}>
            <h3>Productivity</h3>
            <p>{JSON.stringify(data.productivity_metrics)}</p>
            {(!data.productivity_metrics || Object.keys(data.productivity_metrics).length === 0) && <p style={{color: '#aaa'}}>No data yet</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
