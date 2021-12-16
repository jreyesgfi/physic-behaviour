
import './App.css';
import Matter from 'matter-js'
import { useEffect } from 'react';
import reactDom from 'react-dom';
import { setUp } from './physical-world/Util';
import Scene from './physical-world/Scene';

function App() {
  useEffect(()=>{setUp();}, []);
  return (
    <div className="App">
      <Scene>
      </Scene>
    </div>
  );
  
}

export default App;
