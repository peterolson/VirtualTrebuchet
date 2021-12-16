<h1>Runge-Kutta</h1>

<p>
	The <a href="http://en.wikipedia.org/wiki/Runge%E2%80%93Kutta_methods">Runge-Kutta</a> methods are
	a set of numerical methods for solving first order differential equations of the form,
	<img alt="" src="/documentation/EPe10.png" />
</p>

<p>
	They take the variable (y in the equation above) at a given time and use the known expression for
	the derivative of the variable to approximate the value of the variable a small interval of time,
	h, later in time. The simplest Runge-Kutta method is also known as the
	<a href="http://en.wikipedia.org/wiki/Euler_method">Euler method</a> which is what the
	<a href="/documentation/explanation/ExampleProblem">Example Problem</a> used. It uses the
	following expression to approximate what y will be after the time interval h.
	<img alt="" src="/documentation/EPe11.png" />
</p>

<p>
	The Euler method is simple since it is only the first order Runge-Kutta, but it has poor accuracy.
	Much better accuracy can be obtained using the same step size, h, by using the following fourth
	order Runge-Kutta method. This fourth order Runge-Kutta method is probably the most commonly used
	Runge-Kutta method, as it it a good balance between accuracy and complexity.
</p>

<p>
	<img alt="" src="/documentation/FourthOrderRungeKutta.png" />
	<img alt="" src="/documentation/FourthOrderRungeKuttaK1.png" />
	<img alt="" src="/documentation/FourthOrderRungeKuttaK2.png" />
	<img alt="" src="/documentation/FourthOrderRungeKuttaK3.png" />
	<img alt="" src="/documentation/FourthOrderRungeKuttaK4.png" />
</p>

<p>
	This next method is a version of the fifth order Runge-Kutta method. (There are several different
	versions of the higher order methods.) It is more accurate than the fourth order Runge-Kutta
	method, although it is also more complex.
</p>

<p>
	<img alt="" src="/documentation/FifthOrderRungeKutta.png" />
	<img alt="" src="/documentation/FifthOrderRungeKuttaK1.png" />
	<img alt="" src="/documentation/FifthOrderRungeKuttaK2.png" />
	<img alt="" src="/documentation/FifthOrderRungeKuttaK3.png" />
	<img alt="" src="/documentation/FifthOrderRungeKuttaK4.png" />
	<img alt="" src="/documentation/FifthOrderRungeKuttaK5.png" />
	<img alt="" src="/documentation/FifthOrderRungeKuttaK6.png" />
</p>

<p>
	The trebuchet simulation uses the fifth order Runge-Kutta method to solve the
	<a href="/documentation/explanation/EquationsOfMotion">Equations of Motion</a>. It also uses the
	fourth order Runge-Kutta method to check the accuracy of the solution. Any numerical method only
	gives an approximation of the actual answer, and its accuracy is dependent on the step size, h.
	The way the simulation determines it is using a small enough step size is that it compares the
	answers of the fourth and fifth order methods to make sure the answers agree within a specified
	tolerance of each other. If the answers are very close then the answer is considered to be a
	reasonable approximation, but if they aren’t close, the time step is made smaller until the
	answers do agree within the tolerance.
</p>
