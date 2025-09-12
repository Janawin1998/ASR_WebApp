<template>
    <div class="container">
      <!-- Header -->
      <div class="header">
        <div class="login-info">
          <span class="login-arrow">→</span>
          Log-in ก่อนเข้าระบบ
        </div>
        <div class="role-badge">
          Manager
        </div>
      </div>
  
      <!-- Upload Section -->
      <div class="upload-section">
        <div class="upload-row">
          <label class="upload-label">Upload File (s)</label>
          <input 
            type="file" 
            class="file-input" 
            multiple 
            accept=".wav,.mp3" 
            @change="handleFileUpload"
            ref="fileInput"
          >
          <button class="browse-btn" @click="$refs.fileInput.click()">Browse</button>
          <span class="file-count">รองรับประมาณ {{ maxFiles }} files ในครั้งเดียวกัน</span>
        </div>
      </div>
  
      <!-- File Table -->
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
  
      <!-- Process Info -->
      <!-- <div class="process-info">
        <h3>Note</h3>
        <ul>
          <li>ตัด noise</li>
          <li>ตัดช่วงเสียงเงียบ</li>
          <li>split ให้ file ยาวไม่เกิน 5 นาที</li>
        </ul>
      </div> -->
  
      <!-- Control Buttons -->
      <div class="control-buttons">
        <button 
          class="process-btn" 
          @click="processFiles" 
          :disabled="!hasSelectedFiles"
          :class="{ disabled: !hasSelectedFiles }"
        >
          Upload and Process
        </button>
        <button class="cancel-btn" @click="cancelProcess">Cancel</button>
      </div>
  
      <!-- Audio Preview -->
      <AudioPreview 
        v-if="selectedAudio"
        :audio-file="selectedAudio"
        :current-time="currentTime"
        :is-playing="isPlaying"
        @play-pause="playPause"
        @seek="seekAudio"
      />
  
      <!-- Loading Overlay -->
      <div v-if="isProcessing" class="loading-overlay">
        <div class="loading-spinner"></div>
        <p>กำลัง Process ไฟล์...</p>
      </div>
    </div>
  </template>
  
  <script>
  import AudioPreview from './AudioPreview.vue'
  
  export default {
    name: 'AudioUpload',
    components: {
      AudioPreview
    },
    data() {
      return {
        maxFiles: 5,
        files: [
          {
            id: 1,
            name: 'LCL1_1.wav',
            size: '30.2 MB',
            duration: '10.2 mins',
            position: 'LCL1',
            include: true,
            file: null
          },
          {
            id: 2,
            name: 'LCL1_2.wav',
            size: '28.2 MB',
            duration: '8.7 mins',
            position: 'LCL1',
            include: true,
            file: null
          }
        ],
        selectedAudio: null,
        currentTime: '0:00',
        showInstructions: true,
        isPlaying: false,
        isProcessing: false,
        playbackInterval: null
      }
    },
    computed: {
      hasSelectedFiles() {
        return this.files.some(file => file.include)
      }
    },
    methods: {
      handleFileUpload(event) {
        const uploadedFiles = Array.from(event.target.files)
        
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
          
          // Get audio duration
          this.getAudioDuration(file, this.files.length - 1)
        })
  
        // Clear file input
        event.target.value = ''
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
      },
  
      formatFileSize(bytes) {
        const mb = bytes / (1024 * 1024)
        return mb.toFixed(1) + ' MB'
      },
  
      previewAudio(file) {
        if (this.isPlaying) {
          this.stopPlayback()
        }
        
        this.selectedAudio = file
        this.currentTime = '0:00'
        this.isPlaying = false
      },
  
      playPause() {
        this.isPlaying = !this.isPlaying
        
        if (this.isPlaying) {
          this.startPlayback()
        } else {
          this.stopPlayback()
        }
      },
  
      startPlayback() {
        let seconds = 0
        this.playbackInterval = setInterval(() => {
          if (!this.isPlaying) {
            this.stopPlayback()
            return
          }
          seconds++
          const mins = Math.floor(seconds / 60)
          const secs = seconds % 60
          this.currentTime = `${mins}:${secs.toString().padStart(2, '0')}`
        }, 1000)
      },
  
      stopPlayback() {
        if (this.playbackInterval) {
          clearInterval(this.playbackInterval)
          this.playbackInterval = null
        }
      },
  
      seekAudio(time) {
        this.currentTime = time
      },
  
      async processFiles() {
        const selectedFiles = this.files.filter(file => file.include)
        
        if (selectedFiles.length === 0) {
          alert('กรุณาเลือกไฟล์ที่ต้องการ process')
          return
        }
        
        this.isProcessing = true
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 3000))
          
          // Process successful
          this.$emit('process-complete', selectedFiles)
          alert(`Process ${selectedFiles.length} ไฟล์เสร็จสิ้น!`)
          this.showInstructions = false
          
        } catch (error) {
          alert('เกิดข้อผิดพลาดในการ process: ' + error.message)
        } finally {
          this.isProcessing = false
        }
      },
  
      cancelProcess() {
        if (confirm('คุณต้องการยกเลิกการ process ใช่หรือไม่?')) {
          this.files = []
          this.selectedAudio = null
          this.showInstructions = true
          this.stopPlayback()
          this.$emit('process-cancelled')
        }
      },
  
      removeFile(index) {
        this.files.splice(index, 1)
        if (this.selectedAudio && this.selectedAudio.id === this.files[index]?.id) {
          this.selectedAudio = null
          this.stopPlayback()
        }
      }
    },
  
    beforeUnmount() {
      this.stopPlayback()
    }
  }
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
    max-width: 1366px;
    margin: 0 auto;
    min-height: 1920px;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
  
  .login-info {
    display: flex;
    align-items: center;
    color: #1976d2;
    font-size: 18px;
  }
  
  .login-arrow {
    margin-right: 10px;
    font-size: 20px;
    color: #1976d2;
  }
  
  .role-badge {
    background-color: #ffd54f;
    padding: 8px 16px;
    border-radius: 8px;
    font-weight: bold;
    color: #333;
    text-align: center;
  }
  
  .upload-section {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin-bottom: 20px;
  }
  
  .upload-row {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;
  }
  
  .upload-label {
    font-size: 16px;
    font-weight: bold;
    min-width: 120px;
    color: #000;
  }
  
  .file-input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .browse-btn {
    padding: 8px 20px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .browse-btn:hover {
    background-color: #e0e0e0;
  }
  
  .file-count {
    color: #666;
    font-size: 14px;
  }
  
  .file-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin-bottom: 20px;
  }
  
  .file-table th {
    background-color: #1976d2;
    color: white;
    padding: 12px;
    text-align: left;
    font-weight: bold;
  }
  
  .file-table td {
    padding: 12px;
    border-bottom: 1px solid #eee;
  }
  
  .file-table tr:nth-child(even) {
    background-color: #f8f9fa;
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
    font-size: 18px;
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
  
  .control-buttons {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin: 30px 0;
  }
  
  .process-btn {
    background-color: #1976d2;
    color: white;
    padding: 12px 30px;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s;
  }
  
  .process-btn:hover:not(.disabled) {
    background-color: #1565c0;
  }
  
  .process-btn.disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .cancel-btn {
    background-color: #f5f5f5;
    color: #333;
    padding: 12px 30px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .cancel-btn:hover {
    background-color: #e0e0e0;
  }
  
  .process-info {
    background-color: #e3f2fd;
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #1976d2;
    margin: 20px 0;
  }
  
  .process-info h3 {
    color: #1976d2;
    margin-bottom: 10px;
  }
  
  .process-info ul {
    list-style: none;
    padding: 0;
  }
  
  .process-info li {
    padding: 4px 0;
    color: #555;
  }
  
  .process-info li:before {
    content: "- ";
    color: #1976d2;
    font-weight: bold;
  }
  
  
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    color: white;
  }
  
  .loading-spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #1976d2;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>