<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">{{ seller.description }} / {{ seller.deliveryTime }}分钟送达</div>
        <div class="supports">
          <div class="supports_desc">
            <span class="icon decrease"></span>
            <span class="text">{{ seller.supports[0].description }}</span>
          </div>
        </div>
      </div>
      <div class="support-count" @click="show = !show">
          <span class="count">{{ seller.supports.length }}个</span>
          <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="show = !show">
        <span class="bulletin-title"></span>
        <span class="bulletin-text">{{seller.bulletin}}</span>
        <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" alt="">
    </div>
    <transition name="fade">
      <div class="detail" v-show="show">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <div class="star star-48">
                <star :score="seller.serviceScore"></star>
              </div>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="supports">
              <li class="support-item" v-for="item in preferential">
                <span class="icon" :class="item.class"></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">{{seller.bulletin}}</div>
          </div>
        </div>
        <div class="detail-close" @click="show = !show">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import star from './star.vue'
  import icon from './icon.js'
  export default {
    props: ['seller'],
    data () {
      return {
        show: false
      }
    },
    computed: {
      // 优惠活动
      preferential () {
        let arr = []
        for (let i = 0, length = this.seller.supports.length; i < length; i++) {
          let json = {}
          json.class = icon[i]
          json.description = this.seller.supports[i].description
          arr.push(json)
        }
        return arr
      }
    },
    components: {
      star
    }
  }
</script>

