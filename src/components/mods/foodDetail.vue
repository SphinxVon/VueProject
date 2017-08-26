<template>
  <transition name="move">
  <div class="detailWrapper"  v-show="detailShow" ref="detailWrapper">
      <div class="foodDetail">
        <div class="back" @click="detailShow=!detailShow">
          <i class="icon-arrow_lift"></i>
        </div>
        <img :src="foodDetail.image" alt="" height="425" width="100%">
        <div class="info">
          <div class="title">{{foodDetail.name}}</div>
          <div class="desc">
            <span>月售{{foodDetail.sellCount}}</span>
            <span>好评率{{foodDetail.rating}}%</span>
          </div>
          <div class="price">
            <span class="unit">￥</span>{{foodDetail.price}}
            <span class="oldPrice" v-show="false">￥</span>
          </div>
          <transition name="fade">
            <div class="shopCart" v-show="foodDetail.count==0 || foodDetail.count== undefined" @click="add($event)">
              <div class="text">加入购物车</div>
            </div>
          </transition>
          <cartcontrol :food="foodDetail" ref="cartcontrol"></cartcontrol>
        </div>
        <div class="divider"></div>
        <div class="desc">
          <div class="title">商品介绍</div>
          <div class="content">{{foodDetail.info}}</div>
        </div>
        <div class="divider"></div>
        <div class="evaluation">
          <div class="title">商品评价</div>
          <div class="classify">
            <span class="item" :class="{active:item.active, bad:index == 2, badActive: index==2&&item.active }" v-for="(item, index) in classify" @click="onclassify(item)">{{item.name}} <span class="count">{{item.count}}</span></span>
          </div>
          <div class="switch" @click="flag=!flag">
            <span class="icon-check_circle" :class="{on:flag}"></span>
            <span class="text">只看有内容的评价</span>
          </div>
          <div class="evel-list">
            <ul>
              <li v-for="item in commontss" class="evel">
                <div class="userInfo">
                  <div class="time">{{item.rateTime}}</div>
                  <div class="user">
                    <span>{{item.username}}</span>
                    <span class="avatar">
                      <img :src="item.avatar" alt="" width="12" height="12">
                    </span>
                  </div>
                </div>
                <div class="content">
                  <span  class="icon" :class="item.rateType?'icon-thumb_down':'icon-thumb_up'"></span>
                  <span class="text">{{item.text}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
  </div>
  </transition>
</template>
<script>
  import cartcontrol from './cartcontrol.vue'
  import Scroll from 'better-scroll'
  export default {
    props: ['foodDetail'],
    data () {
      return {
        detailShow: false,
        classify: [
          {name: '全部', count: 0, commont: [], active: true},
          {name: '推荐', count: 0, commont: [], active: false},
          {name: '吐槽', count: 0, commont: [], active: false}
        ],
        commonts: [],
        flag: true
      }
    },
    methods: {
      showFood () {
        this.detailShow = true
        this.$nextTick(() => {
          this.commonts = this.foodDetail.ratings
          this.foodDetail.ratings.forEach(val => {
            this.classify[0].count++
            this.classify[0].commont.push(val)
            if (val.rateType) {
              this.classify[2].count++
              this.classify[2].commont.push(val)
            } else {
              this.classify[1].count++
              this.classify[1].commont.push(val)
            }
          })
        })
        this.$nextTick(() => {
          if (!this.sc) {
            this.sc = new Scroll(this.$refs['detailWrapper'], {
              click: true
            })
          } else {
            this.sc.refresh()
          }
        })
      },
      add (event) {
        this.$refs['cartcontrol'].addCart(event)
      },
      onclassify ($item) {
        this.commonts = $item.commont
        this.classify.forEach((item) => {
          item.active = false
        })
        $item.active = true
      },
      updatesc () {
        this.$nextTick(() => {
          this.sc.refresh()
        })
      }
    },
    computed: {
      commontss () {
        this.updatesc()
        if (this.flag) {
          let arr = []
          this.commonts.forEach(val => {
            if (val.text.length > 0) {
              arr.push(val)
            }
          })
          return arr
        } else {
          return this.commonts
        }
      }
    },
    components: {
      cartcontrol
    }
  }
</script>
