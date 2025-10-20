<template>
  	<div class="search">
		<Navbar>
		</Navbar>
    		<div class="filename-text">File Names</div>
            <input class="search-input" >
    		<div class="search-btn">Search</div>
			<a class="upload-btn" href="upload">
				<img src="../../assets/svg/Upload.svg" class="upload-item-search">
				Upload Files
			</a>
            <div class="table-search table-responsive">
                <table class="table table-bordered align-middle table-sm" style="border:solid 2px #000000;">
						<thead class="table-dark">
						<tr class="table-search-header">
							<th style="width:80px">No.</th>
							<th>Select</th>
							<th>File Name</th>
							<th style="width:90px;">Progress</th>
							<th style="width:200px">Upload Date</th>
							<th style="width:200px">Action</th>
							<th style="width:300px">Role</th>
						</tr>
						</thead>
						<tbody>
						<tr v-for="(file, index) in files" :key="index">
							<td class="action-text">{{ index + 1 }}.</td>
							<td class="action-box">
								<div @click="togglefile(index)">
                                <img v-if="!this.selectitem[index]"  src="../../assets/svg/CheckCircle.svg" class="select-item-search">
                                <img v-if="this.selectitem[index]"  src="../../assets/svg/CheckCircleFill.svg" class="select-item-search">
                                </div>
							</td>
							<td class="action-text">{{ file.name }}</td>
							<td class="action-text">{{ file.progress }}</td>
							<td class="action-text">{{ file.date }}</td>
							<td class="action-box">
									<img src="../../assets/svg/PencilSquare.svg" class="action-item">
									<img src="../../assets/svg/Trash.svg" class="action-item">
							</td>
							<td class="action-text">{{ file.role }}</td>
						</tr>
						</tbody>
					</table>
            </div>
  	</div>
</template>

<script>
import Navbar from './Navbar.vue';
export default {
    name: 'search',
	components: {
		Navbar,
	},
    data() {
        return {
           files: [
          {
            id: 1,
            name: 'LCL1_1.wav',
            progress: '15%',
            date: '05/10/2025',
            role: 'LCL1',
            file: null
          },
          {
            id: 2,
            name: 'LCL1_2.wav',
            progress: '50%',
            date: '09/10/2025',
            role: 'LCL1',
            file: null
          },
		   {
            id: 3,
            name: 'LCL1_2.wav',
            progress: '50%',
            date: '09/10/2025',
            role: 'LCL1',
            file: null
          },
		   {
            id: 4,
            name: 'LCL1_2.wav',
            progress: '50%',
            date: '09/10/2025',
            role: 'LCL1',
            file: null
          },
		   {
            id: 5,
            name: 'LCL1_2.wav',
            progress: '50%',
            date: '09/10/2025',
            role: 'LCL1',
            file: null
          },
		   {
            id: 6,
            name: 'LCL1_2.wav',
            progress: '50%',
            date: '09/10/2025',
            role: 'LCL1',
            file: null
          },
		   {
            id: 7,
            name: 'LCL1_2.wav',
            progress: '50%',
            date: '09/10/2025',
            role: 'LCL1',
            file: null
          },
		   {
            id: 8,
            name: 'LCL1_2.wav',
            progress: '50%',
            date: '09/10/2025',
            role: 'LCL1',
            file: null
          },
		   {
            id: 9,
            name: 'LCL1_2.wav',
            progress: '50%',
            date: '09/10/2025',
            role: 'LCL1',
            file: null
          },
		   {
            id: 10,
            name: 'LCL1_2.wav',
            progress: '50%',
            date: '09/10/2025',
            role: 'LCL1',
            file: null
          },
		   {
            id: 11,
            name: 'LCL1_2.wav',
            progress: '50%',
            date: '09/10/2025',
            role: 'LCL1',
            file: null
          },
		   {
            id: 12,
            name: 'LCL1_2.wav',
            progress: '50%',
            date: '09/10/2025',
            role: 'LCL1',
            file: null
          },
		   {
            id: 13,
            name: 'LCL1_2.wav',
            progress: '50%',
            date: '09/10/2025',
            role: 'LCL1',
            file: null
          },
		   {
            id: 14,
            name: 'LCL1_2.wav',
            progress: '50%',
            date: '09/10/2025',
            role: 'LCL1',
            file: null
          },
		   {
            id: 15,
            name: 'LCL1_2.wav',
            progress: '50%',
            date: '09/10/2025',
            role: 'LCL1',
            file: null
          },

            ], 
	      selectitem: {},
        }
    },
	methods: {
		togglefile(index) {
			this.selectitem[index] = !this.selectitem[index];
		},
	},
}
</script>

<style>
/* @import '../../assets/css/search.css'; */
:root .table-bordered th,
:root .table-bordered td {
  border-width: 2px; /* Adjust the desired border width */
}

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
	font-size: 24px;
}
.search-input {
  	position: absolute;
  	top: 145px;
  	left: 250px;
  	border: 1px solid gba(0, 0, 0, 0.2);
  	box-sizing: border-box;
  	width: 400px;
  	height: 40px;
    user-select: none;
}
.search-btn {
  	position: absolute;
    background-color: #d9d9d9;
  	border: 1px solid #000;
  	box-sizing: border-box;
  	top: 145px;
  	left: 700px;
  	width: 120px;
  	height: 40px;
	font-size: 24px;
    text-align: center ;
    padding-top: 2px;
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
    position: relative;
    top: 250px;
    /* left: 100px; */
    width: 1500px;
    height: 630px;
    overflow-y: auto;
	margin-left: 200px;
	border: solid 2px #e7e7e7;
}
.table-search-header{
	text-align: center;
	user-select: none;
	font-size: 20px;
}
.action-box{
  display: relative;
  width: 200px;
  height: auto;
  text-align: center;
}
.action-item {
  display: relative;
  padding: 0.1em;
  user-select: none; 
  -webkit-user-drag: none;
  width: 40px;
  height: 40px;
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
  font-size: 24px;
}
.action-images {
	height: 40px;
	
}
.upload-btn {
  	position: absolute;
	background-color: #d9d9d9;
  	border: 1px solid #000;
  	box-sizing: border-box;
  	top: 230px;
  	left: 250px;
  	width: 200px;
  	height: 45px;
	font-size: 24px;
	text-align: center ;
	padding-top: 4px;
	user-select: none;
	background-color: #d4d4d4;
	text-decoration: none;
	color: black;
	-webkit-user-drag: none;
}
.upload-btn:hover {
	cursor: pointer;
	background-color: #dfdfdf;
}
.upload-btn:active {
	background-color: #808080;
}
.select-item-search {
  display: relative;
  user-select: none; 
  -webkit-user-drag: none;
  width: 40px;
  height: 40px;
}
.select-item-search:hover {
	cursor: pointer;
	background-color: #d4d4d4;
	border-radius: 20px;
}
.select-item-search:active {
	background-color: #808080;
	border-radius: 20px;
}
.upload-item-search{
  display: relative;
  user-select: none; 
  -webkit-user-drag: none;
  width: 30px;
  height: 30px;
  margin-right: 5px; 
}
</style>