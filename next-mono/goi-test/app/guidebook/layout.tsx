"use client"
import React, {useState} from 'react';
import styles from './layout.module.css'
import { useRouter } from 'next/navigation';

export default function Layout({children} : {children : React.ReactNode}){
    const router = useRouter();
    const [inputVal, setInputVal] = useState('');
    const inputOnChangeHanlder = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputVal(event.target.value)
    }
    const inputOnKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.code === 'Enter' && inputVal.replace(/ /g, '') !== ''){
            router.push(`/guidebook/search?keyword=${inputVal}`)
        }
    }

    return (
        <main className={styles.main}>
            <div className={styles.header}>
                <div>
                    <h1>가이드북 검색</h1>
                </div>
                <div className={styles.input_box}>
                    <input 
                        onKeyDown={inputOnKeyDownHandler}
                        onChange={inputOnChangeHanlder}
                        placeholder='텍스트를 입력해주세요'
                        value={inputVal} 
                    />
                </div>
            </div>
            {children}
        </main>
    );
}