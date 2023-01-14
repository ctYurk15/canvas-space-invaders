import { Rectangle } from "./rectangle";
import { Arrow } from "./Arrow";
import { arrow_size, arrow_speed } from "../game-config";

export class Ship extends Rectangle
{
    speed = 0;
    hp = 3;

    constructor(x, y, width, height, speed, color, hp, engine)
    {
        super(x, y, width, height, color);
        this.speed = speed;
        this.engine = engine;
    }

    shoot()
    {
        const x = this.position.x + this.width/2;
        const y = this.position.y - arrow_size.y;

        const arrow = new Arrow(x, y, arrow_size.x, arrow_size.y, arrow_speed, this.engine, 'green');
        arrow.tag = "ShipArrow";
        
        this.engine.addObject(arrow);
    }

    move(direction = 1)
    {
        const next_position = this.position.x + (this.speed * direction) * this.engine.last_deltaTime

        if(this.engine.last_deltaTime != 0 
            && next_position > 0
            && next_position < window.innerWidth - this.width
        )
        {
            this.position.x += this.speed * this.engine.last_deltaTime * direction;
        }
    }

    damage(amount)
    {
        this.hp -= amount;
        if(this.hp < 0)
        {
            this.hp = 0;
            //this.engine.stop();
        }
    }
}