import React from 'react'

const Toast = ({ show, message, error, onClose }) => {
    return (
        <div aria-live="polite" aria-atomic="true" style={{ position: 'relative' }}>
            <div className={`toast ${show ? 'show' : ''}`} style={{ position: 'absolute', top: 0, right: 0 }}>
                <div className="toast-header text-white" style={{background:"#be0000"}}>
                    <strong className="me-auto">{message}</strong>
                    <button type="button" className="btn-close text-white" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body text-white" style={{backgroundColor:"#be0000", borderRadius:"0px 0px 5px 5px "}}>
                    {error}
                </div>
            </div>
        </div>
    )
}

export default Toast
