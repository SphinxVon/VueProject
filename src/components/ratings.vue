<template>
  <div class="ratingsWrapper" ref="ratingsWrapper">
    <div class="ratings-content">
      <div class="info">
        <div class="mark">
          <div class="num">{{seller.score}}</div>
          <div class="text">综合评分</div>
          <div class="contrast">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="stars">
          <div class="serviceScore">
            <span class="text">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="num">{{seller.serviceScore}}</span>
          </div>
          <div class="foodScore">
            <span class="text">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="num">{{seller.foodScore}}</span>
          </div>
          <div class="deliveryTime">
            <span class="text">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="evaluation">
        <div class="classify">
          <span class="item" :class="{active:item.active, bad:index==2,badActive:index==2&&item.active}" @click="onclassify(item)" v-for="item,index in classify">
            {{item.name}}<span class="count">{{item.count}}</span>
          </span>
        </div>
        <div class="switch" @click="flag=!flag">
          <span class="icon-check_circle" :class="{on:flag}"></span>
          <span class="text">只看有内容的评价</span>
        </div>
        <div class="evel-list">
          <ul>
            <li v-for="item in commontss" class="evel">
              <div class="avatar">
                <img :src="item.avatar" alt="" width="28" height="28">
              </div>
              <div class="content">
                <div class="user">
                  <span class="name">{{item.username}}</span>
                  <span class="rateTime">{{item.rateTime}}</span>
                </div>
                <div class="star-wrapper">
                  <star :score="item.score" :size="24"></star>
                </div>
                <span  class="icon" :class="item.rateType?'icon-thumb_down':'icon-thumb_up'"></span>
                <span class="text">{{item.text}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import star from './mods/star.vue'
  import Scroll from 'better-scroll'
  import axios from 'axios'
  export default {
    props: ['seller'],
    data () {
      return {
        ratings: [],
        classify: [
          {name: '全部', count: 0, commont: [], active: true},
          {name: '推荐', count: 0, commont: [], active: false},
          {name: '吐槽', count: 0, commont: [], active: false}
        ],
        flag: true
      }
    },
    mounted () {
      axios.get('/static/data.json').then(res => {
        this.ratings = res.data.ratings
        this.ratings.forEach(val => {
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
        // 把评论归类好 => 注册一个$nextTick => 计算属性里的执行 => 更新dom => 触发$nextTick => 执行Scroll
        this.$nextTick(() => {
          /* eslint-disable no-new */
          this.sc = new Scroll(this.$refs['ratingsWrapper'], {
            click: true
          })
        })
      })
    },
    methods: {
      scroll () {
      },
      onclassify ($item) {
        this.ratings = $item.commont
        this.classify.forEach((item) => {
          item.active = false
        })
        $item.active = true
      },
      updatasc () {
        this.$nextTick(() => {
          this.sc.refresh()
        })
      }
    },
    computed: {
      commontss () {
        this.updatasc()
        if (this.flag) {
          let arr = []
          this.ratings.forEach(val => {
            if (val.text.length > 0) {
              arr.push(val)
            }
          })
          return arr
        } else {
          return this.ratings
        }
      }
    },
    components: {
      star
    }
  }
</script>
