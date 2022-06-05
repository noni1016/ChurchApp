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

import net.daum.mf.map.api.MapLayout;
import net.daum.mf.map.api.MapPoint;
import net.daum.mf.map.api.MapView;
import net.daum.mf.map.api.MapPOIItem;
import net.daum.mf.map.api.MapPolyline;
import net.daum.mf.map.api.MapCircle;

import javax.annotation.Nullable;
import java.util.Map;

public class DaumMapManager extends SimpleViewManager<View> {
	public static final String REACT_CLASS = "DaumMap";
	public static final String TAG = "DaumMap";
	private final ReactApplicationContext appContext;
	private RNMapView rnMapView;
	private boolean initialRegionSet 	= false;
	private boolean isTracking 			= false;
	private boolean isCompass 			= false;
	private int 	tagIDX 				= 0;

	public DaumMapManager (ReactApplicationContext context) {
		super();
		this.appContext = context;
	}

	@Override
	public String getName() {
		return REACT_CLASS;
	}

	@Override
	public View createViewInstance(ThemedReactContext context) {
		View mView = new View(context.getCurrentActivity());
		RNMapView rMapView = new RNMapView(context, this.appContext);
		// rnMapView = rMapView;

		// rMapView.setOpenAPIKeyAuthenticationResultListener(new MapView.OpenAPIKeyAuthenticationResultListener() {
		// 	public void onDaumMapOpenAPIKeyAuthenticationResult(MapView mapView, int resultCode, String resultMessage) {
		// 		Log.i(TAG, String.format("Open API Key Authentication Result : code=%d, message=%s", resultCode, resultMessage));
		// 	}
		// });

		// rMapView.setMapViewEventListener(this);
		// rMapView.setPOIItemEventListener(this);
        // rMapView.setCurrentLocationEventListener(this);

		return mView;
	}

	// @ReactProp(name = "initialRegion")
	// public void setInitialRegion(MapView mMapView, ReadableMap initialRegion) {
	// 	double latitude 	= initialRegion.hasKey("latitude") ? initialRegion.getDouble("latitude") : 36.143099;
	// 	double longitude	= initialRegion.hasKey("longitude") ? initialRegion.getDouble("longitude") : 128.392905;
	// 	int    zoomLevel 	= initialRegion.hasKey("zoomLevel") ? initialRegion.getInt("zoomLevel") : 2;

	// 	if (!initialRegionSet) {
	// 		mMapView.setMapCenterPointAndZoomLevel(MapPoint.mapPointWithGeoCoord(latitude, longitude), zoomLevel, true);
	// 		initialRegionSet = true;
	// 	}
	// }

	// @ReactProp(name = "mapType")
	// public void setMapType(MapView mMapView, String mapType) {
	// 	mapType = mapType.toLowerCase();
	// 	if (mapType.equals("standard")) {
	// 		mMapView.setMapType(MapView.MapType.Standard);
	// 	} else if (mapType.equals("satellite")) {
	// 		mMapView.setMapType(MapView.MapType.Satellite);
	// 	} else if (mapType.equals("hybrid")) {
	// 		mMapView.setMapType(MapView.MapType.Hybrid);
	// 	} else {
	// 		mMapView.setMapType(MapView.MapType.Standard);
	// 	}
	// }

}
