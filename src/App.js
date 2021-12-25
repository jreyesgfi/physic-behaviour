
import './App.css';
import Scene from './physical-world/Scene';
import Pantalla1 from './views/pantalla1/pantalla1';
import Square from './customHtmlPhysicObjects/Square';
import Ground from './customHtmlPhysicObjects/Ground';
import Engine  from './customHtmlPhysicObjects/Engine';
import Body from './customHtmlPhysicObjects/Body';
import Body2 from './customHtmlPhysicObjects/Body copy';


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
      <Body2 engine={engine} vertixTopLeff={[200,200]}>
      </Body2>
      <Ground engine={engine}>
      </Ground>
    </div>
  );
  
}

export default App;
