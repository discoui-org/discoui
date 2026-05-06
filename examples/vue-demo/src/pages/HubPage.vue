<template>
  <disco-hub-page id="componentsHub" header="vue hub">
    <disco-hub-section header="featured">
      <disco-list-view selection-mode="none">
        <disco-list-item>
          <div class="item-title">Panorama View</div>
          <div class="item-description">Wide horizontal scrolling surface.</div>
        </disco-list-item>
      </disco-list-view>
    </disco-hub-section>
    <disco-hub-section header="updates">
      <disco-list-view selection-mode="none">
        <disco-list-item v-for="i in 3" :key="i">
          <div class="item-title">Update {{ i }}</div>
          <div class="item-description">Latest framework improvements.</div>
        </disco-list-item>
      </disco-list-view>
    </disco-hub-section>
  </disco-hub-page>
</template>

<style scoped>
.item-title {
  color: white;
}
.item-description {
  color: white;
  opacity: 0.7;
}
</style>
