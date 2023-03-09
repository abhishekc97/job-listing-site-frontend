import { useRef } from "react";
import styles from "./Home.module.css";
import JobCard from "../../components/JobCard/JobCard";

export default function Home() {
    const search = useRef();
    const totalJobs = 40;
    const jobs = [];

    return (
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
                <div className={styles.locationFilterBox}>
                    <div className={styles.locationIcon} />
                    <select
                        name="location"
                        id="location"
                        className={styles.locationDropdown}
                    >
                        <option value="xyz">xyz</option>
                    </select>
                </div>
                <button className={styles.addJobbutton}>+ Add Job</button>
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
                        placeholder="Skills"
                    >
                        <option value="xyz">xyz</option>
                    </select>
                </div>
            </div>
            <div className={styles.homeBottom}>
                <div className={styles.totalJobs}>{totalJobs}+ jobs</div>
                <div className={styles.listings}>
                    <JobCard />
                    <JobCard />
                    <JobCard />
                    <JobCard />
                    <JobCard />
                    <JobCard />
                    {/* {jobs && jobs.map((job) => <JobCard />)} */}
                </div>
            </div>
        </div>
    );
}
