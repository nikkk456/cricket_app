import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components with Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
ChartJS.register(ArcElement, Tooltip, Legend);


const battingData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Monthly Sales',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 1,
        },
    ],
};
const bowlingData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Monthly Bowling ',
            data: [5, 2, 7, 0, 1, 0, 2],
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 1,
        },
    ],
};

const battingStyleData = {
    labels: ['Boundaries', 'Singles', 'Doubles'],
    datasets: [
        {
            label: 'Batting Run Distribution',
            data: [40, 35, 25], // Example data: 40 runs by boundaries, 35 by singles, 25 by doubles
            backgroundColor: [
                'rgba(255, 225, 225, 0.2)',
                'rgba(225, 225, 225, 1)',
                'rgba(255, 225, 225, 0.6)',
            ],
            borderColor: [
                'rgba(255, 225, 225, 1)',
                'rgba(255, 225, 225, 2)',
                'rgba(255, 225, 225, 0.6)',
            ],
            borderWidth: 1,
        },
    ],
};

const battingOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Monthly Batting Chart',
            color: "white"
        },
        scales: {
            x: {
                ticks: {
                    color: 'white', // Set X-axis label color to white
                },
            },
            y: {
                ticks: {
                    color: 'white', // Set Y-axis label color to white
                },
            },
        },
    },
};
const bowlingOption = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Monthly Bowling Chart',
            color: "white"
        },
        scales: {
            x: {
                ticks: {
                    color: 'white', // Set X-axis label color to white
                },
            },
            y: {
                ticks: {
                    color: 'white', // Set Y-axis label color to white
                },
            },
        },
    },
};

const battingStyleOptions = {
    plugins: {
        legend: {
            display: false, // Hides the legend
        },
        title: {
            display: false, // Hides the title
        },
    },
};


const Stats = () => {
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-6 col-lg-6 col-6'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='row text-white p-3 mx-1 ' style={{ backgroundColor: "grey", borderRadius: "20px" }}>
                                <div className="col-auto">
                                    <h5>Best Spell</h5>
                                    <h6>0/0</h6>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-5'>
                            <div className='row text-white p-3 ' style={{ backgroundColor: "grey", borderRadius: "20px" }}>
                                <div className="col-auto">
                                    <h5>Highest Score</h5>
                                    <h6>0</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col-md-6'>
                            <div className='row text-white p-3 mx-1 ' style={{ backgroundColor: "grey", borderRadius: "20px" }}>
                                <div className="col-auto">
                                    <h5>Average Strike Rate</h5>
                                    <h6>0</h6>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-5'>
                            <div className='row text-white p-3 ' style={{ backgroundColor: "grey", borderRadius: "20px" }}>
                                <div className="col-auto">
                                    <h5>Economy Rate</h5>
                                    <h6>0</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-3 text-white p-2' style={{backgroundColor:"grey", borderRadius:"20px", width:"98%"}}>
                        <div className='row'>
                        <div className='col-md-6' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <h5>Distribution of Run Scored </h5>
                        </div>
                        <div className='col-md-6'>
                            <center>
                                <div style={{ width: "300px", height: "165px" }}>
                                    <Pie data={battingStyleData} options={battingStyleOptions} />
                                </div>
                            </center>
                        </div>
                        </div>
                        <div className='row mt-3'>
                        <div className='col-md-6' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <h5>Distribution of Wicket Taken </h5>
                        </div>
                        <div className='col-md-6'>
                            <center>
                                <div style={{ width: "300px", height: "165px" }}>
                                    <Pie data={battingStyleData} options={battingStyleOptions} />
                                </div>
                            </center>
                        </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-6 col-lg-6 col-6'>
                    <div className='row text-white p-2' style={{ borderRadius: "20px", backgroundColor: "grey" }}>
                        <h5>Your Batting Stats</h5>
                        <Bar data={battingData} options={battingOptions} />
                    </div>
                    <div className='row text-white p-2 mt-3' style={{ borderRadius: "20px", backgroundColor: "grey" }}>
                        <h5>Your Bowling Stats</h5>
                        <Bar data={bowlingData} options={bowlingOption} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stats