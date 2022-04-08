var ws = new WebSocket('wss://stream.binance.com/stream');

ws.onopen = function () {
    console.log('websocket is connected ...')
    ws.send('{"method":"SUBSCRIBE","params":["!miniTicker@arr@1000ms"],"id":1}');
}

ws.onmessage = function (ev) {
    // console.log(ev);
    // document.getElementById('streamData').innerHTML = ev.data;
    const pairRanking = [
        "BTCUSDT","ETHUSDT","BNBUSDT","SOLUSDT","XRPUSDT","ADAUSDT","LUNAUSDT","AVAXUSDT","DOTUSDT","DOGEUSDT","SANDUSDT"
    ].reverse();
    const data = JSON.parse(ev.data).data.sort(function(a, b){return b.c-a.c}); // sort by latrgest price
    const dataR = data.sort((a, b) => pairRanking.indexOf(b.s) - pairRanking.indexOf(a.s)); // sort by pairRanking name
    let content = dataR.map(function (item) {
      return ("<div class='col col-sm-4 col-xs-6 col-md-3 col-lg-2'><div class='border border-info rounded p-2'><h2>" + item.s + "</h2><p>" + item.c + "</p><label>"+ ((item.o - item.c)/(item.c*(100/100))).toString().slice(0,5) +"%</label></div></div>");
    });
    document.getElementById("streamData").innerHTML = content.toString().replaceAll(",","");
};