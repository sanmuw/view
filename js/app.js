//地图容器
var myMap = echarts.init(document.getElementById('map')),
    liteSum = echarts.init(document.getElementById('liteSum0')),
	liteSum1 = echarts.init(document.getElementById('liteSum1')),
    proW = echarts.init(document.getElementById('proW')),
    cliVolCha = echarts.init(document.getElementById('cliVolCha')),
    ordQutiCha = echarts.init(document.getElementById('ordQutiCha')),
    vieNumCha = echarts.init(document.getElementById('vieNumCha'));

//34个省、市、自治区的名字拼音映射数组
var provinces = {
    //23个省
    "台湾": "taiwan",
    "河北": "hebei",
    "山西": "shanxi",
    "辽宁": "liaoning",
    "吉林": "jilin",
    "黑龙江": "heilongjiang",
    "江苏": "jiangsu",
    "浙江": "zhejiang",
    "安徽": "anhui",
    "福建": "fujian",
    "江西": "jiangxi",
    "山东": "shandong",
    "河南": "henan",
    "湖北": "hubei",
    "湖南": "hunan",
    "广东": "guangdong",
    "海南": "hainan",
    "四川": "sichuan",
    "贵州": "guizhou",
    "云南": "yunnan",
    "陕西": "shaanxi",
    "甘肃": "gansu",
    "青海": "qinghai",
    //5个自治区
    "新疆": "xinjiang",
    "广西": "guangxi",
    "内蒙古": "neimongol",
    "宁夏": "ningxia",
    "西藏": "xizang",
    //4个直辖市
    "北京": "beijing",
    "天津": "tianjin",
    "上海": "shanghai",
    "重庆": "chongqing",
    //2个特别行政区
    "香港": "xianggang",
    "澳门": "aomen"
};

//datarute
function datarute(data,n) {
    var dx = new Array;
    var dser = new Array;
    var dd = {};
    data.map(function (item, index, arr) {
        dx.push(item['xa']);
        dser.push(item['ser']);
    })
    dd['xa'] = dx;
    dd['ser'] = dser;
    return dd;
}
function datarute1(data) {
    var dx = new Array;
    var dser = new Array;
    var dd = {};
    data.map(function (item, index, arr) {
        dx.push(item['name']);
        dser.push(item['value']);
    })
    dd['xa'] = dx;
    dd['ser'] = dser;
    return dd;
}

//qianshi 10
function tenS(data) {
    var te = new Array;
    var ser = new Array;
    var tenp = {},lenp;
    if (data.length > 10) {
        lenp = 10;
    } else {
        lenp = data.length;
    }
    for (var i = 0; i < lenp; i++) {
        te.push(data[i]['name']);
        ser.push(data[i]['value']);
    }
    tenp['xa'] = te;
    tenp['ser'] = ser;
    return tenp;

}


//pinyinzhuanhanzi

function pyzhz(a) {
    for (var ep in a) {
        for (var e in provinces) {

            if (a[ep]['name'].toLocaleLowerCase().replace(/\s+/g, "") == provinces[e]) {
                a[ep]['name'] = e;
            }//"Taiwan, Province of China"
            if (a[ep]['name'] == 'Taiwan, Province of China') {
                a[ep]['name'] = '台湾';
            }
        }
    }
}

