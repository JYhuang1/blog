/**
 * Created by henry on 2016/1/2.
 */


$(".banner").on("click",function(){
    $(this).children('ul').toggle();
});

//var server = "http://localhost:8080/blog/";
var server = "http://115.28.33.164:8080/blog/";
var param = {};
function selectByTag(tag){
    param['dataJson'] = JSON.stringify({tag:tag});
    $.post(server+"selectByTag",param,function(data){
        console.log(data);
        var dataJson = $.parseJSON(data);
        if (dataJson.status == 0){
            var num = dataJson.data.length;
            for(var i=0;i<num;i++){
                $('#content').append(
                    "<div style='border-bottom: 1px solid #eeeeee;margin-bottom: 15px'>"+
                    "<h2><a href='detail.html'>"+dataJson.data[i].title+"</a></h2>"+
                    "<span>T: </span><span>"+dateToString(dataJson.data[i].createTime)+"</span><span style='margin-left: 20px'>comment: </span><span>"+dataJson.data[i].comments+"</span>"+
                    "<p style='margin-top: 5px;margin-bottom: 5px'>"+dataJson.data[i].brief+"</p>"+
                    "</div>"
                );
            }
        }else{
            alert(dataJson.message);
        }
    })
}

function dateToString(longDate){
    var date = new Date(longDate);
    month = date.getMonth()+1;
    var returnDate = date.getFullYear()+"年"+month+"月"+date.getDate()+"日";
    return returnDate;
}