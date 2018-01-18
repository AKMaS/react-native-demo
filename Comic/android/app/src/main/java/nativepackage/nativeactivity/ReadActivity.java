package nativepackage.nativeactivity;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.view.animation.Animation;
import android.view.animation.TranslateAnimation;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;
import com.comic.R;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

import nativepackage.volleyrequest.ComicEntity;

/**
 * RecyclerView分页：http://www.jianshu.com/p/3fe949083029
 */
public class ReadActivity extends AppCompatActivity implements View.OnClickListener, PagingScrollHelper.onPageChangeListener {

    RecyclerView recyclerView;
    PagingScrollHelper scrollHelper;
    private LinearLayoutManager hLinearLayoutManager;
    private ArrayList<ComicEntity> comics;
    private LinearLayout topLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_read);
        initView();
        String readUrl = getIntent().getStringExtra("readUrl");
        getReadJson(readUrl);
        recyclerView.setLayoutManager(hLinearLayoutManager);
        scrollHelper.setUpRecycleView(recyclerView);
        scrollHelper.setOnPageChangeListener(this);
        recyclerView.addOnScrollListener(new RecyclerView.OnScrollListener() {
            @Override
            public void onScrollStateChanged(RecyclerView recyclerView, int newState) {
                super.onScrollStateChanged(recyclerView, newState);
                Log.e("MYLOG", "state-" + newState);
                if (hLinearLayoutManager.getOrientation() == LinearLayoutManager.VERTICAL) {
                    if (!recyclerView.canScrollVertically(1)) {
                        Log.e("MYLOG", "end...");
                        AlertDialog.Builder builder = new AlertDialog.Builder(ReadActivity.this);
                        builder.setTitle("提示").setMessage("继续下一话?").setNegativeButton("累了",
                                new DialogInterface.OnClickListener() {
                                    @Override
                                    public void onClick(DialogInterface dialogInterface, int i) {
                                        finish();
                                    }
                                }
                        ).setPositiveButton("赶快", new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialogInterface, int i) {

                            }
                        });


                    }
                } else {
                    if (!recyclerView.canScrollHorizontally(1)) {
                        Log.e("MYLOG", "end...");
                    }
                }

            }
        });

    }

    private void initView() {
        String title = getIntent().getStringExtra("title");
        TextView comicTitle = ((TextView) findViewById(R.id.comictitle));
        comicTitle.setText(title);
        topLayout = (LinearLayout) findViewById(R.id.top_layout);
        recyclerView = (RecyclerView) findViewById(R.id.recyclerView);
        hLinearLayoutManager = new LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false);
        scrollHelper = new PagingScrollHelper();
        findViewById(R.id.toogle).setOnClickListener(this);
        findViewById(R.id.rotateBtn).setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {

        switch (v.getId()) {
            case R.id.rotateBtn:
                int orientation = hLinearLayoutManager.getOrientation() == LinearLayoutManager.HORIZONTAL ?
                        LinearLayoutManager.VERTICAL : LinearLayoutManager.HORIZONTAL;
                hLinearLayoutManager.setOrientation(orientation);
                break;
            case R.id.toogle:
                if (topLayout.getVisibility() == View.VISIBLE) {
                    hidePanel();
                } else {
                    showPanel();
                }
                break;
            case R.id.finish:
                finish();
                break;
        }
    }

    /**
     * 展示上下栏
     */
    void showPanel() {
        TranslateAnimation translateAnimation = new TranslateAnimation(Animation.RELATIVE_TO_SELF, 0.0f, Animation.RELATIVE_TO_SELF, 0.0f, Animation.RELATIVE_TO_SELF, 1.0f, Animation.RELATIVE_TO_SELF, 0.0f);
        TranslateAnimation translateAnimation1 = new TranslateAnimation(Animation.RELATIVE_TO_SELF, 0.0f,
                Animation.RELATIVE_TO_SELF, 0.0f, Animation.RELATIVE_TO_SELF,
                -1.0f, Animation.RELATIVE_TO_SELF, 0.0f);
        translateAnimation.setDuration(50);
        translateAnimation1.setDuration(50);
        topLayout.setAnimation(translateAnimation1);
        topLayout.setVisibility(View.VISIBLE);//这里通过改变可见性来播放动画
    }

    /**
     * 隐藏上下栏
     */
    void hidePanel() {
        //Log.i(TAG,"hidePanel: 隐藏");
        TranslateAnimation translateAnimation = new TranslateAnimation(Animation.RELATIVE_TO_SELF, 0.0f,
                Animation.RELATIVE_TO_SELF, 0.0f, Animation.RELATIVE_TO_SELF, 0.0f, Animation.RELATIVE_TO_SELF, -1.0f);
        TranslateAnimation translateAnimation1 = new TranslateAnimation(Animation.RELATIVE_TO_SELF, 0.0f,
                Animation.RELATIVE_TO_SELF, 0.0f, Animation.RELATIVE_TO_SELF,
                0.0f, Animation.RELATIVE_TO_SELF, 1.0f);
        translateAnimation.setDuration(50);
        translateAnimation1.setDuration(50);
        topLayout.setAnimation(translateAnimation);
        topLayout.setVisibility(View.INVISIBLE);//这里通过改变可见性来播放动画
    }

    public void getReadJson(String url) {
        RequestQueue mQueue = Volley.newRequestQueue(ReadActivity.this);
        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(url, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {
                if (response != null) {
                    parseData(response);
                    recyclerView.setAdapter(new ComicAdapter(ReadActivity.this, comics));
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.e("MYLOG", "getReadJson" + error);
            }
        });

        mQueue.add(jsonArrayRequest);
    }

    //获取图片地址集合
    private void parseData(JSONArray data) {
        comics = new ArrayList<ComicEntity>();
        try {
            for (int i = 0; i < data.length(); i++) {
                JSONObject object = data.getJSONObject(i);
                String icon = object.getString("icon");
                ComicEntity comicEntity = new ComicEntity(icon);
                comics.add(comicEntity);
            }
        } catch (JSONException e) {
            Log.e("MYLOG", "parseData=" + e);
        }
    }

    @Override
    public void onPageChange(int index) {
        Log.e("MYLOG", "index->" + index);
    }
}
