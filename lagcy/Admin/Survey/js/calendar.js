// Variable
var thisDate = 1;
var today = new Date();
var todaysDay = today.getDay() + 1;
var todaysDate = today.getDate();
var todaysMonth = today.getMonth() + 1;
var todaysYear = today.getFullYear();

var firstDate;
var firstDay;
var lastDate;
var numbDays;
var numevents = 0;
var daycounter = 0;
var calendarString = "";

var monthNum_full = todaysMonth;
var yearNum_full = todaysYear;
var monthNum_compact = todaysMonth;
var yearNum_compact = todaysYear;

var tiva_events = [];
var order_num = 0;

// Config variable
var wordDay;
var date_start;

function getShortText(text, num) {
    if (text) {
        // Get num of word
        var textArray = text.split(" ");
        if (textArray.length > num) {
            return textArray.slice(0, num).join(" ") + " ...";
        }
        return text;
    }
    return "";
}

function sortEventsByDate(a, b) {
    if (a.date < b.date) {
        return -1;
    } else if (a.date > b.date) {
        return 1;
    } else {
        return 0;
    }
}

function sortEventsByDateTime(a, b) {
    if (a.stime < b.stime) {
        return -1;
    } else if (a.stime > b.stime) {
        return 1;
    } else {
        return 0;
    }
}

function sortEventsByUpcoming(a, b) {
    var today_date = new Date(todaysYear, todaysMonth - 1, todaysDate);
    if (Math.abs(a.date - today_date.getTime()) < Math.abs(b.date - today_date.getTime())) {
        return -1;
    } else if (Math.abs(a.date - today_date.getTime()) > Math.abs(b.date - today_date.getTime())) {
        return 1;
    } else {
        return 0;
    }
}

function getEventsByTime(type) {
    var events = [];
    var today_date = new Date(todaysYear, todaysMonth - 1, todaysDate);
    for (var i = 0; i < tiva_events.length; i++) {
        if (type === 'upcoming') {
            if (tiva_events[i].date >= today_date.getTime()) {
                events.push(tiva_events[i]);
            }
        } else {
            if (tiva_events[i].date < today_date.getTime()) {
                events.push(tiva_events[i]);
            }
        }
    }
    return events;
}

// Change month or year on calendar
function changedate(btn, layout) {
    if (btn === "prevyr") {
        eval("yearNum_" + layout + "--;");
    } else if (btn === "nextyr") {
        eval("yearNum_" + layout + "++;");
    } else if (btn === "prevmo") {
        eval("monthNum_" + layout + "--;");
    } else if (btn === "nextmo") {
        eval("monthNum_" + layout + "++;");
    } else if (btn === "current") {
        eval("monthNum_" + layout + " = todaysMonth;");
        eval("yearNum_" + layout + " = todaysYear;");
    }

    if (monthNum_full === 0) {
        monthNum_full = 12;
        yearNum_full--;
    } else if (monthNum_full === 13) {
        monthNum_full = 1;
        yearNum_full++;
    }

    if (monthNum_compact === 0) {
        monthNum_compact = 12;
        yearNum_compact--;
    } else if (monthNum_compact === 13) {
        monthNum_compact = 1;
        yearNum_compact++;
    }

    // Get first day and number days of month
    eval("firstDate = new Date(yearNum_" + layout + ", monthNum_" + layout + " - 1, 1);");
    if (date_start === 'sunday') {
        firstDay = firstDate.getDay() + 1;
    } else {
        firstDay = firstDate.getDay();
    }
    eval("lastDate = new Date(yearNum_" + layout + ", monthNum_" + layout + ", 0);");
    numbDays = lastDate.getDate();

    // Create calendar
    eval("createCalendar(layout, firstDay, numbDays, monthNum_" + layout + ", yearNum_" + layout + ");");

    return;
}

// Create calendar
function createCalendar(layout, firstDay, numbDays, monthNum, yearNum) {
    calendarString = '';
    daycounter = 0;

    calendarString += '<table class=\"calendar-table table table-bordered\">';
    calendarString += '<tbody>';
    calendarString += '<tr>';
    if (layout === 'full') {
        calendarString += '<td class=\"calendar-btn\"><span onClick=\"changedate(\'prevyr\', \'full\')\">« <span class="btn-change-date">' + prev_year + '<\/span><\/span><\/td>';
        calendarString += '<td class=\"calendar-btn\"><span onClick=\"changedate(\'prevmo\', \'full\')\">« <span class="btn-change-date">' + prev_month + '<\/span><\/span><\/td>';
        calendarString += '<td class=\"calendar-title\" colspan=\"3\"><span><i class=\"fa fa-calendar-o\"><\/i>' + wordMonth[monthNum - 1] + '&nbsp;&nbsp;' + yearNum + '<\/span><\/td>';
        calendarString += '<td class=\"calendar-btn\"><span onClick=\"changedate(\'nextmo\', \'full\')\"><span class="btn-change-date">' + next_month + '<\/span> »<\/span><\/td>';
        calendarString += '<td class=\"calendar-btn\"><span onClick=\"changedate(\'nextyr\', \'full\')\"><span class="btn-change-date">' + next_year + '<\/span> »<\/span><\/td>';
    } else {
        calendarString += '<td class=\"calendar-btn\"><span onClick=\"changedate(\'prevyr\', \'compact\')\">«<\/span><\/td>';
        calendarString += '<td class=\"calendar-btn\"><span onClick=\"changedate(\'prevmo\', \'compact\')\">«<\/span><\/td>';
        calendarString += '<td class=\"calendar-title\" colspan=\"3\"><span>' + wordMonth[monthNum - 1] + '&nbsp;&nbsp;' + yearNum + '<\/span><\/td>';
        calendarString += '<td class=\"calendar-btn\"><span onClick=\"changedate(\'nextmo\', \'compact\')\">»<\/span><\/td>';
        calendarString += '<td class=\"calendar-btn\"><span onClick=\"changedate(\'nextyr\', \'compact\')\">»<\/span><\/td>';
    }
    calendarString += '<\/tr>';

    calendarString += '<tr class="active">';
    for (var m = 0; m < wordDay.length; m++) {
        calendarString += '<th>' + wordDay[m].substring(0, 3) + '<\/th>';
    }
    calendarString += '<\/tr>';

    thisDate === 1;

    for (var i = 1; i <= 6; i++) {
        var k = (i - 1) * 7 + 1;
        if (k < (firstDay + numbDays)) {
            calendarString += '<tr>';
            for (var x = 1; x <= 7; x++) {
                daycounter = (thisDate - firstDay) + 1;
                thisDate++;
                if ((daycounter > numbDays) || (daycounter < 1)) {
                    calendarString += '<td class=\"calendar-day-blank\">&nbsp;<\/td>';
                } else {
                    // Saturday or Sunday
                    if (date_start === 'sunday') {
                        if ((x === 1) || (x === 7)) {
                            daycounter_s = '<span class=\"calendar-day-weekend\">' + daycounter + '</span>';
                        } else {
                            daycounter_s = daycounter;
                        }
                    } else {
                        if ((x === 6) || (x === 7)) {
                            daycounter_s = '<span class=\"calendar-day-weekend\">' + daycounter + '</span>';
                        } else {
                            daycounter_s = daycounter;
                        }
                    }

                    if ((todaysDate === daycounter) && (todaysMonth === monthNum)) {
                        calendarString += '<td class=\"calendar-day-normal calendar-day-today\">';
                    } else {
                        calendarString += '<td class=\"calendar-day-normal\">';
                    }
                    if (checkEvents(daycounter, monthNum, yearNum)) {
                        if (layout === 'full') {
                            calendarString += '<div class=\"calendar-day-event\">';
                        } else {
                            calendarString += '<div class=\"calendar-day-event\" onmouseover=\"showTooltip(0, \'compact\', ' + daycounter + ', ' + monthNum + ', ' + yearNum + ', this)\" onmouseout=\"clearTooltip(\'compact\', this)\" onclick=\"showEventDetail(0, \'compact\', ' + daycounter + ', ' + monthNum + ', ' + yearNum + ')\">';
                        }
                        calendarString += '<a href="javascript:void(0);" onclick="showDayTimeList(\'' + daycounter_s + '\',\'' + monthNum + '\',\'' + yearNum + '\')">' + daycounter_s + '</a>';

                        // Get events of day
                        if (layout === 'full') {
                            var events = getEvents(daycounter, monthNum, yearNum);
                            for (var t = 0; t < events.length; t++) {
                                if (typeof events[t] !== "undefined") {
                                    var color = events[t].color ? events[t].color : 1;
                                    var event_class = "one-day";
                                    if (events[t].first_day && !events[t].last_day) {
                                        event_class = "first-day";
                                    } else if (events[t].last_day && !events[t].first_day) {
                                        event_class = "last-day";
                                    } else if (!events[t].first_day && !events[t].last_day) {
                                        event_class = "middle-day";
                                    }

                                    calendarString += '<div class=\"calendar-event-name ' + event_class + ' color-' + color + '\" id=\"' + events[t].id + '\" onmouseover=\"showTooltip(' + events[t].id + ', \'full\', ' + daycounter + ', ' + monthNum + ', ' + yearNum + ', this)\" onmouseout=\"clearTooltip(\'full\', this)\" onclick=\"showEventDetail(' + events[t].id + ', \'full\', ' + daycounter + ', ' + monthNum + ', ' + yearNum + ')\"><span class="event-name">' +events[t].name + '</span><\/div>';
                                } else {
                                    var event_fake;
                                    if (typeof events[t + 1] !== "undefined") {
                                        if (typeof tiva_events[events[t + 1].id - 1] !== "undefined") {
                                            event_fake =tiva_events[events[t + 1].id - 1].name;
                                        } else {
                                            event_fake = "no-name";
                                        }
                                    } else {
                                        event_fake = "no-name";
                                    }
                                    calendarString += '<div class=\"calendar-event-name no-name\">' + event_fake + '</div>';
                                }
                            }
                        } else {
                            calendarString += '<span class="calendar-event-mark"></span>';
                        }

                        // Tooltip
                        calendarString += '<div class=\"tiva-event-tooltip\"><\/div>';
                        calendarString += '<\/div>';
                    } else {
                        calendarString += daycounter_s;
                    }
                    calendarString += '<\/td>';
                }
            }
            calendarString += '<\/tr>';
        }
    }
    calendarString += '</tbody>';
    calendarString += '</table>';

    if (layout === 'full') {
        jQuery('.tiva-calendar-full').html(calendarString);
    } else {
        jQuery('.tiva-calendar-compact').html(calendarString);
    }
    thisDate = 1;
}

