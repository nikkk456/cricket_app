import React from 'react';

const LiveCommentary = ({ currentOverRun }) => {
  console.log("This is currentOver run ", currentOverRun);

  const getCommentary = (run) => {
    switch (run) {
      case 1:
        return (
          <p>
            "Brilliant single! They steal one with smart running between the wickets. Great awareness!"
          </p>
        );
      case 2:
        return (
          <p>
            "They push hard for <strong>two</strong>! Excellent placement and quick feet to complete the second run."
          </p>
        );
      case 3:
        return (
          <p>
            "Exceptional running! They've managed to squeeze in <strong>three</strong>. Great coordination between the batsmen!"
          </p>
        );
      case 4:
        return (
          <p>
            "What a shot! The ball races away to the boundary for <strong>four!</strong> Perfect timing and power on display."
          </p>
        );
      case 6:
        return (
          <p>
            "That's massive! It's out of the park for a huge <strong>six!</strong> The crowd erupts as the ball sails into the stands!"
          </p>
        );
      case 'wide':
        return (
          <p>
            "It's a <strong>wide!</strong> The bowler loses control, giving away an <strong>extra run</strong>. Pressure building up!"
          </p>
        );
      case 'no ball':
        return (
          <p>
            "<strong>No ball!</strong> A free hit is coming up! The batsman has a great chance to capitalize on this mistake."
          </p>
        );
      default:
        return (
          <p>
            `Run: {run} taken! Smart batting to keep the scoreboard ticking.`
          </p>
        );
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <ul>
          {currentOverRun.reverse().map((run, index) => (
            <li key={index} style={{ marginBottom: '10px', fontSize: '1.2rem', color: '#333' }}>
              {getCommentary(run)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LiveCommentary;
