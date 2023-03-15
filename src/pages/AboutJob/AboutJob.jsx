import Navbar from "../../components/Navbar/Navbar";
import styles from "./AboutJob.module.css";
import { useEffect, useState } from "react";
import { getJobPost } from "../../api/jobsAPI";
import TimeAgo from "timeago-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AboutJob() {
    const jobId = window.location.href.split("/")[4];

    const [selectedJobPost, setSelectedJobPost] = useState({
        companyName: "",
        companyLogo: "",
        jobPosition: "",
        monthlySalary: "",
        jobType: "",
        jobMode: "",
        jobLocation: "",
        jobDescription: "",
        aboutCompany: "",
        skillset: "",
    });

    async function getJobDetails() {
        const foundJobData = await getJobPost(jobId);
        if (foundJobData) {
            setSelectedJobPost(foundJobData);
        }
    }

    useEffect(() => {
        getJobDetails();
    }, [jobId]);

    let url = window.location.href;

    function handleCopyLink() {
        navigator.clipboard.writeText(url);
        toastAlert();
    }

    function toastAlert() {
        toast("Copied!", {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    }

    return (
        <div className={styles.appWrapper}>
            <Navbar />
            <ToastContainer />
            <div className={styles.pageWrapper}>
                {selectedJobPost ? (
                    <div className={styles.aboutJob}>
                        <div className={styles.aboutPageTop}>
                            <div className={styles.companyCard}>
                                <div className={styles.cardLeft}>
                                    <div className={styles.companyLogo}>
                                        <img
                                            src={selectedJobPost.companyLogo}
                                            alt=""
                                            className={styles.companyLogoImg}
                                        />
                                    </div>
                                </div>
                                <div className={styles.cardRight}>
                                    <div className={styles.rightTop}>
                                        <span className={styles.jobTitle}>
                                            {selectedJobPost.jobPosition}
                                        </span>
                                    </div>
                                    <div className={styles.rightMiddle}>
                                        <div className={styles.companyName}>
                                            {selectedJobPost.companyName} |
                                        </div>
                                        <div className={styles.companyLocation}>
                                            {selectedJobPost.jobLocation}
                                        </div>
                                    </div>
                                    <div className={styles.rightBottom}>
                                        <div className={styles.postedTime}>
                                            Posted{" "}
                                            <TimeAgo
                                                datetime={
                                                    selectedJobPost.createdAt
                                                }
                                                locale="en_US"
                                            />
                                        </div>
                                        <button
                                            className={styles.copyLink}
                                            onClick={handleCopyLink}
                                        >
                                            Copy Link
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.aboutPageMiddle}>
                            <div className={styles.aboutJobWrapper}>
                                <div className={styles.aboutJobTop}>
                                    Job Offer
                                </div>
                                <div className={styles.aboutJobBottom}>
                                    {selectedJobPost.monthlySalary} per month
                                </div>
                            </div>
                            <div className={styles.aboutJobWrapper}>
                                <div className={styles.aboutJobTop}>
                                    Job Mode
                                </div>
                                <div className={styles.aboutJobBottom}>
                                    {selectedJobPost.jobMode}
                                </div>
                            </div>
                            <div className={styles.aboutJobWrapper}>
                                <div className={styles.aboutJobTop}>
                                    Office/Remote
                                </div>
                                <div className={styles.aboutJobBottom}>
                                    {selectedJobPost.jobType}
                                </div>
                            </div>
                            <div className={styles.aboutJobWrapper}>
                                <div className={styles.aboutJobTop}>
                                    Location
                                </div>
                                <div className={styles.aboutJobBottom}>
                                    {selectedJobPost.jobLocation}
                                </div>
                            </div>
                        </div>
                        <div className={styles.aboutPageBottom}>
                            <div className={styles.bottomLeft}>
                                <div className={styles.headline}>About Job</div>
                                <p className={styles.description}>
                                    {selectedJobPost.jobDescription}
                                </p>
                                <div className={styles.headline}>
                                    About Company
                                </div>
                                <p className={styles.description}>
                                    {selectedJobPost.aboutCompany}
                                </p>
                            </div>
                            <div className={styles.skillsBottomRight}>
                                <div className={styles.skillsBox}>
                                    <span className={styles.skillsBoxHeadline}>
                                        Skills Mandatory
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        {" "}
                        <p> No job post found </p>{" "}
                    </div>
                )}
            </div>
        </div>
    );
}
