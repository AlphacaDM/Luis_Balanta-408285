<template>
  <section class="content-section">
    <div class="post">
      <div class="post-header">
        <img src="/assets/avatar.jpg" alt="Avatar" class="avatar-small"/>
        <div>
          <strong>Luis Balanta</strong><br>
          <span class="post-date">Publicado hace 1 hora</span>
        </div>
      </div>
      <p class="post-content">¡Ando buscando al que invento la semana de parciales! 🤬🔪</p>
      <div class="post-footer">
        <button @click="like(1)">👍 Me gusta ({{ likes[1] }})</button>
        <button>💬 Comentar</button>
        <button>🔁 Compartir</button>
      </div>
    </div>

    <div class="post">
      <div class="post-header">
        <img src="/assets/avatar.jpg" alt="Avatar" class="avatar-small"/>
        <div>
          <strong>Luis Balanta</strong><br>
          <span class="post-date">Publicado ayer</span>
        </div>
      </div>
      <p class="post-content">Hoy follo. 🥵 Y mañana arroz con spaguetti. 🥄🍚</p>
      <div class="post-footer">
        <button @click="like(2)">👍 Me gusta ({{ likes[2] }})</button>
        <button>💬 Comentar</button>
        <button>🔁 Compartir</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'
const likes = reactive({1:2, 2:1})
function like(id){ likes[id]++ }
</script>
