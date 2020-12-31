import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Styles.css"
import Nav from "./nav/Nav.js";
import Schedule from './pages/Schedule';
import Authors from "./pages/Authors";
import PageNotFound from "./pages/PageNotFound";
import Admin from "./pages/Admin";

function App() {
    return (
        <Router>
            <div className="App">
                <Nav/>

                <Switch>
                    <Route exact path="/">
                        <Schedule/>
                    </Route>
                    <Route exact path="/authors">
                        <Authors/>
                    </Route>
                    <Route exact path="/admin">
                        <Admin/>
                    </Route>
                    <Route path="*">
                        <PageNotFound/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;