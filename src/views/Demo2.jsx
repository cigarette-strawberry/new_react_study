import React from 'react'

// 检测是否为对象
const isObject = function isObject(obj) {
  return obj !== null && /^(object|function)$/.test(typeof obj)
}

// 对象浅比较的方法
const shallowEqual = function shallowEqual(objA, objB) {
  if (!isObject(objA) || !isObject(objB)) return false
  if (objA === objB) return true
  // 先比较成员的数量
  let keysA = Reflect.ownKeys(objA),
    keysB = Reflect.ownKeys(objB)
  if (keysA.length !== keysB.length) return false
  // 数量一致，再逐一比较内部的成员[只比较第一级：浅比较]
  for (let i = 0; i < keysA.length; i++) {
    let key = keysA[i]
    // 如果一个对象中有这个成员，一个对象中没有；或者，都有这个成员，但是成员值不一样；都应该被判定为不相同！！
    if (!objB.hasOwnProperty(key) || !Object.is(objA[key], objB[key])) return false
  }

  // 以上都处理完，发现没有不相同的成员，则认为两个对象是相等的
  return true
}

/* Object.is(NaN, NaN) // 是相等的 true
NaN === NaN false */

let obj = { z: 20 }

let objA = {
  x: 10,
  y: obj
  //   c: [10, 20, 30]
}
obj.n = 20
let objB = {
  x: 10,
  y: obj
  //   c: [10, 20, 30]
}

console.log(shallowEqual(objA, objB))

class Demo extends React.Component {
  // class Demo extends React.PureComponent {
  state = {
    arr: [10, 20, 30] // 0x001
  }
  render() {
    let { arr } = this.state // arr -> 0x001
    return (
      <div>
        {arr.map((item, index) => {
          return (
            <span key={index} style={{ display: 'inline-block', width: 100, height: 100, background: 'pink', marginRight: 10 }}>
              {item}
            </span>
          )
        })}

        <br />

        <button
          onClick={() => {
            arr.push(40) // 给arr0x001堆中新增一个40
            this.setState({ arr }) // 最新修改的状态地址，还是0x001[状态地址没有改变]
            // this.forceUpdate() // 跳过默认加的 shouldComponentUpdate 直接更新
            // this.setState({ arr: [...arr] }) // 我们还是让arr状态值改为一个新的数组[堆地址]
          }}>
          新增SPAN
        </button>
      </div>
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { props, state } = this
    // props/state:修改之前的属性状态
    // nextProps/nextState:将要修改的属性状态
    console.log(props, state, nextProps, nextState)
    return !shallowEqual(props, nextProps) || !shallowEqual(state, nextState)
  }
}

export default Demo
