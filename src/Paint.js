class Paint{
    constructor(bar, click, speed) {
      this.name = ''
      this.amount = 0
      this.timer = 0
      this.automation = true
      // upgradables
      this.bar = bar
      this.click = click
      this.speed = speed
      this.baseTime = 5000 // in miliseconds    
    }

    clickPaint() {
        var increaseAmount = this.click.value * this.baseTime
        this.increaseTimer(increaseAmount)
     }

    selectUpgradable(upgradable) {
        const upgradables = {
            bar: this.bar,
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
            this.amount += this.bar.value
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

  