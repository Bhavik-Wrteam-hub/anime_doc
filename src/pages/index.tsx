import React, {useRef} from 'react';
import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import DocBanner from '@site/src/components/DocBanner/DocBanner';
import FloatingIcons from '@site/src/components/FloatingIcons/FloatingIcons';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const heroRef = useRef<HTMLElement>(null);

  return (
    <header ref={heroRef} className={clsx(styles.heroBanner)}>
      <FloatingIcons containerRef={heroRef} />
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroLogo}>
            <img src="img/logo.svg" alt="Anemir" width="80" height="80" />
          </div>
          <h1 className={styles.heroTitle}>
            {siteConfig.title}
          </h1>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className="button button--primary button--lg"
              to="/docs/intro">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} — Documentation`}
      description="Anime Artist Platform — Social + Marketplace + Subscriptions + IoT">
      <HomepageHeader />
      <main>
        <div className="container" style={{marginTop: '2rem'}}>
          <DocBanner />
        </div>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
