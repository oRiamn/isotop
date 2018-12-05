export function degreeToRadians(degrees) {
	return degrees * Math.PI / 180;
}

export function radianToDegrees(radians) {
	return radians * 180 / Math.PI;
}

export function mod(dividende,diviseur) {
	let r = (( dividende % diviseur) + diviseur) % diviseur;
	return r < 0 ? r + Math.abs(diviseur) : r;
}