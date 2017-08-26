export default {
  vxaddCart (state, val) {
    state.vxfood.push(val)
  },
  vxminusCart (state, food) {
    state.vxfood.forEach((val, index) => {
      if (val.name === food.name) {
        state.vxfood.splice(index, 1)
      }
    })
  }
}
