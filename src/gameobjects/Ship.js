import { Rectangle } from "./rectangle";
import { Arrow } from "./Arrow";
import { arrow_size, arrow_speed } from "../game-config";

export class Ship extends Rectangle
{
    speed = 0;

    constructor(x, y, width, height, speed, color)
    {
        super(x, y, width, height, color);
        this.speed = speed;
    }

    shoot(engine)
    {
        const x = this.position.x + this.width/2;
        const y = this.position.y - arrow_size.y;

        const arrow = new Arrow(x, y, arrow_size.x, arrow_size.y, arrow_speed, engine, 'red');
        engine.addObject(arrow);
    }
}