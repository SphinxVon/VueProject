<template>
    <div class="star" :class="'star-' + size">
      <span class="star-item" :class="item" v-for="item in mark"></span>
    </div>
</template>
<script>
  // 评分模板
  export default {
    props: ['score', 'size'],
    computed: {
      mark () {
        // 存储显示星星的class
        let arr = []
        // 代表实心星星的个数
        let num = Math.floor(this.score)
        // true代表空心星星 false则没有
        let decimal = (this.score - num) >= 0.5
        for (let i = 0; i < num; i++) {
          arr.push('on')
        }
        if (decimal) {
          arr.push('half')
        }
        // 星星颗数不足5颗则用灰色星星补足
        while (arr.length < 5) {
          arr.push('off')
        }
        return arr
      }
    }
  }
</script>
