import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/Navigation';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import { getPlaces } from './store/places';
import Places from './components/Places'
import PlaceId from './components/PlaceId'
import Bookings from './components/Bookings'
import PageNotFound from './components/PageNotFound';
import HomePage from './components/HomePage';
import SearchResults from './components/SearchResults';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop'

function App() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [placesLoaded, setPlacesLoaded] = useState(false)

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(getPlaces()).then(()=> setPlacesLoaded(true))
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <NavBar />
      <Switch>
        <Route path='/places'  exact={true}>
            <Places  />
        </Route>
        <Route path='/places/:placeId'  exact={true}>
            <PlaceId placesLoaded={placesLoaded}/>
        </Route>
        <Route path='/search' exact={true}>
            <SearchResults />
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
      <Footer />
    </BrowserRouter>
  );
}

export default App;