// Check day has events or not
function checkEvents(day, month, year) {
    numevents = 0;
    var date_check = new Date(year, Number(month) - 1, day);
    for (var i = 0; i < tiva_events.length; i++) {
        var start_date = new Date(tiva_events[i].year, Number(tiva_events[i].month) - 1, tiva_events[i].day);
        var end_date = new Date(tiva_events[i].year, Number(tiva_events[i].month) - 1, Number(tiva_events[i].day) + Number(tiva_events[i].duration) - 1);
        if ((start_date.getTime() <= date_check.getTime()) && (date_check.getTime() <= end_date.getTime())) {
            numevents++;
        }
    }

    if (numevents === 0) {
        return false;
    } else {
        return true;
    }
}

function getOrderNumber(id, day, month, year) {
    var date_check = new Date(year, Number(month) - 1, day);
    var events = [];
    for (var i = 0; i < tiva_events.length; i++) {
        var start_date = new Date(tiva_events[i].year, Number(tiva_events[i].month) - 1, tiva_events[i].day);
        var end_date = new Date(tiva_events[i].year, Number(tiva_events[i].month) - 1, Number(tiva_events[i].day) + Number(tiva_events[i].duration) - 1);
        if ((start_date.getTime() <= date_check.getTime()) && (date_check.getTime() <= end_date.getTime())) {
            var first_day = (start_date.getTime() === date_check.getTime()) ? true : false;
            var event = {id: tiva_events[i].id, name: tiva_events[i].name, day: tiva_events[i].day, month: tiva_events[i].month, year: tiva_events[i].year, first_day: first_day};
            events.push(event);
        }
    }

    if (events.length) {
        if (events[0].id === id) {
            var num = order_num;
            order_num = 0;
            return num;
        } else {
            order_num++;
            for (var j = 0; j < events.length; j++) {
                if (events[j].id === id) {
                    return getOrderNumber(events[j - 1].id, events[j - 1].day, events[j - 1].month, events[j - 1].year);
                }
            }

        }
    }

    return 0;
}

// Get events of day
function getEvents(day, month, year) {
    var n = 0;
    var date_check = new Date(year, Number(month) - 1, day);
    var events = [];
    for (var i = 0; i < tiva_events.length; i++) {
        var start_date = new Date(tiva_events[i].year, Number(tiva_events[i].month) - 1, tiva_events[i].day);
        var end_date = new Date(tiva_events[i].year, Number(tiva_events[i].month) - 1, Number(tiva_events[i].day) + Number(tiva_events[i].duration) - 1);
        if ((start_date.getTime() <= date_check.getTime()) && (date_check.getTime() <= end_date.getTime())) {
            var first_day = (start_date.getTime() === date_check.getTime()) ? true : false;
            var last_day = (end_date.getTime() === date_check.getTime()) ? true : false;
            var event = {id: tiva_events[i].id, name: tiva_events[i].name, first_day: first_day, last_day: last_day, color: tiva_events[i].color};

            if (!first_day) {
                n = getOrderNumber(tiva_events[i].id, tiva_events[i].day, tiva_events[i].month, tiva_events[i].year);
            }

            events[n] = event;
            n++;
        }
    }

    return events;
}

// Show tooltip when mouse over
function showTooltip(id, layout, day, month, year, el) {
    if (layout === 'full') {
        if (tiva_events[id].image) {
            var event_image = '<img src="' + tiva_events[id].image + '" alt="' + tiva_events[id].name + '" />';
        } else {
            var event_image = '';
        }
        if (tiva_events[id].time) {
            var event_time = '<div class="event-time">' + tiva_events[id].time + '</div>';
        } else {
            var event_time = '';
        }

        // Change position of tooltip
        var index = jQuery(el).parent().find('.calendar-event-name').index(el);
        var count = jQuery(el).parent().find('.calendar-event-name').length;
        //var bottom = 32 + 0-((count - index - 2) * 25);
        var top = el.offsetTop + 28;
        jQuery(el).parent().find('.tiva-event-tooltip').css('top', top + 'px');
        jQuery(el).parent().find('.tiva-event-tooltip').css('z-index', '3000');
        jQuery(el).parent().find('.tiva-event-tooltip').css('height', '400px');
        jQuery(el).parent().find('.tiva-event-tooltip').html('<div class="event-tooltip-item">'
                + '<div class="event-image event_tb_image">' + event_image + '</div>'
                + '<div class="event-name">' + tiva_events[id].name + '</div>'
                + '<div class="event_item_type"><i class="fa fa-user" aria-hidden="true"></i>调查员---姓名:' + tiva_events[id].u_name + '&nbsp;&nbsp;联系方式:' + tiva_events[id].u_way + '--' + tiva_events[id].u_info + '</div>'
                + '<div class="event-intro" style="color:red;font-size:16px;">状态:&nbsp;' + getShortText(tiva_events[id].description, 10) + '</div>'
                + '</div>'
                );
        jQuery(el).parent().find('.tiva-event-tooltip').css('width', '280px');
        jQuery(el).parent().find('.tiva-event-tooltip').css('opacity', '1');
        jQuery(el).parent().find('.tiva-event-tooltip').css('-webkit-transform', 'translate3d(0,0,0) rotate3d(0,0,0,0)');
        jQuery(el).parent().find('.tiva-event-tooltip').css('transform', 'translate3d(0,0,0) rotate3d(0,0,0,0)');
    } else {
        jQuery(el).find('.tiva-event-tooltip').html('');
        var events = getEvents(day, month, year);
        for (var i = 0; i < events.length; i++) {
            if (typeof events[i] !== "undefined") {
                if (tiva_events[events[i].id].image) {
                    var event_image = '<img src="' + tiva_events[events[i].id].image + '" alt="' + tiva_events[events[i].id].name + '" />';
                } else {
                    var event_image = '';
                }
                if (tiva_events[events[i].id].time) {
                    var event_time = '<div class="event-time">' + tiva_events[events[i].id].time + '</div>';
                } else {
                    var event_time = '';
                }

                jQuery(el).find('.tiva-event-tooltip').append('<div class="event-tooltip-item">'
                        + event_time
                        + '<div class="event-name">' + tiva_events[events[i].id].name + '</div>'
                        + '<div class="event-image">' + event_image + '</div>'
                        + '<div class="event-intro" style="color:red;font-size:16px;">状态:&nbsp;' + getShortText(tiva_events[events[i].id].description, 10) + '</div>'
                        + '</div>'
                        );
            }
        }
        jQuery(el).find('.tiva-event-tooltip').css('opacity', '1');
        jQuery(el).find('.tiva-event-tooltip').css('-webkit-transform', 'translate3d(0,0,0) rotate3d(0,0,0,0)');
        jQuery(el).find('.tiva-event-tooltip').css('transform', 'translate3d(0,0,0) rotate3d(0,0,0,0)');
    }
}

