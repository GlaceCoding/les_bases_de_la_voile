function xy2pos(x, y) {
  return { x, y }
}

function pos_add(posA, posB) {
  return { x: posA.x + posB.x, y: posA.y + posB.y }
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
  const angle = new Date() / 200

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

  canvas_arrow(context, 90, 20, 120, 20)
  context.strokeStyle = '#ff0000'
  context.stroke()
  context.fillStyle = '#ff0000'
  context.font = '16px serif'
  context.fillText('Vent', 50, 25)

  window.requestAnimationFrame(draw)
}

draw()

// https://stackoverflow.com/a/6333775/
function canvas_arrow(context, fromx, fromy, tox, toy) {
  var headlen = 10 // length of head in pixels
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