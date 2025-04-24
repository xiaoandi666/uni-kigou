<template>
  <div id="app">
    <!-- 你的应用内容 -->
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
/* 全局样式 */
html {
  font-size: 16px; /* 默认字体大小 */
}

/* 媒体查询 */
@media (max-width: 768px) {
  html {
    font-size: 14px; /* 小屏幕下的字体大小 */
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  html {
    font-size: 15px; /* 中等屏幕下的字体大小 */
  }
}

@media (min-width: 1025px) {
  html {
    font-size: 16px; /* 大屏幕下的字体大小 */
  }
}
</style>