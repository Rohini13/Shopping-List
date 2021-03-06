import React, { Component } from 'react'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import {v4 as uuid} from "uuid"; 
import { connect } from 'react-redux'
import {getItems, deleteItem, addItem} from '../actions/itemActions'
import PropTypes from 'prop-types'

class ShoppingList extends Component {
    componentDidMount(){
        this.props.getItems()
    }
    onClickDel = (id) =>{
        this.props.deleteItem(id)
    }
    render() {
        const {items} =this.props.item
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                       {items.map(({_id, name})=>(
                           <CSSTransition key={_id} timeout={500} classNames="fade">
                               <ListGroupItem>
                                   {this.props.auth.isAuthenticated?<Button
                                   className="remove-btn"
                                   color="danger"
                                   size="sm"
                                   onClick={this.onClickDel.bind(this, _id)}>
                                    X
                                   </Button>:null}
                                   {name}
                               </ListGroupItem>
                           </CSSTransition>
                       ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    addItem: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
    , auth: PropTypes.object
}

const mapStateToProps = (state) =>({
    item: state.item,
    auth: state.auth
})

export default connect(mapStateToProps, { getItems, deleteItem, addItem })(ShoppingList)
