    function startTime() {
        // Local Time
        const today = new Date();
        let h = today.getHours();
        let h0 = today.getUTCHours();
        let m = today.getMinutes();
        let m0 = today.getUTCMinutes();
        let s = today.getSeconds();
        let s0 = today.getUTCSeconds();
        m = checkTime(m);
        s = checkTime(s);
        m = checkTime(m0);
        s = checkTime(s0);
        document.getElementById('localClock').innerHTML = "Local: " + h + ":" + m + ":" + s + ",     ";

        // UTC Time
        const today0 = today.toUTCString();
        document.getElementById('UTC-Clock').innerHTML = "UTC: " + h0 + ":" + m0 + ":" + s0 + ",     ";




        setTimeout(startTime, 1000);
        }

    function checkTime(i) {
        if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
        }

    startTime();