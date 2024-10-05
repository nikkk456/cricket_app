import React, { useEffect, useState } from 'react'

const CurrentOver = ({ ball }) => {
    const [showFireIcon, setShowFireIcon] = useState(false);
    useEffect(() => {
        let timer;
        if (ball === 6) {
            timer = setTimeout(() => {
                setShowFireIcon(!showFireIcon);
            }, 2000); // Toggle every second
        }
        return () => clearTimeout(timer);
    }, [showFireIcon, ball]);
    return (
        <div
            className='mx-1 d-flex justify-content-center align-items-center position-relative'
            style={{
                width: "40px",
                height: "40px",
                border: "4px double black",
                borderRadius: "50%",
                backgroundColor: ball === 'wide' || ball === 'Wicket' ? 'red' : 'transparent',
                fontSize: "16px",
                position: "relative",
            }}
        >
            <span
                style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    right: "0",
                    bottom: "0",
                    border: "2px solid transparent",
                    borderRadius: "50%",
                    zIndex: -1,
                }}
            />
            {ball === 6 ? (
                showFireIcon ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                        <defs>
                            <linearGradient id="fireGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: "red", stopOpacity: 1 }} />
                                <stop offset="50%" style={{ stopColor: "orange", stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: "yellow", stopOpacity: 1 }} />
                            </linearGradient>
                        </defs>
                        <path fill="url(#fireGradient)" d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15" />
                    </svg>
                ) : 6
            ) : ball === 'wide' ? 'Wd' : ball === 'Wicket' ? 'W' : ball}
        </div>
    )
}

export default CurrentOver
