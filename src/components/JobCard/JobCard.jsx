import styles from "./JobCard.module.css";

export default function JobCard() {
    return (
        <div className={styles.jobCard}>
            <div className={styles.cardLeft}>
                <div className={styles.companyLogo}>
                    <img src="" alt="" />
                </div>
            </div>
            <div className={styles.cardRight}>
                <div className={styles.rightTop}>
                    <span className={styles.jobTitle}>Frontend developer</span>
                    <div className={styles.postedTime}>2 hours ago</div>
                </div>
                <div className={styles.rightMiddle}>
                    <div className={styles.numberOfEmployees}>11-50</div>
                    <div className={styles.salary}>50000</div>
                    <div className={styles.location}>Mumbai</div>
                </div>
                <div className={styles.rightBottom}>
                    <div className={styles.jobMode}>Remote</div>
                    <div className={styles.contractType}>Full time</div>
                    <button className={styles.editJob}>Edit Job</button>
                    <button className={styles.copyLink}>Copy Link</button>
                </div>
            </div>
        </div>
    );
}
