import * as React from 'react'
import AppLayout from './views/layout'
import 'antd/dist/antd.css' // globally import css

class App extends React.Component<{}, {}> {

  render() {
    return (
      <div>
        <AppLayout />
      </div>
    );
  }
}

export default App

