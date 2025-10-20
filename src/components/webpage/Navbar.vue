<template>
    <div class="header">
      			<div class="asr-header">
      			</div>
      			<div class="asr-header-text">AST-ASR Team Transcription</div>
    		</div>
  <div class="navbar">
    <div class="navbar-logo">
      <img src="../../assets/svg/ASR_Logo.svg" alt="ASR Logo" class="logo-image"/>
    </div>
    <div class="navbar-links">
        <a href="search" class="navbar-link">Home</a>
        <a href="transcript" class="navbar-link">Transcript</a>
    </div>
    <div class="navbar-user">
        <img src="../../assets/svg/UserIcon.svg" alt="User Icon" class="user-icon"/>
        <span class="username-text">Username</span>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Navbar',
    data() {
        return {

        }
    }
}
</script>

<style>
.header {
  	position: absolute;
  	top: 0px;
  	left: 0px;
  	width: 1920px;
  	height: 71px;
  	font-family: roboto;
}
.asr-header {
  	position: absolute;
  	top: 0px;
  	left: 0px;
  	background-color: #d9d9d9;
  	width: 1920px;
  	height: 71px;
}
.asr-header-text {
  	position: absolute;
  	top: 15px;
  	left: 21px;
}
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333;
    padding: 10px 20px;
    color: white;
}
.navbar-logo .logo-image {
    height: 40px;
}
.navbar-links {
    display: flex;
    gap: 20px;
}
.navbar-link {
    color: white;
    text-decoration: none;
    font-size: 18px;
}
.navbar-link:hover {
    text-decoration: underline;
}
.navbar-user {
    display: flex;
    align-items: center;
    gap: 10px;
}
.user-icon {
    height: 30px;
    width: 30px;
}
.username-text {
    font-size: 16px;
}
</style>