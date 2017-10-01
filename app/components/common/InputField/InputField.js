import React from 'react';
import PropTypes from 'prop-types';

export default class InputField extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        placeholder: PropTypes.string,
        saveTeam: PropTypes.func,
        min: PropTypes.number
    };

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }

        this.handleBlur = this.handleBlur.bind(this);
    }

    handleBlur(e) {
        const value = e.target.value;
        const inputId = this.props.id;
        this.props.saveInput(inputId, value);
    }

    render() {
        const { type, name, id, placeholder, defaultValue, min } = this.props;
        return(
            <input 
                type={type}
                placeholder={placeholder}
                name={name}
                id={id}
                onBlur={this.handleBlur}
                defaultValue={defaultValue}
                min={min}
            />
        )
    }
}