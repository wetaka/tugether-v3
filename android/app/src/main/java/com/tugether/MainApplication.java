package com.tugether;

import android.app.Application;
// import com.evollu.react.fcm.FIRMessagingPackage;
import com.facebook.react.ReactApplication;
import com.psykar.cookiemanager.CookieManagerPackage;
import com.reactlibrary.RNAppAuthPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.imagepicker.ImagePickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.github.droibit.android.reactnative.customtabs.CustomTabsPackage;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new CookieManagerPackage(),
            new RNAppAuthPackage(),
            new VectorIconsPackage(),
            new RNFetchBlobPackage(),
            new ImagePickerPackage(),
            new CustomTabsPackage()
            // new FIRMessagingPackage()
            
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
