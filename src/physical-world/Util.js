import Matter from "matter-js";
import SquareCustom from "./SquareCustom";


  


export function setUp(){
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
    
    var ground = Bodies.rectangle(400, 910, 1000, 600, { isStatic: true });

    // create the mouse
    let mouse = Matter.Mouse.create(render.canvas); //Le asociamos un canvas al que vincularlo
    let mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse : mouse,
      constraint: {
        render:{visible:false}
      }
    })
    render.mouse = mouse;

    // add all of the bodies to the world
    Composite.add(engine.world, [boxA, boxB, ground, mouseConstraint]);
    // define the createObjects
    try{
      var boxC = new SquareCustom({
        world:engine.world
      });
    }
    catch(e){console.log(e)}
    
    // run the renderer
    Render.run(render);

    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);
}