import {GameObject} from './Gameobject';
import {Rectangle} from "./rectangle";

export class Building extends GameObject
{
    parts = [];

    constructor(x, y, width, height)
    {
        super(x, y);

        this.parts = [
            new Rectangle(x, y, width/2, height/2, 'red'),
            new Rectangle(x + width/2, y, width/2, height/2, 'green'),
            new Rectangle(x, y + height/2, width/2, height/2, 'blue'),
            new Rectangle(x + width/2, y + height/2, width/2, height/2, 'yellow'),
        ];
    }

    draw(canvas_context)
    {
        this.parts.forEach(function(part){
            part.render(canvas_context);
        });
    }
}