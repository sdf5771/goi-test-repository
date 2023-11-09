import React, {useEffect} from 'react';

type Tprops = {
    targetRef: React.MutableRefObject<HTMLDivElement> | React.MutableRefObject<null>,
    callback: IntersectionObserverCallback
}

function useInfiniteScroll({targetRef, callback}: Tprops){
    useEffect(() => {
        let observer;

        if(targetRef && targetRef.current){
            observer = new IntersectionObserver(callback, {
                root: null,
                rootMargin: '0px',
                threshold: 1.0
            })
            observer.observe(targetRef.current)
        }

        return () => observer && observer.disconnect();
    }, [targetRef])
}

export default useInfiniteScroll;