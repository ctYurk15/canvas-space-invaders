export function getRandomInt(min, max) 
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export function getRandomColor()
{
    const red = Math.random() * 255;
    const green = Math.random() * 255;
    const blue = Math.random() * 255;

    return 'rgb('+red+', '+green+', '+blue+')';
}

export function getEmpty2dArray(width, height)
{
    let result = [];

    for(let y = 0; y < height; y++)
    {
        result[y] = new Array(width);
    }

    return result;
}