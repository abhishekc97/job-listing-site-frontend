import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import JobCard from "../../components/JobCard/JobCard";
import AddJob from "../../components/AddJob/AddJob";
import Navbar from "../../components/Navbar/Navbar";
import { getAllJobPosts } from "../../api/jobsAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Multiselect from "multiselect-react-dropdown";

export default function Home() {
    const [searchValue, setSearchValue] = useState("");
    const [jobs, setJobs] = useState([]);
    const [showAddJobModal, setShowAddJobModal] = useState(false);
    let totalJobs = jobs.length;
    const skillOptionList = [
        { id: 1, name: "HTML" },
        { id: 2, name: "SQL" },
        { id: 3, name: "Python" },
        { id: 4, name: "Mongo" },
        { id: 5, name: "JS" },
    ];
    // const [skillOptions, setSkillOptions] = useState(skillOptionList); no need

    const [selectedSkills, setSelectedSkills] = useState([]);

    function onSelectSkills(skill) {
        const skillname = Object.entries(skill);
        setSelectedSkills(skillname);
    }

    function onRemoveSkills(skill) {
        const skillname = Object.entries(skill);
        setSelectedSkills(skillname);
    }

    const [selectedSkillsArr, setSelectedSkillsArr] = useState([]);

    useEffect(() => {
        // console.log("as it is", selectedSkills);
        let arr = [];
        selectedSkills?.map((obj) => {
            let value = obj[1].name;
            arr.push(value);
            console.log(arr);
        });
        setSelectedSkillsArr(arr);
    }, [selectedSkills]);
    // console.log(selectedSkillsArr.length);
    // console.log(jobs);

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

    const handleSkillsChange = (e) => {
        setSelectedSkills(
            Array.from(e.target.selectedOptions, (option) => option.value)
        );
    };

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
                            <Multiselect
                                placeholder="Select any skills"
                                options={skillOptionList}
                                displayValue="name"
                                onSelect={onSelectSkills}
                                onRemove={onRemoveSkills}
                            />
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
                                    .filter((job) => {
                                        // Filter by skillset
                                        if (selectedSkillsArr.length > 0) {
                                            const skillsetArr =
                                                job.skillset.map((skill) =>
                                                    skill.toLowerCase()
                                                );
                                            for (
                                                let i = 0;
                                                i < selectedSkillsArr.length;
                                                i++
                                            ) {
                                                const selectedSkill =
                                                    selectedSkillsArr[
                                                        i
                                                    ].toLowerCase();
                                                if (
                                                    !skillsetArr.includes(
                                                        selectedSkill
                                                    )
                                                ) {
                                                    return false;
                                                }
                                            }
                                        }
                                        return true;
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
