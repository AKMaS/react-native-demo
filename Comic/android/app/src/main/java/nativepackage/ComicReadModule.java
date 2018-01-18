package nativepackage;

import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import nativepackage.nativeactivity.ReadActivity;

/**
 * Created by king on 2017/11/22.
 */

public class ComicReadModule extends ReactContextBaseJavaModule {
    private final static String MODULENAME = "READPAGE";

    public ComicReadModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return MODULENAME;
    }

    @ReactMethod
    public void just2ReadPage(String readUrl,String title) {

        Intent intent = new Intent(getReactApplicationContext(), ReadActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.putExtra("readUrl", readUrl);
        intent.putExtra("title",title);
        getReactApplicationContext().startActivity(intent);
    }

}
