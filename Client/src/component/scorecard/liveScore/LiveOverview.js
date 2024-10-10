import React from 'react'

const LiveOverview = ({ teamAPlayersData, teamBPlayersData, challenge }) => {
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                    <div className="line"></div>
                    <small>{challenge.teamA}</small>
                    <div className="line"></div>
                </div>
                <div className='row'>
                    <div className='col-md-6 col-6'>
                        <div className='row'>
                            {
                                teamAPlayersData.map((item) => (
                                    <div
                                        className={`d-flex align-items-center py-2 px-3 my-2 friendListItem`}
                                    >
                                        <div className='me-3'>
                                            <img
                                                src={"https://github.com/mdo.png"}
                                                className='rounded-circle'
                                                alt="..///"
                                                style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                            />
                                        </div>
                                        <div className='flex-grow-1'>
                                            <h6 className='mb-0' style={{ fontWeight: "600", color: "#050505" }}>
                                                {item.playerName || 'Nikhil Mishra'}
                                            </h6>
                                            <p className='mb-0' style={{ fontSize: "13px", color: "#65676B" }}>
                                                {`${item.playersScore} (${item.playersBall})` || '0(0)'}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                    <div className='col-md-6 col-6'>
                        <div className='row'>
                            {
                                teamBPlayersData.map((item) => (
                                    <div className={`d-flex align-items-center py-2 px-3 my-2 friendListItem`}>
                                        <div className='flex-grow-1 ms-auto'>
                                            <h6 className='mb-0 mx-3' style={{ fontWeight: "600", color: "#050505", textAlign: "end" }}>
                                                {item.playerName || 'Chirag Saini'}
                                            </h6>
                                            <p className='mb-0 mx-3' style={{ fontSize: "13px", color: "#65676B", textAlign: "end" }}>
                                                { `${item.playersWickettaken}/${item.playersRunConceeded} (${item.playerOver})` ||'2/34 (3)'}
                                            </p>
                                        </div>
                                        <div className='me-3'>
                                            <img
                                                src={"https://github.com/mdo.png"}
                                                className='rounded-circle'
                                                alt="..///"
                                                style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                            />
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>

                {/* Team B Starts Here  */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                    <div className="line"></div>
                    <small>{challenge.teamB}</small>
                    <div className="line"></div>
                </div>
                <div className='row'>
                    <div className='col-md-6 col-6'>
                        <div className='row'>
                            {
                                teamBPlayersData.map((item) => (
                                    <div
                                        className={`d-flex align-items-center py-2 px-3 my-2 friendListItem`}
                                    >
                                        <div className='me-3'>
                                            <img
                                                src={"https://github.com/mdo.png"}
                                                className='rounded-circle'
                                                alt="..///"
                                                style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                            />
                                        </div>
                                        <div className='flex-grow-1'>
                                            <h6 className='mb-0' style={{ fontWeight: "600", color: "#050505" }}>
                                                {item.playerName || 'Nikhil Mishra'}
                                            </h6>
                                            <p className='mb-0' style={{ fontSize: "13px", color: "#65676B" }}>
                                                {`${item.playersScore} (${item.playersBall})` || '0(0)'}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='col-md-6 col-6'>
                        <div className='row'>
                        {
                                teamAPlayersData.map((item) => (
                                    <div className={`d-flex align-items-center py-2 px-3 my-2 friendListItem`}>
                                        <div className='flex-grow-1 ms-auto'>
                                            <h6 className='mb-0 mx-3' style={{ fontWeight: "600", color: "#050505", textAlign: "end" }}>
                                                {item.playerName || 'Chirag Saini'}
                                            </h6>
                                            <p className='mb-0 mx-3' style={{ fontSize: "13px", color: "#65676B", textAlign: "end" }}>
                                                { `${item.playersWickettaken}/${item.playersRunConceeded} (${item.playerOver})` ||'2/34 (3)'}
                                            </p>
                                        </div>
                                        <div className='me-3'>
                                            <img
                                                src={"https://github.com/mdo.png"}
                                                className='rounded-circle'
                                                alt="..///"
                                                style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                            />
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LiveOverview
