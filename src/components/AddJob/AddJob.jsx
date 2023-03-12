import styles from "./AddJob.module.css";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { getJobPost, createJobPost } from "../../api/jobsAPI";

export default function AddJob({ show, onClose, onJobPostAdded }) {
    // const [jobData, setJobData] = useState();

    const [values, setValues] = useState({
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

    async function handleSubmit(event) {
        event.preventDefault();
        console.log(values);
        // api call to save
        await createJobPost(values).then(console.log("done"));
        onClose();
    }

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    useEffect(() => {
        console.log(values);
    }, [values]);

    return (
        <Modal
            show={show}
            onHide={onClose}
            keyboard={false}
            className={styles.addJobModal}
            dialogClassName={styles.myModalDialog}
            contentClassName={styles.myModalContent}
        >
            <div className={styles.addJob}>
                <div className={styles.headline}>FindMyJobs</div>
                <div className={styles.formDescription}>
                    Add job description
                </div>
                <div className={styles.horizontalRow}>
                    <div className={styles.blueHorizontalRow}></div>
                </div>
                <form className={styles.jobDescForm} onSubmit={handleSubmit}>
                    <div className={styles.formRow}>
                        <label htmlFor="" className={styles.formLabel}>
                            Company Name
                        </label>
                        <input
                            type="text"
                            name="companyName"
                            className={styles.formInput}
                            placeholder="Enter your company name here"
                            onChange={onChange}
                        />
                    </div>
                    <div className={styles.formRow}>
                        <label htmlFor="" className={styles.formLabel}>
                            Add logo URL
                        </label>
                        <input
                            type="text"
                            name="companyLogo"
                            className={styles.formInput}
                            placeholder="Enter the link"
                            onChange={onChange}
                        />
                    </div>
                    <div className={styles.formRow}>
                        <label htmlFor="" className={styles.formLabel}>
                            Job position
                        </label>
                        <input
                            type="text"
                            name="jobPosition"
                            className={styles.formInput}
                            placeholder="Enter job position"
                            onChange={onChange}
                        />
                    </div>
                    <div className={styles.formRow}>
                        <label htmlFor="" className={styles.formLabel}>
                            Monthly salary
                        </label>
                        <input
                            type="text"
                            name="monthlySalary"
                            className={styles.formInput}
                            placeholder="Enter Amount in rupees"
                            onChange={onChange}
                        />
                    </div>
                    <div className={styles.formRow}>
                        <label htmlFor="" className={styles.formLabel}>
                            Job Type
                        </label>
                        <select
                            name="jobType"
                            className={styles.formSelect}
                            onChange={onChange}
                            defaultValue="default"
                        >
                            <option value="default" disabled>
                                Select
                            </option>
                            <option value="Part Time">Part Time</option>
                            <option value="Full Time">Full Time</option>
                            <option value="Contract">Contract</option>
                        </select>
                    </div>
                    <div className={styles.formRow}>
                        <label htmlFor="" className={styles.formLabel}>
                            Remote/Office
                        </label>
                        <select
                            name="jobMode"
                            className={styles.formSelect}
                            onChange={onChange}
                            defaultValue="default"
                        >
                            <option value="default" disabled>
                                Select
                            </option>
                            <option value="Remote">Remote</option>
                            <option value="In-Office">In-Office</option>
                        </select>
                    </div>
                    <div className={styles.formRow}>
                        <label htmlFor="" className={styles.formLabel}>
                            Location
                        </label>
                        <input
                            type="text"
                            name="jobLocation"
                            className={styles.formInput}
                            placeholder="Enter Location"
                            onChange={onChange}
                        />
                    </div>
                    <div className={styles.formRow}>
                        <label htmlFor="" className={styles.formLabel}>
                            Job Description
                        </label>
                        <input
                            type="text"
                            name="jobDescription"
                            className={styles.formInput}
                            placeholder="Type the job description"
                            onChange={onChange}
                        />
                    </div>
                    <div className={styles.formRow}>
                        <label htmlFor="" className={styles.formLabel}>
                            About Company
                        </label>
                        <input
                            type="text"
                            name="aboutCompany"
                            className={styles.formInput}
                            placeholder="Type about your company"
                            onChange={onChange}
                        />
                    </div>
                    <div className={styles.formRow}>
                        <label htmlFor="" className={styles.formLabel}>
                            Skills Required
                        </label>
                        <input
                            type="text"
                            name="skillset"
                            className={styles.formInput}
                            placeholder="Enter the must have skills"
                            onChange={onChange}
                        />
                    </div>
                    <div className={styles.formBottomRow}>
                        <button
                            onClick={onClose}
                            className={styles.closeButton}
                        >
                            Cancel
                        </button>
                        <button type="submit" className={styles.submitButton}>
                            + Add Job
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
