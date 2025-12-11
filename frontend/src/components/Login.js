import { useState } from 'react';


export default function Login({ setToken }) {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');


async function handleLogin() {
const res = await fetch('http://localhost:8080/api/auth/login', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ email, password })
});


const data = await res.json();
if (data.token) {
localStorage.setItem('token', data.token);
setToken(data.token);
}
}


return (
<div>
<h2>Login</h2>
<input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
<input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
<button onClick={handleLogin}>Login</button>
</div>
);
}