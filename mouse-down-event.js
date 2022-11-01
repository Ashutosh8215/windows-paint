((event) => {
  canvasObj = app.canvasSetting();
  app.mouseDown = (event) => {
    switch (app.tool) {
      case "Pencil":
        app.pencil = new Pencil(
          app.pencilSize,
          !app.color ? "black" : app.color,
          true
        );

        app.pencil.arr.push([
          event.clientX - canvasObj.canvasOffsetX,
          event.clientY - canvasObj.canvasOffsetY,
        ]);

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
        app.shapes = new Shapes(
          canvasObj.ctx,
          event.clientX - canvasObj.canvasOffsetX,
          event.clientY - canvasObj.canvasOffsetY
        );
        break;
      case "Select":
        app.startX = event.clientX - canvasObj.canvasOffsetX;
        app.startY = event.clientY - canvasObj.canvasOffsetY;
        let index = 0;
        for (let shape of app.shapeLis) {
          if (app.isMouseInShape(shape) || app.isMouseInText(shape)) {
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
})();