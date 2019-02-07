import Driver from 'driver.js'

let VueDriver = {}

VueDriver.steps = []

VueDriver.install = function (Vue, options) {
  // initialize Driver
  VueDriver.driver = new Driver({})
  // driver.highlight('selector');

  Vue.directive('driver-step', {
    bind (el, binding, vnode, oldVnode) {
      let step = {
        element: el,
        popover: {
          ...(binding.value ? (binding.value.popover || {}) : {})
        }
      }
      if (binding.value && binding.value.index != null) {
        console.log('We have an index!')
        VueDriver.steps.splice(binding.value.index, 0, step)
      } else {
        console.log('We have nothing :-(')
        VueDriver.steps.push(step)
      }
      if (binding.value && binding.value.onclick === true) {
        el.onclick = () => {
          VueDriver.driver.highlight(step)
        }
      }
      // console.dir(el);
      // console.log(binding.value);
      // console.log(vnode);
      // console.log(oldVnode);
    }
  })
  Vue.prototype.$startTour = () => {
    VueDriver.driver.defineSteps([...VueDriver.steps])
    console.log(VueDriver.steps)
    console.log(VueDriver.driver.steps)
    VueDriver.driver.start()
  }

  Vue.prototype.$driver = VueDriver._driver
}

export default VueDriver
