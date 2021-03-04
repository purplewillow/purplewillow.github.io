describe("Paint", function() {
    var myPaint;
  
    beforeEach(function() {
      myPaint = new Paint();
    });

    describe("click", function() {
  
        it("initially should increase by 1 if clicked", function() {
            myPaint.click()
            expect(myPaint.amount).toEqual(1)
        });

        it("should increase by paintPerClick if clicked", function() {
            var thisAmount = Math.floor(Math.random() * 100)
            var thisPaintPerClick = Math.floor(Math.random() * 100) + 1
            myPaint.amount = thisAmount
            myPaint.paintPerClick = thisPaintPerClick
            myPaint.click()
            expect(myPaint.amount).toEqual(thisAmount + thisPaintPerClick)
        });

    })

    it("should return amount 0", function() {
        expect(myPaint.showAmount()).toEqual(0)
    });

    it("should return paintPerClick 1", function() {
        expect(myPaint.showPaintPerClick()).toEqual(1)
    });

    describe("increaseWorker", function() { 
        beforeEach(function() {
          myPaint.amount = 10
        });

        it("should not do anything if amount is too low", function() {
            myPaint.amount = 0
            let copiedPaint = Object.assign(Object.create(Object.getPrototypeOf(myPaint)), myPaint)
            myPaint.increaseWorker()
            expect(myPaint).toEqual(copiedPaint)
        })

        it("should increase the workerAmount by 1", function() {
            myPaint.increaseWorker()
            expect(myPaint.workerAmount).toEqual(1)
        })

        it("should increase the workerCost by a factor 2", function() {
            myPaint.increaseWorker()
            expect(myPaint.workerCost).toEqual(20)
        })

        it("should reduce the amount by the workerCost", function() {
            myPaint.increaseWorker()
            expect(myPaint.amount).toEqual(0)
        })

    })
});