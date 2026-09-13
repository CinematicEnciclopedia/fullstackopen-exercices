const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const style = {
    color: message.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 16,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return <div style={style}>{message.text}</div>
}

export default Notification