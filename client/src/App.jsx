import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './App.css';

function Nav() {
    return (
        <h1>BRUH</h1>
    );
}

export default function App() {
    const [message, setMessage] = useState("");
    useEffect(() => {
        fetch("/api/hello")
        .then(res => res.json())
        .then(data => setMessage(data.message))
        .catch(console.error);
    }, []);
    return (
        <div className="content">
            <Nav />
            <h1>{message || "Loading..."}</h1>
            <h1>🎉 Pongal IISERK App</h1>
            <p>Welcome! Authentication powered by SuperTokens.</p>
            <Link to="/auth">Go to Login / Signup</Link>
        </div>
    );
}
