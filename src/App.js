
import './App.css';
import Matter from 'matter-js'
import { useEffect } from 'react';
import reactDom from 'react-dom';
import { setUp } from './physical-world/Util';
import Scene from './physical-world/Scene';
import Pantalla1 from './views/pantalla1/pantalla1';
import Square from './customHtmlPhysicObjects/Square';
import Ground from './customHtmlPhysicObjects/Ground';
import Engine  from './customHtmlPhysicObjects/Engine';


function App() {
  //useEffect(()=>{setUp();}, []);

  // Create the engine for the physics
  const engine = new Engine();

  return (
    <div className="App">
      <Scene>
      </Scene>
      <Pantalla1>
      </Pantalla1>
      <Square engine={engine}>
      </Square>
      <Ground engine={engine}>
      </Ground>
    </div>
  );
  
}

export default App;
