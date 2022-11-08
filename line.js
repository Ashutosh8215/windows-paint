function Line(positionArr,lineWidth,strokeStyle,ctx) {

    this.name = "line"
    this.startPoint = positionArr[0]; 
    this.endPoint = positionArr[1]; 
    this.lineWidth = lineWidth; 
    this.strokeStyle = strokeStyle; 
    this.ctx = ctx;

  }
  
  Line.prototype.draw = function () {
    this.ctx.beginPath();
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = this.strokeStyle;
    this.ctx.moveTo(this.startPoint.xCoordinate,this.startPoint.yCoordinate);
    this.ctx.lineTo(this.endPoint.xCoordinate,this.endPoint.yCoordinate);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  Line.prototype.isPointOnLine = function(x,y) {
    let lengthOfLine = Math.sqrt(Math.pow((this.endPoint.xCoordinate - this.startPoint.xCoordinate), 2) + Math.pow((this.endPoint.yCoordinate - this.startPoint.yCoordinate), 2));
    let firstHalfLineLengthgthOfLine = Math.sqrt(Math.pow((x - this.startPoint.xCoordinate), 2) + Math.pow((y - this.startPoint.yCoordinate), 2));
    let secondHalfLineLength = Math.sqrt(Math.pow((this.endPoint.xCoordinate - x), 2) + Math.pow((this.endPoint.yCoordinate - y), 2));

    if(Math.round(firstHalfLineLengthgthOfLine + secondHalfLineLength) == Math.round(lengthOfLine)){
      return true;
    }

    return false;
  }

  Line.prototype.getCenter = function() {
    let cx = Math.min(this.startPoint.xCoordinate,this.endPoint.xCoordinate) + (Math.abs(this.startPoint.xCoordinate - this.endPoint.xCoordinate)/2)
    let cy = Math.min(this.startPoint.yCoordinate,this.endPoint.yCoordinate) + (Math.abs(this.startPoint.yCoordinate - this.endPoint.yCoordinate)/2)

    return new Point(cx,cy);
  }