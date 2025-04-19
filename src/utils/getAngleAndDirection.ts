import { Point } from "../common-types";

export function getAngleAndDirection(
  a: Point,
  b: Point,
  previousAngle?: number
): {
  angle: number;
  direction: "left" | "right";
  distance: number;
  angleDiff?: number;
} {
  const dx = b.x - a.x;
  const dy = b.y - a.y;

  const radians = Math.atan2(dy, dx);
  const degrees = radians * (180 / Math.PI);
  const normalizedAngle = (degrees + 360) % 360;

  const direction: "left" | "right" =
    normalizedAngle > 90 && normalizedAngle < 270 ? "left" : "right";

  const distance = Math.sqrt(dx * dx + dy * dy);

  let angleDiff: number | undefined = undefined;
  if (previousAngle !== undefined) {
    const diff = normalizedAngle - previousAngle;

    // Normalize the difference to [-180, 180]
    angleDiff = ((((diff + 180) % 360) + 360) % 360) - 180;
  }

  return {
    angle: normalizedAngle,
    direction,
    distance,
    angleDiff,
  };
}
