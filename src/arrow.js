import Tool from './tools';
const fabric = require('fabric').fabric;

class Arrow {
  constructor(canvas) {
    this.canvas = canvas;
    this.isDrawing = false;
  }

  configureCanvas() {
    this.canvas.isDrawingMode = false;
  }

  doMouseDown = (o) => {
    this.isDrawing = true;
    const pointer = this.canvas.getPointer(o.e);
    this.startX = pointer.x;
    this.startY = pointer.y;
  }

  doMouseMove = (o) => {
    if (!this.isDrawing) return;
    if (this.tempArrow) this.canvas.remove(this.tempArrow);

    const pointer = this.canvas.getPointer(o.e);
    const arrow = this._createArrow(this.startX, this.startY, pointer.x, pointer.y);
    this.tempArrow = arrow;
    this.canvas.add(arrow);
  }

  doMouseUp = (o) => {
    if (!this.isDrawing) return;
    this.isDrawing = false;
    this.tempArrow = null;
  }

  doMouseOut = () => {
    this.doMouseUp();
  }

  _createArrow = (x1, y1, x2, y2) => {
    const line = new fabric.Line([x1, y1, x2, y2], {
      stroke: this.color || 'black',
      strokeWidth: this.lineWidth || 2,
      selectable: false
    });
  
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const headLength = 15;
    const arrowAngle = Math.PI / 6;
  
    const x3 = x2 - headLength * Math.cos(angle - arrowAngle);
    const y3 = y2 - headLength * Math.sin(angle - arrowAngle);
  
    const x4 = x2 - headLength * Math.cos(angle + arrowAngle);
    const y4 = y2 - headLength * Math.sin(angle + arrowAngle);
  
    const arrowHead1 = new fabric.Line([x2, y2, x3, y3], {
      stroke: this.color || 'black',
      strokeWidth: this.lineWidth || 2,
      selectable: false
    });
  
    const arrowHead2 = new fabric.Line([x2, y2, x4, y4], {
      stroke: this.color || 'black',
      strokeWidth: this.lineWidth || 2,
      selectable: false
    });
  
    return new fabric.Group([line, arrowHead1, arrowHead2], {
      selectable: true
    });
  }
}

export default Arrow;
