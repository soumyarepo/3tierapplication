import { useState } from 'react';
import { api } from '../api';


export default function TransferForm({ token }) {
const [fromAcc, setFromAcc] = useState('');
const [toAcc, setToAcc] = useState('');
const [amount, setAmount] = useState('');


async function send() {
const res = await api('/api/accounts/transfer', 'POST', {
from_account: Number(fromAcc),
to_account: Number(toAcc),
amount: Number(amount)
}, token);
alert(res.message);
}


return (
<div>
<h3>Transfer Money</h3>
<input placeholder="From Account ID" onChange={e => setFromAcc(e.target.value)} />
<input placeholder="To Account ID" onChange={e => setToAcc(e.target.value)} />
<input placeholder="Amount" onChange={e => setAmount(e.target.value)} />
<button onClick={send}>Transfer</button>
</div>
);
}