//sortS
function selectionSort(arr,n) {
    var len = arr.length;
    var minIndex, temp;
    if(n == 1){
        for (var i = 0; i < len - 1; i++) {
            minIndex = i;
            for (var j = i + 1; j < len; j++) {
                if (arr[j]['value'] > arr[minIndex]['value']) {     //寻找最小的数
                    minIndex = j;                 //将最小数的索引保存
                }
            }
            temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }else{

        for (var i = 0; i < len - 1; i++) {
            minIndex = i;
            for (var j = i + 1; j < len; j++) {
                if (arr[j]['count'] < arr[minIndex]['count']) {     //寻找最小的数
                    minIndex = j;                 //将最小数的索引保存
                }
            }
            temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
    }
    }
    return arr;
}

//cloud
var tagC = 0;
function tagCould(dd) {
    var d1 = dd;
var egD1 = [
    { label: 'sanmu', url: '', target: '_Blank' },
];

function Wentries(d2) {
    //$('#tag-cloud').html(' ');
    var ss = new Array;
    for (var i = 0; i < d2.length; i++) {
        ss[i] = {};
        ss[i]['label'] = d2[i]['word'];
        ss[i]['url'] = '#';
    }
    return ss;
}
    var settings = {
        entries: Wentries(d1),
        width: 640,
        height: 480,
        radius: '65%',
        radiusMin: 75,
        bgDraw: false,
        opacityOver: 1.00,
        opacityOut: 0.05,
        opacitySpeed: 6,
        fov: 800,
        speed: 0.5,
        fontFamily: 'Oswald, Arial, sans-serif',
        fontSize: '15',
        //fontColor: '#009688',
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontStretch: 'normal',
        fontToUpperCase: true
    };
    //if (tagC == 0) {
        $('#tag-cloud').svg3DTagCloud(settings);
   // } else {
        //$('#tag-cloud1').svg3DTagCloud(settings);
    //}
    function sji(d4) {
        var lem;
        //if(tagC == 0){
        //    $('#tag-cloud1').css('display', 'none');
        //    $('#tag-cloud').css('display', 'block');
            lem = $('#tag-cloud').find('a').length;
        //    //tagC++;
        //} else {
        //    $('#tag-cloud').css('display', 'none');
        //    $('#tag-cloud1').css('display', 'block');
        //    lem = $('#tag-cloud1').find('a').length;
        //    tagC = 0;
        //}
          var f=15,
            maxv=0,
            fc;
          for (var p = 0; p < d4.length; p++) {
              if (maxv < d4[p]['count']) {
                  maxv = d4[p]['count'];
              }
          }
        for (var x = 0; x < lem; x++) {//transform:rotate(7deg);
            //d4[i]
            var g = 255;
            var b = 255;
            var r = 0;//Math.round
            fc = Math.round(f + d4[x]['count'] / maxv * 35);
            r = Math.round(r + d4[x]['count'] / maxv * 200);
            g = Math.round(g - d4[x]['count'] / maxv * 255);
            b = Math.round(b - d4[x]['count'] / maxv * 255);
            var ged = (d4[x]['count']) % 20;
            var color1 = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            $('#tag-cloud').find('a').eq(x).css('transform', 'rotate(' + ged + 'deg)');
            $('#tag-cloud').find('a').eq(x).find('text').css('fill', color1);
            $('#tag-cloud').find('a').eq(x).find('text').css('fontSize', fc+'px');
        }

        $('#tag-cloud').find('a').each(function () {
            var textValue = $(this).html();
            //if (textValue == "XX概况" || textValue == "服务导航") {
                $(this).css("cursor", "default");
                $(this).attr('href', '#');     //修改<a>的 href属性值为 #  这样状态栏不会显示链接地址  
                $(this).click(function (event) {
                    event.preventDefault();   // 如果<a>定义了 target="_blank“ 需要这句来阻止打开新页面
                });
            //}
        });
    }
    sji(d1);
}
 
//quanguo browsing ranking
function cbrank(cbr,n) {
    var chran = selectionSort(cbr, 1);//cjsrank
    var len = cbr.length;
    var a = $('#cjsrank ul');
    if (chran.length == 0) { return; }
    if (n == undefined || n) {
        if (len > 10) {
            len = 10;
        }
        
    }
    if (n == 1) {
        a = $('#fjsrank ul');
        if (len > 5) {
            len =5;
        }

    };
    if (n == 1) {
        $('#fjsrank ul').empty();
        for (var i = 0; i < len; i++) {
            if (i % 2 == 0) {
                if (i == 0) {
                    $('#fjsrank ul').append("<li style='clear:both'><span class='te'>" + (i + 1) + "</span><span>" + chran[i]['name'] + "</span><span class='spanF'>" + chran[i]['value'] + "</span></li>")
                } else if (i == 2) {
                    $('#fjsrank ul').append("<li style='clear:both'><span class='teT'>" + (i + 1) + "</span><span>" + chran[i]['name'] + "</span><span class='spanF'>" + chran[i]['value'] + "</span></li>")
                }
                else {
                    $('#fjsrank ul').append("<li style='clear:both'><span class='pub'>" + (i + 1) + "</span><span>" + chran[i]['name'] + "</span><span class='spanF'>" + chran[i]['value'] + "</span></li>")
                }
            } else {
                if (i == 1) {
                    $('#fjsrank ul').append("<li class='gehang' style='clear:both'><span class='teT'>" + (i + 1) + "</span><span>" + chran[i]['name'] + "</span><span class='spanF'>" + chran[i]['value'] + "</span></li>")
                } else {
                    $('#fjsrank ul').append("<li class='gehang' style='clear:both'><span class='pub'>" + (i + 1) + "</span><span>" + chran[i]['name'] + "</span><span class='spanF'>" + chran[i]['value'] + "</span></li>")
                }
            }
        }


    } else {
        $('#cjsrank ul').empty();
        for (var i = 0; i < len; i++) {
            if (i % 2 == 0) {
                if (i == 0) {
                    a.append("<li><span class='te'>" + (i + 1) + "</span><span>" + chran[i]['name'] + "</span><span class='spanF'>" + chran[i]['value'] + "</span></li>")
                } else if (i == 2) {
                    a.append("<li><span class='teT'>" + (i + 1) + "</span><span>" + chran[i]['name'] + "</span><span class='spanF'>" + chran[i]['value'] + "</span></li>")
                }
                else {
                    a.append("<li><span class='pub'>" + (i + 1) + "</span><span>" + chran[i]['name'] + "</span><span class='spanF'>" + chran[i]['value'] + "</span></li>")
                }
            } else {
                if (i == 1) {
                    $('#cjsrank ul').append("<li class='gehang'><span class='teT'>" + (i + 1) + "</span><span>" + chran[i]['name'] + "</span><span class='spanF'>" + chran[i]['value'] + "</span></li>")
                } else {
                    $('#cjsrank ul').append("<li class='gehang'><span class='pub'>" + (i + 1) + "</span><span>" + chran[i]['name'] + "</span><span class='spanF'>" + chran[i]['value'] + "</span></li>")
                }
            }
        }

    }

}

//huizong
var hzz = {}, hzz2 = {},hzz3 = {};
function hz(zd,d) {
    var s = 0;
    if (d == 1) {
        for (var i = 0; i < zd.length; i++) {
            if (zd[i]['xa'] in hzz) {
                continue
            } else {
                hzz[zd[i]['xa']] = zd[i]['ser'];
                s += zd[i]['ser'];
            }
        }
    };
    if (d == 2) {
        for (var i = 0; i < zd.length; i++) {
            if (zd[i]['xa'] in hzz2) {
                continue
            } else {
                hzz2[zd[i]['xa']] = zd[i]['ser'];
                s += zd[i]['ser'];
            }
        }
    };
    if (d == 3) {
        for (var i = 0; i < zd.length; i++) {
            if (zd[i]['xa'] in hzz3) {
                continue
            } else {
                hzz3[zd[i]['xa']] = zd[i]['ser'];
                s += zd[i]['ser'];
            }
        }
    };

    
    return s;
}
function hzO(zd) {
    var s = 0;
    for (var i = 0; i < zd.length; i++) {
        if (zd[i]['sa'] in hzz) {
            continue
        } else {
            s += zd[i]['ser'];
        }

    }
    return s;
}

//diejia
var sesl = 0,hisCou1,
    sesl2 = 0,hisCou2,
    sesl3 = 0,hisCou3;
function counT(a,b){
    //判断缓存里有没有，没有就是加 存，有跟缓存做对比；
    var scoun = 0,
        scoun2 = 0,
        scoun3 = 0;
    if (b == 1) {
        var key1 = sessionStorage.getItem('key1');
        if (key1) {
            for (var i = 0; i < a.length; i++) {
                scoun += a[i]['value'];
            }
            sesl = (key1 - scoun);
            sessionStorage.setItem('key1', scoun);
        } else {
            for (var i = 0; i < a.length; i++) {
                scoun += a[i]['value'];
            }
            sessionStorage.setItem('key1', scoun);
            hisCou1 = scoun;
        }
        tjlq("#jtext", hisCou1, sesl, 'Retrieval');
        hisCou1 = scoun;
    };
    if (b == 2) {
        var key2 = sessionStorage.getItem('key2');
        if (key2) {
            for (var i = 0; i < a.length; i++) {
                scoun2 += a[i]['value'];

            }
            sesl2 = (key2 - scoun2);
            sessionStorage.setItem('key2', scoun2);
        } else {
            for (var i = 0; i < a.length; i++) {
                scoun2 += a[i]['value'];
            }
            sessionStorage.setItem('key2', scoun2);
            hisCou2 = scoun2;
        }
        tjlq("#ltest", hisCou2, sesl2, 'Browsing');
        hisCou2 = scoun2;
    };
    if (b == 3) {
        var key3 = sessionStorage.getItem('key3');
        if (key3) {
            for (var i = 0; i < a.length; i++) {
                scoun3 += a[i]['value'];

            }
            sesl = (key3 - scoun3);
            sessionStorage.setItem('key3', scoun3);
        } else {
            for (var i = 0; i < a.length; i++) {
                scoun3 += a[i]['value'];
            }
            sessionStorage.setItem('key3', scoun3);
            hisCou3 = scoun3;
        }
        tjlq("#qtest", hisCou3, sesl3, 'order');
        hisCou3 = scoun3;
    };

    
    

}

//tongji j l qc
function tjlq(dom, num,f,c) {
    (function ($) {
        /*jQuery对象添加  runNum  方法*/
        $.fn.extend({
            /*
        		*	滚动数字
				*	@ val 值，	params 参数对象
				*	params{addMin(随机最小值),addMax(随机最大值),interval(动画间隔),speed(动画滚动速度),width(列宽),height(行高)}
        	*/
            runNum: function (val, params) {
                /*初始化动画参数*/
                //if(val){}
                if (val.toString().length < 8) {
                    var a = 8 - val.toString().length;
                    for (var e = 0; e < a; e++) {
                        val = '0' + val;
                    }
                }
                var valString = val || '00000000';
                var par = params || {};
                var runNumJson = {
                    el: $(this),
                    value: valString,
                    valueStr: valString.toString(10),
                    width: par.width || 20,
                    height: par.height || 20,
                    addMin: par.addMin || 10000,
                    addMax: par.addMax || 99999,
                    interval: par.interval || 3000,
                    speed: par.speed || 1000,
                    width: par.width || 20,
                    length: valString.toString(10).length
                };
                $._runNum._list(runNumJson.el, runNumJson);
                $._runNum._interval(runNumJson.el.children("li"), runNumJson);
            }
        });
        /*jQuery对象添加  _runNum  属性*/
        $._runNum = {
            /*初始化数字列表*/
            _list: function (el, json) {
                var str = '';
                console.log(json.length);
                for (var i = 0; i < json.length; i++) {
                    var w = json.width * i;
                    var t = json.height * parseInt(json.valueStr[i]);
                    var h = json.height * 10;
                    str += '<li style="width:' + json.width + 'px;left:' + w + 'px;top: ' + -t + 'px;height:' + h + 'px;">';
                    for (var j = 0; j < 10; j++) {
                        str += '<div style="height:' + json.height + 'px;line-height:' + json.height + 'px;">' + j + '</div>';
                    }
                    str += '</li>';
                }
                el.html(str);
            },
            /*生成随即数*/
            _random: function (json) {
                var Range = json.addMax - json.addMin;
                var Rand = Math.random();
                var num = json.addMin + Math.round(Rand * Range);
                return num;
            },
            /*执行动画效果*/
            _animate: function (el, value, json) {
                if (value.toString().length < 8) {
                    var a = 8 - value.toString().length;
                    for (var e = 0; e < a; e++) {
                        value = '0' + value;
                    }
                }
                //console.log(value.length);
                for (var x = 7; x >= 0; x--) {
                    var topPx = value[x] * json.height;
                    el.eq(x).animate({ top: -topPx + 'px' }, json.speed);
                }
                val = parseInt(json.value, 10);
            },
            /*定期刷新动画列表*/
            _interval: function (el, json) {
                var val = parseInt(json.value, 10);
                //var val1 = sessionStorage.getItem("key1");
                //var val2 = sessionStorage.getItem("key2")
                //var val3 = sessionStorage.getItem("key3")

                //if (val1 && c == 'Retrieval') {
                //    val1 = parseInt(json.value, 10);
                //    val1 += f;
                //    $._runNum._animate(el, val1.toString(10), json);
                //}
                //else if (c == 'Retrieval') {
                //    val += f//$._runNum._random(json);
                //    //sessionStorage.setItem("key1", val)
                //    $._runNum._animate(el, val.toString(10), json);
                //};

                //if (val2 && c == 'Browsing') {
                //    val2 = parseInt(json.value, 10);
                //    val2 += f;
                //    $._runNum._animate(el, val2.toString(10), json);
                //}
                //else if (c == 'Browsing') {
                //    val += f//$._runNum._random(json);
                //    //sessionStorage.setItem("key2", val)
                //    $._runNum._animate(el, val.toString(10), json);
                //};

                //if (val3 && c == 'order') {
                //    val3 = parseInt(json.value, 10);
                //    val3 += f;
                //    $._runNum._animate(el, val3.toString(10), json);
                //}
                //else if (c == 'order') {
                //    val += f//$._runNum._random(json);
                //    $._runNum._animate(el, val.toString(10), json);
                //}
                if (f == undefined) {
                    f = 0;
                }
                //setInterval(function () {
                val += f//$._runNum._random(json);
                $._runNum._animate(el, val.toString(10), json);
                //}, json.interval);
            }
        }
    })(jQuery);

    $(dom).runNum(num);

}

//在线用户数  Online users
function onliUsers(num) {
    //if(num == null || num == undefined){
    //
    //}
    var num = num || '00000000';
    (function ($) {
        $.fn.numberAnimate = function (setting) {
            var defaults = {
                speed: 1000,//动画速度
                num: "", //初始化值
                iniAnimate: true, //是否要初始化动画效果
                symbol: '',//默认的分割符号，千，万，千万
                dot: 0 //保留几位小数点
            }
            //如果setting为空，就取default的值
            var setting = $.extend(defaults, setting);

            //如果对象有多个，提示出错
            if ($(this).length > 1) {
                alert("just only one obj!");
                return;
            }

            //如果未设置初始化值。提示出错
            if (setting.num == "") {
                alert("must set a num!");
                return;
            }
            var nHtml = '<div class="mt-number-animate-dom" data-num="{{num}}">\
            <span class="mt-number-animate-span">0</span>\
            <span class="mt-number-animate-span">1</span>\
            <span class="mt-number-animate-span">2</span>\
            <span class="mt-number-animate-span">3</span>\
            <span class="mt-number-animate-span">4</span>\
            <span class="mt-number-animate-span">5</span>\
            <span class="mt-number-animate-span">6</span>\
            <span class="mt-number-animate-span">7</span>\
            <span class="mt-number-animate-span">8</span>\
            <span class="mt-number-animate-span">9</span>\
            <span class="mt-number-animate-span">.</span>\
          </div>';

            //数字处理
            var numToArr = function (num) {
                num = parseFloat(num).toFixed(setting.dot);
                if (typeof (num) == 'number') {
                    var arrStr = num.toString().split("");
                } else {
                    var arrStr = num.split("");
                }
                //console.log(arrStr);
                return arrStr;
            }

            //设置DOM symbol:分割符号
            var setNumDom = function (arrStr) {
                var shtml = '<div class="mt-number-animate">';
                for (var i = 0, len = arrStr.length; i < len; i++) {
                    if (i != 0 && (len - i) % 3 == 0 && setting.symbol != "" && arrStr[i] != ".") {
                        shtml += '<div class="mt-number-animate-dot">' + setting.symbol + '</div>' + nHtml.replace("{{num}}", arrStr[i]);
                    } else {
                        shtml += nHtml.replace("{{num}}", arrStr[i]);
                    }
                }
                shtml += '</div>';
                return shtml;
            }

            //执行动画
            var runAnimate = function ($parent) {
                $parent.find(".mt-number-animate-dom").each(function () {
                    var num = $(this).attr("data-num");
                    num = (num == "." ? 10 : num);
                    var spanHei = $(this).height() / 11; //11为元素个数
                    var thisTop = -num * spanHei + "px";
                    if (thisTop != $(this).css("top")) {
                        if (setting.iniAnimate) {
                            //HTML5不支持
                            if (!window.applicationCache) {
                                $(this).animate({
                                    top: thisTop
                                }, setting.speed);
                            } else {
                                $(this).css({
                                    'transform': 'translateY(' + thisTop + ')',
                                    '-ms-transform': 'translateY(' + thisTop + ')',   /* IE 9 */
                                    '-moz-transform': 'translateY(' + thisTop + ')',  /* Firefox */
                                    '-webkit-transform': 'translateY(' + thisTop + ')', /* Safari 和 Chrome */
                                    '-o-transform': 'translateY(' + thisTop + ')',
                                    '-ms-transition': setting.speed / 1000 + 's',
                                    '-moz-transition': setting.speed / 1000 + 's',
                                    '-webkit-transition': setting.speed / 1000 + 's',
                                    '-o-transition': setting.speed / 1000 + 's',
                                    'transition': setting.speed / 1000 + 's'
                                });
                            }
                        } else {
                            setting.iniAnimate = true;
                            $(this).css({
                                top: thisTop
                            });
                        }
                    }
                });
            }

            //初始化
            var init = function ($parent) {
                //初始化
                $parent.html(setNumDom(numToArr(setting.num)));
                runAnimate($parent);
            };

            //重置参数
            this.resetData = function (num) {
                var newArr = numToArr(num);
                var $dom = $(this).find(".mt-number-animate-dom");
                if ($dom.length < newArr.length) {
                    $(this).html(setNumDom(numToArr(num)));
                } else {
                    $dom.each(function (index, el) {
                        $(this).attr("data-num", newArr[index]);
                    });
                }
                runAnimate($(this));
            }
            //init
            init($(this));
            return this;
        }
    })(jQuery);

    $(function () {

        //初始化
        //		var numRun = $(".numberRun").numberAnimate({num:'15343242.10', dot:2, speed:2000, symbol:","});
        //		var nums = 15343242.10;
        //		setInterval(function(){
        //			nums+= 3433.24;
        //			numRun.resetData(nums);
        //		},3000);


        var numRun2 = $(".zs").numberAnimate({ num: num, speed: 2000, symbol: "," });
        var nums2 = num;
        //setInterval(function () {
        //    nums2 += 1433;
            numRun2.resetData(num);
        //}, 2000);


        //		var numRun3 = $(".numberRun3").numberAnimate({num:'52353434.343', dot:3, speed:2000});
        //		var nums3 = 52353434.343;
        //		setInterval(function(){
        //			nums3+= 454.521;
        //			numRun3.resetData(nums3);
        //		},4000);

        //		var numRun4 = $(".numberRun4").numberAnimate({num:'52353434', speed:2000});
        //		var nums4 = 52353434;
        //		setInterval(function(){
        //			nums4+= 123454;
        //			numRun4.resetData(nums4);
        //		},3500);

    });

}


var mapd = new Array;
var mapbor = new Array;
var mapoder = new Array;
function mapD(data,d) {
    if (d == 1) {
        for (var i = 0; i < data.length; i++) {
            mapd[i] = {};
            mapd[i]['name'] = data[i]['name'];
            mapd[i]['value'] = data[i]['value'];
        }
    };
    if (d == 2) {
        for (var i = 0; i < data.length; i++) {
            mapbor[i] = {};
            mapbor[i]['name'] = data[i]['name'];
            mapbor[i]['value'] = data[i]['value'];
        }
    }
    if (d == 3) {
        for (var i = 0; i < data.length; i++) {
            mapoder[i] = {};
            mapoder[i]['name'] = data[i]['name'];
            mapoder[i]['value'] = data[i]['value'];
        }
    }
}

//unnique 

function Unique(a) {
    //i ip 相同 —> 2 action -> 3 siteName -> 4 listName
    for (var i = 0; i < a.length; i++) {
        for (var j = 1; j < a.length; j++) {
            if (a[i]['ipName'] == a[j]['ipName']) {
                if (a[i]['typeName'] == a[j]['typeName']) {
                    if (a[i]['siteName'] == a[j]['siteName']) {
                        if (a[i]['listName'] == a[j]['listName']) {
                                a.remove(j);
                        }
                    }
                }
            }
        }
    }
}



var asetI, as = 1;

function data2(region,r,prov) {
    $.ajax({
        url: '../../UCAppShowData.ashx',// 跳转到 action    
        data: { region: region,prov:prov },
        type: 'post',
        cache: false,
        dataType: 'json',
        success: function (data) {
            console.log(r);
            console.log(data);
            function setIn() {

            
            $('#ret').click(function () {
                pyzhz(data[0].map);
                $(this).css('backgroundImage', 'url(./img/huizong.png)');
                $('#jsl').css('backgroundImage', 'url(./img/4.png)');
                $('#ddl').css('backgroundImage', 'url(./img/3.png)');
                $('#djl').css('backgroundImage', 'url(./img/2.png)');

                renderMap(r, data[0].map, data[0].browRank, data[0].orderRank);
            })

            $('#djl').click(function () {
                pyzhz(data[0].map);
                $(this).css('backgroundImage', 'url(./img/jiansuo.png)');
                $('#ret').css('backgroundImage', 'url(./img/huizong_1.png)');
                $('#jsl').css('backgroundImage', 'url(./img/4.png)');
                $('#ddl').css('backgroundImage', 'url(./img/3.png)');
                renderMap1(r, data[0].map,'检索量');
            })

            $('#ddl').click(function(){
                $(this).css('backgroundImage', 'url(./img/liulan.png)');
                $('#ret').css('backgroundImage', 'url(./img/huizong_1.png)');
                $('#jsl').css('backgroundImage', 'url(./img/4.png)');
                $('#djl').css('backgroundImage', 'url(./img/2.png)');
                renderMap1(r, data[0].browRank,'浏览量');
            })

            $('#jsl').click(function(){
                $(this).css('backgroundImage', 'url(./img/quanwen.png)');
                $('#ret').css('backgroundImage', 'url(./img/huizong_1.png)');
                $('#ddl').css('backgroundImage', 'url(./img/3.png)');
                $('#djl').css('backgroundImage', 'url(./img/2.png)');
                renderMap1(r, data[0].orderRank,'全文请求量');
                //renderMap(r, data[0].browRank, data[0].orderRank,data[0].browRank, data[0].map);
            })

            if (region == 'china') {
                $('.pro').css('top', '100%');
                $('.remak').css('display', 'none');
                $('.prov_su').css('display', 'none');
                $('.noadr').css('display', 'none');

                $('.jslp').css('display','block');

                $('.btnjlq').css('display', 'block');
                $('.contour').css('top', '0%');
                $('.zxzz').css('display', 'block');
                $('.sumber').css('display', 'block');

                $('.taglist').css('display', 'none');
                $("#tag-cloud").css('display', 'block');

                //map
                if (data[0].map.length == 0 && data[0].browRank.length == 0 && data[0].orderRank.length == 0) {
                    $('#ret').css('backgroundImage', 'url(./img/huizong.png)');
                    $('#jsl').css('backgroundImage', 'url(./img/4.png)');
                    $('#ddl').css('backgroundImage', 'url(./img/3.png)');
                    $('#djl').css('backgroundImage', 'url(./img/2.png)');
                    mapD(data[0].map, 1);
                    mapD(data[0].browRank, 2);
                    mapD(data[0].orderRank, 3);
                    renderMap(r, data[0].map, data[0].browRank, data[0].orderRank);

                }
                if (data[0].map.length != 0 && data[0].browRank.length != 0 && data[0].orderRank.length !=0) {
                    pyzhz(data[0].map);
                    pyzhz(data[0].browRank);
                    pyzhz(data[0].orderRank);

                    $('#ret').css('backgroundImage', 'url(./img/huizong.png)');
                    $('#jsl').css('backgroundImage', 'url(./img/4.png)');
                    $('#ddl').css('backgroundImage', 'url(./img/3.png)');
                    $('#djl').css('backgroundImage', 'url(./img/2.png)');
                    mapD(data[0].map, 1);
                    mapD(data[0].browRank, 2);
                    mapD(data[0].orderRank, 3);
                    renderMap(r, data[0].map, data[0].browRank, data[0].orderRank);
                }

                //趋势图
                if (data[0].Retrieval != null || data[0].Retrieval != undefined) {

                    jlql(cliVolCha, datarute(data[0].Retrieval));

                }
                if (data[0].Browsing != null || data[0].Browsing != undefined) {
                    jlql(ordQutiCha, datarute(data[0].Browsing));
                }
                if (data[0].order != null || data[0].order != undefined) {
                    jlql(vieNumCha, datarute(data[0].order));
                }


                //reci
                if (data[0].hotword != null || data[0].hotword != undefined) {
                    tagCould(selectionSort(data[0].hotword));
                }
                //tongji ltest
                counT(data[0].map,1);
                counT(data[0].browRank, 2);
                counT(data[0].orderRank, 3);

                //tjlq("#jtext", hz(data[0].Retrieval,1), 'Retrieval');
                //tjlq("#ltest", hz(data[0].Browsing,2), 'Browsing');
                //tjlq("#qtest", hz(data[0].order,3), 'order')
                //prov toingj r

                //汇总//browRank   orderRank  data[0].map
                pyzhz(data[0].browRank);
                pyzhz(data[0].orderRank);
                wenli(liteSum1, tenS(data[0].browRank));
                wenli(liteSum, tenS(data[0].orderRank));

                //qingdong dingshjiqi
                c = setTimeout(carousel, 4000);

                //ranking(china || forign)
//                if (data[0].retrievelogforignRank.length != 0) {
                    cbrank(data[0].map);
                    cbrank(data[0].retrievelogforignRank, 1);
//                }

                //zaixianyonghushu  //data[0]['Table']['uc']
                onliUsers(data[0]['onlineuser'][0]['count']);

                //回位
                $('.authent').hide();
                $('.success').removeClass('test');
                coutr = setInterval(setI, 5*60*1000);
            } else {

                //no adrees

                function noad(a,b) {
                    //data1
                    var dr = 0;
                    var rda = 0;
                    for (var i = 0; i < a.length; i++) {
                        for (var j = 0; j < data1.length; j++) {
                            if (a[i]['name'] != data1[j]['name']) {
                                dr++;
                            }
                        };
                        if (dr == data1.length) {
                            
                            rda += a[i]['value'];
                        }
                    }
                    if (rda != 0) {
                        $('.noadr').css('display', 'block');
                        $('#adr').append("<p>" + b + " " + rda + "</p>");
                    };
                }

                //map
                if (data[0].mapretrieve.length == 0 && data[0].mapbrowse.length == 0 && data[0].maporder.length == 0) {
                    //pyzhz(data[0].mapretrieve);
                    //pyzhz(data[0].mapbrowse);
                    //pyzhz(data[0].orderRank);
                    $('.authent').hide();
                    $('.success').removeClass('test');
                    conOrp = 'china';
                    //data2('china', 'china');
                    r = 'china';
                    data1 = data3;
                    data[0].map = mapd;
                    data[0].browRank = mapbor;
                    data[0].orderRank = mapoder;
                    coutr = setInterval(setI, 5 * 60 * 1000);
                    return;
                } else {
                    renderMap(r, data[0].mapretrieve, data[0].mapbrowse, data[0].maporder);
                    $('#adr').empty();
                    noad(data[0].mapretrieve, '检索量:');
                    noad(data[0].mapbrowse, '浏览量:');
                    noad(data[0].maporder, '全文请求量:');
                }

                //animate 
                $('.contour').css('top', '100%');
                $('.jslp').css('display', 'none');
                $('.pro').css('top', '0');
                $('.btnjlq').css('display','none')
                $('.remak').css('display', 'block');
                $('.zxzz').css('display', 'none');
                $('.sumber').css('display', 'none');
                $('.prov_su').css('display', 'block');

                //tongji  r


                //趋势图
                if (data[0].Retrieval.length != 0) {

                    jlql(cliVolCha, datarute(data[0].Retrieval));

                }
                if (data[0].Browsing.length != 0) {
                    jlql(ordQutiCha, datarute(data[0].Browsing));
                }
                if (data[0].order.length != 0) {
                    jlql(vieNumCha, datarute(data[0].order));
                }


                //
                if (data[0].docu.length != 0) {
                    //;//{ value: 10, name: '专利' },
                    var daO = new Array;
                    var colorlist = ['#ff5722', '#e13728', '#393d49', '#00cef8', '#5fb878', '#795548'];
                    var b = 0;
                    $('.wxzb ul').empty();
                    for (var i = 0; i < data[0].docu.length; i++) {
                        daO[i] = {};
                        daO[i]['value'] = data[0].docu[i]['docuCount'];
                        daO[i]['name'] = data[0].docu[i]['docuName'];
                        $('.wxzb ul').append("<li><span style='width:100%;padding-left:4px;'>" + data[0].docu[i]['docuName'] + ": &nbsp; </span><span style ='width:100%;margin-left:2%'>" + data[0].docu[i]['docuCount'] + "</span></li>")
                    }
                    var doml = $(".wxzb ul").children("li").length;
                    for (var a = 0; a < doml; a++) {
                        $(".wxzb ul").children("li").eq(a).css('background', colorlist[b]);
                        b++;
                        if (b > 5) { b = 0 };
                    }
                    wxfb(daO);
                }
                // mesT        #00cef8  
                if ((data[0].timemessage != '' || data[0].timemessage != undefined) && data[0].timemessage.length!=0) {
                    var lem = data[0].timemessage.length;
                    var yp;
                    if (lem == 0) {
                        //return;
                    };
                    $("#mesT").empty();
                    var mapcity1 = sessionStorage.getItem('mapcity');
                    if (mapcity1) {
                        if (mapcity1 == r) {
                            
                        } else {
                            $("#mesT").empty();
                            sessionStorage.setItem('mapcity', r);
                        }
                    }else{
                        sessionStorage.setItem('mapcity', r);
                        $("#mesT").empty();
                    }
                    //显示5条数据 1920 像素
                    Unique(data[0].timemessage);
                    for (var i = 0; i < lem; i++) {// eg ip地址为 27.194.241.111 检索了 中科院文献情报中心 的 会议
                        if (data[0].timemessage[i]['ipName'] == undefined || data[0].timemessage[i]['ipName'] == '') { break; }
                        if (data[0].timemessage[i]['listName'] != '' && data[0].timemessage[i]['siteName'] != '') {
                            yp = "ip地址为" + data[0].timemessage[i]['ipName'] + data[0].timemessage[i]['typeName'] + "了" + data[0].timemessage[i]['siteName'] + "的" + data[0].timemessage[i]['listName'];
                        }else if(data[0].timemessage[i]['listName'] != ''){
                            yp = "ip地址为" + data[0].timemessage[i]['ipName'] + data[0].timemessage[i]['typeName'] + "了" + data[0].timemessage[i]['listName'];
                        } else if (data[0].timemessage[i]['siteName'] != '') {
                            yp = "ip地址为" + data[0].timemessage[i]['ipName'] + data[0].timemessage[i]['typeName'] + "了" + data[0].timemessage[i]['siteName'];
                        } else {
                            break;
                        }
                        $("#mesT").append("<div class='mes'><h6>" + data[0].timemessage[i]['time'] + "</h6><p>" + yp + "</p></div>");
                    }
                }

                //reci  t ag-cloud1
                $("#tag-cloud").css('display', 'none');
                //$('#tag-cloud1').css('display', 'block');
                $('.taglist').css('display', 'block');
                $('#tag-cloud1').empty();
                $('.taglist').empty();
                if (data[0].hotword != null || data[0].hotword != undefined) {
                    selectionSort(data[0].hotword);
                    var fmax,le,tp,zI;
                    for (var i = 0; i < data[0].hotword.length; i++) {
                        //$('#tag-cloud1').append("<span>" + data[0].hotword[i]['word'] + "</span>");
                        $('.taglist').append("<a>" + data[0].hotword[i]['word'] + "</a>");
                    }
                     
                    $(document).ready(function () {
                        var tags_a = $("#tags").find('a');

                        tags_a.each(function () {
                            var x = 9;
                            var y = 0;
                            var rand = parseInt(Math.random() * (x - y + 1) + y);
                            $(this).addClass("size" + rand);
                        })

                    })
                }

                //pai
                pyzhz(data[0].retrieveRank);
                pyzhz(data[0].browRank);
                pyzhz(data[0].orderRank);

                // fuzhi
                function f(d, a) {
                    var y1 = 0;
                    if (a == 1) {
                        for (var i = 0; i < d.length; i++) {
                            y1++;
                            if (d[i]['name'] == r) {
                                $('.jzs').text(d[i]['value']);
                                $('.jzsr').text(i + 1);
                                i = d.length;
                                return;
                            }
                            if (y1 == (d.length - 1)) {
                                $('.jzs').text(0);
                                $('.jzsr').text('无');
                            }
                        };
                    };
                    if (a == 2) {
                        for (var i = 0; i < d.length; i++) {
                            y1++;
                            if (d[i]['name'] == r) {
                                $('.lzs').text(d[i]['value']);
                                $('.lzsr').text(i + 1);
                                i = d.length;
                                return;
                            }
                            if (y1 == (d.length - 1)) {
                                $('.lzs').text(0);
                                $('.lzsr').text('无');
                            }
                        };
                    };
                    if (a == 3) {
                        for (var i = 0; i < d.length; i++) {
                            y1++;
                            if (d[i]['name'] == r) {
                                $('.qzs').text(d[i]['value']);
                                $('.qzsr').text(i + 1);
                                i = d.length;
                                return;
                            }
                            if (y1 == (d.length - 1)) {
                                $('.qzs').text(0);
                                $('.qzsr').text('无');
                            }
                        };
                    }

                };
                //qingkuang 1 没有zhi

                if (data[0].retrieveRank.length == 0) {
                    $('.jzs').text(0);
                    $('.jzsr').text('无');
                } else {
                    f(data[0].retrieveRank, 1);
                }
                if (data[0].browRank.length == 0) {
                    $('.lzs').text(0);
                    $('.lzsr').text('无');
                } else {
                    f(data[0].browRank, 2);
                }
                if (data[0].orderRank.length == 0) {
                    $('.qzs').text(0);
                    $('.qzsr').text('无');
                } else {
                    f(data[0].orderRank, 3);
                }

                $('.authent').hide();
                $('.success').removeClass('test');
                coutr = setInterval(setI, 5 * 60 * 1000);
            }

            }
            //wenli(liteSum, data);
            //return data;
         if (as == 1) {
             setIn();
             as++;
         } else {
             asetI = setTimeout(setIn, 6000);
         }
        },
        error: function () {
            alert("请求异常！");
        }
    });

}

//ajaxfun

function dajax(region, r) {
    $.ajax({
        url: '../../UCAppShowData.ashx',
        data: { region: region,r:r },
        type: 'post',
        cache: false,
        dataType: 'json',
        success: function (data) {
            renderMap(region, data[0].map);
        },
        error: function () {
            alert('请求异常！');
        }
    })
}

//折线图
function jlql(dom,data) {
    option7 = {
        xAxis: {
            type: 'category',
            //			boundaryGap: false,
            splitLine: {
                show: false,
            },
            axisLabel: {
                show: true,
                interval: 0,
                textStyle: {
                    color: '#A6AABB'
                }
            },
            data: data.xa//['8:32', '8:33', '8:34', '8:35', '8:36', '8:37', '8:38', '8:39']
        },
        yAxis: {
            type: 'value',
            splitLine: {
                show: false,
            },
            axisLabel: {
                show: true,
                interval: 0,
                textStyle: {
                    color: '#A6AABB'
                }
            }
        },
        series: [
			{
			    name: '变化值',
			    type: 'line',
			    itemStyle: {
			        normal: {
			            lineStyle: {
			                color: "#2ec5c5"
			            }
			        }
			    },
			    data: data.ser//[5, 8, 10, 11, 15, 9, 11, 8],
			    //				markPoint: {
			    //					data: [
			    //						{type: 'max', name: '最大值'},
			    //						{type: 'min', name: '最小值'}
			    //					]
			    //				},
			    //				markLine: {
			    //					data: [
			    //						{type: 'average', name: '平均值'}
			    //					]
			    //				}
			}
        ]
    };
    dom.setOption(option7);

}

//zhuxingtu
function wenli(dom, data) {
    if (dom == liteSum1) {
        var curName = '浏览量';
    }else{
        var curName = '全文请求量';
    }
    option3 = {
        color: ['#3398DB', '#BAA979'],
        tooltip: {
            trigger: 'axis',
            formatter: '{a0}:{c0}篇'
            //					axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            //						type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            //					}
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: data.xa,//['期刊', '会议', '论文', '科技报告', '文集汇编', '科技丛书', '专利', '标准'],
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    show: true,
                    interval:0,
                    textStyle: {
                        color: '#A6AABB'
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                splitLine: {
                    show: false,
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#A6AABB'
                    }
                }
            }
        ],
        series: [
            {
                name: curName,
                type: 'bar',
                barWidth: '60%',
                data:data.ser,
                //data: [10, 52, 200, 334, 390, 330, 220, 90],
                itemStyle: {
                    normal: {
                        color: function (params) {
                            var colorList = ['#BAA979', '#4BA1CD'];
                            if (params.dataIndex % 2 == 0) {
                                return colorList[0];
                            }
                            return colorList[1]
                        }
                    }
                }
            }
        ]
    };
    dom.setOption(option3);

}

