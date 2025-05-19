import React, { useState, useEffect } from "react";
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
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

    const fetchUser = async (login?: string) => {
        if (!username.trim()) {
            setError("Please enter a valid username.");
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`https://api.github.com/users/${login || username}`);
            const userData = await response.json();

            if (userData.message === "Not Found") {
                setError("User not found");
                setUser(null);
            } else {
                setUser(userData);
                setError(null);
                setUsername("");
                setSuggestions([]);
                setShowSuggestions(false);
            }
        } catch (error: any) {
            setError(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (username.length > 1) {
                fetch(`https://api.github.com/search/users?q=${username}&per_page=5`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.items) {
                            setSuggestions(data.items.map((item: any) => item.login));
                            setShowSuggestions(true);
                        }
                    })
                    .catch(() => setSuggestions([]));
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [username]);

    const handleSuggestionClick = (login: string) => {
        setUsername(login);
        fetchUser(login);
    };

    return (
        <div className={styles.container}>
            <div className={styles.inputWrapper}>
                <div className={styles.searchInput}>
                    <input
                        type="text"
                        value={username}
                        placeholder="Enter GitHub username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button onClick={() => fetchUser()}>Search</button>
                </div>
                {showSuggestions && suggestions.length > 0 && (
                    <ul className={styles.suggestionsList}>
                        {suggestions.map((sugg, index) => (
                            <li key={index} onClick={() => handleSuggestionClick(sugg)}>
                                {sugg}
                            </li>
                        ))}
                    </ul>
                )}
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
                        <p><span>Joined Github: </span>{new Date(user.created_at).toLocaleDateString()}</p>
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
