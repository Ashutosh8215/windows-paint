const mouseDown = (event) => {
  const canvasObj = canvasSetting;
  const app = commonModules;
  switch (app.tool) {
    case "Pencil":
      app.pencil = new Pencil(
        app.pencilSize,
        !app.color ? "black" : app.color,
        true
      );

      app.pencil.addPointer(new Point(
        event.clientX - canvasObj.canvasOffsetX,
        event.clientY - canvasObj.canvasOffsetY,
      ));

      canvasObj.ctx.beginPath();
      canvasObj.ctx.lineWidth = app.pencil.lineWidth;
      canvasObj.ctx.lineCap = app.pencil.lineCap;
      canvasObj.ctx.strokeStyle = app.pencil.strokeStyle;
      canvasObj.ctx.moveTo(
        event.clientX - canvasObj.canvasOffsetX,
        event.clientY - canvasObj.canvasOffsetY
      );

      break;
    case "Eraser":
      app.eraser = new Eraser();
      app.eraser.isEraser = true;
      app.eraser.arr.push([
        event.clientX - canvasObj.canvasOffsetX,
        event.clientY - canvasObj.canvasOffsetY,
      ]);
      canvasObj.ctx.moveTo(
        event.clientX - canvasObj.canvasOffsetX,
        event.clientY - canvasObj.canvasOffsetY
      );
      break;
    case "Text":
      app.addInput(event.x, event.y);
      break;
    case "Shape":
        app.shape = Object.assign( new Shape('',canvasObj.ctx)  ,app.shape) ;
      app.shape.isDrawing = true;
        app.shape.startPoint = new Point(event.clientX - canvasObj.canvasOffsetX, event.clientY - canvasObj.canvasOffsetY)
        app.shape.strokeStyle = !app.color ? "black" : app.color
      
      break;
    case "Select":
      app.startX = event.clientX - canvasObj.canvasOffsetX;
      app.startY = event.clientY - canvasObj.canvasOffsetY;
      let index = 0;
      for (let shape of app.shapeLis) {
        if ((shape.name == 'Shape' && app.isMouseInShape(shape)) || (shape.name == 'Text' && app.isMouseInText(shape))) {
          app.currentShapeIndex = index;
          app.isDragging = true;
        }
        index++;
      }
      break;
    default:
      break;
  }

};
