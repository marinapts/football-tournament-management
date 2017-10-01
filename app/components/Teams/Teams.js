import React from 'react';
import { Link } from 'react-router';

import TeamsNumber from 'TeamsNumber';
import InputField from 'InputField';
import './teams.scss';


export default class Teams extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            teamsCount: 0,
            teams: {}
        };
        
        this.saveNumber = this.saveNumber.bind(this);
        this.saveTeam = this.saveTeam.bind(this);
        this.storeTeams = this.storeTeams.bind(this);
    }
    
    componentWillMount() {
        // Get teams from the localStorage, if there exist any
        try {
            const serializedTeams = localStorage.getItem('teams');

            if(serializedTeams === null) {
                return undefined;
            }

            const parsedTeams = JSON.parse(serializedTeams);
            const parsedTeamsLength = Object.keys(parsedTeams).length;

            this.setState({
                teams: parsedTeams,
                teamsCount: parsedTeamsLength > 0 ? parsedTeamsLength : 0 
            })
        } catch (err) {
            return undefined;
        }
    }
    
    // Save number of teams defined
    saveNumber(e) {
        const number = e.target.value;
        this.setState({
            teamsCount: number
        });
    }
    
    saveTeam(inputId, team) {
        const { teams } = this.state;
        teams[inputId] = team;
        
        this.setState({
            teams
        });
    }
    

    // Store teams to localStorage
    storeTeams() {
        try {
            const serializedTeams = JSON.stringify(this.state.teams);
            localStorage.setItem('teams', serializedTeams);
        } catch (err) {
            console.log('error: ', err);
        }
    }


    render() {
        const _this = this;
        const { teamsCount, teams } = this.state;

        const listInputs = [];

        for(let i=0; i<teamsCount; i++) {
            let defaultName = '';
            
            // If there are any existing teams, create input fields
            // with the team's name as the default value  
            if(teamsCount > 0) {
                const thisKey = Object.keys(teams)[i];
                defaultName = teams[thisKey];
            }

            listInputs.push(
                <InputField 
                    type="text"
                    id={`team-${i+1}`}
                    name={`team-${i+1}`}
                    placeholder={`Team ${i+1}`}
                    saveInput={_this.saveTeam}
                    defaultValue={defaultName}
                />
            );
        }

        return (
            <div>
                <div className="teamsNumber row">
                    <div className="col s12 m8 offset-m2">
                        <TeamsNumber 
                            id="teamsNumber"
                            hintText="Number of teams"
                            changeTeamsNumber={this.saveNumber}
                            defaultValue={teamsCount > 0 ? parseInt(teamsCount) : 0}
                        />
                        
                        { teamsCount > 0 &&
                            <div id="teamInputs" className="teamInputs row">
                                <p>Fill in the names of the teams</p>
                                
                                { listInputs.map((input, key) => {
                                    return(
                                        <div key={key} className="col s12 m6">
                                            {input}
                                        </div>
                                    )
                                })}
                                
                                <div className="row addFixtures">
                                    <div className="col s10 offset-s1 m8 offset-m2">
                                        <Link to="/fixtures">
                                            <button className="btn" onClick={this.storeTeams}>Generate fixtures</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>

            </div>
        );
    }
}