//文献分布图
function wxfb(da){
    option8 = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            //orient: 'vertical',
            //x: '80%',
            //textStyle:{
            //    color:'#fff',
            //    fontSize:16,
            //},
            x: 'center',
            y:'bottom'
//            data:['专利','科技丛书','论文','会议','文集汇编','标准','期刊','科技报告']

        },
        calculable:true,
        series: [
            {
                name: '文献浏览',
                type: 'pie',
                radius: ['20%', '80%'],
                center: ['30%', '50%'],
                roseType: 'area',
                data:da
                //    [
                //    { value: 10, name: '专利' },
                //    { value: 10, name: '科技丛书' },
                //    { value: 10, name: '论文' },
                //    { value: 10, name: '会议' },
                //    { value: 10, name: '文集汇编' },
                //    { value: 10, name: '标准' },
                //    { value: 10, name: '期刊' },
                //    { value: 10, name: '科技报告' }
                //]
            }
        ]
    };
    proW.setOption(option8);

}
//data map
function dmap(d) {
    var data1 = new Array;
    for (var i = 0; i<d.length; i++) {
            data1[i] = {};
            data1[i]['name'] = d[i]['properties']['name'];
            data1[i]['value'] = 0;

    }
    return data1;
}

//dingshi shuaxin 
var coutr, proty, conOrp, prov2;
function setI() {
    //alert(1);
    if (conOrp == 'china') {
        var region = 'china', r = 'china';
        $('#ret').css('backgroundImage', 'url(./img/huizong.png)');
        $('#djl').css('backgroundImage', 'url(./img/2.png)');
        $('#jsl').css('backgroundImage', 'url(./img/4.png)');
        $('#ddl').css('backgroundImage', 'url(./img/3.png)');
        data2(region, r)
    } else {
        data2('province', conOrp, prov2);
    }
}
coutr = setInterval(setI,5*60*1000);
//proty = setInterval(setI,5*60*1000);

