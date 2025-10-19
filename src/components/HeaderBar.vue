<template>
  <header>
    <img src="/assets/logo.svg" alt="Logo" class="logo" />
    <input class="search-bar" placeholder="Buscar..." />
    <nav>
      <ul>
        <li><router-link to="/" class="nav-link">Muro</router-link></li>
        <li><router-link to="/info" class="nav-link">Info</router-link></li>
        <li><router-link to="/photos" class="nav-link">Photos</router-link></li>
        <li><router-link to="/boxes" class="nav-link">Boxes</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
</script>
