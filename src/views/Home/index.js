import React from 'react'

// 导入css
import './index.scss'

// 容器组件
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // 是否开始
      start: false,
      mstart: '开始游戏',
      msg: '请先开始游戏',
      // 保存棋盘状态
      checkerboards: [],
      ai: false,
      people: false,
      first: 'people',
      firstcolor: 'black',
      nowColor: '',
      nowTime: 0,
      set: '',
      // 操作的历史记录 可撤销
      history: []
    }
    this.chesspieces = this.chesspieces.bind(this)
    this.start = this.start.bind(this)
    this.startTime = this.startTime.bind(this)
    this.clearTime = this.clearTime.bind(this)
    this.changeFirst = this.changeFirst.bind(this)
    this.changeFirstColor = this.changeFirstColor.bind(this)
    this.gameOver = this.gameOver.bind(this)
    this.aiPlay = this.aiPlay.bind(this)
  }
  // 开始计时
  startTime() {
    this.set = setInterval(() => {
      this.setState({
        nowTime: this.state.nowTime + 1
      })
    }, 1000)
  }
  // 结束计时
  clearTime() {
    this.setState({
      nowTime: 0
    })
    clearInterval(this.set)
  }
  // 开始游戏
  start() {
    // 渲染dom调用
    this.createCheckerboards()
    if (this.state.start === false) {
      var color = ''
      if (this.state.first === 'ai') {
        color = this.state.firstcolor === 'black' ? 'white' : 'black'
        this.setState({
          ai: true,
          people: false,
          nowColor: color
        }, () => {
          this.aiPlay({x: 7, y: 7, z: 0})
        })
      } else {
        color = this.state.firstcolor === 'black' ? 'black' : 'white'
        this.setState({
          ai: false,
          people: true,
          nowColor: color
        })
      }
      this.setState({
        start: true,
        mstart: '重新开始'
      })
      // 开始计时
      this.startTime()
    } else {
      console.log('重新开始!')
      this.setState({
        start: false,
        mstart: '开始游戏',
        msg: '请先开始游戏',
        ai: false,
        people: false
      })
      // 结束计时
      this.clearTime()
      // 渲染dom调用
      this.createCheckerboards()
    }
  }
  // 生成棋子最初状态函数
  createCheckerboards() {
    // 一共225个位置  x 横坐标 y纵坐标  z 棋子颜色 0没棋子 1黑色 2白色 右上角是原点
    let arr = []
    for (var j = 0; j < 15; j++) {
      arr[j] = []
      for (var i = 0; i < 15; i++) {
        arr[j].push(
          {
            x: j,
            y: i,
            z: 0
          }
        )
      }
    }
    this.setState({
      checkerboards: arr
    })
  }
  // 下棋事件
  choosepieces(i) {
    var z = this.state.nowColor === 'black' ? 1 : 2
    if (this.state.checkerboards[i.x][i.y].z === 0) {
      this.state.checkerboards[i.x][i.y].z = z
    } else {
      return false
    }
    // 判断是否有赢家
    if (!this.gameOver(i)) {
      return false
    }
    this.setState({
      nowColor: this.state.nowColor === 'black' ? 'white' : 'black',
      ai: this.state.ai = !this.state.ai,
      people: this.state.people = !this.state.people
    }, () => {
      if (this.state.ai) {
        this.aiPlay(i)
      }
    })
  }
  // 改变先手
  changeFirst() {
    this.state.first === 'people' ? this.setState({first: 'ai'}) : this.setState({first: 'people'})
  }
  // 改变棋子颜色
  changeFirstColor() {
    this.state.firstcolor === 'white' ? this.setState({firstcolor: 'black'}) : this.setState({firstcolor: 'white'})
  }
  // 点击事件
  chesspieces(i) {
    if (this.state.start && this.state.people) {
      this.choosepieces(i)
    }
  }
  // 判断游戏是否结束
  gameOver(i) {
    // 判断是否连续的五个子
    var chess = 1
    var color = this.state.nowColor
    var arr = this.state.checkerboards
    var x = i.x
    var y = i.y
    var m = 0
    var n = 0
    color = color === 'white' ? 2 : 1
    // x 轴方向
    for (m = x - 1; m >= 0; m--) {
      if (arr[m][y].z === color) {
        chess += 1
      } else {
        break
      }
    }
    for (m = x + 1; m < 15; m++) {
      if (arr[m][y].z === color) {
        chess += 1
      } else {
        break
      }
    }
    chess = chess >= 5 ? 5 : 1

    // y轴方向
    for (m = y - 1; m >= 0; m--) {
      if (arr[x][m].z === color) {
        chess += 1
      } else {
        break
      }
    }
    for (m = y + 1; m < 15; m++) {
      if (arr[x][m] === color) {
        chess += 1
      } else {
        break
      }
    }
    chess = chess >= 5 ? 5 : 1

    // 右斜方向
    for (m = y - 1, n = x - 1; m >= 0 && n >= 0; m--, n--) {
      if (arr[n][m].z === color) {
        chess += 1
      } else {
        break
      }
    }
    for (m = y + 1, n = x + 1; m < 15 && n < 15; m++, n++) {
      if (arr[n][m].z === color) {
        chess += 1
      } else {
        break
      }
    }
    chess = chess >= 5 ? 5 : 1

    // 左斜方向
    for (m = y - 1, n = x + 1; m >= 0 && n < 15; m--, n++) {
      if (arr[n][m].z === color) {
        chess += 1
      } else {
        break
      }
    }
    for (m = y + 1, n = x - 1; m < 15 && n >= 0; m++, n--) {
      if (arr[n][m].z === color) {
        chess += 1
      } else {
        break
      }
    }
    if (chess >= 5) {
      console.log('gameOver')
      var win = this.state.ai ? '电脑获胜, 你再去练练吧...' : '你太棒了, 打败了电脑！'
      this.clearTime()
      this.setState({
        start: false,
        msg: win
      })
      return false
    } else {
      return true
    }
  }

  // ai下棋逻辑
  aiPlay(i) {
    // 搜索全盘匹配分值最高的位置
  }
  // 第一次渲染棋盘
  componentDidMount() {
    // 渲染dom调用
    this.createCheckerboards()
  }
  render() {
    var time = this.state.nowTime
    var hour = ~~(time / 3600)
    var min = ~~(time / 60 - hour * 60)
    var sec = ~~(time - hour * 3600 - min * 60)
    return (
      <div className="wrap">
        <div className="w-title">goodboy 五子棋</div>
        <div className="g-control">
          <button onClick={this.start}>{this.state.mstart}</button>
          <div className={this.state.start === true ? 'hide' : '' + ' ' + 'choose-rule'}>
            <button
              className={this.state.first === 'people' ? 'choose' : ''}
              onClick={this.changeFirst}
            >先手</button>
            <button
              className={this.state.first === 'ai' ? 'choose' : ''}
              onClick={this.changeFirst}
            >后手</button>
          </div>
          <div className={this.state.start === true ? 'hide' : '' + ' ' + 'choose-rule'}>
            <button
              className={this.state.firstcolor === 'black' ? 'choose' : ''}
              onClick={this.changeFirstColor}
            >黑棋</button>
            <button
              className={this.state.firstcolor === 'white' ? 'choose' : ''}
              onClick={this.changeFirstColor}
            >白棋</button>
          </div>
          <div className={this.state.start === false ? 'hide show-detai' : 'show-detail'}>
            <p><span>本局时间:</span><span>{hour} 时 {min} 分 {sec} 秒 </span>
            </p>
            <p>当前选手: {this.state.ai === true ? ' ai ' : ' 玩家 '} {this.state.nowColor === 'white' ? '白棋' : '黑棋'}</p>
            <p className={this.state.ai === true ? 'show' : 'hide'}>ai思考中.....</p>
          </div>
        </div>
        <div className="gobang">
          <div className={this.state.start === false ? 'g-loading' : 'hide'}>
            <p>{this.state.msg}</p>
          </div>
          {/* 此处是棋盘背景 根据二维数组生成数据*/}
          <div className="gb-box">
            {
              this.state.checkerboards.map((checkerboard) => {
                return (
                  checkerboard.map((item) => {
                    if (item.x < 14 && item.y < 14) {
                      return (
                        <div className="gb-item" key={'x' + item.x + 'y' + item.y}></div>
                      )
                    }
                  })
                )
              })
            }
          </div>
          {/* 此处是真正的棋盘 根据二维数组生成数据*/}
          <div className="g-box">
            {
              this.state.checkerboards.map((checkerboard, index) => {
                return (
                  checkerboard.map((item) => {
                    return (
                      <Chess
                        handel={this.chesspieces}
                        item={item} key={'x' + item.x + 'y' + item.y} />
                    )
                  })
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

// 实际棋盘组件
class Chess extends React.Component {
  constructor(props) {
    super(props)
    this.choose = this.choose.bind(this)
  }
  choose() {
    this.props.handel(this.props.item)
  }
  render() {
    return (
      <div
        onClick={this.choose}
        className={this.props.item.z === 0 ? 'g-item' : this.props.item.z === 1 ? 'black g-item' : 'white g-item'}>
      </div>
    )
  }
}

Chess.propTypes = {
  handel: React.PropTypes.func,
  item: React.PropTypes.object
}
export default Home
