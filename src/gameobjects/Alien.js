import {Rectangle} from "./rectangle";

export class Alien extends Rectangle
{
    constructor(x, y, width, height, color, cluster, hp)
    {
        super(x, y, width, height, color);

        this.hp = hp;
        this.cluster = cluster;
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