<template>
  	<div class="transcript">
    		<Navbar></Navbar>
    		<div 
			@dragenter.prevent="toggleActive" 
			@dragleave.prevent="toggleActive" 
			@dragover.prevent
			@drop.prevent="drop($event)"
			:class="{ 'active-dropzone': isActive }"
			class="upload-container"
			>
				<div v-if="files.length === 0" 
				:class="{ 'active-upload': isActive }"
				class="upload-browse"
				>
				<span>Drop File</span>
				<span>OR</span>
				<label for="file-upload">Select File</label>
				<span>(.wav files only)</span>
				<input 
				type="file" 
				id="file-upload"
				multiple
				accept=".wav" 
				@change="upload_file($event)"
				/>
				</div>

				<div v-else class="upload-browse">
					<table class="file-table">
						<thead>
						<tr>
							<th>No.</th>
							<th>File Name</th>
							<th>Size</th>
							<th>Duration</th>
							<th>Position</th>
							<th>Preview</th>
							<th>Include</th>
						</tr>
						</thead>
						<tbody>
						<tr v-for="(file, index) in files" :key="index">
							<td>{{ index + 1 }}.</td>
							<td>{{ file.name }}</td>
							<td>{{ file.size }}</td>
							<td>{{ file.duration }}</td>
							<td>
							<select class="position-select" v-model="file.position">
								<option value="LCL1">LCL1</option>
								<option value="LCL2">LCL2</option>
								<option value="LCL3">LCL3</option>
							</select>
							</td>
							<td>
							<button class="preview-btn" @click="previewAudio(file)">🔊</button>
							</td>
							<td>
							<input type="checkbox" class="include-checkbox" v-model="file.include">
							</td>
						</tr>
						</tbody>
					</table>
				</div>
    		</div>

    		<div class="preview-container">
				<AudioPreview 
					v-if="selectedAudio"
					:audio-file="selectedAudio"
					:current-time="currentTime"
					:is-playing="isPlaying"
					@play-pause="playPause"
					@seek="seekAudio"
				/>
    		</div>
    		<button class="process-btn" @click="senddata()" :disabled="!loading">
      			Process
    		</button>
    		<button class="cancel-btn" @click="clearfiles()">
				Cancel
    		</button>
			<div v-if="loadingCircle" class="loading-overlay">
				<div class="loading-spinner">
				<div class="spinner"></div>
					<p class="loading-text">Loading...</p>
				</div>
            </div>
  	</div>
</template>

