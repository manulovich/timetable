let vm = new Vue({
    el: "#wrapper",
    data: {
        textGreeting: "",
        group: "",
        week: "",
        day: "",
        burgerMenuStatus: false,
        groupStatus: false,
        weekStatus: false,
        dayStatus: false,
    },
    methods: {
        greeting(){
            let hours = new Date().getHours();
            if(hours > 9 && hours <= 15){
                this.textGreeting = "Добрый день";
            } else if(hours > 15 && hours <= 21){
                this.textGreeting = "Добрый вечер";
            } else if( (hours > 21 && hours <= 23) || (hours >= 0 && hours <= 3) ){
                this.textGreeting = "Доброй ночи";
            } else if(hours > 3 && hours <= 9){
                this.textGreeting = "Доброе утро";
            }
        },
        active(){
            this.burgerMenuStatus = !this.burgerMenuStatus;
            document.querySelector(".wrapper").classList.toggle("wrapper-active");
        },
        noActive(){
            if(window.matchMedia('(max-width: 760px)').matches){
                this.burgerMenuStatus = true;
                document.querySelector(".wrapper").classList.add("wrapper-active");
            }
        },
        groupHidden(){
            document.querySelectorAll(".timetable__group").forEach(function(item){
                if(item.classList.contains("hidden")){
                    item.classList.remove("hidden");
                }
            });
        },
        weekHidden(){
            document.querySelectorAll(".timetable__week-one").forEach(function(item){
                if(item.classList.contains("hidden")){
                    item.classList.remove("hidden");
                }
            });
            document.querySelectorAll(".timetable__week-two").forEach(function(item){
                if(item.classList.contains("hidden")){
                    item.classList.remove("hidden");
                }
            });
        },
        dayHidden(){
            document.querySelectorAll(".day").forEach(function(item){
                if(item.classList.contains("hidden")){
                    item.classList.remove("hidden");
                }
            });
        },
        sortGroup(group){
            this.groupHidden();
            document.querySelectorAll(".timetable__group").forEach(function(item){
                if(item.classList.contains(group) === false){
                    item.classList.add("hidden");
                }
            });
        },
        sortWeek(week){
            this.weekHidden();
            document.querySelectorAll(week).forEach(function(item){
                item.classList.add("hidden");
            });
        },
        sortDay(day){
            this.dayHidden();
            document.querySelectorAll(".day").forEach(function(item){
                if(item.classList.contains(day) === false){
                    item.classList.add("hidden");
                }
            });
        },
        selectGroup(item, i){
            this.groupStatus = false; 
            this.group = i;
            this.sortGroup(item);
            localStorage.groupItem = item;
            localStorage.groupI = i;
        },
        selectWeek(item, i){
            this.weekStatus = false;
            this.week = i;
            this.sortWeek(item);
        },
        selectDay(item, i){
            this.dayStatus = false;
            this.day =  i;
            this.sortDay(item);
        },
        autoSort(){
            //day
            let day = new Date().getDay();
            if(day === 1){
                this.selectDay("timetable__monday", "понедельник");
            } else if(day === 2){
                this.selectDay("timetable__tuesday", "вторник");
            } else if(day === 3){
                this.selectDay("timetable__wednesday", "среда");
            } else if(day === 4){
                this.selectDay("timetable__thursday", "четверг");
            } else if(day === 5){
                this.selectDay("timetable__friday", "пятница");
            }
            //week
            let week = new Date().getDate();
            let month = new Date().getMonth();
            if(month === 8){ // september
                if((week >= 1 && week <= 6) || (week >=14 && week <= 20) || (week >= 28 && week <= 30)){
                    this.selectWeek('.timetable__week-two', 'первая');
                } else if((week >= 7 && week <= 13) || (week >= 21 && week <= 27)){
                    this.selectWeek('.timetable__week-one', 'вторая');
                }
            } else if(month === 9){ // october
                if((week >= 1 && week <= 4) || (week >=12 && week <= 18) || (week >= 26 && week <= 31)){
                    this.selectWeek('.timetable__week-two', 'первая');
                } else if((week >= 5 && week <= 11) || (week >= 19 && week <= 25)){
                    this.selectWeek('.timetable__week-one', 'вторая');
                }
            } else if(month === 10){ //november
                if(week === 1 || (week >=9 && week <= 15) || (week >= 23 && week <= 29)){
                    this.selectWeek('.timetable__week-two', 'первая');
                } else if((week >= 2 && week <= 8) || (week >= 16 && week <= 22) || week === 30){
                    this.selectWeek('.timetable__week-one', 'вторая');
                }
            } else if(month === 11){ //december
                if((week >= 1 && week <= 6) || (week >=14 && week <= 20) || (week >= 28 && week <= 31)){
                    this.selectWeek('.timetable__week-two', 'первая');
                } else if((week >= 7 && week <= 13) || (week >= 21 && week <= 27)){
                    this.selectWeek('.timetable__week-one', 'вторая');
                }
            }
            //group
            if(localStorage.groupItem && localStorage.groupI){
                this.selectGroup(localStorage.groupItem, localStorage.groupI);
            }
        }
    },
    mounted() {
        this.greeting();
        this.noActive();
        this.autoSort();
    },
});