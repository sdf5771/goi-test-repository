import React from 'react';
import styles from './SearchDataElement.module.css';

function SearchDataElement({title, tag, date} : {title: string, tag: string, date: string}){
    return (
        <li className={styles.list_element}>
            <h2>{title}</h2>
            <span>{`(${tag} / ${date})`}</span>
        </li>
    )
}

export default SearchDataElement;