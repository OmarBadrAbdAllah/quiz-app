//select element
let mycountquiz=document.querySelector('.quiz-co .quiz-info .count span'),
myspan=document.querySelector('.quiz-co .quiz-sub .bullits .span'),
myquiz=document.querySelector('.quiz-co .quiz-qy'),
myans=document.querySelector('.quiz-co .answer-ar'),
mybotton=document.querySelector('.submit'),
mybullits=document.querySelector('.quiz-co .quiz-sub .bullits'),
myresult=document.querySelector('.quiz-co .result'),
mycountdown=document.querySelector(".quiz-co .quiz-sub .bullits .count-down");

//set variable to nead
let mycuindex=0,
myrightans=0,
myinterval;

function getquiz(){
    let myrequest=new XMLHttpRequest();
    
    myrequest.open('get','quiz.json',true)
    myrequest.send();;
    console.log(myrequest
        )
    myrequest.onloadend=function(){
        if(myrequest.readyState == 4 && myrequest.status == 200){
            let myobje=JSON.parse(myrequest.responseText);
            let qcount=myobje.length
            crespan(qcount)
            crequ(myobje[mycuindex],qcount)
            countdown(10,qcount)
        mybotton.onclick=function(){
    
        let ranswer=myobje[mycuindex].right_ansewr;
        
        mycuindex++
        chek(ranswer,qcount)
        // empty the answer and quiz area
        myquiz.innerHTML='';
        myans.innerHTML='';
         // get second question;
         crequ(myobje[mycuindex],qcount)
         handleb()
         clearInterval(myinterval)
         countdown(10,qcount)
         showresults(qcount)
}
};
        
}}
 getquiz()
 // create bullits + count of quyz
 function crespan(num){
    mycountquiz.innerHTML=num
    for(i=0; i<num;i++){
        let sp=document.createElement('span');
        if(i===0){
            sp.className='on'
        }
myspan.append(sp)
    }
 }

 // create quiz and answer
 function crequ(obj,count){
    //create quistion
    if(mycuindex < count){
let myh=document.createElement('h2'),
mytext=document.createTextNode(obj.title);
myh.append(mytext)
myquiz.append(myh)
//create ansewr
for(i=1;i<=4;i++){
    
    let myinp=document.createElement('input'),
    mydiv=document.createElement('div'),
    mylabel=document.createElement('label'),
    mylate=document.createTextNode(obj[`answer_${i}`]);
    mydiv.className='answer';
    myinp.type='radio',
    myinp.name='question',
    myinp.id=`answer_${i}`,
    myinp.dataset.answer=obj[`answer_${i}`]
    mylabel.htmlFor=`answer_${i}`
    mylabel.append(mylate)
    mydiv.append(myinp)
    mydiv.append(mylabel);
    myans.append(mydiv)
    if(i=== 1){
        myinp.checked=true;
    }
}
 }}

 // function for collect right answer
 function chek(rAnswer,count){
    let ansewrs=document.getElementsByName('question'),
    choosenans;
    for(i=0;i<ansewrs.length;i++){
        if (ansewrs[i].checked == true){
            choosenans=ansewrs[i].dataset.answer
        }
    }
    
if(choosenans === rAnswer){
myrightans++
console.log('good')
 
 }}

 // handle bullits
 function handleb(){
    let mybull=document.querySelectorAll('.quiz-co .quiz-sub .bullits .span span'),
    myaray=Array.from(mybull);
    myaray.forEach(function(span,index){
        
            if(index === mycuindex){
                span.className='on'
            }
    })
    
}

// show result
function showresults(count){
    if(mycuindex === count){
myans.remove();
mybotton.remove()
mybullits.remove()
myquiz.remove()
myspan.remove()
    
    if(myrightans > count/2 && myrightans < count){
myresult.innerHTML=`<span class="good">good</span>, your right answer is ${myrightans} from ${count}`
    }else if(myrightans === count){
        myresult.innerHTML=`<span class="perfect">perfect, your answer all question`
    }else{
        myresult.innerHTML=`<span class="bad">bad, your right answer is ${myrightans} from ${count}`
    }
    myresult.style.padding='10px';
    myresult.style.backgroundColor='white';
}
}
// count down function
function countdown(duration,count){
    if (mycuindex <count){
        let minute,sec;
         myinterval=setInterval(function(){
            minute=parseInt(duration /60)
            sec=parseInt(duration % 60)
            if(minute<10){
                minute=`0${minute}`
            }
            if(sec<10 ){
                sec=`0${sec}`
            }
            mycountdown.innerHTML=`${minute}:${sec}`
            if(--duration <0){
                clearInterval(myinterval)
                mybotton.click()
            }
    

    },1000)
    }
}