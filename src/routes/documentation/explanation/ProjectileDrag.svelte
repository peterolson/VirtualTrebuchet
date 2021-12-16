<h1>Projectile Drag</h1>

<p>
	The force of <a href="http://en.wikipedia.org/wiki/Drag_(physics)">drag</a> (or air resistance) on
	an object is in the opposite direction of the velocity of that object relative to the air, and can
	be expressed by,
</p>

<p><img alt="" src="/documentation/DragEquation.png" /></p>

<p>where</p>

<blockquote>
	<p>F<code>D</code> = force of drag</p>
	<p>ρ = density of air</p>
	<p>v = velocity of the object relative to the air</p>
	<p>A = cross-sectional area of the object</p>
	<p>C<code>D</code> = drag coefficient</p>
</blockquote>

<p>
	In the original VirtualTrebuchet simulation the drag coefficient, C<code>D</code>, was assumed to
	be a constant 0.47. This is a reasonable assumption over a certain velocity range.
</p>

<p>
	In VirtualTrebuchet 2.0, the drag coefficient, C<code>D</code>, is not assumed to be a constant.
	Instead the drag coefficient is continually recalculated during the simulation. It is derived by
	first finding the <a href="http://en.wikipedia.org/wiki/Reynolds_number">Reynolds number</a> of
	the object at a particular time. The Reynolds number, Re, is non-dimensional number defined as,
</p>

<p><img alt="" src="/documentation/ReynoldsNumber.png" /></p>

<p>where</p>

<blockquote>
	<p>v = velocity of the object relative to the air</p>
	<p>D = diameter of the object</p>
	<p>ν = the kinematic viscosity of the air</p>
</blockquote>

<p>
	People have found the relationships between the Reynolds number and the drag coefficient for
	different shapes empirically. For the simulation, I used the charts in Figures 9.21 and 9.25 of
	the textbook, <em>Fundamentals of Fluid Mechanics Fifth Edition</em> to get the relationship
	between the Reynolds number and the drag coefficient for a smooth sphere. The following chart
	shows the approximate shape of this relationship.
</p>

<p><img alt="Drag vs. Reynolds Number" src="/documentation/CdVsRe.png" /></p>

<p>
	All the projectiles in the simulation are assumed to be smooth spheres except for the baseball and
	golf ball options. The simulation uses special curves for the baseball and golf ball as shown in
	the chart above. The data the simulation uses for the baseball and golf ball came from a paper by
	Rabindm D. Mehta and Jani Macari Pallis called
	<em
		><a href="http://iweb.tms.org/ED/01-5085-185.pdf"
			>Sports Ball Aerodynamics: Effects of Velocity, Spin and Surface Roughness (PDF)</a
		></em
	>.
</p>
