import React from 'react'
import styles from './Leaderboard.module.css';

const LeaderBoard = ({index}) => {
    return (
        <div>
            <div
                className={`d-flex align-items-center py-2 px-3 my-2 friendListItem ${styles.friendListItem}`}
                style={{ backgroundColor: index % 2 === 0 ? 'rgb(244 240 240)' : 'rgb(239 239 239)' }}
            >
                <div className='me-3'>
                    <img
                        src={"https://github.com/mdo.png"}
                        className='rounded-circle border'
                        alt="Team Logo"
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                </div>
                <div className='flex-grow-1'>
                    <h6 className='mb-0' style={{ fontWeight: "600", color: "#050505" }}>
                        {'Team Name'}
                    </h6>
                    <p className='mb-0' style={{ fontSize: "13px", color: "#65676B" }}>
                        {'Captain Name'}
                    </p>
                </div>
                <div>
                    <button type='button' className='btn btn-light btn-sm' style={{ border: "1px solid #ddd", fontWeight: "500" }}>
                        View
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LeaderBoard
