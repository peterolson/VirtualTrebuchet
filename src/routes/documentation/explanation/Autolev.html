<h1>Autolev</h1>

<p>
	The equations of motion for the trebuchet were derived using a program called Autolev. The Autolev
	code that was used to derive the trebuchet equations will be included here with some minimal
	explanation. The figure below shows what the constants and variables in this code correspond to.
</p>

<p><img alt="Variables and Constants" src="/documentation/Stage1and2Parameters.png" /></p>

<p><strong>Stage 1 Autolev Code:</strong></p>

<p><code>(1) % File: Trebuchet_Stage_1.al</code></p>

<p><code>(2) % Date: November 19, 2010</code></p>

<p><code>(3) % Author: Eric Olson</code></p>

<p><code>(4) % Problem: This is the first stage in a simulation of a trebuchet</code></p>

<p><code>(5) % shooting a projectile. In this stage the projectile</code></p>

<p><code>(6) % is in the sling, and is in contact with the ground.</code></p>

<p><code>(7) %--------------------------------------------------------------------</code></p>

<p><code>(8) % Default settings</code></p>

<p>Anything after a % symbol is just a comment.</p>

<p><code>(9) AutoEpsilon 1.0E-14 % Rounds off to nearest integer</code></p>

<p><code>(10) AutoZ OFF % Turn ON for large problems</code></p>

<p><code>(11) Digits 7 % Number of digits displayed for numbers</code></p>

<p><code>(12) BeepSound OFF</code></p>

<p>These are just program settings that can be ignored.</p>

<p><code>(13) %--------------------------------------------------------------------</code></p>

<p><code>(14) % Newtonian, bodies, frames, particles, points</code></p>

<p><code>(15) Newtonian N % Newtonian reference frame</code></p>

<p>
	The Newtonian reference frame is the base reference frame that everything else is based off of.
</p>

<p><code>(16) Bodies A, W % Arm and Counterweight</code></p>

<p>A body has a local reference frame, a mass, a center of gravity, and inertia properties.</p>

<p><code>(17) Frames S % Sling</code></p>

<p>The sling is assumed to be massless, so it is defined as a frame instead of as a body.</p>

<p><code>(18) Particles P % Projectile</code></p>

<p>The projectile is assumed to be a point mass.</p>

<p><code>(19) %--------------------------------------------------------------------</code></p>

<p><code>(20) % Variables, constants, and specified</code></p>

<p>
	<code
		>(21) Variables Aq&#39;, Wq&#39;, Sq&#39; % Arm angle, Counterweight-arm angle, and Sling-arm
		angle</code
	>
</p>

<p>This defined the angles and their derivatives. The angles are the “motion variables”.</p>

<p><code>(22) Variables Fy % Normal Force of Projectile</code></p>

<p>This is the force that the ground exerts on the projectile in stage 1.</p>

<p><code>(23) Constants Grav % Local gravitational acceleration</code></p>

<p>
	<code
		>(24) Constants LAs, LAl, LAcg % Length of long arm, length of short arm, distance from pivot to
		Arm CG.</code
	>
</p>

<p>
	<code
		>(25) Constants LW, LS, h % Distance from arm end to Wo, length of sling, hight of pivot from
		the ground</code
	>
</p>

<p><code>(26) %--------------------------------------------------------------------</code></p>

<p><code>(27) % Motion variables for static/dynamic analysis</code></p>

<p><code>(28) Variables u{3}&#39; % Motion variables; derivatives</code></p>

<p><code>(29) Aq&#39; = u1</code></p>

<p><code>-&gt; (30) Aq&#39; = u1</code></p>

<p>The -&gt; means that this line is program output.</p>

<p><code>(31) Wq&#39; = u2</code></p>

<p><code>-&gt; (32) Wq&#39; = u2</code></p>

<p><code>(33) Sq&#39; = u3</code></p>

<p><code>-&gt; (34) Sq&#39; = u3</code></p>

<p>
	This section defines the derivatives of the motion variables. This is done this way so that the
	equations for the trebuchet will be first order differential equations rather that second order
	differential equations. The numerical methods that are used to solve the final equations only work
	with first order differential equations. This is similar to what we did in the
	<a href="/documentation/explanation/ExampleProblem">Example Problem</a>.
</p>

<p><code>(35) %--------------------------------------------------------------------</code></p>

<p><code>(36) % Quantities to be left explicit</code></p>

