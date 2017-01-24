import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import Home from 'views/Home'
import Gobang from 'views/Gobang'

render((
  // browserHistory 正常的history路由
  // hash hashHistory
  <Router history={browserHistory}>
    <Route path='/' component={Home} />
    <Route path='/gobang' component={Gobang} />
    <Route path='*' component={Home} />
  </Router>
), document.getElementById('app'))
