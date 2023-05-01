package com.churchapp; // replace com.your-app-name with your app’s name
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import android.util.Log;
import android.app.Activity;
import android.content.Intent;

  public class KakaoMapModule extends ReactContextBaseJavaModule{
  private static Class mapViewClass = MapViewActivity.class;
  private Activity activity;

    KakaoMapModule(ReactApplicationContext context) {
        super(context);

        
    }
    
    @Override
    public String getName() {
        return "KakaoMapModule";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getNoni(){
      return "noni sowhan";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void getMap(){
      //MapView mapView = new MapView(this);
      //MapViewActivity mapView = new MapViewActivity();
      
      activity = getCurrentActivity();
        Intent intent = new Intent();
        intent.setClass(activity, mapViewClass);
        activity.startActivity(intent);
    }

    @ReactMethod
    public void createCurrentLocate(String name, String location) {
        Log.d("KakaoMapModule", "Create event called with name: " + name
                + " and location: " + location);
    } 
  }