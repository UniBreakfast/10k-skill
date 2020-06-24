
let reports
let poolSize, poolSizeLeft

timePool.onmousemove = handlePoolHover
timePool.onclick = handlePoolClick



init()

async function init() {
  reports = await fetch('reports.json').then(res => res.json())
    .catch(()=> [{id: newId(), start: Date.now()-136e5, end: Date.now()-136e5}])

  startReport()
}

function startReport() {
  const start = Date.now()
  const report = {id: newId(), start}
  const delta = start - reports[reports.length-1].end
  poolSizeLeft = delta/6e4|0
  minsLeft.innerText = formatTime(poolSizeLeft)

}

function formatTime(mins) {
  return mins<61? mins: (mins/60|0)+':'+String(mins%60).padStart(2,0)
}

function newId() {
  return (Date.now()+Math.random().toFixed(10).slice(2)).slice(5)
}

function handlePoolHover(e) {
  if (handlePoolHover.off) return
  const {target} = e
  if (target==poolLeft) {
    const x = e.offsetX
    const portion = x / poolLeft.getBoundingClientRect().width
    minsToUse.innerText = formatTime(poolSizeLeft*portion|0)
    // const leftLength = poolLeft.getBoundingClientRect().width
    // const leftX = x - (poolLength - leftLength)
    // c(leftX)
  } else {

  }
}

function handlePoolClick(e) {
  handlePoolHover.off = true
  setTimeout(()=> handlePoolHover.off = false, 1000)
}
