import React from 'react';
import Button , { ButtonSize, ButtonType }from './components/Button/button';
import Alert, { AlertType } from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Button className="customer">Small Default</Button>
        <Button size={ButtonSize.Small} btnType={ButtonType.Primary}>Small Primary</Button>
        <Button size={ButtonSize.Small} btnType={ButtonType.Danger}>Small Danger</Button>
        <Button size={ButtonSize.Small} btnType={ButtonType.Link} href="http://www.baidu.com" target="_blank">Small Link</Button>
        <br />
        <br />
        <Button size={ButtonSize.Large} btnType={ButtonType.Default}>Large Default</Button>
        <Button size={ButtonSize.Large} btnType={ButtonType.Primary}>Large Primary</Button>
        <Button size={ButtonSize.Large} btnType={ButtonType.Danger}>Large Danger</Button>
        <Button size={ButtonSize.Large} btnType={ButtonType.Link} href="www.baidu.com">Large Link</Button>
        <br />
        <br />
        <Button size={ButtonSize.Large} btnType={ButtonType.Default} disabled>disabled</Button>
        <Button size={ButtonSize.Large} btnType={ButtonType.Link} href="www.baidu.com" disabled>disabled Link</Button>
        <br />
        <br />
        <Alert message="test" description="description" type={AlertType.Success} closable></Alert>
        <br />
        <Alert message="test" description="description" type={AlertType.Info} closable closeTex="关闭"></Alert>
        <br />
        <Alert message="test" description="description" type={AlertType.Warn}></Alert>
        <br />
        <Alert closable message="test11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111" description="description111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111" type={AlertType.Error}></Alert>
        <br />
        <br />
        <Menu mode="vertical">
          <MenuItem index={1} disabled>1111</MenuItem>
          <MenuItem index={2}>2222</MenuItem>
          <MenuItem index={3}>3333</MenuItem>
        </Menu>
      </header>
    </div>
  );
};

export default App;
