import style from './main.scss'

import example from './js/example.js'
import widget1 from './js/widget1.js'

example();
widget1();


if (module.hot) {
  module.hot.accept()
}
