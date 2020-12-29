import "./Styles.css"
import Nav from "./nav/Nav.js";
import Slots from "./slots/Slots";
import Sessions from "./sessions/Sessions";

function App() {
  return (
    <div className="App">
      <Nav />

      <br/>

      <Sessions/>
      <hr/>
      <Slots/>

    </div>
  );
}

export default App;