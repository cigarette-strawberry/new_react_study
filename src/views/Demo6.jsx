/*
 * @FileDescription: ***
 * @Author: cigarette
 * @Date: 2024-02-25 17:12:32
 * @LastEditors: cigarette
 * @LastEditTime: 2024-02-25 18:16:16
 * @Email: 2467337566@qq.com
 */
import React from 'react'
import { flushSync } from 'react-dom'
// flushSync:可以刷新“updater更新队列”，也就是让修改状态的任务立即批处理一次！！

class Demo extends React.Component {
  state = {
    x: 10,
    y: 5,
    z: 0
  }

  handle = () => {
    // this => 实例 【宿主环境】
    let { x, y, z } = this.state
    this.setState({ x: x + 1 })
    console.log(this.state)

    flushSync(() => {
      this.setState({ y: y + 1 })
      console.log(this.state)
    })

    console.log(this.state)
    // 再修改z之前，要保证x/y都已经更改和让视图更新了
    this.setState({ z: this.state.x + this.state.y })
  }

  render() {
    console.log('视图渲染：render')
    let { x, y, z } = this.state
    return (
      <div>
        x:{x}-y:{y}-z:{z}
        <br />
        <button onClick={this.handle}>按钮</button>
      </div>
    )
  }
}

export default Demo

/* 
  在React18 和 React16中，关于**setState**是同步还是异步，是有一些区别的！

    React18中：不论在什么地方执行**setState**，它都是异步的「都是基于updater更新队列机制，实现的批处理」
    
    React16中：如果在合成事件「jsx元素中基于onXxx绑定的事件」、周期函数中，**setState**的操作是异步的！！但是如果**setState**出现在其他异步操作中「例如：定时器、手动获取DOM元素做的事件绑定等」，它将变成同步的操作「立即更新状态和让视图渲染」！！
*/
