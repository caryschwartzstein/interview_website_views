import React from "react";
import styles from "./Chart.module.css";

// TODO: Implement
export const ChartHeader = ({ text }) => {
    return (
        <div className={styles.header__label}>
            <div className={styles.header__text}>{text}</div>
        </div>
    )
};
