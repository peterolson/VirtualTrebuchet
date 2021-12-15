// eslint-disable-next-line no-undef
importScripts('/comlink.js');

// eslint-disable-next-line no-undef
Comlink.expose(simulator);

class Results {
	constructor() {
		this.ReleaseTime = 0;
		this.ReleaseAq = 0;
		this.ReleaseWq = 0;
		this.ReleaseSq = 0;
		this.ReleaseCartesianPoints = new CartesianPoints();
		this.Time_list = [];
		this.Check_list = [];
		this.Aq_list = [];
		this.Wq_list = [];
		this.Sq_list = [];
		this.SlingTension = [];
		this.CartesianPoints = new CartesianPoints();
		this.TransitionResults = new TransitionResults();
		this.ErrorMessages = [];
		this.Check_peak = 0;
		this.EnergyEfficiency = 0;
		this.RangeEfficiency = 0;
		this.NoDragRangeEfficiency = 0;
		this.Drag_vs_Re = [];
	}

	getMinMax() {
		let minMax = [
			[0, 0],
			[0, 0]
		];
		let points = [
			this.CartesianPoints.ArmCG,
			this.CartesianPoints.ArmSlingPoint,
			this.CartesianPoints.Projectile,
			this.CartesianPoints.SlingEndPoint,
			this.CartesianPoints.WeightArmPoint,
			this.CartesianPoints.WeightCG
		];
		let minScale = 1.2,
			maxScale = 1.025;
		return [
			[
				minScale * Math.min(...points.map((point) => Math.min(...point.map((p) => p[0])))),
				minScale * Math.min(...points.map((point) => Math.min(...point.map((p) => p[1]))))
			],
			[
				minScale * Math.max(...points.map((point) => Math.max(...point.map((p) => p[0])))),
				minScale * Math.max(...points.map((point) => Math.max(...point.map((p) => p[1]))))
			]
		];
	}
}

class CartesianPoints {
	constructor() {
		this.WeightCG = [];
		this.WeightArmPoint = [];
		this.ArmSlingPoint = [];
		this.SlingEndPoint = [];
		this.Projectile = [];
		this.ArmCG = [];
	}
}

class Transition {
	constructor(condition, StepSize) {
		this.condition = condition;
		this.StepSize = StepSize;
	}
}

class TransitionResults {
	constructor() {
		this.time12 = 0;
		this.time23 = 0;
		this.timeEnd = 0;
		this.ActualForceOnProjectile = 0;
		this.ActualReleaseAngle = 0;
		this.ActualEndHeightFromGround = 0;
		this.ReleaseVelocity = 0;
	}
}
class NumericalMethod {
	constructor(RelativeErrorSum, MotionVariablesNew) {
		this.RelativeErrorSum = RelativeErrorSum;
		this.MotionVariablesNew = MotionVariablesNew;
	}
}

class InterpolationOutput {
	constructor() {
		this.Check = 0;
		this.MotionVariables = new Array(7);
	}
}

