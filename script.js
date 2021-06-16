$(document).ready(function(){

    let container=$(`.column__name_container`);
for(let i=1;i<=100;i++)
{
    
    let a=i;
    let ans="";
    
    while(a>0){
        let mod=a%26;
        
        if(mod==0){
            
            
            
            ans='Z'+ans;
            a=Math.floor(a/26)-1;
            
        }
        else{
            ans= String.fromCharCode(mod-1+65)+ans;
            a=Math.floor(a/26);
        }
        
    }

    
    let colname=$( `<div class="col-name colId-${i}" id="colCode-${ans}">${ans}</div>`)
    container.append(colname);
    let rowname=$(`<div class="row-name"id="row_Id-${i}">${i}</div>`)
    $('.row__name_container').append(rowname);
}

    for(let i=1;i<=100;i++){
        let rowcont=$( `<div class="input__row">`);
        for(let j=1;j<=100;j++){
            let code=$(`.colId-${j}`).attr("id").split("-")[1];
           let rowshorizontal=$( `<div class="input__cell__row" contenteditable="true" id="row-${i}-col-${j} " data="code-${code}" ></div>`);


        
           rowcont.append(rowshorizontal);
        }

        $(`.input-cell-container`).append(rowcont);
    }








});
