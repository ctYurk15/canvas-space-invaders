import {getRandomColor} from '../functions';
import {GameObject} from './Gameobject';
import {Rectangle} from "./rectangle";

export class Line extends GameObject
{
    parts = [];

    constructor(y, height, segments = 10)
    {
        super(0, y);
        this.height = height;
        this.segments = segments;
    }

    clear()
    {
        this.parts = [];
    }

    fill()
    {
        for(let i = 0; i < this.segments; i++)
        {
            const x = i * (window.innerWidth/this.segments);
            const line_part = new Rectangle(x, this.position.y, window.innerWidth/this.segments, this.height, 'lime');
            line_part.id = 'line-'+i;

            this.parts.push(line_part);
        }
    }

    checkCollisions(arrow)
    {
        for(let i = 0; i < this.parts.length; i++)
        {
            const checked_part = this.parts[i];

            if(arrow.rectangleCollided(checked_part))
            {
                this.parts = this.parts.filter(function(part){
                    return part.id != checked_part.id;
                });
                
                return true;
            }
        }

        return false;
    }

    draw(canvas_context)
    {
        this.parts.forEach(function(part){
            part.render(canvas_context);
        });
    }
}