import React from 'react';
import Button from '../components/Button'; // Button 컴포넌트를 import

const ButtonTestPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Button Test Page</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Primary Buttons</h2>
        <Button title="Primary Small" buttonType="primary" buttonSize="small" link="/primary-small" />
        <Button title="Primary Medium" buttonType="primary" buttonSize="medium" link="/primary-medium" />
        <Button title="Primary Large" buttonType="primary" buttonSize="large" link="/primary-large" />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Secondary Buttons</h2>
        <Button title="Secondary Small" buttonType="secondary" buttonSize="small" link="/secondary-small" />
        <Button title="Secondary Medium" buttonType="secondary" buttonSize="medium" link="/secondary-medium" />
        <Button title="Secondary Large" buttonType="secondary" buttonSize="large" link="/secondary-large" />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Danger Buttons</h2>
        <Button title="Danger Small" buttonType="danger" buttonSize="small" link="/danger-small" />
        <Button title="Danger Medium" buttonType="danger" buttonSize="medium" link="/danger-medium" />
        <Button title="Danger Large" buttonType="danger" buttonSize="large" link="/danger-large" />
      </div>
    </div>
  );
};

export default ButtonTestPage;
