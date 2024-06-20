<form>
		<div>
			<label>Username</label>
		</div>
		<div style="margin-bottom:10px;">
			<input type="text" name="username" id="username" class="formcontrol" placeholder="Enter the username"/>
		</div>
		<div>
			<label>Email</label>
		</div>
		<div style="margin-bottom:10px;">
			<input type="email" name="email" id="email" class="formcontrol" placeholder="abcdef@gmail.com"/>
		</div>
		<div>
			<label>Password</label>
		</div>
		<div style="margin-bottom:10px;">
			<input type="password" name="password" id="password" class="formcontrol"/>
		</div>
		<div>
			<label>Confirm Password</label>
		</div>
		<div style="margin-bottom:10px;">
			<input type="password" name="confirmpassword" id="confirmpassword" class="formcontrol"/>
		</div>
		<div style="margin-bottom:10px;">
			<label>Gender: </label>		
			<label><input type="radio" name="gender" value="female" class="formcontrol"/>Female</label>
			<label><input type="radio" name="gender" value="male" class="formcontrol"/>Male</label>
		</div>
		<div>
			<label>Mobile</label>
		</div>
		<div style="margin-bottom:10px;">
			<input type="phone" pattern="[0-9]{10}"name="mobile" id="mobile" class="formcontrol" maxlength="10"/>
		</div>
		<div>
			<label>State</label>
		</div>
		<div style="margin-bottom:10px;">
			<select name="state" class="formcontrol">
				<option>select state</option>
				<option value="Andhra pradesh">Andhra pradesh</option>
				<option value="arunachal Pradesh"> arunachal Pradesh</option>
				<option value="Maharashtra"> Maharashtra</option>
				<option value="Karnataka"> Karnataka</option>
				<option value="Tamil nadu"> Tamil nadu</option>			
			</select>
		</div>
		<div>
			<button>Register</button>
		</div>
	</form>