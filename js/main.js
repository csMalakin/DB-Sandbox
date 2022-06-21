let add = document.querySelector('#add')
let id=document.querySelector('#id')
let firstName=document.querySelector('#firstName')
let lastName=document.querySelector('#lastName')
let salary=document.querySelector('#salary')
let dlAnchorElem = document.getElementById('downloadAnchorElem')
let generateNumbersButton = document.getElementById('generateNumbers')
let sortNumbersButton=document.getElementById('zahlenSortieren')



add.addEventListener('click', submit)
generateNumbersButton.addEventListener('click', createTableOfNumbersArray)
dlAnchorElem.addEventListener('click',downloadFile)
sortNumbersButton.addEventListener('click', sortTableOfNumbersArray)

const mitarbeiter= [];


document.getElementById('form1').reset()

let NeuerMitarbeiter = function(newId,newFirstName,newLastName,newSalary) {
  newId=id.value
  newFirstName=firstName.value
  newLastName=lastName.value
  newSalary=salary.value

  let neu={ 
    id:newId,
    vorname:newFirstName,
    nachname:newLastName,
    gehalt:newSalary   
  }
 
  return neu
}



function addToArray(neu) { 
  neu=NeuerMitarbeiter();
  mitarbeiter.push(neu)


}



function submit(){
  addToArray()  
  addToTable()  
  resetInput()
  
  
  }

function resetInput(){
  document.getElementById('form1').reset()
}

function addToTable(neu) {
  neu=NeuerMitarbeiter();
  let tableRef = document.getElementById('mitarbeiterListe');
  let newRow=tableRef.insertRow();
  let insertId=newRow.insertCell(0)
  let insertFirstName=newRow.insertCell(1)
  let insertLastName=newRow.insertCell(2)
  let insertSalary=newRow.insertCell(3)

  let idText = document.createTextNode(neu.id)
  insertId.appendChild(idText)

  let firstNameText = document.createTextNode(neu.vorname)
  insertFirstName.appendChild(firstNameText)

  let lastNameText = document.createTextNode(neu.nachname)
  insertLastName.appendChild(lastNameText)

  let salaryText = document.createTextNode(neu.gehalt)
  insertSalary.appendChild(salaryText)
 

}

function downloadFile(){
var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(mitarbeiter));

dlAnchorElem.setAttribute("href",     dataStr     );
dlAnchorElem.setAttribute("download", "scene.json");

}


function generateNumbers(amount, min, max) {
  let numbers=[]
  amount=Number(document.querySelector('#amountNumbers').value)
  min=Number(document.querySelector('#startNumbers').value)
  max=Number(document.querySelector('#endNumbers').value)

  for (let i=0; i<amount; i++) {
    let x=Math.floor(Math.random()*(max-min))+min
    numbers.push(x)
  }

return numbers
}



let safeArrayOfNumbers=[]
function createTableOfNumbersArray(arr) {
    arr=generateNumbers();
    arr.forEach((element, index) => {
      let tableRef = document.getElementById('zahlenArray');
      let newRow=tableRef.insertRow();
      let insertIndex=newRow.insertCell(0)
      let insertNumber=newRow.insertCell(1)

      let indexText = document.createTextNode(index)
      insertIndex.appendChild(indexText)
      let numberText = document.createTextNode(element)
      insertNumber.appendChild(numberText)

    });     
  safeArrayOfNumbers=arr
  }


  function sortTableOfNumbersArray(arr) {
    arr=safeArrayOfNumbers;
    arr.sort((a,b)=>a-b)
    arr.forEach((element, index) => {
      let tableRef = document.getElementById('zahlenArraySortiert');
      let newRow=tableRef.insertRow();
      let insertIndex=newRow.insertCell(0)
      let insertNumber=newRow.insertCell(1)

      let indexText = document.createTextNode(index)
      insertIndex.appendChild(indexText)
      let numberText = document.createTextNode(element)
      insertNumber.appendChild(numberText)
      console.log(element)

    });     
  
  }

