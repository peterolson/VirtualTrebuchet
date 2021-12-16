<h1>Example Problem</h1>

<p>
	This section does not directly have anything to do with a trebuchet; rather it is an example
	problem that is used to explain generally the method that I use to make a simulation of a system.
	If you do not have much experience with simulation, studying this simple example problem will make
	the trebuchet equations easier to understand.
</p>

<h2>Developing Equations of Motion</h2>

<p>
	For the example problem we will consider a body in free fall. The first thing we need to do is
	develop the <a href="http://en.wikipedia.org/wiki/Equations_of_motion">equations of motion</a> for
	this system. This is a one-dimensional single body system, so there is only one
	<a href="http://en.wikipedia.org/wiki/Degrees_of_freedom_(mechanics)">degree of freedom</a> and
	thus only one equation of motion.
</p>

<p><img alt="Example Problem Free Body Diagram" src="/documentation/ExampleProblemFBD.png" /></p>

<blockquote>
	<p>F<code>g</code> = gravitational force</p>
	<p>F<code>D</code> = force of drag</p>
	<p>m = mass of the body</p>
	<p>g = gravitational constant</p>
	<p>
		C = a constant that depends on the density of the air, the coefficient of drag of the body, and
		the reference area of the body
	</p>
	<p>v = the velocity of the body</p>
	<p>y = height of the body from the ground</p>
</blockquote>

<p>
	In order to find the equation of motion for this system we will use Newton’s second law: the sum
	of the forces acting on a body is equal the mass times the acceleration of that body.
</p>

<p><img alt="Newton&#39;s second law" src="/documentation/Fma.png" /></p>

<p>
	The forces acting on a body in free fall are gravity and the force of
	<a href="http://en.wikipedia.org/wiki/Drag_(physics)">drag</a>, so we get,
</p>

<p><img alt="" src="/documentation/EPe2.png" /></p>

<p>Plugging in the equations for gravity and drag results in,</p>

<p><img alt="" src="/documentation/EPe3.png" /></p>

<p>
	Next we will rewrite the equation in terms of y, where y is the height of the body from the
	ground. Velocity, v, is the first time-derivative of y, and acceleration, a, is the second
	time-derivative of y.
</p>

<p><img alt="" src="/documentation/EPe4.png" /></p>

<p>I prefer to use <a href="http://en.wikipedia.org/wiki/Newton%27s_notation">dot notation</a>.</p>

<p><img alt="" src="/documentation/EPe5.png" /></p>

<p>We will rewrite this equation in terms of ÿ.</p>

<p><img alt="" src="/documentation/EPe6.png" /></p>

<p>
	This is the equation of motion for this system. What we really want, however, is an expression for
	y as a function of time. Since the equation of motion we derived is relatively simple, it is not
	too difficult to solve it analytically to get y as a function of time. We will not go into the
	theory behind solving differential equations analytically, but the result of solving our equation
	of motion for y would be
</p>

<p>
	<img alt="" src="/documentation/EPe7.png" />
	<img alt="" src="/documentation/EPe8.png" />
	<img alt="" src="/documentation/EPe9.png" />
</p>

<p>
	If we were only interested in this problem we could stop here, but we want to solve this problem
	in a way that is applicable to the trebuchet simulation. It is apparent from this example that the
	analytical solution for even a simple equation of motion can be fairly complex. For systems with
	much more complex equations of motion, like the equations of motion for a trebuchet, finding an
	analytical solution is nearly impossible, so we resort to solving the equation of motion using
	numerical methods.
</p>

<h2>Numerical Methods</h2>

<p>
	What we get from a numerical method is different from what we get from an analytical solution.
	With an analytical solution the result is an expression for the variable(s) of interest as a
	function of time, and any arbitrary value for time can be plugged into the function to get the
	value of the variable(s) at that particular time. Using a numerical method will not give us a time
	function for the variable(s) of interest. With a numerical method we start at a known value for
	the variable(s), and then calculate what the variable(s) will be after a little bit of time has
	elapsed. Then we take the new value(s) and calculate what the variable(s) will be after a little
	more time has elapsed. We keep repeating this to see what the variable(s) do over time. Another
	thing that is different is that a <strong>numerical solution is only an approximation</strong>. It
	can be a very good approximation if it is done right, but it is an approximation none the less, so
	it is important to evaluate if the error is small enough.
</p>

