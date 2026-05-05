import React, { createContext, useContext, useMemo } from 'react';
import { createComponent } from '@lit/react';
import * as DiscoCore from '@discoui/core';

// --- DiscoApp Context ---
const DiscoContext = createContext<any>(null);

export const DiscoProvider: React.FC<{ config?: any; children: React.ReactNode }> = ({ config, children }) => {
  const app = useMemo(() => new DiscoCore.DiscoApp(config), [config]);
  return React.createElement(DiscoContext.Provider, { value: app }, children);
};

export const useDiscoApp = () => {
  const context = useContext(DiscoContext);
  if (!context) {
    console.warn('useDiscoApp must be used within a DiscoProvider for full functionality.');
  }
  return context;
};

// --- Component Wrappers ---

export const AppBar = createComponent({
  tagName: 'disco-app-bar',
  elementClass: DiscoCore.DiscoAppBar,
  react: React,
});

export const AppBarIconButton = createComponent({
  tagName: 'disco-app-bar-icon-button',
  elementClass: DiscoCore.DiscoAppBarIconButton,
  react: React,
});

export const AppBarMenuItem = createComponent({
  tagName: 'disco-app-bar-menu-item',
  elementClass: DiscoCore.DiscoAppBarMenuItem,
  react: React,
});

export const Button = createComponent({
  tagName: 'disco-button',
  elementClass: DiscoCore.DiscoButton,
  react: React,
  events: {
    onPress: 'disco-press',
  },
});

export const Checkbox = createComponent({
  tagName: 'disco-checkbox',
  elementClass: DiscoCore.DiscoCheckbox,
  react: React,
  events: {
    onChange: 'change',
  },
});

export const ComboBox = createComponent({
  tagName: 'disco-combo-box',
  elementClass: DiscoCore.DiscoComboBox,
  react: React,
  events: {
    onChange: 'change',
  },
});

export const ComboBoxItem = createComponent({
  tagName: 'disco-combo-box-item',
  elementClass: DiscoCore.DiscoComboBoxItem,
  react: React,
});

export const ContextMenu = createComponent({
  tagName: 'disco-context-menu',
  elementClass: DiscoCore.DiscoContextMenu,
  react: React,
});

export const DatePicker = createComponent({
  tagName: 'disco-date-picker',
  elementClass: DiscoCore.DiscoDatePicker,
  react: React,
});

export const Dialog = createComponent({
  tagName: 'disco-dialog',
  elementClass: DiscoCore.DiscoDialog,
  react: React,
});

export const Frame = createComponent({
  tagName: 'disco-frame',
  elementClass: DiscoCore.DiscoFrame,
  react: React,
});

export const LoopingSelector = createComponent({
  tagName: 'disco-looping-selector',
  elementClass: DiscoCore.DiscoLoopingSelector,
  react: React,
});

export const MessageDialog = createComponent({
  tagName: 'disco-message-dialog',
  elementClass: DiscoCore.DiscoMessageDialog,
  react: React,
});

export const Page = createComponent({
  tagName: 'disco-page',
  elementClass: DiscoCore.DiscoPage,
  react: React,
});

export const PasswordBox = createComponent({
  tagName: 'disco-password-box',
  elementClass: DiscoCore.DiscoPasswordBox,
  react: React,
});

export const PivotPage = createComponent({
  tagName: 'disco-pivot-page',
  elementClass: DiscoCore.DiscoPivot.DiscoPivotPage,
  react: React,
  events: {
    onActiveItemChange: 'disco-active-item-change',
  },
});

export const PivotItem = createComponent({
  tagName: 'disco-pivot-item',
  elementClass: DiscoCore.DiscoPivot.DiscoPivotItem,
  react: React,
});

export const ProgressBar = createComponent({
  tagName: 'disco-progress-bar',
  elementClass: DiscoCore.DiscoProgressBar,
  react: React,
});

export const ProgressRing = createComponent({
  tagName: 'disco-progress-ring',
  elementClass: DiscoCore.DiscoProgressRing,
  react: React,
});

export const RadioButton = createComponent({
  tagName: 'disco-radio-button',
  elementClass: DiscoCore.DiscoRadioButton,
  react: React,
  events: {
    onChange: 'change',
  },
});

export const ScrollView = createComponent({
  tagName: 'disco-scroll-view',
  elementClass: DiscoCore.DiscoScrollView,
  react: React,
});

export const SinglePage = createComponent({
  tagName: 'disco-single-page',
  elementClass: DiscoCore.DiscoSinglePage,
  react: React,
});

export const Slider = createComponent({
  tagName: 'disco-slider',
  elementClass: DiscoCore.DiscoSlider,
  react: React,
  events: {
    onChange: 'change',
  },
});

export const Splash = createComponent({
  tagName: 'disco-splash',
  elementClass: DiscoCore.DiscoSplash,
  react: React,
});

export const TextBox = createComponent({
  tagName: 'disco-text-box',
  elementClass: DiscoCore.DiscoTextBox,
  react: React,
  events: {
    onInput: 'input',
    onChange: 'change',
  },
});

export const TimePicker = createComponent({
  tagName: 'disco-time-picker',
  elementClass: DiscoCore.DiscoTimePicker,
  react: React,
});

export const ToggleButton = createComponent({
  tagName: 'disco-toggle-button',
  elementClass: DiscoCore.DiscoToggleButton,
  react: React,
  events: {
    onToggle: 'disco-toggle',
  },
});

export const ToggleSwitch = createComponent({
  tagName: 'disco-toggle-switch',
  elementClass: DiscoCore.DiscoToggleSwitch,
  react: React,
  events: {
    onChange: 'change',
  },
});

export const LongListSelector = createComponent({
  tagName: 'disco-long-list-selector',
  elementClass: DiscoCore.DiscoLongListSelector,
  react: React,
});

export const Hub = createComponent({
  tagName: 'disco-hub',
  elementClass: DiscoCore.DiscoHub.DiscoHubSection,
  react: React,
});

export const HubSection = createComponent({
  tagName: 'disco-hub-section',
  elementClass: DiscoCore.DiscoHub.DiscoHubSection,
  react: React,
});

export const Image = createComponent({
  tagName: 'disco-image',
  elementClass: DiscoCore.DiscoImage,
  react: React,
});

export const MediaElement = createComponent({
  tagName: 'disco-media-element',
  elementClass: DiscoCore.DiscoMediaElement,
  react: React,
});

export const List = createComponent({
  tagName: 'disco-list-view',
  elementClass: DiscoCore.DiscoList.DiscoListView,
  react: React,
});

export const ListItem = createComponent({
  tagName: 'disco-list-item',
  elementClass: DiscoCore.DiscoList.DiscoListItem,
  react: React,
});

export * as DiscoCore from '@discoui/core';
