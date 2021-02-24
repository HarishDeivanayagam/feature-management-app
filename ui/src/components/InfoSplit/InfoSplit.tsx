import React from 'react';
import styles from './InfoSplit.module.css';

const InfoSplit = (props: any) => {
  return (
    <div className={styles.splitContainer}>
      <div className={styles.leftContainer}></div>
      <div>{props.children}</div>
    </div>
  );
};

export default InfoSplit;
