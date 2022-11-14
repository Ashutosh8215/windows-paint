function Shape(shapeName, ctx) {
  this.name = "SHAPE";
  this.shapeName = shapeName;
  this.startPoint = {};
  this.endPoint = {};
  this.lineWidth = 2;
  this.strokeStyle = "black";
  this.ctx = ctx;
  this.isDrawing = false;
  this.center;
  this.width;
  this.height;
  this.angle = 0;
  this.positionArr = [];
}

Shape.prototype.draw = function () {
  let shape = this.createGivenNameObj();
  shape.draw();
};

Shape.prototype.drawDashRect = function () {
  let shape = this.createGivenNameObj();
  if (this.shapeName != "LINE") {
    shape.drawDashPatten();
  }
};

Shape.prototype.createGivenNameObj = function () {
  switch (this.shapeName) {
    case "CIRCLE":
      return new Circle(
        this.positionArr,
        this.lineWidth,
        this.strokeStyle,
        this.ctx,
        this.height,
        this.width,
        this.center
      );

    case "RECTANGLE":
      return new Rectangle(
        this.positionArr,
        this.lineWidth,
        this.strokeStyle,
        this.ctx,
        this.height,
        this.width,
        this.center
      );

    case "TRIANGLE":
      return new Triangle(
        this.positionArr,
        this.lineWidth,
        this.strokeStyle,
        this.ctx,
        this.height,
        this.width,
        this.center
      );

    case "LINE":
      return new Line(
        this.positionArr,
        this.lineWidth,
        this.strokeStyle,
        this.ctx
      );

    default:
  }
};

Shape.prototype.setMeasurement = function () {
  this.height = this.heightCalc();
  this.width = this.widthCalc();
  this.center = this.getCenter();
};

Shape.prototype.widthCalc = function () {
  if (this.shapeName == "LINE") {
    return this.startPoint.calcDistance(
      this.endPoint.xCoordinate,
      this.endPoint.yCoordinate
    );
  }
  return Math.abs(this.endPoint.xCoordinate - this.startPoint.xCoordinate);
};

Shape.prototype.heightCalc = function () {
  if (this.shapeName == "LINE") {
    return 0;
  }
  return Math.abs(this.endPoint.yCoordinate - this.startPoint.yCoordinate);
};

Shape.prototype.getCenter = function () {
  let xAxisCenter = this.startPoint.xCoordinate + this.width / 2;
  let yAxisCenter = this.startPoint.yCoordinate + this.height / 2;

  return new Point(xAxisCenter, yAxisCenter);
};

Shape.prototype.calcAllPoint = function () {
  if (this.shapeName == "LINE") {
    this.positionArr = [this.startPoint, this.endPoint];
  } else {
    this.positionArr = [
      new Point(
        this.center.xCoordinate - this.width / 2,
        this.center.yCoordinate - this.height / 2
      ),
      new Point(
        this.center.xCoordinate + this.width / 2,
        this.center.yCoordinate - this.height / 2
      ),
      new Point(
        this.center.xCoordinate - this.width / 2,
        this.center.yCoordinate + this.height / 2
      ),
      new Point(
        this.center.xCoordinate + this.width / 2,
        this.center.yCoordinate + this.height / 2
      ),
    ];
  }
};

Shape.prototype.isPointOnShape = function (x, y) {
  let minX = Number.MAX_SAFE_INTEGER;
  let minY = Number.MAX_SAFE_INTEGER;
  let maxY = 0;
  let maxX = 0;

  this.positionArr.forEach((element) => {
    maxX = Math.max(maxX, element.xCoordinate);
    maxY = Math.max(maxX, element.yCoordinate);
    minY = Math.min(minY, element.yCoordinate);
    minX = Math.min(minX, element.xCoordinate);
  });

  return x > minX && x < maxX && y > minY && y < maxY;
};

Shape.prototype.isPointOnShapeRotationArea = function (x, y) {
  for (let i = 0; i < this.positionArr.length; i++) {
    if (this.positionArr[i].calcDistance(x, y) < 4) return true;
  }

  return false;
};
