export class ShipHPDisplay
{
    hp_container = null;

    constructor(hp_container)
    {
        this.hp_container = hp_container;
    }

    updateHP(ship_hp)
    {
        const hp_images = this.hp_container.querySelectorAll('img');
        
        for(let i = 0; i < hp_images.length; i++)
        {
            if(ship_hp > 0)
            {
                ship_hp--;
            }
            else
            {
                hp_images[i].style.visibility = 'hidden';
            }
        }
    }
}