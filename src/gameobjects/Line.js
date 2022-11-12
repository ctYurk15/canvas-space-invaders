import {getRandomColor} from '../functions';
import {GameObject} from './Gameobject';
import {Rectangle} from "./rectangle";

export class Line extends GameObject
{
    parts = [];

    constructor(y, height, segments = 10)
    {
        super(0, y);

        for(let i = 0; i < segments; i++)
        {
            const x = i * (window.innerWidth/segments);
            this.parts.push(new Rectangle(x, y, window.innerWidth/segments, height, getRandomColor()));
        }

        /*this.parts = [
            new Rectangle(x, y, width/2, height/2, 'red'),
            new Rectangle(x + width/2, y, width/2, height/2, 'green'),
            new Rectangle(x, y + height/2, width/2, height/2, 'blue'),
            new Rectangle(x + width/2, y + height/2, width/2, height/2, 'yellow'),
        ];*/
    }

    draw(canvas_context)
    {
        this.parts.forEach(function(part){
            part.render(canvas_context);
        });
    }
}