import {Rectangle} from "./rectangle";

export class BuildingPart extends Rectangle
{
    hp = 0;
    building = null;

    constructor(x, y, width, height, color, building, hp)
    {
        super(x, y, width, height, color);
        this.hp = hp;
        this.building = building;
    }

    damage(amount)
    {
        this.hp -= amount;
        if(this.hp <= 0)
        {
            //console.log('dead');
            this.building.removePart(this);
        }
    }
}