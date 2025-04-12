<template>
  <div>会员信息：{{ memberStore.profile }}</div>
  <button
  @tap="
  memberStore.setProfile({
    nickname:'黑马先锋',
    token:'12345'})" > 保存</button>
   <button @tap="getData">测试请求</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMemberStore } from '@/stores/modules/member';
const memberStore=useMemberStore()
import{http} from'@/utils/http'
///测试请求
const title = ref('Hello')
const getData= async()=>{
  const res=await http<string[]>({
    method:'GET',
    url:'/home/banner'
  })
  console.log('请求成功',res)
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
