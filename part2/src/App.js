import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./Styles.css"
import Nav from "./nav/Nav.js";
import Schedule from './Schedule';

function App() {
    return (
        <Router>
            <div className="App">
                <Nav/>

                <Switch>
                    <Route path="/">
                        <Schedule/>
                    </Route>
                    <Route path="/authors">

                    </Route>
                    <Route path="/admin">

                    </Route>
                    <Route path="/about">

                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;