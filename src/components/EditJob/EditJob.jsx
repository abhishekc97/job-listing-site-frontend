import styles from "./EditJob.module.css";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { getJobPost, editJobPost } from "../../api/jobsAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditJob({ job, show, onClose, handleJobPostUpdated }) {
    useEffect(() => {}, []);

    let jobId = job._id;

    const [values, setValues] = useState({
        companyName: "",
        companyLogo: "",
        jobPosition: "",
        monthlySalary: 0,
        jobType: "",
        jobMode: "",
        jobLocation: "",
        jobDescription: "",
        aboutCompany: "",
        skillset: [],
    });

    const [formErrors, setFormErrors] = useState({
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
            setValues(foundJobData);
        }
    }

    useEffect(() => {
        getJobDetails();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            // api call to save
            await editJobPost(jobId, values).then(() => {
                handleJobPostUpdated();
                toastAlert();
            });
            onClose();
        }
    }

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    useEffect(() => {}, [values]);
    function validateForm() {
        let isValid = true;
        const errors = {};

        if (!values.companyName.trim()) {
            errors.companyName = "Company name is required";
            isValid = false;
        }

        if (!values.jobPosition.trim()) {
            errors.jobPosition = "Job position is required";
            isValid = false;
        }

        if (!values.monthlySalary) {
            errors.monthlySalary = "Monthly salary is required";
            isValid = false;
        } else if (!/^\d+$/.test(values.monthlySalary)) {
            errors.monthlySalary = "Monthly salary should be a number";
            isValid = false;
        }

        if (values.jobType === "") {
            errors.jobType = "Please select job type";
            isValid = false;
        }

        if (values.jobMode === "") {
            errors.jobMode = "Please select remote or office";
            isValid = false;
        }

        if (!values.jobLocation.trim()) {
            errors.jobLocation = "Job location is required";
            isValid = false;
        }

        if (!values.jobDescription.trim()) {
            errors.jobDescription = "Job description is required";
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    }
    function toastAlert() {
        toast("Details updated!", {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    }

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
                    Edit job description
                </div>
                <div className={styles.horizontalRow}>
                    <div className={styles.blueHorizontalRow}></div>
                </div>
                <form className={styles.jobDescForm}>
                    <div className={styles.formRow}>
                        <label htmlFor="" className={styles.formLabel}>
                            Company Name <sup>*</sup>
                        </label>
                        <input
                            type="text"
                            name="companyName"
                            value={values.companyName}
                            className={styles.formInput}
                            placeholder="Enter your company name here"
                            onChange={onChange}
                        />
                        {formErrors.companyName && (
                            <span className={styles.formValidationError}>
                                {formErrors.companyName}
                            </span>
                        )}
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
                            Job position <sup>*</sup>
                        </label>
                        <input
                            type="text"
                            name="jobPosition"
                            value={values.jobPosition}
                            className={styles.formInput}
                            placeholder="Enter job position"
                            onChange={onChange}
                        />
                        {formErrors.jobPosition && (
                            <span className={styles.formValidationError}>
                                {formErrors.jobPosition}
                            </span>
                        )}
                    </div>
                    <div className={styles.formRow}>
                        <label htmlFor="" className={styles.formLabel}>
                            Monthly salary <sup>*</sup>
                        </label>
                        <input
                            type="text"
                            name="monthlySalary"
                            value={values.monthlySalary}
                            className={styles.formInput}
                            placeholder="Enter Amount in rupees"
                            onChange={onChange}
                        />
                        {formErrors.monthlySalary && (
                            <span className={styles.formValidationError}>
                                {formErrors.monthlySalary}
                            </span>
                        )}
                    </div>
                    <div className={styles.formRow}>
                        <label htmlFor="" className={styles.formLabel}>
                            Job Type <sup>*</sup>
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
                        {formErrors.jobType && (
                            <span className={styles.formValidationError}>
                                {formErrors.jobType}
                            </span>
                        )}
                    </div>
                    <div className={styles.formRow}>
                        <label htmlFor="" className={styles.formLabel}>
                            Remote/Office <sup>*</sup>
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
                        {formErrors.jobMode && (
                            <span className={styles.formValidationError}>
                                {formErrors.jobMode}
                            </span>
                        )}
                    </div>
                    <div className={styles.formRow}>
                        <label htmlFor="" className={styles.formLabel}>
                            Location <sup>*</sup>
                        </label>
                        <input
                            type="text"
                            name="jobLocation"
                            value={values.jobLocation}
                            className={styles.formInput}
                            placeholder="Enter Location"
                            onChange={onChange}
                        />
                        {formErrors.jobLocation && (
                            <span className={styles.formValidationError}>
                                {formErrors.jobLocation}
                            </span>
                        )}
                    </div>
                    <div className={styles.formRow}>
                        <label htmlFor="" className={styles.formLabel}>
                            Job Description <sup>*</sup>
                        </label>
                        <input
                            type="text"
                            name="jobDescription"
                            value={values.jobDescription}
                            className={styles.formInput}
                            placeholder="Type the job description"
                            onChange={onChange}
                        />
                        {formErrors.jobDescription && (
                            <span className={styles.formValidationError}>
                                {formErrors.jobDescription}
                            </span>
                        )}
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
                            name="close"
                            value="close"
                            className={styles.closeButton}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            name="submit"
                            value="submit"
                            className={styles.submitButton}
                            onClick={handleSubmit}
                        >
                            Save
                        </button>
                        <ToastContainer />
                    </div>
                </form>
            </div>
        </Modal>
    );
}
