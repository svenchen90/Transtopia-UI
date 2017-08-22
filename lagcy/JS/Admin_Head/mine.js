/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var timoutWarning = 1200000; // Display warning in 14 Mins.
var timoutNow = 30000; // Warning has been shown, give the user 1 minute to interact

var warningTimer;
var timeoutTimer;
function StartWarningTimer() {
    warningTimer = setTimeout("IdleWarning()", timoutWarning);
}

// Reset timers.
function ResetTimeOutTimer() {
    $("#myModal_main").modal("hide");
    clearTimeout(timeoutTimer);
    StartWarningTimer();

}

// Show idle timeout warning dialog.
function IdleWarning() {
    clearTimeout(warningTimer);
    timeoutTimer = setTimeout("IdleTimeout()", timoutNow);
    //$("#myModal_main").modal();
    $('#myModal_main').modal({backdrop: 'static', keyboard: false});
}


// Logout the user.
function IdleTimeout() {
    logOut();
}
//function to fix height of iframe!
var calcHeight = function () {
    var headerDimensions = $('.admin_head').height();
    $('.full-screen-preview__frame').height($(window).height() - headerDimensions);
};

$(document).ready(function () {
    calcHeight();
});

$(window).resize(function () {
    calcHeight();
}).load(function () {
    calcHeight();
});

function logOut()
{
    window.location.href = "../HandleLogOut";
}

function showMainContent(option)
{
    for(var i=1;i<=5;i++)
    {
        var item=document.getElementById("head"+i);
        item.setAttribute("class","admin_a");
    }
    option=parseInt(option);
    item=document.getElementById("head"+option);
    item.setAttribute("class","admin_active");
    var head=document.getElementById("f_content");
    if(option===1)
    {
        // head.setAttribute("src","./News/index.jsp");
    }
    else if(option===2)
    {
        
    }
    else if(option===3)
    {
        
        head.setAttribute("src","./FileManage/index.jsp");
    }
    else if(option===4)
    {
        
    }
    else if(option===5)
    {
        
    }
}
