<template>
  <disco-frame id="componentsFrame" initial-page="homePage">
    <HomePage />
    <ButtonPage />
    <CheckboxPage />
    <ToggleSwitchPage />
    <ToggleButtonPage />
    <SliderPage />
    <ComboBoxPage />
    <TextBoxPage />
    <PasswordBoxPage />
    <RadioButtonPage />
    <ImagePage />
    <ProgressPage />
    <PivotPage />
    <HubPage />
  </disco-frame>
</template>

<script setup lang="ts">
import HomePage from './pages/HomePage.vue';
import ButtonPage from './pages/ButtonPage.vue';
import CheckboxPage from './pages/CheckboxPage.vue';
import ToggleSwitchPage from './pages/ToggleSwitchPage.vue';
import ToggleButtonPage from './pages/ToggleButtonPage.vue';
import SliderPage from './pages/SliderPage.vue';
import ComboBoxPage from './pages/ComboBoxPage.vue';
import TextBoxPage from './pages/TextBoxPage.vue';
import PasswordBoxPage from './pages/PasswordBoxPage.vue';
import RadioButtonPage from './pages/RadioButtonPage.vue';
import ImagePage from './pages/ImagePage.vue';
import ProgressPage from './pages/ProgressPage.vue';
import PivotPage from './pages/PivotPage.vue';
import HubPage from './pages/HubPage.vue';
</script>

<style scoped>
.vue-container {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: white;
}
</style>
