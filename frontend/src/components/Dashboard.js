import { useEffect, useState } from 'react';
import { api } from '../api';
import TransferForm from './TransferForm';


export default function Dashboard({ token }) {
const [accounts, setAccounts] = useState([]);


useEffect(() => {
api('/api/accounts', 'GET', null, token).then(setAccounts);
}, []);


return (
<div>
<h2>Your Accounts</h2>
{accounts.map(acc => (
<div key={acc.id}>
{acc.account_type}: ₹{acc.balance}
</div>
))}


<TransferForm token={token} />
</div>
);
}