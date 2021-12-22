let data = [
    {
      "title": "Work",
      "timeframes": {
        "daily": {
          "current": 5,
          "previous": 7
        },
        "weekly": {
          "current": 32,
          "previous": 36
        },
        "monthly": {
          "current": 103,
          "previous": 128
        }
      }
    },
    {
      "title": "Play",
      "timeframes": {
        "daily": {
          "current": 1,
          "previous": 2
        },
        "weekly": {
          "current": 10,
          "previous": 8
        },
        "monthly": {
          "current": 23,
          "previous": 29
        }
      }
    },
    {
      "title": "Study",
      "timeframes": {
        "daily": {
          "current": 0,
          "previous": 1
        },
        "weekly": {
          "current": 4,
          "previous": 7
        },
        "monthly": {
          "current": 13,
          "previous": 19
        }
      }
    },
    {
      "title": "Exercise",
      "timeframes": {
        "daily": {
          "current": 1,
          "previous": 1
        },
        "weekly": {
          "current": 4,
          "previous": 5
        },
        "monthly": {
          "current": 11,
          "previous": 18
        }
      }
    },
    {
      "title": "Social",
      "timeframes": {
        "daily": {
          "current": 1,
          "previous": 3
        },
        "weekly": {
          "current": 5,
          "previous": 10
        },
        "monthly": {
          "current": 21,
          "previous": 23
        }
      }
    },
    {
      "title": "Self Care",
      "timeframes": {
        "daily": {
          "current": 0,
          "previous": 1
        },
        "weekly": {
          "current": 2,
          "previous": 2
        },
        "monthly": {
          "current": 7,
          "previous": 11
        }
      }
    }
  ]

const buttons = document.querySelectorAll('.tracker__option') //1. grab buttons (3)

const activateClickedButton = (button) => { //3. when we click on a button (daily, weekly monthly), it passes the function 
  buttons.forEach(b => b.classList.remove('active')) //if any other button has the class of active, it gets removed
  button.classList.add('active') //add an active class.
}

//11. Function that clears activities so they don't stack.
const clearActivities = () => {
  const activities = document.querySelectorAll('.tracker__activity')//cards have the class tracker__activity from adding the classList
  activities.forEach(a => a.remove())//removes from HTML -> goto step 11

}

const renderCards = (clickedOption) => {
  clearActivities() //11. call the clearActivities function when clicked. goto step 12
  const activityTracker = document.querySelector('main.tracker')  //8. this is the main grid! You want to append all your elements to this grid. Grab the tracker and goto step 9

  const calcTimeframe = (option) => { //5. if our option is
    if (option === 'daily') { //= daily, you return yesterday.
      return 'Yesterday'
    } else if (option === 'weekly') { //otherwise, if weekly return last week
      return 'Last Week'
    } else if (option === 'monthly') { // if monthly, return last month.
      return 'Last Month'
    }
  }

  data.forEach(activity => { //4. create a loop that selects each activity
    const name = activity.title //grab the name of each activity
    const activityClass = name.toLowerCase().replace(' ', '-') //create a class and removing spaces from titles.
    const timeframeData = activity.timeframes[clickedOption]//grab timeframes by selecting from JSON activity(object) and timeframes(string). Can only access string with []
    const previousTimeframe = calcTimeframe(clickedOption) // if we clicked on daily, previous time frame says "yesterday, last week, last month" go to step 5

    const section = document.createElement('section') //6. creating elements in JS to add to HTML
    section.classList.add('tracker__activity', activityClass)//add a class of tracker__activity and an activityClass, this gets APPENDED to the HTML
    const stringToInject = //creating a string to inject, use backticks. Variables let you change the name --> goto step 7
    `
        <div class="activity__bg">
          <img src="images/icon-${activityClass}.svg" alt="" aria-hidden="true">
        </div>
        <div class="activity__info">
          <header class="activity__header">
            <h2 class="activity__name">${name}</h2>
            <button class="activity__options-ellipsis" aria-label="options">
              <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/>
              </svg>
            </button>
          </header>
          <div class="activity__timeframes">
            <h3 class="activity__current-timeframe">${timeframeData.current}hrs</h3>
            <div class="activity__previous-timeframe">
              <p class="time-period">${previousTimeframe}</p>
              <p> - </p>
              <p class="time">${timeframeData.previous}hrs</p>
            </div>
          </div>
        </div>
    `
    section.innerHTML = stringToInject //7. adds entire string to HTML stringToInject is variable name --> goto step 8
    activityTracker.append(section) //9. keep this inside the forEach loop. Each one of these selections that we created, we want to append to the tracker. goto step 10
  });
};

buttons.forEach(button =>{//2. use forEach button

    button.addEventListener('click', () => { // add an event listener of click, when we click the button something happens
        activateClickedButton(button) //when clicked it runs a function actvateClickedButton
        const clickedOption = button.dataset.option //grabs the information by accessing button.dataset.option
        renderCards(clickedOption) //runs renderCards
    })
})

// Website loads "clicked"
buttons[1].click() //12. an already selected state when website loads.
