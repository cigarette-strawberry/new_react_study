import React from 'react'

class Demo extends React.Component {
  render() {
    return (
      <div className="outer center" onClick={() => console.log('outer 冒泡 「合成」')} onClickCapture={() => console.log('outer 捕获 「合成」')}>
        <div
          className="inner center"
          onClick={ev => {
            console.log('inner 冒泡 「合成」')
            // ev:合成事件对象
            console.log(ev)
            ev.stopPropagation() // 合成事件对象中的“阻止事件传播”:阻止原生的事件传播 & 阻止合成事件中的事件传播「向上传播的被禁止 同级不受影响」
            // ev.nativeEvent.stopPropagation() // 原生事件对象中的“阻止事件传播”:只能阻止原生事件的传播「向上传播的被禁止 同级不受影响」
            // ev.nativeEvent.stopImmediatePropagation() // 原生事件对象的阻止事件传播，只不过可以阻止#root上其它绑定的方法执行

            /* setTimeout(() => {
              console.log(ev) // React18中并没有对象事件池机制，所以也不存在：创建的事件对象被清空的问题！！
            }, 500) */
          }}
          onClickCapture={() => console.log('inner 捕获 「合成」')}></div>
      </div>
    )
  }

  componentDidMount() {
    document.addEventListener('click', () => console.log('document 捕获'), true)
    document.addEventListener('click', () => console.log('document 冒泡'), false)

    document.body.addEventListener('click', () => console.log('body 捕获'), true)
    document.body.addEventListener('click', () => console.log('body 冒泡'), false)

    document.querySelector('#root').addEventListener('click', () => console.log('root 捕获'), true)
    document.querySelector('#root').addEventListener('click', () => console.log('root 冒泡'), false)

    document.querySelector('.outer').addEventListener('click', () => console.log('outer 捕获「原生」'), true)
    document.querySelector('.outer').addEventListener('click', () => console.log('outer 冒泡「原生」'), false)

    document.querySelector('.inner').addEventListener('click', () => console.log('inner 捕获「原生」'), true)
    document.querySelector('.inner').addEventListener(
      'click',
      ev => {
        // ev.stopPropagation() // 阻止事件传播
        console.log('inner 冒泡「原生」')
      },
      false
    )
  }
}

export default Demo

/*
  React中合成事件的处理原理 18
     “绝对不是"给当前元素基于addEventListener单独做的事件绑定，React中的合成事件，都是基于“事件委托"处理的!
      + 在React17及以后版本，都是委托给#root这个容器「捕获和冒泡都做了委托」;
      + 在17版本以前，都是委托给document容器的「而且只做了冒泡阶段的委托」;
      + 对于没有实现事件传播机制的事件，才是单独做的事件绑定「例如:onMouseEnter/onMouseLeave...」

      在组件渲染的时候，如果发现JSX元素属性中有 onXxx/onXxxCapture 这样的属性，不会给当前元素直接做事件绑定，只是把绑定的方法赋值给元素的相关属性!!例如:
      outer.onClick=()=> {console.log('outer 冒泡「合成」');} //这不是DOM0级事件绑定「这样的才是outer.onclick」
      outer.onClickCapture=()=> {console.log('outer 捕获「合成」');}
      inner.onclick=()=> {console.log('inner 冒泡「合成」');}
      inner.onClickCapture=()=> {console.log('inner 捕获「合成」');}

      然后对#root这个容器做了事件绑定「捕获和冒泡都做了」
        原因:因为组件中所渲染的内容，最后都会插入到#root容器中，这样点击页面中任何一个元素，最后都会把#root的点击行为触发!!
        而在给#root绑定的方法中，把之前给元素设置的onXxx/onXxxCapture属性，在相应的阶段执行!!


-----------------------------------
  React中合成事件的处理原理 16
    在16版本中，合成事件的处理机制，不再是把事件委托给#root元素，而是委托给document元素，并且只做了冒泡阶段的委托;在委托的方法中，把onXxx/onXxxCapture合成事件属性进行执行!!

  React16中，关于合成事件对象的处理，React内部是基于"事件对象池"，做了一个缓存机制!!React17及以后，是去掉了这套事件对象池和缓存机制的!!
    + 当每一次事件触发的时候，如果传播到了委托的元素上「document/#root」，在委托的方法中，我们首先会对内置事件对上象做统一处理，生成合成事件对象!!
      在React16版本中:
      为了防止每一次都是重新创建出新的合成事件对象，它设置了一个事件对象池「缓存池」
      + 本次事件触发，获取到事件操作的相关信息后，我们从 事件对象池 中获取存储的合成事件对象，把信息赋值给相关的成员!
      + 等待本次操作结束，把合成事件对象中的成员信息都清空掉，再放入到 事件对象池 中!!
*/