<p><code>(37) Zee_Not = [u1&#39;,u2&#39;,u3&#39;,Grav]</code></p>

<p><code>-&gt; (38) Zee_Not = [u1&#39;, u2&#39;, u3&#39;, Grav]</code></p>

<p>With the initial settings that were set, this section does not do anything.</p>

<p><code>(39) %--------------------------------------------------------------------</code></p>

<p><code>(40) % Mass and inertia properties</code></p>

<p><code>(41) Mass A=mA, W=mW, P=mP</code></p>

<p><code>(42) Inertia A, IA1, IA2, IA3</code></p>

<p>
	<code>-&gt; (43) I_A_AO&gt;&gt; = IA1*A1&gt;*A1&gt; + IA2*A2&gt;*A2&gt; + IA3*A3&gt;*A3&gt;</code>
</p>

<p><code>(44) Inertia W, IW1, IW2, IW3</code></p>

<p>
	<code>-&gt; (45) I_W_WO&gt;&gt; = IW1*W1&gt;*W1&gt; + IW2*W2&gt;*W2&gt; + IW3*W3&gt;*W3&gt;</code>
</p>

<p>
	This section assigns mass and inertia to the bodies. The convention in Autolev is that 1 is x, 2
	is y, and 3 is z. Anything with a &gt; symbol is a vector, and anything with a &gt;&gt; is a
	tensor. A1&gt; means the x direction of the local reference frame associated with body A.
</p>

<p><code>(46) %--------------------------------------------------------------------</code></p>

<p><code>(47) % Geometry relating unit vectors</code></p>

<p><code>(48) Simprot(N, A, 3, Aq)</code></p>

<p><code>-&gt; (49) N_A = [COS(Aq), -SIN(Aq), 0; SIN(Aq), COS(Aq), 0; 0, 0, 1]</code></p>

<p><code>(50) Simprot(A, W, 3, Wq)</code></p>

<p><code>-&gt; (51) A_W = [COS(Wq), -SIN(Wq), 0; SIN(Wq), COS(Wq), 0; 0, 0, 1]</code></p>

<p><code>(52) Simprot(A, S, 3, Sq)</code></p>

<p><code>-&gt; (53) A_S = [COS(Sq), -SIN(Sq), 0; SIN(Sq), COS(Sq), 0; 0, 0, 1]</code></p>

<p>
	This section defines the relationship between the different local reference frames and the
	Newtonian reference frame.
</p>

<p><code>(54) %--------------------------------------------------------------------</code></p>

<p><code>(55) % Angular velocities</code></p>

<p><code>(56) W_A_N&gt; = Aq&#39;*N3&gt;</code></p>

<p><code>-&gt; (57) W_A_N&gt; = u1*A3&gt;</code></p>

<p><code>(58) W_W_A&gt; = Wq&#39;*A3&gt;</code></p>

<p><code>-&gt; (59) W_W_A&gt; = u2*A3&gt;</code></p>

<p><code>(60) W_S_A&gt; = Sq&#39;*A3&gt;</code></p>

<p><code>-&gt; (61) W_S_A&gt; = u3*A3&gt;</code></p>

<p><code>(62) %--------------------------------------------------------------------</code></p>

<p><code>(63) % Position vectors</code></p>

<p><code>(64) P_No_Ao&gt; = LAcg*A2&gt;</code></p>

<p><code>-&gt; (65) P_No_Ao&gt; = LAcg*A2&gt;</code></p>

<p><code>(66) P_No_Wo&gt; = -LAs*A2&gt; - LW*W2&gt;</code></p>

<p><code>-&gt; (67) P_No_Wo&gt; = -LAs*A2&gt; - LW*W2&gt;</code></p>

<p><code>(68) P_No_P&gt; = LAl*A2&gt; + LS*S2&gt;</code></p>

<p><code>-&gt; (69) P_No_P&gt; = LAl*A2&gt; + LS*S2&gt;</code></p>

<p>
	This section defines the location of the different points of interest in the trebuchet. For
	example line 66 says the vector from the pivot (No) to the CG of the weight (Wo) is –LAs in the y
	component of the arm’s local coordinate system, and –LW in the y component of the weight’s local
	coordinate system.
</p>

<p><code>(70) %--------------------------------------------------------------------</code></p>

<p><code>(71) % Velocities</code></p>

<p><code>(72) V_Ao_N&gt; = Dt(P_No_Ao&gt;,N)</code></p>

<p><code>-&gt; (73) V_Ao_N&gt; = -LAcg*u1*A1&gt;</code></p>

<p><code>(74) V_Wo_N&gt; = Dt(P_No_Wo&gt;,N)</code></p>

<p><code>-&gt; (75) V_Wo_N&gt; = LAs*u1*A1&gt; + LW*(u1+u2)*W1&gt;</code></p>

<p><code>(76) V_P_N&gt; = Dt(P_No_P&gt;,N)</code></p>

<p><code>-&gt; (77) V_P_N&gt; = -LAl*u1*A1&gt; - LS*(u1+u3)*S1&gt;</code></p>

<p>
	The velocities vectors of the points of interest are defined as the time derivatives of the
	position vectors in reference to the Newtonian reference frame.
</p>

<p><code>(78) Projectile_Vx = coef(express(V_P_N&gt;,N),N1&gt;)</code></p>

<p><code>-&gt; (79) Projectile_Vx = -LAl*COS(Aq)*u1 - LS*COS(Aq+Sq)*(u1+u3)</code></p>

<p><code>(80) Projectile_Vy = coef(express(V_P_N&gt;,N),N2&gt;)</code></p>

<p><code>-&gt; (81) Projectile_Vy = -LAl*SIN(Aq)*u1 - LS*SIN(Aq+Sq)*(u1+u3)</code></p>

<p>
	This finds the x and y component of the projectile velocity expressed in terms of the Newtonian
	reference frame.
</p>

<p><code>(82) %--------------------------------------------------------------------</code></p>

<p><code>(83) % Motion constraints</code></p>

<p><code>(84) Auxiliary[1] = Projectile_Vy % P stays on ground</code></p>

<p><code>-&gt; (85) Auxiliary[1] = Projectile_Vy</code></p>

<p><code>(86) Constrain(Auxiliary[u3])</code></p>

<p><code>-&gt; (87) u3 = -(LAl*SIN(Aq)+LS*SIN(Aq+Sq))*u1/(LS*SIN(Aq+Sq))</code></p>

<p>
	<code
		>-&gt; (88) u3&#39; = -COS(Aq+Sq)*u3*(u3+2*u1)/SIN(Aq+Sq) - (COS(Aq+Sq)/SIN(Aq+Sq)+LAl*</code
	>
</p>

<blockquote>
	<p><code>COS(Aq)/(LS*SIN(Aq+Sq)))*u1^2-(LAl*SIN(Aq)+LS*SIN(Aq+Sq))*u1&#39;/(LS*SIN</code></p>
	<p><code>(Aq+Sq))</code></p>
