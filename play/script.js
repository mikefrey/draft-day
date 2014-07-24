
var cvs = document.getElementById('cvs')
var ctx = cvs.getContext('2d')
var width = cvs.width
var height = cvs.height
var center = width/2
var margin = 80
var textMargin = 10

var lineY = 60 //textMargin


var tries = 2
function tryStart() {
  tries--
  if (!tries) start()
}


var img = new Image()
img.src = '/arvo.woff'
img.onerror = tryStart

var img = new Image()
img.src = '/arvo-bold.woff'
img.onerror = tryStart


function start() {

  ctx.fillStyle = '#222222'
  ctx.fillRect(0, 0, width, height)

  ctx.fillStyle = '#ffffff'
  ctx.strokeStyle = '#ffffff'

  ctx.textAlign = 'center'
  // ctx.textBaseline = 'top'


  textWithLine('WITH THE')
  pick(7)
  textWithLine('IN THE')
  text("20TH ANNIVERSARY")
  text("DFFL DRAFT")
  textWithLine('THE')
  text("MANKATO")
  boldText("MAVERICKS")
  textWithLine('SELECT')
  ctx.fillStyle = '#888888'
  text("RUNNING BACK")
  // text("QUARTERBACK")
  ctx.fillStyle = '#ffffff'
  text("ADRIAN")
  boldText("PETERSON")
  // text("TOM")
  // boldText("BRADY")

}


function textWithLine(text) {
  lineY += 25
  ctx.font = '18px "Arvo"'
  var tw = ctx.measureText(text).width
  ctx.fillText(text, center, lineY)

  ctx.lineWidth = 2

  ctx.beginPath()
  var y = lineY - 7
  ctx.moveTo(margin, y)
  ctx.lineTo(center - (tw/2) - 8, y)
  ctx.moveTo(center + (tw/2) + 8, y)
  ctx.lineTo(width-margin, y)
  ctx.stroke()
}

var st = ['TH', 'ST', 'ND', 'RD']
function pick(num) {
  lineY += 84 - 9
  ctx.textAlign = 'start'
  ctx.font = 'bold 84px "Arvo"'
  var numWidth = ctx.measureText(num+'').width
  ctx.font = 'bold 40px "Arvo"'
  var stWidth = ctx.measureText(st[num%10]||'TH').width
  ctx.font = '84px "Arvo"'
  var pickWidth = ctx.measureText(' PICK').width

  var fullWidth = numWidth + stWidth + pickWidth
  console.log(fullWidth)
  var x = center - (fullWidth/2)

  if (x-margin-8 >= 15) {

    console.log(margin, lineY-65, x-margin-8, 65)

    ctx.fillStyle = '#666666'
    ctx.fillRect(margin, lineY-65, x-margin-8, 65)
    ctx.fillRect(x+fullWidth+8, lineY-65, x-margin-8, 65)
    ctx.fillStyle = '#ffffff'
  }

  ctx.font = 'bold 84px "Arvo"'
  ctx.fillText(num+'', x, lineY)
  ctx.font = 'bold 40px "Arvo"'
  ctx.fillText(st[num%10]||'TH', x+numWidth, lineY-33)
  ctx.font = '84px "Arvo"'
  ctx.fillText(' PICK', x+numWidth+stWidth, lineY)

  ctx.textAlign = 'center'
}


function text(text) {
  var size = determineSize(text)
  lineY += size
  lineY -= (size * 0.12)
  ctx.font = size + 'px "Arvo"'
  ctx.fillText(text, center, lineY)
}

function boldText(text) {
  var size = determineSize(text, true)
  lineY += size
  lineY -= (size * 0.12)
  ctx.font = 'bold ' + size + 'px "Arvo"'
  ctx.fillText(text, center, lineY)
}

function determineSize(text, bold) {
  var b = bold ? 'bold ' : ''
  var target = width - margin - margin
  ctx.font = b + '80px "Arvo"'
  var a = ctx.measureText(text).width
  ctx.font = b + '100px "Arvo"'
  var b = ctx.measureText(text).width
  var slope = 20 / (b - a)
  return Math.ceil(slope * target)
}
