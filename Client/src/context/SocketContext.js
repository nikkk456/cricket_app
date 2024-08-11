import React, { createContext, useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext(null);


export const SocketProvider = ({ children, userId }) => {
    const [isSocketReady, setIsSocketReady] = useState(false);
    const socket = useRef(null);

    useEffect(() => {
        console.log('Initializing socket...');
        socket.current = io('http://localhost:8080'); // Replace with your server URL

        socket.current.on('connect', () => {
            console.log('Socket connected:', socket.current.id);
            setIsSocketReady(true);
        });

        socket.current.on('connect_error', (err) => {
            console.error('Socket connection error:', err);
        });

        if (userId) {
            console.log('Joining room with userId:', userId);
            socket.current.emit('joinRoom', userId);
        }

        return () => {
            if (socket.current) {
                console.log('Disconnecting socket...');
                socket.current.disconnect();
            }
        };
    }, [userId]);

    // Render component based on socket readiness
    return (
        <SocketContext.Provider value={isSocketReady ? socket.current : null}>
            {children}
        </SocketContext.Provider>
    );

};
