import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/Navigation';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import Places from './components/Places'
import PlaceId from './components/PlaceId'
import Bookings from './components/Bookings'
import PageNotFound from './components/PageNotFound';
import HomePage from './components/HomePage';
import SearchResults from './components/SearchResults';

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
        <Route path='/places'  exact={true}>
            <Places />
        </Route>
        <Route path='/places/search/:query' exact={true}>
            <SearchResults />
        </Route>
        <Route path='/places/:placeId'  exact={true}>
            <PlaceId />
        </Route>
        <ProtectedRoute path='/bookings/:userId'  exact={true}>
            <Bookings />
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