<p>
	The numerical method we will use for this example is the Euler method. The
	<a href="http://en.wikipedia.org/wiki/Euler_method">Euler method</a> assumes you have a function
	that describes the first derivative of a variable with respect to time, and that you know the
	initial condition of that variable. The initial condition is what the value of the variable is at
	time t = 0.
</p>

<p><img alt="" src="/documentation/EPe10.png" /></p>

<p>
	The way the Euler method works is that it takes the current value of y and uses the equation for
	the time derivative of y to approximate what the value of y will be after some time interval, h.
</p>

<p><img alt="" src="/documentation/EPe11.png" /></p>

<p>
	This equation is easier to visualize with a chart. Note that when using numerical methods y(t) is
	not usually known. It is just shown on the chart below for visualization purposes.
	<img alt="Euler Method" src="/documentation/EulerMethod1.png" />
</p>

<p>
	Notice the Euler approximation of y does not line up exactly with the actual value of y. This is
	because the Euler method is just an approximation. If the time interval h is made smaller, then
	the approximation can be improved. In the chart below the time interval, h, for the blue line is
	half of that of the red line, and it comes closer to the true curve for y(t).
</p>

<p><img alt="Step Size with Euler Method" src="/documentation/EulerMethod2.png" /></p>

<p>
	Using a smaller time interval, h, is not the only way to get a more accurate approximation.
	Another way to get a more accurate result is to use a higher order method. For example, the chart
	below compares the Euler method to the fourth-order Runge-Kutta method. The same time interval, h,
	is used for both methods. The fourth-order
	<a href="http://en.wikipedia.org/wiki/Runge%E2%80%93Kutta_method">Runge-Kutta method</a> is much
	more accurate given the same time interval.
</p>

<p>
	<img
		alt="Euler Method vs. Runge-Kutta Method"
		src="/documentation/EulerMethodVsRunge-Kutta.png"
	/>
</p>

<p>
	The trebuchet simulation uses the fourth and fifth-order Runge-Kutta methods. However, the higher
	order methods are more complicated, so for the example problem we will use the Euler method since
	it is more concise, and the same procedure can be applied to the other methods. The equations for
	the fourth and fifth-order Runge-Kutta methods are given in the
	<a href="/documentation/explanation/RungeKutta">Runge-Kutta</a> section.
</p>

<h2>Solving the Example Problem Using Numerical Methods</h2>

<p>
	If we want to apply the Euler method to our example problem, we first need to get the equation of
	motion into the correct form. Remember that the Euler method assumes that we have an expression
	for the first order derivative of our variable(s) of interest. Our equation of motion, however, is
	a second order differential equation.
</p>

<p><img alt="" src="/documentation/EPe6.png" /></p>

<p>
	Somehow we need to get first order differential equation(s) from the equation of motion. We will
	do this by defining a new variable, v (velocity of the body).
</p>

<p><img alt="" src="/documentation/EPe12.png" /></p>

<p>If we plug v into our equation of motion we get</p>

<p><img alt="" src="/documentation/EPe13.png" /></p>

<p>
	Now we have two variables, y and v, and we have expressions for the first order derivative of each
	variable.
</p>

<p><img alt="" src="/documentation/EPe14.png" /> <img alt="" src="/documentation/EPe13.png" /></p>

<p>
	Now we can use the Euler method to solve these equations numerically. Using the Euler method does
	not give us a general solution to the equations. It is used to find the solution for a particular
	case, so to continue the example we have to assign values to all the system parameters, and solve
	the problem for that specific case. We will use the following values for the system parameters.
</p>

<blockquote>
	<p>g (gravitational constant) = 9.8 m/s² (in the negative y direction)</p>
	<p>m (mass of body) = 1 kg</p>
	<p>C (drag constant) = 0.015 kg/m</p>
	<p>y₀ (initial height of body) = 10 m</p>
	<p>v₀ (initial velocity of body) = 3 m/s (in the positive y direction)</p>
	<p>h (time interval) = 0.1 s</p>
</blockquote>

<p>
	Now that we have given values to all the parameters, we can use the Euler method to find the
	position of the body after 0.1 seconds.
</p>

<p><img alt="" src="/documentation/EPe15.png" /> <img alt="" src="/documentation/EPe16.png" /></p>

<p>
	Now we have the approximate values for the height of the ball and the velocity of the ball after
	0.1 seconds, and we can use that result to find the values after 0.2 seconds.
</p>