var data1;
//直辖市和特别行政区-只有二级地图，没有三级地图
var special = ["北京","天津","上海","重庆","香港","澳门"];
var mapdata = [];
//绘制全国地图
$.getJSON('js/map/china.json', function (data) { 
    data1=dmap(data.features);
    d = [];
    clearInterval(coutr);
	for( var i=0;i<data.features.length;i++ ){
		d.push({
			name:data.features[i].properties.name
		})
	}
	mapdata = d;
	var china = 'china';
	conOrp = 'china';
	//注册地图
	echarts.registerMap('china', data);
    //绘制地图
	data2(china,'china');
	//renderMap('china', de);
	//renderMap('china',d);
});

//地图点击事件
myMap.on('click', function (params) {
    //console.log( params );
    clearInterval(coutr);
    //清除 柱形图定时器 carousel
    clearTimeout(c);
    $('.success').addClass('test');
    setTimeout(function () {
        $('.authent').show().animate({ right: '-2%',top:'-2%' }, {
            easing: 'easeOutQuint',
    		duration: 600,
    		queue: false
    		});
    	$('.authent').animate({ opacity: 1 }, {
   		    duration: 200,
    		queue: false
    		}).addClass('visible');
    }, 500);

	if( params.name in provinces ){
		//如果点击的是34个省、市、自治区，绘制选中地区的二级地图
	    $.getJSON('js/map/province/' + provinces[params.name] + '.json', function (data) {
	        
	        data1 = dmap(data.features);
			echarts.registerMap( params.name, data);
			var d = [];
			for( var i=0;i<data.features.length;i++ ){
				d.push({
					name:data.features[i].properties.name
				})
			}
			var prov1 = provinces[params.name];
			if (prov1 == 'neimongol') {
			    prov1 = 'Nei Mongol';
			} else {
			    prov1 = prov1[0].substr(0, 1).toUpperCase() + prov1.substr(1, prov1.length);
			}
			conOrp = params.name;
			prov2 = prov1;
			if (params.name == '上海') {
			    conOrp = 'china';
			    var calu = setTimeout(function () { $('.authent').hide(); }, 500)
			    
			    $('.success').removeClass('test');
			} else {
			    data2('province', params.name, prov1);
			}
			//renderMap(params.name, data2(params.name));
		});
	//} else if (params.seriesName in provinces) {
	//	//如果是【直辖市/特别行政区】只有二级下钻
	//	if(  special.indexOf( params.seriesName ) >=0  ){
	//		renderMap('china',mapdata);
	//	}else{
	//		//显示县级地图
	//		$.getJSON('js/map/city/'+ cityMap[params.name] +'.json', function(data){
	//			echarts.registerMap( params.name, data);
	//			var d = [];
	//			for( var i=0;i<data.features.length;i++ ){
	//				d.push({
	//					name:data.features[i].properties.name
	//				})
	//			}
	//			renderMap(params.name, data2(params.name));
	//		});
	//	}
	} else {
	    data1 = data3;
	    conOrp = 'china';
	    clearInterval(proty);
	    data2('china', 'china');
	    //renderMap('china', data2(params.name));
	}
});

