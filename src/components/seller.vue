<template>
  <div class="seller-wrapper" ref="seller-Wrapper">
    <div class="seller-content">
      <div class="info">
        <div class="title">
          <div class="text">{{seller.name}}</div>
          <div class="star-wrapper">
            <star :score="seller.score" :size="36"></star>
            <span class="rate-count">({{seller.ratingCount}})</span>
            <span class="sell-count">月售{{seller.sellCount}}单</span>
          </div>
          <div class="collect">
            <span class="icon-favorite" :class="{active:show}" @click="show=!show"></span>
            <span class="text">{{show?'已收藏':'收藏'}}</span>
          </div>
        </div>
        <div class="remark">
          <div class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="num">{{seller.minPrice}}</span>元
            </div>
          </div>
          <div class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="num">{{seller.deliveryPrice}}</span>元
            </div>
          </div>
          <div class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="num">{{seller.deliveryTime}}</span>分钟
            </div>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="activities">
        <div class="bulletin">
          <h1>公告与活动</h1>
          <div class="content">{{seller.bulletin}}</div>
        </div>
      </div>
      <div class="supports">
        <ul>
          <li class="item" v-for="item in preferential">
            <span class="iconMap" :class="item.class"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <div class="divider"></div>
      <div class="seller-imgs">
        <h1>商场实景</h1>
        <div>
          <img :src="item" alt="" width="120" height="90" v-for="item in seller.pics">
        </div>
      </div>
      <div class="divider"></div>
      <div class="seller-info">
        <h1>商家信息</h1>
        <ul class="info-list">
          <li class="info" v-for="item in seller.infos">{{item}}</li>
        </ul>
      </div>
    </div>

  </div>
</template>
<script>
  import star from './mods/star.vue'
  import icon from './mods/icon'
  import Scroll from 'better-scroll'
  export default {
    props: ['seller'],
    data () {
      return {
        show: false
      }
    },
    mounted () {
      this.$nextTick(() => {
        if (!this.sc) {
          this.sc = new Scroll(this.$refs['seller-Wrapper'], {
            click: true
          })
        } else {
          this.sc.refresh()
        }
      })
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