// Clear tooltip when mouse out
function clearTooltip(layout, el) {
    if (layout === 'full') {
        jQuery(el).parent().find('.tiva-event-tooltip').css('opacity', '0');
        jQuery(el).parent().find('.tiva-event-tooltip').css('-webkit-transform', 'translate3d(0,-10px,0)');
        jQuery(el).parent().find('.tiva-event-tooltip').css('transform', 'translate3d(0,-10px,0)');
    } else {
        jQuery(el).find('.tiva-event-tooltip').css('opacity', '0');
        jQuery(el).find('.tiva-event-tooltip').css('-webkit-transform', 'translate3d(0,-10px,0)');
        jQuery(el).find('.tiva-event-tooltip').css('transform', 'translate3d(0,-10px,0)');
    }
}

function mySelectFunction()
{
    var option = document.getElementById("search_list_option").value;
    option=parseInt(option);
    $("#date_list_area").hide();
    $("#city_list").hide();
    $("#method_list_area").hide();
    $("#type_list_area").hide();
    $("#user_list_area").hide();
    $("#list_search_area").attr("option",option);
    $("#search_list_button").show();
    $("#search_list_button").attr("style","display:inline-block");
    
    if(option===0)
    {
        $("#search_list_button").hide();
        $(".event_item_list").each ( function() {
    // $(this) will fetch the current element
           $(this).show();
        });
    }
    else if(option===1)
    {
        $("#date_list_area").show();
        $("#date_list_area").attr("style","display:inline-block");
    }
    else if(option===2)
    {
         $("#city_list").show();
         $("#city_list").attr("style","display:inline-block");
    }
    else if(option===3)
    {
        $("#method_list_area").show();
        $("#method_list_area").attr("style","display:inline-block");
    }
    else if(option===4)
    {
        $("#type_list_area").show();
        $("#type_list_area").attr("style","display:inline-block");
    }
    else if(option===5)
    {
        $("#user_list_area").show();
        $("#user_list_area").attr("style","display:inline-block");
    }
}

