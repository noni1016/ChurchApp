## 1. Terminal 에서 android studio virtual device 여는 방법
1. Android studio emulator 환경변수 등록
* C:\Users\\{UserName}}\AppData\Local\Android\Sdk\emulator \
ex) C:\Users\hinon\AppData\Local\Android\Sdk\emulator
2. Emulator 실행
* emulator -avd "AVD Name" \
ex) emulator -avd Pixel_3a_API_30_x86
3. Debugging 도 가능 --> https://www.youtube.com/watch?v=UE66n7HOIAg

## ㅁ. Error 발생 시
1. FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:installDebug'.
> com.android.builder.testing.api.DeviceException: com.android.ddmlib.InstallException: INSTALL_FAILED_INVALID_APK: Scanning Failed.: Package /data/app/~~YY_my0fxBMNxQlJsEoD7JQ==/com.front_rn-mHS9fU0o3_unMF4bRWCU_A==/base.apk code is missing \
--> 에뮬레이터에서 전에 설치해논 앱을 다시 설치하려고 할 때 발생하는 에러 \
../android/app/build/outputs/apk/debug/app-debug.apk 파일을 지우면 됨