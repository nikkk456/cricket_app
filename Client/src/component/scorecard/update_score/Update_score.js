import React, { useContext, useEffect, useState } from 'react'
import { ScoreCardContext } from '../../../context/ScoreCardContext';
import TeamA from './TeamA';
import TeamB from './TeamB';

const Update_score = ({ teamAScore, teamBScore, teamAWickets, teamBWickets, setTeamAScore, setTeamBScore, setTeamBWickets, setTeamAWickets, setTeamBOvers, setTeamAOvers, teamAPlayers, teamBPlayers }) => {
  const [teamAPlayersData, setTeamAPlayersData] = useState(teamAPlayers);
  const [teamBPlayersData, setTeamBPlayersData] = useState(teamBPlayers);
  const { challenge, setChallenge } = useContext(ScoreCardContext);
  const [strikerbatsman, setStrikerBatsman] = useState();
  const [nonstrikerbatsman, setNonStrikerBatsman] = useState();
  const [bowler, setBowler] = useState();
  const [balls, setBalls] = useState(0);
  const [totalRun, setTotalRun] = useState(0);
  const [matchWinner, setMatchWinner] = useState();
  const [wickets, setWickets] = useState(0);
  const [firstInnings, setFirstInnings] = useState();
  const [secondInnings, setSecondInnings] = useState();
  const [overCompleted, setOverCompleted] = useState(false);
  const [innings, setInnings] = useState(1);
  const [inningsOver, setInningsOver] = useState(false);
  const [winningruns, setWinningRuns] = useState(0);
  const [winningwickets, setWinningWickets] = useState(0);

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
  console.log("This is teamAPlayers Data", teamAPlayersData);
  console.log("This is teamBPlayers Data", teamBPlayersData);

  const checkOddRuns = (run) => {
    if (run % 2 !== 0) {
      // Change striker if odd runs
      swapPlayers();
    }
  }

  const swapPlayers = () => {
    let temp = strikerbatsman;
    setStrikerBatsman(nonstrikerbatsman);
    setNonStrikerBatsman(temp);
  }

  const handleBallInput = (run) => {
    const newRuns = totalRun + run;
    const newBalls = balls + 1;
    let overPlayedByTeam = Math.floor(newBalls / 6);

    setTotalRun(newRuns);
    setBalls(balls + 1);

    if (newBalls % 6 === 0) {
      setOverCompleted(true);
      swapPlayers();
    }

    if (innings == 1 && firstInnings == challenge.teamA) {
      setTeamAPlayersData(prevTeamAPlayers => {
        return prevTeamAPlayers.map(player => {
          if (player.playerName === strikerbatsman) {
            // Return a new player object with updated score
            return {
              ...player,
              playersScore: player.playersScore + run,
              playersBall: player.playersBall + 1,
              playersSix: run === 6 ? player.playersSix + 1 : player.playersSix,
              playersFours: run === 4 ? player.playersFours + 1 : player.playersFours

            };
          }
          return player; // Return the other players unchanged
        });
      });
      setTeamAScore(newRuns);
      setTeamAOvers(newBalls);
      checkOddRuns(run);
    } else if (innings == 1 && firstInnings == challenge.teamB) {

      // Update the player Score
      setTeamBPlayersData(prevTeamBPlayers => {
        return prevTeamBPlayers.map(player => {
          if (player.playerName === strikerbatsman) {
            return {
              ...player,
              playersScore: player.playersScore + run,
              playersBall: player.playersBall + 1,
              playersSix: run === 6 ? player.playersSix + 1 : player.playersSix,
              playersFours: run === 4 ? player.playersFours + 1 : player.playersFours
            };
          }
          return player;
        });
      });
      setTeamBScore(newRuns);
      setTeamBOvers(newBalls);
      checkOddRuns(run);
    }

    if (innings == 2 && secondInnings == challenge.teamA) {
      setTeamAPlayersData(prevTeamAPlayers => {
        return prevTeamAPlayers.map(player => {
          if (player.playerName === strikerbatsman) {
            return {
              ...player,
              playersScore: player.playersScore + run,
              playersBall: player.playersBall + 1,
              playersSix: run === 6 ? player.playersSix + 1 : player.playersSix,
              playersFours: run === 4 ? player.playersFours + 1 : player.playersFours
            };
          }
          return player;
        });
      });
      setTeamAScore(newRuns);
      setTeamAOvers(newBalls);
      checkOddRuns(run);
      if (newRuns > teamBScore) {
        setWinningWickets(challenge.teamAPlayers.length - teamAWickets - 1);
        console.log("This is winning wickets of teamA", winningwickets);
        setMatchWinner(challenge.teamA);
        setInnings(0);
      }
      else if (overPlayedByTeam >= challenge.overs) {
        setWinningRuns(teamBScore - newRuns)
        setMatchWinner(challenge.teamB)
      }
    } else if (innings == 2 && secondInnings == challenge.teamB) {
      // Update the player Score
      setTeamBPlayersData(prevTeamBPlayers => {
        return prevTeamBPlayers.map(player => {
          if (player.playerName === strikerbatsman) {
            return {
              ...player,
              playersScore: player.playersScore + run,
              playersBall: player.playersBall + 1,
              playersSix: run === 6 ? player.playersSix + 1 : player.playersSix,
              playersFours: run === 4 ? player.playersFours + 1 : player.playersFours
            };
          }
          return player;
        });
      });
      setTeamBScore(newRuns);
      setTeamBOvers(newBalls);
      checkOddRuns(run);
      if (newRuns > teamAScore) {
        setWinningWickets(challenge.teamBPlayers.length - teamBWickets - 1);
        setMatchWinner(challenge.teamB);
        setInnings(0);
      } else if (overPlayedByTeam >= challenge.overs) {
        setWinningRuns(teamAScore - newRuns)
        setMatchWinner(challenge.teamA)
      }
    }

    // axios.post('/api/update-score', { runs: newRuns, balls: newBalls, striker: newStriker, nonStriker: newNonStriker, bowler })
    //   .then(response => setMatchData(response.data));
  };
  console.log("This is Total Run " + totalRun + " This is total Wicket  " + wickets + " this is stricker and non striker", strikerbatsman, nonstrikerbatsman + "The Match Winner is ", matchWinner);
  const handleWicket = () => {
    let newWickets = wickets + 1;
    let newBalls = balls + 1;
    let teamAPlayers = challenge.teamAPlayers;
    let teamBPlayers = challenge.teamBPlayers;

    console.log("Thus is teamAplayers and teamBplayers", teamAPlayers, teamBPlayers);

    setWickets(wickets + 1);
    setBalls(balls + 1);
    if (innings == 1 && firstInnings == challenge.teamA) {
      setTeamAWickets(newWickets);
      setTeamAOvers(newBalls);
    } else if (innings == 1 && firstInnings == challenge.teamB) {
      setTeamBWickets(newWickets);
      setTeamBOvers(newBalls);
    }

    if (innings == 2 && secondInnings == challenge.teamA) {
      if (newWickets >= teamAPlayers.length - 1) {
        setWinningRuns(teamBScore - teamAScore);
        setMatchWinner(challenge.teamB);
      }
      setTeamAWickets(newWickets);
      setTeamAOvers(newBalls);
    } else if (innings == 2 && secondInnings == challenge.teamB) {
      if (newWickets >= teamBPlayers.length - 1) {
        setWinningRuns(teamAScore - teamBScore);
        setMatchWinner(challenge.teamA);
      }
      setTeamBWickets(newWickets);
      setTeamBOvers(newBalls);
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
    if (innings == 1 && firstInnings == challenge.teamA) {
      setTeamAScore(teamAScore + run);
    } else if (innings == 1 && firstInnings == challenge.teamB) {
      setTeamBScore(teamBScore + run);
    }

    if (innings == 2 && secondInnings == challenge.teamA) {
      setTeamAScore(teamAScore + run);
    } else if (innings == 2 && secondInnings == challenge.teamB) {
      setTeamBScore(teamBScore + run);
    }


    // axios.post('/api/update-score', { runs: runs + run, balls, bowler })
    //   .then(response => setMatchData(response.data));
  };
  const oversPlayed = Math.floor(balls / 6);


  useEffect(() => {
    if (oversPlayed >= challenge.overs) {
      setInnings(innings + 1);
      setInningsOver(true);
      setWickets(0);
      setTotalRun(0);
      setBalls(0);
      setStrikerBatsman();
      setNonStrikerBatsman();
      setBowler();
      setOverCompleted(false);
    }
  }, [wickets, balls])


  if (matchWinner) {
    console.log("This is winninhWickets in If condiotion ", winningwickets);
    return (
      <div className='container'>
        <h1>{matchWinner} Wins The Match by {winningruns > 0 ? winningruns + " Runs" : winningwickets + " Wickets"}</h1>
      </div>
    )
  }

  return (
    <div>
      {
        innings == 1 && (
          <>
            <div className='container'>
              <h5 className='text-center my-2'>{challenge.tossWinner} won the Toss and choose to {challenge.tossWinnerSelection}</h5>
              <h6 className='text-center'>Welcome to First innings of the match Please select the Respective Batsman </h6>
              {
                firstInnings == challenge.teamA ?
                  <TeamA setBowler={setBowler} setStrikerBatsman={setStrikerBatsman} setNonStrikerBatsman={setNonStrikerBatsman} bowler={bowler} nonStrickerBatsman={nonstrikerbatsman} strikerbatsman={strikerbatsman} teamAPlayers={teamAPlayersData} teamBPlayers={teamBPlayersData}/>
                  :
                  <TeamB setBowler={setBowler} setStrikerBatsman={setStrikerBatsman} setNonStrikerBatsman={setNonStrikerBatsman} bowler={bowler} nonStrickerBatsman={nonstrikerbatsman} strikerbatsman={strikerbatsman} teamAPlayers={teamAPlayersData} teamBPlayers={teamBPlayersData} />
              }

            </div>
            <div className='container'>
              <h2>Select Run per Over's Ball </h2>
              <h5>Select run on {(balls - (Math.floor(balls / 6) * 6)) + 1} ball  of {Math.floor(balls / 6) + 1} Over</h5>
              {
                overCompleted ?
                  <div>
                    <h3>Select Next Bowler</h3>
                    <select className="form-select form-select-sm " aria-label="Default select example" name='teamA_selection' onChange={(e) => {
                      setBowler(e.target.value);
                      setOverCompleted(false)
                    }}>
                      <option value="" disabled selected>Select a Bowler</option>
                      {
                        firstInnings == challenge.teamA?
                        challenge.teamBPlayers.map((element, index) => (
                          <option value={element.value} key={index}>{element.value}</option>
                        ))
                        :
                        challenge.teamAPlayers.map((element, index) => (
                          <option value={element.value} key={index}>{element.value}</option>
                        ))
                      }
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
                  <TeamA setBowler={setBowler} setStrikerBatsman={setStrikerBatsman} setNonStrikerBatsman={setNonStrikerBatsman} bowler={bowler} nonStrickerBatsman={nonstrikerbatsman} strikerbatsman={strikerbatsman} teamAPlayers={teamAPlayersData} teamBPlayers={teamBPlayersData}/>
                  :
                  <TeamB setBowler={setBowler} setStrikerBatsman={setStrikerBatsman} setNonStrikerBatsman={setNonStrikerBatsman} bowler={bowler} nonStrickerBatsman={nonstrikerbatsman} strikerbatsman={strikerbatsman} teamAPlayers={teamAPlayersData} teamBPlayers={teamBPlayersData} />
              }

            </div>
            <div className='container'>
              <h2>Select Run per Over's Ball </h2>
              <h5>Select run on {(balls - (Math.floor(balls / 6) * 6)) + 1} ball  of {Math.floor(balls / 6) + 1} Over</h5>
              {
                overCompleted ?
                  <div>
                    <h3>Select Next Bowler</h3>
                    <select className="form-select form-select-sm " aria-label="Default select example" name='teamA_selection' onChange={(e) => {
                      setBowler(e.target.value);
                      setOverCompleted(false)
                    }}>
                      <option value="" disabled selected>Select a Bowler</option>
                      {
                        secondInnings == challenge.teamA?
                        challenge.teamBPlayers.map((element, index) => (
                          <option value={element.value} key={index}>{element.value}</option>
                        )):
                        challenge.teamAPlayers.map((element, index) => (
                          <option value={element.value} key={index}>{element.value}</option>
                        ))
                      }
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


    </div>
  )

}

export default Update_score
