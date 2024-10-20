import React from 'react'

const HandleBall = ({ handleBallInput, handleWideOrNoBall, handleWicket, handleNoBall }) => {
    return (
        <>
            <div className="score-update-buttons d-flex flex-wrap gap-3 my-3">
                <button className="btn btn-outline-primary rounded shadow-lg" onClick={() => handleBallInput(0)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-0-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 4.951c-1.008 0-1.629 1.09-1.629 2.895v.31c0 1.81.627 2.895 1.629 2.895s1.623-1.09 1.623-2.895v-.31c0-1.8-.621-2.895-1.623-2.895" />
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-8.012 4.158c1.858 0 2.96-1.582 2.96-3.99V7.84c0-2.426-1.079-3.996-2.936-3.996-1.864 0-2.965 1.588-2.965 3.996v.328c0 2.42 1.09 3.99 2.941 3.99" />
                    </svg>
                </button>
                <button className="btn btn-outline-primary rounded shadow-lg" onClick={() => handleBallInput(1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-1-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M9.283 4.002H7.971L6.072 5.385v1.271l1.834-1.318h.065V12h1.312z" />
                    </svg>
                </button>
                <button className="btn btn-outline-primary rounded shadow-lg" onClick={() => handleBallInput(2)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-2-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.646 6.24c0-.691.493-1.306 1.336-1.306.756 0 1.313.492 1.313 1.236 0 .697-.469 1.23-.902 1.705l-2.971 3.293V12h5.344v-1.107H7.268v-.077l1.974-2.22.096-.107c.688-.763 1.287-1.428 1.287-2.43 0-1.266-1.031-2.215-2.613-2.215-1.758 0-2.637 1.19-2.637 2.402v.065h1.271v-.07Z" />
                    </svg>
                </button>
                <button className="btn btn-outline-primary rounded shadow-lg" onClick={() => handleBallInput(3)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-3-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-8.082.414c.92 0 1.535.54 1.541 1.318.012.791-.615 1.36-1.588 1.354-.861-.006-1.482-.469-1.54-1.066H5.104c.047 1.177 1.05 2.144 2.754 2.144 1.653 0 2.954-.937 2.93-2.396-.023-1.278-1.031-1.846-1.734-1.916v-.07c.597-.1 1.505-.739 1.482-1.876-.03-1.177-1.043-2.074-2.637-2.062-1.675.006-2.59.984-2.625 2.12h1.248c.036-.556.557-1.054 1.348-1.054.785 0 1.348.486 1.348 1.195.006.715-.563 1.237-1.342 1.237h-.838v1.072h.879Z" />
                    </svg>
                </button>
                <button className="btn btn-outline-success rounded shadow-lg" onClick={() => handleBallInput(4)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-4-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M7.519 5.057c-.886 1.418-1.772 2.838-2.542 4.265v1.12H8.85V12h1.26v-1.559h1.007V9.334H10.11V4.002H8.176zM6.225 9.281v.053H8.85V5.063h-.065c-.867 1.33-1.787 2.806-2.56 4.218" />
                    </svg>
                </button>
                <button className="btn btn-outline-success rounded shadow-lg" onClick={() => handleBallInput(6)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-6-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.21 3.855c-1.868 0-3.116 1.395-3.116 4.407 0 1.183.228 2.039.597 2.642.569.926 1.477 1.254 2.409 1.254 1.629 0 2.847-1.013 2.847-2.783 0-1.676-1.254-2.555-2.508-2.555-1.125 0-1.752.61-1.98 1.155h-.082c-.012-1.946.727-3.036 1.805-3.036.802 0 1.213.457 1.312.815h1.29c-.06-.908-.962-1.899-2.573-1.899Zm-.099 4.008c-.92 0-1.564.65-1.564 1.576 0 1.032.703 1.635 1.558 1.635.868 0 1.553-.533 1.553-1.629 0-1.06-.744-1.582-1.547-1.582" />
                    </svg>
                </button>
                <button className="btn btn-outline-danger rounded shadow-lg px-4  fs-5" onClick={handleWicket}>
                    <i className="bi bi-x-circle-fill"></i> W
                </button>
            </div>
            <div className="score-update-buttons d-flex flex-wrap gap-3 my-3">
                <button className="btn btn-outline-warning rounded shadow-lg px-2  fs-5" onClick={() => handleWideOrNoBall(1)}>
                    <i className="bi bi-exclamation-triangle"></i> Wd(1)
                </button>
                <button className="btn btn-outline-warning rounded shadow-lg px-2  fs-5" onClick={() => handleWideOrNoBall(2)}>
                    <i className="bi bi-exclamation-triangle"></i> Wd(1+1)
                </button>
                <button className="btn btn-outline-warning rounded shadow-lg px-2  fs-5" onClick={() => handleWideOrNoBall(3)}>
                    <i className="bi bi-exclamation-triangle"></i> Wd(1+2)
                </button>
                <button className="btn btn-outline-warning rounded shadow-lg px-2  fs-5" onClick={() => handleWideOrNoBall(4)}>
                    <i className="bi bi-exclamation-triangle"></i> Wd(1+3)
                </button>
                <button className="btn btn-outline-warning rounded shadow-lg px-2  fs-5" onClick={() => handleWideOrNoBall(5)}>
                    <i className="bi bi-exclamation-triangle"></i> Wd(1+4)
                </button>
            </div>
            <div className="score-update-buttons d-flex flex-wrap gap-3 my-3">
                <button className="btn btn-outline-warning rounded shadow-lg px-2  fs-5" onClick={() => handleNoBall(1)}>
                    <i className="bi bi-exclamation-triangle"></i> Nb(1)
                </button>
                <button className="btn btn-outline-warning rounded shadow-lg px-2  fs-5" onClick={() => handleNoBall(2)}>
                    <i className="bi bi-exclamation-triangle"></i> Nb(1+1)
                </button>
                <button className="btn btn-outline-warning rounded shadow-lg px-2  fs-5" onClick={() => handleNoBall(3)}>
                    <i className="bi bi-exclamation-triangle"></i> Nb(1+2)
                </button>
                <button className="btn btn-outline-warning rounded shadow-lg px-2  fs-5" onClick={() => handleNoBall(4)}>
                    <i className="bi bi-exclamation-triangle"></i> Nb(1+3)
                </button>
                <button className="btn btn-outline-warning rounded shadow-lg px-2  fs-5" onClick={() => handleNoBall(5)}>
                    <i className="bi bi-exclamation-triangle"></i> Nb(1+4)
                </button>
                <button className="btn btn-outline-warning rounded shadow-lg px-2  fs-5" onClick={() => handleNoBall(7)}>
                    <i className="bi bi-exclamation-triangle"></i> Nb(1+6)
                </button>
            </div>
        </>
    )
}

export default HandleBall
