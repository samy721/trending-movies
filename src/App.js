
import './App.css';
import Navbar from './components/navbar';
import Banner from './components/banner';
import Movies from './components/movies';
import Watchlist from './components/watchlist';
import { BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom'

function App() {
  return (
  <>
      <Router>
        <Navbar />
        <Switch>
        <Route path="/trending-movies" exact render={(props)=> (
        <>
        <Banner {...props}/>
        <Movies {...props}/> 
        </>
        )}/>
        <Route path="/watchlist" component={Watchlist} />
        </Switch>
        {/* 
      </Router>
  </>
);
}
export default App;
