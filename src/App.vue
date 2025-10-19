<template>
  <div>
    <HeaderBar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import HeaderBar from './components/HeaderBar.vue'
</script>
