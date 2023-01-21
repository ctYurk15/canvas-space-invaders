import {Rectangle} from "./rectangle";

export class BuildingPart extends Rectangle
{
    hp = 0;
    initial_hp = 0;
    building = null;

    constructor(x, y, width, height, sprites, building, hp)
    {
        super(x, y, width, height, 'lime');
        this.hp = hp;
        this.initial_hp = hp;
        this.building = building;

        this.sprites = sprites;
    }

    draw(canvas_context)
    {
        const sprite_index = this.initial_hp - this.hp;

        this.sprites[sprite_index].draw(canvas_context, this.position.x, this.position.y, this.width, this.height);
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