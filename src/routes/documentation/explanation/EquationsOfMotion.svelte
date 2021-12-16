<h1>Equations of Motion</h1>

<p>
	This section gives the equations for a trebuchet. I would suggest working through this
	<a href="/documentation/explanation/ExampleProblem">Example Problem</a> to understand the basics
	of how the equations work before trying work through this section.
</p>

<p>
	The equations of motion for the trebuchet are a set of second order differential equations. The
	numerical methods used in the simulation only work with first order differential equations, so the
	derivatives of the motion variables were also renamed as separate variables which allowed the
	equations of motion to be rewritten as a set of first order differential equations. Those first
	order differential equations are presented in this section. There are a different set of equations
	for each stage of the trebuchet as described in the
	<a href="/documentation/explanation/SimulationOverview">Simulation Overview</a>.
</p>

<p>
	The equations of motion for the trebuchet were derived using a program called Autolev. See the
	<a href="/documentation/explanation/Autolev">Autolev</a> section to see the code that was actually
	used to develop the equations of motion.
</p>

<h2>Stage 1:</h2>

<p>
	In stage 1 the motion variables are Aq, Wq, and Sq, and the constant lengths are LAl, LAs, LAcg,
	LW, LS, and h.
</p>

<p><img alt="Variables and Constants" src="/documentation/Stage1and2Parameters.png" /></p>

<p>
	The time derivative of a variable is denoted by appending it with a &#39;. For example Aq&#39;
	means dAq/dt, and Sq&#39;&#39; means d²Sq/dt².
</p>

<p>Additional constants not shown above are:</p>

<blockquote>
	<p>Grav = Gravitational Acceleration</p>
	<p>mA = Mass of Arm</p>
	<p>mW = Mass of Weight</p>
	<p>mP = Mass of Projectile</p>
	<p>IA3 = Inertia of Arm</p>
	<p>IW3 = Inertia of Weight</p>
</blockquote>

<p>The equations of motion for stage 1 are:</p>

