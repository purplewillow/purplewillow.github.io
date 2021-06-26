class Upgradable{
    nUpgrades = 0;
    type;
    base;
    increment;
    constructor(type, base, increment) {
        this.type = type // 'additive' or 'multiplicative'
        this.base = base // starting value
        this.increment = increment // per upgrade
    }

    get upgradeCost() {
        return 2 ** this.nUpgrades * 5 
    }

    get value() {
        var value
        if (this.type === 'additive') {
            value = this.base + this.increment * this.nUpgrades 
        } else if (this.type === 'multiplicative') {
            value = this.base * this.increment ** this.nUpgrades
        }
        return value
    }

    upgrade() {
        this.nUpgrades += 1
    }
}
