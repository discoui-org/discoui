<template>
  <disco-single-page id="componentsCheckbox" app-title="DISCO VUE" header="checkbox">
    <div class="page-content">
      <div class="section">
        <div class="section-header">standard checkboxes</div>
        <div class="control-stack">
          <disco-checkbox id="cbDefault">Key press</disco-checkbox>
          <disco-checkbox id="cbChecked" checked>Lock and unlock</disco-checkbox>
          <disco-checkbox id="cbDisabled" disabled>Disabled</disco-checkbox>
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
  gap: 12px;
  align-items: flex-start;
}
</style>
