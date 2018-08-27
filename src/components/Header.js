import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout, dispatchGuestLogout } from '../actions/auth';

export class Header extends React.Component {
    constructor (props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout () {
        if (this.props.guest) {
            this.props.dispatchGuestLogout();
        }
        else {
            this.props.startLogout();
        }
    }
    
    render () {
        return (
            <header className="header">
                <div className="content-container">
                    <div className="header__content">
                        <Link className="header__title" to="/dashboard">
                            <h1>Boilerplate</h1>
                        </Link>
                        <button className="button button--link" onClick={this.logout}>Logout</button>
                    </div>
                </div>
            </header>
        );
    }
};

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout()),
    dispatchGuestLogout: () => dispatch(dispatchGuestLogout())
});

const mapStateToProps = (state) => ({
    guest: state.auth.guest
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
