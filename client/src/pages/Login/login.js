import React from 'react';
import  { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import classnames from 'classnames';
import './login.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard"); //push to dashboard when login
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();


    const userData = {
        email: this.state.email,
        passwored: this.state.password
    };

    this.props.loginUser(userData); 
    };

    render() {
        const { errors } = this.state;

        return(
            <form noValidate onSubmit={this.onSubmit}>
                <label htmlFor="email">Email:</label>
                <span className="red-text">{errors.email}{errors.emailnotfound}</span>
                <input 
                    onChange={this.onChange}
                    value={this.state.email}
                    errors={errors.email}
                    id="email"
                    value="email"
                    className={classnames("", {
                        invalid: errors.email || errors.emailnotfound})}/>
                
                <label htmlFor="password">Password:</label>
                <span className="red-text">{errors.password}{errors.passwordincorrect}</span>
                <input
                    onChange={this.onChange}
                    value={this.state.password}
                    id="password"
                    value="password"/>
                <button type="submit">Login</button>
            </form>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateTopProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateTopProps,
    { loginUser }
(Login));