import React from 'react';
// Importing the original mapper + our components according to the Docusaurus doc
import MDXComponents from '@theme-original/MDXComponents';
import Button from '@site/src/components/Button';

function MyComponent() {
    const [bool, setBool] = useState(false);
    return (
      <div>
        <p>MyComponent rendered !</p>
        <p>bool={bool ? 'true' : 'false'}</p>
        <p>
          <button onClick={() => setBool((b) => !b)}>toggle bool</button>
        </p>
      </div>
    );
  }

export default {
  // Reusing the default mapping
  ...MDXComponents,
  Button,
};


