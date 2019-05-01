$(() => {

  // ====================================
  //           RELEASES
  // ====================================
  // song object
  const upcomingSongs = {
    'May032019': {
      songTitle: 'STOP THE RAIN (JPN)',
      songArtist: 'XLNC'
    },
    'May082019': {
      songTitle: 'DDU DU DDU DU',
      songArtist: 'JAWBREAKER'
    },
    'May132019': {
      songTitle: 'TEMPO',
      songArtist: 'OLYMPUS'
    },
    'May232019': {
      songTitle: 'MEMORIA (JPN)',
      songArtist: 'AURORA'
    },
    'May282019': {
      songTitle: 'GIRL FRONT',
      songArtist: 'NIGHTMARE: EVE'
    },
    'June012019': {
      songTitle: 'MODERN TIMES',
      songArtist: 'RYAN'
    },
    'June052019': {
      songTitle: 'HOLA HOLA (DEBUT!)',
      songArtist: 'DYNAMO'
    },
    'June102019': {
      songTitle: 'DKDK',
      songArtist: 'MAYDAY'
    },
    'June202019': {
      songTitle: 'BOY WITH LUV',
      songArtist: 'ATLAS'
    },
    'June252019': {
      songTitle: 'GASHINA',
      songArtist: 'JOWI'
    },
  }

  // handles displaying current date's release
  const displayCurrentRelease = (today) => {
    // display info  according to date
    if(today in upcomingSongs) {
      $('.today-title').html(upcomingSongs[today].songTitle)
      $('.today-artist').html(upcomingSongs[today].songArtist)
    } else {
      $('.today-title').html("NONE")
      $('.today-artist').html("NONE")
    }
    // call upcoming release dom manip handler
    displayUpcomingRelease()
  }

  // handles displaying upcoming release
  const displayUpcomingRelease = (today) => {
    // loop through upcoming songs object
    for(releaseDate in upcomingSongs) {
      let releaseMoment = moment(releaseDate, "MMMMDDYYYY")
      // find the next most upcoming one
      if(moment().isBefore(releaseMoment)) {
        // display info
        $('.next-title').html(upcomingSongs[releaseDate].songTitle)
        $('.next-artist').html(upcomingSongs[releaseDate].songArtist)
        // break the loop
        return
      } else {
        $('.next-title').html('INFO COMING SOON')
        $('.next-artist').html('INFO COMING SOON')
      }
    }
  }

  // ====================================
  //           DEFAULT MONTH
  // ====================================
  // default current month
  let currentMonth = ''
  // get current month
  const getMonth = (month, year) => {
    // data manip
    let abbrvMonth = (month[0] + month[1] + month[2]).toLowerCase()
    let abbrvYear = year[2] + year[3]
    let longMonth = month + ' ' + year
    currentMonth = abbrvMonth + '-' + abbrvYear
    // ,,, then show the stuff
    $(`.${currentMonth}`).show()
    $('.calendar-month').html(`${month.toUpperCase()}`)
    $('.calendar-select').children().toArray().forEach((option, id) => {
      if(option.innerHTML === longMonth) {
        option.setAttribute('selected', 'selected')
      }
    })
  }

  // ====================================
  //           DEFAULT DATE
  // ====================================
  const displayToday = (month, date, day, year) => {
    // display date
    $('.sidebar-month').html(month)
    $('.sidebar-date-number').html(date)
    $('.sidebar-dow').html(day)
    $('.sidebar-year').html(year)
    // pass to next dom manip handler for song release
    displayCurrentRelease(month + date + year)
  }

  const getToday = () => {
    // get dates
    let todaysMonth = moment().format('MMMM')
    let todaysDate = moment().format('DD')
    let todaysDay = moment().format('dddd')
    let todaysYear = moment().format('YYYY')
    // pass to dom manip handler for current date & getMonth
    getMonth(todaysMonth, todaysYear)
    displayToday(todaysMonth, todaysDate, todaysDay, todaysYear)
  }

  getToday();

  // ====================================
  //           HELPER METHODS
  // ====================================
  const changeMonth = (mon) => {
    switch (mon) {
      case 'jan':
        $('.calendar-month').html('JANUARY')
        break;
      case 'feb':
        $('.calendar-month').html('FEBRUARY')
        break;
      case 'mar':
        $('.calendar-month').html('MARCH')
        break;
      case 'apr':
        $('.calendar-month').html('APRIL')
        break;
      case 'may':
        $('.calendar-month').html('MAY')
        break;
      case 'jun':
        $('.calendar-month').html('JUNE')
        break;
      case 'jul':
        $('.calendar-month').html('JULY')
        break;
      case 'aug':
        $('.calendar-month').html('AUGUST')
        break;
      case 'sep':
        $('.calendar-month').html('SEPTEMBER')
        break;
      case 'oct':
        $('.calendar-month').html('OCTOBER')
        break;
      case 'nov':
        $('.calendar-month').html('NOVEMBER')
        break;
      case 'dec':
        $('.calendar-month').html('DECEMBER')
        break;
      default:
    }
  }

  // ====================================
  //           EVENT HANDLERS
  // ====================================
  const changeCalendar = () => {
    // hides previous current month
    $(`.${currentMonth}`).hide()
    // shows month user chooses
    currentMonth = $('.calendar-select').val()
    $(`.${currentMonth}`).show()
    // call changeMonth method to change month
    changeMonth(currentMonth.split('-')[0])
  }

  // ====================================
  //           EVENT LISTENERS
  // ====================================
  $('.calendar-select').change(changeCalendar)

})
