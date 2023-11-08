"use client"
import React, {useState} from 'react';
import styles from './page.module.css';
import { useRouter, useSearchParams } from "next/navigation"
import useInfiniteScroll from '@/app/hooks/useInfiniteScroll';

type TsearchResult = {category: string, date: string, index: string, tag: string, title: string, type: string}

export default function Page(){
    const router = useRouter();
    const searchParmas = useSearchParams();
    const [keyword, setKeyword] = useState(searchParmas.get('keyword'));
    const { data, fetchNextPage } = useInfiniteScroll({inputVal: keyword ? keyword : ''})
    console.log(data)
    return (
        <div className={styles.search_result_box}>
            <div style={{marginTop: '10px'}}>
                <span style={{color: '#2DBA02', fontWeight: 600}}>{data?.pages[0].count}</span>
                <span className={styles.result_count_text}>건의 검색 결과가 있습니다.</span>
            </div>
            <ul className={styles.list_container}>
                {data?.pages ? data.pages[0].results.map((searchData: TsearchResult, index: number) => {
                    return (
                        <li key={searchData.title} className={styles.list_element}>
                            <h2>{searchData.title}</h2>
                            <span>{`(${searchData.tag} / ${searchData.date})`}</span>
                        </li>
                    )
                }) : null}
            </ul>
        </div>
    )
}