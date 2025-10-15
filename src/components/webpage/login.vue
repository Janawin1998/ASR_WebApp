<template>
  	<div class="login">
        <div class="header-asr-text">ASR</div>
            <div class="role-box">
			<!-- <div class="role-box-select"> -->
			<div class="role-box-select" >
				<div class="role-text-select">{{ this.role }}</div>
			    	<div class="btn-group">
						<button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split " data-bs-toggle="dropdown" aria-expanded="false">
						</button>
						<ul class="dropdown-menu dropdown-menu-end">
							<!-- Dropdown menu links -->
							 	<li><button class="dropdown-item" type="button" @click="this.role = 'Manager'">Manager</button></li>
								<li><button class="dropdown-item" type="button" @click="this.role = 'Transcriber'">Transcriber</button></li>
								<li><button class="dropdown-item" type="button" @click="this.role = 'Viewer'">Viewer</button></li>
						</ul>
					</div>
				</div>
      			<div class="role-text">Role</div>
    		</div>
            <div class="user-box">
      			<input class="user-box-select" type="text" placeholder="username"/>
      			<div class="user-text">User</div>
    		</div>
    		<div class="password-box">
      			<input class="password-box-select" type="password" placeholder="password"/>
      			<div class="password-text">Password</div>
    		</div>
			<div class="remember-me">
				<input type="checkbox" id="rememberMe" name="rememberMe">
				<label for="rememberMe"> Remember Me</label>
			</div>
    		<div class="btn-login">
                LOGIN
    		</div>
  	</div>
</template>

<script>
export default {
    name: 'login',
	data() {
		return {
			item: null,
			role: '',
		}
	},
	methods: {
		// select_role(item, event) {
		// 	console.log(event);
		// 	const roleBoxSelect = event.currentTarget.querySelector('.role-box-select');
		// 	const roleText = event.currentTarget.querySelector('.role-text');
		// 	if (roleBoxSelect.style.backgroundColor === 'rgb(217, 217,	 217)') {
		// 		roleBoxSelect.style.backgroundColor = '#808080';
		// 		roleText.style.color = 'white';
		// 	} else {
		// 		roleBoxSelect.style.backgroundColor = '#d9d9d9';
		// 		roleText.style.color = 'black';
		// 	}
		// },
	},

}
</script>

<style>

.login {
    max-width: 1920px;
    max-height: 1080px;
	width: 1920px;
	height: 1080px;
  	/* width: 1920px;
  	position: relative;
  	background-color: #fff;
  	height: 1080px; */
    margin: 0;
  	text-align: center;
  	font-size: 22px;
  	font-family: Roboto;
	/* background-color: rgb(214, 248, 237); */
}
.password-box {
  	position: absolute;
  	top: 501px;
  	left: 765px;
  	width: 560px;
  	height: 112px;
}
.password-box-select {
  	position: absolute;
  	top: 42px;
  	left: 0px;
  	background-color: #d9d9d9;
  	width: 400px;
  	height: 40px;
}
.password-text {
  	position: absolute;
  	top: 0px;
  	left: 0px;
}
.user-box {
  	position: absolute;
  	top: 400px;
  	left: 765px;
  	width: 562px;
  	height: 112px;
}
.user-box-select {
  	position: absolute;
  	top: 42px;
  	left: 2px;
  	background-color: #d9d9d9;
  	width: 400px;
  	height: 40px;
}
.user-text {
  	position: absolute;
  	top: 0px;
  	left: 0px;
}
.role-box {
  	position: absolute;
  	top: 299px;
  	left: 765px;
  	width: 560px;
  	height: 112px;
}
.role-box-select {
  	position: absolute;
  	top: 42px;
  	left: 0px;
  	background-color: #d9d9d9;
  	width: 400px;
  	height: 40px;
	text-align: right;
	border: black 1px solid;
}
.role-text-select{
  	position: absolute;
	width: 370px;
  	height: 40px;
	text-align: left;
	user-select: none;
	padding-top: 2px;
	padding-left: 10px;
}
.role-dropdown {
	width: 400px;
	height: 40px;
	text-align: left;
	right: 0px;
}
.role-text {
  	position: absolute;
  	top: 0px;
  	left: 0px;
}
.btn-login {
  	position: absolute;
  	top: 640px;
  	left: 890px;
  	width: 150px;
  	height: 50px;
  	font-size: 32px;
    border: black 1px solid;
    border-radius: 8px;
    background-color: #d9d9d9;
    display: flex;
  	align-items: center;
  	justify-content: center;
    user-select: none;
}

.btn-login:hover {
    cursor: pointer;
    background-color: #b3b3b3;
}

.btn-login:active {
    background-color: #808080;
    color: white;
}

.remember-me {
  	position: absolute;
  	top: 590px;
  	left: 765px;
  	font-size: 20px;
	user-select: none;
}
.header-asr-text {
  	position: absolute;
  	top: 87px;
  	left: 584px;
  	font-size: 140px;
  	display: flex;
  	align-items: center;
  	justify-content: center;
  	width: 751px;
  	height: 173px;
}

.dropdown-menu {
	width: 400px;
	text-align: left;
	right: 0px;
}
</style>