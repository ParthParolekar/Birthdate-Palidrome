let userInput = document.querySelector(".birth-date");
const form = document.querySelector(".form");
const result = document.querySelector(".result");

form.addEventListener("submit", calculate);

function calculate(e) {
  e.preventDefault();

  let birthDate = userInput.value.split("-");
  let dd = birthDate[2];
  let mm = birthDate[1];
  let yyyy = birthDate[0];
  //   let yy = yyyy.slice(2, 4);

  //check for palindrome in all formats
  let returnedFormat = checkWithAllFormats(dd, mm, yyyy);

  //Show text based on the result
  if (returnedFormat) {
    setTimeout(function () {
      result.innerHTML = `<h3>WOW! Your birthdate is a palindrome ${returnedFormat}</h3>`;
    }, 2000);
    result.innerHTML = `<div class="loading"></div>`;
  } else {
    if (Number(yyyy) % 4 === 0) {
      const daysInAMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      let newPalindrome = checkNextPalindrome(dd, mm, yyyy, daysInAMonth);
      let closestPalindrome = newPalindrome[0];
      let daysToPalindrome = newPalindrome[1];
      setTimeout(function () {
        result.innerHTML = `<h3>Oops! Your birthdate is not a Palindrome. The closest Palindrome is ${closestPalindrome}. Missed by ${daysToPalindrome} days</h3>`;
      }, 2000);
      result.innerHTML = `<div class="loading"></div>`;
    } else {
      const daysInAMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      checkNextPalindrome(dd, mm, yyyy, daysInAMonth);
      let newPalindrome = checkNextPalindrome(dd, mm, yyyy, daysInAMonth);
      let closestPalindrome = newPalindrome[0];
      let daysToPalindrome = newPalindrome[1];
      setTimeout(function () {
        result.innerHTML = `<h3>Oops! Your birthdate is not a Palindrome. The closest Palindrome is ${closestPalindrome}. Missed by ${daysToPalindrome} days</h3>`;
      }, 2000);
      result.innerHTML = `<div class="loading"></div>`;
    }
  }
}

function checkWithAllFormats(dd, mm, yyyy) {
  if (dd.length === 1) {
    dd = "0" + dd;
  }
  if (mm.length === 1) {
    mm = "0" + mm;
  }
  if (yyyy.length === 1) {
    yyyy = "0" + yyyy;
  }
  let yy = yyyy.slice(2, 4);
  if (checkPalindrome(dd + mm, yyyy.split("").reverse().join(""))) {
    return `${dd}-${mm}-${yyyy}(dd-mm-yy)`;
  } else if (checkPalindrome(mm + dd, yyyy.split("").reverse().join(""))) {
    return `${mm}-${dd}-${yyyy}(mm-dd-yyyy)`;
  } else if (
    checkPalindrome(mm + dd[0], yy.split("").reverse().join("") + dd[1])
  ) {
    return `${mm}-${dd}-${yy}(mm-dd-yy)`;
  } else {
    return null;
  }
}

function checkPalindrome(value1, value2) {
  if (value1 === value2) {
    return true;
  }
}

function checkNextPalindrome(dd, mm, yyyy, daysInAMonth) {
  let nextDay = Number(dd);
  let nextMonth = Number(mm);
  let nextYear = Number(yyyy);

  let previousDay = Number(dd);
  let previousMonth = Number(mm);
  let previousYear = Number(yyyy);

  let daysToPalindrome = 0;

  while (1 === 1) {
    daysToPalindrome++;
    nextDay++;
    previousDay--;

    if (nextDay > daysInAMonth[nextMonth - 1]) {
      nextDay = 1;
      nextMonth++;

      if (nextMonth > 12) {
        nextMonth = 1;
        nextYear++;

        if (nextYear > 9999) {
          break;
        }
      }
    }

    if (previousDay < 1) {
      previousMonth--;
      previousDay = daysInAMonth[previousMonth - 1];

      if (previousMonth < 1) {
        previousYear--;
        previousMonth = 12;

        if (previousYear < 1) {
          break;
        }
      }
    }

    const nextPalindrome = checkWithAllFormats(
      nextDay.toString(),
      nextMonth.toString(),
      nextYear.toString()
    );
    if (nextPalindrome) {
      return [nextPalindrome, daysToPalindrome];
    }

    const previousPalindrome = checkWithAllFormats(
      previousDay.toString(),
      previousMonth.toString(),
      previousYear.toString()
    );
    if (previousPalindrome) {
      return [previousPalindrome, daysToPalindrome];
    }
  }
}