function simulator(inputs) {
	// --- Constant Parameters ---
	const GravitationalAcceleration = 9.81; // m/s^2
	const KinimaticViscosity = 1.544e-5; // kg/(m*s)
	let LengthArmShort, LengthArmLong, PivotToArmCG, LengthWeight, LengthSling, HeightOfPivot;
	let MassArm, MassWeight, MassProjectile;
	let InertiaArm, InertiaWeight;
	let ReleaseAngle;
	let ProjectileDiameter;
	let WindSpeed;
	let CalculateDrag;
	let ProjectileType;
	let CdragArray;

	// Reynolds number (Re) = 0.2*10^(i/10) i = 0 to 77
	const CdragArraySmooth = [
		120.0, 95.319, 75.715, 61.0, 50.0, 41.0, 32.5, 26.0, 21.5, 17.7, 14.4, 12.3, 10.2, 8.45, 7.0,
		5.9, 5.0, 4.28, 3.65, 3.12, 2.65, 2.3, 1.96, 1.69, 1.47, 1.28, 1.15, 1.0, 0.895, 0.82, 0.745,
		0.68, 0.63, 0.58, 0.55, 0.52, 0.49, 0.465, 0.445, 0.435, 0.41, 0.4, 0.39, 0.387, 0.387, 0.39,
		0.393, 0.395, 0.415, 0.44, 0.465, 0.48, 0.486, 0.493, 0.498, 0.505, 0.51, 0.513, 0.516, 0.518,
		0.515, 0.5, 0.46, 0.072, 0.068, 0.08, 0.095, 0.113, 0.13, 0.145, 0.158, 0.17, 0.18, 0.189,
		0.197, 0.205, 0.212, 0.219
	];

	const CdragArrayBaseball = [
		120.0, 95.319, 75.715, 61.0, 50.0, 41.0, 32.5, 26.0, 21.5, 17.7, 14.4, 12.3, 10.2, 8.45, 7.0,
		5.9, 5.0, 4.28, 3.65, 3.12, 2.65, 2.3, 1.96, 1.69, 1.47, 1.28, 1.15, 1.0, 0.895, 0.82, 0.745,
		0.68, 0.63, 0.58, 0.55, 0.52, 0.49, 0.465, 0.445, 0.435, 0.41, 0.4, 0.39, 0.387, 0.387, 0.39,
		0.393, 0.395, 0.415, 0.44, 0.465, 0.48, 0.486, 0.493, 0.498, 0.505, 0.51, 0.513, 0.516, 0.3,
		0.385, 0.375, 0.375, 0.375, 0.376, 0.376, 0.376, 0.377, 0.377, 0.377, 0.377, 0.378, 0.378,
		0.378, 0.378, 0.379, 0.379, 0.379
	];

	const CdragArrayGolfBall = [
		120.0, 95.319, 75.715, 61.0, 50.0, 41.0, 32.5, 26.0, 21.5, 17.7, 14.4, 12.3, 10.2, 8.45, 7.0,
		5.9, 5.0, 4.28, 3.65, 3.12, 2.65, 2.3, 1.96, 1.69, 1.47, 1.28, 1.15, 1.0, 0.895, 0.82, 0.745,
		0.68, 0.63, 0.58, 0.55, 0.52, 0.49, 0.465, 0.445, 0.435, 0.41, 0.4, 0.39, 0.387, 0.387, 0.39,
		0.393, 0.395, 0.415, 0.44, 0.465, 0.48, 0.486, 0.48, 0.295, 0.244, 0.236, 0.236, 0.24, 0.245,
		0.253, 0.257, 0.26, 0.264, 0.268, 0.271, 0.274, 0.276, 0.278, 0.279, 0.28, 0.2805, 0.281, 0.281,
		0.281, 0.281, 0.281, 0.281
	];

	function Main(MotionVariablesInitial) {
		let Stage = 1;
		let m = MotionVariablesInitial.length;
		let Check = 0;
		let RelativeErrorSum = 0;
		let AllowableRelativeErrorSum = 1e-6;
		let MotionVariables = new Array(m);
		let MotionVariablesNew = new Array(m);

		let NumericalMethodOutput;

		// Time parameters
		let h = 0.005,
			h1;
		let hmin = 1e-9;
		let hmax = 0.1;
		let scale = 1.0;
		let scalemax = 5.0;
		let scalemin = 0.2;
		let time = 0;

		// Output parameters
		let ResultTimestep = 1.0 / 60.0;
		let NextResultTime = ResultTimestep;
		let MotionVariablesInterpolated;
		let interpolationOutput = new InterpolationOutput();
		let results = new Results();
		let SlingTension = [0];

		let Transition2to3 = false;
		let transition = new Transition(false, h);
		let transitionResults = new TransitionResults();

		let error_MinStepSize = false;

		results = ResultsCompiler(results, MotionVariablesInitial, time, Check, 0, Stage);
		MotionVariables = MotionVariablesInitial;

		if (HeightOfPivot + results.CartesianPoints.Projectile[0][1] > 0) Stage = 2; // This deals with the case where the pivot is so heigh that the projectile can't reach the ground.

		let LoopNumber = 0;
		let LoopLimit = 100000;

		while (LoopNumber < LoopLimit) {
			LoopNumber = LoopNumber + 1;

			NumericalMethodOutput = FourthAndFifthRungeKutta(MotionVariables, h, Stage);

			MotionVariablesNew = NumericalMethodOutput.MotionVariablesNew;
			RelativeErrorSum = NumericalMethodOutput.RelativeErrorSum;

			//--- Scale Factor to Update Step Size ---
			scale = Math.pow((AllowableRelativeErrorSum * h) / (2.0 * RelativeErrorSum), 0.2);

			// --- Force Scale Factor and Step Size to be within prescribed bounds ---
			if (scale < scalemin) {
				scale = scalemin;
			} else if (scale > scalemax) {
				scale = scalemax;
			}
			h1 = scale * h;
			if (h1 < hmin) {
				h1 = hmin;
				error_MinStepSize = true;
			} else if (h1 > hmax) {
				h1 = hmax;
			}

			if (RelativeErrorSum < AllowableRelativeErrorSum || h1 == hmin) {
				if (transition.condition) {
					// ----- Transition Code -----
					transitionResults = TransitionResultsCompiler(
						transitionResults,
						MotionVariablesNew,
						time,
						Stage
					);
					if (Stage == 2) {
						results = ResultsCompiler(results, MotionVariablesNew, time, 0, 0, 0);
						Transition2to3 = true;
					}
					if (!Transition2to3) Stage += 1;
					transition.condition = false;
				}

				if (!Transition2to3)
					transition = TransitionCheck(MotionVariables, MotionVariablesNew, Stage, h1);

				if (transition.condition) {
					h = transition.StepSize;
				} else {
					while (time + h > NextResultTime) {
						// ----- Results Code -----
						interpolationOutput = Interpolation(
							MotionVariables,
							MotionVariablesNew,
							time,
							time + h,
							NextResultTime,
							Stage
						);
						MotionVariablesInterpolated = interpolationOutput.MotionVariables;
						Check = interpolationOutput.Check;
						SlingTension = TensionInSling(SlingTension, MotionVariablesInterpolated, Stage);
						results = ResultsCompiler(
							results,
							MotionVariablesInterpolated,
							NextResultTime,
							Check,
							SlingTension[SlingTension.Count - 1],
							Stage
						);
						NextResultTime += ResultTimestep;
					}

					if (Transition2to3) {
						// ----- Transition Code -----
						MotionVariablesNew = MotionVariablesConvert2to3(MotionVariablesNew);
						Stage += 1;
						Transition2to3 = false;
					}

					MotionVariables = MotionVariablesNew; // Update Motion Variables

					if (Stage == 4) {
						// ----- Record Final Result -----
						Check = CheckFunction(MotionVariables, Stage);
						SlingTension = TensionInSling(SlingTension, MotionVariables, Stage);
						results = ResultsCompiler(
							results,
							MotionVariables,
							time,
							Check,
							SlingTension[SlingTension.Count - 1],
							Stage
						);
						results.TransitionResults = transitionResults;
						break;
					}

					time = time + h;
					h = h1;
				}
			} else {
				h = h1;
			}
			if (Stage == 1 && time > 10) {
				results.ErrorMessages.push('The simulation timed out in Stage 1.');
				break;
			} else if (Stage == 2 && time > 20) {
				results.ErrorMessages.push('The simulation timed out in Stage 2.');
				break;
			} else if (Stage == 3 && time > 3 * 60) {
				results.ErrorMessages.push('The simulation timed out in Stage 3.');
				break;
			}
		}

		//Results.ErrorMessages.push("Loops = " + LoopNumber + " ");

		if (LoopNumber >= LoopLimit)
			results.ErrorMessages.push(
				'The simulation was cut short because it used the maximum allowable number of loops. (' +
					LoopNumber +
					')'
			);

		// --- Check Results for Errors ---
		let ArmSlingPoint_y = [];
		let Weight_y = [];

		for (let i = 0; i < results.CartesianPoints.ArmSlingPoint.Count; i++)
			ArmSlingPoint_y.push(results.CartesianPoints.ArmSlingPoint[i][1]);
		if (Math.min(...ArmSlingPoint_y) < -HeightOfPivot)
			results.ErrorMessages.push('The trebuchet arm went through the ground.');

		for (let i = 0; i < results.CartesianPoints.WeightCG.Count; i++)
			Weight_y.push(results.CartesianPoints.WeightCG[i][1]);
		if (Math.min(...Weight_y) < -HeightOfPivot)
			results.ErrorMessages.push('The counterweight went through the ground.');

		for (let i = 0; i < results.SlingTension.Count; i++) {
			if (!results.SlingTension[i]) {
				results.ErrorMessages.push('The sling was not in tension for the whole launch.');
				break;
			}
		}

		if (error_MinStepSize)
			results.ErrorMessages.push(
				'The integration step size went to the minimum allowed value, so the simulation results may be questionable.'
			);

		if (results.Check_peak > 0.00001)
			results.ErrorMessages.push(
				'The check function went to ' +
					Round(results.Check_peak, 5) +
					', which is larger than expected, so the simulation results may be questionable.'
			);
		// --------------------------------
		// ---Calculate Efficiency---------
		if (Stage == 4) {
			let PotentialEnergyWeight =
				MassWeight *
				GravitationalAcceleration *
				(results.CartesianPoints.WeightArmPoint[0][1] + LengthArmShort);
			let PotentialEnergyArm =
				MassArm * GravitationalAcceleration * (results.CartesianPoints.ArmCG[0][1] - PivotToArmCG);
			let PotentialEnergyProjectile =
				MassProjectile *
				GravitationalAcceleration *
				(results.CartesianPoints.Projectile[0][1] -
					LengthArmLong -
					LengthSling * Math.cos(Math.PI / 4));
			let PotentialEnergyTotal =
				PotentialEnergyWeight + PotentialEnergyArm + PotentialEnergyProjectile;
			let ActualReleaseKineticEnergy =
				0.5 * MassProjectile * Math.pow(results.TransitionResults.ReleaseVelocity, 2);
			let ActualReleasePotentialEnergy =
				MassProjectile *
				GravitationalAcceleration *
				(results.ReleaseCartesianPoints.Projectile[0][1] -
					results.CartesianPoints.Projectile[0][1]);
			let IdealReleaseVelocity = Math.sqrt((2 * PotentialEnergyTotal) / MassProjectile);
			let IdealHangTime =
				(Math.sqrt(
					-2 *
						GravitationalAcceleration *
						(-HeightOfPivot - (LengthArmLong + LengthSling * Math.cos(Math.PI / 4))) +
						Math.pow(IdealReleaseVelocity / Math.sqrt(2), 2)
				) +
					IdealReleaseVelocity / Math.sqrt(2)) /
				GravitationalAcceleration;
			let IdealRange =
				(IdealHangTime * IdealReleaseVelocity) / Math.sqrt(2) - LengthSling / Math.sqrt(2);
			//double NoDragHangTime = (Math.sqrt(-2 * GravitationalAcceleration * (-HeightOfPivot - Results.ReleaseCartesianPoints.Projectile[0][1]) + Math.pow(Results.TransitionResults.ReleaseVelocity * Math.sin(ReleaseAngle), 2)) + Results.TransitionResults.ReleaseVelocity * Math.sin(ReleaseAngle)) / GravitationalAcceleration;
			//double NoDragRange = NoDragHangTime * Results.TransitionResults.ReleaseVelocity * Math.cos(ReleaseAngle) - Results.ReleaseCartesianPoints.Projectile[0][0];

			results.EnergyEfficiency =
				(ActualReleaseKineticEnergy + ActualReleasePotentialEnergy) /
				(PotentialEnergyWeight + PotentialEnergyArm);
			results.RangeEfficiency = results.CartesianPoints.Projectile.slice(-1)[0][0] / IdealRange;
			//Results.NoDragRangeEfficiency = NoDragRange / IdealRange;
		}
		// --------------------------------

		return results;
	}

	function FirstOrderDiff(MotionVariables, Stage) {
		let NICheck = MotionVariables[0];
		let NICheckp;

		if (Stage == 1) {
			// ---- Equations of Motion ----
			// ---------- STAGE 1 ----------

			let Aq = MotionVariables[1];
			let Wq = MotionVariables[2];
			let Sq = MotionVariables[3];
			let Aw = MotionVariables[4];
			let Ww = MotionVariables[5];
			let Sw =
				(-(LengthArmLong * Math.sin(Aq) + LengthSling * Math.sin(Aq + Sq)) * Aw) /
				(LengthSling * Math.sin(Aq + Sq)); // Dependent Variable
			let Aqp, Wqp, Sqp, Awp, Wwp, Swp;

			if (LengthWeight == 0) {
				// ----- Stage 1 ------
				// --- Fixed Weight ---
				Aqp = Aw;
				Wqp = 0;
				Sqp = Sw;
				Awp =
					(GravitationalAcceleration * PivotToArmCG * MassArm * Math.sin(Aq) +
						LengthArmLong *
							MassProjectile *
							(LengthSling * Math.sin(Sq) * Math.pow(Aw + Sw, 2) +
								LengthSling *
									Math.cos(Sq) *
									((Math.cos(Aq + Sq) * Sw * (Sw + 2 * Aw)) / Math.sin(Aq + Sq) +
										(Math.cos(Aq + Sq) / Math.sin(Aq + Sq) +
											(LengthArmLong * Math.cos(Aq)) / (LengthSling * Math.sin(Aq + Sq))) *
											Aw *
											Aw) +
								(Math.sin(Aq) *
									(LengthArmLong * Math.sin(Sq) * Aw * Aw -
										LengthSling *
											((Math.cos(Aq + Sq) * Sw * (Sw + 2 * Aw)) / Math.sin(Aq + Sq) +
												(Math.cos(Aq + Sq) / Math.sin(Aq + Sq) +
													(LengthArmLong * Math.cos(Aq)) / (LengthSling * Math.sin(Aq + Sq))) *
													Aw *
													Aw))) /
									Math.sin(Aq + Sq))) /
					(InertiaArm +
						MassArm * PivotToArmCG * PivotToArmCG +
						(MassProjectile * LengthArmLong * LengthArmLong * Math.pow(Math.sin(Aq), 2)) /
							Math.pow(Math.sin(Aq + Sq), 2) -
						MassProjectile *
							LengthArmLong *
							LengthArmLong *
							(-1 + (2 * Math.sin(Aq) * Math.cos(Sq)) / Math.sin(Aq + Sq)));
				Wwp = 0;
				Swp =
					(-Math.cos(Aq + Sq) * Sw * (Sw + 2 * Aw)) / Math.sin(Aq + Sq) -
					(Math.cos(Aq + Sq) / Math.sin(Aq + Sq) +
						(LengthArmLong * Math.cos(Aq)) / (LengthSling * Math.sin(Aq + Sq))) *
						Aw *
						Aw -
					((LengthArmLong * Math.sin(Aq) + LengthSling * Math.sin(Aq + Sq)) * Awp) /
						(LengthSling * Math.sin(Aq + Sq));

				// --- Check Function ---
				NICheckp = -GravitationalAcceleration * PivotToArmCG * MassArm * Math.sin(Aq) * Aw;
			} // ----- Stage 1 -----
			else {
				// --- Feee Weight ---
				Aqp = Aw;
				Wqp = Ww;
				Sqp = Sw;

				//--- Coefficient Matrix Components ---
				let z11, z12, z21, z22;
				let r1, r2;
				z11 =
					MassProjectile *
						LengthArmLong *
						LengthArmLong *
						(-1 + (2 * Math.sin(Aq) * Math.cos(Sq)) / Math.sin(Aq + Sq)) -
					InertiaArm -
					InertiaWeight -
					MassArm * PivotToArmCG * PivotToArmCG -
					(MassProjectile * LengthArmLong * LengthArmLong * Math.pow(Math.sin(Aq), 2)) /
						Math.pow(Math.sin(Aq + Sq), 2) -
					MassWeight *
						(LengthArmShort * LengthArmShort +
							LengthWeight * LengthWeight +
							2 * LengthArmShort * LengthWeight * Math.cos(Wq));
				z12 =
					-InertiaWeight -
					LengthWeight * MassWeight * (LengthWeight + LengthArmShort * Math.cos(Wq));
				z21 =
					-InertiaWeight -
					LengthWeight * MassWeight * (LengthWeight + LengthArmShort * Math.cos(Wq));
				z22 = -InertiaWeight - MassWeight * LengthWeight * LengthWeight;

				//--- Right Hand Side Terms -----------
				r1 =
					GravitationalAcceleration * PivotToArmCG * MassArm * Math.sin(Aq) +
					LengthArmLong *
						LengthSling *
						MassProjectile *
						(Math.sin(Sq) * Math.pow(Aw + Sw, 2) +
							Math.cos(Sq) *
								((Math.cos(Aq + Sq) * Sw * (Sw + 2 * Aw)) / Math.sin(Aq + Sq) +
									(Math.cos(Aq + Sq) / Math.sin(Aq + Sq) +
										(LengthArmLong * Math.cos(Aq)) / (LengthSling * Math.sin(Aq + Sq))) *
										Aw *
										Aw)) +
					(LengthArmLong *
						MassProjectile *
						Math.sin(Aq) *
						(LengthArmLong * Math.sin(Sq) * Aw * Aw -
							LengthSling *
								((Math.cos(Aq + Sq) * Sw * (Sw + 2 * Aw)) / Math.sin(Aq + Sq) +
									(Math.cos(Aq + Sq) / Math.sin(Aq + Sq) +
										(LengthArmLong * Math.cos(Aq)) / (LengthSling * Math.sin(Aq + Sq))) *
										Aw *
										Aw))) /
						Math.sin(Aq + Sq) -
					GravitationalAcceleration *
						MassWeight *
						(LengthArmShort * Math.sin(Aq) + LengthWeight * Math.sin(Aq + Wq)) -
					LengthArmShort *
						LengthWeight *
						MassWeight *
						Math.sin(Wq) *
						(Aw * Aw - Math.pow(Aw + Ww, 2));
				r2 =
					-LengthWeight *
					MassWeight *
					(GravitationalAcceleration * Math.sin(Aq + Wq) + LengthArmShort * Math.sin(Wq) * Aw * Aw);

				//--- _wp = Inv(Z)*R ------------------
				Awp = -(r1 * z22 - r2 * z12) / (z11 * z22 - z12 * z21);
				Wwp = (r1 * z21 - r2 * z11) / (z11 * z22 - z12 * z21);
				Swp =
					(-Math.cos(Aq + Sq) * Sw * (Sw + 2 * Aw)) / Math.sin(Aq + Sq) -
					(Math.cos(Aq + Sq) / Math.sin(Aq + Sq) +
						(LengthArmLong * Math.cos(Aq)) / (LengthSling * Math.sin(Aq + Sq))) *
						Aw *
						Aw -
					((LengthArmLong * Math.sin(Aq) + LengthSling * Math.sin(Aq + Sq)) * Awp) /
						(LengthSling * Math.sin(Aq + Sq));

				// --- Check Function -----------------
				NICheckp =
					GravitationalAcceleration *
					(LengthWeight * MassWeight * Math.sin(Aq + Wq) * Ww -
						(PivotToArmCG * MassArm * Math.sin(Aq) -
							MassWeight * (LengthArmShort * Math.sin(Aq) + LengthWeight * Math.sin(Aq + Wq))) *
							Aw);
			}
			let MotionDerivatives = [NICheckp, Aqp, Wqp, Sqp, Awp, Wwp, Swp];
			return MotionDerivatives;
		} else if (Stage == 2) {
			// ---- Equations of Motion ----
			// ---------- STAGE 2 ----------

			let Aq = MotionVariables[1];
			let Wq = MotionVariables[2];
			let Sq = MotionVariables[3];
			let Aw = MotionVariables[4];
			let Ww = MotionVariables[5];
			let Sw = MotionVariables[6];
			let Aqp, Wqp, Sqp, Awp, Wwp, Swp;

			if (LengthWeight == 0) {
				// ----- Stage 2 ------
				// --- Fixed Weight ---
				Aqp = Aw;
				Wqp = 0;
				Sqp = Sw;

				//--- Coefficient Matrix Components ---
				let z11, z12, z22;
				let r1, r2;
				z11 =
					-InertiaArm -
					MassArm * PivotToArmCG * PivotToArmCG -
					MassProjectile *
						(LengthArmLong * LengthArmLong +
							LengthSling * LengthSling +
							2 * LengthArmLong * LengthSling * Math.cos(Sq));
				z12 = -LengthSling * MassProjectile * (LengthSling + LengthArmLong * Math.cos(Sq));
				z22 = -MassProjectile * LengthSling * LengthSling;

				//--- Right Hand Side Terms -----------
				r1 =
					GravitationalAcceleration * PivotToArmCG * MassArm * Math.sin(Aq) +
					GravitationalAcceleration *
						MassProjectile *
						(LengthArmLong * Math.sin(Aq) + LengthSling * Math.sin(Aq + Sq)) -
					LengthArmLong *
						LengthSling *
						MassProjectile *
						Math.sin(Sq) *
						(Aw * Aw - Math.pow(Aw + Sw, 2));
				r2 =
					LengthSling *
					MassProjectile *
					(GravitationalAcceleration * Math.sin(Aq + Sq) - LengthArmLong * Math.sin(Sq) * Aw * Aw);

				//--- _wp = Inv(Z)*R ------------------
				Awp = -(r1 * z22 - r2 * z12) / (z11 * z22 - z12 * z12);
				Wwp = 0;
				Swp = (r1 * z12 - r2 * z11) / (z11 * z22 - z12 * z12);

				// --- Check Function -----------------
				NICheckp =
					-GravitationalAcceleration *
					(LengthSling * MassProjectile * Math.sin(Aq + Sq) * Sw +
						(PivotToArmCG * MassArm * Math.sin(Aq) +
							MassProjectile * (LengthArmLong * Math.sin(Aq) + LengthSling * Math.sin(Aq + Sq))) *
							Aw);
			} // ----- Stage 2 -----
			else {
				// --- Feee Weight ---
				Aqp = Aw;
				Wqp = Ww;
				Sqp = Sw;

				//--- Coefficient Matrix Components ---
				let z11, z12, z13, z22, z33;
				let r1, r2, r3;
				z11 =
					-InertiaArm -
					InertiaWeight -
					MassArm * Math.pow(PivotToArmCG, 2) -
					MassProjectile *
						(Math.pow(LengthArmLong, 2) +
							Math.pow(LengthSling, 2) +
							2 * LengthArmLong * LengthSling * Math.cos(Sq)) -
					MassWeight *
						(Math.pow(LengthArmShort, 2) +
							Math.pow(LengthWeight, 2) +
							2 * LengthArmShort * LengthWeight * Math.cos(Wq));
				z12 =
					-InertiaWeight -
					LengthWeight * MassWeight * (LengthWeight + LengthArmShort * Math.cos(Wq));
				z13 = -LengthSling * MassProjectile * (LengthSling + LengthArmLong * Math.cos(Sq));
				z22 = -InertiaWeight - MassWeight * Math.pow(LengthWeight, 2);
				z33 = -MassProjectile * Math.pow(LengthSling, 2);

				//--- Right Hand Side Terms -----------
				r1 =
					GravitationalAcceleration * PivotToArmCG * MassArm * Math.sin(Aq) +
					GravitationalAcceleration *
						MassProjectile *
						(LengthArmLong * Math.sin(Aq) + LengthSling * Math.sin(Aq + Sq)) -
					GravitationalAcceleration *
						MassWeight *
						(LengthArmShort * Math.sin(Aq) + LengthWeight * Math.sin(Aq + Wq)) -
					LengthArmLong *
						LengthSling *
						MassProjectile *
						Math.sin(Sq) *
						(Math.pow(Aw, 2) - Math.pow(Aw + Sw, 2)) -
					LengthArmShort *
						LengthWeight *
						MassWeight *
						Math.sin(Wq) *
						(Math.pow(Aw, 2) - Math.pow(Aw + Ww, 2));
				r2 =
					-LengthWeight *
					MassWeight *
					(GravitationalAcceleration * Math.sin(Aq + Wq) +
						LengthArmShort * Math.sin(Wq) * Math.pow(Aw, 2));
				r3 =
					LengthSling *
					MassProjectile *
					(GravitationalAcceleration * Math.sin(Aq + Sq) -
						LengthArmLong * Math.sin(Sq) * Math.pow(Aw, 2));

				//--- _wp = Inv(Z)*R ------------------
				Awp =
					(r1 * z22 * z33 - r2 * z12 * z33 - r3 * z13 * z22) /
					(z22 * Math.pow(z13, 2) - z33 * (z11 * z22 - Math.pow(z12, 2)));
				Wwp =
					-(r1 * z12 * z33 - r3 * z12 * z13 - r2 * (z11 * z33 - Math.pow(z13, 2))) /
					(z22 * Math.pow(z13, 2) - z33 * (z11 * z22 - Math.pow(z12, 2)));
				Swp =
					-(r1 * z13 * z22 - r2 * z12 * z13 - r3 * (z11 * z22 - Math.pow(z12, 2))) /
					(z22 * Math.pow(z13, 2) - z33 * (z11 * z22 - Math.pow(z12, 2)));

				// --- Check Function -----------------
				NICheckp =
					GravitationalAcceleration *
					(LengthWeight * MassWeight * Math.sin(Aq + Wq) * Ww -
						LengthSling * MassProjectile * Math.sin(Aq + Sq) * Sw -
						(PivotToArmCG * MassArm * Math.sin(Aq) +
							MassProjectile * (LengthArmLong * Math.sin(Aq) + LengthSling * Math.sin(Aq + Sq)) -
							MassWeight * (LengthArmShort * Math.sin(Aq) + LengthWeight * Math.sin(Aq + Wq))) *
							Aw);
			}
			let MotionDerivatives = [NICheckp, Aqp, Wqp, Sqp, Awp, Wwp, Swp];
			return MotionDerivatives;
		} else if (Stage == 3 || Stage == 4) {
			// ---- Equations of Motion ----
			// ---------- STAGE 3 ----------

			let Px = MotionVariables[1];
			let Py = MotionVariables[2];
			let Pvx = MotionVariables[3];
			let Pvy = MotionVariables[4];
			let Pxp, Pyp, Pvxp, Pvyp;

			Pxp = Pvx;
			Pyp = Pvy;

			if (CalculateDrag) {
				//Drag
				let AirDensity = 1.275; //kg/m^3
				let EffectiveArea = Math.PI * Math.pow(ProjectileDiameter / 2, 2); // m^2
				let DragCoefficient = Drag(Pxp - WindSpeed, Pyp); // For a sphere.

				// Delet when windspeed is validated: Pvxp = -0.5 * AirDensity * DragCoefficient * EffectiveArea * Pxp * Math.sqrt(Pxp * Pxp + Pyp * Pyp) / MassProjectile;
				// Delet when windspeed is validated: Pvyp = -GravitationalAcceleration - 0.5 * AirDensity * DragCoefficient * EffectiveArea * Pyp * Math.sqrt(Pxp * Pxp + Pyp * Pyp) / MassProjectile;
				Pvxp =
					(-0.5 *
						AirDensity *
						DragCoefficient *
						EffectiveArea *
						(Pxp - WindSpeed) *
						Math.sqrt(Math.pow(Pxp - WindSpeed, 2) + Pyp * Pyp)) /
					MassProjectile;
				Pvyp =
					-GravitationalAcceleration -
					(0.5 *
						AirDensity *
						DragCoefficient *
						EffectiveArea *
						Pyp *
						Math.sqrt(Math.pow(Pxp - WindSpeed, 2) + Pyp * Pyp)) /
						MassProjectile;

				// --- Check Function -----------------
				// Delet when windspeed is validated: NICheckp = 0.5 * AirDensity * DragCoefficient * EffectiveArea * Pvx * Pvx * Math.sqrt(Pvx * Pvx + Pvy * Pvy) + 0.5 * Pvy * (2 * GravitationalAcceleration * MassProjectile + AirDensity * DragCoefficient * EffectiveArea * Pvy * Math.sqrt(Pvx * Pvx + Pvy * Pvy));
				NICheckp =
					0.5 *
						AirDensity *
						DragCoefficient *
						EffectiveArea *
						Pvx *
						(Pxp - WindSpeed) *
						Math.sqrt(Math.pow(Pxp - WindSpeed, 2) + Pvy * Pvy) +
					0.5 *
						Pvy *
						(2 * GravitationalAcceleration * MassProjectile +
							AirDensity *
								DragCoefficient *
								EffectiveArea *
								Pvy *
								Math.sqrt(Math.pow(Pxp - WindSpeed, 2) + Pvy * Pvy));
			} else {
				Pvxp = 0;
				Pvyp = -GravitationalAcceleration;

				// --- Check Function -----------------
				NICheckp = GravitationalAcceleration * MassProjectile * Pvy;
			}
			let MotionDerivatives = [NICheckp, Pxp, Pyp, Pvxp, Pvyp, 0, 0];
			return MotionDerivatives;
		} else {
			let error = [];
			return error;
		}
		// ---- Equations of Motion ----
	} // ------------ END ------------

	function FourthAndFifthRungeKutta(MotionVariables, h, Stage) {
		let k1, k2, k3, k4, k5, k6;
		let IntermediateValue = new Array(MotionVariables.length);
		let MotionVariables4thOrder = new Array(MotionVariables.length);
		let MotionVariables5thOrder = new Array(MotionVariables.length);
		let RelativeError = new Array(MotionVariables.length);

		//--- Fourth-Order Runge Kutta Numerical Integration ---
		k1 = FirstOrderDiff(MotionVariables, Stage);
		for (let i = 0; i < MotionVariables.length; i++)
			IntermediateValue[i] = MotionVariables[i] + (h * k1[i]) / 2.0;
		k2 = FirstOrderDiff(IntermediateValue, Stage);
		for (let i = 0; i < MotionVariables.length; i++)
			IntermediateValue[i] = MotionVariables[i] + (h * k2[i]) / 2.0;
		k3 = FirstOrderDiff(IntermediateValue, Stage);
		for (let i = 0; i < MotionVariables.length; i++)
			IntermediateValue[i] = MotionVariables[i] + h * k3[i];
		k4 = FirstOrderDiff(IntermediateValue, Stage);
		for (let i = 0; i < MotionVariables.length; i++)
			MotionVariables4thOrder[i] =
				MotionVariables[i] + (h * (k1[i] + 2.0 * k2[i] + 2.0 * k3[i] + k4[i])) / 6.0;

		//--- Fifth-Order Runge Kutta Numerical Integration ---
		k1 = FirstOrderDiff(MotionVariables, Stage);
		for (let i = 0; i < MotionVariables.length; i++)
			IntermediateValue[i] = MotionVariables[i] + (h * k1[i]) / 4.0;
		k2 = FirstOrderDiff(IntermediateValue, Stage);
		for (let i = 0; i < MotionVariables.length; i++)
			IntermediateValue[i] = MotionVariables[i] + (h * k1[i]) / 8.0 + (h * k2[i]) / 8.0;
		k3 = FirstOrderDiff(IntermediateValue, Stage);
		for (let i = 0; i < MotionVariables.length; i++)
			IntermediateValue[i] = MotionVariables[i] - (h * k2[i]) / 2.0 + h * k3[i];
		k4 = FirstOrderDiff(IntermediateValue, Stage);
		for (let i = 0; i < MotionVariables.length; i++)
			IntermediateValue[i] =
				MotionVariables[i] + (h * k1[i] * 3.0) / 16.0 + (h * k4[i] * 9.0) / 16.0;
		k5 = FirstOrderDiff(IntermediateValue, Stage);
		for (let i = 0; i < MotionVariables.length; i++)
			IntermediateValue[i] =
				MotionVariables[i] -
				(h * k1[i] * 3.0) / 7.0 +
				(h * k2[i] * 2.0) / 7.0 +
				(h * k3[i] * 12.0) / 7.0 -
				(h * k4[i] * 12.0) / 7.0 +
				(h * k5[i] * 8.0) / 7.0;
		k6 = FirstOrderDiff(IntermediateValue, Stage);
		for (let i = 0; i < MotionVariables.length; i++)
			MotionVariables5thOrder[i] =
				MotionVariables[i] +
				(h * (7.0 * k1[i] + 32.0 * k3[i] + 12.0 * k4[i] + 32.0 * k5[i] + 7.0 * k6[i])) / 90.0;

		//--- Relative Error ---
		for (let i = 1; i < MotionVariables.length; i++)
			RelativeError[i] = Math.abs(MotionVariables4thOrder[i] - MotionVariables5thOrder[i]);
		let RelativeErrorSum = RelativeError.reduce((a, b) => a + b, 0);

		let FourthAndFifthRKOutput = new NumericalMethod(RelativeErrorSum, MotionVariables5thOrder);
		return FourthAndFifthRKOutput;
	}

	function Interpolation(MotionVariables1, MotionVariables2, time1, time2, timeInterpolate, Stage) {
		let MotionDerivatives1 = FirstOrderDiff(MotionVariables1, Stage);
		let MotionDerivatives2 = FirstOrderDiff(MotionVariables2, Stage);
		let coeffs;
		let MotionVariablesInterpolated = new Array(MotionVariables1.length);
		let interpolationOutput = new InterpolationOutput();

		for (let i = 0; i < MotionVariables1.length; i++) {
			coeffs = CubicSpline(
				time1,
				MotionVariables1[i],
				time2,
				MotionVariables2[i],
				MotionDerivatives1[i],
				MotionDerivatives2[i]
			);
			MotionVariablesInterpolated[i] =
				coeffs[0] * Math.pow(timeInterpolate, 3) +
				coeffs[1] * Math.pow(timeInterpolate, 2) +
				coeffs[2] * timeInterpolate +
				coeffs[3];
		}
		interpolationOutput.MotionVariables = MotionVariablesInterpolated;

		let Check1 = CheckFunction(MotionVariables1, Stage);
		let Check2 = CheckFunction(MotionVariables2, Stage);
		interpolationOutput.Check =
			Check1 + ((timeInterpolate - time1) * (Check2 - Check1)) / (time2 - time1);

		return interpolationOutput;
	}

	function CheckFunction(MotionVariables, Stage) {
		let Check = 0;

		if (Stage == 1) {
			// ------- Check Function ------
			// ---------- STAGE 1 ----------
			let NICheck = MotionVariables[0];
			let Aq = MotionVariables[1];
			let Wq = MotionVariables[2];
			let Sq = MotionVariables[3];
			let Aw = MotionVariables[4];
			let Ww = MotionVariables[5];
			let Sw = MotionVariables[6];

			if (LengthWeight == 0) {
				Check =
					NICheck +
					0.5 *
						(InertiaArm +
							MassArm * PivotToArmCG * PivotToArmCG +
							MassProjectile *
								LengthArmLong *
								LengthArmLong *
								(1 +
									Math.pow(Math.sin(Aq), 2) / Math.pow(Math.sin(Aq + Sq), 2) -
									(2 * Math.sin(Aq) * Math.cos(Sq)) / Math.sin(Aq + Sq))) *
						Aw *
						Aw;
			} else {
				Check =
					NICheck +
					0.5 * InertiaArm * Aw * Aw +
					0.5 * InertiaWeight * Math.pow(Aw + Ww, 2) +
					0.5 * MassArm * PivotToArmCG * PivotToArmCG * Aw * Aw +
					0.5 *
						MassWeight *
						(LengthArmShort * LengthArmShort * Aw * Aw +
							LengthWeight * LengthWeight * Math.pow(Aw + Ww, 2) +
							2 * LengthArmShort * LengthWeight * Math.cos(Wq) * Aw * (Aw + Ww)) +
					0.5 *
						MassProjectile *
						LengthArmLong *
						LengthArmLong *
						(1 +
							Math.pow(Math.sin(Aq), 2) / Math.pow(Math.sin(Aq + Sq), 2) -
							(2 * Math.sin(Aq) * Math.cos(Sq)) / Math.sin(Aq + Sq)) *
						Aw *
						Aw;
			}
		} else if (Stage == 2) {
			// ------- Check Function ------
			// ---------- STAGE 2 ----------
			let NICheck = MotionVariables[0];
			let Aq = MotionVariables[1];
			let Wq = MotionVariables[2];
			let Sq = MotionVariables[3];
			let Aw = MotionVariables[4];
			let Ww = MotionVariables[5];
			let Sw = MotionVariables[6];

			if (LengthWeight == 0) {
				Check =
					NICheck +
					0.5 * InertiaArm * Aw * Aw +
					0.5 * MassArm * PivotToArmCG * PivotToArmCG * Aw * Aw +
					0.5 *
						MassProjectile *
						(LengthArmLong * LengthArmLong * Aw * Aw +
							LengthSling * LengthSling * Math.pow(Aw + Sw, 2) +
							2 * LengthArmLong * LengthSling * Math.cos(Sq) * Aw * (Aw + Sw));
			} else {
				Check =
					NICheck +
					0.5 * InertiaArm * Aw * Aw +
					0.5 * InertiaWeight * Math.pow(Aw + Ww, 2) +
					0.5 * MassArm * PivotToArmCG * PivotToArmCG * Aw * Aw +
					0.5 *
						MassProjectile *
						(LengthArmLong * LengthArmLong * Aw * Aw +
							LengthSling * LengthSling * Math.pow(Aw + Sw, 2) +
							2 * LengthArmLong * LengthSling * Math.cos(Sq) * Aw * (Aw + Sw)) +
					0.5 *
						MassWeight *
						(LengthArmShort * LengthArmShort * Aw * Aw +
							LengthWeight * LengthWeight * Math.pow(Aw + Ww, 2) +
							2 * LengthArmShort * LengthWeight * Math.cos(Wq) * Aw * (Aw + Ww));
			}
		} else if (Stage == 3 || Stage == 4) {
			// ------- Check Function ------
			// ---------- STAGE 3 ----------
			let NICheck = MotionVariables[0];
			let Px = MotionVariables[1];
			let Py = MotionVariables[2];
			let Pvx = MotionVariables[3];
			let Pvy = MotionVariables[4];

			Check = NICheck + 0.5 * MassProjectile * (Pvx * Pvx + Pvy * Pvy);
		}
		return Check;
	}

	function ResultsCompiler(Results, MotionVariables, time, Check, SlingTension, Stage) {
		if (Stage == 0) {
			// Stage 0 is only for the transition condition.
			Results.ReleaseTime = time;
			Results.ReleaseAq = MotionVariables[1];
			Results.ReleaseWq = MotionVariables[2];
			Results.ReleaseSq = MotionVariables[3];
			Results.ReleaseCartesianPoints = GeneralizedCoordinatesToCartesianLocations(MotionVariables);
		} // These don't mean anything during Stage 0.
		else {
			Results.Time_list.push(time);
			Results.Check_list.push(Check);
		}
		if (Stage == 1 || Stage == 2) {
			Results.Aq_list.push(MotionVariables[1]);
			Results.Wq_list.push(MotionVariables[2]);
			Results.Sq_list.push(MotionVariables[3]);

			let CartisianPoints = GeneralizedCoordinatesToCartesianLocations(MotionVariables);
			Results.CartesianPoints.WeightCG.push(CartisianPoints.WeightCG[0]);
			Results.CartesianPoints.WeightArmPoint.push(CartisianPoints.WeightArmPoint[0]);
			Results.CartesianPoints.ArmSlingPoint.push(CartisianPoints.ArmSlingPoint[0]);
			Results.CartesianPoints.SlingEndPoint.push(CartisianPoints.Projectile[0]);
			Results.CartesianPoints.Projectile.push(CartisianPoints.Projectile[0]);
			Results.CartesianPoints.ArmCG.push(CartisianPoints.ArmCG[0]);

			let Drag_vs_Re = [0, 0];
			Results.Drag_vs_Re.push(Drag_vs_Re);

			// Energy Check
			//double armPE = MassArm * GravitationalAcceleration * CartisianPoints.ArmCG[0][1];
			//double armKEtranslational = 0.5 * MassArm * Math.pow(PivotToArmCG * MotionVariables[4], 2);
			//double armKErotational = 0.5 * InertiaArm * Math.pow(MotionVariables[4], 2);
			//double armEnergy = armPE + armKEtranslational + armKErotational;

			//double weightPE = MassWeight * GravitationalAcceleration * CartisianPoints.WeightCG[0][1];
			//double weightKEtranslational = 0.5 * MassWeight * (Math.pow(LengthArmShort * Math.sin(MotionVariables[1]) * MotionVariables[4] + LengthWeight * Math.sin(MotionVariables[1] + MotionVariables[2]) * (MotionVariables[4] + MotionVariables[5]), 2) + Math.pow(LengthArmShort * Math.cos(MotionVariables[1]) * MotionVariables[4] + LengthWeight * Math.cos(MotionVariables[1] + MotionVariables[2]) * (MotionVariables[4] + MotionVariables[5]), 2));
			//double weightKErotational = 0.5 * InertiaWeight * Math.pow(MotionVariables[4]+MotionVariables[5], 2);
			//double weightEnergy = weightPE + weightKEtranslational + weightKErotational;

			//double projectilePE = MassProjectile * GravitationalAcceleration * CartisianPoints.Projectile[0][1];
			//double projectileKEtranslational = 0.5 * MassProjectile * (Math.pow(LengthArmLong * Math.sin(MotionVariables[1]) * MotionVariables[4] + LengthSling * Math.sin(MotionVariables[1] + MotionVariables[3]) * (MotionVariables[4] + MotionVariables[6]), 2) + Math.pow(LengthArmLong * Math.cos(MotionVariables[1]) * MotionVariables[4] + LengthSling * Math.cos(MotionVariables[1] + MotionVariables[3]) * (MotionVariables[4] + MotionVariables[6]), 2));
			//double projectileKErotational = 0;
			//double projectileEnergy = projectilePE + projectileKEtranslational + projectileKErotational;

			//double totalEnergy = armEnergy + weightEnergy + projectileEnergy;

			//double angleV = Math.atan2(-(LengthArmLong * Math.sin(MotionVariables[1]) * MotionVariables[4] + LengthSling * Math.sin(MotionVariables[1] + MotionVariables[3]) * (MotionVariables[4] + MotionVariables[6])), -(LengthArmLong * Math.cos(MotionVariables[1]) * MotionVariables[4] + LengthSling * Math.cos(MotionVariables[1] + MotionVariables[3]) * (MotionVariables[4] + MotionVariables[6]))) * 180 / Math.PI;
		}
		if (Stage == 3 || Stage == 4) {
			// Stage 4 is for the last point before ending the simulation.
			Results.Aq_list.push(Results.ReleaseAq);
			Results.Wq_list.push(Results.ReleaseWq);
			Results.Sq_list.push(Results.ReleaseSq);

			Results.CartesianPoints.WeightCG.push(Results.ReleaseCartesianPoints.WeightCG[0]);
			Results.CartesianPoints.WeightArmPoint.push(Results.ReleaseCartesianPoints.WeightArmPoint[0]);
			Results.CartesianPoints.ArmSlingPoint.push(Results.ReleaseCartesianPoints.ArmSlingPoint[0]);
			Results.CartesianPoints.SlingEndPoint.push(Results.ReleaseCartesianPoints.Projectile[0]);
			Results.CartesianPoints.ArmCG.push(Results.ReleaseCartesianPoints.ArmCG[0]);

			let ProjectilePosition = [MotionVariables[1], MotionVariables[2]];
			Results.CartesianPoints.Projectile.push(ProjectilePosition);

			let Drag_vs_Re = [0, 0];
			if (CalculateDrag) {
				Drag_vs_Re[0] =
					(Math.sqrt(
						MotionVariables[3] * MotionVariables[3] + MotionVariables[4] * MotionVariables[4]
					) *
						ProjectileDiameter) /
					KinimaticViscosity;
				Drag_vs_Re[1] = Drag(MotionVariables[3], MotionVariables[4]);
			}
			Results.Drag_vs_Re.push(Drag_vs_Re);

			// Energy Check
			//double projectilePE = MassProjectile * GravitationalAcceleration * MotionVariables[2];
			//double projectileKEtranslational = 0.5 * MassProjectile * (Math.pow(MotionVariables[3], 2) + Math.pow(MotionVariables[4], 2));
			//double projectileKErotational = 0;
			//double projectileEnergy = projectilePE + projectileKEtranslational + projectileKErotational;
		}

		if (Stage != 0) {
			if (SlingTension < 0) Results.SlingTension.push(false);
			else Results.SlingTension.push(true);

			if (Math.abs(Check) > Results.Check_peak) Results.Check_peak = Math.abs(Check);
		}

		return Results;
	}

	function TransitionResultsCompiler(TransitionResults, MotionVariables, time, Stage) {
		if (Stage == 1) {
			TransitionResults.time12 = time;
			let Aq = MotionVariables[1];
			let Wq = MotionVariables[2];
			let Sq = MotionVariables[3];
			let Aw = MotionVariables[4];
			let Ww = MotionVariables[5];
			let Sw = MotionVariables[6];
			let Awp = FirstOrderDiff(MotionVariables, Stage)[4];

			TransitionResults.ActualForceOnProjectile =
				MassProjectile *
				(GravitationalAcceleration +
					(LengthSling *
						((Math.cos(Aq + Sq) * Sw * (Sw + 2 * Aw)) / Math.sin(Aq + Sq) +
							(Math.cos(Aq + Sq) / Math.sin(Aq + Sq) +
								(LengthArmLong * Math.cos(Aq)) / (LengthSling * Math.sin(Aq + Sq))) *
								Aw *
								Aw) -
						LengthArmLong * Math.sin(Sq) * Aw * Aw -
						LengthArmLong * (Math.cos(Sq) - Math.sin(Aq) / Math.sin(Aq + Sq)) * Awp) /
						Math.sin(Aq + Sq));
		} else if (Stage == 2) {
			let Aq = MotionVariables[1];
			let Sq = MotionVariables[3];
			let Aw = MotionVariables[4];
			let Sw = MotionVariables[6];
			let Pvx = -LengthArmLong * Math.cos(Aq) * Aw - LengthSling * Math.cos(Aq + Sq) * (Aw + Sw);
			let Pvy = -LengthArmLong * Math.sin(Aq) * Aw - LengthSling * Math.sin(Aq + Sq) * (Aw + Sw);
			//                       1/3          was  * Sq

			TransitionResults.time23 = time;
			TransitionResults.ActualReleaseAngle = (AngleFix(Math.atan2(Pvy, Pvx)) * 180) / Math.PI;
			TransitionResults.ReleaseVelocity = Math.sqrt(Pvx * Pvx + Pvy * Pvy);

			// Energy Check
			//double Wq = MotionVariables[2]; double Ww = MotionVariables[5];

			//double WeightCGY = -LengthArmShort * Math.cos(Aq) - LengthWeight * Math.cos(Aq + Wq); // Y
			//double ProjectileY = LengthArmLong * Math.cos(Aq) + LengthSling * Math.cos(Aq + Sq);  // Y
			//double ArmCGY = PivotToArmCG * Math.cos(Aq);                  // Y

			//double armPE = MassArm * GravitationalAcceleration * ArmCGY;
			//double armKEtranslational = 0.5 * MassArm * Math.pow(PivotToArmCG * MotionVariables[4], 2);
			//double armKErotational = 0.5 * InertiaArm * Math.pow(MotionVariables[4], 2);
			//double armEnergy = armPE + armKEtranslational + armKErotational;

			//double weightPE = MassWeight * GravitationalAcceleration * WeightCGY;
			//double weightKEtranslational = 0.5 * MassWeight * (Math.pow(LengthArmShort * Math.sin(MotionVariables[1]) * MotionVariables[4] + LengthWeight * Math.sin(MotionVariables[1] + MotionVariables[2]) * (MotionVariables[4] + MotionVariables[5]), 2) + Math.pow(LengthArmShort * Math.cos(MotionVariables[1]) * MotionVariables[4] + LengthWeight * Math.cos(MotionVariables[1] + MotionVariables[2]) * (MotionVariables[4] + MotionVariables[5]), 2));
			//double weightKErotational = 0.5 * InertiaWeight * Math.pow(MotionVariables[4] + MotionVariables[5], 2);
			//double weightEnergy = weightPE + weightKEtranslational + weightKErotational;

			//double projectilePE = MassProjectile * GravitationalAcceleration * ProjectileY;
			//double projectileKEtranslational = 0.5 * MassProjectile * (Math.pow(LengthArmLong * Math.sin(MotionVariables[1]) * MotionVariables[4] + LengthSling * Math.sin(MotionVariables[1] + MotionVariables[3]) * (MotionVariables[4] + MotionVariables[6]), 2) + Math.pow(LengthArmLong * Math.cos(MotionVariables[1]) * MotionVariables[4] + LengthSling * Math.cos(MotionVariables[1] + MotionVariables[3]) * (MotionVariables[4] + MotionVariables[6]), 2));
			//double projectileKErotational = 0;
			//double projectileEnergy = projectilePE + projectileKEtranslational + projectileKErotational;

			//double totalEnergy = armEnergy + weightEnergy + projectileEnergy;
		} else if (Stage == 3) {
			TransitionResults.timeEnd = time;
			TransitionResults.ActualEndHeightFromGround = MotionVariables[2] + HeightOfPivot;
		}
		return TransitionResults;
	}

	function TransitionCheck(MotionVariables, MotionVariables5thOrder, Stage, h) {
		let yes = false;
		let StepSize = h;
		let transition = new Transition(yes, StepSize);

		if (Stage == 1) {
			let Aq2 = MotionVariables5thOrder[1];
			let Wq2 = MotionVariables5thOrder[2];
			let Sq2 = MotionVariables5thOrder[3];
			let Aw2 = MotionVariables5thOrder[4];
			let Ww2 = MotionVariables5thOrder[5];
			let Sw2 = MotionVariables5thOrder[6];
			let Awp2 = FirstOrderDiff(MotionVariables5thOrder, Stage)[4];

			let NormalForceOnProjectile2 =
				MassProjectile *
				(GravitationalAcceleration +
					(LengthSling *
						((Math.cos(Aq2 + Sq2) * Sw2 * (Sw2 + 2 * Aw2)) / Math.sin(Aq2 + Sq2) +
							(Math.cos(Aq2 + Sq2) / Math.sin(Aq2 + Sq2) +
								(LengthArmLong * Math.cos(Aq2)) / (LengthSling * Math.sin(Aq2 + Sq2))) *
								Aw2 *
								Aw2) -
						LengthArmLong * Math.sin(Sq2) * Aw2 * Aw2 -
						LengthArmLong * (Math.cos(Sq2) - Math.sin(Aq2) / Math.sin(Aq2 + Sq2)) * Awp2) /
						Math.sin(Aq2 + Sq2));

			if (NormalForceOnProjectile2 < 0) {
				let Aq1 = MotionVariables[1];
				let Wq1 = MotionVariables[2];
				let Sq1 = MotionVariables[3];
				let Aw1 = MotionVariables[4];
				let Ww1 = MotionVariables[5];
				let Sw1 = MotionVariables[6];
				let Awp1 = FirstOrderDiff(MotionVariables, Stage)[4];

				let NormalForceOnProjectile1 =
					MassProjectile *
					(GravitationalAcceleration +
						(LengthSling *
							((Math.cos(Aq1 + Sq1) * Sw1 * (Sw1 + 2 * Aw1)) / Math.sin(Aq1 + Sq1) +
								(Math.cos(Aq1 + Sq1) / Math.sin(Aq1 + Sq1) +
									(LengthArmLong * Math.cos(Aq1)) / (LengthSling * Math.sin(Aq1 + Sq1))) *
									Aw1 *
									Aw1) -
							LengthArmLong * Math.sin(Sq1) * Aw1 * Aw1 -
							LengthArmLong * (Math.cos(Sq1) - Math.sin(Aq1) / Math.sin(Aq1 + Sq1)) * Awp1) /
							Math.sin(Aq1 + Sq1));

				transition.StepSize =
					((0 - NormalForceOnProjectile1) * h) /
					(NormalForceOnProjectile2 - NormalForceOnProjectile1);
				transition.condition = true;
			}
		} else if (Stage == 2) {
			let Aq1 = MotionVariables[1];
			let Sq1 = MotionVariables[3];
			let Aw1 = MotionVariables[4];
			let Sw1 = MotionVariables[6];
			let Aq2 = MotionVariables5thOrder[1];
			let Sq2 = MotionVariables5thOrder[3];
			let Aw2 = MotionVariables5thOrder[4];
			let Sw2 = MotionVariables5thOrder[6];

			let Pvx1 =
				-LengthArmLong * Math.cos(Aq1) * Aw1 - LengthSling * Math.cos(Aq1 + Sq1) * (Aw1 + Sw1);
			let Pvy1 =
				-LengthArmLong * Math.sin(Aq1) * Aw1 - LengthSling * Math.sin(Aq1 + Sq1) * (Aw1 + Sw1);
			let Pvx2 =
				-LengthArmLong * Math.cos(Aq2) * Aw2 - LengthSling * Math.cos(Aq2 + Sq2) * (Aw2 + Sw2);
			let Pvy2 =
				-LengthArmLong * Math.sin(Aq2) * Aw2 - LengthSling * Math.sin(Aq2 + Sq2) * (Aw2 + Sw2);
			//                     2/3          was      * Sq

			let ProjectileVelocityAngle1 = AngleFix(Math.atan2(Pvy1, Pvx1));
			let ProjectileVelocityAngle2 = AngleFix(Math.atan2(Pvy2, Pvx2));

			let DeltaA1 = AngleFix(ProjectileVelocityAngle1 - ReleaseAngle);
			let DeltaA2 = AngleFix(ProjectileVelocityAngle2 - ReleaseAngle);

			if ((DeltaA1 > 0 && DeltaA2 < 0) || (DeltaA1 > 0 && DeltaA2 < 0)) {
				transition.StepSize =
					((ReleaseAngle - ProjectileVelocityAngle1) * h) /
					(ProjectileVelocityAngle2 - ProjectileVelocityAngle1);
				transition.condition = true;
			}
		} else if (Stage == 3) {
			let Py1 = MotionVariables[2];
			let Py2 = MotionVariables5thOrder[2];

			if (Py2 < -HeightOfPivot) {
				if (Py1 > -HeightOfPivot) {
					let Pyp1 = MotionVariables[4];
					let Pyp2 = MotionVariables[4];
					let coeffs = CubicSpline(Py1, 0.0, Py2, h, 1.0 / Pyp1, 1.0 / Pyp2);

					transition.StepSize =
						coeffs[0] * Math.pow(-HeightOfPivot, 3) +
						coeffs[1] * Math.pow(-HeightOfPivot, 2) +
						coeffs[2] * -HeightOfPivot +
						coeffs[3];
				}
				transition.condition = true;
			}
		}

		return transition;
	}

	function TensionInSling(SlingTension, MotionVariables, Stage) {
		if (Stage == 1) {
			let Aq = MotionVariables[1];
			let Sq = MotionVariables[3];
			let Aw = MotionVariables[4];
			let Sw = MotionVariables[6];
			let Awp = FirstOrderDiff(MotionVariables, Stage)[4];
			SlingTension.push(
				MassProjectile *
					(LengthSling * Math.pow(Aw + Sw, 2) +
						LengthArmLong * Math.cos(Sq) * Aw * Aw -
						(LengthArmLong * Math.sin(Sq) * Aw * Aw -
							LengthSling *
								((Math.cos(Aq + Sq) * Sw * (Sw + 2 * Aw)) / Math.sin(Aq + Sq) +
									(Math.cos(Aq + Sq) / Math.sin(Aq + Sq) +
										(LengthArmLong * Math.cos(Aq)) / (LengthSling * Math.sin(Aq + Sq))) *
										Aw *
										Aw)) /
							Math.tan(Aq + Sq) -
						LengthArmLong *
							(Math.sin(Sq) +
								(Math.cos(Sq) - Math.sin(Aq) / Math.sin(Aq + Sq)) / Math.tan(Aq + Sq)) *
							Awp)
			);
		} else if (Stage == 2) {
			let Aq = MotionVariables[1];
			let Sq = MotionVariables[3];
			let Aw = MotionVariables[4];
			let Sw = MotionVariables[6];
			let Awp = FirstOrderDiff(MotionVariables, Stage)[4];
			SlingTension.push(
				MassProjectile *
					(LengthSling * Math.pow(Aw + Sw, 2) +
						LengthArmLong * Math.cos(Sq) * Aw * Aw -
						GravitationalAcceleration * Math.cos(Aq + Sq) -
						LengthArmLong * Math.sin(Sq) * Awp)
			);
		} else if (Stage == 3 || Stage == 4) SlingTension.push(0);

		return SlingTension;
	}

	function GeneralizedCoordinatesToCartesianLocations(GeneralizedCoordinates) {
		let Aq = GeneralizedCoordinates[1],
			Wq = GeneralizedCoordinates[2],
			Sq = GeneralizedCoordinates[3];

		let CartisianPoints = new CartesianPoints();

		CartisianPoints.WeightCG = [new Array(2)];
		CartisianPoints.WeightArmPoint = [new Array(2)];
		CartisianPoints.ArmSlingPoint = [new Array(2)];
		CartisianPoints.Projectile = [new Array(2)];
		CartisianPoints.ArmCG = [new Array(2)];

		CartisianPoints.WeightCG[0][0] =
			LengthArmShort * Math.sin(Aq) + LengthWeight * Math.sin(Aq + Wq); // X
		CartisianPoints.WeightCG[0][1] =
			-LengthArmShort * Math.cos(Aq) - LengthWeight * Math.cos(Aq + Wq); // Y
		CartisianPoints.WeightArmPoint[0][0] = LengthArmShort * Math.sin(Aq); // X
		CartisianPoints.WeightArmPoint[0][1] = -LengthArmShort * Math.cos(Aq); // Y
		CartisianPoints.ArmSlingPoint[0][0] = -LengthArmLong * Math.sin(Aq); // X
		CartisianPoints.ArmSlingPoint[0][1] = LengthArmLong * Math.cos(Aq); // Y
		CartisianPoints.Projectile[0][0] =
			-LengthArmLong * Math.sin(Aq) - LengthSling * Math.sin(Aq + Sq); // X
		CartisianPoints.Projectile[0][1] =
			LengthArmLong * Math.cos(Aq) + LengthSling * Math.cos(Aq + Sq); // Y
		CartisianPoints.ArmCG[0][0] = -PivotToArmCG * Math.sin(Aq); // X
		CartisianPoints.ArmCG[0][1] = PivotToArmCG * Math.cos(Aq); // Y

		return CartisianPoints;
	}

	function MotionVariablesConvert2to3(MotionVariables) {
		let Aq = MotionVariables[1];
		let Sq = MotionVariables[3];
		let Aw = MotionVariables[4];
		let Sw = MotionVariables[6];

		let Px = -LengthArmLong * Math.sin(Aq) - LengthSling * Math.sin(Aq + Sq);
		let Py = LengthArmLong * Math.cos(Aq) + LengthSling * Math.cos(Aq + Sq);
		let Pvx = -LengthArmLong * Math.cos(Aq) * Aw - LengthSling * Math.cos(Aq + Sq) * (Aw + Sw);
		let Pvy = -LengthArmLong * Math.sin(Aq) * Aw - LengthSling * Math.sin(Aq + Sq) * (Aw + Sw);
		//                        3/3     was      * Sq

		let NICheck = -0.5 * MassProjectile * (Pvx * Pvx + Pvy * Pvy);

		let Stage3MotionVariables = [NICheck, Px, Py, Pvx, Pvy, 0, 0];
		return Stage3MotionVariables;
	}

	function Drag(VelocityX, VelocityY) {
		let Re =
			(Math.sqrt(VelocityX * VelocityX + VelocityY * VelocityY) * ProjectileDiameter) /
			KinimaticViscosity;
		let DragCoefficient = 0.47;
		if (Re == 0) {
			DragCoefficient = 0;
		} else if (Re <= 0.2) {
			DragCoefficient = 24 / Re;
		} else if (Re >= 0.2 * Math.pow(10, (CdragArray.length - 1) / 10)) {
			DragCoefficient = CdragArray[CdragArray.length - 1];
		} else {
			let k = Math.floor(10 * Math.log10(5 * Re)); // Re = 0.2*10^(k/10)
			let ReBelow = 0.2 * Math.pow(10, k / 10);
			let ReAbove = 0.2 * Math.pow(10, (k + 1) / 10);
			DragCoefficient =
				CdragArray[k] +
				((Re - ReBelow) * (CdragArray[k + 1] - CdragArray[k])) / (ReAbove - ReBelow);
		}
		return DragCoefficient;
	}

	//----------------------------
	//--- Constants ---------------------------------------------------------|
	LengthArmShort = inputs.lengthArmShort; // m         |
	LengthArmLong = inputs.lengthArmLong; // m         |
	PivotToArmCG = inputs.pivotToArmCG; // m         |
	LengthWeight = inputs.lengthWeight; // m         |
	LengthSling = inputs.lengthSling; // m         |
	HeightOfPivot = inputs.heightOfPivot; // m         |
	MassArm = inputs.massArm; // kg        |
	MassWeight = inputs.massWeight; // kg        |
	MassProjectile = inputs.massProjectile; // kg        |
	InertiaArm = inputs.inertiaArm; // kg*m^2    |
	InertiaWeight = inputs.inertiaWeight; // kg*m^2    |
	ProjectileDiameter = inputs.projectileDiameter; // m         |
	WindSpeed = inputs.windSpeed; // m/s       |
	//--- Release Angle -----------------------------------------------------|
	ReleaseAngle = (inputs.releaseAngle * Math.PI) / 180; // rad       |
	//--- Options -----------------------------------------------------------|
	CalculateDrag = true; //|
	ProjectileType = inputs.projectile; //|
	//=======================================================================|
	ReleaseAngle = AngleFix(ReleaseAngle);

	if (LengthWeight == 0) {
		const MassArmNew = MassArm + MassWeight;
		const PivotToArmCGNew = (MassArm * PivotToArmCG - MassWeight * LengthArmShort) / MassArmNew;
		InertiaArm =
			InertiaArm +
			MassArm * PivotToArmCG * PivotToArmCG +
			InertiaWeight +
			MassWeight * LengthArmShort * LengthArmShort;
		MassArm = MassArmNew;
		PivotToArmCG = PivotToArmCGNew;
	}

	if (ProjectileType == 'baseball') CdragArray = CdragArrayBaseball;
	else if (ProjectileType == 'golfBall') CdragArray = CdragArrayGolfBall;
	else CdragArray = CdragArraySmooth;

	//--- Initial Conditions ------------------------------------------------
	let Aq, Wq, Sq, Aw, Ww, Sw;
	if (Math.abs(HeightOfPivot) < Math.abs(LengthArmLong)) {
		Aq = Math.PI - Math.acos(HeightOfPivot / LengthArmLong); // rad
		Wq = -Aq; // rad
		Sq = Math.PI - Math.asin(HeightOfPivot / LengthArmLong); // rad
	} else if (Math.abs(HeightOfPivot) < Math.abs(LengthArmLong) + Math.abs(LengthSling)) {
		Aq = (14 * Math.PI) / 15; // rad
		Wq = -Aq; // rad
		Sq =
			(3 * Math.PI) / 2 -
			Aq -
			Math.asin((HeightOfPivot - LengthArmLong * Math.cos(Math.PI - Aq)) / LengthSling); // rad
	} else {
		Aq = (14 * Math.PI) / 15; // rad
		Wq = -Aq; // rad
		Sq = Math.PI - Aq; // rad
	}
	Aw = 0; // rad/sec
	Ww = 0; // rad/sec
	Sw = 0; // rad/sec

	let MotionVariables = [0, Aq, Wq, Sq, Aw, Ww, Sw];
	// ----------------------------------------------------------------------

	let results = Main(MotionVariables); // Run Simulation

	return {
		WeightCG: results.CartesianPoints.WeightCG,
		WeightArm: results.CartesianPoints.WeightArmPoint,
		ArmSling: results.CartesianPoints.ArmSlingPoint,
		Projectile: results.CartesianPoints.Projectile,
		SlingEnd: results.CartesianPoints.SlingEndPoint,
		ArmCG: results.CartesianPoints.ArmCG,
		MinMax: results.getMinMax(),
		Time: results.Time_list,
		SlingTension: results.SlingTension,
		ErrorMessages: results.ErrorMessages,
		EnergyEfficiency: results.EnergyEfficiency,
		RangeEfficiency: results.RangeEfficiency,
		ReleaseVelocity: results.TransitionResults.ReleaseVelocity,
		ReleasePositon: results.ReleaseCartesianPoints.Projectile,
		Drag_vs_Re: results.Drag_vs_Re
	};
}

