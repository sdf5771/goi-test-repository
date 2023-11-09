import { getFiles } from "./utils/getFiles";
console.log("Start");

// 1. bun으로 파일 읽기
// 제공해드린 test-parlors.json를
// Bun의 메서드를 사용해 읽어주고, 변수에 선언해주세요.

const path = "./constants/test-parlors.json";
// 이곳에 작성해주세요.


// 2. 파일 존재 여부 확인
// Bun의 파일 메서드를 활용해서, 1에서 선언된 변수 내
// 파일이 없으면 콘솔에 "파일이 없습니다."라는 에러를 띄워주세요.


// 이곳에 작성해주세요.



// 3. JSON 파일 읽기
// Bun의 파일 메서드를 사용해, 1에서 선언된 변수에 JSON을 자바스크립트의 자료구조로 파싱해주세요.


// 이곳에 작성해주세요.




// 4. 개별 json 저장
// 3에서 불러온 test-parlors.json의 자바스크립트 자료구조 값들을
// 반복문, map 메서드 등을 통해, Bun의 파일 메서드를 사용해 개별 파일로 
// parlors 디렉토리에 저장해주세요.
// 이때 개별 json의 결과로는 
// {
//   "장례식장 타입" : {기존 test-parlors.json의 managed_type의 값},
//   "주소" : {기존 test-parlors.json의 address의 값}
// } 
// 와 같이 한글이름의 키값과 기존 결과를 지정해주시고,
// 개별 json의 파일명은, 기존 test-parlors.json의 companyname의 값으로 저장해주세요.
// ex) A병원장례식장.json, B병원장례식장.json ...


// 이곳에 작성해주세요.




// 5. 개별 json 리스트 출력
// utils의 getFiles를 사용해, parlors 디렉토리의 분리된 개별 장례식장.json 목록을 불러와주세요.
// 불러온 목록을 console에 출력해주세요.
// 콘솔에 parlors 장례식장 분할된 json 5개가 출력되면 통과입니다.




// 이곳에 작성해주세요.
const paths = 




console.log(paths);

console.log("End");