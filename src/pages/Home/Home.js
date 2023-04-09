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
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    let totalJobs = filteredJobs.length;

    const skillOptionList = [
        { id: 1, name: "HTML" },
        { id: 2, name: "SQL" },
        { id: 3, name: "Python" },
        { id: 4, name: "Mongo" },
        { id: 5, name: "JS" },
    ];

    // Fetch the list of jobs using API
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

    useEffect(() => {
        setFilteredJobs(jobs);
    }, [jobs]);

    // re-fetch all job posts after new one is made
    async function handleJobPostAdded() {
        fetchAllJobPosts();
    }

    async function handleJobPostUpdated() {
        fetchAllJobPosts();
    }

    function onSelectSkills(skill) {
        const skillname = Object.entries(skill);
        setSelectedSkills(skillname);
    }

    function onRemoveSkills(skill) {
        const skillname = Object.entries(skill);
        setSelectedSkills(skillname);
    }

    useEffect(() => {
        handleSkillsChange();
    }, [selectedSkills]);

    // All Logic to handle skills filter change
    const [selectedSkillsArr, setSelectedSkillsArr] = useState([]);

    // additional logic to get names of individual selected filters
    function handleSkillsChange() {
        let arr = [];
        selectedSkills?.map((obj) => {
            let value = obj[1].name;
            arr.push(value);
            return true;
        });
        setSelectedSkillsArr(arr);
    }

    // function  to apply skills filter
    function applySkillsFilter() {
        let skillsFilteredArr = [];
        skillsFilteredArr = jobs.filter((job) => {
            // Filter by skillset
            if (selectedSkillsArr.length > 0) {
                const skillsetArr = job.skillset.map((skill) =>
                    skill.toLowerCase()
                );
                for (let i = 0; i < selectedSkillsArr.length; i++) {
                    const selectedSkill = selectedSkillsArr[i].toLowerCase();
                    if (!skillsetArr.includes(selectedSkill)) {
                        return false;
                    }
                }
            }
            return true;
        });
        setFilteredJobs(skillsFilteredArr);
    }

    useEffect(() => {
        applySkillsFilter();
    }, [selectedSkillsArr]);

    function toastAlert() {
        toast("Copied!", {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    }

    // custom style for the skills filter box
    const customSkillBoxStyles = {
        multiselectContainer: {
            width: "500px",
            display: "flex",
            position: "relative",
        },
        searchWrapper: {
            border: "2px solid #CECECE",
            position: "relative",
            display: "flex",
            flexDirection: "row-reverse",
            padding: "5px",
            "justify-content": "center",
        },
        "search-wrapper": {
            border: "2px solid #CECECE",
            position: "relative",
            display: "flex",
            "flex-direction": "row-reverse",
            padding: "5px",
            "justify-content": "center",
        },
        input: {
            border: "2px solid #CECECE",
        },
        searchBox: {
            border: "2px solid #CECECE",
            fontSize: "19px",
            minHeight: "50px",
        },
        inputField: {
            margin: "5px",
        },
        chip: {
            background: "#0038FF",
            "line-height": "19px",
        },
        optionListContainer: {
            position: "absolute",
            top: "50px",
        },
        optionContainer: {
            border: "2px solid",
            background: "#FFF",
            position: "absolute",
            top: "50px",
        },
        option: {
            color: "#000",
        },
    };

    return (
        <div className={styles.homeWrapper}>
            <Navbar />
            <ToastContainer />
            <div className={styles.homePageWrapper}>
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
                                showCheckbox
                                style={customSkillBoxStyles}
                            />
                        </div>
                    </div>
                    <div className={styles.homeBottom}>
                        <div className={styles.totalJobs}>
                            {totalJobs}+ jobs
                        </div>
                        <div className={styles.listings}>
                            {filteredJobs.length !== 0 &&
                                filteredJobs
                                    .filter((job) => {
                                        // Filter by the search term
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
