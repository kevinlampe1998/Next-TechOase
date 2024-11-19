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
            image: "/images/kevin.jpg", // Lokaler Pfad im public-Ordner
        },
        {
            name: "Ralf",
            role: "UI/UX Designer",
            image: "/images/Ralf.jpg", // Lokaler Pfad im public-Ordner
        },
    ];

    return (
        <div className={styles.teamProject}>
            <h2>Unser Team</h2>
            <ul>
                {teamMembers.map((member, index) => (
                    <li key={index} className={styles.teamMember}>
                        {/* <img
                            src={member.image}
                            alt={`${member.name}`}
                            className={styles.teamMemberImage}
                        /> */}
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