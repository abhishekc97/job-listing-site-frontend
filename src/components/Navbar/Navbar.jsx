import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
    return (
        <div className={styles.navbar}>
            <div className={styles.top}>
                <div className={styles.appLogo}></div>
                <Link className={styles.appName} to={`/`}>
                    FindMyJobs
                </Link>
                <div className={styles.currentProfile}>
                    <span className={styles.profileGreeting}>
                        Hello Recruiter
                    </span>
                    <img src="" alt="" className={styles.profilePicture} />
                </div>
            </div>
            <div className={styles.appDescText}>
                Find your next remote job at companies like{" "}
                <span className={styles.blueText}>Swiggy</span>,{" "}
                <span className={styles.blueText}>Nike</span> and
                <span className={styles.blueText}> Cuvette</span>
            </div>
        </div>
    );
}
