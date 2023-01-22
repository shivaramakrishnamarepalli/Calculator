import {compute} from "./compute.js";

const calc=document.querySelector('#calc');

let eq = "";
let formula = document.createElement("div");
let sol = document.createElement("div");

function createCalc()
{
    // creating outline frame
    let frame = document.createElement('div');
    frame.classList.add("calc");
    calc.append(frame);

    // creating display block
    let display = document.createElement("div");
    display.classList.add("display");
    frame.appendChild(display);

    formula.classList.add("formula");
    display.append(formula);

    sol.classList.add("sol");
    display.append(sol);
    //buttons
    let buttons = document.createElement("div");
    buttons.classList.add("buttons");
    frame.append(buttons);

    let clear = document.createElement("button");
    clear.innerText="Clear";
    clear.classList.add("grid-item");
    clear.classList.add("big-item");
    clear.onclick=()=>{clearData();}
    buttons.append(clear);

    let del = document.createElement("button");
    del.innerText="delete";
    del.classList.add("grid-item");
    del.classList.add("big-item");
    del.onclick=()=>{backSpace();}
    buttons.append(del);


    // grid of buttons
    let gridCont = document.createElement("div");
    gridCont.classList.add("grid-container");
    buttons.appendChild(gridCont);

    let val = ["^","(",")","!","7","8","9","/","4","5","6","*","1","2","3","-",".","0","=","+"];
    for(let i=0;i<20;i++)
    {
        let gridItem = document.createElement("button");
        gridItem.innerText=val[i];
        gridItem.onclick=(e)=>{handleClick(e);}
        gridItem.setAttribute("id",val[i]);
        gridItem.classList.add("grid-item");
        gridCont.appendChild(gridItem);
    }

}
createCalc();

let prev = "" ;
function handleClick(e){
    let k = e.target.id;
    let ans = sol.innerText;
    sol.innerText=""
    if(!isNaN(k)||k===".")
    {
        if(prev === "="){
            eq = k;
        }
        else{
            eq+=e.target.id;
        }
        prev = ""
    }
    else if(k==="=")
    {
        sol.innerText=compute(eq);
        prev="=";
    }
    else{
        if(prev === "="){
            eq = ans;
        }
        eq+=e.target.id;
        prev = ""
    }
    ans = "" ;
    formula.innerText=eq;
}

function clearData()
{
    eq = "";
    sol.innerText = "";
    formula.innerText=eq;
    prev = "";
}

function backSpace()
{
    if(prev === "=")
    {
        prev = "";
        return;
    }
    eq = eq.slice(0,eq.length-1);
    sol.innerText=""
    formula.innerText=eq;
}