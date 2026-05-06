<template>
  <disco-single-page id="componentsImage" app-title="DISCO VUE" header="image">
    <div class="page-content">
      <div class="section">
        <div class="section-header">image viewer</div>
        <div class="control-stack">
          <disco-image 
            id="demoImage" 
            :src="imageSrc" 
            fit="cover"
            style="width:320px; height:180px; cursor:pointer;"
            @click="nextRandomImage"
          ></disco-image>
          <div class="status-text">Tap image to load next random one</div>
        </div>
      </div>
    </div>
  </disco-single-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const imageSrc = ref('https://picsum.photos/200?random=1');

const nextRandomImage = () => {
  const randomInt = Math.floor(Math.random() * 1000000);
  imageSrc.value = `https://picsum.photos/200?random=${randomInt}`;
};
</script>

<style scoped>
.page-content {
  padding: 0 16px 40px;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-header {
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  opacity: 0.6;
  letter-spacing: 0.05em;
  color: white;
  margin-bottom: 8px;
}

.control-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
}

.status-text {
  font-size: 16px;
  opacity: 0.8;
  color: white;
}
</style>
