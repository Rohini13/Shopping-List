import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import NavBar from './components/NavBar';
import ShoppingList from './components/ShoppingList';
import {Provider} from 'react-redux'
import store from './store'
import ItemModal from './components/ItemModal';
import {Container} from 'reactstrap'
import {loadUser} from './actions/authAction'
import {React, Component} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Message from './components/auth/Message'
import history from './history'

class App extends Component {
  componentDidMount(){
    store.dispatch(loadUser())
  }
  render(){
    return (
      <Router history={history}>
        <Provider store={store}>
          <div className="App">
            <NavBar />
            <Route exact path="/" render={() => (
                <Container>
                  <ItemModal />
                  <ShoppingList />
                </Container>
            )} />
           
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
