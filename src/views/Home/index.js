import React from 'react'

// 导入css
import './index.scss'

// 容器组件
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      language: 'china',
      index: Math.round((Math.random() * 3 + 1)),
      hasName: false,
      name: '',
      config: {
        question: '你好，你的名字是？'
      }
    }
    this.changeLanguage = this.changeLanguage.bind(this)
    this.setConfig = this.setConfig.bind(this)
    this.subName = this.subName.bind(this)
    this.saveLanguage = this.saveLanguage.bind(this)
    this.saveName = this.saveName.bind(this)
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
        config: {
          question: '你好，你的名字是？'
        }
      })
    } else if (this.state.language === 'english') {
      this.setState({
        config: {
          question: 'Hello, what\'s you name?'
        }
      })
    } else {
      this.setState({
        config: {
          question: 'こんにちは、あなたの名前は？'
        }
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
    // 渲染dom调用
  }
  render() {
    var bgStyle = {
      backgroundImage: 'url(http://ojp9lt0ng.bkt.clouddn.com/bg' + this.state.index + '.jpg)'
    }
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
      </div>
    )
  }
}

export default Home
