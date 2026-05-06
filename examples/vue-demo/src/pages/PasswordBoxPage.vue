<template>
  <disco-single-page id="componentsPasswordBox" app-title="DISCO VUE" header="password-box">
    <div class="page-content">
      <div class="section">
        <div class="section-header">password input</div>
        <div class="control-stack">
          <disco-password-box placeholder="Password Input"></disco-password-box>
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
