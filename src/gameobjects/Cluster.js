import { getRandomInt } from '../functions';
import { 
    aliens_matrix_gap, 
    alien_size, 
    aliens_count, 
    arrow_size, 
    arrow_speed,
    alien_hp,
} from '../game-config';
import { Arrow } from './Arrow';
import { Alien } from './Alien';
import {GameObject} from './Gameobject';
import { Rectangle } from './rectangle';

export class Cluster extends GameObject
{
    aliens = [];
    movement_direction = 1;
    total_aliens = 0;

    constructor(x, y, engine, speed, alien_sprites)
    {
        super(x, y);
        this.engine = engine;
        this.speed = speed;
        this.alien_sprites = alien_sprites;
    }

    clear()
    {
        this.aliens = [];
    }

    fill()
    {
        const self = this;

        for(let i = 1; i <= aliens_count.y; i++)
        {
            for(let j = 1; j <= aliens_count.x; j++)
            {
                const x = alien_size*(j-1) + alien_size + aliens_matrix_gap * j;
                const y = i + alien_size * i + aliens_matrix_gap * i;
                const sprite = this.alien_sprites[getRandomInt(0, this.alien_sprites.length)];
                const alien = new Alien(x, y, alien_size, alien_size, sprite, self, alien_hp);  

                self.addAlien(alien);
            }
        }
    }

    render(canvas_context)
    {
        const self = this;

        if(this.engine.last_deltaTime != 0 && this.engine.last_deltaTime != Infinity)
        {
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

        //console.log(this.aliens);
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
        if(this.aliens.length != 0)
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
}