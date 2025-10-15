<template>
  	<div class="search">
    		<div class="header">
      			<div class="asr-header">
      			</div>
      			<div class="asr-header-text">AST-ASR Team Transcription</div>
    		</div>
    		<div class="filename-text">File Names</div>
            <input class="search-input" >
    		<div class="search-btn">
                Search 
    		</div>
            <div class="table-search">
                <table class="file-table">
						<thead>
						<tr class="table-search-header">
							<th>No.</th>
							<th>File Name</th>
							<th>Progress</th>
							<th>Upload Date</th>
							<th>Action</th>
							<th>Role</th>
						</tr>
						</thead>
						<tbody>
						<tr v-for="(file, index) in files" :key="index">
							<td class="action-text">{{ index + 1 }}.</td>
							<td class="action-text">{{ file.name }}</td>
							<td class="action-text">{{ file.progress }}</td>
							<td class="action-text">{{ file.date }}</td>
							<td class="action-box">
								<div>
									<img src="../../assets/svg/PencilSquare.svg" class="action-item">
									<img src="../../assets/svg/Trash.svg" class="action-item">
								</div>
							</td>
							<td class="action-text">{{ file.role }}</td>
						</tr>
						</tbody>
					</table>
            </div>
  	</div>
</template>

<script>
export default {
    name: 'search',
    data() {
        return {
           files: [
          {
            id: 1,
            name: 'LCL1_1.wav',
            progress: '15%',
            date: '05/10/2025',
            role: 'manager',
            file: null
          },
          {
            id: 2,
            name: 'LCL1_2.wav',
            progress: '50%',
            date: '09/10/2025',
            role: 'manager',
            file: null
          }
            ], 
        }
    }
}
</script>

<style>

.search {
  	width: 1920px;
  	position: relative;
  	background-color: #fff;
  	box-sizing: border-box;
  	height: 1080px;
    margin: 0;
  	text-align: left;
  	font-size: 32px;
  	color: #000;
  	font-family: roboto;
}

.filename-text {
  	position: absolute;
  	top: 150px;
  	left: 113px;
    user-select: none;
}
.search-input {
  	position: absolute;
  	top: 145px;
  	left: 312px;
  	border: 1px solid gba(0, 0, 0, 0.2);
  	box-sizing: border-box;
  	width: 437px;
  	height: 58px;
    user-select: none;
}
.search-btn {
  	position: absolute;
    background-color: #d9d9d9;
  	border: 1px solid #000;
  	box-sizing: border-box;
  	top: 145px;
  	left: 836px;
  	width: 167px;
  	height: 58px;
    text-align: center ;
    padding-top: 4px;
    user-select: none;
}
.search-btn:hover {
    cursor: pointer;
    background-color: #bfbfbf;
}  
.search-btn:active {
    background-color: #808080;
}

.table-search{
    position: absolute;
    top: 250px;
    left: 100px;
    width: 1800px;
    height: 700px;
    overflow-y: auto;
}
.table-search-header{
	text-align: center;
	user-select: none;
}
.action-box{
  display: relative;
  width: 200px;
  height: 40px;
  text-align: center;
  
}
.action-item {
  display: relative;
  padding: 0.1em;
  user-select: none; 
  -webkit-user-drag: none;
}
.action-item:hover {
	cursor: pointer;
	background-color: #b3b3b3;
	border-radius: 8px;
}
.action-item:active {
	background-color: #808080;
	border-radius: 8px;
}
.action-text{
  text-align: center;
  user-select: none;
}
</style>