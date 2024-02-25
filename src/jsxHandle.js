/*
 * @FileDescription: ***
 * @Author: wu0304
 * @Date: 2023-09-25 22:10:57
 * @LastEditors: wu0304
 * @LastEditTime: 2023-09-27 22:14:43
 */
/* createElement:创建虚拟DOM对象 */
export function createElement(ele, props, ...children) {
  let virtualDOM = {
    $$typeof: Symbol('react.element'),
    key: null,
    ref: null,
    type: null,
    props: {}
  }
  let len = children.length
  virtualDOM.type = ele
  if (props !== null) {
    virtualDOM.props = { ...props }
  }
  if (len === 1) virtualDOM.props.children = children[0]
  if (len > 1) virtualDOM.props.children = children
  return virtualDOM
}

const each = function each(obj, callback) {
  if (obj === null || typeof obj !== 'object') throw new TypeError('obj is not object')
  if (typeof callback !== 'function') throw new TypeError('callback is not function')
  let keys = Reflect.ownKeys(obj)
  keys.forEach(key => {
    let value = obj[key]
    // 每一次迭代，都把回调函数执行
    callback(value, key)
  })
}

/* render:把虚拟DOM变为真实DOM */
export function render(virtualDOM, container) {
  let { type, props } = virtualDOM
  if (typeof type === 'string') {
    // 存储的是标签名：动态创建这样一个标签
    let ele = document.createElement(type)

    // 为标签设置相关的属性 & 子节点
    each(props, (value, key) => {
      // className的处理：value存储的是样式类名 <div className="box">
      if (key === 'className') {
        ele.className = value
        return
      }
      // style的处理：value存储的是样式对象 <h2 style={{ color: 'red' }}>
      if (key === 'style') {
        each(value, (val, attr) => {
          ele.style[attr] = val
        })
        return
      }
      // 子节点的处理：value存储的是children属性值
      if (key === 'children') {
        let children = value
        if (!Array.isArray(children)) children = [children]
        children.forEach(child => {
          // 子节点是文本节点：直接插入即可
          if (typeof child === 'string' || typeof child === 'number') {
            ele.appendChild(document.createTextNode(child))
            return
          }
          // 子节点又是一个virtualDOM：递归处理
          render(child, ele)
        })
        return
      }

      ele.setAttribute(key, value)
    })

    // 把新增的标签，添加到指定容器中
    container.appendChild(ele)
  }
}
