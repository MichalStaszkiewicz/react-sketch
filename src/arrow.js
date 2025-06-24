import FabricCanvasTool from './fabrictool';
import { fabric } from 'fabric';

export default class Arrow extends FabricCanvasTool {
  constructor(canvas, props) {
    super(canvas);
    this.setOptions(props);
  }

  configureCanvas(props) {
    super.configureCanvas(props);
    this._canvas.isDrawingMode = false;
    this.lineWidth = props.lineWidth  || 2;
    this.color     = props.lineColor  || 'black';
    this.tempArrow = null;
  }

  setOptions({ lineWidth, lineColor }) {
    this.lineWidth = lineWidth  || this.lineWidth;
    this.color     = lineColor  || this.color;
  }

  doMouseDown(o) {
    this.isDrawing = true;
    const p = this._canvas.getPointer(o.e);
    this.startX = p.x;
    this.startY = p.y;
  }

  doMouseMove(o) {
    if (!this.isDrawing) return;
    const p = this._canvas.getPointer(o.e);
    if (this.tempArrow) this._canvas.remove(this.tempArrow);

    const dx = p.x - this.startX;
    const dy = p.y - this.startY;
    const len = Math.hypot(dx, dy);
    const ang = Math.atan2(dy, dx);
    const headLen = Math.max(10, Math.min(20, len * 0.1));
    const arrowAng = Math.PI / 6;

    const x3 = p.x - headLen * Math.cos(ang - arrowAng);
    const y3 = p.y - headLen * Math.sin(ang - arrowAng);
    const x4 = p.x - headLen * Math.cos(ang + arrowAng);
    const y4 = p.y - headLen * Math.sin(ang + arrowAng);

    const pathData = [
      `M ${this.startX} ${this.startY}`,
      `L ${p.x} ${p.y}`,
      `M ${x3} ${y3}`, `L ${p.x} ${p.y}`,
      `M ${x4} ${y4}`, `L ${p.x} ${p.y}`
    ].join(' ');

    this.tempArrow = new fabric.Path(pathData, {
      stroke:      this.color,
      strokeWidth: this.lineWidth,
      fill:        '',
      selectable:  true
    });

    this._canvas.add(this.tempArrow);
    this._canvas.requestRenderAll();
  }

  doMouseUp() {
    this.isDrawing = false;
    this.tempArrow = null;
  }
}
