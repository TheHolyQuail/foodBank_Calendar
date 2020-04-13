var username;

//sorts the events and puts them on the page
function getDataA() { 
    $.ajax({
        url: "http://localhost:3333/getUser",
        success: function(data){
            console.log(data);
            parseDataA(data);
        },
        error: function(response) {
          console.log("error occured in ajax");
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
    //add headers to first row
    shell.appendChild(headerA);
    shell.appendChild(headerB);
    shell.appendChild(headerC);
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

        //add headers to the row
        shell.appendChild(Event);
        shell.appendChild(Date);
        shell.appendChild(Time);
        //set main parent element and add headers to it
        element.appendChild(shell);
    }
    fullEventCount = events.length;
    getDataB();
}

//Starts the get data process once the JS file has loaded
getDataA();