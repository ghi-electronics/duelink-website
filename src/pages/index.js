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

        <img src="/img/duelink-intro.png" alt="DUELink" />
  
   



       <Heading as="h2" >
        Daisylink Hundreds of Modules
        </Heading>
        <p> DUELink revolutionizes electronics innovation with a vast ecosystem of sensor, actuator, and display modules.
        <br/> 
        Each module is a mini-computer, powered by a smart daisylink that seamlessly integrates with your favorite hardware platform and coding language.
        </p>
         <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/what-is">
            What's DUELink?
          </Link>
           &nbsp; &nbsp;&nbsp;
          <Link
            className="button button--secondary button--lg"
            to="/docs/catalog/intro">
            Product Catalog
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
  
       
    </Layout>
  );
}
