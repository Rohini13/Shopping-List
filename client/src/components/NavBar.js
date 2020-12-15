import React, { Component } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container,
} from 'reactstrap';
import Logout from './auth/Logout';
import RegisterModal from './auth/RegisterModal'
import LoginModal from './auth/LoginModal';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';


class NavBar extends Component {
    state = { isOpen: false }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">Shopping List</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {!this.props.isAuthenticated ? <NavItem>
                                    <RegisterModal />
                                </NavItem>
                                 : null}
                                {!this.props.isAuthenticated ? <NavItem>
                                    <LoginModal />
                                </NavItem>
                                    : null}
                                {this.props.isAuthenticated ? <NavItem>
                                    <span className='navbar-text mr-3'>
                                        <strong>
                                            Welcome {this.props.user.name}
                                        </strong>
                                    </span>
                                        
                                </NavItem> : null}
                                {this.props.isAuthenticated ? <NavItem>
                                    <Logout />
                                </NavItem>:null}
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }

}

NavBar.propTypes={
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object
}
const mapStateToProps = (state)=>({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})
export default connect(mapStateToProps, { })(NavBar)
