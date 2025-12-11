export async function api(path, method = 'GET', body, token) {
const res = await fetch(`http://localhost:8080${path}`, {
method,
headers: {
'Content-Type': 'application/json',
'Authorization': `Bearer ${token}`
},
body: body ? JSON.stringify(body) : undefined
});
return res.json();
}