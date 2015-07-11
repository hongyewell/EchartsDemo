function ListInit() {
    var myUrl = "ajax/test001.aspx";
    $.getJSON(myUrl, {}, onGetList);
}

function onGetList(myJsonObject) {
    
    WriteList(myJsonObject[0]);

}

function WriteList(myJsonObject){
    var x = new Array();
    var y = new Array();

    if (myJsonObject.Info.length > 0) {



        for (var i = 0; i < myJsonObject.Info.length ; i++ ){
          
            var myObj = myJsonObject.Info[i];
            x[i] = myObj.CName;
            y[i] = myObj.CNumber;
       
            //// 路径配置
            require.config({
                paths: {
                    echarts: 'http://echarts.baidu.com/build/dist'
                }
            });

            // 使用
            require(
              [
                'echarts',
                'echarts/chart/bar', // 使用柱状图就加载bar模块，按需加载
              ],
              function (ec) {
                  // 基于准备好的dom，初始化echarts图表
                  var myChart = ec.init(document.getElementById('main'));              
                  //设置数据
                  var option = {
                      //设置标题
                      title: {
                          text: '农资交易销量图',
                          subtext: '数据纯属模拟'
                      },
                      //设置提示
                      tooltip: {
                          show: true
                      },
                      //设置图例
                      legend: {
                          data: ['销量']
                      },
                      //设置坐标轴
                      xAxis: [
                        {
                            type: 'category',
                            data: x,
                        }
                      ],
                      yAxis: [
                        {
                            type: 'value'
                        }
                      ],
                      //设置数据
                      series: [
                        {
                            "name": "销量",
                            "type": "bar",
                            "data": y,
                        }
                      ]
                  };

                  // 为echarts对象加载数据 
                  myChart.setOption(option);
              }



            );

        }     

    }


}