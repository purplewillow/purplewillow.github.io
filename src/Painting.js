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
                      1: "black"}
    }
    static toData(painting) {
      return {
        width: painting.width,
        height: painting.height,
        colors: painting.colors,
        colorNumberToName: painting.colorNumberToName
      };
    }

    static fromData(data) {
      const painting = new Painting();
      Object.assign(painting, data);
      return painting;
    }
  }