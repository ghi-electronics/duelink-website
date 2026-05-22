import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

import ForumFeed from '@site/src/components/ForumFeed';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">

        <img src="/img/duelink-intro.webp"  alt="DUELink" />
  
       <Heading as="h3" >
        Smart electronic modules with built-in firmware—tether from your favorite host, run
standalone on the board, or chain many modules with Daisylink.
        </Heading>
        <p><strong>Hosts:</strong> Computer, Raspberry Pi, Arduino, micro:bit <br/> 
        <strong>Languages:</strong> Python, JavaScript, .NET, Scripts, MicroBlocks</p>
         <div className={styles.buttons}>
          <Link
            className="button button--secondary"
            to="/docs/what-is">
            What's DUELink?
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
      description="Smart Electronic Building Blocks.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
      <hr></hr>
      <ForumFeed />
    </Layout>
  );
}
