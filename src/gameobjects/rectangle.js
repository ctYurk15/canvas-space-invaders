import {GameObject} from './Gameobject';

export class Rectangle extends GameObject
{
    constructor(x, y, width, height, color)
    {
        super(x, y);
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(canvas_context)
    {
        canvas_context.rect(this.position.x, this.position.y, this.width, this.height);
        canvas_context.fillStyle = this.color;
    }

    rectangleCollided(object)
    {
        if(this.position.x + this.width >= object.position.x 
            && this.position.x <= object.position.x + object.width
            && this.position.y + this.height >= object.position.y
            && this.position.y <= object.position.y + object.height) return true;

        return false;
    }

    pointInRectangle(point_x, point_y)
    {
        if(this.position.x <= point_x 
            && this.position.x + this.width >= point_x 
            && this.position.y <= point_y
            && this.position.y + this.height >= point_y
            ) return true;

        return false;
    }

    centerCoordinates()
    {
        let x = 0;
        let y = 0;

        x = this.position.x + this.width / 2;
        y = this.position.y + this.height / 2;

        return new Point(x, y);
    }
}