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
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const headlen = 10;

    const points = [
      { x: x1, y: y1 },
      { x: x2, y: y2 },
      { x: x2 - headlen * Math.cos(angle - Math.PI / 6), y: y2 - headlen * Math.sin(angle - Math.PI / 6) },
      { x: x2, y: y2 },
      { x: x2 - headlen * Math.cos(angle + Math.PI / 6), y: y2 - headlen * Math.sin(angle + Math.PI / 6) }
    ];

    return new fabric.Polyline(points, {
      stroke: 'black',
      strokeWidth: 2,
      fill: 'black',
      selectable: true,
    });
  }
}

export default Arrow;
