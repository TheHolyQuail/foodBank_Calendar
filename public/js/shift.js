/* <table>
    for(var i = 0; i<events.length;i++) {
        <tr>
            <td>Event: <%= events[i].name %></td>
            <td>Date: <%= String(events[i].time).slice(0, 10); %></td>
            <td>time: <%= String(events[i].time).slice(11, 20) %></td>
            <td>Available volunteers: </td>
        </tr>
    }                       
</table>   */
var fullEventCount;

//sorts the events and puts them on the page
function getDataA() { 
    $.ajax({
      url: "http://localhost:3333/assignShiftPhaseA",
      success: function(data){
        //console.log(data);
        parseDataA(data);
      },
      error: function(response) {
        console.log("error occured in ajax A");
        console.log(response);
      }
    });
}
  
function parseDataA(rawData){
    ////sort events into order
    var events = rawData;
    //bubble sort
    for(let ii = 0; ii < events.length - 1; ii += 1) {
        //set new a and b
        let a = events[ii];
        let b = events[ii + 1];
        //turn dates into numbersS
        let aDate = a.time.slice(0,4) + a.time.slice(5,7) + a.time.slice(8,10);
        let bDate = b.time.slice(0,4) + b.time.slice(5,7) + b.time.slice(8,10);
        //switch if necessary
        if(aDate > bDate){
            events[ii] = b;
            events[ii  + 1] = a;
        }
    }

    ////create table headers
    //create first table row
    let shell = document.createElement("tr");
    //create headers
    let headerA = document.createElement("th");
    headerA.innerHTML = "Event";
    let headerB = document.createElement("th");
    headerB.innerHTML = "Date";
    let headerC = document.createElement("th");
    headerC.innerHTML = "Time";
    let headerD = document.createElement("th");
    headerD.innerHTML = "Available Volunteers";
    //add headers to first row
    shell.appendChild(headerA);
    shell.appendChild(headerB);
    shell.appendChild(headerC);
    shell.appendChild(headerD);
    //set main parent element and add headers to it
    var element = document.getElementById("eventList");
    element.appendChild(shell);

    ////create table rows of events
    for(let i = 0; i<events.length; i++) {
        ///let node = document.createTextNode("This is new.");
        ///para.appendChild(node);

        //name and color status
        let eventName = String(events[i].name);
        let eventStatus = String(events[i].statusColor);//for determining if the event needs volunteers
        //The date
        let dateTime = String(rawData[i].time);
        let eventDate = dateTime.slice(0, 10);
        let eventTime = dateTime.slice(11, dateTime.length);
        
        //create row
        let shell = document.createElement("tr");
        //create column elements
        let Event = document.createElement("td");
        Event.innerHTML = eventName;
        let Date = document.createElement("td");
        Date.innerHTML = eventDate;
        let Time = document.createElement("td");
        Time.innerHTML = eventTime;
        let Available = document.createElement("td");
        //class is the date and time of the event
        Available.class = dateTime;
        //id is the order in the list that the item is
        Available.id = i;
        //Available.innerHTML = Available.id;

        //add headers to the row
        shell.appendChild(Event);
        shell.appendChild(Date);
        shell.appendChild(Time);
        shell.appendChild(Available);
        //set main parent element and add headers to it
        element.appendChild(shell);
    }
    fullEventCount = events.length;
    getDataB();
}

//sorts the available users and puts them on the page
function getDataB() { 
    $.ajax({
      url: "http://localhost:3333/assignShiftPhaseB",
      success: function(data){
        //console.log(data);
        parseDataB(data);
      },
      error: function(response) {
        console.log("error occured in ajax B");
        console.log(response);
      }
    });
}
  
function parseDataB(rawData){
    var users = rawData;
    var x = fullEventCount;
    //console.log(users);
    //iterates though every event and assigns 
    for(let i = 0; i < x; i++){
        let date = String(document.getElementById(i).class);
        //the date of the event yyyy/mm/dd
        let day = date.slice(0,4) + date.slice(5,7) + date.slice(8,10);
        //the timeframe of the event 00:00AM/00:00PM
        let hours = date.slice(11,date.length);
        console.log(date);
        //iterates through every user and add available ones to the list for that event
        for(let ii = 0; ii < users.length; ii++){
            for(let iii = 0; iii < users[ii].avaiability.length; iii++){
                console.log(date.slice(0,10));
                if(date.slice(0,10) == users[ii].avaiability[iii].slice(0,10)){
                    console.log(i);
        //             <form action="/assignShift" method="POST">
        //                  <input type="submit" class="submitButton" value="name">
        //              </form>
                    //create form with the submit button as the only internal element
                    // let form = document.createElement("form");
                    // form.action = "/assignShift";
                    // form.method = "POST";
                    // let input = document.createElement("input");
                    // input.value = users[ii].name;
                    // input.name = users[ii].name + "@" + i;
                    // input.type = "submit";
                    // input.class = "submitButton";//change to assignButton if possible
                    // let dat = document.createElement("input");
                    // dat.value = users[ii].name + "@" + i;
                    // dat.name = "userDisplay";
                    // dat.type = "text";
                    // dat.class = "fullHide";
                    // dat.setAttribute("hidden", true);
                    let input = document.createElement("button");
                    input.innerHTML = users[ii].name;
                    $(input).click(function(){
                        $.ajax({
                            type: "POST",
                            url: "/assignShift",
                            data: {"userRaw": users[ii].name, "eventNum": i}, 
                            success: function(result){
                                console.log("posted");
                            }
                        });
                    });
                    //form.appendChild(input);
                    //document.getElementById(i).appendChild(form);
                    document.getElementById(i).appendChild(input);
                }
            }
            
            //set main parent element and add headers to it
            //element.appendChild(shell);
        }
    }
}

//Starts the get data process once the JS file has loaded
getDataA();