import { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';


export default function App() {
const [token, setToken] = useState(localStorage.getItem('token'));


if (!token) return <Login setToken={setToken} />;


return <Dashboard token={token} />;
}