import { useEffect, useState } from "react";
import './App.css';

function Nav() {
    return (
        <h1>BRUH</h1>
    );
}

function App() {
    const [message, setMessage] = useState("");
    useEffect(() => {
        fetch("/api/hello")
        .then(res => res.json())
        .then(data => setMessage(data.message))
        .catch(console.error);
    }, []);

    return (
            <div className="content">
            <Nav/>
            <h1>{message || "Loading..."}</h1>
            </div>
    );
}

export default App;
