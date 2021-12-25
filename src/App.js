
import './App.css';
import Scene from './physical-world/Scene';
import Pantalla1 from './views/pantalla1/pantalla1';
import Square from './customHtmlPhysicObjects/Square';
import Ground from './customHtmlPhysicObjects/Ground';
import Engine  from './customHtmlPhysicObjects/Engine';
import Body from './customHtmlPhysicObjects/Body';


function App() {
  //useEffect(()=>{setUp();}, []);

  // Create the engine for the physics
  const engine = new Engine();

  return (
    <div className="App"
    >
      <Scene>
      </Scene>
      <Pantalla1>
      </Pantalla1>
      <Square engine={engine}>
      </Square>
      <Square engine={engine} vertixTopLeff={[200,200]}>
      </Square>
      <Body engine={engine} vertixTopLeff={[100,300]}>
      </Body>
      <Ground engine={engine}>
      </Ground>
    </div>
  );
  
}

export default App;
