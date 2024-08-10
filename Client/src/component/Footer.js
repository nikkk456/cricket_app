import React from 'react'
import { useLocation } from 'react-router-dom'

const Footer = () => {
    const location = useLocation();
    const showNavbar = !location.pathname.includes('/dashboard');
    return (
        <div style={{ backgroundColor: '#cccccc' }} className={showNavbar ? 'mt-3' : "d-none"}>
            <div class="container">
                <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 border-top">
                    <p class="col-md-4 mb-0 text-body-secondary">© 2024 Company, Inc</p>

                    <a href="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                        Cricket_APP
                    </a>

                    <ul class="nav col-md-4 justify-content-end">
                        <li class="nav-item"><a href="/" class="nav-link px-2 text-body-secondary">Home</a></li>
                        <li class="nav-item"><a href="/blogs" class="nav-link px-2 text-body-secondary">Blogs</a></li>
                        <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Contact Us</a></li>
                        <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">About US</a></li>
                        <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">FAQs</a></li>
                    </ul>
                </footer>
            </div>
        </div>
    )
}

export default Footer
