import React from 'react'

const Overview = ({ teamA, teamB, overs }) => {
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                    <div className="line"></div>
                    <small>{teamA} 0/0 {`(${overs})`}</small>
                    <div className="line"></div>
                </div>
                <div className='row'>
                    <div className='col-md-6 col-6'>
                        <div className='row'>
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
                                        {'Nikhil Mishra'}
                                    </h6>
                                    <p className='mb-0' style={{ fontSize: "13px", color: "#65676B" }}>
                                        {'32(12)'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6 col-6'>
                        <div className='row'>
                            <div className={`d-flex align-items-center py-2 px-3 my-2 friendListItem`}>
                                <div className='flex-grow-1 ms-auto'>
                                    <h6 className='mb-0 mx-3' style={{ fontWeight: "600", color: "#050505", textAlign: "end" }}>
                                        {'Chirag Saini'}
                                    </h6>
                                    <p className='mb-0 mx-3' style={{ fontSize: "13px", color: "#65676B", textAlign: "end" }}>
                                        {'2/34 (3)'}
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

                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6 col-6'>
                        <div className='row'>
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
                                        {'Nikhil Mishra'}
                                    </h6>
                                    <p className='mb-0' style={{ fontSize: "13px", color: "#65676B" }}>
                                        {'32(12)'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6 col-6'>
                        <div className='row'>
                            <div className={`d-flex align-items-center py-2 px-3 my-2 friendListItem`}>
                                <div className='flex-grow-1 ms-auto'>
                                    <h6 className='mb-0 mx-3' style={{ fontWeight: "600", color: "#050505", textAlign: "end" }}>
                                        {'Chirag Saini'}
                                    </h6>
                                    <p className='mb-0 mx-3' style={{ fontSize: "13px", color: "#65676B", textAlign: "end" }}>
                                        {'2/34 (3)'}
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

                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6 col-6'>
                        <div className='row'>
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
                                        {'Nikhil Mishra'}
                                    </h6>
                                    <p className='mb-0' style={{ fontSize: "13px", color: "#65676B" }}>
                                        {'32(12)'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6 col-6'>
                        <div className='row'>
                            <div className={`d-flex align-items-center py-2 px-3 my-2 friendListItem`}>
                                <div className='flex-grow-1 ms-auto'>
                                    <h6 className='mb-0 mx-3' style={{ fontWeight: "600", color: "#050505", textAlign: "end" }}>
                                        {'Chirag Saini'}
                                    </h6>
                                    <p className='mb-0 mx-3' style={{ fontSize: "13px", color: "#65676B", textAlign: "end" }}>
                                        {'2/34 (3)'}
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

                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                    <div className="line"></div>
                    <small>{teamB} 0/0 {`(${overs})`}</small>
                    <div className="line"></div>
                </div>
                <div className='row'>
                    <div className='col-md-6 col-6'>
                        <div className='row'>
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
                                        {'Nikhil Mishra'}
                                    </h6>
                                    <p className='mb-0' style={{ fontSize: "13px", color: "#65676B" }}>
                                        {'32(12)'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6 col-6'>
                        <div className='row'>
                            <div className={`d-flex align-items-center py-2 px-3 my-2 friendListItem`}>
                                <div className='flex-grow-1 ms-auto'>
                                    <h6 className='mb-0 mx-3' style={{ fontWeight: "600", color: "#050505", textAlign: "end" }}>
                                        {'Chirag Saini'}
                                    </h6>
                                    <p className='mb-0 mx-3' style={{ fontSize: "13px", color: "#65676B", textAlign: "end" }}>
                                        {'2/34 (3)'}
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

                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6 col-6'>
                        <div className='row'>
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
                                        {'Nikhil Mishra'}
                                    </h6>
                                    <p className='mb-0' style={{ fontSize: "13px", color: "#65676B" }}>
                                        {'32(12)'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6 col-6'>
                        <div className='row'>
                            <div className={`d-flex align-items-center py-2 px-3 my-2 friendListItem`}>
                                <div className='flex-grow-1 ms-auto'>
                                    <h6 className='mb-0 mx-3' style={{ fontWeight: "600", color: "#050505", textAlign: "end" }}>
                                        {'Chirag Saini'}
                                    </h6>
                                    <p className='mb-0 mx-3' style={{ fontSize: "13px", color: "#65676B", textAlign: "end" }}>
                                        {'2/34 (3)'}
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

                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6 col-6'>
                        <div className='row'>
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
                                        {'Nikhil Mishra'}
                                    </h6>
                                    <p className='mb-0' style={{ fontSize: "13px", color: "#65676B" }}>
                                        {'32(12)'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6 col-6'>
                        <div className='row'>
                            <div className={`d-flex align-items-center py-2 px-3 my-2 friendListItem`}>
                                <div className='flex-grow-1 ms-auto'>
                                    <h6 className='mb-0 mx-3' style={{ fontWeight: "600", color: "#050505", textAlign: "end" }}>
                                        {'Chirag Saini'}
                                    </h6>
                                    <p className='mb-0 mx-3' style={{ fontSize: "13px", color: "#65676B", textAlign: "end" }}>
                                        {'2/34 (3)'}
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

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overview
