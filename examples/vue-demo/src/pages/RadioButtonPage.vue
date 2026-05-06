<template>
  <disco-single-page id="componentsRadioButton" app-title="DISCO VUE" header="radio-button">
    <div class="page-content">
      <div class="section">
        <div class="section-header">radio group</div>
        <div class="control-stack">
          <disco-radio-button checked>Love</disco-radio-button>
          <disco-radio-button>Hate</disco-radio-button>
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
  gap: 18px;
  align-items: flex-start;
}
</style>
