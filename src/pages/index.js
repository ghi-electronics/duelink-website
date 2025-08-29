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
        <b>D</b>ynamic <b>U</b>niversal <b>E</b>xtensible <b>Link</b>
        </Heading>
        <p> DUELink brings hundreds of sensors, actuators, and displays to streamline electronics for Engineers, Makers, and Educators. Each module is a mini-computer with a <b>D</b>ynamic <b>U</b>niversal <b>E</b>xtencible Daisy<b>Link</b> to your favorite Hardware and Software!
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
