import React, { useState } from "react";
import styles from './profile.module.css';

interface GithubUser {
    avatar_url: string;
    name: string;
    login: string;
    public_repos: number;
    followers: number;
    following: number;
    html_url: string;
    created_at: string;
}

const GithubProfile: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [user, setUser] = useState<GithubUser | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUser = async () => {
        if (!username.trim()) {
            setError("Please enter a valid username.");
            return;
        }

        try {
            setLoading(true);
            setError(null);
            setUser(null); // Clear previous user

            const response = await fetch(`https://api.github.com/users/${username}`);
            if (!response.ok) {
                throw new Error("User not found");
            }

            const userData: GithubUser = await response.json();
            console.log(userData);
            setUser(userData);
            setUsername("");
        } catch (error: any) {
            setError(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.searchInput}>
                <input
                    type="text"
                    value={username}
                    placeholder="Enter GitHub username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button onClick={fetchUser}>Search</button>
            </div>

            <div className={styles.profileWrapper}>
                {loading && <div className={styles.error}>Loading profile...</div>}
                {error && <div className={styles.error}><h2>{error}</h2></div>}
                {!loading && user && (
                    <div className={styles.userContainer}>
                        <div className={styles.userImg}>
                            <img src={user.avatar_url} alt={user.name} />
                        </div>
                        <div className={styles.userInfo}>
                            <div className={styles.userName}>
                                <span>Name</span>
                                <p>{user.name || "N/A"}</p>
                            </div>
                            <div className={styles.username}>
                                <span>Username</span>
                                <p>{user.login}</p>
                            </div>
                            <div className={styles.userRepo}>
                                <span>Public Repos</span>
                                <p>{user.public_repos}</p>
                            </div>
                            <div className={styles.userFollowers}>
                                <span>Followers</span>
                                <p>{user.followers}</p>
                            </div>
                            <div className={styles.userFollowing}>
                                <span>Following</span>
                                <p>{user.following}</p>
                            </div>
                        </div>
                        <p><span>Joined Github: </span>{new Date(user.created_at).toLocaleString()}</p>
                        <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                            <button>Visit GitHub</button>
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GithubProfile;
