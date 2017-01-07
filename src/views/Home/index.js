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
      firstcolor: 'white',
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
    if (this.state.start === false) {
      var color = ''
      if (this.state.first === 'ai') {
        color = this.state.firstcolor === 'black' ? 'white' : this.state.firstcolor === 'white' ? 'balck' : 'white'
        this.setState({
          ai: true,
          people: false,
          nowColor: color
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
  // 下棋事件
  choosepieces(i) {
    var z = this.state.nowColor === 'black' ? 1 : 2
    if (this.state.checkerboards[i][2] === 0) {
      this.state.checkerboards[i][2] = z
    } else {
      return false
    }
    // 判断是否有赢家
    this.gameOver()
    this.setState({
      nowColor: this.state.nowColor === 'black' ? 'white' : 'black',
      ai: this.state.ai = !this.state.ai,
      people: this.state.people = !this.state.people
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
    if (this.state.start === true) {
      this.choosepieces(i)
    }
  }
  // 判断游戏是否结束
  gameOver() {
    // 判断是否连续的五个子
    var chess = 0
    console.log(chess)
    console.log('gameOver')
  }
  componentDidMount() {
    // 渲染dom调用
    this.createCheckerboards()
  }
  render() {
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
            <p><span>本局时间:</span>
            {~~(this.state.nowTime / 3600) + ' 时 ' +
            (~~(this.state.nowTime / 60) - ~~(this.state.nowTime / 3600) * 3600) + ' 分 ' +
            (this.state.nowTime - ~~(this.state.nowTime / 3600) * 3600 - ~~(this.state.nowTime / 60) * 60) + ' 秒 '
            }
            </p>
            <p>当前选手: {this.state.ai === true ? ' ai ' : ' 玩家 '} {this.state.nowColor === 'white' ? '白棋' : '黑棋'}</p>
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
                if (checkerboard[0] < 15 && checkerboard[1] < 15) {
                  return (
                    <div className="gb-item" key={'x' + checkerboard[0] + 'y' + checkerboard[1]}></div>
                  )
                }
              })
            }
          </div>
          {/* 此处是真正的棋盘 根据二维数组生成数据*/}
          <div className="g-box">
            {
              this.state.checkerboards.map((checkerboard, index) => {
                return (
                  <Chess
                    handel={this.chesspieces}
                    z={checkerboard[2]}
                    index={index} key={'x' + checkerboard[0] + 'y' + checkerboard[1]} />
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
    this.props.handel(this.props.index)
  }
  render() {
    return (
      <div
        onClick={this.choose}
        className={this.props.z === 0 ? 'g-item' : this.props.z === 1 ? 'black g-item' : 'white g-item'}>
      </div>
    )
  }
}

Chess.propTypes = {
  handel: React.PropTypes.func,
  index: React.PropTypes.number,
  z: React.PropTypes.number
}
export default Home
