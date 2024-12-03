"use client";

import styles from "./page.module.css";

const TeamProject = () => {
    const teamMembers = [
        {
            name: "Philipp",
            role: "Frontend Developer",
            image: "/images/philipp.jpeg",
        },
        {
            name: "Kevin",
            role: "Backend Developer",
            image: "/images/kevin.png",
        },
    ];

    return (
        <div className={styles.teamProject}>
            <div className={styles.teamBG}></div>
            <h2>The Super Team</h2>
            <ul>
                {teamMembers.map((member, index) => (
                    <div
                        key={index}
                        className={`${styles.member_container} ${
                            index % 2 !== 0 ? styles.right : ""
                        }`}
                    >
                        <div className={styles.image_container}>
                            <img
                                src={member.image}
                                alt={`${member.name}`}
                                className={styles.member_image}
                            />
                        </div>
                        <div className={styles.member_info}>
                            <h3 className={styles.member_name}>
                                {member.name}
                            </h3>
                            <p className={styles.member_role}>{member.role}</p>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default TeamProject;
