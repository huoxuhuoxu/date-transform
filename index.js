// date-transform

const getFullYear = function(years){
    // 从1970年开始计算,70,71,73不是闰年,72是闰年,类推...
    var iY = ( years % 365 ) === 2 ? 0 : 1 ;   
    var iYear = { 
        y: null,
        d: null,
        b: iY
    };
    if(iY){
        iYear.y = Math.floor(years / 365);  
        iYear.d = (years % 365);            
    }else{
        // 闰年 特殊情况下的 反算
        iYear.y = 3;
        iYear.d = 366 + (years - 365 * 3);     
    }
    return iYear;
};

const getDate = function(a){
    var iMonth = {};
    if(a.b){                // 正常年
        return iMonth = getMonth(28, a.d);
    }else{                  // 闰年
        return iMonth =  getMonth(29, a.d);
    }
};

const getMonth = function(v, j){
    console.log(v, j);
    var monthes = [31,v,31,30,31,30,31,31,30,31,30,31],
        iMonthes = 0,
        iDate = j;
    for(var i in monthes){
        iMonthes += monthes[i];
        if(iMonthes > j){
            if(iDate==0){
                return {m:i,d:monthes[--i]}
            }
            return {m:(++i),d:iDate};
        }
        iDate -= monthes[i];
    }
};

// 时间戳转换方案 计算日期 
const date_transform = function(timestamp, timeZone){
    var iSecond = timestamp%60;
    var iTotalMinute = Math.floor(timestamp/60);   
    var iMinute = iTotalMinute%60;

    var iTotalHour = Math.floor(iTotalMinute/60) + timeZone;   
    var iHour = iTotalHour%24;                
    var iTotalDate = Math.floor(iTotalHour/24);   

    // 以四年为单位计算, 剩下需要反算的天数, 实际的年数 * 4
    var iFourDay = (365*3+366);                 
    var iTotalFullYear = iTotalDate%iFourDay;    
    var iFullYear = Math.floor(iTotalDate/iFourDay); 
    // 实际的年份 1970
    var iYearObj = getFullYear(iTotalFullYear);
    iFullYear =  iFullYear * 4 + iYearObj.y + 1970;

    // 实际剩下 天数 推算 月份 
    var iMonthDate = getDate(iYearObj);

    return {
        year: iFullYear,
        month: iMonthDate.m,
        date: iMonthDate.d,
        h: iHour,
        i: iMinute,
        s: iSecond
    };

};

module.exports = function(timestamp = new Date().getTime()/1000, timeZone = 0){
    return date_transform(timestamp, timeZone);
};

