<script setup lang="ts">
import { ServerCreateWidget, CropImageWidget } from '@/widgets'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const serverPhotoSrc = ref('')
let resolveProcessServerPhoto: (value: Blob) => void

function onServerCreate() {
  router.back()
}

function processServerPhoto(photo: Blob): Promise<Blob> {
  return new Promise((resolve) => {
    resolveProcessServerPhoto = resolve
    serverPhotoSrc.value = URL.createObjectURL(photo)
  })
}

function onCrop(croppedPhoto: Blob) {
  resolveProcessServerPhoto(croppedPhoto)
  serverPhotoSrc.value = ''
}
</script>

<template>
  <div class="server-create-page">
    <div class="form-container tile">
      <header>Create Server</header>
      <ServerCreateWidget
        class="server-create-widget"
        @server-create="onServerCreate"
        :process-server-photo="processServerPhoto"
      ></ServerCreateWidget>
    </div>

    <Teleport v-if="serverPhotoSrc" to="#overlay">
      <CropImageWidget class="touchable" :src="serverPhotoSrc" @crop="onCrop"></CropImageWidget>
    </Teleport>
  </div>
</template>

<style scoped>
.server-create-page {
  height: 100%;
  display: grid;
  place-content: center;
}

.form-container {
  padding: var(--gap-size-m);
  display: flex;
  flex-flow: column nowrap;
  gap: var(--gap-size-s);
}

header {
  font-size: var(--font-size-m);
}

.crop-image-widget {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  aspect-ratio: 1;
  width: 30rem;
  max-width: 70dvh;
  max-height: 70dvh;
}
</style>
