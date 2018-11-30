import { Point } from '../../Point';

export function print(figure, width, height) {
	const cloudPoints = [], point = new Point(0,0);
	for (let x = 0; x < width; x++) {
		cloudPoints[x] = [];
		for (let y = 0; y < height; y++) {
			point.moveTo(x, y);
			cloudPoints[x][y] = figure.collision(point) ? '+' : '-';
		}

		cloudPoints[x] = cloudPoints[x].join('');
	}

	return cloudPoints;
}