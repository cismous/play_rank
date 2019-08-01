import 'animate.css/animate.min.css'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { List } from './pages/list/list'

const rootEl = document.getElementById('root')

const APP = (): JSX.Element => <List></List>

ReactDOM.render(APP(), rootEl)