// eg1: start
var coldata = [
{ start: 1, end: 1, label: '北京', color: '#cfc5de' },
{ start: 2, end: 2, label: '天津', color: '#f1ebd1' },
{ start: 3, end: 3, label: '上海', color: '#feffdb' },
{ start: 4, end: 4, label: '重庆', color: '#e0cee4' },
{ start: 5, end: 5, label: '河北', color: '#fde8cd' },
{ start: 6, end: 6, label: '河南', color: '#e4f1d7' },
{ start: 7, end: 7, label: '云南', color: '#fffed7' },
{ start: 8, end: 8, label: '辽宁', color: '#e4f1d7' },
{ start: 9, end: 9, label: '黑龙江', color: '#e4f1d7' },
{ start: 10, end: 10, label: '湖南', color: '#fffed7' },
{ start: 11, end: 11, label: '安徽', color: '#fffed8' },
{ start: 12, end: 12, label: '山东', color: '#dccee7' },
{ start: 13, end: 13, label: '新疆', color: '#fffed7' },
{ start: 14, end: 14, label: '江苏', color: '#fce8cd' },
{ start: 15, end: 15, label: '浙江', color: '#ddceeb' },
{ start: 16, end: 16, label: '江西', color: '#e4f1d3' },
{ start: 17, end: 17, label: '湖北', color: '#fde8cd' },
{ start: 18, end: 18, label: '广西', color: '#fde8cd' },
{ start: 19, end: 19, label: '甘肃', color: '#fde8cd' },
{ start: 20, end: 20, label: '山西', color: '#fffdd6' },
{ start: 21, end: 21, label: '内蒙古', color: '#ddcfe6' },
{ start: 22, end: 22, label: '陕西', color: '#fad8e9' },
{ start: 23, end: 23, label: '吉林', color: '#fce8cd' },
{ start: 24, end: 24, label: '福建', color: '#fad8e8' },
{ start: 25, end: 25, label: '贵州', color: '#fad8e8' },
{ start: 26, end: 26, label: '广东', color: '#ddcfe8' },
{ start: 27, end: 27, label: '青海', color: '#fad8e9' },
{ start: 28, end: 28, label: '西藏', color: '#ddcfe6' },
{ start: 29, end: 29, label: '四川', color: '#e4f1d5' },
{ start: 30, end: 30, label: '宁夏', color: '#fefcd5' },
{ start: 31, end: 31, label: '海南', color: '#fad8e9' },
{ start: 32, end: 32, label: '台湾', color: '#fce8cd' },
{ start: 33, end: 33, label: '香港', color: '#dc9bbb' },
{ start: 34, end: 34, label: '澳门', color: '#e0f7cc' }]

