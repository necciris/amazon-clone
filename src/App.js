import { Slide } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cart from './feature/cart/Cart';
import Header from './feature/header/Header';
import Home from './feature/home/Home';
import Login from './feature/login/Login';
import ProtectedRouted from './ProtectedRouted';
import { StateProvider } from './Shared/cotainer/StateProvider';
import CustomThemeProvider from './Shared/theme/CustomThemePrivider';

function App() {
    return (
        <StateProvider>
            <CustomThemeProvider>
                <SnackbarProvider
                    maxSnack={3}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    TransitionComponent={Slide}
                >
                    <Router>
                        <Switch>
                            <Route exact path='/login'>
                                <Login />
                            </Route>
                            <>
                                <Header />
                                <Route exact path='/'>
                                    <Home />
                                </Route>
                                <Route exact path='/cart'>
                                    <Cart />
                                </Route>
                                <Route path={ProtectedRouted.routes} component={ProtectedRouted} />
                            </>
                        </Switch>
                    </Router>
                </SnackbarProvider>
            </CustomThemeProvider>
        </StateProvider>
    );
}

export default App;
