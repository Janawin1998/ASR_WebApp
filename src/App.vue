<script>
import { RouterLink, RouterView } from 'vue-router'

export default{
  name: 'App',
  components: {
    RouterLink,
    RouterView
  },
  data() {
    return {

    }
  },
}
</script>


<template>
  <RouterView />
</template>

<style scoped>
@import './assets/style/global.css';

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f5f5;
  width: 1366px;
  min-height: 1920px;
  overflow-x: auto;
}

#app {
  width: 100%;
  min-height: 100vh;
}

/* Utility classes */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.mt-1 { margin-top: 0.25rem; }
.mt-2 { margin-top: 0.5rem; }
.mt-3 { margin-top: 0.75rem; }
.mt-4 { margin-top: 1rem; }
.mt-5 { margin-top: 1.25rem; }

.mb-1 { margin-bottom: 0.25rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-3 { margin-bottom: 0.75rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-5 { margin-bottom: 1.25rem; }

.p-1 { padding: 0.25rem; }
.p-2 { padding: 0.5rem; }
.p-3 { padding: 0.75rem; }
.p-4 { padding: 1rem; }
.p-5 { padding: 1.25rem; }

.flex { display: flex; }
.flex-column { flex-direction: column; }
.justify-center { justify-content: center; }
.align-center { align-items: center; }
.gap-1 { gap: 0.25rem; }
.gap-2 { gap: 0.5rem; }
.gap-3 { gap: 0.75rem; }
.gap-4 { gap: 1rem; }

.w-full { width: 100%; }
.h-full { height: 100%; }

.bg-primary { background-color: #1976d2; }
.bg-secondary { background-color: #f5f5f5; }
.bg-success { background-color: #4caf50; }
.bg-warning { background-color: #ffd54f; }
.bg-error { background-color: #f44336; }

.text-primary { color: #1976d2; }
.text-secondary { color: #666; }
.text-success { color: #4caf50; }
.text-warning { color: #ff9800; }
.text-error { color: #f44336; }
</style>
