import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token if we had one
// For now, we'll just pass a dummy user ID if needed by the backend, 
// but the backend seems to use a dependency for current_user_id.
// Since we don't have a full auth system yet, we might need to mock it or handle it.
// Looking at the backend code, `get_current_user_id` is a dependency.
// If it expects a token, we need to provide it. 
// If it's a mock dependency, it might just work.

export default apiClient;
