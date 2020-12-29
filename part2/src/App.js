import "./Styles.css"
import Nav from "./nav/Nav.js";
import Session from "./Session";
import Slots from "./slots/Slots";
import Slot from "./slots/Slot";

function App() {
  return (
    <div className="App">
      <Nav />

      <Session sessionId={"2375"}/>
      <hr/>
      <Slots/>

    </div>
  );
}

export default App;