<h1>Inertia of Arm</h1>

<p>
	<strong>Inertia of Arm</strong> is the
	<a href="http://en.wikipedia.org/wiki/Moment_of_inertia">moment of inertia</a> of the entire arm
	around its <a href="http://en.wikipedia.org/wiki/Center_of_mass">center of gravity</a>.
</p>

<p><img alt="Arm Diagram for Inertia" src="/documentation/InertiaArm.png" /></p>

<p>
	For an arm with a uniform cross-section along its length, the moment of inertia can be
	approximated by the formula,
</p>

<p><img alt="Inertia for a Beam" src="/documentation/InertiaEquation.gif" /></p>

<p>
	where <strong>m</strong> is the mass of the arm, and <strong>L</strong> is the total length of the
	arm (<a href="/documentation/inputs/trebuchet-dimensions/ArmLengths">Length of Long Arm</a> +
	<a href="/documentation/inputs/trebuchet-dimensions/ArmLengths">Length of Short Arm</a>).
</p>

<p>
	For a non-uniform arm, the moment of inertia can be found by breaking the arm up into simple
	shapes, finding the moment of inertia for each one, and then combining them together using the
	<a href="http://en.wikipedia.org/wiki/Parallel_axis_theorem">parallel axis theorem</a>. A list of
	formulas for the moment of inertia of different shapes can be found
	<a href="http://en.wikipedia.org/wiki/List_of_moments_of_inertia">here</a>. See the
	<a href="/documentation/ArmExampleCalculations">Arm Example Calculations</a>.
</p>

<p>
	Alternatly, using a 3D CAD software package is probably the easiest way to find the inertia of a
	non-uniform arm.
</p>

<p>
	For best performance, the moment of inertia of the arm should be as small as possible. This is why
	the arm is tapered on many trebuchets.
</p>

<p>
	<strong>Note:</strong> When Auto Calculate is checked, the arm is assumed to have a uniform
	cross-section and the <strong>Inertia of Arm</strong> will be calculated automatically.
</p>
