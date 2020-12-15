import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import NavBar from './components/NavBar';
import ShoppingList from './components/ShoppingList';
import { Provider } from 'react-redux'
import store from './store'
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap'
import { loadUser } from './actions/authAction'
import { React, Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import history from './history'


class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser())
  }

  render() {
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
            <Route exact path="/:user" render={(props) => { 
              // console.log(store.getState().auth)
              // console.log(props.match.params.user)
              if(store.getState().auth.user.email === props.match.params.user)
              return(
              <Container>
                <ItemModal />
                <ShoppingList />
              </Container>
            )}} />
          </div>
        </Provider>
      </Router>
    );
  }
}

// App.propTypes = {
//   user: PropTypes.object
// }

// const mapStateToProps = (state) => ({
//   user: state.auth.user
// })
// export default connect(mapStateToProps, {})(App)
export default App