'use client';

import styles from './page.module.css';

const TeamProject = () => {
    const teamMembers = [
        {
            name: "Philipp",
            role: "Frontend Developer",
            image: "/images/philipp.jpeg", // Lokaler Pfad im public-Ordner
        },
        {
            name: "Kevin",
            role: "Backend Developer",
            image: "/images/kevin.png", // Lokaler Pfad im public-Ordner
        },
    ];

    return (
        <div className={styles.teamProject}>
            <div className={styles.teamBG}></div>
            <h2>The Super Team</h2>
            <ul>
                {teamMembers.map((member, index) => (
                    <li key={index} className={styles.teamMember}>
                        <img
                            src={member.image}
                            alt={`${member.name}`}
                            className={styles.teamMemberImage}
                        />
                        <div>
                            <strong>{member.name}</strong> - {member.role}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeamProject;