import {GameObject} from './Gameobject';

export class Circle extends GameObject
{
    constructor(x, y, radius, color)
    {
        super(x, y);
        this.radius = radius;
        this.color = color;
    }

    draw(canvas_context)
    {
        canvas_context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        canvas_context.fillStyle = this.color;
    }
}