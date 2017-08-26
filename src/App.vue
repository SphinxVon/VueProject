<template>
  <div id="app">
    <v-header :seller="datas.seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="datas.seller" ref="foodsW"></router-view>
  </div>

</template>

<script>
import header from './components/mods/header.vue'
import axios from 'axios'
export default {
  name: 'app',
  data () {
    return {
      datas: {
        // 商户的信息
        'seller': {},
        // 商品数据
        'goods': [],
        // 评论
        'ratings': []
      }
    }
  },
  mounted () {
    // 通过axios获取数据存入data中
    axios.get('/static/data.json').then(res => {
      this.datas.seller = res.data.seller
      this.datas.goods = res.data.goods
      this.datas.ratings = res.data.ratings
    })
    document.addEventListener('visibilitychange', this.changeTitle, false)
  },
  methods: {
    changeTitle () {
      document.title = document.hidden ? '(*_*)' : 'vue-实战'
    }
  },
  components: {
    'v-header': header
  }
}
// 当在style标签中写上scoped  当前这个模板和当前模板下所有的字模板 应用这个样式
</script>
<style>
  .tab .tab-item a.router-link-active{
    color:red
  }
</style>
