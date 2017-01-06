import React from 'react'

// 导入css
import './index.scss'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // 是否开始
      start: false,
      // 保存棋盘状态
      checkerboards: []
    }
  }
  // 生成棋子最初状态函数
  createCheckerboards() {
    // 一共225个位置  x 横坐标 y纵坐标  z 棋子颜色 0没棋子 1黑色 2白色
    let x = 1
    let y = 1
    let z = 0
    let arr = []
    function create() {
      arr.push([x, y, z])
      if (x < 15) {
        x += 1
        create()
      } else if (y < 15) {
        y += 1
        x = 1
        create()
      }
    }
    create()
    this.setState({
      checkerboards: arr
    })
  }
  componentDidMount() {
    // 渲染dom调用
    this.createCheckerboards()
  }
  render() {
    return (
      <div className="wrap">
        <div className="w-title">goodboy 五子棋</div>
        <div className="gobang">
          {/* 此处是棋盘背景 根据二维数组生成数据*/}
          <div className="gb-box">
            {
              this.state.checkerboards.map((checkerboard) => {
                return (
                  <div className="gb-item" key={'x' + checkerboard[0] + 'y' + checkerboard[1]}></div>
                )
              })
            }
          </div>
          {/* 此处是真正的棋盘 根据二维数组生成数据*/}
          <div className="g-box">
            {
              this.state.checkerboards.map((checkerboard) => {
                return (
                  <div
                    className="g-item" key={'x' + checkerboard[0] + 'y' + checkerboard[1]}
                  ></div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}
export default Home
