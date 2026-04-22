document.addEventListener("DOMContentLoaded", function(){
    const checkInInput = document.getElementById("checkIn");
    const checkOutInput = document.getElementById("checkOut");

    const now = new Date();
    const today = new Date();
    
    const deadline = new Date();
    deadline.setHours(11, 0, 0, 0);
    
    if (now > deadline) {
        today.setDate(today.getDate() + 1);
    }

    const minCheckInDate = today.toISOString().split("T")[0];
    checkInInput.setAttribute("min", minCheckInDate);
    checkInInput.value = minCheckInDate;

    function updateCheckOutLimit(){
        const minCheckOut = new Date(checkInInput.value)
        minCheckOut.setDate(minCheckOut.getDate() + 1);

        const minCheckOutStr = minCheckOut.toISOString().split("T")[0];
        checkOutInput.setAttribute("min", minCheckOutStr);
        checkOutInput.value = minCheckOutStr;

        if (checkInInput.value >= checkOutInput.value){
            checkOutInput.value = minCheckOut;
        }
    }
    updateCheckOutLimit();
    checkInInput.addEventListener("change", updateCheckOutLimit);
})