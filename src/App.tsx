import React from 'react';
import Button , { ButtonSize, ButtonType }from './components/Button/button';

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
      </header>
    </div>
  );
};

export default App;
