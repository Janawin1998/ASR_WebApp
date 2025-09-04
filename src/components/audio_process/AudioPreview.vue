<template>
    <div class="audio-preview">
      <h3>{{ audioFile.name }}</h3>
      
      <!-- WaveSurfer Container -->
      <div ref="waveformContainer" class="waveform-container">
        <div v-if="isLoading" class="loading-overlay">
          <div class="spinner"></div>
          <span>Loading audio...</span>
        </div>
      </div>
      
      <!-- Audio Controls -->
      <div class="audio-controls">
        <button 
          class="audio-btn play-btn" 
          @click="togglePlayPause" 
          :disabled="!wavesurfer || isLoading"
          :title="isPlaying ? 'Pause' : 'Play'"
        >
          {{ isPlaying ? '⏸️' : '▶️' }}
        </button>
        
        <button class="audio-btn" @click="skipBackward" :disabled="!wavesurfer" title="Skip -10s">
          ⏪
        </button>
        
        <button class="audio-btn" @click="skipForward" :disabled="!wavesurfer" title="Skip +10s">
          ⏩
        </button>
        
        <button class="audio-btn" @click="stop" :disabled="!wavesurfer" title="Stop">
          ⏹️
        </button>
        
        <!-- Time Display -->
        <div class="time-display">
          <span>{{ formattedCurrentTime }} / {{ formattedDuration }}</span>
        </div>
        
        <!-- Volume Control -->
        <div class="volume-control">
          <button class="audio-btn" @click="toggleMute" :title="isMuted ? 'Unmute' : 'Mute'">
            {{ volumeIcon }}
          </button>
          <input 
            type="range" 
            class="volume-slider" 
            min="0" 
            max="100" 
            v-model="volume"
            @input="updateVolume"
            :disabled="!wavesurfer"
          >
          <span class="volume-text">{{ volume }}%</span>
        </div>
        
        <!-- Speed Control -->
        <div class="speed-control">
          <label>Speed:</label>
          <input 
            type="range" 
            class="speed-slider" 
            min="0.25" 
            max="2" 
            step="0.25" 
            v-model="playbackRate"
            @input="updatePlaybackRate"
            :disabled="!wavesurfer"
          >
          <span class="speed-text">{{ playbackRate }}x</span>
        </div>
      </div>
  
      <!-- Waveform Info -->
      <div v-if="waveformReady" class="waveform-info">
        <div class="info-item">
          <span class="label">Duration:</span>
          <span class="value">{{ formattedDuration }}</span>
        </div>
        <div class="info-item">
          <span class="label">File Size:</span>
          <span class="value">{{ audioFile.size || 'Unknown' }}</span>
        </div>
        <div class="info-item">
          <span class="label">Status:</span>
          <span class="value">{{ audioStatus }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import WaveSurfer from 'wavesurfer.js'
  
  export default {
    name: 'AudioPreview',
    props: {
      audioFile: {
        type: Object,
        required: true
      }
    },
    emits: ['play-pause', 'time-update', 'error'],
    data() {
      return {
        wavesurfer: null,
        isLoading: false,
        isPlaying: false,
        isMuted: false,
        volume: 100,
        playbackRate: 1,
        currentTime: 0,
        duration: 0,
        waveformReady: false
      }
    },
    computed: {
      formattedCurrentTime() {
        return this.formatTime(this.currentTime)
      },
      formattedDuration() {
        return this.formatTime(this.duration)
      },
      audioStatus() {
        if (this.isLoading) return 'Loading...'
        if (!this.waveformReady) return 'Not Ready'
        if (this.isPlaying) return 'Playing'
        return 'Ready'
      },
      volumeIcon() {
        if (this.isMuted || this.volume == 0) return '🔇'
        if (this.volume < 30) return '🔈'
        if (this.volume < 70) return '🔉'
        return '🔊'
      }
    },
    watch: {
      audioFile: {
        immediate: true,
        handler(newFile) {
          if (newFile) {
            this.loadAudio(newFile)
          }
        }
      }
    },
    async mounted() {
      await this.initializeWaveSurfer()
    },
    methods: {
      async initializeWaveSurfer() {
        try {
          // Destroy existing instance
          if (this.wavesurfer) {
            this.wavesurfer.destroy()
          }
  
          // Wait for container to be ready
          await this.$nextTick()
  
          // Create new WaveSurfer instance
          this.wavesurfer = WaveSurfer.create({
            container: this.$refs.waveformContainer,
            waveColor: '#1976d2',
            progressColor: '#ff5722',
            backgroundColor: '#f8f9fa',
            barWidth: 2,
            barGap: 1,
            barRadius: 3,
            responsive: true,
            normalize: true,
            interact: true,
            dragToSeek: true,
            height: 60,
          })
  
          // Event listeners
          this.setupEventListeners()
  
          console.log('WaveSurfer v7 initialized successfully')
        } catch (error) {
          console.error('Failed to initialize WaveSurfer:', error)
          this.$emit('error', error)
        }
      },
  
      setupEventListeners() {
        if (!this.wavesurfer) return
  
        // Ready event
        this.wavesurfer.on('ready', () => {
          this.onWaveformReady()
        })
  
        // Loading events
        this.wavesurfer.on('loading', (percentage) => {
          console.log('Loading:', percentage + '%')
        })
  
        // Playback events
        this.wavesurfer.on('play', () => {
          this.isPlaying = true
          this.$emit('play-pause', true)
        })
  
        this.wavesurfer.on('pause', () => {
          this.isPlaying = false
          this.$emit('play-pause', false)
        })
  
        this.wavesurfer.on('finish', () => {
          this.isPlaying = false
          this.$emit('play-pause', false)
        })
  
        // Time update
        this.wavesurfer.on('timeupdate', (currentTime) => {
          this.currentTime = currentTime
          this.$emit('time-update', currentTime)
        })
  
        // Seeking
        this.wavesurfer.on('seeking', (currentTime) => {
          this.currentTime = currentTime
        })
  
        // Error handling
        this.wavesurfer.on('error', (error) => {
          console.error('WaveSurfer error:', error)
          this.isLoading = false
          this.$emit('error', error)
        })
      },
  
      async loadAudio(file) {
        if (!this.wavesurfer) {
          await this.initializeWaveSurfer()
        }
  
        this.isLoading = true
        this.waveformReady = false
        this.resetState()
  
        try {
          if (file.file && file.file instanceof File) {
            // Load uploaded file
            const arrayBuffer = await file.file.arrayBuffer()
            await this.wavesurfer.loadBlob(file.file)
          } else {
            // Load demo audio
            const demoUrl = this.generateDemoAudioUrl()
            await this.wavesurfer.load(demoUrl)
          }
        } catch (error) {
          console.error('Error loading audio:', error)
          this.isLoading = false
          this.$emit('error', error)
        }
      },
  
      generateDemoAudioUrl() {
        // Generate demo sine wave audio
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const sampleRate = audioContext.sampleRate
        const duration = 10 // seconds
        const samples = sampleRate * duration
        const buffer = audioContext.createBuffer(1, samples, sampleRate)
        const channelData = buffer.getChannelData(0)
  
        // Generate audio with silence periods
        for (let i = 0; i < samples; i++) {
          const time = i / sampleRate
          let sample = 0
  
          // Create pattern with silence
          if (time > 1 && time < 3) {
            sample = Math.sin(440 * 2 * Math.PI * time) * 0.3
          } else if (time > 4 && time < 6) {
            sample = Math.sin(880 * 2 * Math.PI * time) * 0.2 * Math.sin(time * 5)
          } else if (time > 7 && time < 9) {
            sample = Math.sin(220 * 2 * Math.PI * time) * 0.4 * Math.sin(time * 3)
          }
  
          channelData[i] = sample
        }
  
        // Convert to WAV blob
        return this.audioBufferToBlob(buffer)
      },
  
      audioBufferToBlob(buffer) {
        const length = buffer.length
        const arrayBuffer = new ArrayBuffer(44 + length * 2)
        const view = new DataView(arrayBuffer)
        const channelData = buffer.getChannelData(0)
  
        // WAV header
        const writeString = (offset, string) => {
          for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i))
          }
        }
  
        writeString(0, 'RIFF')
        view.setUint32(4, 36 + length * 2, true)
        writeString(8, 'WAVE')
        writeString(12, 'fmt ')
        view.setUint32(16, 16, true)
        view.setUint16(20, 1, true)
        view.setUint16(22, 1, true)
        view.setUint32(24, buffer.sampleRate, true)
        view.setUint32(28, buffer.sampleRate * 2, true)
        view.setUint16(32, 2, true)
        view.setUint16(34, 16, true)
        writeString(36, 'data')
        view.setUint32(40, length * 2, true)
  
        // Convert float samples to 16-bit PCM
        let offset = 44
        for (let i = 0; i < length; i++) {
          const sample = Math.max(-1, Math.min(1, channelData[i]))
          view.setInt16(offset, sample * 32767, true)
          offset += 2
        }
  
        const blob = new Blob([arrayBuffer], { type: 'audio/wav' })
        return URL.createObjectURL(blob)
      },
  
      onWaveformReady() {
        this.isLoading = false
        this.waveformReady = true
        this.duration = this.wavesurfer.getDuration()
        console.log('Waveform ready, duration:', this.duration)
      },
  
      resetState() {
        this.currentTime = 0
        this.duration = 0
        this.isPlaying = false
      },
  
      // Control methods
      togglePlayPause() {
        if (!this.wavesurfer || !this.waveformReady) return
  
        try {
          this.wavesurfer.playPause()
        } catch (error) {
          console.error('Play/Pause error:', error)
          this.$emit('error', error)
        }
      },
  
      stop() {
        if (!this.wavesurfer) return
  
        try {
          this.wavesurfer.stop()
          this.currentTime = 0
        } catch (error) {
          console.error('Stop error:', error)
        }
      },
  
      skipBackward() {
        if (!this.wavesurfer) return
  
        try {
          const currentTime = this.wavesurfer.getCurrentTime()
          const newTime = Math.max(0, currentTime - 10)
          const progress = newTime / this.duration
          this.wavesurfer.seekTo(progress)
        } catch (error) {
          console.error('Skip backward error:', error)
        }
      },
  
      skipForward() {
        if (!this.wavesurfer) return
  
        try {
          const currentTime = this.wavesurfer.getCurrentTime()
          const newTime = Math.min(this.duration, currentTime + 10)
          const progress = newTime / this.duration
          this.wavesurfer.seekTo(progress)
        } catch (error) {
          console.error('Skip forward error:', error)
        }
      },
  
      toggleMute() {
        this.isMuted = !this.isMuted
        this.updateVolume()
      },
  
      updateVolume() {
        if (!this.wavesurfer) return
  
        try {
          const volumeValue = this.isMuted ? 0 : this.volume / 100
          this.wavesurfer.setVolume(volumeValue)
        } catch (error) {
          console.error('Volume update error:', error)
        }
      },
  
      updatePlaybackRate() {
        if (!this.wavesurfer) return
  
        try {
          this.wavesurfer.setPlaybackRate(this.playbackRate)
        } catch (error) {
          console.error('Playback rate error:', error)
        }
      },
  
      formatTime(seconds) {
        if (!seconds && seconds !== 0) return '0:00'
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs.toString().padStart(2, '0')}`
      }
    },
  
    beforeUnmount() {
      if (this.wavesurfer) {
        try {
          this.wavesurfer.destroy()
        } catch (error) {
          console.error('Error destroying WaveSurfer:', error)
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .audio-preview {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin: 20px 0;
  }
  
  .audio-preview h3 {
    margin-bottom: 15px;
    color: #333;
    font-size: 18px;
  }
  
  .waveform-container {
    position: relative;
    /* min-height: 120px; */
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    margin-bottom: 20px;
    background: #f8f9fa;
  }
  
  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 14px;
    color: #666;
    z-index: 10;
  }
  
  .spinner {
    width: 24px;
    height: 24px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #1976d2;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .audio-controls {
    display: flex;
    align-items: center;
    gap: 15px;
    flex-wrap: wrap;
    margin-bottom: 15px;
  }
  
  .audio-btn {
    background: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 18px;
    cursor: pointer;
    color: #333;
    transition: all 0.3s;
    padding: 8px 12px;
    min-width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .audio-btn:hover:not(:disabled) {
    background: #e0e0e0;
    color: #1976d2;
  }
  
  .audio-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .play-btn {
    background: #1976d2;
    color: white;
    font-size: 20px;
  }
  
  .play-btn:hover:not(:disabled) {
    background: #1565c0;
  }
  
  .time-display {
    font-family: 'Monaco', 'Consolas', monospace;
    font-size: 14px;
    color: #555;
    background: #f5f5f5;
    padding: 8px 12px;
    border-radius: 4px;
    min-width: 120px;
    text-align: center;
    border: 1px solid #e0e0e0;
  }
  
  .volume-control, .speed-control {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .volume-slider, .speed-slider {
    width: 100px;
    height: 6px;
    border-radius: 3px;
    background: #ddd;
    outline: none;
    cursor: pointer;
    appearance: none;
  }
  
  .volume-slider::-webkit-slider-thumb,
  .speed-slider::-webkit-slider-thumb {
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #1976d2;
    cursor: pointer;
    transition: transform 0.2s;
  }
  
  .volume-slider::-webkit-slider-thumb:hover,
  .speed-slider::-webkit-slider-thumb:hover {
    transform: scale(1.2);
  }
  
  .volume-text, .speed-text {
    font-size: 12px;
    color: #666;
    min-width: 35px;
    text-align: center;
  }
  
  .speed-control label {
    color: #555;
    font-weight: 500;
    font-size: 14px;
  }
  
  .waveform-info {
    display: flex;
    gap: 20px;
    font-size: 12px;
    color: #666;
    background: #f8f9fa;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #e0e0e0;
  }
  
  .info-item {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  
  .info-item .label {
    font-weight: 500;
    color: #333;
  }
  
  .info-item .value {
    color: #666;
  }
  
  @media (max-width: 768px) {
    .audio-controls {
      flex-direction: column;
      align-items: stretch;
      gap: 15px;
    }
    
    .volume-control,
    .speed-control {
      justify-content: center;
    }
    
    .waveform-info {
      flex-direction: column;
      gap: 10px;
    }
    
    .waveform-container {
      min-height: 0px;
    }
  }
  </style>