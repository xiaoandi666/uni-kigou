<template>
   <CustomNavbar/>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMemberStore } from '@/stores/modules/member';
const memberStore=useMemberStore()
import{http} from'@/utils/http'
import CustomNavbar from '@/components/CustomNavbar.vue'
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

</style>
