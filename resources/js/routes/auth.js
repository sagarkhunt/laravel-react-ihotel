// auth.js

// Define a function to check if the user is authenticated
export const isAuthenticated = () => {
    // Implement your authentication check logic here
    const authToken = localStorage.getItem('Access_Token');
    return !!authToken; // Return true if the token exists, false otherwise
};
