import { Rectangle } from "./rectangle";

export class Ship extends Rectangle
{
    speed = 0;
    
    constructor(x, y, width, height, speed, color)
    {
        super(x, y, width, height, color);
        this.speed = speed;
    }
}