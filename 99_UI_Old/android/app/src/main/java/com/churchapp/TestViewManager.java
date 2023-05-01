package com.churchapp;

import android.view.View;
import android.util.Log;
import android.graphics.Color;

import com.facebook.react.common.MapBuilder;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

public class TestViewManager extends SimpleViewManager<View> {

  public static final String REACT_CLASS = "TestView";
  ReactApplicationContext mCallerContext;

  public TestViewManager(ReactApplicationContext reactContext) {
    mCallerContext = reactContext;
  }

  @Override
  public String getName() {
    return REACT_CLASS;
  }

    @Override
    public View createViewInstance(ThemedReactContext reactContext) {
        View mView = new View(reactContext.getCurrentActivity());
        return mView;
    }
}