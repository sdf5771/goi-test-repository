import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import getSearchResult from '../queries/getSearchResult';

function useInfiniteScroll({inputVal}: {inputVal: string}){
    const {
        data,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
        isFetchingNextPage,
        isFetchingPreviousPage,
      } = useInfiniteQuery({
        queryKey: ['searchData', inputVal],
        queryFn: ({ pageParam }) => getSearchResult({searchKeyword: inputVal, pageParam}),
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

    return {data, fetchNextPage}
}

export default useInfiniteScroll;