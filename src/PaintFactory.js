class PaintFactory {
  static createPaint() {
      const bar = new Upgradable('additive', 1, 1);
      const click = new Upgradable('additive', 0.1, 0.1);
      const speed = new Upgradable('additive', 1, 0.05);

      return new Paint(bar, click, speed);
  }

  static toData(paint) {
    return {
      name: paint.name,
      amount: paint.amount,
      timer: paint.timer,
      automation: paint.automation,
      bar: this.upgradableToData(paint.bar),
      click: this.upgradableToData(paint.click),
      speed: this.upgradableToData(paint.speed)
    };
  }

  static fromData(data) {
    const bar = this.upgradableFromData(data.bar);
    const click = this.upgradableFromData(data.click);
    const speed = this.upgradableFromData(data.speed);
    
    const paint = new Paint(bar, click, speed);
    paint.name = data.name;
    paint.amount = data.amount;
    paint.timer = data.timer;
    paint.automation = data.automation;
    
    return paint;
  }

  static upgradableToData(upgradable) {
    return {
      type: upgradable.type,
      base: upgradable.base,
      increment: upgradable.increment,
      nUpgrades: upgradable.nUpgrades
    };
  }

  static upgradableFromData(data) {
    const upgradable = new Upgradable(data.type, data.base, data.increment);
    upgradable.nUpgrades = data.nUpgrades;
    return upgradable
  }

}

