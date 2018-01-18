package nativepackage.nativeactivity;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.android.volley.RequestQueue;
import com.android.volley.toolbox.ImageLoader;
import com.android.volley.toolbox.NetworkImageView;
import com.android.volley.toolbox.Volley;
import com.comic.R;

import java.util.ArrayList;

import nativepackage.volleyrequest.BitmapCache;
import nativepackage.volleyrequest.ComicEntity;

/**
 * Created by king on 2017/11/23.
 */

public class ComicAdapter extends RecyclerView.Adapter<ComicAdapter.MyViewHolder> {
    private final RequestQueue mQueue;
    private final ImageLoader imageLoader;
    private Context context;
    private ArrayList<ComicEntity> data;

    public ComicAdapter(Context context, ArrayList<ComicEntity> data) {
        this.context = context;
        this.data = data;
        mQueue = Volley.newRequestQueue(context);
        imageLoader = new ImageLoader(mQueue, new BitmapCache());
    }

    @Override
    public ComicAdapter.MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(context).inflate(R.layout.comicimg_holder, parent, false);
        MyViewHolder holder = new MyViewHolder(v);

        return holder;
    }

    @Override
    public void onBindViewHolder(ComicAdapter.MyViewHolder holder, int position) {
//        holder.comicImg.setScaleType(ImageView.ScaleType.CENTER_CROP);
        holder.comicImg.setDefaultImageResId(R.mipmap.bg_default_cover);
        holder.comicImg.setDefaultImageResId(R.mipmap.bg_default_cover);
        holder.comicImg.setImageUrl(data.get(position).getIcon(), imageLoader);


    }

    @Override
    public int getItemCount() {
        return data.size();
    }

    class MyViewHolder extends RecyclerView.ViewHolder {
        NetworkImageView comicImg;

        public MyViewHolder(View itemView) {
            super(itemView);
            comicImg = (NetworkImageView) itemView.findViewById(R.id.comicImg);

        }
    }
}