function searchFunction()
{
    var option= $("#list_search_area").attr("option");
    option=parseInt(option);
     if(option===0)
    {
        $("#search_list_button").hide();
    }
    else if(option===1)
    {
        var sdate=$("#sdate_list").val();
        var edate=$("#edate_list").val();
        $(".event_item_list").each ( function() {
    // $(this) will fetch the current element
           var date=$(this).attr("date");
           if(date>=sdate&&date<=edate)
           {
              $(this).show();
              
           }
           else
           {
               $(this).hide();
           }
        });
    }
    else if(option===2)
    {
        var p=$("#province_list").val();
        var c=$("#city_list_1").val();
        var t=$("#town_list_1").val();
        var location;
        if(t===undefined||t===null)
        {
            location=p+", "+c;
        }
        else
        {
            location=p+", "+c+", "+t;
        }
        
         $(".event_item_list").each ( function() {
    // $(this) will fetch the current element
           var c_location=$(this).attr("location");
           if(c_location===location)
           {
              $(this).show();
              
           }
           else
           {
               $(this).hide();
           }
        });
    }
    else if(option===3)
    {
        var p=$("#method_list").val();
         $(".event_item_list").each ( function() {
    // $(this) will fetch the current element
    var method=$(this).attr("method");
           if(method===p)
           {
              $(this).show();
              
           }
           else
           {
               $(this).hide();
           }
        });
    }
    else if(option===4)
    {
        var p=$("#type_list").val();
        //p=parseInt(p);
         $(".event_item_list").each ( function() {
    // $(this) will fetch the current element
            var type=$(this).attr("type");
           if(type===p)
           {
              $(this).show();
              
           }
           else
           {
               $(this).hide();
           }
        });
    }
    else if(option===5)
    {
        var name=$("#user_info_list").val();
         //p=parseInt(p);
         $(".event_item_list").each ( function() {
    // $(this) will fetch the current element
          var user_info=$(this).attr("user_info");
           if(user_info.includes(name))
           {
              $(this).show();
              
           }
           else
           {
               $(this).hide();
           }
        });
    }
}
// Show event detail
function showEventList(layout, max_events) {
    // Sort event via upcoming
    var upcoming_events = getEventsByTime('upcoming');
    upcoming_events.sort(sortEventsByUpcoming);
    var past_events = getEventsByTime('past');
    past_events.sort(sortEventsByUpcoming);
    var tiva_list_events = upcoming_events.concat(past_events);
    tiva_list_events = tiva_list_events.slice(0, max_events);

    var esize = 0;
    if (layout === 'full') {
        jQuery('.tiva-event-list-full').html('');
        var div_search='<div class="list_search_area" id="list_search_area" option="0">'
                       +'<div class="search_option" style="display:inline-block;width:200px;color:black;">查询方式:<select id="search_list_option" style="width:100px;" onchange="mySelectFunction()"><option value="0">全部</option><option value="1">按日期</option><option value="2">按地点</option><option value="3">按调查方式</option><option value="4">按调查类型</option><option value="5">按调查员</option></select></div>'
                       +'<div class="date_list_area" id="date_list_area" style="display:none;"><span>开始日期:</span><input type="date" id="sdate_list" value="2014-02-09" style="width:140px;">&nbsp;&nbsp;&nbsp;<span>结束日期:</span><input type="date" id="edate_list" value="2014-03-09" style="width:140px;"></div>'
                       +'<div id="city_list" class="city_list_area" style="display:none;">'
                       +'地点:<select name="province" id="province_list" class="prov" style="width:100px;"></select>'
                       +'<select name="city" id="city_list_1" class="city"  disabled="disabled" style="width:100px;"></select>'
                       +'<select name="area" id="town_list_1" class="dist"  disabled="disabled" style="width:100px;"></select>'
                       +'</div>'
               +'<div class="method_list_area" id="method_list_area" style="display:none;">调查方式:<select id="method_list" style="width:60px;"><option value="全部">全部</option><option value="视频">视频</option><option value="人工">人工</option></select></div>'
               +'<div class="type_list_area" id="type_list_area" style="display:none;">调查类型:<select id="type_list" style="width:60px;"><option value="0">全部</option><option value="1">交叉口</option><option value="2">路段</option><option value="3">红绿灯</option></select></div>'
               +'<div class="user_list_area" id="user_list_area" style="display:none;" >调查人员:<input type="text" id="user_info_list" style="width:150px;"></div>'
               +'<div class="search_list_button" id="search_list_button" style="display:none;" ><button type="button"style="width:150px;" onclick="searchFunction()">确定</button></div></div>';
        jQuery('.tiva-event-list-full').append(div_search);
        for (var i = 0; i < tiva_list_events.length; i++) {
            // Start date
            var day = new Date(tiva_list_events[i].year, Number(tiva_list_events[i].month) - 1, tiva_list_events[i].day);
            if (date_start === 'sunday') {
                var event_day = wordDay[day.getDay()];
            } else {
                if (day.getDay() > 0) {
                    var event_day = wordDay[day.getDay() - 1];
                } else {
                    var event_day = wordDay[6];
                }
            }
            var event_date = wordMonth[Number(tiva_list_events[i].month) - 1] + ' ' + tiva_list_events[i].day + ', ' + tiva_list_events[i].year;

            // End date
            var event_end_time = '';
            if (tiva_list_events[i].duration > 1) {
                var end_date = new Date(tiva_list_events[i].year, Number(tiva_list_events[i].month) - 1, Number(tiva_list_events[i].day) + Number(tiva_list_events[i].duration) - 1);

                if (date_start === 'sunday') {
                    var event_end_day = wordDay[end_date.getDay()];
                } else {
                    if (end_date.getDay() > 0) {
                        var event_end_day = wordDay[end_date.getDay() - 1];
                    } else {
                        var event_end_day = wordDay[6];
                    }
                }
                var event_end_date = wordMonth[Number(end_date.getMonth())] + ' ' + end_date.getDate() + ', ' + end_date.getFullYear();
                event_end_time = ' - ' + event_end_day + ', ' + event_end_date;
            }

            // Event time
            if (tiva_list_events[i].time) {
                var event_time = '<i class="fa fa-clock-o"></i>' + tiva_list_events[i].time;
            } else {
                var event_time = '';
            }

            // Event image
            if (tiva_list_events[i].image) {
                var event_image = '<img src="' + tiva_list_events[i].image + '" alt="' + tiva_list_events[i].name + '" />';
            } else {
                var event_image = '';
            }

            var content = '<div class="event-item event_item_list" date="'+tiva_list_events[i].year+'-'+tiva_list_events[i].month+'-'+tiva_list_events[i].day+'" method="'+tiva_list_events[i].method+'"'
                    +' location="'+tiva_list_events[i].location+'" type="'+tiva_list_events[i].type+'" user_info="'+tiva_list_events[i].u_name+'">'
                    + '<div class="event-item-left pull-left">'
                    + '<div class="event-image link" onclick="showEventDetail(' + tiva_list_events[i].id + ', \'full\', 0, 0, 0)">' + event_image + '</div>'
                    + '</div>'
                    + '<div class="event-item-right pull-left">'
                    + '<div class="event-name link" onclick="showEventDetail(' + tiva_list_events[i].id + ', \'full\', 0, 0, 0)">' + tiva_list_events[i].name + '</div>'
                    + '<div class="event_item_type"><i class="fa fa-calendar-o"></i>日期:&nbsp;' + event_day + ', ' + tiva_list_events[i].start_time + '&nbsp;至&nbsp;' + tiva_list_events[i].end_time + '</div>'
                    + '<div class="event_item_type"><i class="fa fa-clock-o"></i>时间:' + tiva_list_events[i].time + '--' + tiva_list_events[i].time_end + '</div>'
                    + '<div class="event_item_type"><i class="fa fa-map-marker"></i>位置:&nbsp;' + tiva_list_events[i].location + '</div>'
                    + '<div class="event_item_type"><i class="fa fa-filter" aria-hidden="true"></i>调查方式:&nbsp;' + tiva_list_events[i].method + '</div>';

            if (tiva_list_events[i].type === 3)
            {
                content += '<div class="class="event_item_type""><i class="fa fa-lightbulb-o" aria-hidden="true"></i>灯控模式:&nbsp;' + tiva_list_events[i].light_method + '</div>';
            }
            else
            {
                content += '<div class="event-cars_list"><div class="car_item_event"><i class="fa fa-car" aria-hidden="true"></i>调查车型:&nbsp;</div><div class="car_item_event"><ul class="nav nav-pills car_tb_items">';
                var peizhi = tiva_list_events[i].peizhi;
                esize += peizhi.length;
                //esize=tiva_list_events.length*esize;
                for (var j = 0; j < peizhi.length; j++)
                {
                    if (j >= 0)
                    {
                        var id = i * (peizhi.length) + j;
                        content += '<li class="car_tb_item">'
                                + '<a class="car_tb_name" data-toggle="popover_list_' + id + '">' + peizhi[j].type_name
                                + '<div id="tb_div_id_list_' + id + '" style="display:none;">'
                                + '<div class="tb_car_content"><span>车辆类型:' + peizhi[j].type_name + '</span><br/>\n\
                  <span>名称:' + peizhi[j].name + '</span><br/>\n\
                  <span>车长:' + peizhi[j].car_min_length + '-' + peizhi[j].car_max_length + '</span><br/>\n\
                  <span>载重:' + peizhi[j].car_min_weight + '-' + peizhi[j].car_max_weight + '</span><br/>\n\
                  <span>换算系数:' + peizhi[j].car_factor + '</span><br/></div>' + '</div></a></li>';
                    }

                }
                content += '</ul></div></div>';
            }
            content += '<div class="event_item_type"><i class="fa fa-user" aria-hidden="true"></i>调查员---姓名:' + tiva_list_events[i].u_name + '&nbsp;&nbsp;联系方式:' + tiva_list_events[i].u_way + '--' + tiva_list_events[i].u_info + '</div>'

                    + '<div class="event-intro"  style="margin-top:10px; color:red;font-size:20px;">状态:&nbsp;' + getShortText(tiva_list_events[i].description, 25) + '</div>'
                    + '</div>'
                    + '</div>'
                    + '<div class="cleardiv"></div>';

            jQuery('.tiva-event-list-full').append(content);

        }
        showCarInfoEvent_List(esize);
        $("#city_list").citySelect({prov: "北京", nodata: "none"});
    } else {
        jQuery('.tiva-event-list-compact').html('');
        for (var i = 0; i < tiva_list_events.length; i++) {
            // Start date
            var day = new Date(tiva_list_events[i].year, Number(tiva_list_events[i].month) - 1, tiva_list_events[i].day);
            if (date_start == 'sunday') {
                var event_day = wordDay[day.getDay()];
            } else {
                if (day.getDay() > 0) {
                    var event_day = wordDay[day.getDay() - 1];
                } else {
                    var event_day = wordDay[6];
                }
            }
            var event_date = wordMonth[Number(tiva_list_events[i].month) - 1] + ' ' + tiva_list_events[i].day + ', ' + tiva_list_events[i].year;

            // End date
            var event_end_time = '';
            if (tiva_list_events[i].duration > 1) {
                var end_date = new Date(tiva_list_events[i].year, Number(tiva_list_events[i].month) - 1, Number(tiva_list_events[i].day) + Number(tiva_list_events[i].duration) - 1);

                if (date_start == 'sunday') {
                    var event_end_day = wordDay[end_date.getDay()];
                } else {
                    if (end_date.getDay() > 0) {
                        var event_end_day = wordDay[end_date.getDay() - 1];
                    } else {
                        var event_end_day = wordDay[6];
                    }
                }
                var event_end_date = wordMonth[Number(end_date.getMonth())] + ' ' + end_date.getDate() + ', ' + end_date.getFullYear();
                event_end_time = ' - ' + event_end_day + ', ' + event_end_date;
            }

            // Event time
            if (tiva_list_events[i].time) {
                var event_time = '<i class="fa fa-clock-o"></i>' + tiva_list_events[i].time;
            } else {
                var event_time = '';
            }

            // Event image
            if (tiva_list_events[i].image) {
                var event_image = '<img src="' + tiva_list_events[i].image + '" alt="' + tiva_list_events[i].name + '" />';
            } else {
                var event_image = '';
            }

            jQuery('.tiva-event-list-compact').append('<div class="event-item">'
                    + '<div class="event-image link" onclick="showEventDetail(' + tiva_list_events[i].id + ', \'compact\', 0, 0, 0)">' + event_image + '</div>'
                    + '<div class="event-name link" onclick="showEventDetail(' + tiva_list_events[i].id + ', \'compact\', 0, 0, 0)">' + tiva_list_events[i].name + '</div>'
                    + '<div class="event-date"><i class="fa fa-calendar-o"></i>' + event_day + ', ' + event_date + event_end_time + '</div>'
                    + '<div class="event-time">' + event_time + '</div>'
                    + '<div class="event-intro">' + getShortText(tiva_list_events[i].description, 15) + '</div>'
                    + '</div>'
                    + '<div class="cleardiv"></div>'
                    );

        }
    }
}

