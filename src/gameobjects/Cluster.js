import { aliens_matrix_gap, alien_size, aliens_count} from '../game-config';
import {GameObject} from './Gameobject';

export class Cluster extends GameObject
{
    aliens = [];
    movement_direction = 1;

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
        if(this.position.x < 0 || this.position.x + aliens_count.x * (alien_size + aliens_matrix_gap) + aliens_matrix_gap > window.innerWidth)
        {
            this.movement_direction *= -1;
        }
    }
}