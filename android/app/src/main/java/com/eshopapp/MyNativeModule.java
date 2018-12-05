package com.eshopapp;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


public class MyNativeModule extends ReactContextBaseJavaModule {

    private Context mContext;
    //构造方法
    public MyNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    @Override
    public String getName() {
        return "MyNativeModule";
    }

    //rnCallNative为RN需要调用的方法
    @ReactMethod
    public void rnCallNative(String msg){

        //添加意图
        Intent intent = new Intent(mContext,AlipayActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        //bundle为需要传给AlipayActivity的加密签名
        Bundle bundle = new Bundle();
        bundle.putString("key",msg);
        intent.putExtras(bundle);
        //startActivity
        mContext.startActivity(intent,bundle);
    }
}
