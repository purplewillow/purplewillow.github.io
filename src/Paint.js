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
    }


  