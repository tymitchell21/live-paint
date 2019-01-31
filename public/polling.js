// Add logic to this script to poll server every second for updated pixels.
function pollServer() {
    let interval = setInterval(() => {
        fetch('/updates', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientUpdates)
        })
            .then(res => res.json())
            .then(data => {
                for(let index = clientUpdates.sequence; index < data.updates.length; index++) {
                    bitmap.setColor(data.updates[index][0], data.updates[index][1], data.updates[index][2])
                }
                clientUpdates = {clientupdates: [], sequence: data.updates.length}
            })
    }, 1000)
}

pollServer()