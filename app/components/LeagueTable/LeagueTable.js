import React from 'react';


function reduceSum(games) {
    
    let reducedObj = games[0];
    
    for(let game of games.slice(1)) {

        for(let resultKey of Object.keys(game)) {
            const resultValue = game[resultKey];
            reducedObj[resultKey] += resultValue;
        }
    }
    return reducedObj;
}

function compareResults(a, b) {
    if (a.points < b.points) {
        return 1;
    }
    if (a.points > b.points) {
        return -1;
    }

    if(a.diff < b.diff) {
        return 1;
    }
    if (a.diff > b.diff) {
        return -1;
    }

    if(a.team < b.team) {
        return -1;
    }

    if(a.team > b.team) {
        return 1;
    }
    
    return 0;
}


export default class LeagueTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sums: []
        }
    }

    componentWillMount() {
        try {

            // Get fixtures from the localStorage
            const serializedFixtures = localStorage.getItem('fixtures');

            if(serializedFixtures === null) {
                return undefined;
            }

            const parsedFixtures = JSON.parse(serializedFixtures);
            const keys = Object.keys(parsedFixtures);
            const resultsGathering = [];
            
            
            /*---------------------------------------------------
                Gather all results into resultsathering for 
                every game that each team has played
            -----------------------------------------------------*/
            for(let i=0; i<keys.length; i++) {

                const fixtureKey = keys[i];
                const fixture = parsedFixtures[fixtureKey];

                for(let j=0; j<Object.keys(fixture).length; j++) {
                    const teamName = Object.keys(fixture)[j];
                    const results = fixture[teamName];

                    const teamResults = {};
                    teamResults[teamName] = results;
                    resultsGathering.push(teamResults);
                }
            }
            
            /*---------------------------------------------------
                Create grouped team fixtures, where each team
                has an array of all the fixtures that has played
            -----------------------------------------------------*/
            let groupedResults = {};
            
            for(let row of resultsGathering) {
                const teamName = Object.keys(row)[0];
                const results = row[teamName];
                
                if(teamName in groupedResults) {
                    groupedResults[teamName].push(results);
                }
                else {
                    groupedResults[teamName] = [results];
                }
            }
           
            
            const sums = [];

            for(let team of Object.keys(groupedResults)) {
                const teamResults = groupedResults[team];
                let sumResults = reduceSum(teamResults);
                sumResults.team = team;
                sumResults.points = sumResults.wins*3 + sumResults.draws;
                sumResults.diff = sumResults.goalsFor - sumResults.goalsAgainst;

                sums.push(sumResults);
            }

            // Sort sums by Points, Goal difference and then alphabetically
            sums.sort(compareResults);

            // Store sums to the state
            this.setState({
                sums
            });

        } catch (err) {
            return undefined;
        }
    }


    render() {
        const { sums } = this.state;
        return(
            <div>
                <table>
                    <thead>
                      <tr>
                          <th>Team</th>
                          <th>Wins</th>
                          <th>Draws</th>
                          <th>Losses</th>
                          <th>GF</th>
                          <th>GA</th>
                          <th>Diff</th>
                          <th>Points</th>
                      </tr>
                    </thead>

                    <tbody>
                        {
                            sums.map((sumResult, key) => {
                                const diff = sumResult.goalsFor - sumResult.goalsAgainst;
                                const points = (sumResult.wins *3) + (sumResult.draws *1) + (sumResult.losses *0);
                                return(
                                    <tr key={key}>
                                        <td>{sumResult.team}</td>
                                        <td>{sumResult.wins}</td>
                                        <td>{sumResult.draws}</td>
                                        <td>{sumResult.losses}</td>
                                        <td>{sumResult.goalsFor}</td>
                                        <td>{sumResult.goalsAgainst}</td>
                                        <td>{diff}</td>
                                        <td>{points}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                  </table>
            </div>
        )
    }
}

