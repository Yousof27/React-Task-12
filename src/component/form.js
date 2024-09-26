import './form.css'
import { useState, useEffect } from "react"

export default function Form() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(data => setUsers(data));

        return () => false;
    }, []);

    useEffect(() => {
        setFilteredUsers(users);
    }, [users]);

    useEffect(() => {
        setFilteredUsers(users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) && u));
    }, [search, users]);

    return (
        <>
            <input onChange={e => setSearch(e.target.value)} className='search' placeholder='Search' />

            {filteredUsers?.map(u => <li key={u.id}>{u.name}</li>)}
        </>
    )
}
