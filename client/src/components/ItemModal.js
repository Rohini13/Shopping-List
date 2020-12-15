import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addItem} from '../actions/itemActions'

export class ItemModal extends Component {
    state = {
        modal: false,
        name: ''
    }

    toggle = ()=>{
        this.setState({
            modal:!this.state.modal
        })
    }
    onChange = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) =>{
        e.preventDefault()
        const newItem ={
            name: this.state.name
        }
        this.props.addItem(newItem)
        this.toggle()
    }
    render() {
        return (
            <div>
                {this.props.auth.isAuthenticated ?<Button 
                color="dark"
                style={{marginBottom:'2rem'}}
                onClick={this.toggle}>
                Add Item</Button>:<div className="container">
                        <h3>Login to Change the List
                        </h3></div>}
                <Modal  isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <Label for="item">Item</Label>
                            <Input type="text"
                            name="name"
                            id="item"
                            placeholder="add an item..."
                            onChange={this.onChange}/>
                            <Button color="dark"
                            style={{marginTop: '2rem'}} block>
                                Add Item
                            </Button>
                            
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

ItemModal.propTypes={
    addItem: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    auth: PropTypes.object
}

const mapStateToProps = (state) =>({
    item: state.item,
    auth: state.auth
})

export default connect(mapStateToProps, {addItem})(ItemModal)
