import styles from "./EditJob.module.css";
import Modal from "react-bootstrap/Modal";

export default function EditJob({ show, onClose }) {
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
                <form className={styles.jobDescForm}>
                    <div className={styles.formRow}>
                        <label htmlFor="" className={styles.formLabel}>
                            Company Name
                        </label>
                        <input
                            type="text"
                            className={styles.formInput}
                            placeholder="Enter your company name here"
                        />
                    </div>
                    <div className={styles.formRow}>
                        <label htmlFor="" className={styles.formLabel}>
                            Add logo URL
                        </label>
                        <input
                            type="text"
                            className={styles.formInput}
                            placeholder="Enter the link"
                        />
                    </div>
                    <div className={styles.formRow}>
                        <label htmlFor="" className={styles.formLabel}>
                            Job position
                        </label>
                        <input
                            type="text"
                            className={styles.formInput}
                            placeholder="Enter job position"
                        />
                    </div>
                    <div className={styles.formRow}>
                        <label htmlFor="" className={styles.formLabel}>
                            Monthly salary
                        </label>
                        <input
                            type="text"
                            className={styles.formInput}
                            placeholder="Enter Amount in rupees"
                        />
                    </div>
                    <div className={styles.formRow}>
                        <label htmlFor="" className={styles.formLabel}>
                            Job Type
                        </label>
                        <select className={styles.formSelect}>
                            <option value="partTime">Part Time</option>
                            <option value="fullTime">Full Time</option>
                            <option value="contract">Contract</option>
                        </select>
                    </div>
                    <div className={styles.formRow}>
                        <label htmlFor="" className={styles.formLabel}>
                            Remote/office
                        </label>
                        <select className={styles.formSelect}>
                            <option value="remote">Remote</option>
                            <option value="inOffice">In-Office</option>
                        </select>
                    </div>
                    <div className={styles.formRow}>
                        <label htmlFor="" className={styles.formLabel}>
                            Location
                        </label>
                        <input
                            type="text"
                            className={styles.formInput}
                            placeholder="Enter Location"
                        />
                    </div>
                    <div className={styles.formRow}>
                        <label htmlFor="" className={styles.formLabel}>
                            Job Description
                        </label>
                        <input
                            type="text"
                            className={styles.formInput}
                            placeholder="Type the job description"
                        />
                    </div>
                    <div className={styles.formRow}>
                        <label htmlFor="" className={styles.formLabel}>
                            About Company
                        </label>
                        <input
                            type="text"
                            className={styles.formInput}
                            placeholder="Type about your company"
                        />
                    </div>
                    <div className={styles.formRow}>
                        <label htmlFor="" className={styles.formLabel}>
                            Skills Required
                        </label>
                        <input
                            type="text"
                            className={styles.formInput}
                            placeholder="Enter the must have skills"
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
