import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContesxt';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <ChatContextProvider>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </ChatContextProvider>
    </AuthContextProvider>
);


