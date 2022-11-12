import {Engine} from './components/Engine';
import {Initializer} from './components/Initializer';
import {getRandomInt, getRandomColor} from './functions';
import {Ship} from './gameobjects/Ship';
import { Building } from './gameobjects/Building';
import {buildings_count, buildings_size, buildings_y, ship_speed} from './game-config';
import { Line } from './gameobjects/Line';

let animation_id = null;

const fps_counter = document.querySelector("#fpsSpan");

const initializer = new Initializer();
const canvas = initializer.initializeCanvas();

const engine = new Engine(canvas);
const ship = new Ship(window.innerWidth/2 - 100, window.innerHeight - 200, 100, 50, ship_speed, 'green');
const line = new Line(window.innerHeight - 50, 10);

const buildings = [];
for(let i = 1; i <= buildings_count; i++)
{
    const x = (window.innerWidth / (buildings_count+1))*i - buildings_size.x;
    const building = new Building(x, buildings_y, buildings_size.x, buildings_size.y);   

    buildings.push(building);
    engine.addObject(building);
}

engine.addObject(ship);
engine.addObject(line);

engine.addButtonPressEvent('ArrowRight', function(){
    if(
        engine.last_deltaTime != 0 
        && ship.position.x + ship.speed * engine.last_deltaTime < window.innerWidth - ship.width
        )
    {
        ship.position.x += ship.speed * engine.last_deltaTime;
    }
});
engine.addButtonPressEvent('ArrowLeft', function(){
    if(
        engine.last_deltaTime != 0 
        && ship.position.x - ship.speed * engine.last_deltaTime > 0
        )
    {
        ship.position.x -= ship.speed * engine.last_deltaTime;
    }
});

engine.start();

function animate()
{
    animation_id = requestAnimationFrame(animate);
    engine.render();
    //if(engine.last_deltaTime != 0) fps_counter.innerHTML = 'FPS: '+1/engine.last_deltaTime;
   // if(engine.last_deltaTime != 0) fps_counter.innerHTML = 'FPS: '+1/engine.last_deltaTime;
}

animate();