type Targs = {
    searchKeyword: string,
    pageParam: number | string,
}

async function getSearchResult({searchKeyword, pageParam}: Targs){
    const response = await fetch(`https://dev-api.goifuneral.co.kr/articles/search/?page=${pageParam}?query=${searchKeyword}`, 
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(async (res) => {
        if (!res.ok) {
            throw new Error()
        } else {
            return res;
        }
    });

    return response.json()
}

export default getSearchResult;