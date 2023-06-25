const _allures_details = [
  [30, 'Bout au vent/Vent debout'], // 45 pour bateau de croisière
  [40, 'Près serré'],
  // Près
  [55, 'Près'],
  [65, 'Près bon plein'],
  // Travers
  [75, 'Petit largue'],
  [110, 'Travers'],
  [135, 'Largue'],
  // Largue
  [165, 'Grand largue'],
  // Vent arrière
  [180, 'Vent arrière']
]

const _allures = [
  [40, 'Vent debout', 0, (context, angleVoile, windAngle, pivot) => {
    context.quadraticCurveTo.apply(context, [
      ...pos2arg(pos_add(rotate_pos(xy2pos(0, 19), 0), pivot)),
      ...pos2arg(pos_add(rotate_pos(xy2pos(0, 38), 0), pivot))
    ])
    context.quadraticCurveTo.apply(context, [
      ...pos2arg(pos_add(rotate_pos(xy2pos(0, 19), 0), pivot)),
      ...pos2arg(pivot)
    ])
  }],
  [65, 'Près', 0.666, (context, angleVoile, windAngle, pivot) => {
    const side = (windAngle < 0) ? 1 : -1
    context.quadraticCurveTo.apply(context, [
      ...pos2arg(pos_add(rotate_pos(xy2pos(12 * side, 12), 0), pivot)),
      ...pos2arg(pos_add(rotate_pos(xy2pos(2 * side, 30), 0), pivot))
    ])
    context.quadraticCurveTo.apply(context, [
      ...pos2arg(pos_add(rotate_pos(xy2pos(6 * side, 12), 0), pivot)),
      ...pos2arg(pivot)
    ])
  }],
  [120, 'Travers', 1, (context, angleVoile, windAngle, pivot) => {
    const side = (windAngle < 0) ? 1 : -1
    context.quadraticCurveTo.apply(context, [
      ...pos2arg(pos_add(rotate_pos(xy2pos(-13 * side, -10), Math.PI), pivot)),
      ...pos2arg(pos_add(rotate_pos(xy2pos(-16 * side, -27), Math.PI), pivot))
    ])
    context.quadraticCurveTo.apply(context, [
      ...pos2arg(pos_add(rotate_pos(xy2pos(-13 * side, -1), Math.PI), pivot)),
      ...pos2arg(pivot)
    ])
  }],
  [160, 'Largue', 0.666, (context, angleVoile, windAngle, pivot) => {
    const side = (windAngle < 0) ? 1 : -1
    context.quadraticCurveTo.apply(context, [
      ...pos2arg(pos_add(rotate_pos(xy2pos(14 * side, 0), 0), pivot)),
      ...pos2arg(pos_add(rotate_pos(xy2pos(24 * side, 15), 0), pivot))
    ])
    context.quadraticCurveTo.apply(context, [
      ...pos2arg(pos_add(rotate_pos(xy2pos(11 * side, 7), 0), pivot)),
      ...pos2arg(pivot)
    ])
  }],
  [180, 'Vent arrière', 0.333, (context, angleVoile, windAngle, pivot) => {
    const side = (windAngle < 0) ? 1 : -1
    context.quadraticCurveTo.apply(context, [
      ...pos2arg(pos_add(rotate_pos(xy2pos(19 * side, -10), 0), pivot)),
      ...pos2arg(pos_add(rotate_pos(xy2pos(38 * side, 0), 0), pivot))
    ])
    context.quadraticCurveTo.apply(context, [
      ...pos2arg(pos_add(rotate_pos(xy2pos(19 * side, -1), 0), pivot)),
      ...pos2arg(pivot)
    ])
  }]
]

function xy2pos(x, y) {
  return { x, y }
}

function pos_add(posA, posB) {
  return { x: posA.x + posB.x, y: posA.y + posB.y }
}

function pos_substract(posA, posB) {
  return { x: posA.x - posB.x, y: posA.y - posB.y }
}

function rotate_pos(pos, angle) {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  const x = pos.x * cos - pos.y * sin
  const y = pos.x * sin + pos.y * cos
  return { x, y }
}