</blockquote>

<p>
	This section constrains the y component of the projectiles velocity to be 0. This is what keeps
	the projectile moving along the ground in the first stage. This constraint eliminates one degree
	of freedom from the system and so one of the motion variables has to be rewritten in terms of the
	other motion variables. In this case u3 aka Sq’ is now given in terms of u1 and u2, and will not
	show up in the final equations.
</p>

<p><code>(89) %Dependent[1] = Projectile_Vy % P stays on ground</code></p>

<p><code>(90) %Constrain(Dependent[u3])</code></p>

<p><code>(91) %--------------------------------------------------------------------</code></p>

<p><code>(92) % Angular accelerations</code></p>

<p><code>(93) ALF_A_N&gt; = Dt(W_A_N&gt;,N)</code></p>

<p><code>-&gt; (94) ALF_A_N&gt; = u1&#39;*A3&gt;</code></p>

<p><code>(95) ALF_W_N&gt; = Dt(W_W_N&gt;,N)</code></p>

<p><code>-&gt; (96) ALF_W_N&gt; = (u1&#39;+u2&#39;)*W3&gt;</code></p>

<p><code>(97) ALF_S_N&gt; = Dt(W_S_N&gt;,N)</code></p>

<p><code>-&gt; (98) ALF_S_N&gt; = (u1&#39;+u3&#39;)*A3&gt;</code></p>

<p>The angular accelerations are found by taking the time derivatives of the angular velocities.</p>

<p><code>(99) %--------------------------------------------------------------------</code></p>

<p><code>(100) % Accelerations</code></p>

<p><code>(101) A_Ao_N&gt; = Dt(V_Ao_N&gt;,N)</code></p>

<p><code>-&gt; (102) A_Ao_N&gt; = -LAcg*u1&#39;*A1&gt; - LAcg*u1^2*A2&gt;</code></p>

<p><code>(103) A_Wo_N&gt; = Dt(V_Wo_N&gt;,N)</code></p>

<p>
	<code
		>-&gt; (104) A_Wo_N&gt; = LAs*u1&#39;*A1&gt; + LAs*u1^2*A2&gt; + LW*(u1&#39;+u2&#39;)*W1&gt; +
		LW*(u1+u2)^2</code
	>
</p>

<blockquote>
	<p><code>*W2&gt;</code></p>
</blockquote>

<p><code>(105) A_P_N&gt; = Dt(V_P_N&gt;,N)</code></p>

<p>
	<code
		>-&gt; (106) A_P_N&gt; = -LAl*u1&#39;*A1&gt; - LAl*u1^2*A2&gt; - LS*(u1&#39;+u3&#39;)*S1&gt; -
		LS*(u1+u3)^2</code
	>
</p>

<blockquote>
	<p><code>*S2&gt;</code></p>
</blockquote>

<p>
	The acceleration vectors of the points of interest are found by taking the derivative of the
	velocity vectors.
</p>

<p><code>(107) %--------------------------------------------------------------------</code></p>

<p><code>(108) % Forces</code></p>

<p><code>(109) Force_P&gt; = Fy*N2&gt;</code></p>

<p><code>-&gt; (110) Force_P&gt; = Fy*N2&gt;</code></p>

<p>This defines the force vector exerted on the projectile by the ground.</p>

<p><code>(111) Gravity(-Grav*N2&gt;)</code></p>

<p><code>-&gt; (112) FORCE_AO&gt; = -Grav*mA*N2&gt;</code></p>

<p><code>-&gt; (113) FORCE_P&gt; = (Fy-Grav*mP)*N2&gt;</code></p>

<p><code>-&gt; (114) FORCE_WO&gt; = -Grav*mW*N2&gt;</code></p>

<p>This defines the force vectors that gravity exerts on the bodies and point masses.</p>

<p><code>(115) %--------------------------------------------------------------------</code></p>

<p><code>(116) % Equations of motion</code></p>

<p><code>(117) Zero = Fr() + FrStar() % Find equations of motion</code></p>

<p>
	<code>-&gt; (118) Zero[1] = Grav*LAcg*mA*SIN(Aq) + (Grav*mP-Fy)*(LAl*SIN(Aq)+LS*SIN(Aq+</code>
</p>

<blockquote>
	<p><code>Sq)) - Grav*mW*(LAs*SIN(Aq)+LW*SIN(Aq+Wq)) - LAs*LW*mW*SIN(Wq)*(u1^2-(</code></p>
	<p><code>u1+u2)^2) - LS*mP*(LAl*SIN(Sq)*u1^2-LAl*SIN(Sq)*(u1+u3)^2-LS*(COS(Aq+</code></p>
	<p><code>Sq)*u3*(u3+2*u1)/SIN(Aq+Sq)+(COS(Aq+Sq)/SIN(Aq+Sq)+LAl*COS(Aq)/(LS*SIN</code></p>
	<p><code>(Aq+Sq)))*u1^2)-LAl*COS(Sq)*(COS(Aq+Sq)*u3*(u3+2*u1)/SIN(Aq+Sq)+(COS(</code></p>
	<p><code>Aq+Sq)/SIN(Aq+Sq)+LAl*COS(Aq)/(LS*SIN(Aq+Sq)))*u1^2)) - (IW3+LW*mW*(</code></p>
	<p><code>LW+LAs*COS(Wq)))*u2&#39; - (IA3+IW3+mA*LAcg^2+mW*(LAs^2+LW^2+2*LAs*LW*COS(</code></p>
	<p><code>Wq))-mP*(LAl^2*SIN(Aq)*COS(Sq)/SIN(Aq+Sq)-LAl^2-LAl*LS*COS(Sq)-LS^2*(1</code></p>
	<p><code>-(LAl*SIN(Aq)+LS*SIN(Aq+Sq))/(LS*SIN(Aq+Sq)))))*u1&#39;</code></p>
