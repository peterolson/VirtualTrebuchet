export const defaultValues = {
	lengthArmShort: 1.75,
	lengthArmLong: 6.792,
	lengthSling: 6.833,
	lengthWeight: 2,
	heightOfPivot: 5,
	massArm: 10.65,
	inertiaArm: 64.76,
	pivotToArmCG: 2.52,
	massWeight: 98.09,
	inertiaWeight: 0.5,
	massProjectile: 0.328,
	projectileDiameter: 0.249,
	windSpeed: 0,
	releaseAngle: 45
};

export const inputTitles = {
	lengthArmShort: 'Length of Short Arm',
	lengthArmLong: 'Length of Long Arm',
	lengthSling: 'Length of Sling',
	lengthWeight: 'Length of Weight',
	heightOfPivot: 'Height of Pivot',
	massArm: 'Mass of Arm',
	inertiaArm: 'Inertia of Arm',
	pivotToArmCG: 'Pivot to Arm CG',
	massWeight: 'Mass of Weight',
	inertiaWeight: 'Inertia of Weight',
	massProjectile: 'Mass of Projectile',
	projectileDiameter: 'Projectile Diameter',
	windSpeed: 'Wind Speed',
	releaseAngle: 'Release Angle'
};

export const inputUnits = {
	lengthArmShort: 'length',
	lengthArmLong: 'length',
	lengthSling: 'length',
	lengthWeight: 'length',
	heightOfPivot: 'length',
	massArm: 'mass',
	inertiaArm: 'inertia',
	pivotToArmCG: 'length',
	massWeight: 'mass',
	inertiaWeight: 'inertia',
	massProjectile: 'mass',
	projectileDiameter: 'length',
	windSpeed: 'speed',
	releaseAngle: 'angle'
};

export const inputColors = {
	lengthArmShort: '#0AF',
	lengthArmLong: '#A51',
	lengthSling: '#666',
	lengthWeight: '#E83',
	heightOfPivot: '#D86',
	massArm: '#000',
	inertiaArm: '#000',
	pivotToArmCG: '#000',
	massWeight: '#000',
	inertiaWeight: '#000',
	massProjectile: '#000',
	projectileDiameter: '#000',
	windSpeed: '#000',
	releaseAngle: '#000'
};

export const unitLabels = {
	metric: {
		length: 'm',
		mass: 'kg',
		inertia: 'kg·m²',
		speed: 'm/s',
		angle: '°'
	},
	englishFeet: {
		length: 'ft',
		mass: 'lb',
		inertia: 'lb·ft²',
		speed: 'ft/s',
		angle: '°'
	},
	englishInches: {
		length: 'in',
		mass: 'lb',
		inertia: 'lb·in²',
		speed: 'in/s',
		angle: '°'
	}
};

export const projectiles = {
	baseball: {
		label: 'Baseball',
		massProjectile: 0.149, //kg
		projectileDiameter: 0.076 //m
	},
	golfBall: {
		label: 'Golf Ball',
		massProjectile: 0.04593,
		projectileDiameter: 0.04267
	},
	pumpkin: {
		label: 'Pumpkin',
		massProjectile: 4,
		projectileDiameter: 0.35
	},
	cow: {
		label: 'Cow',
		massProjectile: 750,
		projectileDiameter: 2
	}
};

export const defaultProjectile = 'baseball';

export function inertiaProperties(
	massArm: number,
	lengthArmLong: number,
	lengthArmShort: number
): {
	inertiaArm: string;
	pivotToArmCG: string;
} {
	return {
		inertiaArm: ((massArm * Math.pow(lengthArmLong + lengthArmShort, 2)) / 12).toFixed(2),
		pivotToArmCG: ((lengthArmLong + lengthArmShort) / 2 - lengthArmShort).toFixed(2)
	};
}