function pos2arg(pos) {
  return [pos.x, pos.y]
}

function draw() {
  const context = document.getElementById('canvas').getContext('2d')

  context.fillStyle = 'white'
  context.fillRect(0, 0, 450, 450)

  const x = 118
  const y = 139
  const angle = 0 // new Date() / 400

  for (let dx = 0; dx <= 24; dx += 24) {
    context.beginPath();
    context.moveTo.apply(context, pos2arg(pos_add(rotate_pos(xy2pos(dx + -12, -30), angle), {x, y})))
    context.lineTo.apply(context, pos2arg(pos_add(rotate_pos(xy2pos(dx + -18, -4), angle), {x, y})))
    context.lineTo.apply(context, pos2arg(pos_add(rotate_pos(xy2pos(dx + -16, 30), angle), {x, y})))
    context.lineTo.apply(context, pos2arg(pos_add(rotate_pos(xy2pos(dx + -9, 30), angle), {x, y})))
    context.lineTo.apply(context, pos2arg(pos_add(rotate_pos(xy2pos(dx + -6, -4), angle), {x, y})))
    context.closePath()
    context.fillStyle = 'white'
    context.fill()
    context.strokeStyle = 'black'
    context.stroke()
  }

  context.lineWidth = 0.9;
  context.beginPath();
  context.moveTo.apply(context, pos2arg(pos_add(rotate_pos(xy2pos(-11, -4), angle), {x, y})))
  context.lineTo.apply(context, pos2arg(pos_add(rotate_pos(xy2pos(11, -4), angle), {x, y})))
  context.lineTo.apply(context, pos2arg(pos_add(rotate_pos(xy2pos(11, 21), angle), {x, y})))
  context.lineTo.apply(context, pos2arg(pos_add(rotate_pos(xy2pos(-11, 21), angle), {x, y})))
  context.closePath()
  context.fillStyle = '#FF99CC'
  context.fill()
  context.strokeStyle = 'black'
  context.stroke()

  let windAngle = angle + new Date() / 2000
  windAngle = Math.PI - windAngle % (Math.PI * 2)
  const angleVoile = windAngle - Math.PI
  context.lineWidth = 0.9;
  context.beginPath()
  const pivot = pos_add(rotate_pos(xy2pos(0, 3), angle), {x, y})
  context.moveTo.apply(context, pos2arg(pivot))
  let a = 1
  for ( ; a <= _allures.length; a++) {
    if (Math.abs(windAngle) <= _allures[a - 1][0] * Math.PI / 180) {
      context.fillStyle = 'blue'
      context.fillText('Allure : ' + _allures[--a][1], 10, 50)
      context.fillText('Vitesse : ' + Math.round(_allures[a][2] * 100) + '%', 10, 70)
      break
    }
  }
  const drawVoile = _allures[a][3] || (() => console.log('nothing'))
  drawVoile(context, angleVoile, windAngle, pivot)
  context.closePath()
  context.fillStyle = '#F20000'
  context.fill()
  context.strokeStyle = 'black'
  context.stroke()

  const pos = xy2pos(20, 25)
  canvas_arrow.apply(null, [
    context,
    ...pos2arg(pos_add(rotate_pos(xy2pos(0, -10), windAngle), pos)),
    ...pos2arg(pos_add(rotate_pos(xy2pos(0, 10), windAngle), pos))
  ])
  context.strokeStyle = '#ff0000'
  context.stroke()
  context.fillStyle = '#ff0000'
  context.font = '16px serif'
  context.fillText('Vent', 40, 30)

  window.requestAnimationFrame(draw)
}

draw()

// https://stackoverflow.com/a/6333775/
function canvas_arrow(context, fromx, fromy, tox, toy) {
  var headlen = 8 // length of head in pixels
  var dx = tox - fromx
  var dy = toy - fromy
  var angle = Math.atan2(dy, dx)
  context.beginPath()
  context.moveTo(fromx, fromy)
  context.lineTo(tox, toy)
  context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6))
  context.moveTo(tox, toy)
  context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6))
  context.closePath()
}
