const constants = {
    HOST_URL: import.meta.env.VITE_REACT_APP_URL,
    withCredentials: true,
    headers: (token) => ({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // Authorization: `Bearer ${token}`, // Pass the token as a parameter
    }),
};

export default constants;