function showDayTimeList(o_day, o_month, o_year) {
    // Sort event via upcoming
    o_day=parseInt(o_day);
    o_month=parseInt(o_month);
    o_year=parseInt(o_year);
    jQuery('.back-calendar').hide();
    jQuery('.tiva-calendar').hide();
    jQuery('.tiva-event-detail').hide();
    jQuery('.tiva-event-list').hide();
    jQuery('.tiva-event-daytime').fadeIn(1500);
    jQuery('.tiva-event-daytime-full').html('');
    var content = '<div class="event_class_daytime_title"><span>' + o_year + "年" + o_month + "月" + o_day + "日" + '</span></div>';
    content += '<div class="event_class_measure">\n\
                <table class="calendar_table">\n\
                   <tbody>\n\
                   <tr data-time="00:00:00"><td class="fc-time" style="width: 42px;"><span class="time_title">0:00</span class="time_title"></td><td class="fc-widget-content"></td></tr><tr data-time="00:30:00" class="fc-minor"><td class="fc-time" style="width: 42px;"></td><td class="fc-widget-content"></td></tr><tr data-time="01:00:00"><td class="fc-time" style="width: 42px;"><span class="time_title">1:00</span class="time_title"></td><td class="fc-widget-content"></td></tr><tr data-time="01:30:00" class="fc-minor"><td class="fc-time" style="width: 42px;"></td><td class="fc-widget-content"></td></tr><tr data-time="02:00:00"><td class="fc-time" style="width: 42px;"><span class="time_title">2:00</span class="time_title"></td><td class="fc-widget-content"></td></tr><tr data-time="02:30:00" class="fc-minor"><td class="fc-time" style="width: 42px;"></td><td class="fc-widget-content"></td></tr><tr data-time="03:00:00"><td class="fc-time" style="width: 42px;"><span class="time_title">3:00</span class="time_title"></td><td class="fc-widget-content"></td></tr><tr data-time="03:30:00" class="fc-minor"><td class="fc-time" style="width: 42px;"></td><td class="fc-widget-content"></td></tr><tr data-time="04:00:00"><td class="fc-time" style="width: 42px;"><span class="time_title">4:00</span class="time_title"></td><td class="fc-widget-content"></td></tr><tr data-time="04:30:00" class="fc-minor"><td class="fc-time" style="width: 42px;"></td><td class="fc-widget-content"></td></tr><tr data-time="05:00:00"><td class="fc-time" style="width: 42px;"><span class="time_title">5:00</span class="time_title"></td><td class="fc-widget-content"></td></tr><tr data-time="05:30:00" class="fc-minor"><td class="fc-time" style="width: 42px;"></td><td class="fc-widget-content"></td></tr><tr data-time="06:00:00"><td class="fc-time" style="width: 42px;"><span class="time_title">6:00</span class="time_title"></td><td class="fc-widget-content"></td></tr><tr data-time="06:30:00" class="fc-minor"><td class="fc-time" style="width: 42px;"></td><td class="fc-widget-content"></td></tr><tr data-time="07:00:00"><td class="fc-time" style="width: 42px;"><span class="time_title">7:00</span class="time_title"></td><td class="fc-widget-content"></td></tr><tr data-time="07:30:00" class="fc-minor"><td class="fc-time" style="width: 42px;"></td><td class="fc-widget-content"></td></tr><tr data-time="08:00:00"><td class="fc-time" style="width: 42px;"><span class="time_title">8:00</span class="time_title"></td><td class="fc-widget-content"></td></tr><tr data-time="08:30:00" class="fc-minor"><td class="fc-time" style="width: 42px;"></td><td class="fc-widget-content"></td></tr><tr data-time="09:00:00"><td class="fc-time" style="width: 42px;"><span class="time_title">9:00</span class="time_title"></td><td class="fc-widget-content"></td></tr><tr data-time="09:30:00" class="fc-minor"><td class="fc-time" style="width: 42px;"></td><td class="fc-widget-content"></td></tr><tr data-time="10:00:00"><td class="fc-time" style="width: 42px;"><span class="time_title">10:00</span class="time_title"></td><td class="fc-widget-content"></td></tr><tr data-time="10:30:00" class="fc-minor"><td class="fc-time" style="width: 42px;"></td><td class="fc-widget-content"></td></tr><tr data-time="11:00:00"><td class="fc-time" style="width: 42px;"><span class="time_title">11:00</span class="time_title"></td><td class="fc-widget-content"></td></tr><tr data-time="11:30:00" class="fc-minor"><td class="fc-time" style="width: 42px;"></td><td class="fc-widget-content"></td></tr><tr data-time="12:00:00"><td class="fc-time" style="width: 42px;"><span class="time_title">12:00</span class="time_title"></td><td class="fc-widget-content"></td></tr><tr data-time="12:30:00" class="fc-minor"><td class="fc-time" style="width: 42px;"></td><td class="fc-widget-content"></td></tr><tr data-time="13:00:00"><td class="fc-time" style="width: 42px;"><span class="time_title">13:00</span class="time_title"></td><td class="fc-widget-content"></td></tr><tr data-time="13:30:00" class="fc-minor"><td class="fc-time" style="width: 42px;"></td><td class="fc-widget-content"></td></tr><tr data-time="14:00:00"><td class="fc-time" style="width: 42px;"><span class="time_title">14:00</span class="time_title"></td><td class="fc-widget-content"></td></tr><tr data-time="14:30:00" class="fc-minor"><td class="fc-time" style="width: 42px;"></td><td class="fc-widget-content"></td></tr><tr data-time="15:00:00"><td class="fc-time" style="width: 42px;"><span class="time_title">15:00</span class="time_title"></td><td class="fc-widget-content"></td></tr><tr data-time="15:30:00" class="fc-minor"><td class="fc-time" style="width: 42px;"></td><td class="fc-widget-content"></td></tr><tr data-time="16:00:00"><td class="fc-time" style="width: 42px;"><span class="time_title">16:00</span class="time_title"></td><td class="fc-widget-content"></td></tr><tr data-time="16:30:00" class="fc-minor"><td class="fc-time" style="width: 42px;"></td><td class="fc-widget-content"></td></tr><tr data-time="17:00:00"><td class="fc-time" style="width: 42px;"><span class="time_title">17:00</span class="time_title"></td><td class="fc-widget-content"></td></tr><tr data-time="17:30:00" class="fc-minor"><td class="fc-time" style="width: 42px;"></td><td class="fc-widget-content"></td></tr><tr data-time="18:00:00"><td class="fc-time" style="width: 42px;"><span class="time_title">18:00</span class="time_title"></td><td class="fc-widget-content"></td></tr><tr data-time="18:30:00" class="fc-minor"><td class="fc-time" style="width: 42px;"></td><td class="fc-widget-content"></td></tr><tr data-time="19:00:00"><td class="fc-time" style="width: 42px;"><span class="time_title">19:00</span class="time_title"></td><td class="fc-widget-content"></td></tr><tr data-time="19:30:00" class="fc-minor"><td class="fc-time" style="width: 42px;"></td><td class="fc-widget-content"></td></tr><tr data-time="20:00:00"><td class="fc-time" style="width: 42px;"><span class="time_title">20:00</span class="time_title"></td><td class="fc-widget-content"></td></tr><tr data-time="20:30:00" class="fc-minor"><td class="fc-time" style="width: 42px;"></td><td class="fc-widget-content"></td></tr><tr data-time="21:00:00"><td class="fc-time" style="width: 42px;"><span class="time_title">21:00</span class="time_title"></td><td class="fc-widget-content"></td></tr><tr data-time="21:30:00" class="fc-minor"><td class="fc-time" style="width: 42px;"></td><td class="fc-widget-content"></td></tr><tr data-time="22:00:00"><td class="fc-time" style="width: 42px;"><span class="time_title">22:00</span class="time_title"></td><td class="fc-widget-content"></td></tr><tr data-time="22:30:00" class="fc-minor"><td class="fc-time" style="width: 42px;"></td><td class="fc-widget-content"></td></tr><tr data-time="23:00:00"><td class="fc-time" style="width: 42px;"><span class="time_title">23:00</span class="time_title"></td><td class="fc-widget-content"></td></tr><tr data-time="23:30:00" class="fc-minor"><td class="fc-time" style="width: 42px;"></td><td class="fc-widget-content"></td></tr></tbody></table></div>';
    content += '<div id="event_day_time" class="event_day_time">';
   
    //showCarInfoEvent_List(esize);
    tiva_events.sort(sortEventsByDateTime);
    var wid=100;
    var flag=true;
    var info="";
    var top=0;
    var left=0;
    var width=0;
    var height=0;
    var item_height=1056/(60*24);
    var preItem=null;
    var preleft=0;
    for(var i=0;i<tiva_events.length;i++)
    {
        if(parseInt(tiva_events[i].day)===o_day&&parseInt(tiva_events[i].month)===o_month&&parseInt(tiva_events[i].year)===o_year
                &&parseInt(tiva_events[i].eday)===o_day&&parseInt(tiva_events[i].emonth)===o_month&&parseInt(tiva_events[i].eyear)===o_year)
        {
            if(preItem===null)
            {
                left=0;
            }
            else
            {
                if(preItem.time_end>tiva_events[i].time)                   
                {
                    left=preleft+100;
                    preleft=left;                   
                }
                else
                {
                    left=0;
                    preleft=0;
                    preItem=null;
                }
            }
            preItem=tiva_events[i];
            top=parseInt(getDiffFromStart(tiva_events[i].time)*item_height);
            height=parseInt(tiva_events[i].s_duration*item_height);
            info+='<div class="event_daytime_item" onclick="showEventDetail('+i+',\'full\','+ o_day + ', ' + o_month + ', ' + o_year + ')" style="left:'+left+'px;top:'+top+'px;height:'+height+'px;background:'+randomColor()+'"><span class="daytime_name">'+tiva_events[i].name+'</span></div>';
        }
    }
    content+=info;
    content+='</div>';
    jQuery('.tiva-event-daytime-full').append(content);
}

