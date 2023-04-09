import styles from "./AddJob.module.css";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { createJobPost } from "../../api/jobsAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddJob({ show, onClose, handleJobPostAdded }) {
    const [formData, setFormData] = useState({
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

    const onChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    useEffect(() => {}, [formData]);

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

    async function handleSubmit(event) {
        event.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            // api call to save the details
            await createJobPost(formData).then(() => {
                handleJobPostAdded();
                toastAlert();
            });
            onClose();
        }
    }

    function validateForm() {
        let isValid = true;
        const errors = {};

        if (!formData.companyName.trim()) {
            errors.companyName = "Company name is required";
            isValid = false;
        }

        if (!formData.jobPosition.trim()) {
            errors.jobPosition = "Job position is required";
            isValid = false;
        }

        if (!formData.monthlySalary.trim()) {
            errors.monthlySalary = "Monthly salary is required";
            isValid = false;
        } else if (!/^\d+$/.test(formData.monthlySalary)) {
            errors.monthlySalary = "Monthly salary should be a number";
            isValid = false;
        }

        if (formData.jobType === "") {
            errors.jobType = "Please select job type";
            isValid = false;
        }

        if (formData.jobMode === "") {
            errors.jobMode = "Please select remote or office";
            isValid = false;
        }

        if (!formData.jobLocation.trim()) {
            errors.jobLocation = "Job location is required";
            isValid = false;
        }

        if (!formData.jobDescription.trim()) {
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
                            Company Name <sup>*</sup>
                        </label>
                        <input
                            type="text"
                            name="companyName"
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
                        <ToastContainer />
                    </div>
                </form>
            </div>
        </Modal>
    );
}
