import {Engine} from './components/Engine';
import {Initializer} from './components/Initializer';
import {getRandomInt, getRandomColor} from './functions';
import {Ship} from './gameobjects/Ship';
import { Building } from './gameobjects/Building';
import {
    aliens_count, 
    alien_size, 
    buildings_count, 
    buildings_size, 
    buildings_y, 
    alien_first_point,
    aliens_matrix_gap,
    ship_speed
} from './game-config';
import { Line } from './gameobjects/Line';
import { Alien } from './gameobjects/Alien';

let animation_id = null;

const fps_counter = document.querySelector("#fpsSpan");

const initializer = new Initializer();
const canvas = initializer.initializeCanvas();

//game-object pool
const engine = new Engine(canvas, 'black');
const ship = new Ship(window.innerWidth/2 - 100, window.innerHeight - 200, 100, 50, ship_speed, 'lime');
const line = new Line(window.innerHeight - 50, 10, 20);

//buildings
const buildings = [];
for(let i = 1; i <= buildings_count; i++)
{
    const x = (window.innerWidth / (buildings_count+1))*i - buildings_size.x;
    const building = new Building(x, buildings_y, buildings_size.x, buildings_size.y);   

    buildings.push(building);
    engine.addObject(building);
}

//aliens
const aliens = [];
for(let i = 1; i <= aliens_count.y; i++)
{
    for(let j = 1; j <= aliens_count.x; j++)
    {
        const x = alien_first_point.x * j + alien_size + aliens_matrix_gap * j;
        const y = alien_first_point.y + alien_size * i + aliens_matrix_gap * i;
        console.log(x, y);
        const alien = new Alien(x, y, alien_size, alien_size, 'white');  

        aliens.push(alien);
        engine.addObject(alien);
    }
}

engine.addObject(ship);
engine.addObject(line);

//button-actions
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
engine.addButtonPressEvent('Space', function(){
    ship.shoot(engine);
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