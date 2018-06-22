if (window.location.href.indexOf('elcdev') >= '0') {
    $("<div id='jg-drp-tb123' style='margin-left:5px;'></div>").insertBefore("#toolbar .toolbar-menu #toolbar-user");
    $("#jg-drp-tb123").css("display", "inline-block");
    $("#jg-drp-tb123").append("<div id='drp-inner-bmk'></div>");
    iconurl1 = chrome.extension.getURL("close.png");
    iconurl2 = chrome.extension.getURL("open.png");
    iconurl3 = chrome.extension.getURL("home.png");
    iconurl4 = chrome.extension.getURL("all.png");
    iconurl5 = chrome.extension.getURL("close2.png");
    iconurl6 = chrome.extension.getURL("copy.png");
    iconurl7 = chrome.extension.getURL("copy2.png");
    iconurl8 = chrome.extension.getURL("macoverlay.png");
    iconurl9 = chrome.extension.getURL("akamai.png");
    document.getElementById("drp-inner-bmk").innerHTML += "<input type='checkbox' title='Odświeżanie storny co 10minut' style='position:relative !important;top:3px !important; left:0px !important; margin-left:10px;' id='reloadCB' ><span title='Odświeżanie storny co 10minut' id='setTimeoutField' style='font-size:11px; font-family:'Lucida Grande', 'Lucida Sans Unicode', sans-serif;'>Refresh every 10m</span></input>";
    document.getElementById("drp-inner-bmk").innerHTML += "<span id='mainnode' title='Otwieranie noda spinającego'><img src='" + iconurl3 + "'class='batonki-cbx imgAdrianC'><span style='font-size:11px; font-family:'Lucida Grande', 'Lucida Sans Unicode', sans-serif;'>Open Main Node</span></span>";
    document.getElementById("drp-inner-bmk").innerHTML += "<span id='closure' title='Zwijanie sekcji'><img src='" + iconurl1 + "'class='batonki-cbx imgAdrianC'><span style='font-size:11px; font-family:'Lucida Grande', 'Lucida Sans Unicode', sans-serif;'>Close all tabs</span></span>";
    document.getElementById("drp-inner-bmk").innerHTML += "<span id='opening' title='Rozwijanie sekcji'><img src='" + iconurl2 + "'class='batonki-cbx imgAdrianC'  ><span style='font-size:11px; font-family:'Lucida Grande', 'Lucida Sans Unicode', sans-serif;'>Open all tabs</span></span>";
    document.getElementById("drp-inner-bmk").innerHTML += "<span id='openallclick' title='Lista nodów używanych na stornie'><img src='" + iconurl4 + "'class='batonki-cbx' id='openall' ><span style='font-size:11px; font-family:'Lucida Grande', 'Lucida Sans Unicode', sans-serif;'>All nodes used here</span></span>";
    document.getElementById("drp-inner-bmk").innerHTML += "<span id='copynodeclick' title='Lista adresów url wyszukanych nodów'><img src='" + iconurl7 + "'class='batonki-cbx imgAdrianC' id='copynode'><span style='font-size:11px; font-family:'Lucida Grande', 'Lucida Sans Unicode', sans-serif;'>Akamai List</span></span>";
    document.getElementById("drp-inner-bmk").innerHTML += "<span id='macoverlayclick' title='Wyświetlenie elementów półprzezroczystych'><img src='" + iconurl8 + "'class='batonki-cbx imgAdrianC' id='macoverlay'><span style='font-size:11px; font-family:'Lucida Grande', 'Lucida Sans Unicode', sans-serif;'>MAC Overlay</span></span>";
    if(window.location.pathname.indexOf('admin')  >= '0'){
        var displayNone = document.getElementById('mainnode');
        displayNone.style.display = "none";
        var displayNone = document.getElementById('openallclick');
        displayNone.style.display = "none";
    }
    if(window.location.pathname.indexOf('content')  >= '0'){
        document.getElementById('copynodeclick').style.display = "inline";
    }
    if(window.location.href.indexOf('maccosmetics')  >= '0'){
        document.getElementById('macoverlayclick').style.display = "inline";
    }
    //odswiezanie okna
    var refreshing;
    $(document).ready(function () {
        if ($('#reloadCB').is(':checked')) {
            refreshing = setTimeout(function () {
                window.location.reload();
                let counter = 10;
                let setTimeoutField = document.getElementById('setTimeoutField');
                console.log(setTimeoutField);
                setTimeoutField.innerHTML = "Refresh in" + counter;
                checkTimeout = setInterval(function (){
                    setTimeoutField.innerHTML = "Refresh in" + counter;
                }, 60000);
            }, 600000);
        }
    });
    var checkboxValues = JSON.parse(localStorage.getItem('checkboxValues')) || {}
        , $checkboxes = $("#drp-inner-bmk :checkbox");
    $checkboxes.on("change", function () {
        $checkboxes.each(function () {
            checkboxValues[this.id] = this.checked;
        }); 
        localStorage.setItem("checkboxValues", JSON.stringify(checkboxValues));
        $(document).ready(function () {
            if ($('#reloadCB').is(':checked')) {
            refreshing = setTimeout(function () {
                window.location.reload();
                let counter = 10;
                let setTimeoutField = document.getElementById('setTimeoutField');
                setTimeoutField.innerHTML = "Refresh in" + counter;
                checkTimeout = setInterval(function (){
                    setTimeoutField.innerHTML = "Refresh in" + counter;
                }, 60000);
            }, 600000);
            }
            else {
                window.clearTimeout(refreshing);
            }
        });
    });
    $.each(checkboxValues, function (key, value) {
        $("#" + key).prop('checked', value);
    });
    //otwieranie okna
    document.getElementById('opening').onclick = function () {
        var change_disp = document.getElementsByClassName("fieldset-wrapper");
        var change_array = Array.prototype.slice.call(change_disp);

        function looper(i) {
            if (i < document.querySelectorAll('.fieldset-wrapper').length) {
                change_array[i].style.display = "block";
                i++;
                setTimeout(function () {
                    looper(i);
                }, 50);
            }
        };
        looper(0);
    };
    //Zamykanie tabow
    document.getElementById('closure').onclick = function () {
        var change_disp = document.querySelectorAll(".collapsible > .fieldset-wrapper");
        var change_array = Array.prototype.slice.call(change_disp);

        function looper(i) {
            if (i < document.querySelectorAll('.fieldset-wrapper').length) {
                change_array[i].style.display = "none";
                i++;
                setTimeout(function () {
                    looper(i);
                }, 50);
            }
        };
        looper(0);
    };
    //Otwieranie spinającego
    document.getElementById('mainnode').onclick = function () {
        var nid = 0;
        if ($('article').is("[data-node-nid]")) {
            nid = $('article').attr('data-node-nid');
        }
        else {
            nid = $('article').attr('class').split(' ')[0].slice(5)
        }
        
        if (window.location.href.indexOf('emea3') >= '0') {
            var address=location.pathname;
            var path=address.substring(0, 6);
        window.open(path + '/node/' + nid + '/workflow', '_blank');
        }
        else{
        window.open('/node/' + nid + '/workflow', '_blank');  
        }
    };
    //listowanie wykorzystanych nodow
    document.getElementById('openall').onload = function () {
            var arr = [];
            var arr2 = [];
            var divs = document.getElementsByTagName("div");
            for (var i = 0; i < divs.length; i++) {
                var list = divs[i].getAttribute('id');
                var title = divs[i].getAttribute('trackname');
                arr.push(list);
                arr2.push(title)
            }
            $("body").append("<div id='dialog-jg' style='display:none'><div id='close-dialog' style='cursor:pointer; text-align:center; position:fixed;'><img src='" + iconurl5 + "'class='batonki-cbx' id='closure' title='closure' style='padding:0px !important; top:-20px; left:-20px; position:absolute; max-width:40px !important'></div><ol id='dialog-jg-ol' style='color:black !important;'></ol></div>");
            for (var w = 0; w < arr.length; w++) {
                if (typeof arr[w] === 'string' && arr[w].indexOf('node-') > -1) {
                    var mainUrl = window.location.href;
                    var mainUrlSplit = mainUrl.split('/');
                    var TotUrl = mainUrlSplit[0] + "//" + mainUrlSplit[2];
            if (window.location.href.indexOf('emea3') >= '0') {
            var address=location.pathname;
            var path=address.substring(0, 6);
                    $("#dialog-jg-ol").append("<li style='color:black !important'>" + "<span class='elipsis' style='color:black !important'>" + arr[w] + " " + arr2[w] + "...</span>" + "<a href='" + TotUrl + path + "/node/" + arr[w].slice(5, arr[w].length) + "/workflow' target='_blank' title='" + arr2[w] + "' style='float:right; margin-left:5px'>WFL</a>" + " " + "<a href='" + TotUrl + path + "/node/" + arr[w].slice(5, arr[w].length) + "/translate' target='_blank' title='" + arr2[w] + "' style='float:right; margin-right:5px;'>LOC</a>" + "</li>");
            }else{
                    $("#dialog-jg-ol").append("<li style='color:black !important'>" + "<span class='elipsis' style='color:black !important'>" + arr[w] + " " + arr2[w] + "...</span>" + "<a href='" + TotUrl + "/node/" + arr[w].slice(5, arr[w].length) + "/workflow' target='_blank' title='" + arr2[w] + "' style='float:right; margin-left:5px'>WFL</a>" + " " + "<a href='" + TotUrl + "/node/" + arr[w].slice(5, arr[w].length) + "/translate' target='_blank' title='" + arr2[w] + "' style='float:right; margin-right:5px;'>LOC</a>" + "</li>"); 
            }
                }
            }
            document.getElementById('close-dialog').onclick = function () {
                $("#dialog-jg").css("display", "none");
            }
            document.getElementById('openallclick').onclick = function () {
                $("#dialog-jg").css("display", "block");
            }
        }
        //copy to clipboard nodes
    document.getElementById('copynode').onload = function () {
        var j = 0;
        var c = 0;
        var mainUrl = window.location.href;
        var mainUrlSplit = mainUrl.split('/');
        var TotUrl = mainUrlSplit[0] + "//" + mainUrlSplit[2];
        $("body").append("<div id='dialog-adrianC' style='display:none'><div id='close-dialog-copynode' style='cursor:pointer; text-align:center; position:fixed;'><img src='" + iconurl5 + "'class='batonki-cbx' id='closure' title='closure' style='padding:0px !important; top:-20px; left:-20px; position:absolute; max-width:40px !important'></div><a href='" + TotUrl + "/admin/config/system/akamai' target='_blank'><div  style='cursor:pointer; text-align:center; position:fixed;'><img src='" + iconurl9 + "'class='batonki-cbx' id='closure' title='Akamai' style='padding:0px !important; top:-20px; left:30px; position:absolute; max-width:40px !important'></div></a><ol id='dialog-adrianC-ol' style='color:black !important;'></ol></div>");
        var anchor = document.getElementsByClassName("desktop-preview-link");
        var n = anchor.length;
        for (var i = 0; i < n; i++) {
            var href = anchor[i].pathname;
            href = href.substr(0, 0) + href.substr(1);
            $("#dialog-adrianC-ol").append("<li style='color:black !important'>" + "<span class='elipsis' style='color:black !important'>" + href + "</span>" + "</li>");
        }
        document.getElementById('close-dialog-copynode').onclick = function () {
            $("#dialog-adrianC").css("display", "none");
        }
        document.getElementById('copynodeclick').onclick = function () {
            $("#dialog-adrianC").css("display", "block");
        }
    }
    
    //MAC Overlay
    document.getElementById('macoverlayclick').onclick = function () {
        var change_disp = document.getElementsByClassName("block-image-overlay__content-wrapper");
        var change_array = Array.prototype.slice.call(change_disp);

        function looper(i) {
            if (document.querySelectorAll('.block-image-overlay__content-wrapper').length >= i) {
                change_array[i].style.opacity = "2";
                i++;
                setTimeout(function () {
                    looper(i);
                }, 50);
            }
        };
        looper(0);
    }
    
    //Jo Malone Navigation Fix
    if((window.location.href.indexOf('jomalone') && window.location.href.indexOf('cms'))  >= '0'){
        var benefits = document.getElementsByClassName('benefits-header-content');
        benefits[0].style.setProperty("display", "none"); 
    }
    
    //Auto pin token
    if(window.location.pathname.indexOf('user')  >= '0'){
        document.getElementById('copynode').onload = function () {
        document.getElementById('edit-name').addEventListener('change', function () {
            var pass = document.getElementById('edit-pass');
            var login = this.value;
            if (login == "murbanczyk") {
                pass.value = "19870511";
            }
            else if (login == "pbadek") {
                pass.value = "49168015";
            }
            else if (login == "mmabiki") {
                pass.value = "97538642";
            }
            else if (login == "bnorbert") {
                pass.value = "19820325";
            }
        });
    }
    }
}else if(window.location.href.indexOf('pushtool') >= '0') {
        let tbody = document.getElementsByTagName("tbody")
        const ddpPuhtoolButton = document.createElement("span");
        ddpPuhtoolButton.setAttribute("id", "ddpPuhtoolButton")
        ddpPuhtoolButton.innerText = "DD Pushtool";
        ddpPuhtoolButton.setAttribute("title", "Zmodyfikowany Pushtool")
        let tr = tbody[0].getElementsByTagName("tr");
    
        if(document.getElementsByTagName("input").length > 1) {
        tbody[0].insertBefore(ddpPuhtoolButton, tr[0]);
        }
    
    document.getElementById('ddpPuhtoolButton').onclick = function () {
    let tr = document.getElementsByTagName("tr");
    let tdRow1 = tr[0].getElementsByTagName("td");
    let tdRow2 = tr[2].getElementsByTagName("td");
            tdRow1[1].remove();
            tdRow2[1].remove();
        
        const newTdRow1 = document.createElement("td");
        let newTdRow1Html = '';
            newTdRow1Html += '<label><input type="radio" name="brand" value="aveda">aveda</label>';
            newTdRow1Html += '<label><input type="radio" name="brand" value="bobbibrown">bobbibrown</label>';
            newTdRow1Html += '<label><input type="radio" name="brand" value="clinique">clinique</label>';
            newTdRow1Html += '<label><input type="radio" name="brand" value="cremedelamer">cremedelamer</label>';
            newTdRow1Html += '<label><input type="radio" name="brand" value="darphin">darphin</label>';
            newTdRow1Html += '<label><input type="radio" name="brand" value="esteelauder">esteelauder</label>';
            newTdRow1Html += '<label><input type="radio" name="brand" value="jomalone">jomalone</label>';
            newTdRow1Html += '<label><input type="radio" name="brand" value="maccosmetics">maccosmetics</label>';
            newTdRow1Html += '<label><input type="radio" name="brand" value="origins">origins</label>';
            newTdRow1Html += '<label><input type="radio" name="brand" value="smashbox">smashbox</label>';
        newTdRow1.innerHTML = newTdRow1Html;
        tr[0].insertBefore(newTdRow1, tdRow1[0].nextSibling);
        
        const newTdRow2 = document.createElement("td");
        let newTdRow2Html = '';
            newTdRow2Html += '<label><input type="radio" name="locale" value="at">at</label>';
            newTdRow2Html += '<label><input type="radio" name="locale" value="be">be</label>';
            newTdRow2Html += '<label><input type="radio" name="locale" value="benelux">benelux</label>';
            newTdRow2Html += '<label><input type="radio" name="locale" value="ch">ch</label>';
            newTdRow2Html += '<label><input type="radio" name="locale" value="de">de</label>';
            newTdRow2Html += '<label><input type="radio" name="locale" value="dk">dk</label>';
            newTdRow2Html += '<label><input type="radio" name="locale" value="emea">emea</label>';
            newTdRow2Html += '<label><input type="radio" name="locale" value="emea2">emea2</label>';
            newTdRow2Html += '<label><input type="radio" name="locale" value="emea3">emea3</label>';
            newTdRow2Html += '<label><input type="radio" name="locale" value="fr">fr</label>';
            newTdRow2Html += '<label><input type="radio" name="locale" value="it">it</label>';
            newTdRow2Html += '<label><input type="radio" name="locale" value="nl">nl</label>';
            newTdRow2Html += '<label><input type="radio" name="locale" value="nordic">nordic</label>';
            newTdRow2Html += '<label><input type="radio" name="locale" value="za">za</label>';
        newTdRow2.innerHTML = newTdRow2Html;
        tr[2].insertBefore(newTdRow2, tdRow2[0].nextSibling);
        
        ddpPuhtoolButton.classList.add("clicked");
    }
}