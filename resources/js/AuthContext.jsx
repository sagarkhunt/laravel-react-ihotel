// // AuthContext.js
// import React, { createContext, useEffect, useState } from 'react';

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [accessToken, setAccessToken] = useState('');

//     const login = (token) => {
//         setAccessToken(token);
//         setIsLoggedIn(true);
//         localStorage.setItem('Access_Token', token); // Save token to local storage
//         localStorage.setItem('isAuthenticated', 'true'); // Set isAuthenticated to true in local storage
//     };

//     const logout = () => {
//         setAccessToken('');
//         setIsLoggedIn(false);
//         localStorage.removeItem('Access_Token'); // Remove token from local storage
//         localStorage.removeItem('isAuthenticated'); // Remove isAuthenticated from local storage
//     };

//     // Check if the user is already logged in based on token in local storage
//     useEffect(() => {
//         const storedToken = localStorage.getItem('Access_Token');
//         if (storedToken) {
//             setAccessToken(storedToken);
//             setIsLoggedIn(true);
//         }
//     }, []);
//     console.log(accessToken);
//     console.log(isLoggedIn);
//     console.log(login);
//     return (
//         <AuthContext.Provider
//             value={{ isLoggedIn, accessToken, login, logout }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export { AuthContext, AuthProvider };

import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [accessToken, setAccessToken] = useState('');

    const login = (token) => {
        setAccessToken(token);
        setIsLoggedIn(true);
        localStorage.setItem('Access_Token', token);
        localStorage.setItem('isAuthenticated', 'true');
    };

    const logout = () => {
        setAccessToken('');
        setIsLoggedIn(false);
        localStorage.removeItem('Access_Token');
        localStorage.removeItem('isAuthenticated');
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('Access_Token');
        if (storedToken) {
            setAccessToken(storedToken);
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, accessToken, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
