import { useEffect, useState } from "react";
import styles from "./JobCard.module.css";
import { Link, useSearchParams } from "react-router-dom";
import EditJob from "../EditJob/EditJob.jsx";

export default function JobCard({ job }) {
    const [showEditJobModal, setShowEditJobModal] = useState(false);

    const [jobData, setJobData] = useState();

    useEffect(() => {
        setJobData(job);
        console.log(jobData, job);
    }, [job]);

    return (
        <div className={styles.jobCard}>
            {/* <Link to={`/job/:${job.id}`}> */}
            <div className={styles.cardLeft}>
                <div className={styles.companyLogo}>
                    <img
                        className={styles.companyLogo}
                        src={job.companyLogo}
                        alt=""
                    />
                </div>
            </div>
            <div className={styles.cardRight}>
                <div className={styles.rightTop}>
                    <span className={styles.jobTitle}>{job.jobPosition}</span>
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
                    {showEditJobModal && (
                        <EditJob
                            job={job}
                            show={showEditJobModal}
                            onClose={setShowEditJobModal}
                        />
                    )}
                    <button
                        className={styles.editJob}
                        onClick={() => setShowEditJobModal(true)}
                    >
                        Edit Job
                    </button>
                    <button className={styles.copyLink}>Copy Link</button>
                </div>
            </div>
            {/* </Link> */}
        </div>
    );
}
