class Upgradable {
    constructor(type, base, increment) {
        this.type = type; // 'additive' or 'multiplicative'
        this.base = base; // starting value
        this.increment = increment; // per upgrade
        this.nUpgrades = 0;
    }

    get upgradeCost() {
        return 2 ** this.nUpgrades * 5 
    }

    get value() {
        switch(this.type) {
            case 'additive':
                return this.base + this.increment * this.nUpgrades
            case 'multiplicative':
                return this.base * this.increment ** this.nUpgrades
            default:
                throw new Error('Unexpected type value: ' + this.type);
        }
     }

    upgrade() {
        this.nUpgrades += 1
    }

    // Set / Get for type
    set type(value) {
        if (value !== 'additive' && value !== 'multiplicative') {
            throw new Error('Invalid type. Type must be either "additive" or "multiplicative".');
        }
        this._type = value;
    }

    get type() {
        return this._type;
    }

}
