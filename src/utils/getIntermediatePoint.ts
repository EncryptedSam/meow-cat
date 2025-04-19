import { Point } from "../common-types";

export function getIntermediatePoint(a: Point, b: Point, x: number): Point {
  const dx = b.x - a.x;
  const dy = b.y - a.y;

  const distance = Math.sqrt(dx * dx + dy * dy);

  // If b is closer than x, return b
  if (distance <= x) return b;

  // Normalize direction vector (dx, dy) and scale by x
  const ratio = x / distance;

  return {
    x: a.x + dx * ratio,
    y: a.y + dy * ratio,
  };
}
