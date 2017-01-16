import React from 'react'

// 导入css
import './index.scss'

// 容器组件
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      language: 'china',
      index: Math.round((Math.random() * 5 + 1)),
      hasName: false,
      time: '',
      hour: '',
      name: '',
      config: {
        question: '你好，你的名字是？',
        greet1: '上午好',
        greet2: '下午好',
        greet3: '晚上好'
      },
      config1: {
        question: '你好，你的名字是？',
        greet1: '早上好',
        greet2: '中午好',
        greet3: '晚上好'
      },
      config2: {
        question: 'Hello, what\'s you name?',
        greet1: 'Good morning',
        greet2: 'Good aftertoon',
        greet3: 'Good evening'
      },
      config3: {
        question: 'こんにちは、あなたの名前は？',
        greet: '',
        greet1: 'おはよう',
        greet2: 'こんにちは',
        greet3: 'こんばんは'
      }
    }
    this.set = ''
    this.changeLanguage = this.changeLanguage.bind(this)
    this.setConfig = this.setConfig.bind(this)
    this.subName = this.subName.bind(this)
    this.saveLanguage = this.saveLanguage.bind(this)
    this.saveName = this.saveName.bind(this)
    this.start = this.start.bind(this)
  }
  // 开始计时
  start() {
    var times = () => {
      var date = new Date()
      var hour = date.getHours()
      date = date.toString()
      this.setState({
        time: date.substring(16, 25),
        hour: hour
      })
    }
    times()
    // 开始计时
    this.set = setInterval(() => {
      times()
    }, 1000)
  }
  // 改变语言
  changeLanguage() {
    var language = this.state.language
    language = language === 'china' ? 'english' : language === 'english' ? 'japan' : 'china'
    this.setState({
      language: language
    }, () => {
      // 根据语言改变配置
      this.setConfig()
      // 同时保存语言到本地
      this.saveLanguage()
    })
  }
  // 改变配置
  setConfig() {
    if (this.state.language === 'china') {
      this.setState({
        config: this.state.config1
      })
    } else if (this.state.language === 'english') {
      this.setState({
        config: this.state.config2
      })
    } else {
      this.setState({
        config: this.state.config3
      })
    }
  }
  // 提交姓名
  subName(e) {
    if (e.target.value.length > 0 && e.keyCode === 13) {
      this.setState({
        name: e.target.value,
        hasName: true
      }, () => {
        // 保存名字
        this.saveName()
        this.start()
      })
    }
  }
  // 保存语言
  saveLanguage() {
    window.localStorage.setItem('language', this.state.language)
  }

  // 保存名字
  saveName() {
    window.localStorage.setItem('name', this.state.name)
  }
  componentDidMount() {
    // 读取本地文件渲染
    var language = window.localStorage.getItem('language', language)
    if (language) {
      this.setState({
        language: language
      }, () => {
        this.setConfig()
      })
    }
    // 看看是否输入了名字
    var name = window.localStorage.getItem('name', name)
    if (name) {
      this.setState({
        hasName: true,
        name: name
      }, () => {
        this.start()
      })
    }
  }
  render() {
    var bgStyle = {
      backgroundImage: 'url(http://ojp9lt0ng.bkt.clouddn.com/bg' + this.state.index + '.jpg)'
    }
    var now = (() => {
      var hour = this.state.hour
      if (hour > 18 || hour < 6) {
        return 'greet3'
      } else if (hour > 6 && hour < 12) {
        return 'greet1'
      } else {
        return 'greet2'
      }
    })()
    return (
      <div className="dashboard">
        <a href="https://github.com/xyxiao001" className={this.state.hasName === false ? 'logo' : 'hide'} target="_blank">
          <img src="http://ofyaji162.bkt.clouddn.com/touxiang.jpg" />
        </a>
        <span className="language" onClick={this.changeLanguage}>
          {this.state.language === 'china' ? '中' : this.state.language === 'english' ? '英' : '日'}
        </span>
        <div className="d-shadow"></div>
        <div className="d-bg" style={bgStyle}></div>
        <div className={this.state.hasName === false ? 'prompt' : 'hide'}>
          <div className="d-question">
            <p>{this.state.config.question}</p>
            <input type="text" onKeyUp={this.subName} />
          </div>
        </div>
        <div className={this.state.hasName === true ? 'show-info' : 'hide'} >
          <div className="center">
            <p>{this.state.time}</p>
            <h2>{this.state.config[now]}, {this.state.name}</h2>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
