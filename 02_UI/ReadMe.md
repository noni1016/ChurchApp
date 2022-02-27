# 앱 실행
## 1. Android
* 패키지 변경시 패키지 인스톨
    ```
    npm install
    ```
* 기기 연결
* 안드로이드 앱 실행
    ```
    npx react-native run-android
    ```

<br />
<br />

# Tips
## 1. Terminal 에서 android studio virtual device 여는 방법
1. Android studio emulator 환경변수 등록
* C:\Users\\{UserName}}\AppData\Local\Android\Sdk\emulator \
ex) C:\Users\hinon\AppData\Local\Android\Sdk\emulator
2. Emulator 실행
* emulator -avd "AVD Name" \
ex) 
```
    emulator -avd Pixel_3a_API_30_x86
```
* 주로 쓰는 에뮬레이터 리스트
    * Pixel 5 API 29
* 설치된 가상 기기 이름 보는 명령어
```
    emulator -list-avds
```

3. Debugging 도 가능 --> https://www.youtube.com/watch?v=UE66n7HOIAg
* 아래 내용 .vscode/launch.json 에 추가
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Attach to packager",
            "cwd": "${workspaceFolder}",
            "type": "reactnative",
            "request": "attach"
        }
    ]
}

<br />
<br />

# 오류 해결

## 1. FAILURE: Build failed with an exception.
* 에러 메시지
    ```
    * What went wrong:
    Execution failed for task ':app:installDebug'.
    > com.android.builder.testing.api.DeviceException: com.android.ddmlib.InstallException: INSTALL_FAILED_INVALID_APK: Scanning Failed.: Package /data/app/~~YY_my0fxBMNxQlJsEoD7JQ==/com.front_rn-mHS9fU0o3_unMF4bRWCU_A==/base.apk code is missing \
    ```
* 원인 : 에뮬레이터에서 전에 설치해논 앱을 다시 설치하려고 할 때 발생하는 에러 \
* 해결방법: ../android/app/build/outputs/apk/debug/app-debug.apk 파일을 지우면 됨

## 2. emulator 에서 Web page not available 오류가 나는 경우
* 오류코드 : net::ERR_NAME_NOT_RESOLVED
* 원인 : 회사 VPN 연결 종료 후 hosts 파일 변경됨
* 해결방법 : VPN 을 다시 연결 or DNS 서버 자동으로 받기 설정

## 3. npm install 후 패키지 에러
* 오류코드 : 캡처 까먹음
* 증상 : 앱 실행하자마자 최근 설치한 패키지 모듈 못찾겠다고 빨간 에러창 뜸
* 해결방법 : node_modules 폴더를 통째로 삭제하고 npm install 다시 수행
