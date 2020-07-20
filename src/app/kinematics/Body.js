import { Container, Graphics } from 'pixi.js';

export default class Body {
  constructor(x, y, length, angle) {
    this.display = new Container();
    this.x = x;
    this.y = y;
    this._length = length;
    this.angle = angle;
    this.parent = null;
    this.forceUpdate = false;
  }

  getEndX() {
    return this.x + Math.cos(this.angle) * this.length;
  }

  getEndY() {
    return this.y + Math.sin(this.angle) * this.length;
  }

  pointAt(x, y) {
    const dx = x - this.x;
    const dy = y - this.y;
    this.angle = Math.atan2(dy, dx);
  }

  drawGraphic(graphic, firstArm = false) {
    this.firstArm = firstArm;
    graphic.lineStyle(2, 0x000000);
    graphic.moveTo(this.x, this.y);
    if (firstArm) {
      graphic.beginFill(0xcccccc);
      graphic.drawCircle(this.getEndX(), this.getEndY(), 10);
      graphic.endFill();
    }
    graphic.lineTo(this.getEndX(), this.getEndY());
  }

  updateSprite(firstArm = false, forceRedraw = false) {
    this.firstArm = firstArm;
    if (!this.lineGraphic || forceRedraw) {
      if (!this.lineGraphic) {
        this.lineGraphic = new Graphics();
        this.display.addChild(this.lineGraphic);
      }

      this.display.cacheAsBitmap = false;
      this.lineGraphic.clear();
      this.lineGraphic.lineStyle(2, 0xff0099);

      if (firstArm) {
        this.lineGraphic.beginFill(0xcccccc);
        this.lineGraphic.drawCircle(this.length, 0, 10);
      }
      this.lineGraphic.lineTo(this.length, 0);

      this.display.pivot.x = this.length;
      this.display.cacheAsBitmap = true;
    }
    this.display.x = this.getEndX();
    this.display.y = this.getEndY();
    this.display.rotation = this.angle;
  }

  drag(x, y) {
    this.pointAt(x, y);
    this.x = x - Math.cos(this.angle) * this.length;
    this.y = y - Math.sin(this.angle) * this.length;
    if (this.parent) {
      this.parent.drag(this.x, this.y);
    }
  }

  destroy() {
    if (this.display) {
      this.display.destroy();
      this.display = null;
    }
  }

  get length() {
    return this._length;
  }

  set length(value) {
    this._length = value;
    // updateSprite with forceRedraw
    this.updateSprite(this.firstArm, true);
  }
}
