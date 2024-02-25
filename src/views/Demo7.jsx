/*
 * @FileDescription: ***
 * @Author: cigarette
 * @Date: 2024-02-25 17:12:32
 * @LastEditors: cigarette
 * @LastEditTime: 2024-02-25 18:23:30
 * @Email: 2467337566@qq.com
 */
import React from 'react'

import { flushSync } from 'react-dom'
// flushSync:可以刷新“updater更新队列”，也就是让修改状态的任务立即批处理一次！！

/* this.setState(prevState => {
  // prevState:存储之前的状态值
  // return的对象，就是我们想要修改的新状态值「支持修改部分状态」
  return {
    xxx: xxx
  }
}) */

class Demo extends React.Component {
  state = {
    x: 0
  }

  handle = () => {
    /* // 更新一次 结果是1
    for (let i = 0; i < 20; i++) {
      this.setState({ x: this.state.x + 1 })
      // 加上 flushSync() 更新20次 结果是20
      // flushSync()
    } */

    // 更新一次 结果是1
    for (let i = 0; i < 20; i++) {
      this.setState(prevState => {
        console.log(prevState)
        return {
          x: prevState.x + 1
        }
      })
    }
  }

  render() {
    console.log('视图渲染：render')
    let { x } = this.state
    return (
      <div>
        x:{x}
        <br />
        <button onClick={this.handle}>按钮</button>
      </div>
    )
  }
}

export default Demo

/* 
  
*/
