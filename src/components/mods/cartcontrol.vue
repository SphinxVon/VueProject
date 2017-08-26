<template>
  <div class="cartcontrol">
    <transition name="fadeRotate">
      <div class="cart-decrease" v-show="food.count>0" @click.stop="minusCart($event)">
        <span class="icon-remove_circle_outline inner"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div id="add" class="cart-add" @click.stop="addCart($event)">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {mapState, mapMutations} from 'vuex'
  export default {
    props: ['food'],
    data () {
      return {
      }
    },
    computed: {
      ...mapState([
        'vxfood'
      ])
    },
    methods: {
      ...mapMutations([
        'vxaddCart', 'vxminusCart'
      ]),
      addCart (event) {
//        event.cancelBubble = true
        if (!event._constructed) {
          return false
        }
        if (typeof this.food.count === 'undefined') {
          Vue.set(this.food, 'count', 0)
          // 设置active 默认true可添加
          this.food.active = true
        }
        this.food.count++
        if (this.food.active) {
          this.vxaddCart(this.food)
          this.food.active = false
        }
      },
      minusCart (event) {
//        event.cancelBubble = true
        if (!event._constructed) {
          return false
        }
        this.food.count--
        if (this.food.count === 0) {
          this.vxminusCart(this.food)
        }
      }
    }
  }
</script>
