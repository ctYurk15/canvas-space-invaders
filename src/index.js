import {Engine} from './components/Engine';
import {Initializer} from './components/Initializer';
import {Progress} from './components/Progress';
import {ShipHPDisplay} from './components/ShipHPDisplay';
import {Ship} from './gameobjects/Ship';
import {Building} from './gameobjects/Building';
import {
    buildings_count, 
    buildings_size, 
    buildings_y, 
    alien_first_point,
    ship_speed,
    ship_hp,
    alien_speed,
    alien_shoot_interval,
    line_segments,
    aliens_new_wave_time,
    ship_size,
    alien_hp,
    alien_scores_by_hp,
} from './game-config';
import { Line } from './gameobjects/Line';
import { Cluster } from './gameobjects/Cluster';
import {alien_sprites, building_sprites, ship_sprite} from './sprites';

let animation_id = null;

//ui-elements
const fps_counter = document.querySelector("#fpsSpan");
const scores_text = document.querySelector("#scoresSpan");
const hp_container = document.querySelector("#hpContainer");
const menu_modal = document.querySelector("#menuModal");
const start_game_btn = document.querySelector("#startGameBtn");

const initializer = new Initializer();
const ship_hp_display = new ShipHPDisplay(hp_container);
const canvas = initializer.initializeCanvas();

//game-object pool
const engine = new Engine(canvas, 'black');
const ship = new Ship(window.innerWidth/2 - 100, window.innerHeight - 200, ship_size.x, ship_size.y, ship_speed, ship_sprite, ship_hp, engine, ship_hp_display);
const line = new Line(window.innerHeight - 50, 10, line_segments);
const progress_tracker = new Progress(scores_text);

//buildings
let buildings = [];

//add aliens
const cluster = new Cluster(alien_first_point.x, alien_first_point.y, engine, alien_speed, alien_sprites);

function start()
{
    buildings = [];
    ship.hp = ship_hp;
    ship.ship_hp_display.updateHP(ship_hp);

    for(let i = 1; i <= buildings_count; i++)
    {
        const x = (window.innerWidth / (buildings_count+1))*i - buildings_size.x;
        const building = new Building(x, buildings_y, buildings_size.x, buildings_size.y, building_sprites);  
        building.id = 'building-'+i; 
    
        buildings.push(building);
        engine.addObject(building);
    }

    cluster.clear();
    line.clear();
    filling_cluster = true;

    engine.start();
    let interval = setInterval(function(){
        cluster.fill();
        line.fill();
        filling_cluster = false;
        clearInterval(interval);
    }, 1000);
}

engine.addObject(ship);
engine.addObject(line);
engine.addObject(cluster);

//button-actions
engine.addButtonPressEvent('ArrowRight', function(){
    ship.move(1);
});
engine.addButtonPressEvent('ArrowLeft', function(){
    ship.move(-1);
});
engine.addButtonPressEvent('Space', function(){
    ship.shoot(engine);
});

let interval = setInterval(function(){
    if(engine.last_deltaTime != null && engine.is_working && !engine.paused)
    {
        cluster.shoot();
    }
}, alien_shoot_interval);

let filling_cluster = false;

//collisions-check
engine.addFrameAction(function(){

    //check for aliens collision
    const ship_arrows = engine.getObjectsByTag('ShipArrow');
    const aliens = cluster.aliens;

    if(ship_arrows.length > 0 && aliens.length > 0)
    {
        ship_arrows.forEach(function(arrow){

            aliens.forEach(function(alien){
                const collider = cluster.getAlienCollider(alien);

                if(collider != null && arrow.rectangleCollided(collider))
                {
                    alien.damage(1, function(){
                        progress_tracker.addScores(alien_scores_by_hp * alien_hp)
                    });
                    engine.deleteObject(arrow.id);
                }
            });

        });
    }

    //check for ship collisions
    const alien_arrows = engine.getObjectsByTag('AlienArrow');
    alien_arrows.forEach(function(alien_arrow){

        if(alien_arrow.rectangleCollided(ship))
        {
            engine.deleteObject(alien_arrow.id);
            ship.damage(1);
        }
    });

    //check for building & line collisions
    alien_arrows.forEach(function(alien_arrow){

        for(let i = 0; i < buildings.length; i++)
        {
            const building = buildings[i];
            if(building.checkCollisions(alien_arrow))
            {
                engine.deleteObject(alien_arrow.id);
                if(building.parts.length == 0)
                {
                    buildings = buildings.filter(function(it_building){
                        return it_building.id != building.id;
                    });
                }
                break;
            }
        }

        if(line.checkCollisions(alien_arrow))
        {
            engine.deleteObject(alien_arrow.id);
        }
    });

    //all buildings& lines is destroyed, or hp is 0, game over
    if((buildings.length == 0 && line.parts.length == 0) || ship.hp <= 0)
    {
        engine.stop();

        menu_modal.classList.remove('hidden');
        progress_tracker.clear();
    }
    

    //new wave of aliens
    if(cluster.aliens.length == 0 && !filling_cluster)
    {
        filling_cluster = true;
        let timeout = setTimeout(function(){

            alien_hp++;
            
            cluster.position = alien_first_point;
            cluster.fill();
            clearTimeout(timeout);

            filling_cluster = false;

        }, aliens_new_wave_time);
    }

    /*const ctx = canvas.getContext('2d');
    alien_sprites.draw(ctx, 100, 100, 45, 45);*/
});

//ui binding
start_game_btn.addEventListener('click', function(){
    menu_modal.classList.add('hidden');
    start();
    console.log(cluster.aliens);
});

//engine.start();

function animate()
{
    animation_id = requestAnimationFrame(animate);
    engine.render();
}

animate();