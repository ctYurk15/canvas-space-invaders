import {createImage} from './functions';
import {Sprite} from './components/Sprite';
import {building_part_hp} from './game-config';

function createSprite(texture_src)
{
    const image = createImage(texture_src);
    const sprite = new Sprite(image);
    return sprite;
}

const alien_textures = [
    './textures/spaceinvader1.png',
    './textures/spaceinvader2.png',
    './textures/spaceinvader3.png',
];

//by clockwise direction
const building_parts = [
    './textures/building-part1/sprite_[i].png',
    './textures/building-part2/sprite_[i].png',
    './textures/building-part3/sprite_[i].png',
    './textures/building-part4/sprite_[i].png',
];

const ship_texture = './textures/ship.png';

export const alien_sprites = alien_textures.map(function(texture){ return createSprite(texture); });

//each bulding has 4 lives (means 4 sprites)
export const building_sprites = building_parts.map(function(texture){ 
    const result = [];

    for(let i = 0; i < building_part_hp; i++)
    {
        const path = texture.replace('[i]', i);
        result[i] = createSprite(path);
    }

    return result; 
});

export const ship_sprite = createSprite(ship_texture);