import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/Navigation';
import ProtectedRoute from './components/auth/ProtectedRoute';
import User from './components/User';
import { authenticate } from './store/session';
import Places from './components/Places'
import PlaceId from './components/PlaceId'
import Bookings from './components/Bookings'
import PageNotFound from './components/PageNotFound';
import HomePage from './components/HomePage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <ProtectedRoute path='/places'  exact={true}>
            <Places />
        </ProtectedRoute>
        <ProtectedRoute path='/places/:placeId'  exact={true}>
            <PlaceId />
        </ProtectedRoute>
        <ProtectedRoute path='/bookings/:userId'  exact={true}>
            <Bookings />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <HomePage />
        </Route>
        <Route>
            <PageNotFound />
          </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
