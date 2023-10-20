class Paint{
    constructor(worker, click, speed) {
      this.name = ''
      this.amount = 0
      this.timer = 0
      this.automation = false
      // properties that differ per paint (but are not upgradables)
      this.baseTime = 5000 // in miliseconds
      this.workerStrength = 1   
      // upgradables
      this.worker = worker
      this.click = click
      this.speed = speed
    }

    get amountPerBar() {
        // If there is no worker the bar is filled manually (and the player is 1 worker)
        var amountPerBar = Math.max(this.worker.value, 1) * this.workerStrength
        return amountPerBar
    }

    clickPaint() {
        if (this.automation == false) {
            this.automation = true
        }
        else {
            var increaseAmount = this.click.value * this.baseTime
            this.increaseTimer(increaseAmount)
        }
     }

    selectUpgradable(upgradable) {
        const upgradables = {
            worker: this.worker,
            speed: this.speed,
            click: this.click
        };
        if (!upgradables[upgradable]) {
            console.warn(`Upgradable ${upgradable} not found.`);
            return null;
        }
        return upgradables[upgradable];
    }

    upgrade(upgradable) {
        var thisUpgradable
        thisUpgradable = this.selectUpgradable(upgradable)
        if (this.amount >= thisUpgradable.upgradeCost) {
            this.amount -= thisUpgradable.upgradeCost
            thisUpgradable.upgrade()
        }
    }

    increaseTimer(increaseAmount) {
        this.timer += increaseAmount*this.speed.value
        if (this.timer >= this.baseTime) {
            this.timer -= this.baseTime
            this.amount += this.amountPerBar
            if (this.worker.value == 0) {
                this.automation = false
            }
        }
    }

    /**
     * @param {number} val
     */
    set amount(val) {
        if (val >= 0) {
        this._amount = val}}

    get amount() {
        return this._amount
    }    
    
}

  