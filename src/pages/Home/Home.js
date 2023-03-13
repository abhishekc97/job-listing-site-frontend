import { useEffect, useRef, useState } from "react";
import styles from "./Home.module.css";
import JobCard from "../../components/JobCard/JobCard";
import AddJob from "../../components/AddJob/AddJob";
import Navbar from "../../components/Navbar/Navbar";
import { getAllJobPosts } from "../../api/jobsAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
    const search = useRef();
    const [jobs, setJobs] = useState([]);
    const [showAddJobModal, setShowAddJobModal] = useState(false);
    let totalJobs = jobs.length;

    async function fetchAllJobPosts() {
        let jobsArray = [];
        jobsArray = await getAllJobPosts();
        setJobs([...jobsArray]);
        totalJobs = jobs.length;
        console.log(jobsArray);
    }

    useEffect(() => {
        console.log(jobs);
        console.log(jobs.length);
    }, [jobs]);

    useEffect(() => {
        fetchAllJobPosts();
    }, []);

    // re-fetch all job posts after new one is made
    async function handleJobPostAdded() {
        fetchAllJobPosts();
        console.log("inside job post added");
    }

    async function handleJobPostUpdated() {
        fetchAllJobPosts();
        console.log(jobs);
    }

    function toastAlert() {
        toast("Copied!", {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    }

    return (
        <div className={styles.appWrapper}>
            <Navbar />

            <div className={styles.pageWrapper}>
                <div className={styles.home}>
                    <div className={styles.homeTop}>
                        <div className={styles.search}>
                            <div className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Job, title or keyword"
                                ref={search}
                                className={styles.searchInput}
                            />
                        </div>
                        <button
                            className={styles.addJobbutton}
                            onClick={() => setShowAddJobModal(true)}
                        >
                            + Add Job
                        </button>
                        {showAddJobModal && (
                            <AddJob
                                show={showAddJobModal}
                                onClose={() => setShowAddJobModal(false)}
                                handleJobPostAdded={handleJobPostAdded}
                            />
                        )}
                    </div>
                    <div className={styles.homeMiddle}>
                        <span className={styles.middleText}>
                            Jobs you have posted as a recruiter are listed below
                        </span>
                        <div className={styles.skillsFilterBox}>
                            <select
                                name="skills"
                                id="skills"
                                className={styles.skillsSelectDropdown}
                                defaultValue="default"
                            >
                                <option value="default" disabled>
                                    Skills
                                </option>
                                <option value="xyz">xyz</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.homeBottom}>
                        <div className={styles.totalJobs}>
                            {totalJobs}+ jobs
                        </div>
                        <div className={styles.listings}>
                            {/* <JobCard /> */}
                            {jobs.length !== 0 &&
                                jobs.map((job) => (
                                    <JobCard
                                        key={job._id}
                                        job={job}
                                        handleJobPostUpdated={
                                            handleJobPostUpdated
                                        }
                                        toastAlert={toastAlert}
                                    />
                                ))}
                            <ToastContainer />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