<p>
	<code
		>(-mP*LAl^2*(-1+2*SIN(Aq)*COS(Sq)/SIN(Aq+Sq)) + IA3 + IW3 + mA*LAcg^2 +
		mP*LAl^2*SIN(Aq)^2/SIN(Aq+Sq)^2 + mW*(LAs^2+LW^2+2*LAs*LW*COS(Wq)))*</code
	><strong><code>Aq&#39;&#39;</code></strong> <code> + (IW3 + LW*mW*(LW+LAs*COS(Wq)))*</code
	><strong><code>Wq&#39;&#39;</code></strong>
	<code>
		= Grav*LAcg*mA*SIN(Aq) +
		LAl*LS*mP*(SIN(Sq)*(Aq&#39;+Sq&#39;)^2+COS(Sq)*(COS(Aq+Sq)*Sq&#39;*(Sq&#39;+2*Aq&#39;)/SIN(Aq+Sq)+(COS(Aq+Sq)/SIN(Aq+Sq)+LAl*COS(Aq)/(LS*SIN(Aq+Sq)))*Aq&#39;^2))
		+
		LAl*mP*SIN(Aq)*(LAl*SIN(Sq)*Aq&#39;^2-LS*(COS(Aq+Sq)*Sq&#39;*(Sq&#39;+2*Aq&#39;)/SIN(Aq+Sq)+(COS(Aq+Sq)/SIN(Aq+Sq)+LAl*COS(Aq)/(LS*SIN(Aq+Sq)))*Aq&#39;^2))/SIN(Aq+Sq)
		- Grav*mW*(LAs*SIN(Aq)+LW*SIN(Aq+Wq)) - LAs*LW*mW*SIN(Wq)*(Aq&#39;^2-(Aq&#39;+Wq&#39;)^2)</code
	>
</p>

<p>
	<code>(IW3 + LW*mW*(LW+LAs*COS(Wq)))*</code><strong><code>Aq&#39;&#39;</code></strong>
	<code> + (IW3 + mW*LW^2)*</code><strong><code>Wq&#39;&#39;</code></strong>
	<code> = -LW*mW*(Grav*SIN(Aq+Wq)+LAs*SIN(Wq)*Aq&#39;^2)</code>
</p>

<p>
	Note that in stage 1, when the ball is on the ground, the trebuchet only has two
	<a href="http://en.wikipedia.org/wiki/Degrees_of_freedom_(mechanics)">degrees of freedom</a>,
	which is why there are only two equations of motion. However there were three variables to begin
	with. This works because Sq’ becomes a dependent variable defined by the expression,
</p>

<p>
	<strong><code>Sq&#39;</code></strong
	><code> = -(LAl*SIN(Aq)+LS*SIN(Aq+Sq))*Aq&#39;/(LS*SIN(Aq+Sq))</code>
</p>

<p>and Sq’’ becomes,</p>

<p>
	<strong><code>Sq&#39;&#39;</code></strong
	><code>
		= -COS(Aq+Sq)*Sq&#39;*(Sq&#39;+2*Aq&#39;)/SIN(Aq+Sq) -
		(COS(Aq+Sq)/SIN(Aq+Sq)+LAl*COS(Aq)/(LS*SIN(Aq+Sq)))*Aq&#39;^2 -
		(LAl*SIN(Aq)+LS*SIN(Aq+Sq))*Aq&#39;&#39;/(LS*SIN(Aq+Sq))</code
	>
</p>

<p>
	As is discussed in the <a href="/documentation/explanation/ExampleProblem">Example Problem</a>,
	complex differential equations like this are practically impossible to solve analytically. As a
	result, numerical methods must be used to approximate an answer. These methods require that the
	equations of motion to be reduced to first order differential equations. In order to accomplish
	this, we will define three new variables Aw, Ww, and Sw which are the the time derivatives of Aq,
	Wq, and Sq.
</p>

<p><code>Aw = Aq&#39;</code></p>

<p><code>Ww = Wq&#39;</code></p>

<p><code>Sw = Sq&#39;</code></p>

<p>Substituting Aw, Ww, and Sw in to the equations of motion gives,</p>

<p>
	<code
		>(-mP*LAl^2*(-1+2*SIN(Aq)*COS(Sq)/SIN(Aq+Sq)) + IA3 + IW3 + mA*LAcg^2 +
		mP*LAl^2*SIN(Aq)^2/SIN(Aq+Sq)^2 + mW*(LAs^2+LW^2+2*LAs*LW*COS(Wq)))*</code
	><strong><code>Aw&#39;</code></strong> <code> + (IW3 + LW*mW*(LW+LAs*COS(Wq)))*</code
	><strong><code>Ww&#39;</code></strong>
	<code>
		= Grav*LAcg*mA*SIN(Aq) +
		LAl*LS*mP*(SIN(Sq)*(Aw+Sw)^2+COS(Sq)*(COS(Aq+Sq)*Sw*(Sw+2*Aw)/SIN(Aq+Sq)+(COS(Aq+Sq)/SIN(Aq+Sq)+LAl*COS(Aq)/(LS*SIN(Aq+Sq)))*Aw^2))
		+
		LAl*mP*SIN(Aq)*(LAl*SIN(Sq)*Aw^2-LS*(COS(Aq+Sq)*Sw*(Sw+2*Aw)/SIN(Aq+Sq)+(COS(Aq+Sq)/SIN(Aq+Sq)+LAl*COS(Aq)/(LS*SIN(Aq+Sq)))*Aw^2))/SIN(Aq+Sq)
		- Grav*mW*(LAs*SIN(Aq)+LW*SIN(Aq+Wq)) - LAs*LW*mW*SIN(Wq)*(Aw^2-(Aw+Ww)^2)</code
	>
</p>

<p>
	<code>(IW3 + LW*mW*(LW+LAs*COS(Wq)))*</code><strong><code>Aw&#39;</code></strong>
	<code> + (IW3 + mW*LW^2)*</code><strong><code>Ww&#39;</code></strong>
	<code> = -LW*mW*(Grav*SIN(Aq+Wq)+LAs*SIN(Wq)*Aw^2)</code>
</p>

<p>
	which are now first order differntial equations. As discussed in the
	<a href="/documentation/explanation/ExampleProblem">Example Problem</a>, we need to get the
	equations into the form,
</p>

<p><code>y&#39;(t) = f(t, y(t))</code></p>

<p>
	Separating Aw’ and Ww’ into separate expressions will require a little linear algebra. So, first
	we will write the equations of motion in matrix form.
	<img alt="Equations of Motion in Matrix Form" src="/documentation/EOMMatrixForm.png" />
</p>

<p>where,</p>

<p>
	<strong><code>M11</code></strong
	><code>
		= -mP*LAl^2*(-1+2*SIN(Aq)*COS(Sq)/SIN(Aq+Sq)) + IA3 + IW3 + mA*LAcg^2 +
		mP*LAl^2*SIN(Aq)^2/SIN(Aq+Sq)^2 + mW*(LAs^2+LW^2+2*LAs*LW*COS(Wq))</code
	>
</p>

<p>
	<strong><code>M12</code></strong
	><code> = IW3 + LW*mW*(LW+LAs*COS(Wq))</code>
</p>

<p>
	<strong><code>M21</code></strong
	><code> = IW3 + LW*mW*(LW+LAs*COS(Wq))</code>
</p>

<p>
	<strong><code>M22</code></strong
	><code> = IW3 + mW*LW^2</code>
</p>

<p>
	<strong><code>r1</code></strong
	><code>
		= Grav*LAcg*mA*SIN(Aq) +
		LAl*LS*mP*(SIN(Sq)*(Aw+Sw)^2+COS(Sq)*(COS(Aq+Sq)*Sw*(Sw+2*Aw)/SIN(Aq+Sq)+(COS(Aq+Sq)/SIN(Aq+Sq)+LAl*COS(Aq)/(LS*SIN(Aq+Sq)))*Aw^2))
		+
		LAl*mP*SIN(Aq)*(LAl*SIN(Sq)*Aw^2-LS*(COS(Aq+Sq)*Sw*(Sw+2*Aw)/SIN(Aq+Sq)+(COS(Aq+Sq)/SIN(Aq+Sq)+LAl*COS(Aq)/(LS*SIN(Aq+Sq)))*Aw^2))/SIN(Aq+Sq)
		- Grav*mW*(LAs*SIN(Aq)+LW*SIN(Aq+Wq)) - LAs*LW*mW*SIN(Wq)*(Aw^2-(Aw+Ww)^2)</code
	>
</p>

<p>
	<strong><code>r2</code></strong
	><code> = -LW*mW*(Grav*SIN(Aq+Wq)+LAs*SIN(Wq)*Aw^2)</code>
</p>

<p>
	We can solve for Aw&#39; and Ww&#39; by multiplying both sides of the equation by the inverse of
	matrix M.
</p>

<p>
	<img
		alt="Solve Equations of Motion for Aw&#39; and Ww&#39;"
		src="/documentation/SolveEOMMatrixForm.png"
	/>
</p>

<p>which give the result,</p>

<p>
	<strong><code>Aw&#39;</code></strong
	><code> = (r1*M22-r2*M12)/(M11*M22-M12*M21)</code>
</p>

<p>
	<strong><code>Ww&#39;</code></strong
	><code> = -(r1*M21-r2*M11)/(M11*M22-M12*M21)</code>
</p>

<p>In summary, the equations that are used by the simulation for stage 1 are,</p>

<p>
	<strong><code>Aq&#39;</code></strong
	><code> = Aw</code>
</p>

<p>
	<strong><code>Wq&#39;</code></strong
	><code> = Ww</code>
</p>

<p>
	<strong><code>Sq&#39;</code></strong
	><code> = Sw</code>
</p>

<p>
	<strong><code>Aw&#39;</code></strong
	><code> = (r1*M22-r2*M12)/(M11*M22-M12*M21)</code>
</p>

<p>
	<strong><code>Ww&#39;</code></strong
	><code> = -(r1*M21-r2*M11)/(M11*M22-M12*M21)</code>
</p>

<p>
	<strong><code>Sw&#39;</code></strong
	><code>
		= -COS(Aq+Sq)*Sq&#39;*(Sq&#39;+2*Aq&#39;)/SIN(Aq+Sq) -
		(COS(Aq+Sq)/SIN(Aq+Sq)+LAl*COS(Aq)/(LS*SIN(Aq+Sq)))*Aq&#39;^2 -
		(LAl*SIN(Aq)+LS*SIN(Aq+Sq))*Aq&#39;&#39;/(LS*SIN(Aq+Sq))</code
	>
</p>

<p>
	As described in the <a href="/documentation/explanation/ExampleProblem">Example Problem</a>, these
	first order differential equations are solved using the numerical methods described in the
	<a href="/documentation/explanation/RungeKutta">Runge-Kutta</a> section, and the results are
	values for the angles (Aq, Wq, Sq) and their derivatives (Aw, Ww, Sw) over time. These angles can
	be converted into X and Y coordinates using the expressions found in the
	<a href="/documentation/explanation/AnglesToXY">Angles to XY Coordinates</a> section.
</p>

<h2>Stage 2:</h2>

<p>
	In stage 2 the parameters are the same as in stage 1. The equations of motion for stage 2 are:
</p>

<p>
	<code
		>(IA3 + IW3 + mA*LAcg^2 + mP*(LAl^2+LS^2+2*LAl*LS*COS(Sq)) +
		mW*(LAs^2+LW^2+2*LAs*LW*COS(Wq)))*</code
	><strong><code>Aq&#39;&#39;</code></strong> <code> + (IW3 + LW*mW*(LW+LAs*COS(Wq)))*</code
	><strong><code>Wq&#39;&#39;</code></strong> <code> + (LS*mP*(LS+LAl*COS(Sq)))*</code
	><strong><code>Sq&#39;&#39;</code></strong>
	<code>
		= Grav*LAcg*mA*SIN(Aq) + Grav*mP*(LAl*SIN(Aq)+LS*SIN(Aq+Sq)) -
		Grav*mW*(LAs*SIN(Aq)+LW*SIN(Aq+Wq)) - LAl*LS*mP*SIN(Sq)*(Aq&#39;^2-(Aq&#39;+Sq&#39;)^2) -
		LAs*LW*mW*SIN(Wq)*(Aq&#39;^2-(Aq&#39;+Wq&#39;)^2)</code
	>
</p>

<p>
	<code>(IW3 + LW*mW*(LW+LAs*COS(Wq)))*</code><strong><code>Aq&#39;&#39;</code></strong>
	<code> + (IW3 + mW*LW^2)*</code><strong><code>Wq&#39;&#39;</code></strong>
	<code> = -LW*mW*(Grav*SIN(Aq+Wq)+LAs*SIN(Wq)*Aq&#39;^2)</code>
</p>

<p>
	<code>(LS*mP*(LS+LAl*COS(Sq)))*</code><strong><code>Aq&#39;&#39;</code></strong>
	<code> + (mP*LS^2)*</code><strong><code>Sq&#39;&#39;</code></strong>
	<code> = LS*mP*(Grav*SIN(Aq+Sq)-LAl*SIN(Sq)*Aq&#39;^2)</code>
</p>

<p>
	Note that in stage 2, there are three degrees of freedom, so there are now three equations of
	motion. As in stage 1 we will turn the equations of motion onto first order differential equations
	by using the time derivatives of Aq, Wq, and Sq, which we will call Aw, Ww, and Sw, and
	substituting them into the equations of motion.
</p>

<p>
	<code
		>(IA3 + IW3 + mA*LAcg^2 + mP*(LAl^2+LS^2+2*LAl*LS*COS(Sq)) +
		mW*(LAs^2+LW^2+2*LAs*LW*COS(Wq)))*</code
	><strong><code>Aw&#39;</code></strong> <code> + (IW3 + LW*mW*(LW+LAs*COS(Wq)))*</code
	><strong><code>Ww&#39;</code></strong> <code> + (LS*mP*(LS+LAl*COS(Sq)))*</code
	><strong><code>Sw&#39;</code></strong>
	<code>
		= Grav*LAcg*mA*SIN(Aq) + Grav*mP*(LAl*SIN(Aq)+LS*SIN(Aq+Sq)) -
		Grav*mW*(LAs*SIN(Aq)+LW*SIN(Aq+Wq)) - LAl*LS*mP*SIN(Sq)*(Aw^2-(Aw+Sw)^2) -
		LAs*LW*mW*SIN(Wq)*(Aw^2-(Aw+Ww)^2)</code
	>
</p>

<p>
	<code>(IW3 + LW*mW*(LW+LAs*COS(Wq)))*</code><strong><code>Aw&#39;</code></strong>
	<code> + (IW3 + mW*LW^2)*</code><strong><code>Ww&#39;</code></strong>
	<code> = -LW*mW*(Grav*SIN(Aq+Wq)+LAs*SIN(Wq)*Aw^2)</code>
</p>

<p>
	<code>(LS*mP*(LS+LAl*COS(Sq)))*</code><strong><code>Aw&#39;</code></strong>
	<code> + (mP*LS^2)*</code><strong><code>Sw&#39;</code></strong>
	<code> = LS*mP*(Grav*SIN(Aq+Sq)-LAl*SIN(Sq)*Aw^2)</code>
</p>

<p>
	In order to separate Aw’, Ww’, and Sw’ into separate expressions we will first put the equations
	of motion into matrix form.
</p>

<p><img alt="Equations of Motion in Matrix Form" src="/documentation/EOMMatrixFormS2.png" /></p>

<p>where,</p>

<p>
	<strong><code>M11</code></strong
	><code>
		= IA3 + IW3 + mA*LAcg^2 + mP*(LAl^2+LS^2+2*LAl*LS*COS(Sq)) +
		mW*(LAs^2+LW^2+2*LAs*LW*COS(Wq))</code
	>
</p>

<p>
	<strong><code>M12</code></strong
	><code> = IW3 + LW*mW*(LW+LAs*COS(Wq))</code>
</p>

<p>
	<strong><code>M13</code></strong
	><code> = LS*mP*(LS+LAl*COS(Sq))</code>
</p>

<p>
	<strong><code>M21</code></strong
	><code> = IW3 + LW*mW*(LW+LAs*COS(Wq))</code>
</p>

<p>
	<strong><code>M22</code></strong
	><code> = IW3 + mW*LW^2</code>
</p>

<p>
	<strong><code>M31</code></strong
	><code> = LS*mP*(LS+LAl*COS(Sq))</code>
</p>

<p>
	<strong><code>M33</code></strong
	><code> = mP*LS^2</code>
</p>

<p>
	<strong><code>r1</code></strong
	><code>
		= Grav*LAcg*mA*SIN(Aq) + Grav*mP*(LAl*SIN(Aq)+LS*SIN(Aq+Sq)) -
		Grav*mW*(LAs*SIN(Aq)+LW*SIN(Aq+Wq)) - LAl*LS*mP*SIN(Sq)*(Aw^2-(Aw+Sw)^2) -
		LAs*LW*mW*SIN(Wq)*(Aw^2-(Aw+Ww)^2)</code
	>
</p>

<p>
	<strong><code>r2</code></strong
	><code> = -LW*mW*(Grav*SIN(Aq+Wq)+LAs*SIN(Wq)*Aw^2)</code>
</p>

<p>
	<strong><code>r3</code></strong
	><code> = LS*mP*(Grav*SIN(Aq+Sq)-LAl*SIN(Sq)*Aw^2)</code>
</p>

<p>
	Now, we can solve for Aw&#39;, Ww&#39;, and Sw’ by multiplying both sides of the equation by the
	inverse of matrix M.
</p>

<p>
	<img
		alt="Solve Equations of Motion for Aw&#39;, Ww&#39;, and Sw&#39;"
		src="/documentation/SolveEOMMatrixFormS2.png"
	/>
</p>

<p>which gives the result used in the simulation,</p>

<p>
	<strong><code>Aq&#39;</code></strong
	><code> = Aw</code>
</p>

<p>
	<strong><code>Wq&#39;</code></strong
	><code> = Ww</code>
</p>

<p>
	<strong><code>Sq&#39;</code></strong
	><code> = Sw</code>
</p>

<p>
	<strong><code>Aw&#39;</code></strong
	><code> = -(r1*M22*M33-r2*M12*M33-r3*M13*M22)/(M13*M22*M31-M33*(M11*M22-M12*M21))</code>
</p>

<p>
	<strong><code>Ww&#39;</code></strong
	><code> = (r1*M21*M33-r2*(M11*M33-M13*M31)-r3*M13*M21)/(M13*M22*M31-M33*(M11*M22-M12*M21))</code>
</p>

<p>
	<strong><code>Sw&#39;</code></strong
	><code> = (r1*M22*M31-r2*M12*M31-r3*(M11*M22-M12*M21))/(M13*M22*M31-M33*(M11*M22-M12*M21))</code>
</p>

<p>
	As described in the <a href="/documentation/explanation/ExampleProblem">Example Problem</a>, these
	first order differential equations are solved using the numerical methods described in the
	<a href="/documentation/explanation/RungeKutta">Runge-Kutta</a> section, and the results are
	values for the angles (Aq, Wq, Sq) and their derivatives (Aw, Ww, Sw) over time. These angles can
	be converted into X and Y coordinates using the expressions found in the
	<a href="/documentation/explanation/AnglesToXY">Angles to XY Coordinates</a> section.
</p>

<h2>Stage 3:</h2>

<p>
	Stage 3 has a different set of parameters than stage 1 or 2. The motion variables are Px and Py.
	Note that in the simulation everything is measured relative to the pivot point.
</p>

<p><img alt="Stage 3 Motion Variables" src="/documentation/Stage3Parameters.png" /></p>

<p>The constant parameters in stage 3 are:</p>

<blockquote>
	<p>Grav = Gravitational Acceleration ρ = Density of Air</p>
	<p>WS = Wind Speed</p>
	<p>Aeff = Effective Area of the Projectile (= π*(Projectile Diameter/2)^2)</p>
	<p>mP = Mass of Projectile</p>
	<p>Cd = Drag Coefficient of Projectile</p>
</blockquote>

<p>
	The <a href="http://en.wikipedia.org/wiki/Drag_coefficient">drag coefficient</a> is not actually a
	constant. It is related to the
	<a href="http://en.wikipedia.org/wiki/Reynolds_number">Reynolds number</a> which is dependent on
	the velocity of the projectile relative to the air. For more information on how the drag
	coefficient is derived, see the
	<a href="/documentation/explanation/ProjectileDrag">Projectile Drag</a> section.
</p>

<p>The equations of motion for stage 3 are:</p>

<p>
	<strong><code>Px&#39;&#39;</code></strong
	><code> = -(ρ*Cd*Aeff*(Px&#39;-WS)*sqrt(Py&#39;^2+(WS-Px&#39;)^2))/(2*mP)</code>
</p>

<p>
	<strong><code>Py&#39;&#39;</code></strong
	><code> = -Grav - (ρ*Cd*Aeff*Py&#39;*sqrt(Py&#39;^2+(WS-Px&#39;)^2))/(2*mP)</code>
</p>

<p>
	In order to make the equations of motion into first order differential equations, we will define
	to new variables Pvx and Pvy which we will make equal to the time derivatives of Px and Py.
</p>

<p><code>Pvx = Px&#39;</code></p>

<p><code>Pvy = Py&#39;</code></p>

<p>Substituting these into the equations of motion gives the expressions used in the simulation.</p>

<p>
	<strong><code>Px&#39;</code></strong
	><code> = Pvx</code>
</p>

<p>
	<strong><code>Py&#39;</code></strong
	><code> = Pvy</code>
</p>

<p>
	<strong><code>Pvx&#39;</code></strong
	><code> = -(ρ*Cd*Aeff*(Pvx-WS)*sqrt(Pvy^2+(WS-Pvx)^2))/(2*mP)</code>
</p>

<p>
	<strong><code>Pvy&#39;</code></strong
	><code> = -Grav - (ρ*Cd*Aeff*Pvy*sqrt(Pvy^2+(WS-Pvx)^2))/(2*mP)</code>
</p>

<p>
	As described in the <a href="/documentation/explanation/ExampleProblem">Example Problem</a>, these
	first order differential equations are solved using the numerical methods described in the
	<a href="/documentation/explanation/RungeKutta">Runge-Kutta</a> section, and the results are
	values for the variables (Px, Py) and their derivatives (Pvx, Pvy) over time.
</p>
