#### date-transform 日期提取

##### install

	npm install date-transform --save


##### using

	var dt = require("date-transform");
	var o = dt();

##### return 

	o = {
		year,
        month,
        date,
        h,
        i,
        s
	}


##### params
	
	var timestamp = new Date().getTime()／1000;
	var timeZone = 0;
	var o = dt(timestamp, timeZone);

	timestamp: 10位长度时间戳
	timeZone: 时区

