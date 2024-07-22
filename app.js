import { db } from './index.html';
import { collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

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

async function savePoints(name, email, phone, points) {
    try {
        await addDoc(collection(db, 'points'), {
            name: name,
            email: email,
            phone: phone,
            points: parseInt(points),
            timestamp: new Date()
        });
        console.log('Points saved successfully');
        document.getElementById('point-form').reset();
        fetchPoints();
    } catch (error) {
        console.error('Error saving points: ', error);
    }
}

async function fetchPoints() {
    try {
        const q = query(collection(db, 'points'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        let pointsList = document.getElementById('points-list');
        pointsList.innerHTML = '';
        querySnapshot.forEach((doc) => {
            let li = document.createElement('li');
            li.textContent = `${doc.data().name} - Points: ${doc.data().points}`;
            pointsList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching points: ', error);
    }
}

fetchPoints();
