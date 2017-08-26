<template>
  <div class="shopCart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'active':totalNum>0}">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="badge">{{totalNum}}</div>
        </div>
        <div class="price">￥{{totalPrice}}</div>
        <div class="desc" @click="showa()">{{freepaydec}}</div>
      </div>
      <div class="content-right" :class="{'enough':totalPrice>minPrice}">
        <div class="pay">{{pay}}</div>
      </div>
    </div>
    <transition name="transHeight">
      <div class="shopcart-list" v-show="totalPrice > 0 && show">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty()">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="item in food">
              <span class="name">{{item.name}}</span>
              <div class="price">
                <span>￥{{item.price}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="item"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import cartcontrol from './cartcontrol.vue'
  import Scroll from 'better-scroll'
  export default {
    props: ['deliveryPrice', 'minPrice', 'food'],
    data () {
      return {
        show: false
      }
    },
    components: {
      cartcontrol
    },
    methods: {
      empty () {
        this.food.forEach((val) => {
          val.count = 0
        })
        this.show = false
      },
      showa () {
        this.show = !this.show
        /* eslint-disable no-new */
        this.$nextTick(() => {
          // dom加载完之后再执行滚动插件
          if (!this.sc) {
            this.sc = new Scroll(this.$refs['listContent'], {
              click: true
            })
          } else {
            // 强制重新计算高度
            this.sc.refresh()
          }
        })
      }
    },
    computed: {
      // 商品总数
      totalNum () {
        let sum = 0
        this.food.forEach((food) => {
          sum += food.count
        })
        return sum
      },
      totalPrice () {
        let total = 0
        this.food.forEach((food) => {
          total += food.count * food.price
        })
        return total
      },
      // 免配送费
      freepaydec () {
        if (this.totalPrice < 50) {
          return `另需要配送费￥${this.deliveryPrice}元`
        } else {
          return `免配送费`
        }
      },
      // 支付金额
      pay () {
        if (this.totalPrice <= 0) {
          return `￥20元起送`
        } else if (this.totalPrice < 20) {
          return `还差￥${20 - this.totalPrice}元起送`
        } else {
          return `去结算`
        }
      }
    }

  }
</script>
