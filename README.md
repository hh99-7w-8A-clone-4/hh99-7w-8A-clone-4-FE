![header](https://capsule-render.vercel.app/api?type=waving&color=FFEB33&height=300&section=header&text=kakao%20talk&fontSize=90)

<hr>

<br>

<br>

## 💻 member

### FE

강태훈, 김혜진

### BE

이근영, 김휘림, 한종혁


## WE MAKE

### KAKAO TALK CLONE PROJECT
![스크린샷 2022-08-25 오후 6 53 01](https://user-images.githubusercontent.com/103446802/186634849-df6161f9-1220-4b65-ac57-32ab43884243.png)
![스크린샷 2022-08-25 오후 6 53 15](https://user-images.githubusercontent.com/103446802/186634876-5f300753-f409-4b4e-ab30-4604fc0ede8a.png)
![스크린샷 2022-08-25 오후 6 53 55](https://user-images.githubusercontent.com/103446802/186634889-02c1b9cb-c224-43d0-87ef-abadde8b4285.png)
![스크린샷 2022-08-25 오후 6 54 10](https://user-images.githubusercontent.com/103446802/186634914-ceee965b-a8c7-4b30-9881-7fda9499905d.png)
![스크린샷 2022-08-25 오후 6 54 50](https://user-images.githubusercontent.com/103446802/186634930-31fb6f3f-797a-4aa7-a889-3675dff5064f.png)
![스크린샷 2022-08-25 오후 6 55 03](https://user-images.githubusercontent.com/103446802/186634988-825f2d98-31a2-4f6d-aa92-1cc97a437a03.png)
![스크린샷 2022-08-25 오후 6 55 11](https://user-images.githubusercontent.com/103446802/186635037-641e8a9a-bf64-4df9-a43a-b8a9c08c1642.png)




<hr>

## 🛠 기능구현

### 회원가입

### 로그인

### 메인화면 구현

### 채팅목록 구현

### 채팅창 구현

### 회원정보 관리

### 채팅 전체 페이지 웹소켓 구현

<hr>

## ⚙️ 해결한 문제



FE

📍 Trouble
회원가입이 성공하면 성공 alert 확인 되나 실패 alert 동시에 확인
⚙️ Solution
기존에는 try와 catch에 각각 alert을 넣었으나 response의 status값이 200일 경우와 200이 아닐 경우를 조건문(if-else if) 으로 연결하여 해결

📍 Trouble
소셜 로그인 연결 시 서버에는 로그인 정보가 확인되지만 페이지는 이동하지 않는 문제
⚙️ Solution
KAKAO_AUTH_URL의 redirect_uri을 로컬로 우선 적용하여 작업한 후 연결 확인하고 다시 배포 url로 변경

📍 Trouble
useEffect를 이용하여 fetch를 이용해 서버와 연결하고자 했으나 서버에는 정보가 확인되지만 로그인되지 않는 문제
⚙️ Solution
fetch 대신 axios를 이용하여 서버와 연결하고 useEffect와 분리

📍 Trouble
소셜 로그인으로 연결시 메인 페이지 로드될때 css가 깨지는 현상이 발생.
⚙️ Solution
인터넷에서 서치해본 결과 브라우저 자체의 캐시를 날리면 해결된다고 하는데 될때가 있고 다시 css가 깨지는 경우가 발생하고 원인을 정확히 파악하지 못함.
처음 접속시에만 문제가 발생하고 새로고침하면 다시 원래대로 돌아오길래 일단 setTimeout과 window.location.reload()를 이용해서 임시방편으로 해결해놓음.
문제를 찬찬히 고찰할 시간이 부족하여서 제대로 해결하지 못한 것 같아 아쉬움.

📍 Trouble
첫 로딩시에 전역으로 생성한 axios객체의 header에 authorization을 할당해주는 부분에서 계속 엑세스 토큰이 null값으로 들어가서 
첫 로딩시에는 무조건 reissue가 동작하는 문제가 발생.
⚙️ Solution
authorization을 할당하는 부분을 로그인 시, 로그인후 렌더링 과정 등 여러 위치에서 실행시켜 보았으나 여전히 null값이 들어가거나 할당 자체가 되지 않았음.
콘솔을 열심히 찍어본 결과 서버와 통신하고 response가 돌아오는 시점보다 렌더링 되는 시점이 빨라서 데이터를 못 받아오길래 로그인 후 메인페이지의 렌더링에
100ms정도의 텀을 주어 통신 과정이 완료될때까지의 시간을 확보함.




BE

📍 Trouble
1.클라이언트와 content가 끊겼을때, 마지막 채팅 내용을 저장해서 마지막에 읽은 채팅 아이디 값으로
읽지 않은 메세지를 표시하고 싶었지만, 마지막으로 읽은 값을 찾아오지를 못 함.

Contents
chat 레파지토리에서 findLastByRoomDetail_RoomMaster에서 마지막 값을 받아오고 싶었지만, 
Last값으로 마지막에 쓴 것을 찾을 수 있는 함수가 없었음.

Solution
대신 findFirstByRoomDetail_RoomMaster_IdOrderByCreatedAtDesc로 시간 순서로 받아서 가장 마지막에 작성된 채팅 내용을 받아옴.
]


📍 Trouble
roomService 에서 roomCreate를 실행시 roomDetail에서 roomMaster의 정보를 가져와 
해당 엔티티에 필요한 정보들을 가져올 수 없었음. .

Solution 
roomMaster 와 roomDetail에 연관관계 설정을 해놓지 않았음.
roomDetail 에서 roomMaster에 @ManyToOne(fetch = FetchType.LAZY) 를 적용해 
필요할 때 정보를 사용 할 수 있도록 설정하고 cascade = CascadeType.ALL, orphanRemoval = true로 
상위 엔티티에서 하위 엔티티의 모든 작업을 실행할 수 있도록 설정함.
]

📍 Trouble 

시큐리티에 허가 받지 않으면 web socket 권한을 사용하지 못하게 하려고 했는데,
antMatchers를 주석처리하면 403에러가 발생 인증 처리가 되지 않음.
chaanelintercepter의 preSend 헤더를 열어 토큰을 인증하려고 했지만 
메서드 까지 요청이 도달하지 못 함.

Contents
이 부분은 Authorization header를 달자는 입장과 보인이 쿼리스트링으로 날려도 괜찮다는
주장이 부딪히고 있다고 함.
header를 달 수 있게 하려면 connection 뒤에 작은 인증 시스템을 만들어야 하는데
이미 헤더와 쿠키, 토큰 인증 등 정형화 된 형식이 많이 있는데
또 하나의 인증을 만들어야 하냐는 것

시큐리티에게 모든 권한을 요청하되 StompIncepteptor 부분에서 토큰을 검사해서 거르도록 함
]

reissue 관련

📍 refresh token의 값을 받지를 못 함.
access-token중 bearer값도 같이 받아 오고 있음.

해결
검증 전에 bearer을 떼어서 검증을 수행함.
]



📍 서버에서 Refresh - token 이라고 보내주지만,
클라이언트에서 refresh-token으로 전달해 줘서 클라이언트에서 받지 못 했음.

해결- 
클라이언트에 Refresh 부분을 refresh로 고침.
]

<hr>

## 🧰 Package

+ styled components
- redux toolkit
+ axios
- buffer
+ react-hook-form
- webstomp
+ sockJS













