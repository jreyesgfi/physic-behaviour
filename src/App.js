
import './App.css';
import Matter from 'matter-js'
import { useEffect } from 'react';
import reactDom from 'react-dom';
import { setUp } from './physical-world/Util';

function App() {
  useEffect(()=>{setUp();}, []);
  return (
    <div className="App">
        
    </div>
  );
  
}

export default App;
