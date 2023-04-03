

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.btn-submit img').addEventListener('click', submit) 
});


const submit = (e) => {
    e.preventDefault();
    
    checkField();
}


const checkField = () => {
    const day = parseInt(document.querySelector('#day').value);
    const month = parseInt(document.querySelector('#month').value);
    const year = parseInt(document.querySelector('#year').value);
    const date = new Date();
    const actualYear = date.getFullYear();

    console.log(day);
    console.log(month);
    console.log(year);
    
    
    let error = false;

    if (!day || day > 31) {
        console.log("day null");
        createError("day");
        error = true;
    } else {
        removeError("day");
    }
    
    if ((!month) || (month > 12)|| (month == 2 && day > 28)) {
        console.log("month null"); 
        createError("month");
        error = true;
    } else {
        removeError("month");
    }
    if (!year || year > actualYear) {
        console.log("year null"); 
        createError("year");
        error = true;
    } else {
        removeError("year");
    }

    if (error) return;
    
    const dataFinal = calcDate(new Date, new Date(`${year}-${month}-${day}`));

    console.log(dataFinal);

    document.querySelector('.yars').textContent = dataFinal.years_passed;
    document.querySelector('.months').textContent = dataFinal.months_passed;
    document.querySelector('.days').textContent = dataFinal.days_passed;
    

}


const createError = (type) => {
    const text = "Debe ser una fecha válida";
    const zone = document.querySelector(`.section-${type}`);
    
    if (zone.querySelector('.error-text')) return;
    
    const p = document.createElement('p');
    p.classList.add('error-text');
    p.textContent = text;
    
    zone.appendChild(p);
    zone.querySelector("label").classList.add('error-label');
    zone.querySelector("input").classList.add('error-box');
    
    
    
}

const removeError = (type) => {
    const zone = document.querySelector(`.section-${type} .error-text`);
    
    if (zone) {
        document.querySelector(`.section-${type} label`).classList.remove('error-label');
        document.querySelector(`.section-${type} input`).classList.remove('error-box');
        zone.remove();
    }  
}

function calcDate(date1, date2){
    /*
    * calcDate() : Calculates the difference between two dates
    * @date1 : "First Date in the format MM-DD-YYYY"
    * @date2 : "Second Date in the format MM-DD-YYYY"
    * return : Array
    */

    //new date instance
    const dt_date1 = new Date(date1);
    const dt_date2 = new Date(date2);

    //Get the Timestamp
    const date1_time_stamp = dt_date1.getTime();
    const date2_time_stamp = dt_date2.getTime();

    let calc;

    //Check which timestamp is greater
    if (date1_time_stamp > date2_time_stamp) {
        calc = new Date(date1_time_stamp - date2_time_stamp);
    } else {
        calc = new Date(date2_time_stamp - date1_time_stamp);
    }

    //Retrieve the date, month and year
    const calcFormatTmp = calc.getDate() + '-' + (calc.getMonth() + 1) + '-' + calc.getFullYear();
    //Convert to an array and store
    const calcFormat = calcFormatTmp.split("-");
    //Subtract each member of our array from the default date
    const days_passed = Number(Math.abs(calcFormat[0]) - 1);
    const months_passed = Number(Math.abs(calcFormat[1]) - 1);
    const years_passed = Number(Math.abs(calcFormat[2]) - 1970);

    return {
        days_passed,
        months_passed,
        years_passed
    } 
}