import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
         <p>
        <img src="/img/duelink-intro.png" alt="DUELink" />
        <br/>
   
        </p>


       <Heading as="h2" >
        Dynamic Universal Extensible Link
        </Heading>
        <p> DUELink revolutionizes electronics innovating with a vast ecosystem of sensor, actuator, and display modules.
        <br/>  
        Each module is a mini-computer, equipped with a smart daisy-link that seamlessly connects to your favorite Hardware platform and Coding Language.
        </p>

         <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/what-is">
            What is DUELink?
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`DUELink`}
      description="Dynamic, Universal, and Extensible Link.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
  
       <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            
            to="/docs/intro">
            It is all about the docs!
          </Link>
        </div>
        <p> </p>
    </Layout>
  );
}
