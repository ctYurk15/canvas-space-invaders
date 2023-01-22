export class Progress
{
    scores = 0;
    scores_text = null;

    constructor(scores_text)
    {
        this.scores_text = scores_text;
    }

    addScores(amount)
    {
        this.scores += amount;
        this.updateUI();
    }

    updateUI()
    {
        this.scores_text.innerHTML = this.scores;
    }
}