// -- Cubic Spline Interpolation -- //
// Input: Points (x1,y1) and (x2,y2) and derivatives m1 and m2 at those points.
// Output: coeffs = {a,b,c,d} for the interpolating cubic polynomial a*x^3 + b*x^2 + c*x + d.
function CubicSpline(x1, y1, x2, y2, m1, m2) {
	let coeffs = new Array(4);
	let xd = x1 - x2;
	let xd3 = xd * xd * xd;
	let yd = y1 - y2;

	coeffs[0] = ((m1 + m2) * xd - 2 * yd) / xd3;
	coeffs[1] =
		(-m1 * x1 * xd -
			2 * m2 * x1 * xd -
			2 * m1 * xd * x2 -
			m2 * xd * x2 +
			3 * (x1 * y1 + x2 * y1 - x1 * y2 - x2 * y2)) /
		xd3;
	coeffs[2] =
		(m2 * x1 * x1 * xd +
			2 * m1 * x1 * xd * x2 +
			2 * m2 * x1 * xd * x2 +
			m1 * xd * x2 * x2 -
			6 * x1 * x2 * y1 +
			6 * x1 * x2 * y2) /
		xd3;
	coeffs[3] =
		(-m2 * x1 * x1 * xd * x2 -
			m1 * x1 * xd * x2 * x2 +
			3 * x1 * x2 * x2 * y1 -
			x2 * x2 * x2 * y1 +
			x1 * x1 * x1 * y2 -
			3 * x1 * x1 * x2 * y2) /
		xd3;

	return coeffs;
}

function AngleFix(Angle) {
	// This looks odd. Take a closer look.
	//Angle = Math.atan2(Math.cos(Angle),Math.sin(Angle));
	Angle = (Angle + Math.PI) % (2 * Math.PI);
	Angle = Angle - Math.PI;
	Angle = (Angle - Math.PI) % (2 * Math.PI);
	Angle = Angle + Math.PI;
	return Angle;
}

function Round(Number, SignificantDigits) {
	let RoundedNumber =
		Number * Math.pow(10.0, SignificantDigits - Math.floor(Math.log10(Number)) - 1);
	RoundedNumber = Math.round(RoundedNumber);
	RoundedNumber =
		RoundedNumber * Math.pow(10.0, -SignificantDigits + Math.floor(Math.log10(Number)) + 1);
	return RoundedNumber;
}
