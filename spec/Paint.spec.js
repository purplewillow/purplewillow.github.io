describe("Paint", function() {
    var myPaint;
  
    beforeEach(function() {
      myPaint = new Paint();
    });

    describe("clickPaint", function() {
  
        it("initially should increase by 1 if clicked 10 times", function() {
            i = 0
            while(i < 10) {
                myPaint.clickPaint()
                i++
            }  
            expect(myPaint.amount).toEqual(1)
        });

        it("should increase by timerFractionPerClick if clicked", function() {
            var thisAmount = Math.floor(Math.random() * 0.5 * myPaint.speed.maxTimer)
            var thisClickStrength = 0.5*Math.random()
            myPaint.amount = thisAmount
            myPaint.click.strength = thisClickStrength
            currentFraction = myPaint.timer / myPaint.speed.maxTimer
            myPaint.clickPaint()
            newFraction = myPaint.timer / myPaint.speed.maxTimer
            expect(newFraction).toBeCloseTo(currentFraction + thisClickStrength, 10^-5)
        }); 

    })

    describe("increaseBar", function() { 
        beforeEach(function() {
          myPaint.amount = 5
        });

        it("should not do anything if amount is too low", function() {
            myPaint.amount = 0
            let copiedPaint = Object.assign(Object.create(Object.getPrototypeOf(myPaint)), myPaint)
            myPaint.increaseBar()
            expect(myPaint).toEqual(copiedPaint)
        })

        it("should increase the bar.upgrades by 1", function() {
            myPaint.increaseBar()
            expect(myPaint.bar.upgrades).toEqual(1)
        })

        it("should increase the bar.upgradeCost by a factor 2", function() {
            myPaint.increaseBar()
            expect(myPaint.bar.upgradeCost).toEqual(10)
        })

        it("should reduce the amount by the bar.upgradeCost", function() {
            myPaint.increaseBar()
            expect(myPaint.amount).toEqual(0)
        })

    })

    describe("increaseTimer", function() {
        beforeEach(function() {

        })

        it("should increase the timer by amount", function() {
            myPaint.timer = 0
            increaseAmount = 0.5*myPaint.maxTimer
            myPaint.increaseTimer(increaseAmount)
            expect(myPaint.timer).toEqual(increaseAmount)
        })

        it("should reset the timer if over maxTimer", function() {
            myPaint.timer = 0.5*myPaint.speed.maxTimer
            increaseAmount = 0.8*myPaint.speed.maxTimer
            myPaint.increaseTimer(increaseAmount)
            expect(myPaint.timer).toEqual(0.3*myPaint.speed.maxTimer)
        })

        it("should increase the amount by bar.reward if over speed.maxTimer", function() {
            myPaint.amount = 11
            myPaint.bar.reward = 13
            myPaint.timer = 0.5*myPaint.speed.maxTimer
            increaseAmount = 0.8*myPaint.speed.maxTimer
            myPaint.increaseTimer(increaseAmount)
            expect(myPaint.amount).toEqual(24)
        })

        it("check output of bar.reward", function() {
            myPaint.bar.reward = 13
            myPaint.amount = 11
            myPaint.amount += myPaint.bar.reward
            expect(myPaint.amount).toEqual(24)
        })

    })
});