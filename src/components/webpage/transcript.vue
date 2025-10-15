<template>
  	<div class="transcript">
    		<div class="header">
      			<div class="asr-header">
      			</div>
      			<div class="asr-header-text">AST-ASR Team Transcription</div>
    		</div>
    		<div class="table-container">
                 <table class="table">
						<thead>
						<tr>
							<th>id</th>
							<th>Select</th>
							<th>Segment</th>
							<th>Play</th>
							<th>Transcript</th>
							<th>Edit</th>
                            <th>Complete</th>
                            <th>WER</th>
                            <th>Role</th>
                            <th>Note</th>
						</tr>
						</thead>
						<tbody>
						<tr v-for="(file, index) in files" :key="index">
							<td>{{ index + 1 }}.</td>
                            <td >
                                <div @click="togglefile(index)" class="select-table">
                                <img v-if="!this.selectitem[index]"  src="../../assets/svg/CheckCircle.svg" class="select-item">
                                <img v-if="this.selectitem[index]"  src="../../assets/svg/CheckCircleFill.svg" class="select-item">
                                </div>
                            </td>
							<td>{{ file.name }}</td>
                            <td>
                                <div @click="toggleplay(index)" class="select-table">
                                <img v-if="!this.isPlaying[index]"  src="../../assets/svg/PlayCircle.svg" class="select-item">
                                <img v-if="this.isPlaying[index]"  src="../../assets/svg/StopCircleFill.svg" class="select-item">
                                </div>
                            </td>
							<td>
                                <!-- <div @click="viewtranscript(index)" class="select-table">
                                <img src="../../assets/svg/file-earmark-text.svg" class="transcript-item">
                                </div> -->
                                {{ file.transcript }}
                            </td>
							<td>
                                <div @click="edittranscript(index)" class="select-table">
                                <img src="../../assets/svg/PencilSquare.svg" class="select-item">
                                </div>
                            </td>
							<td>
                                <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {{file.complete || 'Select'}}
                                </button>
                                <ul class="dropdown-menu drropdown-menu-end">
                                    <li><a class="dropdown-item" @click="completestatus('Incomplete',index)">Incomplete</a></li>
                                    <li><a class="dropdown-item" @click="completestatus('Complete',index)">Complete</a></li>
                                </ul>
                                </div>
                            </td>
							<td>{{ file.wer }}</td>
                            <td>{{ file.position }}</td>
							<td>
                                <div>
                                    <img src="../../assets/svg/three-dots.svg" class="transcript-item">
                                </div>
                            </td>
						</tr>
						</tbody>
					</table>
      		</div>
    		<div class="transcript-btn">
      			<b class="transcript-text">Transcript</b>
                <img class="micfill-icon" src="../../assets/svg/MicFill.svg">
    		</div>
    		<div class="export-btn">
      			<b class="export-text">Export to CSV</b>
                <img class="boxarrowup-icon" src="../../assets/svg/boxarrowup.svg">
    		</div>
    	
  	</div>
</template>

<script>
import { reactive } from 'vue';
export default {
    name: 'transcript',
    data() {
        return {
           files: [
          {
            id: 1,
            name: 'Username250923_LCL1_001',
            transcript: 'psa eight one zero turn right to trasadingen ...',
            position: 'LCL1',
            wer: '15%',
            include: true,
            file: null
          },
          {
            id: 2,
            name: 'Username250923_LCL1_002',
            transcript: 'psa eight one zero contact zurich one ...',
            position: 'LCL1',
            wer: '20%',
            include: true,
            file: null
          }
            ], 
          selectitem: reactive({}),
          isPlaying: reactive({}),
          status_complete: reactive({}),
        }
    },
    methods: {
        togglefile(index) {
            this.selectitem[index] = !this.selectitem[index];
            console.log(this.selectitem);
        },
        toggleplay(index) {
            this.isPlaying[index] = !this.isPlaying[index];
            console.log(this.isPlaying);
        },
        viewtranscript(index) {
            alert("View Transcript of " + this.files[index].name);
        },
        edittranscript(index) {
            alert("Edit Transcript of " + this.files[index].name);
        },
        completestatus(value,index) {
            this.files[index].complete = value;
            // const status = event ? 'Complete' : 'Incomplete';
            // this.status_complete[index] = status;
            // console.log(this.status_complete);
            // this.status_complete[index] = status;
            // console.log(this.status_complete);
        },
    }
}
</script>

<style>


.transcript {
  	width: 1920px;
  	position: relative;
  	background-color: #fff;
  	height: 1080px;
  	overflow: hidden;
  	text-align: center;
  	font-size: 36px;
  	color: #000;
  	font-family: roboto;
}
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
.table-container {
  	position: absolute;
  	top: 323px;
  	left: 59px;
  	background-color: rgba(137, 137, 137, 0);
  	border: 1px solid #000;
  	box-sizing: border-box;
  	width: 1802px;
    height: 600px;
    /* display: grid; */
    overflow-x: hidden;
  	overflow-y: scroll;
    user-select: none ;
}

.transcript-btn {
  	position: absolute;
  	top: 156px;
  	left: 48px;
  	width: 338px;
  	height: 82.5px;
    background-color: #a2d1e2;
    user-select: none;
}
.transcript-btn:hover {
    cursor: pointer;
    background-color: #8df0ff;
}
.transcript-btn:active {
    background-color: #15b4c0;
    color: white;
}
.transcript-text {
  	position: absolute;
  	top: 16px;
  	left: calc(50% - 169px);
  	display: flex;
  	align-items: center;
  	justify-content: center;
  	width: 262.3px;
  	height: 52.5px;
}
.export-btn {
  	position: absolute;
  	top: 156px;
  	left: 409px;
  	width: 395px;
  	height: 82.5px;
    background-color: #59c998;;
    user-select: none;
}
.export-btn:hover {
    cursor: pointer;
    background-color: #31e2b4;
}
.export-btn:active {
    background-color: #00b37e;
    color: white;
}
.export-box {
  	position: absolute;
  	top: 0px;
  	left: 13px;
  	background-color: #59c998;;
  	width: 382px;
  	height: 82.5px;
}
.export-text {
  	position: absolute;
  	top: 16px;
  	left: calc(50% - 197.5px);
  	display: flex;
  	align-items: center;
  	justify-content: center;
  	width: 306.5px;
  	height: 52.5px;
}
.micfill-icon {
  	position: absolute;
  	top: 15px;
  	right: 20px;
  	width: 46px;
  	height: 46px;
}
.boxarrowup-icon {
  	position: absolute;
  	top: 15px;
  	right: 20px;
  	width: 50px;
  	height: 50px;
}
.transcript-box {
  	position: absolute;
  	top: 300px;
  	left: 20px;
  	width: 1800px;
  	height: 600px;
}
.transcript-table {
  	width: 1802px;
    border-collapse: collapse;
    background: white;
    /* border-radius: 8px; */
    /* box-shadow: 0 2px 4px rgba(0,0,0,0.1); */
	color: black;
}
.select-table{
    user-select: none;
}
.select-item{
    color: black;
    user-select: none ;
}
.transcript-item{
    width: 46px;
    height: 46px;
    color: black;
    user-select: none ;
}
</style>