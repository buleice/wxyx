let needAddress=0;
const axios =require('axios');
const Config =require('./url-config')
axios.defaults.withCredentials=true;
let payData={};
const jsSdkConfig = function (shareData) {
    let WXSHDATA = {
        title: shareData.FshareTitle,
        link:`${window.location.href.split("?")[0]}?id=${shareData.buyingId}&shareKey=${shareData.myShareKey}`,
        imgUrl: shareData.FshareIcon,
        type: "link",
        dataUrl: "",
        desc: shareData.FshareContent,
        success: function() {
            console.log('分享成功')
        },
        cancel: function() {
            console.log('取消分享')
        }
    };
    // let u = window.navigator.userAgent;
    // let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    // let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    // //安卓需要使用当前URL进行微信API注册（即当场调用location.href.split('#')[0]）
    // //iOS需要使用进入页面的初始URL进行注册，（即在任何pushstate发生前，调用location.href.split('#')[0]）
    // let url = '';
    // if (isiOS) {
    //     url = encodeURIComponent(`http://www.qq.com/home/index?op=${window.sessionStorage.getItem('option')}`);//获取初始化的url相关参数
    // } else {
    //     url = encodeURIComponent(window.location.href.split('#')[0]);
    // }
    //
    // let time = Math.round(new Date().getTime() / 1000); //获取10位时间戳
    // // alert(window.location.href.split('#')[0]);

    axios({
        url: `${Config.ROOT}/weixin/config`,
        method: 'post',
        data: {
            url:window.location.href
        },
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function (response) {
        if (response.status === 200) {
            let data=response.data;
            window.wx.config({
                debug: false,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList:[
                    'onMenuShareTimeline',
                    'onMenuShareQQ',
                    'onMenuShareAppMessage'
                ]
            });
            window.wx.error(function(res) {
                console.log('微信：', JSON.stringify(res));
            });
            window.wx.ready(function() {
                window.wx.onMenuShareAppMessage(WXSHDATA);
                window.wx.onMenuShareTimeline(WXSHDATA); //朋友圈
            });
        }
    }).catch(function (errors) {
        console.log('errors', errors);
    });
};
const wxPay=async function (url,data) {
   let params =await axios({
        url: url,
        method: 'post',
        data:data,
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).catch(function (err) {
       console.log(err);
   });
   if(params.status===200){
       payData=params.data;
    jsSDK(params.data.data);
   }
}

const jsSDK = function(params) {
    if (typeof window.WeixinJSBridge === 'undefined') {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', function () { onBridgeReady(params) }, false)
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', function () { onBridgeReady(params) })
            document.attachEvent('onWeixinJSBridgeReady', function () { onBridgeReady(params) })
        }
    } else {
        onBridgeReady(params)
    }
}

const onBridgeReady=function (params) {
    window.WeixinJSBridge.invoke(
        'getBrandWCPayRequest', params,
        function(res) {
            if (res.err_msg === "get_brand_wcpay_request:ok") {
                if(payData.needAddress===0){
                    window.location.reload()
                }else{
                    setTimeout(()=>{window.location.href=`/address/index?#/orderpage?id=${payData.bid}`},300)
                }
            } else {
                alert("支付失败");
            }
        }
    );
}
const _GetQueryString=(name)=> {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
    if (r != null) return unescape(r[2]);
    return '';
}

export {
    jsSdkConfig,
    wxPay
}
