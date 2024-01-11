ETC
  - 기본적으로 Server Component로 동작함
  - Server 컴포넌트에서만 Client Component를 Import 할 수 있음?

Group Folder
- layout.tsx 처리

Parallel Route
  - 한 화면에 서로 다른 경로의 페이지를 보여줄 때, 사용
  - 이름 앞에 "@"를 붙임
  - layout을 기준으로 같은 Level에 있는 Parallel Page만 가능
    ```  
    가능
      - @modal/i/flow/page.tsx    (modal)
      - login/page.tsx            (children)
      - layout.tsx
    불가
      - i/flow/@modal/page.tsx
      - login/page.tsx
      - layout.tsx
    ```

  - 빈 페이지가 필요한 경우 default.tsx 파일 생성 필요
    ```
    export default function Default(){
      return null;
    }
    ```
  - 

Intercepting Route
  - 특정 경로를 대체함
  - 클라이언트에서 라우팅을 처리할 때만 적용됨
    - URL을 직접 입력해서 이동하는 경우 적용되지 않음
      - 예) http://localhost:3000/i/flow/login
            redirect('/i/flow/login')
            새로고침
  - (.)i/flow/login/page.tsx 은
    기존 /i/flow/login/page.tsx 을 대체함
    - (.): 현재 경로
    - (..): 이전 경로
      - Group Route, Parallel Route 폴더는 경로에서 제외


Private Folder
- 폴더명이 _로 시작함
- 폴더 정리용
