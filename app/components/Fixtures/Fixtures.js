import React from 'react';
import { Link } from 'react-router';

import InputField from 'InputField';
import './fixtures.scss';


export default class Fixtures extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamCombinations: null,
            errorMsg: '',
            fixtures: {}
        }

        this.combinations = this.combinations.bind(this);
        this.saveFixture = this.saveFixture.bind(this);
        this.storeFixtures = this.storeFixtures.bind(this);
    }

    componentWillMount() {
        try {
            // Get teams and fixtures from the localStorage
            const serializedTeams = localStorage.getItem('teams');
            const serializedFixtures = localStorage.getItem('fixtures');
            

            /*-------------------------------------------------------------------------
                Avoid displaying an empty page if the user hasn't created any teams
                The user can have access to this page typing the url for example
            --------------------------------------------------------------------------*/
            if(serializedTeams === null) {
                this.setState({
                    errorMsg: 'Oops.. You haven\'t created any teams yet!'
                });
            }

            const teams = JSON.parse(serializedTeams);
            const fixtures = JSON.parse(serializedFixtures);
            const teamNames = [];

            Object.keys(teams).forEach((key) => {
                teamNames.push(teams[key]);
            });

            /*------------------------------------------------------
                Create combinations from the given teams. Each team
                plays every other team once.
            --------------------------------------------------------*/
            const teamCombinations = []; 
            this.combinations(teamNames, teamCombinations);

            this.setState({
                teamCombinations,
                fixtures: fixtures || {}
            });
            
        } catch (err) {
            return undefined;
        }

    }
    
    // Create combinations of the teams so that each team
    // has played with the rest of the teams once.
    combinations(teams, combs) {
        const teamsLength = teams.length;
        
        if(teamsLength === 1) {
            combs = undefined;
        }
        else if(teamsLength === 2) {
            combs.push(teams);
        }
        else {
                
            /*------------------------------------------------------------------
                current is a list that includes only the current element.
                restTeams is an array containing the remaining teams to the right
                We use recursion to compute the rest of the combinations
            ---------------------------------------------------------------------*/
            const current = teams.slice(0, 1);
            const restTeams = teams.slice(1, teamsLength);

            for(let j=0; j<restTeams.length; j++) {
                combs.push(current.concat(restTeams[j]));
            }
            
            this.combinations(restTeams, combs);
        }
    }

    saveFixture(gameId, game) {
        const { fixtures } = this.state;
        fixtures[gameId] = game;

        this.setState({
            fixtures
        });
    }

    // Store fixtures to localStorage
    storeFixtures() {
        
        try {
            const serializedFixtures = JSON.stringify(this.state.fixtures);
            localStorage.setItem('fixtures', serializedFixtures);
        } catch (err) {
            console.log('error: ', err);
        }
    }

    render() {
        const { teamCombinations, errorMsg, fixtures } = this.state;
        
        return(
            <div className="row">
                { !teamCombinations &&
                    <div className="col s12 m10 offset-m1 errorMsg">
                        <h5 className="center">{errorMsg}</h5>
                    </div>
                }
                
                { teamCombinations && 
                    <div className="col s12 m10 offset-m1">
                        <p className="center">Fill in the results of the fixtures below</p>

                        <div>
                            { fixtures && 
                                <div className="row">
                                    <div className="col s12">
                                    {
                                        teamCombinations.map((comb, key) => {
                                            const defaultFixture = fixtures[`fixture-${key+1}`];
                                            
                                            return(
                                                <Fixture
                                                    key={key}
                                                    gameId={key+1}
                                                    teams={comb}
                                                    saveFixture={this.saveFixture} 
                                                    defaultFixture={defaultFixture !== undefined ? defaultFixture : ''}
                                                />
                                            );
                                        })
                                    }
                                    </div>
                                </div> 
                            }
                            
                            <div className="row">
                                <div className="col s10 offset-s1 m6 offset-m3">
                                    <Link to="/fixtures/league-table">
                                        <button className="btn" onClick={this.storeFixtures}>View league table</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}



export class Fixture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: {}
        };

        this.saveScore = this.saveScore.bind(this);
    }

    saveScore(teamName, score) {
        const { game } = this.state;
        let { gameId } = this.props;

        score = parseInt(score);
        game[teamName] = {goalsFor: score};
        
        // Compute results only if both teams have scores
        if(Object.keys(game).length === 2) {
            const leftTeam = Object.keys(game)[0];
            const leftTeamScore = game[Object.keys(game)[0]].goalsFor;

            const rightTeam = Object.keys(game)[1];
            const rightTeamScore = game[Object.keys(game)[1]].goalsFor;
            
            if(leftTeamScore === rightTeamScore) {
                // Assign results to the two teams
                game[leftTeam].draws = game[rightTeam].draws = 1;
                game[leftTeam].wins = game[rightTeam].wins = 0;
                game[leftTeam].losses = game[rightTeam].losses = 0;
                game[leftTeam].goalsAgainst = game[rightTeam].goalsAgainst = leftTeamScore;

            }
            else if(leftTeamScore > rightTeamScore) {
                
                // Assign results to the winner --> leftTeam
                game[Object.keys(game)[0]].draws = game[Object.keys(game)[1]].draws = 0;
                
                game[Object.keys(game)[0]].wins = 1;
                game[Object.keys(game)[0]].losses = 0;
                game[Object.keys(game)[0]].goalsAgainst = rightTeamScore;

                game[Object.keys(game)[1]].wins = 0;
                game[Object.keys(game)[1]].losses = 1;
                game[Object.keys(game)[1]].goalsAgainst = leftTeamScore;

            }
            else {
                
                // Assign results to the winner --> rightTeam
                game[Object.keys(game)[0]].draws = game[Object.keys(game)[1]].draws = 0;
                
                game[Object.keys(game)[0]].wins = 0;
                game[Object.keys(game)[0]].losses = 1;
                game[Object.keys(game)[0]].goalsAgainst = rightTeamScore;

                game[Object.keys(game)[1]].wins = 1;
                game[Object.keys(game)[1]].losses = 0;
                game[Object.keys(game)[1]].goalsAgainst = leftTeamScore;

            }
            
            gameId = `fixture-${gameId}`;
            this.props.saveFixture(gameId, game);
        }
    }


    render() {
        const _this = this;
        const { teams, defaultFixture } = this.props;

        return(
            <div className="row fixtures">
                <div className="col s4 firstTeam">
                    <p>{teams[0]}</p>
                </div>
                <div className="col s4">
                    <div className="row">
                        <div className="col s5">
                            <InputField 
                                type="number"
                                name="first"
                                min={0}
                                id={teams[0]}
                                saveInput={_this.saveScore}
                                defaultValue={defaultFixture[teams[0]] !== undefined ? defaultFixture[teams[0]].goalsFor : null}
                            />
                        </div>
                        <div className="col s2">
                            <p>-</p>
                        </div>
                        <div className="col s5">
                            <InputField 
                                type="number"
                                name="second"
                                min={0}
                                id={teams[1]}
                                saveInput={_this.saveScore}
                                defaultValue={defaultFixture[teams[1]] !== undefined ? defaultFixture[teams[1]].goalsFor : null}
                            />
                        </div>
                    </div>
                </div>
                <div className="col s4 secondTeam">
                    <p>{teams[1]}</p>
                </div>
            </div>
        )
    }
}