import React from 'react';
import styles from './DocBanner.module.css';

export default function DocBanner(): React.JSX.Element {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerContent}>
        <span className={styles.bannerBadge}>Anemir Platform</span>
        <h2 className={styles.bannerTitle}>Anime Artist Platform</h2>
        <p className={styles.bannerSubtitle}>
          Social + Marketplace + Subscriptions + IoT Device Integration
        </p>
      </div>
    </div>
  );
}