<script>
// Common.js
import VueAxios from "vue-axios";
import axios from "axios";
import AudioPreview from '../audio_process/AudioPreview.vue';
import Navbar from "./Navbar.vue";
import path from "path";
export default {    
    name: 'upload',
	components: {
		AudioPreview,
		Navbar
	},
	data() {
		return {
			isActive: false,
			files: [
			],
			splitfile: {},
			isPlaying: false,
			selectedAudio: null,
        	currentTime: '0:00',
			maxFiles: 1,
			loading: false,
			loadingCircle: false,
			pathname: '',

		}
	},
	mounted() {
		addEventListener('mouseup', this.stopPlayback);
	},
	computed: {
      hasSelectedFiles() {
        return this.files.some(file => file.include)
      }
    },
	methods: {
		async senddata(index) {
			this.loading = false
			localStorage.removeItem('transcript')
			const filelength = this.files.length
			this.loadingCircle = true
			let filepath = null

			const apiUrl = 'http://192.168.137.30:6001/process-split-file';
			// const apiUrl = 'http://192.168.137.30:6000/process-split-file'; // Replace with your API endpoint
			const apiKey = '178b26656fcc49470f572b34984f7db1155ae249088fd5424c2df28bfd8d5afb'; // Replace with your actual API key
			// const apitoken = 'api-token'
			const headers = {
				'Content-Type': 'application/json', // Or other appropriate content type
				'Authorization'	: `Bearer ${apiKey}`, // Example for a Bearer token API key
				'api-token': apiKey, // Alte.rnative for an API key passed directly in a custom header
				};
			const body = {
				filename: this.files[0].name,
				// path: "C:\\ASR\\audio\\LCL1_1.wav",
				path: "",
				user_name:"LCL1_1"
			};

			await axios.post(apiUrl, body,  {headers})
			
			.then(async (res) => {
				console.log('Data fetched successfully:', res.data);
				await localStorage.setItem('transcript', JSON.stringify(res));
				this.loadingCircle = false
				this.$router.push({ name: 'transcript' });
			})
			.catch(error => {
				console.error('Error fetching data:', error);
			});
		},
		toggleActive() {
			this.isActive = !this.isActive;
		},
		upload_file(event) {
		this.isActive = false
        const uploadedFiles = Array.from(event.target.files)
        console.log(uploadedFiles);
        if (this.files.length + uploadedFiles.length > this.maxFiles) {
          alert(`สามารถอัปโหลดได้สูงสุด ${this.maxFiles} ไฟล์`)
          return
        }
  
        uploadedFiles.forEach(file => {
          this.files.push({
            id: Date.now() + Math.random(),
            name: file.name,
            size: this.formatFileSize(file.size),
            duration: 'กำลังประมวลผล...',
            position: 'LCL1',
            include: false,
            file: file
          })
		console.log(this.files)
		  this.getAudioDuration(file, this.files.length - 1)
})
  
		
        // Clear file input
        event.target.value = ''
		// this.senddata(this.files.length - 1)
        },
		formatFileSize(bytes) {
			const mb = bytes / (1024 * 1024)
			return mb.toFixed(1) + ' MB'
			},
		getAudioDuration(file, index) {
			const audio = new Audio()
			const url = URL.createObjectURL(file)
			
			audio.addEventListener('loadedmetadata', () => {
			const minutes = Math.floor(audio.duration / 60)
			const seconds = Math.floor(audio.duration % 60)
			this.files[index].duration = `${minutes}.${seconds} mins`
			URL.revokeObjectURL(url)
			})
			
			audio.src = url
			this.files[index].path = audio.src
			console.log(audio.src)
			this.loading = true
		},
  
		drop(event) {
			this.isActive = false;
			const uploadedFiles = event.dataTransfer.files[0]
			// const uploadedFiles = Array.from(event.dataTransfer.files)
			console.log(uploadedFiles.length);
			let filepath = null

		if ((this.files.length + uploadedFiles.length) > this.maxFiles) {
          alert(`สามารถอัปโหลดได้สูงสุด ${this.maxFiles} ไฟล์`)
          return
        }

		if (uploadedFiles.type.startsWith('audio/')) {
          this.files.push({
            id: Date.now() + Math.random(),
            name: uploadedFiles.name,
            size: this.formatFileSize(uploadedFiles.size),
            duration: 'กำลังประมวลผล...',
            position: 'LCL1',
            include: false,
            file: uploadedFiles
          })
		  this.getAudioDuration(uploadedFiles, this.files.length - 1)
		}
		else {
			alert('กรุณาอัปโหลดไฟล์ .wav เท่านั้น')
			return
		}
			
		// uploadedFiles.forEach(file => {
        //   this.files.push({
        //     id: Date.now() + Math.random(),
        //     name: file.name,
        //     size: this.formatFileSize(file.size),
        //     duration: 'กำลังประมวลผล...',
        //     position: 'LCL1',
        //     include: false,
        //     file: file
        //   })

		// this.getAudioDuration(file, this.files.length - 1)
		// })
		  

        // Clear file input
        event.target.value = ''
		
		// this.senddata(this.files.length - 1)
		},
		previewAudio(file) {
			if (this.isPlaying) {
			this.stopPlayback()
			}
			
			this.selectedAudio = file
			this.currentTime = '0:00'
			this.isPlaying = false
		},
		clearfiles() {
			this.files = [];
			this.selectedAudio = null;
			this.isPlaying = false;
			this.currentTime = '0:00'
		}
    },
}
</script>

