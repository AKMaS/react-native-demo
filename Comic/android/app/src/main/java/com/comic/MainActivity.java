package com.comic;

import android.os.Bundle;
import android.os.PersistableBundle;
import android.util.Log;

import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen;

import cn.jpush.android.api.JPushInterface;

// react-native-splash-screen >= 0.3.1
public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        Log.e("MYLOG","getMainComponentName");
        return "Comic";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this,true);  // here
        super.onCreate(savedInstanceState);
        JPushInterface.init(this);
        Log.e("MYLOG","onCreate");
    }

    @Override
    public void onCreate(Bundle savedInstanceState, PersistableBundle persistentState) {
        super.onCreate(savedInstanceState, persistentState);
         Log.e("MYLOG","onCreateWithPersistableBundle");
    }

    @Override
    protected void onStart() {
        super.onStart();
        Log.e("MYLOG","onStart");
    }

    @Override
    protected void onPause() {
        super.onPause();
        Log.e("MYLOG","onPause");
        JPushInterface.onPause(this);
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.e("MYLOG","onResume");
        JPushInterface.onResume(this);
    }
}
