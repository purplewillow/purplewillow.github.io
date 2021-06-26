class Paint{
    constructor() {
      this.name = ''
      this.amount = 0
      this.timer = 0
      this.automation = true
      // upgradables
      this.barBase = 1
      this.barIncrement = 1
      this.bar =  new Upgradable('additive', this.barBase, this.barIncrement)
      this.clickBase = 0.1
      this.clickIncrement = 0.1
      this.click = new Upgradable('additive', this.clickBase, this.clickIncrement)
      this.speedBase = 5000
      this.speedIncrement = 0.9
      this.speed = new Upgradable('multiplicative', this.speedBase, this.speedIncrement)
      //this.click = {strength: 0.10, upgrades: 0, upgradeCost: 5}
      //this.speed = {maxTimer: 5000, upgrades: 0, upgradeCost: 5}
      //this.bar   = {reward: 1, upgrades: 0, upgradeCost: 5}
      
    }

    clickPaint() {
        var increaseAmount = this.click.value * this.speed.value
        this.increaseTimer(increaseAmount)
     }

    selectUpgradeItem(item) {
        var thisItem = this.bar
        switch (item) {
        case 'bar':
            thisItem = this.bar
            break;
        case 'speed':
            thisItem = this.speed
            break;
        case 'click':
            thisItem = this.click
            break;
        default:
            thisItem = 'none'
        }
        return thisItem
    }

    increaseUpgrade(item) {
        thisItem = this.selectUpgradeItem(item)
        if (this.amount >= thisItem.upgradeCost) {
            thisItem.upgrades += 1
            this.amount -= thisItem.upgradeCost
            thisItem.upgradeCost = thisItem
        }

    }

    increaseBar() {
        if (this.amount >= this.bar.upgradeCost) {
            this.amount -= this.bar.upgradeCost
            this.bar.upgrade()
        }
    }

    increaseSpeed() {
        if (this.amount >= this.speed.upgradeCost) {
            this.amount -= this.speed.upgradeCost
            this.speed.upgrade()
        }
    }

    increaseClick() {
        if (this.amount >= this.click.upgradeCost) {
            this.amount -= this.click.upgradeCost
            this.click.upgrade()
        }
    }

    increaseTimer(increaseAmount) {
        this.timer += increaseAmount
        if (this.timer >= this.speed.value) {
            this.timer -= this.speed.value
            this.amount += this.bar.value
        }
    }

  }