function getDiffFromStart(time)
{
    time=time.split(":");
    return (parseInt(time[0])*60+parseInt(time[1]));
}

// Show event detail
function showEventDetail(id, layout, day, month, year) {
    var item = tiva_events[id];
    jQuery('.tiva-events-calendar.' + layout + ' .back-calendar').show();
    jQuery('.tiva-events-calendar.' + layout + ' .tiva-calendar').hide();
    jQuery('.tiva-events-calendar.' + layout + ' .tiva-event-list').hide();
    jQuery('.tiva-events-calendar.' + layout + ' .tiva-event-daytime').hide();
    jQuery('.tiva-events-calendar.' + layout + ' .tiva-event-detail').fadeIn(1500);

    jQuery('.tiva-events-calendar.' + layout + ' .list-view').removeClass('active');
    jQuery('.tiva-events-calendar.' + layout + ' .calendar-view').removeClass('active');

    if (layout === 'full') {
        // Start date
        var day = new Date(tiva_events[id].year, Number(tiva_events[id].month) - 1, tiva_events[id].day);
        if (date_start === 'sunday') {
            var event_day = wordDay[day.getDay()];
        } else {
            if (day.getDay() > 0) {
                var event_day = wordDay[day.getDay() - 1];
            } else {
                var event_day = wordDay[6];
            }
        }
        var event_date = wordMonth[Number(tiva_events[id].month) - 1] + ' ' + tiva_events[id].day + ', ' + tiva_events[id].year;

        // End date
        var event_end_time = '';
        if (tiva_events[id].duration > 1) {
            var end_date = new Date(tiva_events[id].year, Number(tiva_events[id].month) - 1, Number(tiva_events[id].day) + Number(tiva_events[id].duration) - 1);

            if (date_start === 'sunday') {
                var event_end_day = wordDay[end_date.getDay()];
            } else {
                if (end_date.getDay() > 0) {
                    var event_end_day = wordDay[end_date.getDay() - 1];
                } else {
                    var event_end_day = wordDay[6];
                }
            }
            var event_end_date = wordMonth[Number(end_date.getMonth())] + ' ' + end_date.getDate() + ', ' + end_date.getFullYear();
            event_end_time = ' - ' + event_end_day + ', ' + event_end_date;
        }

        // Event time
        if (tiva_events[id].time) {
            var event_time = '<i class="fa fa-clock-o"></i>' + tiva_events[id].time;
        } else {
            var event_time = '';
        }

        // Event image
        if (tiva_events[id].image) {
            var event_image = '<img src="' + tiva_events[id].image + '" alt="' + tiva_events[id].name + '" />';
        } else {
            var event_image = '';
        }

        // Event location
        if (tiva_events[id].location) {
            var event_location = '' + tiva_events[id].location;
        } else {
            var event_location = '';
        }

        // Event description
        if (tiva_events[id].description) {
            var event_desc = '<div class="event-desc" style="color:red;font-size:20px;">状态:&nbsp;' + tiva_events[id].description + '</div>';
        } else {
            var event_desc = '';
        }

        var content = '<div class="event-item">'
                + '<div class="event_instance">'
                + '<div class="event-image event_info_image">' + event_image + '</div>'
                + '<div class="event_info">'
                + '<div class="tb_event_map" id="tb_map_' + id + '"></div>'
                + '<div class="event-name">' + tiva_events[id].name + '</div>'
                + '<div class="event-date"><i class="fa fa-calendar-o"></i>&nbsp;日期:&nbsp;' + event_day + ', ' + tiva_events[id].start_time + '&nbsp;至&nbsp;' + tiva_events[id].end_time + '</div>'
                + '<div class="event-time"><i class="fa fa-clock-o"></i>&nbsp;时间:' + tiva_events[id].time + '--' + tiva_events[id].time_end+ '</div>'
                + '<div class="event-location"><i class="fa fa-map-marker"></i>&nbsp;位置:&nbsp;' + event_location + '</div>'
                + '<div class="event-location"><i class="fa fa-filter" aria-hidden="true"></i>&nbsp;调查方式:&nbsp;' + tiva_events[id].method + '</div>';

        var esize;
        if (tiva_events[id].type === 3)
        {
            content += '<div class="event-location"><i class="fa fa-lightbulb-o" aria-hidden="true"></i>&nbsp;灯控模式:&nbsp;' + tiva_events[id].light_method + '</div>';
        }
        else
        {
            content += '<div class="event-cars"><div class="car_item_event"><i class="fa fa-car" aria-hidden="true"></i></i>&nbsp;&nbsp;调查车型:&nbsp;</div><div class="car_item_event"><ul class="nav nav-pills car_tb_items">';
            var peizhi = tiva_events[id].peizhi;
            esize = peizhi.length;
            for (var i = 0; i < peizhi.length; i++)
            {
                if (i >= 0)
                {
                    var id = i;
                    content += '<li class="car_tb_item">'
                            + '<a class="car_tb_name" data-toggle="popover_event_' + id + '">' + peizhi[i].type_name
                            + '<div id="tb_div_id_event_' + id + '" style="display:none;">'
                            + '<div class="tb_car_content"><span>车辆类型:' + peizhi[i].type_name + '</span><br/>\n\
                  <span>名称:' + peizhi[i].name + '</span><br/>\n\
                  <span>车长:' + peizhi[i].car_min_length + '-' + peizhi[i].car_max_length + '</span><br/>\n\
                  <span>载重:' + peizhi[i].car_min_weight + '-' + peizhi[i].car_max_weight + '</span><br/>\n\
                  <span>换算系数:' + peizhi[i].car_factor + '</span><br/></div>' + '</div></a></li>';
                }

            }
            content += '</ul></div></div>';
        }
        content += '<div class="event-location"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;调查员---姓名:' + tiva_events[id].u_name + '&nbsp;&nbsp;联系方式:' + tiva_events[id].u_way + '--' + tiva_events[id].u_info + '</div>'
                + event_desc
                + '</div></div></div>';
        jQuery('.tiva-event-detail-full').empty();
        jQuery('.tiva-event-detail-full').html(content);
        showCarInfoEvent(esize);
        initTBMap_Event(id, tiva_events[id].lat, tiva_events[id].lng, tiva_events[id].type);

    } else {
        jQuery('.tiva-event-detail-compact').html('');
        if (day && month && year) {
            var events = getEvents(day, month, year);
        } else {
            var events = [{id: id}];
        }
        for (var i = 0; i < events.length; i++) {
            if (typeof events[i] != "undefined") {
                // Start date
                var day = new Date(tiva_events[events[i].id].year, Number(tiva_events[events[i].id].month) - 1, tiva_events[events[i].id].day);
                if (date_start == 'sunday') {
                    var event_day = wordDay[day.getDay()];
                } else {
                    if (day.getDay() > 0) {
                        var event_day = wordDay[day.getDay() - 1];
                    } else {
                        var event_day = wordDay[6];
                    }
                }
                var event_date = wordMonth[Number(tiva_events[events[i].id].month) - 1] + ' ' + tiva_events[events[i].id].day + ', ' + tiva_events[events[i].id].year;

                // End date
                var event_end_time = '';
                if (tiva_events[events[i].id].duration > 1) {
                    var end_date = new Date(tiva_events[events[i].id].year, Number(tiva_events[events[i].id].month) - 1, Number(tiva_events[events[i].id].day) + Number(tiva_events[events[i].id].duration) - 1);

                    if (date_start == 'sunday') {
                        var event_end_day = wordDay[end_date.getDay()];
                    } else {
                        if (end_date.getDay() > 0) {
                            var event_end_day = wordDay[end_date.getDay() - 1];
                        } else {
                            var event_end_day = wordDay[6];
                        }
                    }
                    var event_end_date = wordMonth[Number(end_date.getMonth())] + ' ' + end_date.getDate() + ', ' + end_date.getFullYear();
                    event_end_time = ' - ' + event_end_day + ', ' + event_end_date;
                }

                // Event time
                if (tiva_events[events[i].id].time) {
                    var event_time = '<i class="fa fa-clock-o"></i>' + tiva_events[events[i].id].time;
                } else {
                    var event_time = '';
                }

                // Event image
                if (tiva_events[events[i].id].image) {
                    var event_image = '<img src="' + tiva_events[events[i].id].image + '" alt="' + tiva_events[events[i].id].name + '" />';
                } else {
                    var event_image = '';
                }

                // Event location
                if (tiva_events[events[i].id].location) {
                    var event_location = '<i class="fa fa-map-marker"></i>' + tiva_events[events[i].id].location;
                } else {
                    var event_location = '';
                }

                // Event description
                if (tiva_events[events[i].id].description) {
                    var event_desc = '<div class="event-desc">' + tiva_events[events[i].id].description + '</div>';
                } else {
                    var event_desc = '';
                }

                jQuery('.tiva-event-detail-compact').append('<div class="event-item">'
                        + '<div class="event-image">' + event_image + '</div>'
                        + '<div class="event-name">' + tiva_events[events[i].id].name + '</div>'
                        + '<div class="event-date"><i class="fa fa-calendar-o"></i>' + event_day + ', ' + event_date + event_end_time + '</div>'
                        + '<div class="event-time">' + event_time + '</div>'
                        + '<div class="event-location">' + event_location + '</div>'
                        + event_desc
                        + '</div>'
                        );
            }
        }
    }


}


