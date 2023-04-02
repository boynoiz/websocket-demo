/**
 *
 * @param {*} request
 * @param {*} response
 */
export function getNotify(request, response) {

  let date = new Date(Date.now());

  let data = {
    person_id: request.body.person_id,
    message: request.body.message,
    created_at: date.toTimeString(),
    sendSocket: 'OK'
  }

  response.io.emit('notification', data)

  return response.json(data);
}