</blockquote>

<p><code>-&gt; (119) Zero[2] = -Grav*LW*mW*SIN(Aq+Wq) - LAs*LW*mW*SIN(Wq)*u1^2 - (IW3+mW*</code></p>

<blockquote>
	<p><code>LW^2)*u2&#39; - (IW3+LW*mW*(LW+LAs*COS(Wq)))*u1&#39;</code></p>
</blockquote>

<p>
	<code>-&gt; (120) Zero[3] = LS*(SIN(Aq+Sq)*(Grav*mP-Fy)+mP*(LS*(COS(Aq+Sq)*u3*(u3+2*u1)/</code>
</p>

<blockquote>
	<p><code>SIN(Aq+Sq)+(COS(Aq+Sq)/SIN(Aq+Sq)+LAl*COS(Aq)/(LS*SIN(Aq+Sq)))*u1^2)-</code></p>
	<p><code>LAl*SIN(Sq)*u1^2-LAl*(COS(Sq)-SIN(Aq)/SIN(Aq+Sq))*u1&#39;))</code></p>
</blockquote>

<p>
	The trebuchet has been fully defined by all the previous sections. This section combines it all
	into the equations of motion of the trebuchet in stage 1. Notice that there are tree equations of
	motion but only two motion variables derivatives appear in these equations (u1 and u2). This is
	because u3 was turned into a dependent variable in line (86).
</p>

<p><code>(121) Kane(Fy)</code></p>

<p>
	<code>-&gt; (122) Fy = mP*(Grav+(LS*(COS(Aq+Sq)*u3*(u3+2*u1)/SIN(Aq+Sq)+(COS(Aq+Sq)/SIN(</code>
</p>

<blockquote>
	<p><code>Aq+Sq)+LAl*COS(Aq)/(LS*SIN(Aq+Sq)))*u1^2)-LAl*SIN(Sq)*u1^2-LAl*(COS(</code></p>
	<p><code>Sq)-SIN(Aq)/SIN(Aq+Sq))*u1&#39;)/SIN(Aq+Sq))</code></p>
</blockquote>

<p>
	<code>-&gt; (123) ZERO[1] = Grav*LAcg*mA*SIN(Aq) + LAl*LS*mP*(SIN(Sq)*(u1+u3)^2+COS(Sq)*</code>
</p>

<blockquote>
	<p><code>(COS(Aq+Sq)*u3*(u3+2*u1)/SIN(Aq+Sq)+(COS(Aq+Sq)/SIN(Aq+Sq)+LAl*COS(Aq)</code></p>
	<p><code>/(LS*SIN(Aq+Sq)))*u1^2)) + LAl*mP*SIN(Aq)*(LAl*SIN(Sq)*u1^2-LS*(COS(</code></p>
	<p><code>Aq+Sq)*u3*(u3+2*u1)/SIN(Aq+Sq)+(COS(Aq+Sq)/SIN(Aq+Sq)+LAl*COS(Aq)/(LS*</code></p>
	<p><code>SIN(Aq+Sq)))*u1^2))/SIN(Aq+Sq) - Grav*mW*(LAs*SIN(Aq)+LW*SIN(Aq+Wq))</code></p>
	<p><code>- LAs*LW*mW*SIN(Wq)*(u1^2-(u1+u2)^2) - (IW3+LW*mW*(LW+LAs*COS(Wq)))*</code></p>
	<p><code>u2&#39; - (IA3+IW3+mA*LAcg^2+mP*LAl^2+mW*(LAs^2+LW^2+2*LAs*LW*COS(Wq))-mP*</code></p>
	<p><code>LAl^2*SIN(Aq)*(2*COS(Sq)-SIN(Aq)/SIN(Aq+Sq))/SIN(Aq+Sq))*u1&#39;</code></p>
</blockquote>

<p><code>-&gt; (124) ZERO[2] = -LW*mW*(Grav*SIN(Aq+Wq)+LAs*SIN(Wq)*u1^2) - (IW3+mW*LW^2)*</code></p>

<blockquote>
	<p><code>u2&#39; - (IW3+LW*mW*(LW+LAs*COS(Wq)))*u1&#39;</code></p>
</blockquote>

<p>
	Fy was defined as the force to keep the projectile on the ground. This command converted the
	previous three equations of motion into the two equations of motion that are expected, and an
	expression for Fy. This is where the equations of motion for stage 1 of the
	<a href="/explanation/EquationsOfMotion">Equations of Motion</a> section came from.
</p>

<p><strong>Stage 2 Autolev Code:</strong></p>

<p>
	The stage 2 Autolev code is very similar to the stage 1 code, so only the parts that are different
	will be explained.
</p>

<p><code>(1) % File: Trebuchet_Stage_2.al</code></p>

<p><code>(2) % Date: November 5, 2010</code></p>

<p><code>(3) % Author: Eric Olson</code></p>

<p><code>(4) % Problem: This is the second stage in a simulation of a trebuchet</code></p>

<p><code>(5) % shooting a projectile. In this stage the projectile</code></p>

<p><code>(6) % is in the sling, and is not in contact with the ground.</code></p>

<p><code>(7) %--------------------------------------------------------------------</code></p>

<p><code>(8) % Default settings</code></p>

<p><code>(9) AutoEpsilon 1.0E-14 % Rounds off to nearest integer</code></p>

<p><code>(10) AutoZ OFF % Turn ON for large problems</code></p>

<p><code>(11) Digits 7 % Number of digits displayed for numbers</code></p>

<p><code>(12) BeepSound OFF</code></p>

<p><code>(13) %--------------------------------------------------------------------</code></p>

<p><code>(14) % Newtonian, bodies, frames, particles, points</code></p>

<p><code>(15) Newtonian N % Newtonian referance frame</code></p>

<p><code>(16) Bodies A, W % Arm and Counterweight</code></p>

<p><code>(17) Frames S % Sling</code></p>

<p><code>(18) Particles P % Projectile</code></p>

<p><code>(19) %--------------------------------------------------------------------</code></p>

<p><code>(20) % Variables, constants, and specified</code></p>

<p>
	<code
		>(21) Variables Aq&#39;, Wq&#39;, Sq&#39; % Arm angle, Counterweight-arm angle, and Sling-arm
		angle</code
	>
</p>

<p><code>(22) Constants Grav % Local gravitational acceleration</code></p>

<p>
	<code
		>(23) Constants LAs, LAl, LAcg % Length of long arm, length of short arm, distance from pivot to
		Arm CG.</code
	>
</p>

<p>
	<code
		>(24) Constants LW, LS, h % Distance from arm end to Wo, length of sling, hight of pivot from
		the ground</code
	>
</p>

<p><code>(25) %--------------------------------------------------------------------</code></p>

<p><code>(26) % Motion variables for static/dynamic analysis</code></p>

<p><code>(27) Variables u{3}&#39; % Motion variables; derivatives</code></p>

<p><code>(28) Aq&#39; = u1</code></p>

<p><code>-&gt; (29) Aq&#39; = u1</code></p>

<p><code>(30) Wq&#39; = u2</code></p>

<p><code>-&gt; (31) Wq&#39; = u2</code></p>

<p><code>(32) Sq&#39; = u3</code></p>

<p><code>-&gt; (33) Sq&#39; = u3</code></p>

<p><code>(34) %--------------------------------------------------------------------</code></p>

<p><code>(35) % Quantities to be left explicit</code></p>

<p><code>(36) Zee_Not = [u1&#39;,u2&#39;,u3&#39;,Grav]</code></p>

<p><code>-&gt; (37) Zee_Not = [u1&#39;, u2&#39;, u3&#39;, Grav]</code></p>

<p><code>(38) %--------------------------------------------------------------------</code></p>

<p><code>(39) % Mass and inertia properties</code></p>

<p><code>(40) Mass A=mA, W=mW, P=mP</code></p>

<p><code>(41) Inertia A, IA1, IA2, IA3</code></p>

<p>
	<code>-&gt; (42) I_A_AO&gt;&gt; = IA1*A1&gt;*A1&gt; + IA2*A2&gt;*A2&gt; + IA3*A3&gt;*A3&gt;</code>
</p>

<p><code>(43) Inertia W, IW1, IW2, IW3</code></p>

<p>
	<code>-&gt; (44) I_W_WO&gt;&gt; = IW1*W1&gt;*W1&gt; + IW2*W2&gt;*W2&gt; + IW3*W3&gt;*W3&gt;</code>
</p>

<p><code>(45) %--------------------------------------------------------------------</code></p>

<p><code>(46) % Geometry relating unit vectors</code></p>

<p><code>(47) Simprot(N, A, 3, Aq)</code></p>

<p><code>-&gt; (48) N_A = [COS(Aq), -SIN(Aq), 0; SIN(Aq), COS(Aq), 0; 0, 0, 1]</code></p>

<p><code>(49) Simprot(A, W, 3, Wq)</code></p>

<p><code>-&gt; (50) A_W = [COS(Wq), -SIN(Wq), 0; SIN(Wq), COS(Wq), 0; 0, 0, 1]</code></p>

<p><code>(51) Simprot(A, S, 3, Sq)</code></p>

<p><code>-&gt; (52) A_S = [COS(Sq), -SIN(Sq), 0; SIN(Sq), COS(Sq), 0; 0, 0, 1]</code></p>

<p><code>(53) %--------------------------------------------------------------------</code></p>

<p><code>(54) % Angular velocities</code></p>

<p><code>(55) W_A_N&gt; = Aq&#39;*N3&gt;</code></p>

<p><code>-&gt; (56) W_A_N&gt; = u1*A3&gt;</code></p>

<p><code>(57) W_W_A&gt; = Wq&#39;*A3&gt;</code></p>

<p><code>-&gt; (58) W_W_A&gt; = u2*A3&gt;</code></p>

<p><code>(59) W_S_A&gt; = Sq&#39;*A3&gt;</code></p>

<p><code>-&gt; (60) W_S_A&gt; = u3*A3&gt;</code></p>

<p><code>(61) %--------------------------------------------------------------------</code></p>

<p><code>(62) % Position vectors</code></p>

<p><code>(63) P_No_Ao&gt; = LAcg*A2&gt;</code></p>

<p><code>-&gt; (64) P_No_Ao&gt; = LAcg*A2&gt;</code></p>

<p><code>(65) P_No_Wo&gt; = -LAs*A2&gt; - LW*W2&gt;</code></p>

<p><code>-&gt; (66) P_No_Wo&gt; = -LAs*A2&gt; - LW*W2&gt;</code></p>

<p><code>(67) P_No_P&gt; = LAl*A2&gt; + LS*S2&gt;</code></p>

<p><code>-&gt; (68) P_No_P&gt; = LAl*A2&gt; + LS*S2&gt;</code></p>

<p><code>(69) %--------------------------------------------------------------------</code></p>

<p><code>(70) % Velocities</code></p>

<p><code>(71) V_Ao_N&gt; = Dt(P_No_Ao&gt;,N)</code></p>

<p><code>-&gt; (72) V_Ao_N&gt; = -LAcg*u1*A1&gt;</code></p>

<p><code>(73) V_Wo_N&gt; = Dt(P_No_Wo&gt;,N)</code></p>

<p><code>-&gt; (74) V_Wo_N&gt; = LAs*u1*A1&gt; + LW*(u1+u2)*W1&gt;</code></p>

<p><code>(75) V_P_N&gt; = Dt(P_No_P&gt;,N)</code></p>

<p><code>-&gt; (76) V_P_N&gt; = -LAl*u1*A1&gt; - LS*(u1+u3)*S1&gt;</code></p>

<p><code>(77) %--------------------------------------------------------------------</code></p>

<p><code>(78) % Angular accelerations</code></p>

<p><code>(79) ALF_A_N&gt; = Dt(W_A_N&gt;,N)</code></p>

<p><code>-&gt; (80) ALF_A_N&gt; = u1&#39;*A3&gt;</code></p>

<p><code>(81) ALF_W_N&gt; = Dt(W_W_N&gt;,N)</code></p>

<p><code>-&gt; (82) ALF_W_N&gt; = (u1&#39;+u2&#39;)*W3&gt;</code></p>

<p><code>(83) ALF_S_N&gt; = Dt(W_S_N&gt;,N)</code></p>

<p><code>-&gt; (84) ALF_S_N&gt; = (u1&#39;+u3&#39;)*A3&gt;</code></p>

<p><code>(85) %--------------------------------------------------------------------</code></p>

<p><code>(86) % Accelerations</code></p>

<p><code>(87) A_Ao_N&gt; = Dt(V_Ao_N&gt;,N)</code></p>

<p><code>-&gt; (88) A_Ao_N&gt; = -LAcg*u1&#39;*A1&gt; - LAcg*u1^2*A2&gt;</code></p>

<p><code>(89) A_Wo_N&gt; = Dt(V_Wo_N&gt;,N)</code></p>

<p>
	<code
		>-&gt; (90) A_Wo_N&gt; = LAs*u1&#39;*A1&gt; + LAs*u1^2*A2&gt; + LW*(u1&#39;+u2&#39;)*W1&gt; +
		LW*(u1+u2)^2*</code
	>
</p>

<blockquote>
	<p><code>W2&gt;</code></p>
</blockquote>

<p><code>(91) A_P_N&gt; = Dt(V_P_N&gt;,N)</code></p>

<p>
	<code
		>-&gt; (92) A_P_N&gt; = -LAl*u1&#39;*A1&gt; - LAl*u1^2*A2&gt; - LS*(u1&#39;+u3&#39;)*S1&gt; -
		LS*(u1+u3)^2*</code
	>
</p>

<blockquote>
	<p><code>S2&gt;</code></p>
</blockquote>

<p><code>(93) %--------------------------------------------------------------------</code></p>

<p><code>(94) % Forces</code></p>

<p><code>(95) Gravity(-Grav*N2&gt;)</code></p>

<p><code>-&gt; (96) FORCE_AO&gt; = -Grav*mA*N2&gt;</code></p>

<p><code>-&gt; (97) FORCE_P&gt; = -Grav*mP*N2&gt;</code></p>

<p><code>-&gt; (98) FORCE_WO&gt; = -Grav*mW*N2&gt;</code></p>

<p><code>(99) %--------------------------------------------------------------------</code></p>

<p><code>(100) % Equations of motion</code></p>

<p><code>(101) Zero = Fr() + FrStar() % Find equations of motion</code></p>

<p><code>-&gt; (102) Zero[1] = Grav*LAcg*mA*SIN(Aq) + Grav*mP*(LAl*SIN(Aq)+LS*SIN(Aq+Sq))</code></p>

<blockquote>
	<p><code>- Grav*mW*(LAs*SIN(Aq)+LW*SIN(Aq+Wq)) - LAl*LS*mP*SIN(Sq)*(u1^2-(u1+</code></p>
	<p><code>u3)^2) - LAs*LW*mW*SIN(Wq)*(u1^2-(u1+u2)^2) - LS*mP*(LS+LAl*COS(Sq))*</code></p>
	<p><code>u3&#39; - (IW3+LW*mW*(LW+LAs*COS(Wq)))*u2&#39; - (IA3+IW3+mA*LAcg^2+mP*(LAl^2+</code></p>
	<p><code>LS^2+2*LAl*LS*COS(Sq))+mW*(LAs^2+LW^2+2*LAs*LW*COS(Wq)))*u1&#39;</code></p>
</blockquote>

<p><code>-&gt; (103) Zero[2] = -Grav*LW*mW*SIN(Aq+Wq) - LAs*LW*mW*SIN(Wq)*u1^2 - (IW3+mW*</code></p>

<blockquote>
	<p><code>LW^2)*u2&#39; - (IW3+LW*mW*(LW+LAs*COS(Wq)))*u1&#39;</code></p>
</blockquote>

<p>
	<code>-&gt; (104) Zero[3] = LS*mP*(Grav*SIN(Aq+Sq)-LAl*SIN(Sq)*u1^2-LS*u3&#39;-(LS+LAl*COS(</code>
</p>

<blockquote>
	<p><code>Sq))*u1&#39;)</code></p>
</blockquote>

<p>
	Notice that in stage 2 there are no dependent variables, so u1’, u2’, and u3’ all appear, and
	there are three equations and three motion variable derivatives. This is where the equations of
	motion for stage 2 of the
	<a href="/explanation/EquationsOfMotion">Equations of Motion</a> section came from.
</p>

<p><strong>Stage 3 Autolev Code:</strong></p>

<p>
	Sage 3 was originally solved with the trebuchet still moving after the projectile had been
	released, however to speed up computation time only the projectile portions of the equations were
	used, so only the parts of the stage 3 Autolev file that have to do with the projectile will be
	shown.
</p>

<p><img alt="Stage 3 Motion Variables" src="/documentation/Stage3Parameters.png" /></p>

<p><code>(1) % File: Trebuchet_Stage_3_With_Drag_and_Wind_Speed.al</code></p>

<p><code>(2) % Date: March 10, 2013</code></p>

<p><code>(3) % Author: Eric Olson</code></p>

<p><code>(4) % Problem: This is the last stage in a simulation of a trebuchet</code></p>

<p><code>(5) % shooting a projectile. In this stage the projectile</code></p>

<p><code>(6) % has left the sling.</code></p>

<p><code>(7) % This version includes drag and wind speed.</code></p>

<p><code>(8) %--------------------------------------------------------------------</code></p>

<p><code>(9) % Default settings</code></p>

<p><code>(10) AutoEpsilon 1.0E-14 % Rounds off to nearest integer</code></p>

<p><code>(11) AutoZ OFF % Turn ON for large problems</code></p>

<p><code>(12) Digits 7 % Number of digits displayed for numbers</code></p>

<p><code>(13) BeepSound OFF</code></p>

<p><code>(14) %--------------------------------------------------------------------</code></p>

<p><code>(15) % Newtonian, bodies, frames, particles, points</code></p>

<p><code>(16) Newtonian N % Newtonian referance frame</code></p>

<p><code>(17) Bodies A, W % Arm and Counterweight</code></p>

<p><code>(18) Frames S % Sling</code></p>

<p><code>(19) Particles P % Projectile</code></p>

<p><code>(20) %--------------------------------------------------------------------</code></p>

<p><code>(21) % Variables, constants, and specified</code></p>

<p>
	<code
		>(22) Variables Aq&#39;,Wq&#39;,Px&#39;,Py&#39; % Arm angle, Counterweight-arm angle, and
		Sling-arm angle</code
	>
</p>

<p>
	Px and Py are the x and y coordinates of the projectile. In the stage 3 they are motion variables.
</p>

<p><code>(23) Constants Grav % Local gravitational acceleration</code></p>

<p><code>(26) %--------------------------------------------------------------------</code></p>

<p><code>(27) % Motion variables for static/dynamic analysis</code></p>

<p><code>(28) Variables u{4}&#39; % Motion variables; derivatives</code></p>

<p><code>(33) Px&#39; = u3</code></p>

<p><code>-&gt; (34) Px&#39; = u3</code></p>

<p><code>(35) Py&#39; = u4</code></p>

<p><code>-&gt; (36) Py&#39; = u4</code></p>

<p><code>(37) %--------------------------------------------------------------------</code></p>

<p><code>(38) % Quantities to be left explicit</code></p>

<p><code>(39) Zee_Not = [u1&#39;,u2&#39;,u3&#39;,u4&#39;,Grav]</code></p>

<p><code>-&gt; (40) Zee_Not = [u1&#39;, u2&#39;, u3&#39;, u4&#39;, Grav]</code></p>

<p><code>(41) %--------------------------------------------------------------------</code></p>

<p><code>(42) % Mass and inertia properties</code></p>

<p><code>(43) Mass A=mA, W=mW, P=mP</code></p>

<p><code>(60) %--------------------------------------------------------------------</code></p>

<p><code>(61) % Position vectors</code></p>

<p><code>(66) P_No_P&gt; = Px*N1&gt; + Py*N2&gt;</code></p>

<p><code>-&gt; (67) P_No_P&gt; = Px*N1&gt; + Py*N2&gt;</code></p>

<p><code>(68) %--------------------------------------------------------------------</code></p>

<p><code>(69) % Velocities</code></p>

<p><code>(74) V_P_N&gt; = Dt(P_No_P&gt;,N)</code></p>

<p><code>-&gt; (75) V_P_N&gt; = u3*N1&gt; + u4*N2&gt;</code></p>

<p><code>(82) %--------------------------------------------------------------------</code></p>

<p><code>(83) % Accelerations</code></p>

<p><code>(88) A_P_N&gt; = Dt(V_P_N&gt;,N)</code></p>

<p><code>-&gt; (89) A_P_N&gt; = u3&#39;*N1&gt; + u4&#39;*N2&gt;</code></p>

<p><code>(90) %--------------------------------------------------------------------</code></p>

<p><code>(91) % Forces</code></p>

<p><code>(92) constant AirDensity, EffectiveArea, Cd</code></p>

<p><code>(93) constant WindSpeed</code></p>

<p>
	<code>(94) Force_P&gt; = -0.5*AirDensity*EffectiveArea*Cd*Dot(V_P_N&gt; - WindSpeed*N1&gt;,</code>
</p>

<blockquote>
	<p><code>V_P_N&gt; - WindSpeed*N1&gt;)*(V_P_N&gt; - WindSpeed*N1&gt;)/mag(V_P_N&gt; - </code></p>
	<p><code>WindSpeed*N1&gt;)</code></p>
</blockquote>

<p>
	<code>-&gt; (95) Force_P&gt; = 0.5*AirDensity*Cd*EffectiveArea*(WindSpeed-u3)*(u4^2+(WindS</code>
</p>

<blockquote>
	<p><code>peed-u3)^2)^0.5*N1&gt; - 0.5*AirDensity*Cd*EffectiveArea*u4*(u4^2+(WindSp</code></p>
	<p><code>eed-u3)^2)^0.5*N2&gt;</code></p>
</blockquote>

<p><code>(96) Gravity(-Grav*N2&gt;)</code></p>

<p>
	<code>-&gt; (98) FORCE_P&gt; = 0.5*AirDensity*Cd*EffectiveArea*(WindSpeed-u3)*(u4^2+(WindS</code>
</p>

<blockquote>
	<p><code>peed-u3)^2)^0.5*N1&gt; + (-Grav*mP-0.5*AirDensity*Cd*EffectiveArea*u4*(u4^</code></p>
	<p><code>2+(WindSpeed-u3)^2)^0.5)*N2&gt;</code></p>
</blockquote>

<p><code>(100) %--------------------------------------------------------------------</code></p>

<p><code>(101) % Equations of motion</code></p>

<p><code>(102) Zero = Fr() + FrStar() % Find equations of motion</code></p>

<p>
	<code>-&gt; (105) Zero[3] = 0.5*AirDensity*Cd*EffectiveArea*(WindSpeed-u3)*(u4^2+(WindS</code>
</p>

<blockquote>
	<p><code>peed-u3)^2)^0.5 - mP*u3&#39;</code></p>
</blockquote>

<p>
	<code>-&gt; (106) Zero[4] = -Grav*mP - 0.5*AirDensity*Cd*EffectiveArea*u4*(u4^2+(WindSp</code>
</p>

<blockquote>
	<p><code>eed-u3)^2)^0.5 - mP*u4&#39;</code></p>
</blockquote>

<p>
	This is where the equations of motion for stage 3 of the
	<a href="/explanation/EquationsOfMotion">Equations of Motion</a> section came from.
</p>
