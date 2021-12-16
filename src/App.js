
import './App.css';
import Matter from 'matter-js'
import { useEffect } from 'react';
import reactDom from 'react-dom';

function App() {
  useEffect(()=>{
    var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

    // create an engine
    var engine = Engine.create();

    // create a renderer
    var render = Render.create({
    element: document.body,
    engine: engine
    });

    // create two boxes and a ground
    var boxA = Bodies.rectangle(400, 200, 80, 80);
    var boxB = Bodies.rectangle(450, 50, 80, 80);
    var ground = Bodies.rectangle(400, 610, 1000, 600, { isStatic: true });

    // create the mouse

    // add all of the bodies to the world
    Composite.add(engine.world, [boxA, boxB, ground]);

    // run the renderer
    Render.run(render);

    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);

  },[]);
  return (
    <div className="App">
        
    </div>
  );
  
}

export default App;
