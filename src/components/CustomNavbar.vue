<template>
  <div class="custom-navbar">
    <div class="search">
      <uni-icons class="input-icon" type="mic" size="30"></uni-icons>
      <input 
        v-model="inputvalue"
        placeholder="请输入歌名"
        class="input"
      />
      <uni-icons class="input-icon" type="bars" size="20"></uni-icons>
    </div>
    <div class="select">
      <div 
        class="nav-btn" 
        :class="{'nav-btn-active': activeNav === 'recommend'}" 
        @click="changnav('recommend')"
      >推荐</div>
      <div 
        class="nav-btn" 
        :class="{'nav-btn-active': activeNav === 'musicbase'}" 
        @click="changnav('musicbase')"
      >乐库</div>
      <div 
        class="nav-btn" 
        :class="{'nav-btn-active': activeNav === 'video'}" 
        @click="changnav('video')"
      >视频</div>
      
      <!-- 添加动画指示器 -->
      <div class="nav-indicator" :style="indicatorStyle"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

let inputvalue = ref('');
let activeNav = ref('recommend');

// 计算指示器的样式
const indicatorStyle = computed(() => {
  let position = 0;
  let width = 0;
  
  if (activeNav.value === 'recommend') {
    position = 0;
    width = 40; // 推荐按钮的宽度
  } else if (activeNav.value === 'musicbase') {
    position = 55; // 推荐按钮宽度 + 间距
    width = 40; // 乐库按钮的宽度
  } else if (activeNav.value === 'video') {
    position = 110; // (推荐按钮宽度 + 乐库按钮宽度) + 间距*2
    width = 40; // 视频按钮的宽度
  }
  
  return {
    transform: `translateX(${position}px)`,
    width: `${width}px`
  };
});

function changnav(nav: string) {
  // 添加动画类
  activeNav.value = nav;
}
</script>

<script lang="ts">
export default {
  name: 'CustomNavbar',
};
</script>

<style scoped lang="scss">
.custom-navbar {
  height: 23vh;
  width: 100%;
  overflow: hidden;
  background-color: rgb(234, 247, 255);
  border-top: 10px solid rgb(234, 247, 255);
  padding: 0 1rem;
  
  .search {
    margin-top: 5rem;
    width: 100%;
    display: flex;
    gap: 0.5rem;
    
    .input {
      border: 1.5px solid rgb(250, 248, 248);
      width: 65%;
      border-radius: 2rem;
      box-shadow: inset 2px 2px 4px rgba(48, 48, 48, 0.1), inset -2px -2px 4px rgba(48, 48, 48, 0.1);
      outline: none;
      background: transparent;
      color: #333;
      padding: 0.4rem;
      height: 1.3rem;
    }
    
    .input-icon {
      width: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(246, 243, 243, 0.543);
      height: 2rem;
      border-radius: 50%;
      box-shadow: 3px 5px 5px 0.5px rgba(5, 5, 5, 0.1);
    }
  }
  
  .select {
    margin-top: 0.8rem;
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    position: relative;
    
    .nav-btn {
      border-radius: 3rem;
      padding: 0.2rem 0.5rem;
      box-sizing: border-box;
      position: relative;
      z-index: 2;
      transition: color 0.3s ease; /* 添加颜色过渡效果 */
    }
    
    .nav-btn-active {
      color: white;
      /* 移除背景色，由指示器提供 */
    }
    
    /* 添加动画指示器 */
    .nav-indicator {
      position: absolute;
      height: 28px;
      background-color: rgb(39, 39, 39);
      border-radius: 3rem;
      bottom: 0;
      left: 0;
      z-index: 1;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.3s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }
  }
}

/* 添加按钮点击动画效果 */
.nav-btn {
  position: relative;
  overflow: hidden;
}

.nav-btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%, -50%);
  transform-origin: 50% 50%;
}

.nav-btn:active::after {
  animation: ripple 0.6s ease-out;
}

@keyframes ripple {
  0% {
    transform: scale(0, 0) translate(-50%, -50%);
    opacity: 0.5;
  }
  100% {
    transform: scale(20, 20) translate(-50%, -50%);
    opacity: 0;
  }
}

/* 添加按钮悬停效果 */
.nav-btn:not(.nav-btn-active):hover {
  background-color: rgba(39, 39, 39, 0.05);
  transition: background-color 0.3s ease;
}
</style>