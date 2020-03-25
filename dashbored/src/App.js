import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './API/firebase';

const pdf = {
  name: "testfile",
  uploadedBy: "John",
  createdAt: Date.now()
}

const pdfs = [];

function App() {
const [pdfdocument, setpdfdocument] = useState([]);

  firebase.ref("pdflist").push(pdf);

  useEffect(() => {
    const PEvents = snapshot => {
      snapshot.forEach(function (data) {
        pdfs.push(data.val());
      });
      
      setpdfdocument(pdfs);
      debugger;

    }
    firebase.ref("pdflist").on("value", PEvents);
  },[setpdfdocument]);

  return (
    <div className="App">
      <header className="App-header">
         {pdfs.map(pdfitem => pdfitem.name)}


      </header>
    </div>
  );
}

export default App;