<p><img alt="" src="/documentation/EPe17.png" /> <img alt="" src="/documentation/EPe18.png" /></p>

<p>
	We can repeat this process for as much time as we are interested in. For this example we will
	follow the body until it reaches the ground. To be concise, we will not show the full equations
	for every step, rather the results will be summarized in the following table.
</p>
<center>
	<table>
		<tr>
			<th>Step</th>
			<th>t (s)</th>
			<th>y (m)</th>
			<th>v (m/s)</th>
		</tr>
		<tr>
			<td>0</td>
			<td>0.0</td>
			<td>10.0000</td>
			<td>3.0000</td>
		</tr>
		<tr>
			<td>1</td>
			<td>0.1</td>
			<td>10.3000</td>
			<td>2.0335</td>
		</tr>
		<tr>
			<td>2</td>
			<td>0.2</td>
			<td>10.5034</td>
			<td>1.0597</td>
		</tr>
		<tr>
			<td>3</td>
			<td>0.3</td>
			<td>10.6093</td>
			<td>0.0814</td>
		</tr>
		<tr>
			<td>4</td>
			<td>0.4</td>
			<td>10.6175</td>
			<td>-0.8986</td>
		</tr>
		<tr>
			<td>5</td>
			<td>0.5</td>
			<td>10.5276</td>
			<td>-1.8774</td>
		</tr>
		<tr>
			<td>6</td>
			<td>0.6</td>
			<td>10.3399</td>
			<td>-2.8521</td>
		</tr>
		<tr>
			<td>7</td>
			<td>0.7</td>
			<td>10.0546</td>
			<td>-3.8199</td>
		</tr>
		<tr>
			<td>8</td>
			<td>0.8</td>
			<td>9.6727</td>
			<td>-4.7780</td>
		</tr>
		<tr>
			<td>9</td>
			<td>0.9</td>
			<td>9.1949</td>
			<td>-5.7238</td>
		</tr>
		<tr>
			<td>10</td>
			<td>1.0</td>
			<td>8.6225</td>
			<td>-6.6546</td>
		</tr>
		<tr>
			<td>11</td>
			<td>1.1</td>
			<td>7.9570</td>
			<td>-7.5682</td>
		</tr>
		<tr>
			<td>12</td>
			<td>1.2</td>
			<td>7.2002</td>
			<td>-8.4623</td>
		</tr>
		<tr>
			<td>13</td>
			<td>1.3</td>
			<td>6.3540</td>
			<td>-9.3349</td>
		</tr>
		<tr>
			<td>14</td>
			<td>1.4</td>
			<td>5.4205</td>
			<td>-10.1842</td>
		</tr>
		<tr>
			<td>15</td>
			<td>1.5</td>
			<td>4.4021</td>
			<td>-11.0086</td>
		</tr>
		<tr>
			<td>16</td>
			<td>1.6</td>
			<td>3.3012</td>
			<td>-11.8068</td>
		</tr>
		<tr>
			<td>17</td>
			<td>1.7</td>
			<td>2.1205</td>
			<td>-12.5777</td>
		</tr>
		<tr>
			<td>18</td>
			<td>1.8</td>
			<td>0.8628</td>
			<td>-13.3204</td>
		</tr>
		<tr>
			<td>19</td>
			<td>1.9</td>
			<td>-0.4693</td>
			<td>-14.0343</td>
		</tr>
	</table>
</center>
<p>
	We can see that at step 19 the value for y went negative which means the body hit the ground
	sometime between 1.8 and 1.9 seconds. The results of this problem summarized in the table are
	plotted in the graph below.
</p>

<p><img alt="Example Problem Results" src="/documentation/ExampleProblemResults.png" /></p>

<p>
	As mentioned before this is only an approximation of the results. Since we also have the
	analytical solution to this problem we can compare the results that we got from using the Euler
	method to the exact values from the analytical solution. The dotted line shows the analytical
	solution.
</p>

<p>
	This simple example should have demonstrated the essentials of what is needed to understand what
	is going on in the trebuchet simulation. First the equations of motion are derived. They are then
	then reduced to first order differential equations and then solved using a numerical method like
	the Euler or Runge-Kutta method.
</p>

<p>
	This example problem should have helped prepared you for the
	<a href="/documentation/explanation/EquationsOfMotion">Equations of Motion</a> and
	<a href="/documentation/explanation/RungeKutta">Runge-Kutta</a> sections.
</p>
