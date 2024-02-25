/*
 * @FileDescription: ***
 * @Author: wu0304
 * @Date: 2023-10-04 13:12:52
 * @LastEditors: wu0304
 * @LastEditTime: 2023-10-07 15:44:30
 */

/* 
函数组件是“静态组件”

第一次渲染组件，把函数执行

- 产生一个私有的上下文：EC(V)
- 把解析出来的props「含children」传递进来「但是被冻结了」
- 对函数返回的JSX元素「virtualDOM」进行渲染

当我们点击按钮的时候，会把绑定的小函数执行：

- 修改上级上下文EC(V)中的变量
- 私有变量值发生了改变
- 但是“视图不会更新”

也就是，函数组件第一次渲染完毕后，组件中的内容，不会根据组件内的某些操作，再进行更新，所以称它为静态组件

除非在父组件中，重新调用这个函数组件「可以传递不同的属性信息」

真实项目中，有这样的需求：第一次渲染就不会再变化的，可以使用函数组件！！

但是大部分需求，都需要在第一次渲染完毕后，基于组件内部的某些操作，让组件可以更新，以此呈现出不同的效果！！==> 动态组件「方法：类组件、Hooks组件(在函数组件中，使用Hooks函数)」
 */
import React from 'react'
import PropTypes from 'prop-types'
const DemoOne = function DemoOne(props) {
  // console.log(props)
  let { title, className, x, children } = props
  // 可以基于 React.Children 对象中提供的方法，对 props.children 做处理：count\forEach\map\toArray...
  // 好处：在这些方法内部，已经对 children 的各种形式做了处理
  children = React.Children.toArray(children)
  // console.log(children)
  let headerSlot = [],
    footerSlot = [],
    defaultSlot = []
  children.forEach(child => {
    let { slot } = child.props
    if (slot === 'header') headerSlot.push(child)
    else if (slot === 'footer') footerSlot.push(child)
    else defaultSlot.push(child)
  })

  return (
    <>
      {headerSlot}
      <div className={`demo-box ${className}`}>{title}</div>
      <h2>{x}</h2>
      {footerSlot}
    </>
  )
}

/* 通过把函数当做对象，设置静态的私有属性方法，来给其设置属性的校验规则 */
DemoOne.defaultProps = {
  className: 'default',
  x: 0
}

DemoOne.propTypes = {
  title: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired
}

export default DemoOne
