document.getElementById('point-form').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();
    
    var name = getInputVal('name');
    var email = getInputVal('email');
    var phone = getInputVal('phone');
    var points = getInputVal('points');
    
    savePoints(name, email, phone, points);
}

function getInputVal(id) {
    return document.getElementById(id).value;
}

function savePoints(name, email, phone, points) {
    db.collection('points').add({
        name: name,
        email: email,
        phone: phone,
        points: parseInt(points),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        console.log('Points saved successfully');
        document.getElementById('point-form').reset();
        fetchPoints();
    }).catch((error) => {
        console.error('Error saving points: ', error);
    });
}

function fetchPoints() {
    db.collection('points').orderBy('timestamp', 'desc').get().then((snapshot) => {
        let pointsList = document.getElementById('points-list');
        pointsList.innerHTML = '';
        snapshot.forEach((doc) => {
            let li = document.createElement('li');
            li.textContent = `${doc.data().name} - Points: ${doc.data().points}`;
            pointsList.appendChild(li);
        });
    });
}

fetchPoints();
