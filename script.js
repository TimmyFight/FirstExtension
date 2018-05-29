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

    // metoda inicjująca
    this.init = function () {
        //dodajemy inputowi klasę, która doda ikonę kalendarza i zmieni kursor
        this.input.classList.add('input-calendar');

        //kontener całego kalendarza
        this.divCnt = document.createElement('div');
        this.divCnt.classList.add('calendar');

        // tworzymy div zawierający przyciski prev i next
        this.divButtons = document.createElement('div');
        this.divButtons.className = 'calendar-prev-next';

        // tworzymy div z nazwą miesiąca i roku
        this.divDateText = document.createElement('div');
        this.divDateText.className = 'data-name';

        // div z przyciskami prev, next i div z nazwą miesiąca 
        // wrzucamy do wspólnego diva .calendar-header
        this.divHeader = document.createElement('div');
        this.divHeader.classList.add('calendar-header');

        this.divHeader.appendChild(this.divButtons);
        this.divHeader.appendChild(this.divDateText);
        this.divCnt.appendChild(this.divHeader);

        // tworzymy div do którego trafi tabela kalendarza
        this.divTable = document.createElement('div');
        this.divTable.className = 'calendar-table-cnt';
        this.divCnt.appendChild(this.divTable);

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
        
        //nasz div z zawartością wrzucamy na koniec body
        this.calendarWrapper.appendChild(this.divCnt);
    };
};

const input = document.querySelector('.input');
const cal = new Calendar(input);
cal.init();