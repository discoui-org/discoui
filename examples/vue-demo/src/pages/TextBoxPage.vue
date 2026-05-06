<template>
  <disco-single-page id="componentsTextBox" app-title="DISCO VUE" header="text-box">
    <div class="page-content">
      <div class="section">
        <div class="section-header">text input</div>
        <div class="control-stack">
          <disco-text-box placeholder="Text Input"></disco-text-box>
        </div>
      </div>
    </div>
  </disco-single-page>
</template>

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
  width: 100%;
  max-width: 400px;
}
</style>
