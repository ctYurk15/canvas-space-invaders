export class Initializer
{
    //size in procents of window
    constructor(canvas_width = 100, canvas_height = 100)
    {
        this.canvas_width = canvas_width;
        this.canvas_height = canvas_height;
    }

    initializeCanvas()
    {
        const canvas = document.createElement('canvas');

        canvas.width = this.canvas_width/100 * window.innerWidth;
        canvas.height = this.canvas_height/100 * window.innerHeight;

        document.body.appendChild(canvas);

        return canvas;
    }
}