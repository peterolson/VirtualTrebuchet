export type Point = [number, number];

export type SimulatorOutput = {
	ArmCG: Point[];
	ArmSling: Point[];
	Drag_vs_Re: Point[];
	EnergyEfficiency: number;
	ErrorMessages: string[];
	MinMax: [Point, Point];
	Projectile: Point[];
	RangeEfficiency: number;
	ReleasePositon: Point;
	ReleaseVelocity: number;
	SlingEnd: Point[];
	SlingTension: boolean[];
	Time: number[];
	WeightArm: Point[];
	WeightCG: Point[];
};
