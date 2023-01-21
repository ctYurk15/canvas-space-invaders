import {GameObject} from './Gameobject';
import {BuildingPart} from "./BuildingPart";
import {building_part_hp} from '../game-config';

export class Building extends GameObject
{
    parts = [];
    building_sprites = [];

    constructor(x, y, width, height, building_sprites)
    {
        super(x, y);

        const self = this;
        this.building_sprites = building_sprites;

        this.parts = [
            new BuildingPart(x, y, width/2, height/2, building_sprites[0], self, building_part_hp),
            new BuildingPart(x + width/2, y, width/2, height/2, building_sprites[1], self, building_part_hp),
            new BuildingPart(x, y + height/2, width/2, height/2, building_sprites[2], self, building_part_hp),
            new BuildingPart(x + width/2, y + height/2, width/2, height/2, building_sprites[3], self, building_part_hp),
        ];

        //add unique ids
        for(let i = 0; i < this.parts.length; i++)
        {
            this.parts[i].id = 'part-'+i;
        }
    }

    draw(canvas_context)
    {
        this.parts.forEach(function(part){
            part.render(canvas_context);
        });
    }

    checkCollisions(arrow)
    {
        for(let i = 0; i < this.parts.length; i++)
        {
            const part = this.parts[i];
            if(arrow.rectangleCollided(part))
            {
                part.damage(1);
                return true;
            }
        }

        return false;
    }

    removePart(part_to_delete)
    {
        this.parts = this.parts.filter(function(part){
            return part.id != part_to_delete.id;
        });
    }
}