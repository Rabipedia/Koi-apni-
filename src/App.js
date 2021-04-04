import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import Home from "./components/Home/Home";


function App() {
  return (
    <div>
      <Router>
        <Header/>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/blog">
            
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
