/* eslint-disable no-param-reassign */
export default class SimplifyLine {
  // square distance between 2 points
  static getSqDist(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;

    return dx * dx + dy * dy;
  }

  // square distance from a point to a segment
  static getSqSegDist(p, p1, p2) {
    let { x } = p1;
    let { y } = p1;
    let dx = p2.x - x;
    let dy = p2.y - y;

    if (dx !== 0 || dy !== 0) {
      const t = ((p.x - x) * dx + (p.y - y) * dy) / (dx * dx + dy * dy);

      if (t > 1) {
        x = p2.x;
        y = p2.y;
      } else if (t > 0) {
        x += dx * t;
        y += dy * t;
      }
    }

    dx = p.x - x;
    dy = p.y - y;

    return dx * dx + dy * dy;
  }
  // rest of the code doesn't care about point format

  // basic distance-based simplification
  static simplifyRadialDist(points, sqTolerance) {
    let prevPoint = points[0];
    const newPoints = [prevPoint];
    let point;

    for (let i = 1, len = points.length; i < len; i++) {
      point = points[i];

      if (this.getSqDist(point, prevPoint) > sqTolerance) {
        newPoints.push(point);
        prevPoint = point;
      }
    }

    if (prevPoint !== point) {
      newPoints.push(point);
    }

    return newPoints;
  }

  static simplifyDPStep(points, first, last, sqTolerance, simplified) {
    let maxSqDist = sqTolerance;
    let index;

    for (let i = first + 1; i < last; i++) {
      const sqDist = this.getSqSegDist(points[i], points[first], points[last]);

      if (sqDist > maxSqDist) {
        index = i;
        maxSqDist = sqDist;
      }
    }

    if (maxSqDist > sqTolerance) {
      if (index - first > 1) {
        this.simplifyDPStep(points, first, index, sqTolerance, simplified);
      }
      simplified.push(points[index]);
      if (last - index > 1) {
        this.simplifyDPStep(points, index, last, sqTolerance, simplified);
      }
    }
  }

  // simplification using Ramer-Douglas-Peucker algorithm
  static simplifyDouglasPeucker(points, sqTolerance) {
    const last = points.length - 1;

    const simplified = [points[0]];
    this.simplifyDPStep(points, 0, last, sqTolerance, simplified);
    simplified.push(points[last]);

    return simplified;
  }

  // both algorithms combined for awesome performance
  // Returns an array of simplified points.
  // points, An array of points of {x: Number, y: Number} format.
  // tolerance, Affects the amount of simplification (in the same metric as the point coordinates).
  // highQuality, Excludes distance-based preprocessing step which leads to highest quality simplification but runs
  static simplify(points, tolerance, highestQuality) {
    if (points.length <= 2) {
      return points;
    }

    const sqTolerance = tolerance !== undefined ? tolerance * tolerance : 1;

    points = highestQuality
      ? points
      : this.simplifyRadialDist(points, sqTolerance);
    points = this.simplifyDouglasPeucker(points, sqTolerance);

    return points;
  }
}