function showCarInfoEvent(size)
{
    size = parseInt(size);
    if (size !== undefined && size !== null && size !== "undefined" && size !== "null")
    {
        for (var i = 0; i < size; i++)
        {
            $('[data-toggle=popover_event_' + i + ']').popover({
                content: $('#tb_div_id_event_' + i).html(),
                html: true
            }).click(function () {
                $(this).popover('show');
            });
        }
    }

}

function showCarInfoEvent_List(size)
{
    size = parseInt(size);
    if (size !== undefined && size !== null && size !== "undefined" && size !== "null")
    {
        for (var i = 0; i < size; i++)
        {
            $('[data-toggle=popover_list_' + i + ']').popover({
                content: $('#tb_div_id_list_' + i).html(),
                html: true
            }).click(function () {
                $(this).popover('show');
            });
        }
    }

}

function initData()
{
    thisDate = 1;
    today = new Date();
    todaysDay = today.getDay() + 1;
    todaysDate = today.getDate();
    todaysMonth = today.getMonth() + 1;
    todaysYear = today.getFullYear();
    firstDate;
    firstDay;
    lastDate;
    numbDays;
    numevents = 0;
    daycounter = 0;
    calendarString = "";
    monthNum_full = todaysMonth;
    yearNum_full = todaysYear;
    monthNum_compact = todaysMonth;
    yearNum_compact = todaysYear;

    tiva_events = [];
    order_num = 0;

// Config variable
    wordDay;
    date_start;
}

function initTBMap_Event(index, lat, lng, option)
{
    var map = new BMap.Map("tb_map_" + index);
    lat = parseFloat(lat);
    lng = parseFloat(lng);
    map.centerAndZoom(new BMap.Point(lng, lat), 16);  // 初始化地图,设置中心点坐标和地图级别
    //map.addControl(new BMap.MapTypeControl());   //添加地图类型控件     // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);

    var point = new BMap.Point(lng, lat);
    var myIcon;
    if (option === 1)
    {
        myIcon = new BMap.Icon("./mapIcon/intersection_tb.png", new BMap.Size(40, 40));
    }
    else if (option === 2)
    {
        myIcon = new BMap.Icon("./mapIcon/seg_tb.png", new BMap.Size(40, 40));
    }
    else
    {
        myIcon = new BMap.Icon("./mapIcon/light_tb.png", new BMap.Size(40, 40));
    }

    var marker = new BMap.Marker(point, {icon: myIcon});
    map.addOverlay(marker);
}

