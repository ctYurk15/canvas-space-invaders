export class Progress
{
    scores = 0;
    scores_text = null;
    highscore_text = null;

    constructor(scores_text, highscore_text)
    {
        this.scores_text = scores_text;
        this.highscore_text = highscore_text;
        this.updateUI();
    }

    addScores(amount)
    {
        this.scores += amount;
        this.updateUI();
    }

    clear()
    {
        this.scores = 0;
        this.updateUI();
    }

    updateUI()
    {
        this.scores_text.innerHTML = this.scores;

        let current_highscore = localStorage.getItem('canvas-space-invaders-highsore');

        if(current_highscore == null || current_highscore == undefined || (current_highscore != null && this.scores > current_highscore))
        {
            current_highscore = this.scores;
        }
        localStorage.setItem('canvas-space-invaders-highsore', current_highscore);

        this.highscore_text.innerHTML = current_highscore;
    }
}