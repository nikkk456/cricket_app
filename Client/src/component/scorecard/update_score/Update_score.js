import React, { useContext, useEffect, useState } from 'react'
import { ScoreCardContext } from '../../../context/ScoreCardContext';
import TeamA from './TeamA';
import TeamB from './TeamB';
import { SocketContext } from '../../../context/SocketContext';
import HandleBall from './HandleBall';
import CatchSelection from './CatchSelection';
import NextStrickerBatsman from './NextStrickerBatsman';
import { useParams } from 'react-router-dom';

const Update_score = ({ teamAScore, teamBScore, teamAWickets, teamBWickets, setTeamAScore, setTeamBScore, setTeamBWickets, setTeamAWickets, setTeamBOvers, setTeamAOvers, teamAPlayers, teamBPlayers, teamAOvers, teamBOvers, setCurrentRunRate, setRequiredRunRate }) => {
  const socket = useContext(SocketContext);
  const [teamAPlayersData, setTeamAPlayersData] = useState(teamAPlayers);
  const [teamBPlayersData, setTeamBPlayersData] = useState(teamBPlayers);
  const { challenge, setChallenge } = useContext(ScoreCardContext);
  const [strikerbatsman, setStrikerBatsman] = useState();
  const [nonstrikerbatsman, setNonStrikerBatsman] = useState();
  const [bowler, setBowler] = useState();
  const [balls, setBalls] = useState(0);
  const [currentOverBalls, setCurrentOverBalls] = useState(0);
  const [currentOverRuns, setCurrentOverRuns] = useState([]);
  const [currentOverWicket, setCurrentOverWicket] = useState(0);
  const [totalRun, setTotalRun] = useState(0);
  const [matchWinner, setMatchWinner] = useState();
  const [wickets, setWickets] = useState(0);
  const [wicketTaken, setWicketTaken] = useState(false);
  const [firstInnings, setFirstInnings] = useState();
  const [secondInnings, setSecondInnings] = useState();
  const [overCompleted, setOverCompleted] = useState(false);
  const [innings, setInnings] = useState(1);
  const [inningsOver, setInningsOver] = useState(false);
  const [winningruns, setWinningRuns] = useState(0);
  const [winningwickets, setWinningWickets] = useState(0);
  const [nextBatsman, setNextBatsman] = useState();
  const [nextBowler, setNextBowler] = useState();
  const [caughtOut, setCaughtOut] = useState(false);
  const [runOut, setRunOut] = useState(false);
  const [runoutbatsman, setRunOutBatsman] = useState();
  const [runoutfielder, setRunOutFielder] = useState();
  const [nonstrickerout, setNonStrickerOut] = useState(false);
  const {matchID} = useParams();
  useEffect(() => {
    if (!socket) {
      console.log("Socket is not initialised yet in scoreUpdate Page");
    } else {
    }
  }, [socket]);
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


  // To send the data to the Live page 
  useEffect(() => {
    socket.emit('joinMatch', matchID);
    let Data = {
      matchId: matchID,
      teamARun: teamAScore,
      teamBRun: teamBScore,
      teamAWickets: teamAWickets,
      teamBWickets: teamBWickets,
      teamAOvers: teamAOvers,
      teamBOvers: teamBOvers,
      teamAPlayersData: teamAPlayersData,
      teamBPlayersData: teamBPlayersData,
      totalBalls: balls,
      challenge: challenge,
      currentOverRuns: currentOverRuns,
    }
    socket.emit('updateScore', Data);
  }, [balls, totalRun])

  // To send the live page that over is completed and Next over will be start
  useEffect(() => {
    const isoverCompleted = true;
    socket.emit('overcompleted', isoverCompleted);
  }, [overCompleted])

  useEffect(()=>{
    const over = balls/6;
    const remaining_balls = balls - over*6 ;
    const origOver = over + remaining_balls;

    const currentRunRate = totalRun/origOver;
    setCurrentRunRate(isNaN(currentRunRate)?0:currentRunRate.toFixed(2));
  }, [balls, totalRun])

  // To set the next stricker Batsman
  useEffect(() => {
    if (innings == 1 && firstInnings == challenge.teamA) {
      const firstPlayerNotOut = teamAPlayersData.find(player => player.playersOutBy === "" && player.playerName !== nonstrikerbatsman);
      setNextBatsman(firstPlayerNotOut);
    } else if (innings == 1 && firstInnings == challenge.teamB) {
      const firstPlayerNotOut = teamBPlayersData.find(player => player.playersOutBy === "" && player.playerName !== nonstrikerbatsman);
      setNextBatsman(firstPlayerNotOut);
    }
    else if (innings == 2 && secondInnings == challenge.teamA) {
      const firstPlayerNotOut = teamAPlayersData.find(player => player.playersOutBy === "" && player.playerName !== nonstrikerbatsman);
      setNextBatsman(firstPlayerNotOut);
    }
    else {
      const firstPlayerNotOut = teamBPlayersData.find(player => player.playersOutBy === "" && player.playerName !== nonstrikerbatsman);
      setNextBatsman(firstPlayerNotOut);
    }
  }, [wicketTaken])

  // to set next nonstrikerbatsman
  useEffect(() => {
    if (innings == 1 && firstInnings == challenge.teamA) {
      const firstPlayerNotOut = teamAPlayersData.find(player => player.playersOutBy === "" && player.playerName !== nonstrikerbatsman);
      setNextBatsman(firstPlayerNotOut);
    } else if (innings == 1 && firstInnings == challenge.teamB) {
      const firstPlayerNotOut = teamBPlayersData.find(player => player.playersOutBy === "" && player.playerName !== nonstrikerbatsman);
      setNextBatsman(firstPlayerNotOut);
    }
    else if (innings == 2 && secondInnings == challenge.teamA) {
      const firstPlayerNotOut = teamAPlayersData.find(player => player.playersOutBy === "" && player.playerName !== nonstrikerbatsman);
      setNextBatsman(firstPlayerNotOut);
    }
    else {
      const firstPlayerNotOut = teamBPlayersData.find(player => player.playersOutBy === "" && player.playerName !== nonstrikerbatsman);
      setNextBatsman(firstPlayerNotOut);
    }
  }, [nonstrickerout])

  //To set the next Bowler
  useEffect(() => {
    if (innings == 1 && firstInnings == challenge.teamA) {
      const bowler = teamBPlayersData.find(player => player.playerOver === 0) || teamBPlayersData[0];
      setNextBowler(bowler);
    } else if (innings == 1 && firstInnings == challenge.teamB) {
      const bowler = teamAPlayersData.find(player => player.playerOver === 0) || teamAPlayersData[0];
      setNextBowler(bowler);
    }
    else if (innings == 2 && secondInnings == challenge.teamA) {
      const bowler = teamBPlayersData.find(player => player.playerOver === 0) || teamBPlayersData[0];
      setNextBowler(bowler);
    }
    else {
      const bowler = teamAPlayersData.find(player => player.playerOver === 0) || teamAPlayersData[0];
      setNextBowler(bowler);
    }
  }, [overCompleted])

  // To change the strike of batsman 
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
    const currentBall = currentOverBalls + 1;
    setCurrentOverBalls(currentBall);
    setCurrentOverRuns((prevOverRuns) => [...prevOverRuns, run]);
    const newRuns = totalRun + run;
    const newBalls = balls + 1;
    let overPlayedByTeam = Math.floor(newBalls / 6);

    setTotalRun(newRuns);
    setBalls(balls + 1);

    if (newBalls % 6 === 0) {
      setCurrentOverBalls(0);
      setOverCompleted(true);
      setCurrentOverRuns([]);
      setCurrentOverWicket([]);
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
              playersFours: run === 4 ? player.playersFours + 1 : player.playersFours,
            };
          }
          return player; // Return the other players unchanged
        });
      });

      setTeamBPlayersData(prevTeamBPlayers => {
        return prevTeamBPlayers.map(player => {
          if (player.playerName === bowler) {
            console.log("This is currentBall", currentBall);

            // Assuming currentBall is defined elsewhere
            const fullOvers = Math.floor(player.playerOver);
            const updatedOver =
              currentBall >= 6 ? fullOvers + 1 : fullOvers + currentBall / 10;

            return {
              ...player,
              playerOver: updatedOver,
              playersRunConceeded: player.playersRunConceeded + run,
            };
          }
          return player; // Always return player, even if it's not the bowler
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

      setTeamAPlayersData(prevTeamAPlayers => {
        return prevTeamAPlayers.map(player => {
          if (player.playerName === bowler) {

            const fullOvers = Math.floor(player.playerOver);
            const updatedOver =
              currentBall >= 6 ? fullOvers + 1 : fullOvers + currentBall / 10;

            return {
              ...player,
              playerOver: updatedOver,
              playersRunConceeded: player.playersRunConceeded + run,
            };
          }
          return player; // Always return player, even if it's not the bowler
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
      setTeamBPlayersData(prevTeamBPlayers => {
        return prevTeamBPlayers.map(player => {
          if (player.playerName === bowler) {
            console.log("This is currentBall", currentBall);

            // Assuming currentBall is defined elsewhere
            const fullOvers = Math.floor(player.playerOver);
            const updatedOver =
              currentBall >= 6 ? fullOvers + 1 : fullOvers + currentBall / 10;

            return {
              ...player,
              playerOver: updatedOver,
              playersRunConceeded: player.playersRunConceeded + run,
            };
          }
          return player; // Always return player, even if it's not the bowler
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

      setTeamAPlayersData(prevTeamAPlayers => {
        return prevTeamAPlayers.map(player => {
          if (player.playerName === bowler) {

            const fullOvers = Math.floor(player.playerOver);
            const updatedOver =
              currentBall >= 6 ? fullOvers + 1 : fullOvers + currentBall / 10;

            return {
              ...player,
              playerOver: updatedOver,
              playersRunConceeded: player.playersRunConceeded + run,
            };
          }
          return player; // Always return player, even if it's not the bowler
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

  // To tackle with wicket 
  const handleWicket = (type) => {
    let newWickets = wickets + 1;
    let currentBall = currentOverBalls + 1;
    let currentWicket = currentOverWicket + 1;
    let newBalls = balls + 1;
    let teamAPlayers = challenge.teamAPlayers;
    let teamBPlayers = challenge.teamBPlayers;
    setCurrentOverWicket(currentWicket);
    setCurrentOverBalls(currentBall);
    if (type == 'C') {
      setCaughtOut(true);
    } else if (type === 'R') {
      setRunOut(true);
    } else if (type == 'B') {
      setWicketTaken(true);
    }
    setCurrentOverRuns((prevOverRuns) => [...prevOverRuns, "Wicket"]);
    setWickets(wickets + 1);
    setBalls(balls + 1);
    if (innings == 1 && firstInnings == challenge.teamA) {
      setTeamAWickets(newWickets);
      setTeamAOvers(newBalls);
      setTeamAPlayersData(prevTeamAPlayers => {
        console.log("Uske baad hum log set krne lage players ko!");
        return prevTeamAPlayers.map(player => {
          if (player.playerName === strikerbatsman) {
            // Return a new player object with updated score
            return {
              ...player,
              playersOutBy: bowler,
              playersBall: player.playersBall + 1,
            };
          }
          return player; // Return the other players unchanged
        });
      });

      //to set wicket of the bowler
      setTeamBPlayersData(prevTeamBPlayers => {
        return prevTeamBPlayers.map(player => {
          if (player.playerName === bowler) {

            // Assuming currentBall is defined elsewhere
            const fullOvers = Math.floor(player.playerOver);
            const updatedOver =
              currentBall >= 6 ? fullOvers + 1 : fullOvers + currentBall / 10;

            return {
              ...player,
              playerOver: updatedOver,
              playersWickettaken: player.playersWickettaken + currentWicket,
            };
          }
          return player; // Always return player, even if it's not the bowler
        });
      });
    } else if (innings == 1 && firstInnings == challenge.teamB) {
      setTeamBWickets(newWickets);
      setTeamBPlayersData(prevTeamBPlayers => {
        return prevTeamBPlayers.map(player => {
          if (player.playerName === strikerbatsman) {
            // Return a new player object with updated score
            return {
              ...player,
              playersOutBy: bowler,
              playersBall: player.playersBall + 1,
            };
          }
          return player; // Return the other players unchanged
        });
      });

      //to set the wicket of the bowler
      setTeamAPlayersData(prevTeamAPlayers => {
        return prevTeamAPlayers.map(player => {
          if (player.playerName === bowler) {

            // Assuming currentBall is defined elsewhere
            const fullOvers = Math.floor(player.playerOver);
            const updatedOver =
              currentBall >= 6 ? fullOvers + 1 : fullOvers + currentBall / 10;

            return {
              ...player,
              playerOver: updatedOver,
              playersWickettaken: player.playersWickettaken + currentWicket,
            };
          }
          return player; // Always return player, even if it's not the bowler
        });
      });
      setTeamBOvers(newBalls);
    }

    if (innings == 2 && secondInnings == challenge.teamA) {
      if (newWickets >= teamAPlayers.length - 1) {
        setWinningRuns(teamBScore - teamAScore);
        setMatchWinner(challenge.teamB);
      }
      setTeamAWickets(newWickets);
      setTeamAPlayersData(prevTeamAPlayers => {
        return prevTeamAPlayers.map(player => {
          if (player.playerName === strikerbatsman) {
            // Return a new player object with updated score
            return {
              ...player,
              playersOutBy: bowler,
              playersBall: player.playersBall + 1,
            };
          }
          return player; // Return the other players unchanged
        });
      });

      //To set the wicket of teh boeler
      setTeamBPlayersData(prevTeamBPlayers => {
        return prevTeamBPlayers.map(player => {
          if (player.playerName === bowler) {

            // Assuming currentBall is defined elsewhere
            const fullOvers = Math.floor(player.playerOver);
            const updatedOver =
              currentBall >= 6 ? fullOvers + 1 : fullOvers + currentBall / 10;

            return {
              ...player,
              playerOver: updatedOver,
              playersWickettaken: player.playersWickettaken + currentWicket,
            };
          }
          return player; // Always return player, even if it's not the bowler
        });
      });
      setTeamAOvers(newBalls);
    } else if (innings == 2 && secondInnings == challenge.teamB) {
      if (newWickets >= teamBPlayers.length - 1) {
        setWinningRuns(teamAScore - teamBScore);
        setMatchWinner(challenge.teamA);
      }
      setTeamBWickets(newWickets);
      setTeamBPlayersData(prevTeamBPlayers => {
        return prevTeamBPlayers.map(player => {
          if (player.playerName === strikerbatsman) {
            // Return a new player object with updated score
            return {
              ...player,
              playersOutBy: bowler,
              playersBall: player.playersBall + 1,
            };
          }
          return player; // Return the other players unchanged
        });
      });

      setTeamAPlayersData(prevTeamAPlayers => {
        return prevTeamAPlayers.map(player => {
          if (player.playerName === bowler) {

            const fullOvers = Math.floor(player.playerOver);
            const updatedOver =
              currentBall >= 6 ? fullOvers + 1 : fullOvers + currentBall / 10;

            return {
              ...player,
              playerOver: updatedOver,
              playersWickettaken: player.playersWickettaken + currentWicket,
            };
          }
          return player; // Always return player, even if it's not the bowler
        });
      });
      setTeamBOvers(newBalls);
    }
    // axios.post('/api/update-score', { runs, balls, wickets: wickets + 1, striker: nextBatsman, nonStriker, bowler, isWicket: true, catchTaker })
    //   .then(response => {
    //     setMatchData(response.data);
    //     setStriker(nextBatsman);
    //     setNextBatsman('');
    //   });
  };

  //For RUnOut
  const handleRunOut = () => {
    setRunOut(false);
    if (runoutbatsman == nonstrikerbatsman) {
      console.log("hii nikhil")
      setNonStrickerOut(true);
    } else if (runoutbatsman == strikerbatsman) {
      console.log("Nikhil idhr aagya hai")
      setWicketTaken(true);
    }
  }

  // ye sirf wide ke liye likha hau name change krenge baad me 
  const handleWideOrNoBall = (run) => {
    setTotalRun(totalRun + run);
    setCurrentOverRuns((prevOverRuns) => [...prevOverRuns, `${run}wide`]);
    if (innings == 1 && firstInnings == challenge.teamA) {
      setTeamAScore(teamAScore + run);
      setTeamBPlayersData(prevTeamBPlayers => {
        return prevTeamBPlayers.map(player => {
          if (player.playerName === bowler) {
            return {
              ...player,
              playersRunConceeded: player.playersRunConceeded + run,
            };
          }
          return player; // Always return player, even if it's not the bowler
        });
      });
      checkOddRuns(run - 1);
    } else if (innings == 1 && firstInnings == challenge.teamB) {
      setTeamBScore(teamBScore + run);
      setTeamAPlayersData(prevTeamAPlayers => {
        return prevTeamAPlayers.map(player => {
          if (player.playerName === bowler) {
            return {
              ...player,
              playersRunConceeded: player.playersRunConceeded + run,
            };
          }
          return player; // Always return player, even if it's not the bowler
        });
      });
      checkOddRuns(run - 1);
    }

    if (innings == 2 && secondInnings == challenge.teamA) {
      setTeamAScore(teamAScore + run);
      setTeamBPlayersData(prevTeamBPlayers => {
        return prevTeamBPlayers.map(player => {
          if (player.playerName === bowler) {
            return {
              ...player,
              playersRunConceeded: player.playersRunConceeded + run,
            };
          }
          return player; // Always return player, even if it's not the bowler
        });
      });
      checkOddRuns(run - 1);
    } else if (innings == 2 && secondInnings == challenge.teamB) {
      setTeamBScore(teamBScore + run);
      setTeamAPlayersData(prevTeamAPlayers => {
        return prevTeamAPlayers.map(player => {
          if (player.playerName === bowler) {
            return {
              ...player,
              playersRunConceeded: player.playersRunConceeded + run,
            };
          }
          return player; // Always return player, even if it's not the bowler
        });
      });
      checkOddRuns(run - 1);
    }
  };

  //Function only for noball
  const handleNoBall = (run) => {
    const newRuns = totalRun + run;
    setTotalRun(totalRun + run);
    setCurrentOverRuns((prevOverRuns) => [...prevOverRuns, `${run}noball`]);
    if (innings == 1 && firstInnings == challenge.teamA) {
      setTeamAScore(teamAScore + run);
      setTeamAPlayersData(prevTeamAPlayers => {
        return prevTeamAPlayers.map(player => {
          if (player.playerName === strikerbatsman) {
            // Return a new player object with updated score
            return {
              ...player,
              playersScore: player.playersScore + run - 1, // because noball run is not counted as individual run
              playersSix: run === 7 ? player.playersSix + 1 : player.playersSix,
              playersFours: run === 5 ? player.playersFours + 1 : player.playersFours,
            };
          }
          return player;
        });
      });
      setTeamBPlayersData(prevTeamBPlayers => {
        return prevTeamBPlayers.map(player => {
          if (player.playerName === bowler) {
            return {
              ...player,
              playersRunConceeded: player.playersRunConceeded + run,
            };
          }
          return player;
        });
      });
      checkOddRuns(run - 1);
    }
    else if (innings == 1 && firstInnings == challenge.teamB) {
      setTeamBScore(teamBScore + run);
      setTeamBPlayersData(prevTeamBPlayers => {
        return prevTeamBPlayers.map(player => {
          if (player.playerName === strikerbatsman) {
            // Return a new player object with updated score
            return {
              ...player,
              playersScore: player.playersScore + run - 1,
              playersSix: run === 7 ? player.playersSix + 1 : player.playersSix,
              playersFours: run === 5 ? player.playersFours + 1 : player.playersFours,
            };
          }
          return player;
        });
      });
      setTeamAPlayersData(prevTeamAPlayers => {
        return prevTeamAPlayers.map(player => {
          if (player.playerName === bowler) {
            return {
              ...player,
              playersRunConceeded: player.playersRunConceeded + run,
            };
          }
          return player;
        });
      });
      checkOddRuns(run - 1);
    }
    else if (innings == 2 && secondInnings == challenge.teamB) {
      setTeamBScore(teamBScore + run);
      setTeamBPlayersData(prevTeamBPlayers => {
        return prevTeamBPlayers.map(player => {
          if (player.playerName === strikerbatsman) {
            // Return a new player object with updated score
            return {
              ...player,
              playersScore: player.playersScore + run - 1,
              playersSix: run === 7 ? player.playersSix + 1 : player.playersSix,
              playersFours: run === 5 ? player.playersFours + 1 : player.playersFours,
            };
          }
          return player;
        });
      });
      setTeamAPlayersData(prevTeamAPlayers => {
        return prevTeamAPlayers.map(player => {
          if (player.playerName === bowler) {
            return {
              ...player,
              playersRunConceeded: player.playersRunConceeded + run,
            };
          }
          return player;
        });
      });
      checkOddRuns(run - 1);
      if (newRuns > teamAScore) {
        setWinningWickets(challenge.teamBPlayers.length - teamBWickets - 1);
        setMatchWinner(challenge.teamB);
        setInnings(0);
      }
    }
    else {
      setTeamAScore(teamAScore + run);
      setTeamAPlayersData(prevTeamAPlayers => {
        return prevTeamAPlayers.map(player => {
          if (player.playerName === strikerbatsman) {
            // Return a new player object with updated score
            return {
              ...player,
              playersScore: player.playersScore + run - 1,
              playersSix: run === 7 ? player.playersSix + 1 : player.playersSix,
              playersFours: run === 5 ? player.playersFours + 1 : player.playersFours,
            };
          }
          return player;
        });
      });
      setTeamBPlayersData(prevTeamBPlayers => {
        return prevTeamBPlayers.map(player => {
          if (player.playerName === bowler) {
            return {
              ...player,
              playersRunConceeded: player.playersRunConceeded + run,
            };
          }
          return player;
        });
      });
      checkOddRuns(run - 1);
      if (newRuns > teamBScore) {
        setWinningWickets(challenge.teamAPlayers.length - teamAWickets - 1);
        console.log("This is winning wickets of teamA", winningwickets);
        setMatchWinner(challenge.teamA);
        setInnings(0);
      }
    }
  }
  const oversPlayed = Math.floor(balls / 6);


  useEffect(() => {
    if (oversPlayed >= challenge.overs || wickets >= challenge.teamAPlayers.length - 1) {
      setCurrentOverRuns([]);
      setCurrentOverWicket(0);
      setCurrentOverBalls(0);
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

  //To set Everything zero
  useEffect(() => {
    setNextBatsman();
    setNextBowler();
    setWicketTaken(false);
    setCaughtOut(false); // But isko change krna padega qki agar last ball pe CaughtOut ho to kya krenge 

    setRunOut(false);
    setOverCompleted(false);
  }, [inningsOver])


  // if Match winner is decided 
  if (matchWinner) {
    return (
      <div className='container'>
        <h1>{matchWinner} Wins The Match by {winningruns > 0 ? winningruns + " Runs" : winningwickets + " Wickets"}</h1>
      </div>
    )
  }
  console.log("This is teamAplayersData and teamBplayersData", teamAPlayersData, teamBPlayersData);
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
                  <TeamA setBowler={setBowler} setStrikerBatsman={setStrikerBatsman} setNonStrikerBatsman={setNonStrikerBatsman} bowler={bowler} nonStrickerBatsman={nonstrikerbatsman} strikerbatsman={strikerbatsman} teamAPlayers={teamAPlayersData} teamBPlayers={teamBPlayersData} currentOverRuns={currentOverRuns} />
                  :
                  <TeamB setBowler={setBowler} setStrikerBatsman={setStrikerBatsman} setNonStrikerBatsman={setNonStrikerBatsman} bowler={bowler} nonStrickerBatsman={nonstrikerbatsman} strikerbatsman={strikerbatsman} teamAPlayers={teamAPlayersData} teamBPlayers={teamBPlayersData} currentOverRuns={currentOverRuns} />
              }

            </div>
            <div className='container'>
              <h2>Select Run per Over's Ball </h2>
              <h5>Select run on {(balls - (Math.floor(balls / 6) * 6)) + 1} ball  of {Math.floor(balls / 6) + 1} Over</h5>
              {
                caughtOut ?
                  <CatchSelection caughtOut={caughtOut} firstInnings={firstInnings} challenge={challenge} teamAPlayersData={teamAPlayersData} teamBPlayersData={teamBPlayersData} strikerbatsman={strikerbatsman} setTeamAPlayersData={setTeamAPlayersData} setTeamBPlayersData={setTeamBPlayersData} setWicketTaken={setWicketTaken} setCaughtOut={setCaughtOut}
                  />
                  : ""
              }
              {
                runOut ?
                  <div className={`overlay ${runOut ? '' : 'hidden'}`}>
                    <div class="card" style={{ width: "18rem", height: "15.65rem" }}>
                      <div class="card-body d-flex " style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <h4 className="card-title text-center" style={{ marginBottom: "1.5rem" }}>Who gets Run-Out ?
                        </h4>
                        <div className="dropdown">
                          <button
                            className="btn btn-dark btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            select Player
                          </button>
                          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {
                              firstInnings === challenge.teamA ?
                                teamAPlayersData.filter(player => player.playerName == nonstrikerbatsman || player.playerName == strikerbatsman).map((element, index) => (
                                  <li key={index} onClick={() => {
                                    setRunOutBatsman(element.playerName);
                                  }}>
                                    <div className="dropdown-item d-flex align-items-center py-2 px-3 my-0 friendListItem hover-effect">
                                      <img
                                        src={"https://github.com/mdo.png"}
                                        className="rounded-circle me-3"
                                        alt={"..."}
                                        style={{ width: "35px", height: "35px", objectFit: "cover" }}
                                      />
                                      <h6 className="mb-0" style={{ fontWeight: "600", color: "#050505" }}>
                                        {element.playerName}
                                      </h6>
                                    </div>
                                  </li>
                                ))
                                :
                                teamBPlayersData.map((element, index) => (
                                  <li key={index} onClick={() => {
                                    setRunOutBatsman(element.playerName);
                                  }}>
                                    <div className="dropdown-item d-flex align-items-center py-2 px-3 my-0 friendListItem hover-effect">
                                      <img
                                        src={"https://github.com/mdo.png"}
                                        className="rounded-circle me-3"
                                        alt={"..."}
                                        style={{ width: "35px", height: "35px", objectFit: "cover" }}
                                      />
                                      <h6 className="mb-0" style={{ fontWeight: "600", color: "#050505" }}>
                                        {element.playerName}
                                      </h6>
                                    </div>
                                  </li>
                                ))
                            }
                          </ul>
                        </div>
                        <h4 className="card-title text-center" style={{ marginBottom: "1.5rem" }}>
                          Who did the Run-Out ?
                        </h4>
                        <div className="dropdown">
                          <button
                            className="btn btn-dark btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            select Player
                          </button>
                          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {
                              firstInnings === challenge.teamA ?
                                teamBPlayersData.map((element, index) => (
                                  <li key={index} onClick={() => {
                                    setRunOutFielder(element.playerName);
                                    setTeamAPlayersData(prevTeamAPlayers => {
                                      return prevTeamAPlayers.map(player => {
                                        if (player.playerName === runoutbatsman) {
                                          return {
                                            ...player,
                                            playerRunOutBy: element.playerName,
                                          };
                                        }
                                        return player
                                      });
                                    });
                                    setTeamBPlayersData(prevTeamBPlayers => {
                                      return prevTeamBPlayers.map(player => {
                                        return {
                                          ...player,
                                          playersRunOutWicket: player.playersRunOutWicket + 1,
                                        };
                                      });
                                    });
                                  }}>
                                    <div className="dropdown-item d-flex align-items-center py-2 px-3 my-0 friendListItem hover-effect">
                                      <img
                                        src={"https://github.com/mdo.png"}
                                        className="rounded-circle me-3"
                                        alt={"..."}
                                        style={{ width: "35px", height: "35px", objectFit: "cover" }}
                                      />
                                      <h6 className="mb-0" style={{ fontWeight: "600", color: "#050505" }}>
                                        {element.playerName}
                                      </h6>
                                    </div>
                                  </li>
                                ))
                                :
                                teamAPlayersData.map((element, index) => (
                                  <li key={index} onClick={() => {
                                    setRunOutFielder(element.playerName);
                                    setTeamBPlayersData(prevTeamBPlayers => {
                                      return prevTeamBPlayers.map(player => {
                                        if (runoutbatsman == player.playerName) {
                                          return {
                                            ...player,
                                            playerRunOutBy: element.playerName,
                                          };
                                        }
                                        return player;
                                      });
                                    });
                                    setTeamAPlayersData(prevTeamAPlayers => {
                                      return prevTeamAPlayers.map(player => {
                                        return {
                                          ...player,
                                          playersRunOutWicket: player.playersRunOutWicket + 1,
                                        };
                                      });
                                    });
                                  }}>
                                    <div className="dropdown-item d-flex align-items-center py-2 px-3 my-0 friendListItem hover-effect">
                                      <img
                                        src={"https://github.com/mdo.png"}
                                        className="rounded-circle me-3"
                                        alt={"..."}
                                        style={{ width: "35px", height: "35px", objectFit: "cover" }}
                                      />
                                      <h6 className="mb-0" style={{ fontWeight: "600", color: "#050505" }}>
                                        {element.playerName}
                                      </h6>
                                    </div>
                                  </li>
                                ))
                            }
                          </ul>
                        </div>

                        <button className='btn-dark' onClick={handleRunOut}>
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                  : ""
              }
              {
                wicketTaken ?
                  <NextStrickerBatsman wicketTaken={wicketTaken} nextBatsman={nextBatsman} strikerBatsman={strikerbatsman} nonStrikerBatsman={nonstrikerbatsman} setStrikerBatsman={setStrikerBatsman} setWicketTaken={setWicketTaken} firstInnings={firstInnings} secondInnings={secondInnings} challenge={challenge} teamAPlayersData={teamAPlayersData} teamBPlayersData={teamBPlayersData}
                  />
                  : ""
              }
              {
                nonstrickerout ?
                  <div className={`overlay ${nonstrickerout ? '' : 'hidden'}`}>
                    <div class="card" style={{ width: "18rem", height: "15.65rem" }}>
                      <div class="card-body d-flex " style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <h4 className="card-title text-center" style={{ marginBottom: "1.5rem" }}>Select Next Batsman</h4>
                        <center><img src={"https://github.com/mdo.png"} alt="Team" width="50" height="50" style={{ boxShadow: "0px 0px 4px 2px grey" }} className="rounded-circle mx-2" /></center>
                        <h4 class="card-title text-center my-2">{nextBatsman ? nextBatsman.playerName : "No batsman Selected"}</h4>
                        <div className='d-flex my-3'>
                          <div className="dropdown">
                            <button
                              className="btn btn-dark btn-sm dropdown-toggle"
                              type="button"
                              id="dropdownMenuButton"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Choose Other
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                              {
                                firstInnings === challenge.teamA ?
                                  teamAPlayersData.filter(player => player.playersOutBy === "" && player.playerName !== strikerbatsman && player.playerName !== nonstrikerbatsman)
                                    .map((element, index) => (
                                      <li key={index} onClick={() => { setNonStrikerBatsman(element.playerName); setNonStrickerOut(false) }}>
                                        <div className="dropdown-item d-flex align-items-center py-2 px-3 my-0 friendListItem hover-effect">
                                          <img
                                            src={"https://github.com/mdo.png"}
                                            className="rounded-circle me-3"
                                            alt={"..."}
                                            style={{ width: "35px", height: "35px", objectFit: "cover" }}
                                          />
                                          <h6 className="mb-0" style={{ fontWeight: "600", color: "#050505" }}>
                                            {element.playerName}
                                          </h6>
                                        </div>
                                      </li>
                                    ))
                                  :
                                  teamBPlayersData
                                    .filter(player => player.playersOutBy === "" && player.playerName !== strikerbatsman && player.playerName !== nonstrikerbatsman)
                                    .map((element, index) => (
                                      <li key={index} onClick={() => { setNonStrikerBatsman(element.playerName); setNonStrickerOut(false) }}>
                                        <div className="dropdown-item d-flex align-items-center py-2 px-3 my-0 friendListItem hover-effect">
                                          <img
                                            src={"https://github.com/mdo.png"}
                                            className="rounded-circle me-3"
                                            alt={"..."}
                                            style={{ width: "35px", height: "35px", objectFit: "cover" }}
                                          />
                                          <h6 className="mb-0" style={{ fontWeight: "600", color: "#050505" }}>
                                            {element.playerName}
                                          </h6>
                                        </div>
                                      </li>
                                    ))
                              }
                            </ul>
                          </div>
                          <div>
                            <button className='btn btn-dark btn-sm mx-2' onClick={() => { setNonStrickerOut(false); setNonStrikerBatsman(nextBatsman.playerName) }}>Continue</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  : ""
              }
              {
                overCompleted ?
                  <div className={`overlay ${overCompleted ? '' : 'hidden'}`}>
                    <div class="card" style={{ width: "18rem", height: "15.65rem" }}>
                      <div class="card-body d-flex " style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <h4 className="card-title text-center" style={{ marginBottom: "1.5rem" }}>Select Next Bowler</h4>
                        <center><img src={"https://github.com/mdo.png"} alt="Team" width="50" height="50" style={{ boxShadow: "0px 0px 4px 2px grey" }} className="rounded-circle mx-2" /></center>
                        <h4 class="card-title text-center my-2">{nextBowler ? nextBowler.playerName : "No Bowler Selected"}</h4>
                        <div className='d-flex my-3'>
                          <div className="dropdown">
                            <button
                              className="btn btn-dark btn-sm dropdown-toggle"
                              type="button"
                              id="dropdownMenuButton"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Choose Other
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                              {
                                firstInnings === challenge.teamA ?
                                  teamBPlayersData.filter(player => player.playerName !== bowler)
                                    .map((element, index) => (
                                      <li key={index} onClick={() => { setBowler(element.playerName); setOverCompleted(false) }}>
                                        <div className="dropdown-item d-flex align-items-center py-2 px-3 my-0 friendListItem hover-effect">
                                          <img
                                            src={"https://github.com/mdo.png"}
                                            className="rounded-circle me-3"
                                            alt={"..."}
                                            style={{ width: "35px", height: "35px", objectFit: "cover" }}
                                          />
                                          <h6 className="mb-0" style={{ fontWeight: "600", color: "#050505" }}>
                                            {element.playerName}
                                          </h6>
                                        </div>
                                      </li>
                                    ))
                                  :
                                  teamAPlayersData
                                    .filter(player => player.playerName != bowler)
                                    .map((element, index) => (
                                      <li key={index} onClick={() => { setBowler(element.playerName); setOverCompleted(false) }}>
                                        <div className="dropdown-item d-flex align-items-center py-2 px-3 my-0 friendListItem hover-effect">
                                          <img
                                            src={"https://github.com/mdo.png"}
                                            className="rounded-circle me-3"
                                            alt={"..."}
                                            style={{ width: "35px", height: "35px", objectFit: "cover" }}
                                          />
                                          <h6 className="mb-0" style={{ fontWeight: "600", color: "#050505" }}>
                                            {element.playerName}
                                          </h6>
                                        </div>
                                      </li>
                                    ))
                              }
                            </ul>
                          </div>
                          <div>
                            <button className='btn btn-dark btn-sm mx-2' onClick={() => { setOverCompleted(false); setBowler(nextBowler.playerName) }}>Continue</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  :
                  <>
                    {
                      bowler && nonstrikerbatsman && strikerbatsman ? <>
                        <HandleBall handleBallInput={handleBallInput} handleWicket={handleWicket} handleWideOrNoBall={handleWideOrNoBall} handleNoBall={handleNoBall} />
                      </> : ""
                    }
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
              <h5 className='text-center'>{challenge.tossWinner} won the Toss and choose to {challenge.tossWinnerSelection}</h5>
              <h5 className='text-center'>Welcome to Second innings of the match Please select the Respective Batsman </h5>
              {
                secondInnings == challenge.teamA ?
                  <TeamA setBowler={setBowler} setStrikerBatsman={setStrikerBatsman} setNonStrikerBatsman={setNonStrikerBatsman} bowler={bowler} nonStrickerBatsman={nonstrikerbatsman} strikerbatsman={strikerbatsman} teamAPlayers={teamAPlayersData} teamBPlayers={teamBPlayersData} currentOverRuns={currentOverRuns} />
                  :
                  <TeamB setBowler={setBowler} setStrikerBatsman={setStrikerBatsman} setNonStrikerBatsman={setNonStrikerBatsman} bowler={bowler} nonStrickerBatsman={nonstrikerbatsman} strikerbatsman={strikerbatsman} teamAPlayers={teamAPlayersData} teamBPlayers={teamBPlayersData} currentOverRuns={currentOverRuns} />
              }

            </div>
            <div className='container'>
              <h2>Select Run per Over's Ball </h2>
              <h5>Select run on {(balls - (Math.floor(balls / 6) * 6)) + 1} ball  of {Math.floor(balls / 6) + 1} Over</h5>
              {
                caughtOut ?
                  <div className={`overlay ${caughtOut ? '' : 'hidden'}`}>
                    <div class="card" style={{ width: "18rem", height: "12.65rem" }}>
                      <div class="card-body d-flex " style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <h4 className="card-title text-center" style={{ marginBottom: "1.5rem" }}>Who takes this Catch?
                        </h4>
                        <div className="dropdown">
                          <button
                            className="btn btn-dark btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            select Player
                          </button>
                          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {
                              secondInnings === challenge.teamA ?
                                teamBPlayersData.map((element, index) => (
                                  <li key={index} onClick={() => {
                                    setTeamAPlayersData(prevTeamAPlayers => {
                                      return prevTeamAPlayers.map(player => {
                                        if (player.playerName === strikerbatsman) {
                                          // Return a new player object with updated score
                                          return {
                                            ...player,
                                            playerCaughtBy: element.playerName,
                                          };
                                        }
                                        return player; // Return the other players unchanged
                                      });
                                    }); setWicketTaken(true); setCaughtOut(false);
                                  }}>
                                    <div className="dropdown-item d-flex align-items-center py-2 px-3 my-0 friendListItem hover-effect">
                                      <img
                                        src={"https://github.com/mdo.png"}
                                        className="rounded-circle me-3"
                                        alt={"..."}
                                        style={{ width: "35px", height: "35px", objectFit: "cover" }}
                                      />
                                      <h6 className="mb-0" style={{ fontWeight: "600", color: "#050505" }}>
                                        {element.playerName}
                                      </h6>
                                    </div>
                                  </li>
                                ))
                                :
                                teamAPlayersData.map((element, index) => (
                                  <li key={index} onClick={() => {
                                    setTeamBPlayersData(prevTeamBPlayers => {
                                      return prevTeamBPlayers.map(player => {
                                        if (player.playerName === strikerbatsman) {
                                          return {
                                            ...player,
                                            playerCaughtBy: element.playerName,
                                          };
                                        }
                                        return player;
                                      });
                                    }); setWicketTaken(true); setCaughtOut(false);
                                  }}>
                                    <div className="dropdown-item d-flex align-items-center py-2 px-3 my-0 friendListItem hover-effect">
                                      <img
                                        src={"https://github.com/mdo.png"}
                                        className="rounded-circle me-3"
                                        alt={"..."}
                                        style={{ width: "35px", height: "35px", objectFit: "cover" }}
                                      />
                                      <h6 className="mb-0" style={{ fontWeight: "600", color: "#050505" }}>
                                        {element.playerName}
                                      </h6>
                                    </div>
                                  </li>
                                ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  : ""
              }
              {
                wicketTaken ?
                  <NextStrickerBatsman wicketTaken={wicketTaken} nextBatsman={nextBatsman} strikerBatsman={strikerbatsman} nonStrikerBatsman={nonstrikerbatsman} setStrikerBatsman={setStrikerBatsman} setWicketTaken={setWicketTaken} firstInnings={firstInnings} secondInnings={secondInnings} challenge={challenge} teamAPlayersData={teamAPlayersData} teamBPlayersData={teamBPlayersData}
                  />
                  : ""
              }
              {
                nonstrickerout ?
                  <div className={`overlay ${nonstrickerout ? '' : 'hidden'}`}>
                    <div class="card" style={{ width: "18rem", height: "15.65rem" }}>
                      <div class="card-body d-flex " style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <h4 className="card-title text-center" style={{ marginBottom: "1.5rem" }}>Select Next Batsman</h4>
                        <center><img src={"https://github.com/mdo.png"} alt="Team" width="50" height="50" style={{ boxShadow: "0px 0px 4px 2px grey" }} className="rounded-circle mx-2" /></center>
                        <h4 class="card-title text-center my-2">{nextBatsman ? nextBatsman.playerName : "No batsman Selected"}</h4>
                        <div className='d-flex my-3'>
                          <div className="dropdown">
                            <button
                              className="btn btn-dark btn-sm dropdown-toggle"
                              type="button"
                              id="dropdownMenuButton"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Choose Other
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                              {
                                secondInnings === challenge.teamA ?
                                  teamAPlayersData.filter(player => player.playersOutBy === "" && player.playerName !== strikerbatsman && player.playerName !== nonstrikerbatsman)
                                    .map((element, index) => (
                                      <li key={index} onClick={() => { setNonStrikerBatsman(element.playerName); setNonStrickerOut(false) }}>
                                        <div className="dropdown-item d-flex align-items-center py-2 px-3 my-0 friendListItem hover-effect">
                                          <img
                                            src={"https://github.com/mdo.png"}
                                            className="rounded-circle me-3"
                                            alt={"..."}
                                            style={{ width: "35px", height: "35px", objectFit: "cover" }}
                                          />
                                          <h6 className="mb-0" style={{ fontWeight: "600", color: "#050505" }}>
                                            {element.playerName}
                                          </h6>
                                        </div>
                                      </li>
                                    ))
                                  :
                                  teamBPlayersData
                                    .filter(player => player.playersOutBy === "" && player.playerName !== strikerbatsman && player.playerName !== nonstrikerbatsman)
                                    .map((element, index) => (
                                      <li key={index} onClick={() => { setNonStrikerBatsman(element.playerName); setNonStrickerOut(false) }}>
                                        <div className="dropdown-item d-flex align-items-center py-2 px-3 my-0 friendListItem hover-effect">
                                          <img
                                            src={"https://github.com/mdo.png"}
                                            className="rounded-circle me-3"
                                            alt={"..."}
                                            style={{ width: "35px", height: "35px", objectFit: "cover" }}
                                          />
                                          <h6 className="mb-0" style={{ fontWeight: "600", color: "#050505" }}>
                                            {element.playerName}
                                          </h6>
                                        </div>
                                      </li>
                                    ))
                              }
                            </ul>
                          </div>
                          <div>
                            <button className='btn btn-dark btn-sm mx-2' onClick={() => { setNonStrickerOut(false); setNonStrikerBatsman(nextBatsman.playerName) }}>Continue</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  : ""
              }
              {
                overCompleted ?
                  <div className={`overlay ${overCompleted ? '' : 'hidden'}`}>
                    <div class="card" style={{ width: "18rem", height: "15.65rem" }}>
                      <div class="card-body d-flex " style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <h4 className="card-title text-center" style={{ marginBottom: "1.5rem" }}>Select Next Bowler</h4>
                        <center><img src={"https://github.com/mdo.png"} alt="Team" width="50" height="50" style={{ boxShadow: "0px 0px 4px 2px grey" }} className="rounded-circle mx-2" /></center>
                        <h4 class="card-title text-center my-2">{nextBowler ? nextBowler.playerName : "No Bowler Selected"}</h4>
                        <div className='d-flex my-3'>
                          <div className="dropdown">
                            <button
                              className="btn btn-dark btn-sm dropdown-toggle"
                              type="button"
                              id="dropdownMenuButton"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Choose Other
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                              {
                                secondInnings === challenge.teamA ?
                                  teamBPlayersData.filter(player => player.playerName !== bowler)
                                    .map((element, index) => (
                                      <li key={index} onClick={() => { setBowler(element.playerName); setOverCompleted(false) }}>
                                        <div className="dropdown-item d-flex align-items-center py-2 px-3 my-0 friendListItem hover-effect">
                                          <img
                                            src={"https://github.com/mdo.png"}
                                            className="rounded-circle me-3"
                                            alt={"..."}
                                            style={{ width: "35px", height: "35px", objectFit: "cover" }}
                                          />
                                          <h6 className="mb-0" style={{ fontWeight: "600", color: "#050505" }}>
                                            {element.playerName}
                                          </h6>
                                        </div>
                                      </li>
                                    ))
                                  :
                                  teamAPlayersData
                                    .filter(player => player.playerName != bowler)
                                    .map((element, index) => (
                                      <li key={index} onClick={() => { setBowler(element.playerName); setOverCompleted(false) }}>
                                        <div className="dropdown-item d-flex align-items-center py-2 px-3 my-0 friendListItem hover-effect">
                                          <img
                                            src={"https://github.com/mdo.png"}
                                            className="rounded-circle me-3"
                                            alt={"..."}
                                            style={{ width: "35px", height: "35px", objectFit: "cover" }}
                                          />
                                          <h6 className="mb-0" style={{ fontWeight: "600", color: "#050505" }}>
                                            {element.playerName}
                                          </h6>
                                        </div>
                                      </li>
                                    ))
                              }
                            </ul>
                          </div>
                          <div>
                            <button className='btn btn-dark btn-sm mx-2' onClick={() => { setOverCompleted(false); setBowler(nextBowler.playerName) }}>Continue</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  :
                  <>
                    {
                      bowler && nonstrikerbatsman && strikerbatsman ? <>
                        <HandleBall handleBallInput={handleBallInput} handleWicket={handleWicket} handleWideOrNoBall={handleWideOrNoBall} handleNoBall={handleNoBall} />
                      </> : ""
                    }
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
