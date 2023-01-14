import { getRandomInt } from '../functions';
import { 
    aliens_matrix_gap, 
    alien_size, 
    aliens_count, 
    arrow_size, 
    arrow_speed,
} from '../game-config';
import { Arrow } from './Arrow';
import {GameObject} from './Gameobject';
import { Rectangle } from './rectangle';

export class Cluster extends GameObject
{
    aliens = [];
    movement_direction = 1;
    total_aliens = 0;

    constructor(x, y, engine, speed)
    {
        super(x, y);
        this.engine = engine;
        this.speed = speed;
    }

    render(canvas_context)
    {
        const self = this;

        this.aliens.forEach(function(alien){
            alien.position.x += self.position.x;
            alien.position.y += self.position.y;

            alien.render(canvas_context);

            alien.position.x -= self.position.x;
            alien.position.y -= self.position.y;
        });

        this.position.x += this.movement_direction * this.engine.last_deltaTime * this.speed;

        //out of borders
        if(this.position.x < -1 * alien_size*2 || this.position.x + aliens_count.x * (alien_size + aliens_matrix_gap) + aliens_matrix_gap > window.innerWidth)
        {
            this.movement_direction *= -1;
        }
    }

    addAlien(new_alien)
    {
        new_alien.id = 'ca-'+this.total_aliens;
        this.aliens.push(new_alien);
        this.total_aliens++;
    }

    getAlienCollider(requested_alien)
    {
        const self = this;
        let resulted = null;

        for(let alien of this.aliens)
        {
            if(alien.id == requested_alien.id)
            {
                resulted = alien;
                break;
            }
        }

        if(resulted != null)
        {
            const x = resulted.position.x + self.position.x;
            const y = resulted.position.y + self.position.y;
            
            return new Rectangle(x, y, resulted.width, resulted.height, 'black');
        }

        return null;
    }

    removeAlien(alien_to_delete)
    {
        this.aliens = this.aliens.filter(function(alien){
            return alien.id != alien_to_delete.id;
        });
        
        this.total_aliens--;
    }

    shoot()
    {
        //pick-up random alien to shoot
        let alien = this.aliens[getRandomInt(0, this.aliens.length)];
        
        const x = alien.position.x + alien_size/2 + this.position.x;
        const y = alien.position.y + alien_size/2 + this.position.y;
        const arrow = new Arrow(x, y, arrow_size.x, arrow_size.y, -1 * arrow_speed, this.engine, 'white');
        arrow.tag = 'AlienArrow';

        this.engine.addObject(arrow);
    }
}