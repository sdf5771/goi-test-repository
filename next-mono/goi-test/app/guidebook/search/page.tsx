"use client"
import React, {useEffect, useRef, useState} from 'react';
import styles from './page.module.css';
import { useSearchParams } from "next/navigation"
import useInfiniteScroll from '@/app/hooks/useInfiniteScroll';
import { useInfiniteQuery } from '@tanstack/react-query';
import getSearchResult from '@/app/queries/getSearchResult';
import { useRouter } from 'next/navigation';
import SearchDataElement from '@/components/SearchDataElement';

type TsearchResult = {category: string, date: string, index: string, tag: string, title: string, type: string}

export default function Page(){
    const router = useRouter();
    const searchParmas = useSearchParams();
    const [keyword, setKeyword] = useState(searchParmas.get('keyword'));
    const {
        data,
        fetchNextPage,
      } = useInfiniteQuery({
        queryKey: ['searchData', keyword],
        queryFn: ({ pageParam }) => getSearchResult({searchKeyword: keyword ? keyword : '', pageParam}),
        initialPageParam: 1,
        getNextPageParam: (lastPage: {count: number, next: null | string, previous: null | string, results: []}) => {
            if (lastPage && lastPage.next){
                const url = lastPage.next
                const urlParams = new URLSearchParams(new URL(url).search);
                const page = urlParams.get("page");

                return Number(page)
            }
            return null
        }
    })
    const [searchDatas, setSearchDatas] = useState<TsearchResult[]>(data ? data.pages[0].results : [])
    const bottomEle = useRef(null);

    // keyword가 바뀔 경우 setSearchDatas를 empty array로 비우고, 라우터에 새로운 키워드를 푸시함
    useEffect(() => {
        setKeyword(searchParmas.get('keyword'))
        setSearchDatas([])
        router.push(`/guidebook/search?keyword=${searchParmas.get('keyword')}`)
    }, [searchParmas.get('keyword')])

    // 기존 데이터에 페이지네이션으로 불러온 데이터를 푸시함
    useEffect(() => {
        if(data){
            const newList = data.pages[data.pageParams.length - 1].results;
            setSearchDatas((prev) => ([...prev, ...newList]))
        }
    }, [data?.pageParams])

    // infinitescroll 하는 커스텀 훅
    useInfiniteScroll({
        targetRef: bottomEle,
        callback: ([entry]) => entry.isIntersecting && fetchNextPage()
    })

    return (
        <div className={styles.search_result_box}>
            <div style={{marginTop: '10px'}}>
                <span style={{color: '#2DBA02', fontWeight: 600}}>{data?.pages[0].count}</span>
                <span className={styles.result_count_text}>건의 검색 결과가 있습니다.</span>
            </div>
            <ul className={styles.list_container}>
                {searchDatas ? searchDatas.map((searchData: TsearchResult, index: number) => {
                    return (
                        <SearchDataElement 
                            key={`${searchData.title} ${searchData.index}`} 
                            title={searchData.title}
                            tag={searchData.tag}
                            date={searchData.date}
                        />
                    )
                }) : null}
                <div ref={bottomEle}></div>
            </ul>
        </div>
    )
}