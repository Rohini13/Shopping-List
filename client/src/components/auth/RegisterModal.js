import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authAction'
import { clearErrors } from '../../actions/errorAction'

export class RegisterModal extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props
        if (error !== prevProps.error) {
            if (error.id === 'REGISTER_FAIL')
                this.setState({ msg: error.msg })
            else this.setState({msg:null})
        }

        if(this.state.modal)
        {
            if(this.props.isAuthenticated)
            this.toggle()
        }
    }
    toggle = () => {
        this.props.clearErrors()
        this.setState({
            modal: !this.state.modal
        })
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault()
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        this.props.registerUser(newUser)
        //this.toggle()
    }
    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Register
                </NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    onChange={this.onChange}
                                    className="mb-3" />

                                <Label for="email">Email</Label>
                                <Input type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    onChange={this.onChange}
                                    className="mb-3" />

                                <Label for="password">Password</Label>
                                <Input type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    onChange={this.onChange}
                                    className="mb-3" />


                                <Button color="dark"
                                    style={{ marginTop: '2rem' }} block>
                                    Register
                            </Button>

                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

RegisterModal.propTypes = {
    registerUser: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({

    isAuthenticated: state.auth.isAuthenticated
    , error: state.error
})

export default connect(mapStateToProps, { registerUser, clearErrors })(RegisterModal)