/**
 * Created by pandan on 2017-04-29.
 */
export default class Geom {
  static distance(p0, p1) {
    const dx = p1.x - p0.x;
    const dy = p1.y - p0.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  static angleBetween(p0, p1) {
    return Math.atan2(p1.y - p0.y, p1.x - p0.x);
  }

  static circleCollision(c0, c1) {
    return this.distance(c0, c1) <= c0.radius + c1.radius;
  }

  static circlePointCollision(x, y, circle) {
    return this.distanceXY(x, y, circle.x, circle.y) < circle.radius;
  }

  static circleRectCollision(circle, rect) {
    const { x, y, radius } = circle;
    return (
      x + radius > rect.x + rect.width ||
      x - radius < rect.x ||
      y + radius > rect.y + rect.height ||
      y - radius < rect.y
    );
  }

  static pointInRect(x, y, rect) {
    return (
      this.inRange(x, rect.x, rect.x + rect.width) &&
      this.inRange(y, rect.y, rect.y + rect.height)
    );
  }

  static inRange(value, min, max) {
    return value >= Math.min(min, max) && value <= Math.max(min, max);
  }

  static rangeIntersect(min0, max0, min1, max1) {
    return (
      Math.max(min0, max0) >= Math.min(min1, max1) &&
      Math.min(min0, max0) <= Math.max(min1, max1)
    );
  }

  static rectIntersect(r0, r1) {
    return (
      this.rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) &&
      this.rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height)
    );
  }

  static getRandomPointInCircle(circle) {
    const pos = {};
    const t = 2 * Math.PI * Math.random();
    const u = Math.random() + Math.random();
    const r = u > 1 ? 2 - u : u;
    const x = r * Math.cos(t);
    const y = r * Math.sin(t);

    pos.x = circle.x + x * circle.radius;
    pos.y = circle.y + y * circle.radius;

    return pos;
  }

  static getCircleMovement(x, y, radius, index) {
    return {
      x: x + radius * Math.sin(index),
      y: y + radius * Math.cos(index),
    };
  }
}
