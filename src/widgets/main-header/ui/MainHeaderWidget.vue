<script setup lang="ts">
import { useProfileStore } from '@/entities/profile'
import { DefaultButton, DefaultThumbnail } from '@/shared'
import { useRouter } from 'vue-router'

const profileStore = useProfileStore()
const router = useRouter()
</script>

<template>
  <div class="main-header-widget tile">
    <DefaultButton class="menu-button">Menu</DefaultButton>
    <span class="title" @click="router.push({ name: 'messenger' })">Phialka</span>
    <DefaultThumbnail
      v-if="profileStore.profile.photo?.url"
      class="profile-photo"
      :src="profileStore.profile.photo?.url"
    ></DefaultThumbnail>
    <DefaultButton v-else class="sign-in-button" @click="router.push({ name: 'auth' })"
      >Sign In</DefaultButton
    >
  </div>
</template>

<style scoped>
.main-header-widget {
  height: 100%;
  padding: var(--gap-size-s);
  display: grid;
  grid-template-columns: 10rem 1fr 10rem;
  align-items: center;
  background: var(--clr-bg);
}

.menu-button {
  justify-self: left;
}

.title {
  font-size: var(--font-size-xl);
}

.profile-photo,
.sign-in-button {
  justify-self: right;
}

.profile-photo {
  height: 3rem;
  width: 3rem;
}
</style>
