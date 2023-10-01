class Painting{
    constructor() {
      this.width = 5;
      this.height = 5;
      this.colors = [0, 1, 0, 1, 0,
                     0, 0, 0, 0, 0,
                     1, 0, 0, 0, 1,
                     0, 1, 1, 1, 0,
                     0, 0, 0, 0, 0];
      this.colorNumberToName = {
                      0: "white",
                      1: "black"};   
      this.filled = Array(this.colors.length).fill(0);
    }

  fillSquare(index) {
          this.filled[index] = 1;
      }

  isSquareFilled(index) {
      return this.filled[index] === 1;
  }

  isGridFilled() {
      const totalFilled = this.filled.reduce((sum, value) => sum + value, 0);
      return totalFilled === this.width * this.height;
  }

    static toData(painting) {
      return {
        width: painting.width,
        height: painting.height,
        colors: painting.colors,
        colorNumberToName: painting.colorNumberToName,
        filled: painting.filled
      };
    }

    static fromData(data) {
      const painting = new Painting();
      Object.assign(painting, data);
      return painting;
    }
  }