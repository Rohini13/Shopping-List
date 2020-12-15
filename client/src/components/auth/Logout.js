import React, { Component, Fragment } from 'react'
import {logout} from '../../actions/authAction'
import {NavLink} from 'reactstrap'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class Logout extends Component {
    render() {
        return (
            <Fragment>
                <NavLink href="/" onClick={this.props.logout}>
                    Logout
                </NavLink>
            </Fragment>
        )
    }
}

Logout.propTypes ={
    logout: PropTypes.func.isRequired
}
export default connect(null, {logout})(Logout)
