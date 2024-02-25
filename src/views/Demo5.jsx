import React from 'react'

class Demo extends React.Component {
  state = {
    x: 10,
    y: 5,
    z: 1
  }

  handle = () => {
    // this => 实例 【宿主环境】
    let { x, y, z } = this.state
    // 同时修改三个状态值；只会触发一次视图更新
    this.setState(
      {
        x: 100
      },
      () => {
        console.log('更新X')
      }
    )
  }

  shouldComponentUpdate() {
    return false
  }

  componentDidUpdate() {
    console.log('更新完毕')
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
  this.setState([partialState], [callback])
    [partialState]:支持部分状态更改
      this.setState({
        x:100 //不论总共有多少状态，我们只修改了x，其余的状态不动
      })
    [callback]:在状态更改/视图更新完毕后触发执行[也可以说只要执行了setState,callback一定会执行]
      + 发生在componentDidUpdate周期函数之后【DidUpdate会在任何状态更改后都触发执行；而回调函数方式，可以在指定状态更新后处理一些事情；】
      + 特殊:即使我们基于shouldComponentUpdate阻止了状态/视图的更新，DidUpdate周期函数肯定不会执行了，但是我们设置的这个callback回调函数依然会被触发执行！！
      + 类似于Vue框架中的$nextTick！！
*/
