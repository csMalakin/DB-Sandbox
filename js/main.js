let add = document.querySelector('#add')
let id=document.querySelector('#id')
let firstName=document.querySelector('#firstName')
let lastName=document.querySelector('#lastName')
let salary=document.querySelector('#salary')
let dlAnchorElem = document.getElementById('downloadAnchorElem')
let generateNumbersButton = document.getElementById('generateNumbers')
let sortNumbersButton=document.getElementById('zahlenSortieren')
let zahlHinzufügen=document.getElementById('zahlHinzufügen')


add.addEventListener('click', submit)
generateNumbersButton.addEventListener('click', generateNumbersClicked)
dlAnchorElem.addEventListener('click',downloadFile)
sortNumbersButton.addEventListener('click', sortNumbersButtonClicked)
zahlHinzufügen.addEventListener('click', zahlHinzufügenClicked )

const mitarbeiter= [];


document.getElementById('form1').reset()
document.getElementById('form2').reset()
document.getElementById('form3').reset()

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
  resetInput('form1')
  
  
  }

function resetInput(form){
  let getForm=document.getElementById(form)
  let inputField=Array.from(getForm.querySelectorAll('input'))
  inputField.forEach(item=>item.value ="")
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


let isTableEmpty=true
let isSortedEmpty=true
let safeArrayOfNumbers=[]
function createTableOfNumbersArray(arr) {
    arr=generateNumbers();
    if (!isTableEmpty) {
      deleteRows('zahlenArray')
    }

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
    isTableEmpty=false
    // document.getElementById('form2').reset()     
    safeArrayOfNumbers=arr
  }

  let sortedArray=[]
  function sortTableOfNumbersArray(arr) {
    arr=safeArrayOfNumbers;
    if (!isSortedEmpty) {
      deleteRows('zahlenArraySortiert')
    }
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
      // console.log(element)

    });
    isSortedEmpty=false
    sortedArray=arr.sort((a,b)=>a-b)
  
  }
  let isNewNumberTableEmpty=true
  function tableWithNewNumber(arr) {
    arr=sortedArray;
    if (!isNewNumberTableEmpty) {
      deleteRows('arrayMitNeuerZahl')
    }
    arr.sort((a,b)=>a-b)
    arr.forEach((element, index) => {
      let tableRef = document.getElementById('arrayMitNeuerZahl');
      let newRow=tableRef.insertRow();
      let insertIndex=newRow.insertCell(0)
      let insertNumber=newRow.insertCell(1)

      let indexText = document.createTextNode(index)
      insertIndex.appendChild(indexText)
      let numberText = document.createTextNode(element)
      insertNumber.appendChild(numberText)
      // console.log(element)
    

    });
    isNewNumberTableEmpty=false
    sortedArray=arr.sort((a,b)=>a-b)
  
  }












// testing how to load a json, only works on live server
  function loadJSON(path, success, error)
  {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function()
      {
          if (xhr.readyState === XMLHttpRequest.DONE) {
              if (xhr.status === 200) {
                  if (success)
                      success(JSON.parse(xhr.responseText));
              } else {
                  if (error)
                      error(xhr);
              }
          }
      };
      xhr.open("GET", path, true);
      xhr.send();
      
  }
//this is how to call the function
//   loadJSON('scene.json',
//          function(data) { console.log(data); },
//          function(xhr) { console.error(xhr); }
// );
let testArray=[]
function testFunction(){
  loadJSON('scene.json',
         function(data) { testArray=data },
         function(xhr) { console.error(xhr); }
);
}

function deleteRows(id){
  let table=document.getElementById(id)
  table.querySelectorAll('table tr:not(.header)').forEach((tr) => {
    tr.remove();
    isTableEmpty=true
    isSortedEmpty=true
});
}
let numberToCheck=0;
let showIndex=0

