# goi-test-repository
dev.김섭우

# 사용한 툴

- Visual Studio Code - 코드 에디터
- Github Desktop - 깃 리포지토리 관리
- SourceTree - 깃 리포지토리 관리 및 브랜치 병합에 사용

# 1번 과제

# 2번 과제

---

# 3번 과제

### memoir

> next js 를 사용하는 것은 기존 CRA에 비해 익숙치 않아 조사를 진행하며 과제를 진행하였습니다.
> useInfiniteQuery 또한 사용해보지 않았지만
> 이번 기회를 통해 조사하며 사용해보고 좋은 경험을 쌓은 것 같습니다.
> next js의 latest 버전의 경우 (과제 진행일 2023.11.08일자 기준) 14버전으로 기존에 _app.tsx가 존재하지 않아 버전 업에 따른 리마인드용 학습이 필수적이라는 생각을 하였습니다.
> 

![Untitled](./readme-assets/3_1.gif)

- 과제 1) [프로젝트 세팅] : 메인 디렉토리 내에 두 개의 서브 디렉토리를 두고 메인 디렉토리에서 명령어를 통하여 각각의 서브 디렉토리에서 next.js 프로젝트가 실행될 수 있도록 해주세요
    - 메인 디렉토리가 되는 ‘next-mono’ 디렉토리 내부에 package.json 에 script 커멘드를 추가하였습니다.
        - 루트 디렉토리에서 두 가지 프로젝트를 실행할 수 있게 스크립트를 추가해본 것은 처음 경험해보아서 정확하게 추가한 것인지는 모르겠지만 조사하며 재미있는 경험이였다고 생각합니다.
        - next-mono/package.json
        
        ```tsx
        {
          "name": "next-mono",
          "version": "1.0.0",
          "description": "next-mono",
          "main": "index.js",
          "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            "dev:goi-test": "cd goi-test && yarn dev",
            "dev:next-default": "cd next-default && yarn dev"
          },
          "author": "seobisback",
          "license": "MIT"
        }
        ```
        
- 과제 2) **[구현] :** 1번 과제의 `dev:goi-test` 명령어를 실행하여 다음 요구 사항을 확인할 수 있도록 구현해주세요.
    - [http://localhost:3000/guidebook](http://localhost:3000/guidebook/search?keyword=%EC%9E%A5%EB%A1%80)
    
    ![Untitled](./readme-assets/3_2.png)
    
    - [http://localhost:3000/guidebook/search?keyword=장례](http://localhost:3000/guidebook/search?keyword=%EC%9E%A5%EB%A1%80)
    
    ![Untitled](./readme-assets/3_1.png)
    
    - @tanstack/react-query - useInfiniteQuery
        - goi-test-repository/next-mono/goi-test/app/guidebook/search/page.tsx
        
        ```tsx
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
        ```
        

### 설치 및 실행

- 종속성 라이브러리 설치 및 실행
- path : **goi-test-repository/next-mono**

```tsx
// 종속성 설치
cd goi-test // 과제 프로젝트 디렉토리로 이동
npm install | yarn install // npm 혹은 yarn을 사용해 종속성 라이브러리 설치
cd .. // next-mono 디렉토리로 이동

// 실행
yarn dev:goi-test // 과제 프로젝트 실행
yarn dev:next-default // 기본 next js 초기 프로젝트 실행

```

### directories

- next-mono/goi-test/app

```tsx
.
├── favicon.ico
├── globals.css
├── guidebook
│   ├── layout.module.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── search
│       ├── page.module.css
│       └── page.tsx
├── hooks
│   └── useInfiniteScroll.ts
├── layout.tsx
├── page.module.css
├── page.tsx
└── queries
    └── getSearchResult.ts

5 directories, 12 files
```

### next-mono/goi-test/package.json

```tsx
{
  "name": "goi-test",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@tanstack/react-query": "^5.7.2",
    "@tanstack/react-query-devtools": "^5.7.4",
    "next": "14.0.1",
    "react": "^18",
    "react-dom": "^18"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "14.0.1",
    "typescript": "^5"
  }
}
```