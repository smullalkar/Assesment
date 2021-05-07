import { Spin } from 'antd';
import styles from './loader.module.css'

export default function Loader() {
    return (
        <Spin className={styles.centered} size="large" />
    );
}