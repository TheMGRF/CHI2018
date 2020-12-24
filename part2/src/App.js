import './Styles.css'
import {Nav} from './nav/Nav.js';
import {Session} from "./Session";
import {Slot} from "./Slot";

function App() {
  return (
    <div className="App">
      <Nav />

      <Session />
      -----
      <Slot />
    </div>
  );
}

export default App;