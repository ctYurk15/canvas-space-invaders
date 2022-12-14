import { Rectangle } from "./rectangle";

export class Arrow extends Rectangle
{
    tag = 'arrow';
    
    constructor(x, y, width, height, speed, engine, color)
    {
        super(x, y, width, height, color);
        this.speed = speed;
        this.engine = engine;
    }

    render(canvas_context)
    {
        super.render(canvas_context);
        this.position.y -= this.speed * this.engine.last_deltaTime;

        if(this.position.y < 0 || this.position.y > window.innerHeight)
        {
            this.engine.deleteObject(this.id);
        }
    }
}