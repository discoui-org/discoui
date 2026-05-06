<template>
  <disco-single-page id="componentsComboBox" app-title="DISCO VUE" header="combo-box">
    <div class="page-content">
      <div class="section">
        <div class="section-header">selection control</div>
        <div class="control-stack">
          <disco-combo-box style="width: 100%;">
            <disco-combo-box-item value="1">Visual Studio 2013</disco-combo-box-item>
            <disco-combo-box-item value="2" selected>Silverlight 8.1</disco-combo-box-item>
            <disco-combo-box-item value="3">Windows Runtime</disco-combo-box-item>
            <disco-combo-box-item value="4">XAML Debugger</disco-combo-box-item>
          </disco-combo-box>
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
