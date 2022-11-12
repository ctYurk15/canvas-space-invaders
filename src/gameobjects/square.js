import {Rectangle} from './Rectangle';

export class Square extends Rectangle
{
    selected = false;
    tag = 'square';

    constructor(x, y, width, color, sprite)
    {
        super(x, y, width, width, color);
        this.sprite = sprite;
    }

    render(canvas_context)
    {
        this.sprite.draw(canvas_context, this.position.x, this.position.y, this.width, this.width);

        if(this.selected)
        {
            canvas_context.beginPath();
            canvas_context.rect(this.position.x, this.position.y, this.width, this.width);
            canvas_context.fillStyle = 'rgba(10, 10, 10, 0.5)';
            canvas_context.fill();
        }
    }

    select()
    {
        this.selected = true;
    }

    unselect()
    {
        this.selected = false;
    }
}