<style>
:root .upload-container label {
	padding: 8px 12px;
	color: #fff;
	background-color: #41b883;
	transition: 0.3s ease all
}

:root .active-dropzone label {
	background-color: #fff;
	color: #41b883;
}

:root .upload-browse input {
	display: none;
}

:root .upload-container span {
	padding-top: 5px;
}

.transcript {
  	width: 1920px;
  	position: relative;
  	background-color: #fff;
  	height: 1024px;
  	text-align: center;
  	font-size: 40px;
  	color: #000;
  	font-family: roboto ;
}
.header {
  	position: absolute;
  	top: 0px;
  	left: 0px;
  	width: 1920px;
  	height: 71px;
  	font-size: 36px;
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
	user-select: none;
}
.upload-container {
  	position: absolute;
  	top: 88px;
  	left: 21px;
  	background-color: #d9d9d9;
  	width: 1879px;
  	height: 325px;
	display: flex;
	justify-self: center;
	align-items: center;
	flex-direction: column;
	row-gap: 20px;
	overflow-x: scroll;
	/* padding-top: 20px; */
	/* label {
		padding: 8px 12px;
		color: #fff;
		background-color: #41b883;
		transition: 0.3s ease all
	} */
}
.upload-browse{
	width: 1879px;
  	height: 325px;
	display: flex;
	justify-self: center;
	align-items: center;
	flex-direction: column;
	row-gap: 20px;
}
.preview-container {
  	position: absolute;
  	top: 428px;
  	left: 21px;
  	background-color: #d9d9d9;
  	width: 1879px;
  	height: 501px;
}
.process-btn {
  	position: absolute;
  	top: 945px;
  	left: 21px;
  	width: 280px;
  	height: 70px;
	background-color: #d9d9d9;
	user-select: none;
}
.process-btn:hover{
	background-color: #b0b0b0;
	cursor: pointer;
}
.process-btn:active{
	background-color: #808080;
	color: white;
}
.save-box {
  	position: absolute;
  	top: 0px;
  	left: 0px;
  	background-color: #d9d9d9;
  	width: 280px;
  	height: 70px;
}
.save-text {
  	position: absolute;
  	top: 14px;
  	left: 97px;
}
.finish-btn {
  	position: absolute;
  	top: 945px;
  	left: 356px;
  	width: 280px;
  	height: 70px;
	background-color: #d9d9d9;
	user-select: none;
}
.btn-text {
  	position: absolute;
  	top: 14px;
  	left: 21px;
}
.cancel-btn {
  	position: absolute;
  	top: 945px;
  	left: 356px;
  	width: 280px;
  	height: 70px;
	background-color: #d9d9d9;
	user-select: none;
}
.cancel-btn:hover{
	background-color: #b0b0b0;
	cursor: pointer;
}
.cancel-btn:active{
	background-color: #808080;
	color: white;
}
.cancel-text {
  	position: absolute;
  	top: 14px;
  	left: 79px;
}

.active-dropzone {
	color: #fff;
	border-color: #fff;
	background-color: #41b883
}

.file-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin-bottom: 20px;
	color: black;
  }

.position-select {
    padding: 4px 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: white;
  }

.preview-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 28px;
    color: #333;
    transition: color 0.3s;
  }
  
.preview-btn:hover {
    color: #1976d2;
  }

.include-checkbox {
    width: 20px;
    height: 20px;
    cursor: pointer;
}
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #ccd0e488 0%, #90889881 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.loading-spinner {
    text-align: center;
}

.spinner {
    width: 80px;
    height: 80px;
    margin: 0 auto 20px;
    border: 8px solid rgba(255, 255, 255, 0.3);
    border-top: 8px solid #ffffff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>