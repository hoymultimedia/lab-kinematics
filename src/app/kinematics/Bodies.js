import { Container, Graphics } from 'pixi.js';
import Body from './Body';

export default class Bodies {
  constructor() {
    this.type = 'sprite'; // draw / sprite
    this._segmentLength = 0;

    this.display = new Container();

    if (this.type === 'draw') {
      this.graphics = new Graphics();
      this.display.addChild(this.graphics);
    }
    this.bodies = [];
  }

  init(numSegments, segmentLength) {
    this._numSegments = numSegments;
    this._segmentLength = segmentLength;
    for (let i = 0; i < numSegments; i++) {
      this.addBody(segmentLength);
    }
  }

  addBody(segmentLength) {
    const body = new Body(0, 0, segmentLength, 0);
    if (this.lastBody) {
      body.x = this.lastBody.getEndX();
      body.y = this.lastBody.getEndY();
      body.parent = this.lastBody;
    } else {
      body.x = 0;
      body.y = 0;
    }
    this.bodies.push(body);
    this.lastBody = body;
    if (this.type === 'sprite') {
      this.display.addChild(body.display);
    }
  }

  updateBodies() {
    if (this.bodies.length < this.numSegments) {
      const diff = this.numSegments - this.bodies.length;
      for (let i = 0; i < diff; i++) {
        this.addBody(this.segmentLength);
      }
    } else if (this.bodies.length > this.numSegments) {
      const diff = this.bodies.length - this.numSegments;
      for (let i = 0; i < diff; i++) {
        const body = this.bodies.pop();
        body.destroy();
      }
    }

    let prevBody = null;
    for (let i = 0; i < this.bodies.length; i++) {
      const body = this.bodies[i];
      body.length = this.segmentLength;
      body.parent = prevBody;
      body.firstArm = false;
      prevBody = body;
      if (i === this.bodies.length - 1) {
        this.lastBody = body;
      }
    }
    this.drawSprites(true);
  }

  drawGraphic() {
    /**
     * Using single graphic that each body draws on.
     * Depends on what type is used, sprite or draw
     */
    this.graphics.clear();
    this.graphics.moveTo(this.lastBody.x, this.lastBody.y);
    for (let i = 0; i < this.bodies.length; i++) {
      if (i === this.bodies.length - 1) {
        this.bodies[i].drawGraphic(this.graphics, true);
      } else {
        this.bodies[i].drawGraphic(this.graphics);
      }
    }
  }

  drawSprites(forceRedraw = false) {
    /**
     * Using bodies with sprites with static graphic.
     * Rotation
     */
    console.log(this.bodies.length);
    for (let i = 0; i < this.bodies.length; i++) {
      if (i === this.bodies.length - 1) {
        this.bodies[i].updateSprite(true, forceRedraw);
      } else {
        this.bodies[i].updateSprite(false, forceRedraw);
      }
    }
  }

  drag(x, y) {
    if (this.lastBody) {
      this.lastBody.drag(x, y);
    }
    this.drawSprites();
  }

  get segmentLength() {
    return this._segmentLength;
  }

  set segmentLength(value) {
    this._segmentLength = value;
    this.updateBodies();
  }

  get numSegments() {
    return this._numSegments;
  }

  set numSegments(value) {
    this._numSegments = value;
    this.updateBodies();
  }
}
