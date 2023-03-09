import styles from "./AboutJob.module.css";

export default function AboutJob() {
    return (
        <div className={styles.aboutJob}>
            <div className={styles.aboutPageTop}>
                <div className={styles.companyCard}>
                    <div className={styles.cardLeft}>
                        <div className={styles.companyLogo}>
                            <img src="" alt="" />
                        </div>
                    </div>
                    <div className={styles.cardRight}>
                        <div className={styles.rightTop}>
                            <span className={styles.jobTitle}>
                                Frontend developer
                            </span>
                        </div>
                        <div className={styles.rightMiddle}>
                            <div className={styles.companyName}>
                                RippleHire |
                            </div>
                            <div className={styles.companyLocation}>Mumbai</div>
                        </div>
                        <div className={styles.rightBottom}>
                            <div className={styles.postedTime}>
                                Posted 10 hrs ago
                            </div>
                            <button className={styles.copyLink}>
                                Copy Link
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.aboutPageMiddle}>
                <div className={styles.aboutJobWrapper}>
                    <div className={styles.aboutJobTop}>Job Offer</div>
                    <div className={styles.aboutJobBottom}>60k per month</div>
                </div>
                <div className={styles.aboutJobWrapper}>
                    <div className={styles.aboutJobTop}>Job Mode</div>
                    <div className={styles.aboutJobBottom}>Full time</div>
                </div>
                <div className={styles.aboutJobWrapper}>
                    <div className={styles.aboutJobTop}>Office / Remote</div>
                    <div className={styles.aboutJobBottom}>Remote</div>
                </div>
                <div className={styles.aboutJobWrapper}>
                    <div className={styles.aboutJobTop}>Location</div>
                    <div className={styles.aboutJobBottom}>Mumbai</div>
                </div>
            </div>
            <div className={styles.aboutPageBottom}>
                <div className={styles.bottomLeft}>
                    <div className={styles.headline}>About Job</div>
                    <p className={styles.description}>
                        We are seeking an aspiring Backend Developer to join our
                        dynamic team. The successful candidate will work on
                        developing and maintaining high-quality software
                        applications. You will work alongside experienced
                        software engineers to design and implement complex
                        applications, debug and resolve issues.
                    </p>
                    <div className={styles.headline}>About Company</div>
                    <p className={styles.description}>
                        RippleHire exists to make recruiting effortless, human
                        and delightful. RippleHire is a cloud-based hiring
                        platform that was founded with the mission of enabling
                        enterprises hire great talent effortlessly. Our
                        dedication to the craft has seen our customers win
                        several national and international awards. We are known
                        for a category defining employee referral product and a
                        deep talent acquisition platform.
                    </p>
                </div>
                <div className={styles.skillsBottomRight}>
                    <div className={styles.skillsBox}>
                        <span className={styles.skillsBoxHeadline}>
                            Skills Mandatory
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