function addNumberToSortedArray(n,arr) {

n=Number(document.getElementById('numberToAdd').value)
arr=sortedArray
let test=n-(arr[0])
let dif=(arr[arr.length-1]-arr[0])
let steps=Math.round(dif/(arr.length-1))
let checkIndex=Math.floor(test/steps)+1


// console.log(test)
// console.log(dif)
// console.log(steps)
// console.log(checkIndex)
// console.log(arr[checkIndex])
// console.log(n)
// console.log(arr[checkIndex+1])


if (n<arr[checkIndex]&&n>arr[0]){
  
  while (n<arr[checkIndex]) {
    
    checkIndex--   
    // console.log(checkIndex)
    
  } if(n>=arr[checkIndex]&&n<=arr[checkIndex+1]) {
    arr.splice(checkIndex+1,0,n)
    numberToCheck=n
    showIndex=checkIndex+1
    checkIndex=Math.floor(test/steps)+1
    if (showIndex<0){
     showIndex=0
    }
}
checkIndex=0}




else if(n>=arr[checkIndex]&&n<=arr[checkIndex+1]) {
  arr.splice(checkIndex+1,0,n)
  numberToCheck=n
  showIndex=checkIndex+1
  checkIndex=Math.floor(test/steps)+1
  
  if (showIndex<0){
   showIndex=0
  }
 
 
}


else if(n>arr[checkIndex]&&n>arr[checkIndex+1] && n<arr[arr.length-1]){
  
  while (n>arr[checkIndex+1]) {
    
    checkIndex++
  
    // console.log(`counter = ${counter}`)^
    // console.log(checkIndex)
    
  } if(n>=arr[checkIndex]&&n<=arr[checkIndex+1]) {
    arr.splice(checkIndex+1,0,n)
    numberToCheck=n
    showIndex=checkIndex+1
    checkIndex=Math.floor(test/steps)+1
    
    
    if (showIndex<0){
     showIndex=0
    }
}
checkIndex=0}




else if(n>arr[arr.length-1]){
arr.splice(arr.length,0,n)
numberToCheck=n
showIndex=arr.length-1
if (showIndex<0){
  showIndex=0
 }

}
else if(n<arr[0]){
  arr.splice(0,0,n)
  numberToCheck=n
  checkIndex=Math.floor(test/steps)+1
  showIndex=checkIndex
  if (showIndex<0){
    showIndex=0
   }
  
}
sortedArray=arr


}





function textZahlHinzugefügt(){
  let n=document.getElementById('numberToAdd').value
  if(n!==""){
    
     document.querySelector('#zahlWurdeHinzgefügt').innerText = `Die Zahl ${numberToCheck} wurde an Index ${showIndex} hinzugefügt`
  }
  else { document.querySelector('#zahlWurdeHinzgefügt').innerText = `Es wurde keine Zahl eingegeben`

  }
}

function RuntimeCheck(functionToCheck) {
  var startTime = performance.now()
  this.functionToCheck=functionToCheck()
  var endTime = performance.now()
   console.log(`${functionToCheck} `)
   console.log(`was called it took ${endTime - startTime} milliseconds`)
}

function zahlHinzufügenClicked(){
  let n=document.getElementById('numberToAdd').value
  if(n!==""){
    RuntimeCheck(addNumberToSortedArray)    
    textZahlHinzugefügt()
    tableWithNewNumber()
    colorNewNumber()
    resetInput('form3')
    console.log(sortedArray)
   
  }
  showIndex=0
  checkIndex=0
  
}

function generateNumbersClicked(){
  RuntimeCheck(createTableOfNumbersArray)
  resetInput('form2')
}

function sortNumbersButtonClicked(){
  RuntimeCheck(sortTableOfNumbersArray)
  
  console.log(sortedArray)
}

function colorNewNumber(){
let table =document.getElementById('arrayMitNeuerZahl')
let rows= table.querySelectorAll('tr')
let number=numberToCheck
let index=showIndex
for(let i=0;i<rows.length;i++){
  if(parseInt(rows[i].cells[1].innerHTML) == number && parseInt(rows[i].cells[0].innerHTML) == index){
    rows[i].classList.add("addedNumber")
    rows[i].setAttribute('id', 'newestNumber')
    
}
}
}
  let checkEnterField=document.getElementById('numberToAdd')

  checkEnterField.addEventListener('keypress',function(e){
    if (e.key==='Enter') {
      e.preventDefault();
      zahlHinzufügenClicked();
      console.log('enter pressed')
    }
  })
