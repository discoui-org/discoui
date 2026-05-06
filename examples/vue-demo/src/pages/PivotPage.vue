<template>
  <disco-pivot-page id="componentsPivot" app-title="DISCO VUE">
    <disco-pivot-item header="Overview">
      <div class="page-content">
        <div class="item-title">Pivot Control</div>
        <div class="item-description">Swipe between these tabs to see the effect.</div>
      </div>
    </disco-pivot-item>
    <disco-pivot-item header="Sample List">
      <disco-list-view selection-mode="none">
        <disco-list-item>
          <div class="item-title">Vue Integration</div>
          <div class="item-description">DiscoUI components work seamlessly with Vue templates.</div>
        </disco-list-item>
        <disco-list-item>
          <div class="item-title">Reactive State</div>
          <div class="item-description">Use v-for and v-model as usual.</div>
        </disco-list-item>
      </disco-list-view>
    </disco-pivot-item>
  </disco-pivot-page>
</template>

<style scoped>
.page-content {
  padding: 16px;
  color: white;
}
.item-title {
  font-size: 24px;
  margin-bottom: 8px;
}
.item-description {
  font-size: 18px;
  opacity: 0.8;
}
</style>
