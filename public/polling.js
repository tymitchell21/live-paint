// Add logic to this script to poll server every second for updated pixels.
function pollServer() {
    let interval = setInterval(() => {
        const requestObject = {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientUpdates)
        }

        clientUpdates.clientupdates.length = 0

        fetch('/updates', requestObject)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                data.updates.forEach(update => {
                    bitmap.setColor(...update, false)
                })
                clientUpdates.sequence = data.sequence
            })
    }, 1000)
}

pollServer()