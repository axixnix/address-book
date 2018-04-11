window.onload = function (){
    //buttons
    var kAddBtn = document.getElementById('kAdd')
    var addbtn = document.getElementById('add')
    var cancelBtn = document.getElementById('cancel')
    var kAddFormDiv = document.querySelector('.kAddForm')//document.getElementByclassName()[0] would also work here,this method returns an array so we take the first element of the array hence the [0]
    var editDoneBtn = document.getElementById('editdone')
    
    editDoneBtn.style.display='none'
    
    //form fields
    var address=document.getElementById('address')
    var fullName=document.getElementById('fullName')
    var phone=document.getElementById('phone')
    var email=document.getElementById('email')
    
    //addressbook display
    var addBookDiv = document.querySelector('.addbook')
     var displayOnNameClick = document.querySelector('.displayOnNameClick')

    var dId = 0
    console.log(dId)
    //create storage array
    var addressBook=[]
    
    //eventlisteners
    kAddBtn.addEventListener('click',function(){
        kAddFormDiv.style.display='block'
    })
    
    
    
    cancelBtn.addEventListener('click',function(){
        clearForm()
        editDoneBtn.style.display='none'
        kAddFormDiv.style.display='none'
        $('.addNow').css('display','inline')
        $('.del').css('display','block')//started using jquery when vanilla javascript started acting funny
    })
        
    addbtn.addEventListener('click',addToBook)
    
    editDoneBtn.addEventListener('click',editsubmission)
    
    addBookDiv.addEventListener('click',removeEntry)
    
    addBookDiv.addEventListener('click',sendEditVal)

    addBookDiv.addEventListener('click',function(e){
    if(e.target.classList.contains('name')){ 
     // var n= $('div.name').data('id')
     var n = e.target.getAttribute('data-id')
      console.log(n)
       // var n = e.target.getAttribute('data-id')
        $('.displayOnNameClick').css('display','block')
        displayOnNameClick.innerHTML=''
        addressBook=JSON.parse(localStorage['addbook'])
        
        
        var disCon = '<div class="rentry">'
        disCon += '<div class="dname"><p class="name">Name: '+addressBook[n].fullName+'</p></div>'
        disCon += '<div class="dphone"><p>Phone number: '+addressBook[n].phone+'</p></div>'
        disCon += '<div class="daddress"><p>Address: '+addressBook[n].address+'</p></div>'
        disCon += '<div class="demail"><p>Email: '+addressBook[n].email+'</p></div>'
        
        disCon +='<div class="returnBtn" id="returnBtn"><button><a href=# class="returnBtn"'+'>RETURN TO CONTACT LIST</a></button></div>'
        disCon += '<div>'
        displayOnNameClick.innerHTML=disCon
        $('a.returnBtn').css('text-decoration','none')
        kAddBtn.style.display='none'
        $('.displayOnNameClick').css('display','block')
        $('.addbook').css('display','none')// did this when ```var sendEditBtn = document.getElementById('del')``` and ```var sendEditBtn = document.querySelector('.del')``` kept returning either null or undefined
        $('.kAddForm').css('display','none')
    
    }
    else{return false}
    })
   
     
    displayOnNameClick.addEventListener('click',function(e){
        if(e.target.classList.contains('returnBtn')){
            displayOnNameClick.innerHTML=''
            displayOnNameClick.style.display='none'
            $('.addbook').css('display','block')
            $('.kAddForm').css('display','none')
            kAddBtn.style.display='block'
        }
        else{return false}

    })   

    
    
    
    function removeEntry(e){
        if(e.target.classList.contains('delbutton')){
        var remID = e.target.getAttribute('data-id')
        //remove json entry  with index number = remID from the array
        addressBook.splice(remID,1)
        localStorage['addbook']=JSON.stringify(addressBook)
        showAddressBook()} 
        else{return false}//without this line a click anywhere outside a delete button would delete the oldest addition the addressbook
    
    }
    
    function jsonStructure(fullName,phone,address,email){
        this.fullName=fullName
        this.phone=phone
        this.address=address
        this.email=email
    }
    
    function addToBook (){
        var isNull = fullName.value!='' && phone.value!='' && address.value!='' && email.value!=''
        if(isNull){
            //adding contents of the form to  array then to local storage
            var obj = new jsonStructure(fullName.value,phone.value,address.value,email.value)
            addressBook.push(obj)
            localStorage['addbook']=JSON.stringify(addressBook)
            //hide form panel
            kAddFormDiv.style.display='none'
            //clear the form
            clearForm()
            //updating and displaying the contents of the addressbook
            showAddressBook()
        }
    }
    
    function clearForm(){
        var frm=document.querySelectorAll('.formFields')
        for(var i in frm){
            frm[i].value=''
        }
    }
    


    function showAddressBook(){
        //check if addbook key exist in local storage or else create it
        //if it exists load the contents and loop display it on the page
        if(localStorage['addbook']===undefined){
            localStorage['addbook']='[]'
        }
        else{
            addressBook=JSON.parse(localStorage['addbook'])
            addBookDiv.innerHTML=''
           
            for(var n in addressBook){
                var str ='<div class="entry"><hr/>'
                str+='<div class="name" id="name"><a href=# class="name" data-id="'+n+'">Name:'+addressBook[n].fullName+'</a></div>'
                str +='<div id="sendedit" class="edit"><button><a href=# class="edibutton" data-id="'+n+'">EDIT</a></button></div>'
                str +='<div class="del" id="del"><button><a href=# class="delbutton" data-id="'+n+'">DELETE</a></button></div>'
                str +='<div>'
                addBookDiv.innerHTML+=str
                $('a.delbutton').css('text-decoration','none')
                $('a.edibutton').css('text-decoration','none')
                $('a.name').css('text-decoration','none')
               console.log(n)
            }
        }
    
    }
    
    
    function sendEditVal(e){
        if(e.target.classList.contains('edibutton')){
            kAddFormDiv.style.display='block'
            var n = e.target.getAttribute('data-id')
        document.getElementById("fullName").value = addressBook[n].fullName// document.getElementById("").innerHTML will not work for input tags,but will work for text areas
        document.getElementById("phone").value = addressBook[n].phone
        document.getElementById("address").value = addressBook[n].address
        document.getElementById("email").value = addressBook[n].email
        editDoneBtn.style.display='inline'
        $('.del').css('display','none')// did this when ```var sendEditBtn = document.getElementById('del')``` and ```var sendEditBtn = document.querySelector('.del')``` kept returning either null or undefined
        $('.addNow').css('display','none')
        dId = n 
        console.log(dId)
        
        
    }
        else{return false}
        
       
        }
    
        function editsubmission(){
            var isNull = fullName.value!='' && phone.value!='' && address.value!='' && email.value!=''
            if(isNull){
                //adding contents of the form to  array then to local storage
                var obj2 = new jsonStructure(fullName.value,phone.value,address.value,email.value)
                addressBook.splice(dId,1,obj2)
                localStorage['addbook']=JSON.stringify(addressBook)
                //return the add now button
                $('.addNow').css('display','inline')
                //hide edit submission button
                editDoneBtn.style.display='none'
                //hide form panel
                kAddFormDiv.style.display='none'
                //clear the form
                clearForm()
                //updating and displaying the contents of the addressbook
                showAddressBook()
            }
        }
        
        
    
    showAddressBook()
    
    }