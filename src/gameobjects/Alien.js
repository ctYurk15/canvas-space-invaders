import {Rectangle} from "./rectangle";

export class Alien extends Rectangle
{
    constructor(x, y, width, height, sprite, cluster, hp)
    {
        super(x, y, width, height, 'white');

        this.hp = hp;
        this.cluster = cluster;
        this.sprite = sprite;
    }

    draw(canvas_context)
    {
        this.sprite.draw(canvas_context, this.position.x, this.position.y, this.width, this.height);
    }

    damage(amount)
    {
        this.hp -= amount;
        if(this.hp <= 0)
        {
            this.cluster.removeAlien(this);
        }
    }
}