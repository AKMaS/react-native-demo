不知名笔记啊
===========
一.在react-native中使用[jpush-react-native地址](http://www.google.com)
### 第一步
按照教程并且要在MainApplication.java加入JPushPackage。

    protected List<ReactPackage> getPackages() {
          return Arrays.<ReactPackage>asList(
                     new MainReactPackage(),
                     new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG)
                    );
                }
            };
### 第二步
在mainactivity各个生命周期方法中加入 JPushInterface的各个方法。<br/>
*至此应该就能收到推送了...吧*
### 第三步
如果需要点击跳转到native activity，则：<br/>
a)创建 SecondActivity，并在getMainComponentName中返回给js的名称：

    protected String getMainComponentName() {return "SecondActivity";}
    
b)创建 SecondActivity展示的js代码类 second，正常书写，最后注册给SecondActivity：<br/>
*其中 registerComponent 的第一个参数要和SecondActivity的getMainComponentName 返回的相同*

    AppRegistry.registerComponent('SecondActivity', () => second);
    
c) 在合理的页面添加jpush的监听方法：

    componentDidMount() {
        //集成jpush跳转到activity
        JPushModule.notifyJSDidLoad((resultCode) => {
        });

        JPushModule.addReceiveOpenNotificationListener((map) => {
          JPushModule.jumpToPushActivity("SecondActivity");
        });
      }

