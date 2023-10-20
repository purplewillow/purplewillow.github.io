describe("Class Paint", function() {
    var myPaint;
  
    beforeEach(function() {
      myPaint = PaintFactory.createPaint();
    });

    describe("clickPaint", function() {

        it("should start automation if clicked initially", function() {
            myPaint.automation = false
            myPaint.clickPaint()
            expect(myPaint.automation).toEqual(true)
        });
  
        it("initially should increase by 1 if clicked 11 times", function() {
            // Note: First time sets on automation, then 10 times more to increase the progress bar
            i = 0
            while(i < 11) {
                myPaint.clickPaint()
                i++
            }
            expect(myPaint.amount).toEqual(1)
        });

        it("should increase by timerFractionPerClick if clicked", function() {
            var thisAmount = Math.floor(Math.random() * 0.5 * myPaint.speed.value)
            var thisClickStrength = 0.5*Math.random()
            myPaint.amount = thisAmount
            myPaint.click.strength = thisClickStrength
            currentFraction = myPaint.timer / myPaint.speed.value
            myPaint.clickPaint()
            newFraction = myPaint.timer / myPaint.speed.value
            expect(newFraction).toBeCloseTo(currentFraction + thisClickStrength, 10^-5)
        }); 

    })

    describe("selectUpgradable", function() {
        it("should return the correct item", function() {
           expect(myPaint.selectUpgradable('worker')).toEqual(myPaint.worker)
           expect(myPaint.selectUpgradable('speed')).toEqual(myPaint.speed)
           expect(myPaint.selectUpgradable('click')).toEqual(myPaint.click)
        })
    })

    describe("upgrade", function() { 
        beforeEach(function() {
          myPaint.amount = 5
        });

        it("should not do anything if amount is too low", function() {
            myPaint.amount = 0
            let copiedPaint = Object.assign(Object.create(Object.getPrototypeOf(myPaint)), myPaint)
            myPaint.upgrade('worker')
            expect(myPaint).toEqual(copiedPaint)
        })

        it("should increase the nUpgrades by 1", function() {
            myPaint.upgrade('speed')
            expect(myPaint.speed.nUpgrades).toEqual(1)
        })

        it("should increase the upgradeCost by a factor 2", function() {
            myPaint.upgrade('click')
            expect(myPaint.click.upgradeCost).toEqual(10)
        })

        it("should reduce the amount by the speed.upgradeCost", function() {
            myPaint.upgrade('speed')
            expect(myPaint.amount).toEqual(0)
        })

        it("should increase the worker.value by 1", function() {
            myPaint.upgrade('worker')
            expect(myPaint.worker.value).toEqual(1)
        })

    })

    describe("increaseTimer", function() {
        beforeEach(function() {

        })

        it("should increase the timer by amount if speed is 1", function() {
            myPaint.timer = 0
            myPaint.speed.value = 1
            increaseAmount = 0.5*myPaint.baseTime
            myPaint.increaseTimer(increaseAmount)
            expect(myPaint.timer).toEqual(increaseAmount)
        })

        it("should increase the timer by amount*speed if speed is > 1", function() {
            myPaint.timer = 0
            myPaint.speed.nUpgrades = 2
            increaseAmount = 0.5*myPaint.baseTime
            myPaint.increaseTimer(increaseAmount)
            expect(myPaint.timer).toEqual(increaseAmount*myPaint.speed.value)
        })

        it("should reset the timer if over baseTime", function() {
            myPaint.timer = 0.5*myPaint.baseTime
            increaseAmount = 0.8*myPaint.baseTime
            myPaint.increaseTimer(increaseAmount)
            expect(myPaint.timer).toEqual(0.3*myPaint.baseTime)
        })

        it("should increase the amount by worker.value if over baseTime", function() {
            myPaint.amount = 11
            myPaint.worker.nUpgrades = 3
            myPaint.workerStrength = 1
            myPaint.timer = 0.5*myPaint.baseTime
            increaseAmount = 0.8*myPaint.baseTime
            myPaint.increaseTimer(increaseAmount)
            expect(myPaint.amount).toEqual(11 + myPaint.worker.value)
        })

        it("should increase the amount by workerStrength if over baseTime", function() {
            myPaint.amount = 11
            myPaint.worker.nUpgrades = 0
            myPaint.workerStrength = 2
            myPaint.timer = 0.5*myPaint.baseTime
            increaseAmount = 0.8*myPaint.baseTime
            myPaint.increaseTimer(increaseAmount)
            expect(myPaint.amount).toEqual(11 + myPaint.workerStrength)
        })

        it("check output of worker.value", function() {
            myPaint.worker.nUpgrades = 3
            myPaint.amount = 11
            myPaint.amount += myPaint.worker.value
            expect(myPaint.amount).toEqual(11 + myPaint.worker.value)
        })

    })
});