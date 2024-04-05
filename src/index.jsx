/*
 * @FileDescription: ***
 * @Author: wu0304
 * @Date: 2023-09-11 22:15:50
 * @LastEditors: cigarette
 * @LastEditTime: 2024-02-25 17:44:36
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
// import { createElement, render } from './jsxHandle'
// import DemoOne from './views/DemoOne'
// import Vote from './views/Vote'
// import Demo from './views/Demo2'
// import Demo from './views/Demo3'
// import Demo from './views/Demo4'
// import Demo from './views/Demo5'
// import Demo from './views/Demo6'
// import Demo from './views/Demo7'
// import Demo from './views/Demo8'
import Demo from './views/Demo9'

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <>
    <Demo />
  </>
)

/* let x = 10,
  y = 20

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <div className="container">
    <h2 className="title" style={{ color: 'red' }}>
      小吴
    </h2>
    <div className="box">
      <span className="x">{x}</span>
      <span className="y">{y}</span>
    </div>
    <DemoOne title="我是标题" x={10} data={[100, 200]} className="box" style={{ fontSize: '20px' }}>
      <p slot="header">页眉</p>
      <p slot="footer">页脚</p>
    </DemoOne>

    <DemoOne title="我是小鱼">
      <span>3</span>
    </DemoOne>

    <DemoOne title="我是小吴" />

    <Vote title="练习React" />
  </div>
)

setTimeout(() => {
  root.render(
    <>
      <Vote title="测试componentWillReceiveProps" />
    </>
  )
}, 5000) */

/* let virtualDOM = React.createElement(
  'div',
  { className: 'container' },
  createElement('h2', { className: 'title', style: { color: 'red' } }, '小吴'),
  createElement('div', { className: 'box' }, createElement('span', { className: 'x' }, x), createElement('span', { className: 'y' }, y))
)
console.log(virtualDOM)
render(virtualDOM, document.getElementById('root')) */

/* 
 render函数在渲染的时候，如果type是：
    + 字符串：创建一个标签
    + 普通函数：把函数执行，并且把props传递给函数
    + 构造函数：把构造函数基于new执行「也就是创建类的一个实例」，也会把解析出来的props传递过去
      + 每调用一次类组件都会创建一个单独的实例
      + 把在类组件中编写的render函数执行，把返回的jsx「virtualDOM」当做组件视图进行渲染！！
      例如：
      new Vote({
        title:'React其实还是很好学的!'
      })
 */
