const commonModules = (() => {
  const canvasObj = canvasSetting;
  const ctx = canvasObj.ctx;

  let toolLis = [];
  let pencilSize = 1;
  let isDragging = false;
  let currentShapeIndex = toolLis.length - 1;
  let startX = null;
  let startY = null;
  let tool = "";

  const draw = () => {

    toolLis.forEach(shape => {
      if (shape.name == "Pencil" || shape.name == "Eraser") {
        drawLine(shape)
      }
      else if (shape.name == "Text") {
        shape.draw();
      }
      else {
        shape.draw();
      }
    });
  };

  const drawLine = (shape) => {
    ctx.beginPath();
    ctx.moveTo(shape.arr[0].xCoordinate, shape.arr[0].yCoordinate);
    ctx.lineWidth = shape.lineWidth;
    ctx.strokeStyle = shape.strokeStyle;
    ctx.lineCap = shape.lineCap;
    shape.arr.forEach(element => {
      ctx.lineTo(element.xCoordinate, element.yCoordinate);
      ctx.stroke();
    });
    ctx.closePath();
  }

  const addInput = (x, y) => {
    let textX = x - canvasObj.canvasOffsetX;
    let textY = y - canvasObj.canvasOffsetY;

    let textarea = document.createElement("textarea");
    textarea.style.position = "fixed";
    textarea.style.left = x + "px";
    textarea.style.top = y + "px";

    textarea.onkeydown = (event) => {
      if (event.key === "Enter") {
        ctx.textBaseline = "top";
        ctx.textAlign = "left";
        ctx.font = "14px sans-serif";
        ctx.fillText(textarea.value, textX, textY);
        toolLis.push(new Text(ctx, new Point(textX, textY), textarea.value));
        document.body.removeChild(textarea);
      }
    };

    document.body.appendChild(textarea);
  };

  const setShape = (shapeName) => {
    commonModules.tool = "Shape";
    commonModules.shape = new Shape(shapeName, ctx);
  };

  colorId = "color1";
  const setColorPallet = (colorId) => {
    let selectedColor = document.getElementById(colorId);
    commonModules.colorId = colorId;
    commonModules.color = selectedColor.style.backgroundColor;
    if (tool == "Shape") commonModules.shape.strokeStyle = selectedColor.style.backgroundColor;
  }

  const setColor = (color) => {
    let selectedColor = document.getElementById(commonModules.colorId);
    selectedColor.style.backgroundColor = color;
    commonModules.color = color;
    if (tool == "Shape") commonModules.shape.strokeStyle = color;
  };

  const isMouseInShape = (shape) => {

    return (
      (shape.shapeName == 'line' && shape.createGivenNameObj().isPointOnLine(commonModules.startX, commonModules.startY))
      || shape.isPointOnShape(commonModules.startX, commonModules.startY)
    )
  };

  const isMouseInText = (shape) => {
    return (
      commonModules.startX > shape.location.xCoordinate
      && commonModules.startX < shape.location.xCoordinate + 400
      && commonModules.startY > shape.location.yCoordinate
      && commonModules.startY < shape.location.yCoordinate + 20
    )
  };

  const rotation = (angle) => {
    ctx.clearRect(0, 0, canvasObj.canvas.width, canvasObj.canvas.height);

    let index = commonModules.currentShapeIndex >= 0 ? commonModules.currentShapeIndex : toolLis.length - 1;
    let currentShape = toolLis[index];

    for (let i = 0; i < currentShape.positionArr.length; i++) {
      currentShape.positionArr[i].rotate(currentShape.center, angle);
    }

    draw();
    currentShape.drawDashRect()

    commonModules.tool = 'rotated';
  }

  return {
    toolLis,
    pencilSize,
    isDragging,
    currentShapeIndex,
    startX,
    startY,
    tool,
    draw,
    addInput,
    setShape,
    colorId,
    setColor,
    isMouseInShape,
    isMouseInText,
    rotation
  };
})();
