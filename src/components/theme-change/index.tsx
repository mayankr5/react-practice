import useLocalStorage from './useLocalStorage';
import styles from './theme.module.css'

const ThemeChange = () => {
    const [theme, setTheme] = useLocalStorage('theme', 'dark');

    const handleToggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
        console.log(theme);
        
    }

    return (
        <div className={styles.container}>
            <button onClick={handleToggleTheme}>Change Theme</button>
        </div>
    )
}

export default ThemeChange;