// eg1: end

var maxv = 35;

//colorTrans
var data3 = [
{ name: '北京', value: 0 },
{ name: '天津',  value: 0 },
{ name: '上海', value: 0 },
{ name: '重庆', value: 0 },
{ name: '河北', value: 0 },
{ name: '河南',  value: 0 },
{ name: '云南', value: 0 },
{ name: '辽宁', value: 0 },
{ name: '黑龙江', value: 0 },
{ name: '湖南', value: 0 },
{ name: '安徽', value: 0 },
{ name: '山东', value: 0 },
{ name: '新疆', value: 0 },
{ name: '江苏', value: 0 },
{ name: '浙江', value: 0 },
{ name: '江西', value: 0 },
{ name: '湖北', value: 0 },
{ name: '广西', value: 0 },
{ name: '甘肃', value: 0 },
{ name: '山西', value: 0 },
{ name: '内蒙古', value: 0 },
{ name: '陕西', value: 0 },
{ name: '吉林', value: 0 },
{ name: '福建', value: 0 },
{ name: '贵州', value: 0 },
{ name: '广东', value: 0 },
{ name: '青海', value: 0 },
{ name: '西藏', value: 0 },
{ name: '四川', value: 0 },
{ name: '宁夏', value: 0 },
{ name: '海南', value: 0 },
{ name: '台湾', value: 0 },
{ name: '香港', value: 0 },
{ name: '澳门', value: 0 }
]//各省地图颜色数据依赖value

