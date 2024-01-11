import React from "react";

import {ReactComponent as StarIcon} from "../../../assets/common/star.svg";
import {ReactComponent as LikeIcon} from "../../../assets/common/like.svg";
import {ReactComponent as DislikeIcon} from "../../../assets/common/dislike.svg";
import {useAppSelector} from "../../../service/hooks";

import styles from "./index.module.css";

const FeedbackModal = () => {
    const item = useAppSelector((state) => state.feedbackModal.data);

    return item && (
        <>
            <div className={styles.feedback_item_info}>
                <span className={styles.item_info_name}>{item.name}</span>
                <span className={styles.item_info_time}>{item.time}</span>
            </div>
            <div className={styles.feedback_item_rating}>
                <div className={styles.item_rating__icon}>
                    {
                        Array.from({ length: 5 }, (_, index) => (
                            <StarIcon key={index} className={index < (item.rating - 1) ? styles.feedback_item_star_active : styles.feedback_item_star} />
                        ))
                    }
                </div>
                <span className={styles.item_rating__title}>{item.rating}</span>
            </div>
            <div className={styles.feedback_item_desc}>
                <span className={styles.feedback_item_title}>Достоинства:</span>
                <p className={styles.feedback_item_content}>{item.advantages}</p>
            </div>
            <div className={styles.feedback_item_desc}>
                <span className={styles.feedback_item_title}>Недостатки:</span>
                <p className={styles.feedback_item_content}>{item.disadvantages}</p>
            </div>
            <div className={styles.feedback_item_desc}>
                <span className={styles.feedback_item_title}>Коментарий:</span>
                <p className={styles.feedback_item_content}>{item.comment}</p>
            </div>
            <div className={styles.feedback_item_likes}>
                <div className={styles.item_like}>
                    <LikeIcon className={styles.item_like_icon}/>
                    <span className={styles.item_like_title}>{item.likeCount}</span>
                </div>
                <div className={styles.item_dislike}>
                    <DislikeIcon className={styles.item_dislike_icon}/>
                    <span className={styles.item_dislike_title}>{item.dislikeCount}</span>
                </div>
            </div>
        </>
    );
}

export default FeedbackModal;