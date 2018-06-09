function Calendar(input, options) {
    this.now = new Date();
    this.day = this.now.getDate();
    this.month = this.now.getMonth();
    this.year = this.now.getFullYear();

    this.input = input; // zmienna trzymająca referencję do inputa tekstowego do którego podepniemy kalendarz
    this.divCnt = null; // kontener kalendarza
    this.divHeader = null; //nagłówek kalendarza
    this.divTable = null; // kontener tabeli z kalendarzem
    this.divDateText = null; // kontener z nazwą miesiąca i roku 
    this.divButtons = null; // kontener z przyciskami przełączającymi miesiące

    this.toggleShow = function() {
        this.divCnt.classList.toggle('calendar-show');
    }

    this.show = function() {
        this.divCnt.classList.add('calendar-show');
    }

    this.hide = function() {
        this.divCnt.classList.remove('calendar-show');
    }

    this.createDateText = function () {
        const monthNames = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
    
        this.divDateText.innerHTML = monthNames[this.month] + ' ' + this.year;
    };
            //metoda tworząca guziki 
            this.createButtons = function () { 
                //Przycisk "Poprzedni miesią" 
                const buttonPrev = document.createElement('button');
                buttonPrev.innerText = "<";
                buttonPrev.type = "button";
                buttonPrev.classList.add('input-prev');
                buttonPrev.addEventListener('click', function () {
                    this.month--;
                    if (this.month < 0){
                        this.month = 11;
                        this.year--;
                    }
                    this.createCalendarTable();
                    this.createDateText();
                }.bind(this));
                this.divButtons.appendChild(buttonPrev);

                //Przycisk "Natępny miesiąc"
                const buttonNext = document.createElement('button');
                buttonNext.classList.add('input-next');
                buttonNext.innerText = '>';
                buttonNext.type = "button";
                buttonNext.addEventListener('click', function() {
                    this.month++;
                    if(this.month > 11) {
                        this.month = 0;
                        this.year++;
                    }
                    this.createCalendarTable();
                    this.createDateText();
                }.bind(this));
                this.divButtons.appendChild(buttonNext);
            };

            //Metoda tworząca tabele z dniami kalendarza
            this.createCalendarTable = function () {
                //czyścimy div z tabelą = '';
                this.divTable.innerHTML = '';

                //tworzymy tabelę z dniami kalendarza
                const tab = document.createElement('table');
                tab.classList.add('calendar-table');
    
                //tabelę dołączamy do div divTable
                this.divTable.appendChild(tab);
    
                //tworzymy nagłówki dni 
                let tr = document.createElement('tr');
                tr.classList.add('calendar-table-day-names')
                const days = ['Pn', 'Wt', 'Sr', 'Cz', 'Pt', 'So', 'Nd'];
                for(let i=0; i<days.length; i++) {
                    const th = document.createElement('th');
                    th.innerHTML = days[i];
                    tr.appendChild(th);
                }
                tab.appendChild(tr);
    
                //pobieramy wszystkie dni w miesiącu
                const daysInMonth = new Date(this.year, this.month+1, 0).getDate();
    
                //pobieramy pierwszy dzień miesiąca 
                const tempDate = new Date(this.year, this.month, 1);
                let firstMonthDay = tempDate.getDay();
    
                //ustawienie poniedziałku jako pierwszy dzień tygodnia
                if(firstMonthDay === 0) {
                    firstMonthDay = 7;
                }
    
                //liczba wszystkich komórek - i pustych i z dniami 
                const j = daysInMonth + firstMonthDay - 1;
    
                if (firstMonthDay - 1 !== 0) {
                    tr= document.createElement('tr');
                    tab.appendChild(tr);
                }
    
                //na początku generujemy puste komórki
    
                for (let i=0; i < firstMonthDay - 1; i++) {
                    const td = document.createElement('td');
                    td.innerHTML = '';
                    tr.appendChild(td);
                }
    
                //generujemy komórki z dniami miesiąca
                for (let i = firstMonthDay-1; i<j; i++) {
                    if((i % 7) == 0) {
                        tr = document.createElement('tr');
                        tab.appendChild(tr);
                    } 
    
                    const td = document.createElement('td');
                    td.innerText = i - firstMonthDay + 2;
                    td.dayNr = i - firstMonthDay + 2;
                    td.classList.add('day');
    
                    if (this.year === this.now.getFullYear() && this.month === this.now.getMonth() && this.day === i - firstMonthDay + 2) {
                        td.classList.add('current-day')
                    }
    
                    tr.appendChild(td);
                }

                tab.appendChild(tr);

                this.divTable.appendChild(tab);
            };

    // metoda inicjująca
    this.init = function () {
        //dodajemy inputowi klasę, która doda ikonę kalendarza i zmieni kursor
        this.input.classList.add('input-calendar');

        //kontener całego kalendarza
        this.divCnt = document.createElement('div');
        this.divCnt.classList.add('calendar');

        // tworzymy div z guzikami
        this.divButtons = document.createElement('div');
        this.divButtons.className = "calendar-prev-next";
        this.createButtons();

        // tworzymy div z nazwą miesiąca i roku
        this.divDateText = document.createElement('div');
        this.divDateText.className = 'date-name';
        this.createDateText();

        // div z przyciskami prev, next i div z nazwą miesiąca 
        // wrzucamy do wspólnego diva .calendar-header
        this.divHeader = document.createElement('div');
        this.divHeader.classList.add('calendar-header');

        this.divHeader.appendChild(this.divButtons);
        this.divHeader.appendChild(this.divDateText);
        this.divCnt.appendChild(this.divHeader);

        // tworzymy div z tabelą kalnedarza
        this.divTable = document.createElement('div');
        this.divTable.className = 'calendar-table-cnt';
        this.divCnt.appendChild(this.divTable);
        this.createCalendarTable();

        // tworzymy wrapper dla input
        this.calendarWrapper = document.createElement('div');
        this.calendarWrapper.classList.add('input-calendar-cnt');
        this.input.parentElement.insertBefore(this.calendarWrapper, this.input);
        this.calendarWrapper.appendChild(this.input);

        this.input.addEventListener('click', function(){
            this.toggleShow();
        }.bind(this));

        this.input.addEventListener('click', function(e) {
           e.stopImmediatePropagation(); 
        });

        this.divCnt.addEventListener('click', function(e) {
            e.stopImmediatePropagation(); 
         });        

        document.addEventListener('click', function(){
            this.hide();
        }.bind(this));
        
        // nasz div z zawartością wrzucamy na koniec body
        this.calendarWrapper.appendChild(this.divCnt);
    };
};

const input = document.querySelector('.input');
const cal = new Calendar(input);
cal.init();