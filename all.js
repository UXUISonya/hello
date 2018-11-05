//statusCount：五種處理狀態
//zipCount：高雄地方區域
//zipArea：「選擇」地方
//statusArea：「選擇」處理狀態
//zipCase：目前有「XXX筆」區域的案件
//statusCase：目前有「XXX筆」處理完成的案件



var xhr = new XMLHttpRequest();
xhr.open('get', "https://work1999.kcg.gov.tw/open1999/ServiceRequestsQuery.asmx/ServiceRequestsQuery", true);

xhr.send();
xhr.onload = function () {
  
var data = JSON.parse(xhr.responseText);
var statusArea = document.querySelector('#statusArea');
var totalStatus = {};
var totalZip = {};
var statusCount = [];
var zipCount = [];


var str = '總共有' + data.length + '筆資料';
  document.querySelector('.statusCase').innerHTML = str;
  document.querySelector('.zipCase').innerHTML = str;



for (var i = 0; i < data.length; i++) {
  
//StatusName_
var statusContent = data[i].StatusName_
if (totalStatus[statusContent] == undefined) {
   totalStatus[statusContent] = 1;
   statusCount.push(statusContent)
}
else {
   totalStatus[statusContent] += 1;
}

//ZipName_
var zipContent = data[i].ZipName_
if (totalZip[zipContent] == undefined) {
   totalZip[zipContent] = 1;
   zipCount.push(zipContent)
}
else {
  totalZip[zipContent] += 1;
}
}

  
  
  
  
  
  
//算Status和Zip的數量
var status = 'work1999：共有'+statusCount.length+'種處理狀態' 
var zip = 'work1999：共有'+zipCount.length +'個區域'
   document.querySelector('.statusCount').innerHTML = status
   document.querySelector('.zipCount').innerHTML = zip
            

   
//列出處理狀態(Status)
var statusStr = '<option value="全部">全部</option>'
for (var i = 0; i < statusCount.length; i++) {
   statusStr += '<option value=' + statusCount[i] + '>' + statusCount[i] + '</option>'
}
   document.querySelector('#statusArea').innerHTML = statusStr;
   statusArea.addEventListener('change', function (e) {

//可選擇目前處理狀態(Status)
if (statusArea.value == "全部") {
var str = '總共work1999有' + data.length + '筆資料';
   document.querySelector('.statusCase').innerHTML = str;
} else {
for (var i = 0; i < statusCount.length; i++) {

//選擇之目前處理狀態總和(Status)
if (statusArea.value == statusCount[i]) {
   str = '目前[work1999]有' + totalStatus[statusArea.value] + '筆' + statusArea.value + '的案件'
   document.querySelector('.statusCase').innerHTML = str;
}
}
}
})

   

//列出地方區域(Zip)
var zipStr = '<option value="全部">全部</option>'
for (var i = 0; i < zipCount.length; i++) {
   zipStr += '<option value=' + zipCount[i] + '>' + zipCount[i] + '</option>'
}
   document.querySelector('#zipArea').innerHTML = zipStr;
   zipArea.addEventListener('change', function (e) {

//可選擇目前地方區域(Zip)
if (zipArea.value == "全部") {
var str = '總共work1999有' + data.length + '筆資料';
   document.querySelector('.zipCase').innerHTML = str;
} else {
for (var i = 0; i < zipCount.length; i++) {

//選擇之目前地方區域總和(Zip)
if (zipArea.value == zipCount[i]) {
   str = '目前[work1999]有' + totalZip[zipArea.value] + '筆' + zipArea.value + '的案件'
   document.querySelector('.zipCase').innerHTML = str;
}
}
}
})
}; 