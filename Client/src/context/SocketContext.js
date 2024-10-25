import React, { createContext, useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext(null);

export const SocketProvider = ({ children, userId }) => {
    const [isSocketReady, setIsSocketReady] = useState(false);
    const socket = useRef(null);

    useEffect(() => {
        console.log('Initializing socket...');
        
        // Initialize socket and send userId on connection
        socket.current = io('http://localhost:8080', {
            query: { userId } // Send userId as part of the connection
        });

        socket.current.on('connect', () => {
            console.log('Socket connected:', socket.current.id);
            setIsSocketReady(true);
        });

        socket.current.on('connect_error', (err) => {
            console.error('Socket connection error:', err);
        });

        // Listen for any notifications or room join requests from the server
        socket.current.on('receiveNotification', (data) => {
            console.log('Notification received:', data);
            // Handle the notification in your UI (e.g., show a toast or alert)
        });

        socket.current.on('joinRoomRequest', (data) => {
            console.log('Join room request received:', data);
            // Handle the join room request in your UI (e.g., show a prompt)
        });

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
