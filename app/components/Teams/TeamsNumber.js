import React from 'react';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';

import './teams.scss';

export default class TeamsNumber extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        changeTeamsNumber: PropTypes.func,
        hintText: PropTypes.string,
        defaultValue: PropTypes.number
    };


    render() {
        const {id, changeTeamsNumber, hintText, defaultValue} = this.props;

        return (
            <div className="row">
                <div className="col s8">
                    <p>Choose the number of teams participating in the tournament</p>
                </div>
                <div className="col s4">
                    <TextField
                        type="number"
                        id={id}
                        name={id}
                        min={0}
                        max={10}
                        hintText={hintText}
                        onChange={changeTeamsNumber}
                        fullWidth={true}
                        value={defaultValue}
                    />
                </div>
            </div>
        );
    }
}
