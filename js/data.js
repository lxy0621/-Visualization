$(function ($) {

    //新冠疫情实时数据
    function getCoronaData() {

        $.ajax({
            method: 'GET',
            url: 'https://tianqiapi.com/api',
            data: {
                version: 'epidemic',
                appid: '23035354',
                appsecret: '8YvlPNrz'
            },
            success: function (res) {
                // console.log(res)
                $('<span>确诊：' + res.data.diagnosed + '例</span>&ensp;&ensp;<span>治愈：' + res.data.cured + '例</span>&ensp;&ensp;<span>死亡：' + res.data.death + '例</span>').appendTo('.xg_titledata');
                $('<span>截止时间：' + res.data.date + '</span>').appendTo('.xg_titletime');
                var data = res.data.area
                $.each(data, function (i, item) {
                    $('<li><span>' + item.preProvinceName + '</span><span>' + item.confirmedCount + '</span><span>' + item.curedCount + '</span><span>' + item.deadCount + '</span></li>').appendTo('.xgdata ul');
                })
                $(".xgdata").textSlider({
                    speed: 60, //数值越大，速度越慢
                    line: 3 //触摸翻滚的条数
                });
            }
        })
    };
    getCoronaData();


    //接入医院数量
    var hospitalData = {
        totalHospital: 3024,
        level1Hopsital: 524,
        level2Hopsital: 1528,
        level3Hopsital: 972,
    }
    function getHospitalData() {
        var data = hospitalData;
        document.querySelector('.totalHopsital').append(data.totalHospital);
        document.querySelector('.level1').append(data.level1Hopsital);
        document.querySelector('.level2').append(data.level2Hopsital);
        document.querySelector('.level3').append(data.level3Hopsital);
    };
    getHospitalData();

    // 精准扶贫会诊数据统计折线图
    function getPovertyAlleviationData() {

        var myChart = echarts.init(document.querySelector('.pover .chart1'));

        var option = {

            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['2017年', '2018年', '2019年', '2020年']
            },
            grid: {
                left: '0%',
                right: '0%',
                bottom: '2%',
                containLabel: true,
                show: true,
                borderColor: '#012f4a'
            },
            legend: {
                textStyle: {
                    color: '#cbffff'
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: '#cbffff'
                }
            },
            yAxis: {
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: '#cbffff'
                }
            },
            series: [
                {
                    name: '2017年',
                    type: 'line',
                    stack: '总量',
                    data: [120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 210]
                },
                {
                    name: '2018年',
                    type: 'line',
                    stack: '总量',
                    data: [220, 182, 191, 234, 290, 330, 310, 90, 230, 210, 101, 134]
                },
                {
                    name: '2019年',
                    type: 'line',
                    stack: '总量',
                    data: [150, 232, 201, 154, 190, 330, 410, 232, 201, 154, 190, 330]
                },
                {
                    name: '2020年',
                    type: 'line',
                    stack: '总量',
                    data: [320, 332, 301, 334, 390, 330, 320, 234, 290, 330, 310, 90]
                }
            ]
        };

        myChart.setOption(option);
        window.addEventListener('resize', function () {
            myChart.resize()
        })
    }
    getPovertyAlleviationData()

    // 五年内会诊数据统计

    function getFiveYearData() {
        var myChart = echarts.init(document.querySelector('.fiveYear .chart2'));
        option = {
            legend: {},
            grid: {
                left: '0%',
                right: '0%',
                bottom: '2%',
                containLabel: true,
                show: true,
                borderColor: '#012f4a'
            },
            legend: {
                textStyle: {
                    color: '#cbffff'
                }
            },
            tooltip: {},
            dataset: {
                dimensions: ['product', '远程会诊', '远程病理', '远程影像'],
                source: [
                    { product: '2017', '远程会诊': 2232, '远程病理': 1037, '远程影像': 9506 },
                    { product: '2018', '远程会诊': 5377, '远程病理': 3150, '远程影像': 22907 },
                    { product: '2019', '远程会诊': 8694, '远程病理': 5112, '远程影像': 37372 },
                    { product: '2020', '远程会诊': 9171, '远程病理': 5327, '远程影像': 44301 }
                ]
            },
            xAxis: {
                type: 'category',
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: '#cbffff'
                }
            },
            yAxis: {
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: '#cbffff'
                }
            },
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' }
            ]
        }
        myChart.setOption(option);
        window.addEventListener('resize', function () {
            myChart.resize()
        })
    }
    getFiveYearData()

    //区内会诊实时数据信息
    var inDistrict = [
        { id: 1, hospital: '北京医科大学附属医院', address: '内蒙古呼和浩特', personal: '赵芳', gender: '女士', disease: '脚气' },
        { id: 2, hospital: '中山大学附属眼科医院', address: '内蒙古通辽', personal: '李三', gender: '先生', disease: '牛皮癣' },
        { id: 3, hospital: '首都医科大学附属北京友谊医院', address: '内蒙古赤峰', personal: '赵四', gender: '先生', disease: '鼻炎' },
        { id: 4, hospital: '复旦大学附属中山医院', address: '内蒙古乌兰察布', personal: '孙茜', gender: '女士', disease: '白带异常' },
        { id: 5, hospital: '中国人名解放军总医院', address: '内蒙古鄂尔多斯', personal: '张宇', gender: '先生', disease: '鼻炎' },
        { id: 6, hospital: '中山大学附属第一医院', address: '内蒙古鄂尔多斯', personal: '武静', gender: '女士', disease: '子宫内膜炎' },
        { id: 7, hospital: '北京大学人民医院', address: '内蒙古包头', personal: '王倩茜', gender: '女士', disease: '胰腺炎' },
        { id: 8, hospital: '北京大学第一医院', address: '内蒙古赤峰', personal: '张凯', gender: '先生', disease: '膀胱肿大' },
        { id: 9, hospital: '中山大学附属第一医院', address: '内蒙古呼伦贝尔', personal: '张超', gender: '先生', disease: '牛皮癣' },
        { id: 10, hospital: '中国医科学院肿瘤医院', address: '内蒙古乌兰察布', personal: '刘余', gender: '先生', disease: '肠胃炎' },
        { id: 11, hospital: '北京大学人名医院', address: '内蒙古呼和浩特', personal: '马飞飞', gender: '先生', disease: '腰间盘突出' },
        { id: 12, hospital: '上海交通大学附属胸科医院', address: '山西乌海', personal: '吴三三', gender: '先生', disease: '前列腺炎' },
        { id: 13, hospital: '复旦大学附属中山医院', address: '内蒙古乌兰察布', personal: '赵雯雯', gender: '女士', disease: '脚气' },
        { id: 14, hospital: '北京中日友好医院', address: '内蒙古通辽', personal: '孙琴', gender: '女士', disease: '胃炎' },
        { id: 15, hospital: '北京中日友好医院', address: '内蒙古满洲里', personal: '张玉宝', gender: '先生', disease: '胰腺炎' },
        { id: 16, hospital: '北京协和医院', address: '内蒙古呼伦贝尔', personal: '李小玉', gender: '女士', disease: '胆囊炎' },
        { id: 17, hospital: '天津医科大学总医院', address: '内蒙古乌兰察布', personal: '李勋', gender: '先生', disease: '肠胃炎' },
        { id: 18, hospital: '四川大学附属医院', address: '内蒙古乌兰察布', personal: '王娜娜', gender: '女士', disease: '脱发' },
        { id: 19, hospital: '重庆人名医院', address: '内蒙古呼和浩特', personal: '张紫玉', gender: '女士', disease: '骨质增生' },
        { id: 20, hospital: '同济大学附属上海市肺科医院', address: '内蒙古包头', personal: '白静', gender: '女士', disease: '肩周炎' }
    ]
    function proinList() {
        var proinData = inDistrict;
        $.each(proinData, function (i, item) {
            $('<li><span>' + item.hospital + '</span>对<span>' + item.address + '</span><span>' + item.personal + '</span><span>' + item.gender + '</span>的<span>' + item.disease + '</span>进行会诊</li>').appendTo('.proin ul')
        })
    }
    proinList();

    //区外会诊实时数据信息
    var outDistrict = [
        { id: 1, hospital: '北京医科大学附属医院/外科/皮肤科', address: '内蒙古呼和浩特', personal: '乌兰托娅琪琪格乐', gender: '女士', disease: '脚气' },
        { id: 2, hospital: '中山大学附属眼科医院', address: '内蒙古通辽', personal: '李三', gender: '先生', disease: '牛皮癣' },
        { id: 3, hospital: '首都医科大学附属北京友谊医院', address: '内蒙古赤峰', personal: '赵四', gender: '先生', disease: '鼻炎' },
        { id: 4, hospital: '复旦大学附属中山医院', address: '宁夏银川', personal: '孙茜', gender: '女士', disease: '白带异常' },
        { id: 5, hospital: '中国人名解放军总医院', address: '新疆吐鲁番', personal: '张宇', gender: '先生', disease: '鼻炎' },
        { id: 6, hospital: '中山大学附属第一医院', address: '新疆阿克苏', personal: '武静', gender: '女士', disease: '子宫内膜炎' },
        { id: 7, hospital: '北京大学人民医院', address: '海南三亚', personal: '王倩茜', gender: '女士', disease: '胰腺炎' },
        { id: 8, hospital: '北京大学第一医院', address: '沈阳铁岭', personal: '张凯', gender: '先生', disease: '膀胱肿大' },
        { id: 9, hospital: '中山大学附属第一医院', address: '安徽芜湖', personal: '张超', gender: '先生', disease: '牛皮癣' },
        { id: 10, hospital: '中国医科学院肿瘤医院', address: '四川成都', personal: '刘余', gender: '先生', disease: '肠胃炎' },
        { id: 11, hospital: '北京大学人名医院', address: '广西贵港', personal: '马飞飞', gender: '先生', disease: '腰间盘突出' },
        { id: 12, hospital: '上海交通大学附属胸科医院', address: '山西太原', personal: '吴三三', gender: '先生', disease: '前列腺炎' },
        { id: 13, hospital: '复旦大学附属中山医院', address: '甘肃天水', personal: '赵雯雯', gender: '女士', disease: '脚气' },
        { id: 14, hospital: '北京中日友好医院', address: '山西榆林', personal: '孙琴', gender: '女士', disease: '胃炎' },
        { id: 15, hospital: '北京中日友好医院', address: '山西安康', personal: '张玉宝', gender: '先生', disease: '胰腺炎' },
        { id: 16, hospital: '北京协和医院', address: '内蒙古鄂尔多斯', personal: '李小玉', gender: '女士', disease: '胆囊炎' },
        { id: 17, hospital: '天津医科大学总医院', address: '内蒙古乌兰察布', personal: '李勋', gender: '先生', disease: '肠胃炎' },
        { id: 18, hospital: '四川大学附属医院', address: '四川南充', personal: '王娜娜', gender: '女士', disease: '脱发' },
        { id: 19, hospital: '重庆人名医院', address: '海南海口', personal: '张紫玉', gender: '女士', disease: '骨质增生' },
        { id: 20, hospital: '同济大学附属上海市肺科医院', address: '四川宜宾', personal: '白静', gender: '女士', disease: '肩周炎' }
    ]
    function prooutList() {
        var prooutData = outDistrict;
        $.each(prooutData, function (i, item) {
            $('<li><span>' + item.hospital + '</span>对<span>' + item.address + '</span><span>' + item.personal + '</span><span>' + item.gender + '</span>的<span>' + item.disease + '</span>进行会诊</li>').appendTo('.proout ul')
        })
    }
    prooutList();

})