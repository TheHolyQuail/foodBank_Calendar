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


//sorts the events and puts them on the page
function getDataA() { 
    $.ajax({
      url: "http://localhost:3333/assignShiftPhaseA",
      success: function(data){
        console.log(data);
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

        //create row
        let shell = document.createElement("tr");
        //create column elements
        let Event = document.createElement("td");
        Event.innerHTML = "Event";
        let Date = document.createElement("td");
        Date.innerHTML = "Date";
        let Time = document.createElement("td");
        Time.innerHTML = "Time";
        let Available = document.createElement("td");
        Available.innerHTML = "Available Volunteers";
        //add headers to the row
        shell.appendChild(Event);
        shell.appendChild(Date);
        shell.appendChild(Time);
        shell.appendChild(Available);
        //set main parent element and add headers to it
        element.appendChild(shell);
    }
}

//sorts the available users and puts them on the page
function getDataB() { 
    $.ajax({
      url: "http://localhost:3333/assignShiftPhaseA",
      success: function(data){
        console.log(data);
        parseDataB(data);
      },
      error: function(response) {
        console.log("error occured in ajax B");
        console.log(response);
      }
    });
}
  
function parseDataB(rawData){
    
}

//Starts the get data process once the JS file has loaded
getDataA();