<script>
	import Link from './_link.svelte';
</script>

<div>
	<nav>
		<ul>
			<Link href="/documentation/new">New in VirtualTrebuchet 2.0</Link>
			<Link href="/documentation/about">About Us</Link>
			<Link href="/documentation/FAQ">FAQ</Link>
			<Link href="/documentation/inputs">Input Descriptions</Link>
			<ul>
				<Link href="/documentation/inputs/trebuchet-dimensions">Trebuchet Dimensions</Link>
				<ul>
					<Link href="/documentation/inputs/trebuchet-dimensions/ArmLengths">Arm Lengths</Link>
					<Link href="/documentation/inputs/trebuchet-dimensions/LengthSling">Length of Sling</Link>
					<Link href="/documentation/inputs/trebuchet-dimensions/LengthWeight"
						>Length of Weight</Link
					>
					<Link href="/documentation/inputs/trebuchet-dimensions/HeightOfPivot"
						>Height Of Pivot</Link
					>
				</ul>
				<Link href="/documentation/inputs/arm">Arm</Link>
				<ul>
					<Link href="/documentation/inputs/arm/UniformArm">Uniform Arm</Link>
					<Link href="/documentation/inputs/arm/MassArm">Mass of Arm</Link>
					<Link href="/documentation/inputs/arm/InertiaArm">Inertia of Arm</Link>
					<Link href="/documentation/inputs/arm/PivotToArmCG">Pivot to Arm CG</Link>
				</ul>
				<Link href="/documentation/inputs/weight">Weight</Link>
				<ul>
					<Link href="/documentation/inputs/weight/MassWeight">Mass of Weight</Link>
					<Link href="/documentation/inputs/weight/InertiaWeight">Inertia of Weight</Link>
				</ul>
				<Link href="/documentation/inputs/projectile">Projectile</Link>
				<ul>
					<Link href="/documentation/inputs/projectile/ProjectileType">Projectile Type</Link>
					<Link href="/documentation/inputs/projectile/MassProjectile">Mass of Projectile</Link>
					<Link href="/documentation/inputs/projectile/ProjectileDiameter">Projectile Diameter</Link
					>
					<Link href="/documentation/inputs/projectile/WindSpeed">Wind Speed</Link>
				</ul>
				<Link href="/documentation/inputs/ReleaseAngle">Release Angle</Link>
			</ul>
			<Link href="/documentation/outputs">Output Descriptions</Link>
			<ul>
				<Link href="/documentation/outputs/Efficiency">Efficiency</Link>
				<Link href="/documentation/outputs/Errors">Errors</Link>
			</ul>
			<Link href="/documentation/Save">Saving Your Trebuchet</Link>
			<Link href="/documentation/NegativeMass">Negative Mass/Inertia</Link>
			<Link href="/documentation/ArmExampleCalculations">Arm Example Calculations</Link>
			<Link href="/documentation/explanation">Explanation of Simulation</Link>
			<ul>
				<Link href="/documentation/explanation/SimulationOverview">Simulation Overview</Link>
				<Link href="/documentation/explanation/ExampleProblem">Example Problem</Link>
				<Link href="/documentation/explanation/EquationsOfMotion">Equations of Motion</Link>
				<Link href="/documentation/explanation/AnglesToXY">Angles to XY Coordinates</Link>
				<Link href="/documentation/explanation/RungeKutta">Runge-Kutta</Link>
				<Link href="/documentation/explanation/ProjectileDrag">Projectile Drag</Link>
				<Link href="/documentation/explanation/Autolev">Autolev</Link>
			</ul>
		</ul>
	</nav>
	<main>
		<slot />
	</main>
</div>

<style>
	div {
		display: flex;
	}
	nav {
		padding: 8px;
		flex-shrink: 0;
		border-right: 1px solid #ccc;
	}
	main {
		flex-grow: 1;
		padding: 8px;
		max-width: 700px;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	ul ul {
		margin-left: 1.4em;
	}
</style>
