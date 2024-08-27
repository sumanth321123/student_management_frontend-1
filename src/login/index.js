// import React from 'react';


// const Login= () => {
//     return (
//         <form>
//             <h1> Login </h1>
//             <input type="text" placeholder="Enter your name" />
//             <input type="password" placeholder="Enter your password" />
//             <input type='submit'/>
//         </form>
//     );
// };
// export default Login;


// login.js
import React, { useState } from 'react';
const Login = ({ onLogin }) => 
{
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = (e) => 
        {
        e.preventDefault();
        if (name=="admin" && password=="admin@123") {
            onLogin();
            setName('');
            setPassword('');
        }
        else
        {
            alert("Invalid credentials! Please try again.")
        }
    };
    return (
        <div class="container">
        <form onSubmit={handleLogin}>
            <h1><b>Login</b></h1>
            <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            /><br/>
            <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            /><br/>
            <button type="submit">Login</button>
        </form>
        </div>
    );
};
export default Login;