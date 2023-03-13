import styles from "./EditJob.module.css";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { getJobPost, editJobPost } from "../../api/jobsAPI";

export default function EditJob({ job, show, onClose, handleJobPostUpdated }) {
    console.log(job);
    useEffect(() => {
        console.log(job);
        console.log(values);
    }, []);

    let jobId = job._id;

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

    async function getJobDetails() {
        const foundJobData = await getJobPost(jobId);

        if (foundJobData) {
            // const res = await foundJobData.json();
            setValues(foundJobData);
        }
    }

    useEffect(() => {
        getJobDetails();
        console.log(values);
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        console.log(values);
        // api call to save
        await editJobPost(jobId, values).then(() => {
            handleJobPostUpdated();
            console.log("job updated");
        });
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
            className={styles.editJobModal}
            dialogClassName={styles.myModalDialog}
            contentClassName={styles.myModalContent}
        >
            <div className={styles.editJob}>
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
                            value={values.companyName}
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
                            value={values.companyLogo}
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
                            value={values.jobPosition}
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
                            value={values.monthlySalary}
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
                            value={values.jobType}
                            className={styles.formSelect}
                            onChange={onChange}
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
                            value={values.jobMode}
                            className={styles.formSelect}
                            onChange={onChange}
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
                            value={values.jobLocation}
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
                            value={values.jobDescription}
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
                            value={values.aboutCompany}
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
                            value={values.skillset}
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
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