//toString(16);parseInt(x,16)

function transCol(data) {
    //option.dataRange.color = new Array;
    var jsonD = [];
    var color1, color2;
    maxv = 0;
    
    for (var j = 0; j < data.length; j++) {
        if (maxv < data[j]['value'])
            maxv = data[j]['value'];
    }
    var min = maxv;
    for (var i = 0; i < data1.length; i++) {
       
        for (var j = 0; j < data.length; j++) {
            if (data1[i]['name'] == data[j]['name']) {
                data1[i]['value'] = data[j]['value'];
            }
        }
        if (min > data1[i]['value'])
            min = data1[i]['value'];
    }
    if (maxv == 0) {
        maxv = 1;
    }
    var g = 255;
    var b = 255;
    var r = 0;//Math.round
    r = Math.round(r + min / maxv * 200);
    g = Math.round(g - min / maxv * 255);
    b = Math.round(b - min / maxv * 255);
    //        icoldata[i].color = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    //jsonD[i].color = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    color1 = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    r = Math.round(r + maxv / maxv * 200);
    g = Math.round(g - maxv / maxv * 255);
    b = Math.round(b - maxv / maxv * 255);
    color2 = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    option.dataRange.color = [color2, color1]
    if (maxv >= 10) {
        for (var i = 0; i < 12; i++) {
            jsonD[i] = {};
            if(i==0)
                jsonD[i].start = maxv;
            else if (i == 11) {
                jsonD[i].start = -1;
                jsonD[i].end = jsonD[i-1].start;//min
            } else {
                jsonD[i].start = maxv - Math.round((1 / 10) * maxv) * i;//Math.round((maxv - min) / 10) * (i + 1)
                jsonD[i].end = jsonD[i-1].start;
            }
            //jsonD[i].end = maxv - Math.round((maxv - min) / 10) * (i + 1);
            // jsonD[i].label = data1[i]['name'];
        }
    } else {
        for (var i = 0; i <= 10; i++) {
            jsonD[i] = {};
            jsonD[i].start = 10 - i - 1;
            jsonD[i].end = 10 - i;
            // jsonD[i].label = data1[i]['name'];
        }
        //jsonD[10]
    }

    //for (var i = 0; i < 10; i++) {
    //    jsonD[i] = {};
    //    jsonD[i].start = i;
    //    jsonD[i].end = i;
    //   // jsonD[i].label = data1[i]['name'];
        
        
       

    //}
    return jsonD;
    //for (var j = 0; j < data.length; j++) {
    //    for (var i = 0; i < icoldata.length; i++) {
    //        if (data[j].name == icoldata[i].label) {
    //            var g = 255;
    //            var b = 255;
    //            var r = 0;//Math.round
    //            r = Math.round(r + data[j].value / maxv * 200);
    //            g = Math.round(g - data[j].value / maxv * 255);
    //            b = Math.round(b - data[j].value / maxv * 255);
    //            icoldata[i].color = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    //            break;
    //        }
    //    }
    }
    //option.dataRange.splitList=icoldata;
    //for (i in icoldata) {
    //    i.color = '#ddcfe6';
    //}
    //return icoldata;
    //for (var i = 0; i, data.length; i++) {
    //    for (a in data[i]) {
    //        //console.log(data[i][a]);
    //    }
    //}
//}

