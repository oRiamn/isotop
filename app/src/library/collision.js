export function toRadians(angle) {
	// convert angle to radians
	return angle * (Math.PI / 180);
}

export function inCircle(x0, y0, x1, y1, r) {
	// center of circle (x0,y0), mouse coordinates (x1,y1), radius (r)
	return Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0)) < r;
}

export function inTriangle(p, p0, p1, p2) {
	// point in circle (p), triangle points (p0, p1, p2)
	var A = 1 / 2 * (-p1.y * p2.x + p0.y * (-p1.x + p2.x) + p0.x * (p1.y - p2.y) + p1.x * p2.y);
	var sign = A < 0 ? -1 : 1;
	var s = (p0.y * p2.x - p0.x * p2.y + (p2.y - p0.y) * p.x + (p0.x - p2.x) * p.y) * sign;
	var t = (p0.x * p1.y - p0.y * p1.x + (p0.y - p1.y) * p.x + (p1.x - p0.x) * p.y) * sign;
	return s > 0 && t > 0 && (s + t) < 2 * A * sign;
}