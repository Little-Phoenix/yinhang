function Calendar(parentEl) {
  this.date = new Date();

  this.changeDate = function() {
    this.day = this.date.getDate();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getYear() + 1900;
    this.weekDay = this.date.getDay();

    this.weekDays = ['一', '二', '三', '四', '五', '六', '七']; //一周表示
    this.monthWith31 = [1, 3, 5, 7, 8, 10, 12]; //每月有31天的月
    this.monthWith30 = [4, 6, 9, 11]; //每月有30天的月
    this.febDays = this.year%4 === 0 ? 29 : 28;//二月天数
  }

  this.changeDate();


  //分析每个月的1号是周几
  this.firstDayWeek = function(date) {
    let firstDay = new Date(this.year + '-' + this.month + '-01');
    let weekDay = firstDay.getDay() === 0 ? 1 : firstDay.getDay();
    return weekDay;
  }


  this.monthDays = function() {
    if(this.month === 2) {
      return this.febDays;
    } else if(this.monthWith30.indexOf(this.month) >= 0) {
      return 30;
    } else if(this.monthWith31.indexOf(this.month) >= 0) {
      return 31;
    }
  }

  //初始化html
  this.init = function() {
    let top = createEl('div');
    top.className = 'top';
    let leftBtn = createEl('a');
    leftBtn.className = 'left-btn'
    leftBtn.setAttribute('href', 'javascript:void(0)');
    leftBtn.setAttribute('onclick', 'calendarPre()')
    let yearMonth = createEl('span');
    yearMonth.innerHTML = this.year + '年' + this.month + '月';
    yearMonth.className = 'year-month'
    let rightBtn = createEl('a');
    rightBtn.className = 'right-btn'
    rightBtn.setAttribute('href', 'javascript:void(0)');
    rightBtn.setAttribute('onclick', 'calendarNext()')

    top.appendChild(leftBtn);
    top.appendChild(yearMonth);
    top.appendChild(rightBtn);

    //星期
    let table = createEl('table');
    let tr = createEl('tr');
    this.weekDays.forEach(function(item) {

      let th = createEl('th');
      th.innerHTML = item;
      tr.appendChild(th);
    })

    table.appendChild(tr);

    function getTds(monthWeek, weekTr, firstDayWeek, today, monthDays) {
      for(var i=0; i < 7; i++) {
        let td = createEl('td');
        var day = monthWeek * 7 + i - firstDayWeek + 2;
        if(day === today) {//标记当前日
          td.className = 'today';
        }
        if((monthWeek === 0 && i<firstDayWeek-1) || (monthWeek === 4 && day > monthDays)) {
          td.innerHTML = ''
          weekTr.appendChild(td);
        } else if(monthWeek === 5 && day > monthDays){

        } else {
          td.innerHTML = day;
          weekTr.appendChild(td);
        }

      }
    }

    //日期
    for(var i=0; i<6; i++) {
      let weekTr = createEl('tr');
      getTds(i, weekTr, this.firstDayWeek(this.date), this.day, this.monthDays());
      table.appendChild(weekTr);
    }


    let calendar = createEl('div');
    calendar.className = 'calendar';
    calendar.appendChild(top);
    calendar.appendChild(table);

    parentEl.appendChild(calendar) ;
  }

  this.refresh = function() {

    let table = parentEl.getElementsByTagName('table')[0];
    table.innerHTML = ''
    let yearMonth = parentEl.getElementsByClassName('year-month')[0];
    yearMonth.innerHTML = this.year + '年' + this.month + '月'

    let tr = createEl('tr');
    this.weekDays.forEach(function(item) {

      let th = createEl('th');
      th.innerHTML = item;
      tr.appendChild(th);
    })

    table.appendChild(tr);

    function getTds(monthWeek, weekTr, firstDayWeek, monthDays, month, year) {
      for(var i=0; i < 7; i++) {
        let td = createEl('td');
        var day = monthWeek * 7 + i - firstDayWeek + 2;
        let date = new Date();
        if(day === date.getDate() && month === (date.getMonth() + 1) && year === (date.getYear() + 1900)) {//标记当前日
          td.className = 'today';
        }
        if((monthWeek === 0 && i<firstDayWeek-1) || (monthWeek === 4 && day > monthDays)) {
          td.innerHTML = ''
          weekTr.appendChild(td);
        } else if(monthWeek === 5 && day > monthDays){

        } else {
          td.innerHTML = day;
          weekTr.appendChild(td);
        }

      }
    }

    //日期
    for(var i=0; i<6; i++) {
      let weekTr = createEl('tr');
      getTds(i, weekTr, this.firstDayWeek(this.date), this.monthDays(), this.month, this.year);

      table.appendChild(weekTr);
    }
  }

  function createEl(tag) {
    return document.createElement(tag);
  }

  this.calendarPre = function() {
    let day = 1;
    let month = this.month > 1 ? this.month - 1 : 12;
    let year = this.month > 1 ? this.year : this.year - 1;

    this.date = new Date(year + '-' + month + '-' + day);
    this.changeDate();
    this.refresh();
  }

  this.calendarNext = function() {

    let day = 1;
    let month = this.month > 11 ? 1 : this.month + 1;
    let year = this.month > 11 ? this.year + 1 : this.year;
    this.date = new Date(year + '-' + month + '-' + day);
    this.changeDate();

    this.refresh();
  }

}