//transCol(data1, coldata);
//初始化绘制全国地图配置
var option = {
	//backgroundColor: '#000',
    title : {
        //text: 'Echarts3 中国地图下钻至县级',
        //subtext: '三级下钻',
        //link:'http://www.ldsun.com',
        left: 'center',
        textStyle:{
            color: '#fff',
            fontSize:16,
            fontWeight:'normal',
            fontFamily:"Microsoft YaHei"
        },
        subtextStyle:{
        	color: '#ccc',
            fontSize:16,
            fontWeight:'normal',
            fontFamily:"Microsoft YaHei"
        }
    },
    //dataRange: {
    //    show: false,
    //    min: 0,
    //    max: '',
    //    splitNumber: 0,
    //    //color: ['#09366a', '#4c88cd']
    //},
    tooltip: {
        trigger: 'item',
        //formatter: '{b}'

        formatter: function (params) {
            var res = params.name + '<br/>';
            var myseries = option.series;
            for (var i = 0; i < myseries.length; i++) {
                for (var j = 0; j < myseries[i].data.length; j++) {
                    if (myseries[i].data[j].name == params.name) {
                        res += myseries[i].name + ' : ' + myseries[i].data[j].value + '</br>';
                    }
                }
            }
            return res;
        }
    },
    //legend: {
    //    //show: false,
    //    orient: 'vertical',
    //    left: 'left',
    //    data: ['检索量', '浏览量', '全文请求量']
    //},

    dataRange: {
        x: '-1000px',//图例横轴位置
        y: '-1000px',//图例纵轴位置
        //splitList: transCol(data1)
    },
    //toolbox: {
    //    show: true,
    //    orient: 'vertical',
    //    left: 'right',
    //    top: 'center',
    //    feature: {
    //        dataView: {readOnly: false},
    //        restore: {},
    //        saveAsImage: {}
    //    },
    //    iconStyle:{
    //    	normal:{
    //    		color:'#fff'
    //    	}
    //    }
    //},
    //animationDuration:1000,
    //animationEasing:'cubicOut',
    //animationDurationUpdate:1000
     
};
function regDate(data) {
    var regD = new Array;
    for (var i = 0; i < data1.length; i++) {
        regD[i] = {};
        regD[i]['name'] = data1[i]['name'];
        regD[i]['value'] = 0;
    };
    if (data.length > 0) {
        for (var j = 0; j < regD.length; j++) {

            for (var k = 0; k < data.length; k++) {
                if (regD[j]['name'] == data[k]['name']) {
                    regD[j]['value'] = data[k]['value'];
                }
            }
        };
    };
    return regD;

}
function repair(data, d) {
    //var dataTwo = data1;
    //var dataThr = data1;
    if (d == 1) {
        var dataOne = new Array;
        for (var i = 0; i < data1.length; i++) {
            dataOne[i] = {};
            dataOne[i]['name'] = data1[i]['name'];
            dataOne[i]['value'] = 0;
        };
        for (var i = 0; i < dataOne.length; i++) {

            for (var j = 0; j < data.length; j++) {
                if (dataOne[i]['name'] == data[j]['name']) {
                    dataOne[i]['value'] = data[j]['value'];
                }
            }
        }
        if (dataOne == undefined || dataOne.length == 0) { dataOne = [];}
        return dataOne;
    };
    if (d == 2) {
        var dataTwo = new Array;
        for (var i = 0; i < data1.length; i++) {
            dataTwo[i] = {};
            dataTwo[i]['name'] = data1[i]['name'];
            dataTwo[i]['value'] = 0;
        };

        for (var i = 0; i < dataTwo.length; i++) {

            for (var j = 0; j < data.length; j++) {
                if (dataTwo[i]['name'] == data[j]['name']) {
                    dataTwo[i]['value'] = data[j]['value'];
                }
            }
        };
        if (dataTwo == undefined || dataTwo.length == 0) { dataTwo = []; }
        return dataTwo;
    };
    if (d == 3) {
        var dataThr=new Array;
        for (var i = 0; i < data1.length; i++) {
            dataThr[i] = {};
            dataThr[i]['name'] = data1[i]['name'];
            dataThr[i]['value'] = 0;
        };
        for (var i = 0; i < dataThr.length; i++) {

            for (var j = 0; j < data.length; j++) {
                if (dataThr[i]['name'] == data[j]['name']) {
                    dataThr[i]['value'] = data[j]['value'];
                }
            }
        };
        if (dataThr == undefined || dataThr.length == 0) { dataThr = []; }
        return dataThr;
    };

}
function colcount(a, b, c) {
    //先做一个空对象；全为0的对象；
    var colDa = new Array;
    for (var i = 0; i < data1.length; i++) {
        colDa[i] = {};
        colDa[i]['name'] = data1[i]['name'];
        colDa[i]['value'] = 0;
    };
    if (a.length != 0) {
        for (var x = 0; x < colDa.length; x++) {
            for (var aa = 0; aa < a.length; aa++) {
                if (colDa[x]['name'] == a[aa]['name']) {
                    colDa[x]['value'] += a[aa]['value'];
                }
            }
        }
    };
    if (b.length != 0) {
        for (var y = 0; y < colDa.length; y++) {
            for (var bb = 0; bb < b.length; bb++) {
                if (colDa[y]['name'] == b[bb]['name']) {
                    colDa[y]['value'] += b[bb]['value'];
                }
            }
        }
    };
    if (c.length != 0) {
        for (var z = 0; z < colDa.length; z++) {
            for (var cc = 0; cc < c.length; cc++) {
                if (colDa[z]['name'] == c[cc]['name']) {
                    colDa[z]['value'] += c[cc]['value'];
                }
            }
        }
    };

    return colDa;

}
function renderMap(map, data,data22,data33) {
    console.log(data);
    if (map == 'china') {
        var chMap = '中国';
    } else {
        var chMap = map;
    }
    var ee = colcount(data, data22, data33);
    option.title.subtext = chMap;
    option.dataRange.splitList = transCol(ee);
    //var data22 = repair(data22);
    //var data33 = transCol(data33);
    option.series = [ 
		{
            name: '检索量',
            type: 'map',
            mapType: map,
            roam: true,
            nameMap:{
			    'china':'中国'
			},
            label: {
                normal:{
                    show:true,
                    textStyle:{
                        color:'#999',
                        fontSize:13
                    }
                },
                emphasis: {
                    show: true,
                    textStyle:{
                        color:'#fff',
                        fontSize:13
                    }
                },

            },
            top: '14%',
            left: '8%',

            data:repair(data,1)

		},
        		{
        		    name: '浏览量',
        		    type: 'map',
        		    mapType: map,
        		    roam: true,
        		    nameMap: {
        		        'china': '中国'
        		    },
        		    label: {
        		        normal: {
        		            show: true,
        		            textStyle: {
        		                color: '#999',
        		                fontSize: 13
        		            }
        		        },
        		        emphasis: {
        		            show: true,
        		            textStyle: {
        		                color: '#fff',
        		                fontSize: 13
        		            }
        		        },

        		    },
        		    top: '14%',
        		    left: '8%',

        		    //itemStyle: {
        		    //    normal: {
        		    //        //areaColor: '#323c48',
        		    //        //borderColor: 'dodgerblue'
        		    //        //areaColor: '#0cc0e1',//0cc0e1
        		    //        borderColor:'#000000',
        		    //        shadowColor: 'rgba(0, 0, 0, 0.6)',
        		    //        shadowBlur: 50,
        		    //        shadowOffsetX:5,
        		    //        shadowOffsetY:5
        		    //    },
        		    //    emphasis: {
        		    //        //areaColor: 'darkorange'
        		    //        //areaColor: '#a6c84c'//a6c84c
        		    //    },

        		    //},
        		    data: repair(data22,2)

        		},
                		{
                		    name: '全文请求量',
                		    type: 'map',
                		    mapType: map,
                		    roam: true,
                		    nameMap: {
                		        'china': '中国'
                		    },
                		    label: {
                		        normal: {
                		            show: true,
                		            textStyle: {
                		                color: '#999',
                		                fontSize: 13
                		            }
                		        },
                		        emphasis: {
                		            show: true,
                		            textStyle: {
                		                color: '#fff',
                		                fontSize: 13
                		            }
                		        },

                		    },
                		    top: '14%',
                		    left: '8%',

                		    //itemStyle: {
                		    //    normal: {
                		    //        //areaColor: '#323c48',
                		    //        //borderColor: 'dodgerblue'
                		    //        //areaColor: '#0cc0e1',//0cc0e1
                		    //        borderColor:'#000000',
                		    //        shadowColor: 'rgba(0, 0, 0, 0.6)',
                		    //        shadowBlur: 50,
                		    //        shadowOffsetX:5,
                		    //        shadowOffsetY:5
                		    //    },
                		    //    emphasis: {
                		    //        //areaColor: 'darkorange'
                		    //        //areaColor: '#a6c84c'//a6c84c
                		    //    },

                		    //},
                		    data: repair(data33,3)

                		},
    ];
    //渲染地图
    myMap.setOption(option,true);
}

function renderMap1(map, data,t) {
    console.log(data);
    if (map == 'china') {
        var chMap = '中国';
    } else {
        var chMap = map;
    }
    option.title.subtext = chMap;
    option.dataRange.splitList = transCol(data);
    //var data22 = repair(data22);
    //var data33 = transCol(data33);
    option.series = [
		{
		    name: t,
		    type: 'map',
		    mapType: map,
		    roam: true,
		    nameMap: {
		        'china': '中国'
		    },
		    label: {
		        normal: {
		            show: true,
		            textStyle: {
		                color: '#999',
		                fontSize: 13
		            }
		        },
		        emphasis: {
		            show: true,
		            textStyle: {
		                color: '#fff',
		                fontSize: 13
		            }
		        },

		    },
		    top: '14%',
		    left: '8%',

		    //itemStyle: {
		    //    normal: {
		    //        //areaColor: '#323c48',
		    //        //borderColor: 'dodgerblue'
		    //        //areaColor: '#0cc0e1',//0cc0e1
		    //        borderColor:'#000000',
		    //        shadowColor: 'rgba(0, 0, 0, 0.6)',
		    //        shadowBlur: 50,
		    //        shadowOffsetX:5,
		    //        shadowOffsetY:5
		    //    },
		    //    emphasis: {
		    //        //areaColor: 'darkorange'
		    //        //areaColor: '#a6c84c'//a6c84c
		    //    },

		    //},
		    data: regDate(data)

		},
    ];
    //渲染地图
    myMap.setOption(option, true);
}
