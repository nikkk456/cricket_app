import React, { useState } from 'react';
import './NotFound.css'; // You can place the CSS in a separate file

const NotFound = () => {
  return (
    <main className="error-page vh-100">
      <div className="container-notfound">
        <dotlottie-player src="https://lottie.host/30042e4f-c9b4-42a6-b6d7-1dcf80c0d889/cE2oXN8aan.json" background="transparent" speed="1" style={{width: "500px", height: "200px"}} loop autoplay></dotlottie-player>

        <div className="error-page__heading">
          <h1 className="error-page__heading-title">PAGE NOT FOUND</h1>
          <p className="error-page__heading-desciption">Looks like you’ve hit a golden duck! this page is out of the game. Let’s get you back to the pitch!</p>
        </div>

        <a className="error-page__button" href="/" aria-label="back to home" title="back to home">
          back to home
        </a>
      </div>
    </main>
  );
};

export default NotFound;
