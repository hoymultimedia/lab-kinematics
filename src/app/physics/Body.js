import Vector2 from 'utils/Vector2';

export default class Body {
  constructor(x, y, mass = 1) {
    this.pos = new Vector2(x, y);
    this.vel = new Vector2(10, 10);
    this.acc = new Vector2(0, 0);
    this.mass = mass;
  }

  setDirection(value) {
    this.vel.x *= Math.cos(value);
    this.vel.y *= Math.sin(value);
  }

  update() {
    this.pos.add(this.vel);
  }
}
