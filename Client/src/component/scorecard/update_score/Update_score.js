import React, { useContext, useEffect, useState } from 'react'
import { ScoreCardContext } from '../../../context/ScoreCardContext';
import TeamA from './TeamA';
import TeamB from './TeamB';

const Update_score = ({ teamAScore, teamBScore, teamAWickets, teamBWickets, setTeamAScore, setTeamBScore, setTeamBWickets, setTeamAWickets, setTeamBOvers, setTeamAOvers }) => {
  const { challenge, setChallenge } = useContext(ScoreCardContext);
  const [strikerbatsman, setStrikerBatsman] = useState();
  const [nonstrikerbatsman, setNonStrikerBatsman] = useState();
  const [bowler, setBowler] = useState();
  const [balls, setBalls] = useState(0);
  const [totalRun, setTotalRun] = useState(0);
  const [matchWinner, setMatchWinner] = useState();
  // const [nextBatsman, setNextBatsman] = useState('');
  // const [catchTaker, setCatchTaker] = useState('');
  const [wickets, setWickets] = useState(0);
  const [firstInnings, setFirstInnings] = useState();
  const [secondInnings, setSecondInnings] = useState();
  const [overCompleted, setOverCompleted] = useState(false);
  const [innings, setInnings] = useState(1);
  const [inningsOver, setInningsOver] = useState(false);

  useEffect(() => {
    if (challenge.tossWinner == challenge.teamA) {
      if (challenge.tossWinnerSelection == "Batting") {
        setFirstInnings(challenge.teamA);
        setSecondInnings(challenge.teamB);
      } else {
        setFirstInnings(challenge.teamB);
        setSecondInnings(challenge.teamA);
      }
    } else {
      if (challenge.tossWinnerSelection == "Batting") {
        setFirstInnings(challenge.teamB);
        setSecondInnings(challenge.teamA);
      } else {
        setFirstInnings(challenge.teamA);
        setSecondInnings(challenge.teamB);
      }
    }
  }, [])


  useEffect(() => {
    if (challenge.tossWinner == challenge.teamA) {
      if (challenge.tossWinnerSelection == "Batting" && !inningsOver) {
        setTeamAScore(totalRun);
        setTeamAWickets(wickets);
        setTeamAOvers(balls);

      } else {
        setTeamBScore(totalRun);
        setTeamBWickets(wickets);
        setTeamBOvers(balls);
      }
    } else {
      if (challenge.tossWinnerSelection == "Batting" && !inningsOver) {
        setTeamBScore(totalRun);
        setTeamBWickets(wickets);
        setTeamBOvers(balls);
      } else {
        setTeamAScore(totalRun);
        setTeamAWickets(wickets);
        setTeamAOvers(balls);
      }
    }
  }, [challenge, wickets, totalRun, balls, inningsOver])


  const handleBallInput = (run) => {
    const newRuns = totalRun + run;
    const newBalls = balls + 1;


    if (run % 2 !== 0) {
      // Change striker if odd runs
      let temp = strikerbatsman;
      setStrikerBatsman(nonstrikerbatsman);
      setNonStrikerBatsman(temp);
    }

    setTotalRun(newRuns);
    setBalls(balls + 1);

    if (newBalls % 6 === 0) {
      setOverCompleted(true);
    }

    if (innings == 1 && firstInnings == challenge.teamA) {
      setTeamAScore(totalRun);
    } else if (innings == 1 && firstInnings == challenge.teamB) {
      setTeamBScore(totalRun);
    }

    if (innings == 2 && secondInnings == challenge.teamA) {
      console.log("Ye is function me aare hai ");
      setTeamAScore(totalRun);
      if(teamAScore>teamBScore){
        setMatchWinner(challenge.teamA);
        setInnings(0);
      }
    } else if (innings == 2 && secondInnings == challenge.teamB) {
      console.log("Ye is function me aare hai TeamB wale me ");
      setTeamBScore(totalRun);
      if(teamBScore>teamAScore){
        setMatchWinner(challenge.teamB);
        setInnings(0);
      }
    }

    // axios.post('/api/update-score', { runs: newRuns, balls: newBalls, striker: newStriker, nonStriker: newNonStriker, bowler })
    //   .then(response => setMatchData(response.data));
  };
  console.log("This is Total Run " + totalRun + " This is total Wicket  " + wickets + " this is stricker and non striker", strikerbatsman, nonstrikerbatsman + "The Match Winner is ", matchWinner);
  const handleWicket = () => {
    setWickets(wickets + 1);
    setBalls(balls + 1);
    if (innings == 1 && firstInnings == challenge.teamA) {
      setTeamAWickets(totalRun);
    } else if (innings == 1 && firstInnings == challenge.teamB) {
      setTeamBWickets(totalRun);
    }

    if (innings == 2 && secondInnings == challenge.teamA) {
      setTeamAWickets(totalRun);
    } else if (innings == 2 && secondInnings == challenge.teamB) {
      setTeamBWickets(totalRun);
    }
    // axios.post('/api/update-score', { runs, balls, wickets: wickets + 1, striker: nextBatsman, nonStriker, bowler, isWicket: true, catchTaker })
    //   .then(response => {
    //     setMatchData(response.data);
    //     setStriker(nextBatsman);
    //     setNextBatsman('');
    //   });
  };
  const handleWideOrNoBall = (run) => {
    setTotalRun(totalRun + run);
    // axios.post('/api/update-score', { runs: runs + run, balls, bowler })
    //   .then(response => setMatchData(response.data));
  };
  const oversPlayed = Math.floor(balls / 6);
  if (oversPlayed >= challenge.overs) {
    if(oversPlayed >= challenge.over * 2){
      return (<><h1>Match Hi khtm Bhiya jI</h1></>)
    }
    console.log("Match Over");
    setInnings(innings+1);
    setInningsOver(true);
    setWickets(0);
    setTotalRun(0);
    setBalls(0);
    setStrikerBatsman();
    setNonStrikerBatsman();
    setBowler();
  }

  return (
    <div>
      {
        innings == 1 && (
          <>
            <div className='container'>
              <h5>{challenge.tossWinner} won the Toss and choose to {challenge.tossWinnerSelection}</h5>
              <h5>Welcome to First innings of the match Please select the Respective Batsman </h5>
              {
                firstInnings == challenge.teamA ?
                  <TeamA setBowler={setBowler} setStrikerBatsman={setStrikerBatsman} setNonStrikerBatsman={setNonStrikerBatsman} />
                  :
                  <TeamB setBowler={setBowler} setStrikerBatsman={setStrikerBatsman} setNonStrikerBatsman={setNonStrikerBatsman} />
              }

            </div>
            <div className='container'>
              <h2>Select Run per Over's Ball </h2>
              <h5>Select run on {(balls - (Math.floor(balls / 6) * 6)) + 1} ball  of {Math.floor(balls / 6) + 1} Over</h5>
              {
                overCompleted ?
                  <div>
                    <h3>Select Next Bowler</h3>
                    <select onChange={(e) => { setBowler(e.target.value); setOverCompleted(false) }} value={bowler}>
                      {challenge.teamAPlayers.map(b => (
                        <option value={b.name}>{b.name}</option>
                      ))}
                    </select>
                  </div> :
                  <>
                    <div>
                      <button className='btn btn-sm btn-primary' onClick={() => handleBallInput(1)}>1 Run</button>
                      <button className='btn btn-sm btn-primary' onClick={() => handleBallInput(2)}>2 Runs</button>
                      <button className='btn btn-sm btn-primary' onClick={() => handleBallInput(3)}>3 Runs</button>
                      <button className='btn btn-sm btn-primary' onClick={() => handleBallInput(4)}>4 Runs</button>
                      <button className='btn btn-sm btn-primary' onClick={() => handleBallInput(6)}>6 Runs</button>
                      <button className='btn btn-sm btn-primary' onClick={() => handleWideOrNoBall(1)}>Wide Ball (1 Run)</button>
                      <button className='btn btn-sm btn-primary' onClick={() => handleWideOrNoBall(1)}>No Ball (1 Run)</button>
                      <button className='btn btn-sm btn-primary' onClick={handleWicket}>Wicket</button>
                    </div>
                  </>
              }

            </div>
          </>
        )
      }
      {
        innings == 2 && (
          <>
            <div className='container'>
              <h5>{challenge.tossWinner} won the Toss and choose to {challenge.tossWinnerSelection}</h5>
              <h5>Welcome to Second innings of the match Please select the Respective Batsman </h5>
              {
                secondInnings == challenge.teamA ?
                  <TeamA setBowler={setBowler} setStrikerBatsman={setStrikerBatsman} setNonStrikerBatsman={setNonStrikerBatsman} />
                  :
                  <TeamB setBowler={setBowler} setStrikerBatsman={setStrikerBatsman} setNonStrikerBatsman={setNonStrikerBatsman} />
              }

            </div>
            <div className='container'>
              <h2>Select Run per Over's Ball </h2>
              <h5>Select run on {(balls - (Math.floor(balls / 6) * 6)) + 1} ball  of {Math.floor(balls / 6) + 1} Over</h5>
              {
                overCompleted ?
                  <div>
                    <h3>Select Next Bowler</h3>
                    <select onChange={(e) => { setBowler(e.target.value); setOverCompleted(false) }} value={bowler}>
                      {challenge.teamAPlayers.map(b => (
                        <option value={b.name}>{b.name}</option>
                      ))}
                    </select>
                  </div> :
                  <>
                    <div>
                      <button className='btn btn-sm btn-primary' onClick={() => handleBallInput(1)}>1 Run</button>
                      <button className='btn btn-sm btn-primary' onClick={() => handleBallInput(2)}>2 Runs</button>
                      <button className='btn btn-sm btn-primary' onClick={() => handleBallInput(3)}>3 Runs</button>
                      <button className='btn btn-sm btn-primary' onClick={() => handleBallInput(4)}>4 Runs</button>
                      <button className='btn btn-sm btn-primary' onClick={() => handleBallInput(6)}>6 Runs</button>
                      <button className='btn btn-sm btn-primary' onClick={() => handleWideOrNoBall(1)}>Wide Ball (1 Run)</button>
                      <button className='btn btn-sm btn-primary' onClick={() => handleWideOrNoBall(1)}>No Ball (1 Run)</button>
                      <button className='btn btn-sm btn-primary' onClick={handleWicket}>Wicket</button>
                    </div>
                  </>
              }

            </div>
          </>
        )
      }
      {
        matchWinner && (
          <div className='container'>
            <h1>{matchWinner} Wins The Match</h1>
          </div>
        ) 
      }


    </div>
  )

}

export default Update_score
