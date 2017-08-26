<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="item in goods" class="menu-item">
          <span class="text">
            <span class="iconMap" v-show="item.type>0" :class="icon[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li class="food-list food-list-hook" v-for="item in goods">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li class="food-item" v-for="food in item.foods" @click="openDetail(food)">
              <div class="icon"  >
                <img :src="food.icon" alt="" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="description">{{food.description}}</p>
                <div class="sell-info">
                  <span class="sellCount">月售{{food.sellCount}}份</span>
                  <span class="rating">好评率{{food.rating}}</span>
                  <div class="price">
                    <span class="newPrice">
                      <span class="unit">$</span>{{food.price}}
                    </span>
                    <span class="oldPrice" v-show="false">
                      <span class="unit">{{food.oldPrice}}</span>
                    </span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
   <shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :food="selectFoods" ></shopcart>
    <foodDetail :foodDetail="curfood" ref="foodDetail"></foodDetail>
  </div>
</template>
<script>
  import shopcart from './mods/shopcart.vue'
  import cartcontrol from './mods/cartcontrol.vue'
  import foodDetail from './mods/foodDetail.vue'
  import icon from './mods/icon'
  import Scroll from 'better-scroll'
  import axios from 'axios'
  export default {
    props: ['seller'],
    data () {
      return {
        icon,
        curfood: {},
        goods: [],
        foods: []
      }
    },
    mounted () {
      axios.get('/static/data.json').then((res) => {
        this.goods = res.data.goods
        this.$nextTick(() => {
          if (!this.sc) {
            this.sc = new Scroll(this.$refs['menuWrapper'], {
              click: true
            })
          } else {
            this.sc.refresh()
          }
          if (!this.sc1) {
            this.sc1 = new Scroll(this.$refs['foodsWrapper'], {
              click: true
            })
          } else {
            this.sc1.refresh()
          }
        })
      })
    },
    computed: {
      selectFoods () {
        this.food = []
        this.goods.forEach(goods => {
          goods.foods.forEach(foods => {
            if (foods.count > 0) {
              this.food.push(foods)
            }
          })
        })
        return this.food
      }
    },
    methods: {
      openDetail (food) {
        this.curfood = food
        this.$refs['foodDetail'].showFood()
      }
    },
    components: {
      shopcart,
      cartcontrol,
      foodDetail
    }
  }
</script>
