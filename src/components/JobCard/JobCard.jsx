import { useEffect, useState } from "react";
import styles from "./JobCard.module.css";
import TimeAgo from "timeago-react";
import { useNavigate } from "react-router-dom";
import EditJob from "../EditJob/EditJob.jsx";

export default function JobCard({ job, handleJobPostUpdated, toastAlert }) {
    const [showEditJobModal, setShowEditJobModal] = useState(false);

    // getting the complete URL href
    let url = window.location.href;
    let copylink = url + `job/${job._id}`;

    useEffect(() => {}, [job]);

    function handleCopyLink() {
        navigator.clipboard.writeText(copylink);
        toastAlert();
    }

    const navigate = useNavigate();

    function handleSelectJobPost() {
        navigate(`/job/${job._id}`);
    }

    return (
        <>
            <div className={styles.jobCard}>
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
                    <div
                        className={styles.rightTop}
                        onClick={handleSelectJobPost}
                    >
                        <span className={styles.jobTitle}>
                            {job.jobPosition}
                        </span>
                        <div className={styles.postedTime}>
                            <TimeAgo datetime={job.createdAt} locale="en_US" />
                        </div>
                    </div>
                    <div className={styles.rightMiddle}>
                        <div className={styles.numberOfEmployees}>
                            <span className={styles.employeeCountIcon}></span>
                            <span>{job.employeeCount}</span>
                        </div>
                        <div className={styles.salary}>
                            <span className={styles.salaryIcon}></span>
                            <span>{job.monthlySalary}</span>
                        </div>
                        <div className={styles.location}>
                            <span className={styles.locationIcon}></span>
                            <span>{job.jobLocation}</span>
                        </div>
                    </div>
                    <div className={styles.rightBottom}>
                        <div className={styles.jobMode}>{job.jobMode}</div>
                        <div className={styles.contractType}>{job.jobType}</div>
                        {showEditJobModal && (
                            <EditJob
                                job={job}
                                show={showEditJobModal}
                                onClose={setShowEditJobModal}
                                handleJobPostUpdated={handleJobPostUpdated}
                            />
                        )}
                        <button
                            className={styles.editJob}
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowEditJobModal(true);
                            }}
                        >
                            Edit Job
                        </button>
                        <button
                            className={styles.copyLink}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCopyLink();
                            }}
                        >
                            Copy Link
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
