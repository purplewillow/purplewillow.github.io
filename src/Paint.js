class Paint{
    constructor() {
      this.name = ''
      this.amount = 0
      this.timer = 0
      this.automation = true
      // upgradables
      this.barBase = 1
      this.barIncrement = 1
      this.bar = new Upgradable('additive', this.barBase, this.barIncrement)
      this.clickBase = 0.1
      this.clickIncrement = 0.1
      this.click = new Upgradable('additive', this.clickBase, this.clickIncrement)
      this.speedBase = 5000
      this.speedIncrement = 0.9
      this.speed = new Upgradable('multiplicative', this.speedBase, this.speedIncrement)     
    }

    clickPaint() {
        var increaseAmount = this.click.value * this.speed.value
        this.increaseTimer(increaseAmount)
     }

    selectUpgradable(upgradable) {
        var thisUpgradable
        switch (upgradable) {
        case 'bar':
            thisUpgradable = this.bar
            break;
        case 'speed':
            thisUpgradable = this.speed
            break;
        case 'click':
            thisUpgradable = this.click
            break;
        default:
            thisUpgradable = 'none'
        }
        return thisUpgradable
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
        this.timer += increaseAmount
        if (this.timer >= this.speed.value) {
            this.timer -= this.speed.value
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
    
      // Method to serialize the object to a plain data object
  toData() {
    return {
      name: this.name,
      amount: this.amount,
      timer: this.timer,
      automation: this.automation,
      barBase: this.barBase,
      barIncrement: this.barIncrement,
      clickBase: this.clickBase,
      clickIncrement: this.clickIncrement,
      speedBase: this.speedBase,
      speedIncrement: this.speedIncrement,
    };
  }

  // Method to create a new Paint instance from serialized data
  static fromData(data) {
    const paint = new Paint();
    paint.name = data.name;
    paint.amount = data.amount;
    paint.timer = data.timer;
    paint.automation = data.automation;
    paint.barBase = data.barBase;
    paint.barIncrement = data.barIncrement;
    paint.clickBase = data.clickBase;
    paint.clickIncrement = data.clickIncrement;
    paint.speedBase = data.speedBase;
    paint.speedIncrement = data.speedIncrement;
    // Recreate the nested Upgradable objects here if needed
    paint.bar = new Upgradable('additive', data.barBase, data.barIncrement);
    paint.click = new Upgradable('additive', data.clickBase, data.clickIncrement);
    paint.speed = new Upgradable('multiplicative', data.speedBase, data.speedIncrement);
    return paint;
  }
}

  