import {createImage} from './functions';
import {Sprite} from './components/Sprite';

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

export const alien_sprites = alien_textures.map(function(texture){ return createSprite(texture); });