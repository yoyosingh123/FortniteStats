const input = document.querySelector('.input')

const headers = {
  'method': "GET",
  'headers': {
    "Authorization": "ff59b7c1-3bcbb4c5-4757ac40-041a5fed"
  }
}

async function fetch_data(url) {
  if (url) {
    let data = await fetch(url, headers)
    data = data.json()
    return data
  } else {
    alert('Must be a VALID url.')
  }
}

async function getAccountId(name = "") {
  if (name) {
    const data = await fetch_data("https://fortniteapi.io/v1/lookup?username=" + name)
    return data.account_id
  } else {
    alert('Must be a VALID name!')
  }
}

//{account:{level:0, season:0}, global_stats:{duo:{}, solo:{}, trio:{}, squad: {}}, name:"", seasons_available:0, result:true}

//kd: number,kills: number,lastmodified: number, matchesplayed: number, minutesplayed: number, placetop1: number, placetop10: number, placetop12: number, placetop25: number, placetop3: number, placetop5: number, placetop6: number, playersoutlived: number, score: number, winrate: number

const ids = [
		'kd',
    'kills',
    'lastmodified',
    'matchesplayed',
    'minutesplayed',
    'placetop1',
    'placetop10',
    'placetop12',
    'placetop25',
    'placetop3',
    'placetop5',
    'placetop6',
    'playersoutlived',
    'score',
    'winrate'
]

function handleData(stats = {}) {
  for (const team in stats){
  	for (const id in stats[team]){
    	const value = stats[team][id]
      try{
      	document.getElementById(team + '-' + id).innerText = " " + value
      } catch(e){}
    }
  }
}

function handleMain(user = "") {
  if (user) {
    getAccountId(user)
      .then((id) => {
        if (id) {
          fetch_data('https://fortniteapi.io/v1/stats?account=' + id)
            .then((data) => {
              if (data.result) {
                const stats = data.global_stats
                handleData(stats)
              } else {
                alert(data.message || "Account is most likely private")
              }
            })
        } else {
          alert("Couldn't find user. Invalid Username?")
        }
      })
  }
}

const svg = document.querySelector('.svg_icon')

function enter() {
  if (input.value != "" && input.value.length > 3 - 1) {
    handleMain(input.value)
    input.value = ""
  }
}

svg.addEventListener('click', enter)
document.addEventListener('keyup', function(e) {
  if (e.key == "Enter") {
    enter()
  }
})

input.addEventListener('input', function() {
  input.value = input.value.toString().substring(0, 16)
})
