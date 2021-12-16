<h1>Angles to XY Coordinates</h1>

<p>
	The equations of motion for the first two stages of the trebuchet given in the
	<a href="/documentation/explanation/EquationsOfMotion">Equations of Motion</a> section are used to
	find the angles (Aq, Wq, Sq) of the trebuchet over time. These angles can be used to find the
	Cartesian coordinates of the different parts of the trebuchet.
</p>

<p>
	<img alt="Angles and Lengths" src="/documentation/Stage1and2Parameters.png" />
	<img alt="Trebuchet Points" src="/documentation/TrebuchetPoints.png" />
</p>

<p>Weight CG:</p>

<p><code>X = LAs*SIN(Aq) + LW*SIN(Aq+Wq)</code></p>

<p><code>Y = -LAs*COS(Aq) - LW*COS(Aq+Wq)</code></p>

<p>Weight/Arm Point:</p>

<p><code>X = LAs*SIN(Aq)</code></p>

<p><code>Y = -LAs*COS(Aq)</code></p>

<p>Arm CG:</p>

<p><code>X = -LAcg*SIN(Aq)</code></p>

<p><code>Y = LAcg*COS(Aq)</code></p>

<p>Arm/Sling Point:</p>

<p><code>X = -LAl*SIN(Aq)</code></p>

<p><code>Y = LAl*COS(Aq)</code></p>

<p>Projectile:</p>

<p><code>X = -LAl*SIN(Aq) - LS*SIN(Aq+Sq)</code></p>

<p><code>Y = LAl*COS(Aq) + LS*COS(Aq+Sq)</code></p>
