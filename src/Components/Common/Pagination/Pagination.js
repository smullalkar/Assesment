import { Pagination } from 'antd';
import styles from './Pagination.module.css'

export default function Pages({currentPage, totalPages, pageChange}) {
    return (
        <div className={styles.pagination}>
            <Pagination current={currentPage} onChange={pageChange} total={totalPages} />
        </div>
    )
}
