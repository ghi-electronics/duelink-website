import React from 'react';
import Layout from '@theme/Layout';
import packageJson from '../../package.json';

function Version() {
  return (
    <Layout
      title="Version"
      description="Build version">
      <main style={{padding: '2rem'}}>
        <div className="container">
          <h1>Version</h1>
          <p style={{fontSize: '1.5rem', fontFamily: 'monospace'}}>
            {packageJson.version}
          </p>
        </div>
      </main>
    </Layout>
  );
}

export default Version;