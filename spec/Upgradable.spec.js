describe("Class Upgradable", function () {
    var myUpgradable;

    beforeEach(function() {
        myUpgradable = new Upgradable('additive', 1, 1);
      });
 
      describe("get upgradeCost", function() {

        it("should return 5 initially", function() {
            expect(myUpgradable.upgradeCost).toEqual(5)
        })

        it("should return 10 for the second upgrade", function() {
            myUpgradable.nUpgrades = 1
            expect(myUpgradable.upgradeCost).toEqual(10)
        })
      })

      describe("get value", function() {

        it("should get the correct value for the additive class", function() {
          myUpgradable.type = 'additive'
          myUpgradable.base = 1
          myUpgradable.increment = 1
          myUpgradable.nUpgrades = 0
          expect(myUpgradable.value).toEqual(1)
          myUpgradable.nUpgrades = 5
          expect(myUpgradable.value).toEqual(6)
        })

        it("should get the correct value for the multiplicative class", function() {
            myUpgradable.type = 'multiplicative'
            myUpgradable.base = 5000
            myUpgradable.increment = 0.9
            myUpgradable.nUpgrades = 0
            expect(myUpgradable.value).toEqual(5000)
            myUpgradable.nUpgrades = 1
            expect(myUpgradable.value).toEqual(4500)
          })
      })
})