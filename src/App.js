
import './App.css';
import Matter from 'matter-js'
import { useEffect } from 'react';
import reactDom from 'react-dom';
import { setUp } from './physical-world/Util';
import Scene from './physical-world/Scene';
import Pantalla1 from './views/pantalla1/pantalla1';
import Square from './customHtmlPhysicObjects/Square';
import Ground from './customHtmlPhysicObjects/Ground';


function App() {
  //useEffect(()=>{setUp();}, []);
  return (
    <div className="App">
      <Scene>
      </Scene>
      <Pantalla1>
      </Pantalla1>
      <Square>
      </Square>
      <Ground>
      </Ground>
    </div>
  );
  
}

export default App;
