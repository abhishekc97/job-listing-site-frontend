import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import JobCard from "../../components/JobCard/JobCard";
import AddJob from "../../components/AddJob/AddJob";
import Navbar from "../../components/Navbar/Navbar";
import { getAllJobPosts } from "../../api/jobsAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
    const [searchValue, setSearchValue] = useState("");
    const [jobs, setJobs] = useState([]);
    const [showAddJobModal, setShowAddJobModal] = useState(false);
    let totalJobs = jobs.length;

    async function fetchAllJobPosts() {
        let jobsArray = [];
        jobsArray = await getAllJobPosts();
        setJobs([...jobsArray]);
        totalJobs = jobs.length;
    }

    useEffect(() => {}, [jobs]);

    useEffect(() => {
        fetchAllJobPosts();
    }, []);

    // re-fetch all job posts after new one is made
    async function handleJobPostAdded() {
        fetchAllJobPosts();
    }

    async function handleJobPostUpdated() {
        fetchAllJobPosts();
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
                                placeholder="Search by job title..."
                                className={styles.searchInput}
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
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
                            {jobs.length !== 0 &&
                                jobs
                                    .filter((job) => {
                                        if (searchValue.length > 1) {
                                            const searchTerm =
                                                typeof searchValue ===
                                                    "string" &&
                                                searchValue.length > 1
                                                    ? searchValue.toLocaleLowerCase()
                                                    : "";
                                            const jobName =
                                                typeof job.jobPosition ===
                                                "string"
                                                    ? job.jobPosition.toLocaleLowerCase()
                                                    : "";
                                            return searchTerm &&
                                                typeof jobName === "string"
                                                ? jobName.includes(searchTerm)
                                                : "";
                                        } else return job;
                                    })
                                    .map((job) => (
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
