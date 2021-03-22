import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cart from './feature/cart/Cart';
import Header from './feature/header/Header';
import Home from './feature/home/Home';
import Login from './feature/login/Login';
import { useStateContext } from './Shared/cotainer/StateProvider';
import { auth } from './Shared/firebase/firebase';

function App() {
    const [{ user }, dispatch] = useStateContext();

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser)
                dispatch({
                    type: 'SET_USER',
                    user: authUser,
                });
            else
                dispatch({
                    type: 'SET_USER',
                    user: null,
                });
        });
    }, []);
    return (
        <Router>
            <Switch>
                <Route exact path='/login'>
                    <Login />
                </Route>
                <Route exact path='/'>
                    <Header />
                    <Home />
                </Route>
                <Route exact path='/cart'>
                    <Header />
                    <Cart />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
