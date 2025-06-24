import FabricCanvasTool from './fabrictool';
const fabric = require('fabric').fabric;

class Arrow extends FabricCanvasTool {
  configureCanvas(props) {
    const canvas = this._canvas;
    canvas.isDrawingMode = canvas.selection = false;
    canvas.forEachObject(o => o.selectable = o.evented = false);
    this._width = props.lineWidth;
    this._color = props.lineColor;
    this.headSize = props.headSize || 20; 
  }

  doMouseDown(o) {
    this.isDown = true;
    const pointer = this._canvas.getPointer(o.e);
    this.x1 = pointer.x;
    this.y1 = pointer.y;
    this.x2 = pointer.x;
    this.y2 = pointer.y;

    this.line = new fabric.Line([this.x1, this.y1, this.x2, this.y2], {
      strokeWidth: this._width,
      stroke: this._color,
      originX: 'center',
      originY: 'center',
      selectable: false, evented: false
    });

    this.head = new fabric.Triangle({
      width: this.headSize,
      height: this.headSize,
      fill: this._color,
      originX: 'center',
      originY: 'center',
      left: this.x2,
      top: this.y2,
      angle: 0,
      scaleX: this._width / 10,
      scaleY: this._width / 10,
      selectable: false,
      evented: false
    });

    this._canvas.add(this.line, this.head);
  }

  doMouseMove(o) {
    if (!this.isDown) return;
    const pointer = this._canvas.getPointer(o.e);
    this.x2 = pointer.x;
    this.y2 = pointer.y;

    this.line.set({ x2: this.x2, y2: this.y2 });

    const angle = Math.atan2(this.y2 - this.y1, this.x2 - this.x1) * 180 / Math.PI;
    this.head.set({
      left: this.x2,
      top: this.y2,
      angle: angle + 90
    });

    this.line.setCoords();
    this.head.setCoords();
    this._canvas.renderAll();
  }

  doMouseUp(o) {
    this.isDown = false;
   
    const group = new fabric.Group([this.line, this.head], {
      selectable: false,
      evented: false
    });
  
    this._canvas.remove(this.line, this.head);
    this._canvas.add(group);
  }

  doMouseOut(o) { this.doMouseUp(o); }
}

export default Arrow;
