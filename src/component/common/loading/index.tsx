import styles from './index.module.css';

const Loading = () => {
    return (
        <div className={`${styles.container} global_container`}>
            <span className={styles.wrapper}>
                <svg className={styles.icon} viewBox="22 22 44 44">
                    <circle className={styles.icon_inner} cx="44" cy="44" r="20" fill="none" strokeWidth="2"></circle>
                </svg>
            </span>
        </div>
    );
};

export default Loading;