function loadCalendarEvents()
{
    initData();

    // Init calendar full
    if (jQuery('.tiva-events-calendar.full').length) {
        jQuery('.tiva-events-calendar.full').html('<div class="events-calendar-bar">'
                + '<span class="bar-btn calendar-view active"><i class="fa fa-calendar-o"></i>' + calendar_view + '</span>'
                + '<span class="bar-btn list-view"><i class="fa fa-list"></i>' + list_view + '</span>'
                + '<span class="bar-btn back-calendar pull-right active"><i class="fa fa-caret-left"></i>' + back + '</span>'
                + '</div>'
                + '<div class="cleardiv"></div>'
                + '<div class="tiva-events-calendar-wrap">'
                + '<div class="tiva-calendar-full tiva-calendar"></div>'
                + '<div class="tiva-event-list-full tiva-event-list"></div>'
                + '<div class="tiva-event-daytime-full tiva-event-daytime"></div>'
                + '<div class="tiva-event-detail-full tiva-event-detail" style="height:580px;"></div>'
                + '</div>'
                );
    }

    // Init calendar compact
//    if (jQuery('.tiva-events-calendar.compact').length) {
//        jQuery('.tiva-events-calendar.compact').html('<div class="events-calendar-bar">'
//                + '<span class="bar-btn calendar-view active"><i class="fa fa-calendar-o"></i>' + calendar_view + '</span>'
//                + '<span class="bar-btn list-view"><i class="fa fa-list"></i>' + list_view + '</span>'
//                + '<span class="bar-btn back-calendar pull-right active"><i class="fa fa-caret-left"></i>' + back + '</span>'
//                + '</div>'
//                + '<div class="cleardiv"></div>'
//                + '<div class="tiva-events-calendar-wrap">'
//                + '<div class="tiva-calendar-compact tiva-calendar"></div>'
//                + '<div class="tiva-event-list-compact tiva-event-list"></div>'
//                + '<div class="tiva-event-list-compact tiva-event-daytime"></div>'
//                + '<div class="tiva-event-detail-compact tiva-event-detail"></div>'
//                + '</div>'
//                );
//    }

    // Show - Hide view
    jQuery('.tiva-events-calendar .back-calendar').hide();
    jQuery('.tiva-event-list').hide();
    jQuery('.tiva-event-daytime').hide();
    jQuery('.tiva-event-detail').hide();

    jQuery('.tiva-events-calendar').each(function (index) {
        // Hide switch button
        var switch_button = (typeof jQuery(this).attr('data-switch') !== "undefined") ? jQuery(this).attr('data-switch') : 'show';
        if (switch_button === 'hide') {
            jQuery(this).find('.calendar-view').hide();
            jQuery(this).find('.list-view').hide();

            // Change css of button back
            jQuery(this).find('.events-calendar-bar').css('position', 'relative');
            jQuery(this).find('.back-calendar').css({"position": "absolute", "margin-top": "15px", "right": "15px"});
            jQuery(this).find('.tiva-event-detail').css('padding-top', '60px');
        }
    });

    // Set wordDay
    date_start = (typeof jQuery('.tiva-events-calendar').attr('data-start') !== "undefined") ? jQuery('.tiva-events-calendar').attr('data-start') : 'sunday';
    if (date_start === 'sunday') {
        wordDay = new Array(wordDay_sun, wordDay_mon, wordDay_tue, wordDay_wed, wordDay_thu, wordDay_fri, wordDay_sat);
    } else { // Start with Monday
        wordDay = new Array(wordDay_mon, wordDay_tue, wordDay_wed, wordDay_thu, wordDay_fri, wordDay_sat, wordDay_sun);
    }

    // Get events from json file or ajax php
    var source = (typeof jQuery('.tiva-events-calendar').attr('data-source') !== "undefined") ? jQuery('.tiva-events-calendar').attr('data-source') : 'json';
    if (source === 'json') { // Get events from json file : events/events.json
        jQuery.getJSON(events_json, function (data) {
            for (var i = 0; i < data.items.length; i++) {
                var event_date = new Date(data.items[i].year, Number(data.items[i].month) - 1, data.items[i].day);
                data.items[i].date = event_date.getTime();
                tiva_events.push(data.items[i]);
            }

            // Sort events by date
            tiva_events.sort(sortEventsByDate);

            for (var j = 0; j < tiva_events.length; j++) {
                tiva_events[j].id = j;
                if (!tiva_events[j].duration) {
                    tiva_events[j].duration = 1;
                }
            }

            // Create calendar
            changedate('current', 'full');
            changedate('current', 'compact');

            jQuery('.tiva-events-calendar').each(function (index) {
                // Initial view
                var initial_view = (typeof jQuery(this).attr('data-view') !== "undefined") ? jQuery(this).attr('data-view') : 'calendar';
                if (initial_view === 'list') {
                    jQuery(this).find('.list-view').click();
                }
            });
        });
    }
    else { // Get events from php file via ajax
        var st_id = $("#project_body").attr("st_id");
        jQuery.ajax({
            url: "../../HandleGetCalendarEvents?st_id=" + st_id,
            dataType: 'json',
            data: '',
            beforeSend: function () {
                jQuery('.tiva-calendar').html('<div class="loading"><img src="assets/images/loading.gif" /></div>');
            },
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var event_date = new Date(data[i].year, Number(data[i].month) - 1, data[i].day);
                    data[i].date = event_date.getTime();
                    tiva_events.push(data[i]);
                }

                // Sort events by date
                tiva_events.sort(sortEventsByDate);

                for (var j = 0; j < tiva_events.length; j++) {
                    tiva_events[j].id = j;
                    if (!tiva_events[j].duration) {
                        tiva_events[j].duration = 1;
                    }
                }

                // Create calendar
                changedate('current', 'full');
                // changedate('current', 'compact');

                jQuery('.tiva-events-calendar').each(function (index) {
                    // Initial view
                    var initial_view = (typeof jQuery(this).attr('data-view') !== "undefined") ? jQuery(this).attr('data-view') : 'calendar';
                    if (initial_view === 'list') {
                        jQuery(this).find('.list-view').click();
                    }
                });
            }
        });
    }

    // Click - Calendar view btn
    jQuery('.tiva-events-calendar .calendar-view').click(function () {
        jQuery(this).parents('.tiva-events-calendar').find('.back-calendar').hide();
        jQuery(this).parents('.tiva-events-calendar').find('.tiva-event-list').hide();
        jQuery(this).parents('.tiva-events-calendar').find('.tiva-event-daytime').hide();
        jQuery(this).parents('.tiva-events-calendar').find('.tiva-event-detail').hide();
        jQuery(this).parents('.tiva-events-calendar').find('.tiva-calendar').fadeIn(1500);

        jQuery(this).parents('.tiva-events-calendar').find('.list-view').removeClass('active');
        jQuery(this).parents('.tiva-events-calendar').find('.calendar-view').addClass('active');
    });

    // Click - List view btn
    jQuery('.tiva-events-calendar .list-view').click(function () {
        jQuery(this).parents('.tiva-events-calendar').find('.back-calendar').hide();
        jQuery(this).parents('.tiva-events-calendar').find('.tiva-calendar').hide();
        jQuery(this).parents('.tiva-events-calendar').find('.tiva-event-detail').hide();
        jQuery(this).parents('.tiva-events-calendar').find('.tiva-event-daytime').hide();
        jQuery(this).parents('.tiva-events-calendar').find('.tiva-event-list').fadeIn(1500);

        jQuery(this).parents('.tiva-events-calendar').find('.calendar-view').removeClass('active');
        jQuery(this).parents('.tiva-events-calendar').find('.list-view').addClass('active');

        var layout = jQuery(this).parents('.tiva-events-calendar').attr('class') ? jQuery(this).parents('.tiva-events-calendar').attr('class') : 'full';
        var max_events = jQuery(this).parents('.tiva-events-calendar').attr('data-events') ? jQuery(this).parents('.tiva-events-calendar').attr('data-events') : 1000;
        if (layout.indexOf('full') !== -1) {
            showEventList('full', max_events);
        } else {
            showEventList('compact', max_events);
        }
    });

    // Click - Back calendar btn
    jQuery('.tiva-events-calendar .back-calendar').click(function () {
        jQuery(this).parents('.tiva-events-calendar').find('.back-calendar').hide();
        jQuery(this).parents('.tiva-events-calendar').find('.tiva-event-detail').hide();

        var initial_view = (typeof jQuery(this).parents('.tiva-events-calendar').attr('data-view') !== "undefined") ? jQuery(this).parents('.tiva-events-calendar').attr('data-view') : 'calendar';
        if (initial_view === 'calendar') {
            jQuery(this).parents('.tiva-events-calendar').find('.tiva-calendar').fadeIn(1500);

            jQuery(this).parents('.tiva-events-calendar').find('.list-view').removeClass('active');
            jQuery(this).parents('.tiva-events-calendar').find('.calendar-view').addClass('active');
        } else {
            jQuery(this).parents('.tiva-events-calendar').find('.tiva-event-list').fadeIn(1500);

            jQuery(this).parents('.tiva-events-calendar').find('.calendar-view').removeClass('active');
            jQuery(this).parents('.tiva-events-calendar').find('.list-view').addClass('active');
        }
    });


}
