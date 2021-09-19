function Calendar(){

    const events = document.getElementsByClassName("events")[0].children;
    // const data = nonConflictingData;
    const data = conflictingData;

    function showMeetings(){
        init();
        drawMeetings();
    }

    function init(){
        for(let i = 0; i < events.length; i++){
            events[i].setAttribute("collision", 0);
            events[i].dataset.eventId = i;
            if(i == 0){
                console.log(i);
                events[i].setAttribute('id', '12AM');
            }
            else if(i >= 1 || i <= 12){
                if(i != 12){
                    events[i].setAttribute('id', i+'AM');
                } else{
                    events[i].setAttribute('id', i+'PM');
                }
            }
            else if(i > 12){
                let time = i - 12;
                events[i].setAttribute('id', time+'PM');
            }
        }
    }

    function drawMeetings(){
        let eventDiv = document.getElementsByClassName("events")[0]; 
        let eventDivWidth = eventDiv.clientWidth;
       
        for(let i = 0; i < data.length; i++){
            let meeting = data[i];
            let meetingDiv = document.createElement('div');
            meetingDiv.setAttribute("class", "meeting");
            meetingDiv.style.backgroundColor = meeting["color"];
            meetingDiv.style.width = eventDivWidth+'px';

            let meetingDurationDetails = getMeetingDuration(meeting);
            let meetingDuration = meetingDurationDetails["duration"];
            let startHour = meetingDurationDetails["startHour"];
            let endHour = meetingDurationDetails["endHour"];
            let meetingBlockPosition = meetingDurationDetails["meetingBlockPosition"];
           

            startHr = convertTo12HrFormat(startHour);
            endHr = convertTo12HrFormat(endHour);
            startHrDiv = document.getElementById(startHr);
            endHrDiv = document.getElementById(endHr);

            parent = startHrDiv;
            meetingDiv.style.top = meetingBlockPosition["top"];
            meetingDiv.style.height = meetingBlockPosition["height"];
            meetingDiv.style.width = meetingBlockPosition["width"];
            meetingDiv.style.left = meetingBlockPosition["left"];
            meetingDiv.style.zIndex = meetingBlockPosition["zIndex"];

            let title = document.createElement('p');
            title.innerText = meeting.title;

            let timing = document.createElement('p');
            timing.innerText = meeting['startTime'] + ' - ' + meeting["endTime"];

            meetingDiv.appendChild(title);
            meetingDiv.appendChild(timing);

            parent.appendChild(meetingDiv)
        }
    }

    function getMeetingDuration(meeting){
        let startTime = meeting['startTime'];
        startTime = startTime.split(":")
        let startHr = startTime[0];
        let startMin = startTime[1];

        let endTime = meeting['endTime'];
        endTime = endTime.split(":")
        let endHr = endTime[0];
        let endMin = endTime[1];

        startHr = parseInt(startHr);
        startMin = parseInt(startMin);
        endHr = parseInt(endHr);
        endMin = parseInt(endMin);

        startMins = (startHr*60) + startMin;
        endMins = (endHr*60) + endMin;
        let totalMins = Math.abs(endMins - startMins);

        incrementCollisionCount(startHr, endHr);
        let meetingBlockPosition = getMeetingBlockPosition(startMin, startHr, totalMins);
        
        return {
          duration: totalMins,
          startHour: startHr,
          endHour: endHr,
          meetingBlockPosition: meetingBlockPosition
        };
    }

    function incrementCollisionCount(startHour, endHour){
        for(let i = startHour; i < endHour; i++){
            let parentDiv = document.querySelector("[data-event-id='"+i+"']");
            let collision = parentDiv.getAttribute("collision");
            parentDiv.setAttribute("collision", parseInt(collision) + 1);
        }
    }

    function getMeetingBlockPosition(startMin, startHr, totalMins){
        startHr = convertTo12HrFormat(startHr);
        startHr = document.getElementById(startHr);
        let height = startHr.clientHeight;
        extraHeight = height/2;

        let collisionCount = startHr.getAttribute("collision");
        let width = (startHr.clientWidth);
        let left = 0;

        if(collisionCount > 1){
            width = (startHr.clientWidth)/collisionCount + 'px';
            left = 100 - (100/collisionCount) + '%';
        } else{
            width = width + 'px';
            left = left + '%';
        }

        let meetingBlockHeight = (height/60)*totalMins + 'px';
        return {
            top: ((height/60)*startMin)+extraHeight + 'px',
            height: meetingBlockHeight,
            width: width,
            left: left,
            zIndex: collisionCount
        };
    }

    function convertTo12HrFormat(HrIn24){
        
        if(HrIn24 == 0){
            return "12AM";
        } 
        else if(HrIn24 >= 1 || HrIn24 <= 12){
            if(HrIn24 != 12){
                return HrIn24+'AM'
            } else{
                return HrIn24+'PM'
            }
        }
        else if(HrIn24 > 12){
            HrIn24 = HrIn24 - 12;
            return HrIn24+'PM';
        }
    }

    return {
        showMeetings: showMeetings
    }
}

const calendar = Calendar();
calendar.showMeetings();
