let defaultProporties={
    text:"",
    'font-weight':"",
    'text-decoration':"",
    'text-align':'left',
    color:'black',
    'font-family':"Noto Sans",
    'font-size':14    
};
let cellData={
    'Sheet1':{

    }

}
let selectedSheet='Sheet1';
let totalSheets=1;
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
           let rowshorizontal=$( `<div class="input__cell" contenteditable="false" id="row-${i}-col-${j}"data="code-${code}" ></div>`);


        
           rowcont.append(rowshorizontal);
        }

        $(`.input-cell-container`).append(rowcont);
    }


$(".input__cell").blur(function(){
    $('.input__cell').attr('contenteditable',"false");
})


$(".align-pos").click(function () { 
   $(".align-pos.selected").removeClass("selected");
   
  $(this).addClass("selected");
  
});
$(".style-icon").click(function () { 
    $(this).toggleClass("selected");
    
});
$(".input__cell").click(function (e) { 
 if(e.ctrlKey){
    
     let [row,col]= getcolrow(this);

     let topselected=$(`#row-${row-1}-col-${col}`).hasClass('selected');
     if(topselected){
         $(this).addClass('top-cell-selected');
         $(`#row-${row-1}-col-${col}`).addClass('bottom-cell-selected');

         
     }
     let bottomselected=$(`#row-${row+1}-col-${col}`).hasClass('selected');
     if(bottomselected){
         $(this).addClass('bottom-cell-selected');
         $(`#row-${row+1}-col-${col}`).addClass('top-cell-selected');
     }
     let leftselected=$(`#row-${row}-col-${col-1}`).hasClass('selected');
     if(leftselected){
         $(this).addClass('left-cell-selected');
         $(`#row-${row}-col-${col-1}`).addClass('right-cell-selected');
     }
     let rightselected=$(`#row-${row}-col-${col+1}`).hasClass('selected');
     if(rightselected){
         $(this).addClass('right-cell-selected');
         $(`#row-${row}-col-${col+1}`).addClass('left-cell-selected');
     }



 }
 else if($(this).hasClass('selected')&&e.ctrlKey ){
     $(this).removeClass();
     $(this).addClass('input__cell');
     console.log('hit');

 }
 else {

      $('.input__cell.selected').removeClass("selected"); 
      $('.input__cell.left-cell-selected').removeClass('left-cell-selected');
      $('.input__cell.right-cell-selected').removeClass('right-cell-selected');
      $('.input__cell.top-cell-selected').removeClass('top-cell-selected');
      $('.input__cell.bottom-cell-selected').removeClass('bottom-cell-selected');
    
    }   

 $(this).addClass('selected');
 changeHeader(this);
 
 

  
    
})
function changeHeader(element){
    let[row,col]=getcolrow(element);
    let cellinfo=defaultProporties;
    if(cellData[selectedSheet][row]&&cellData[selectedSheet][row][col]){
        cellinfo=cellData[selectedSheet][row][col];
    }
 cellinfo['font-weight']?$('.icon-bold').addClass('selected'):$('.icon-bold').removeClass('selected');
 cellinfo['text-decoration']?$('.icon-underline').addClass('selected'):$('.icon-underline').removeClass('selected');
 cellinfo['font-style']?$('.icon-italic').addClass('selected'):$('.icon-italic').removeClass('selected');
 let positon=cellinfo['text-align'];
 $('.align-pos.selected').removeClass('selected');
 $('.icon-align_'+positon).addClass('selected');




}
$(".input__cell").dblclick(function () { 
    
    $(".input__cell.selected").removeClass("selected");
    $(this).addClass('selected');
   
    $(this).attr('contenteditable','true');
    $(this).focus();
  
   
    
    
})
$('.input-cell-container').scroll(function(){
    console.log(this.scrollLeft);
    $(".column__name_container").scrollLeft(this.scrollLeft);
})
$('.input-cell-container').scroll(function(){
    console.log(this.scrollTop);
    $(".row__name_container").scrollTop(this.scrollTop);
})



});
function getcolrow(e){
    let st=$(e).attr('id').split('-');
    let row=parseInt(st[1]);
    let col=parseInt(st[3]);

return [row,col];
}
// update area!! 
function updateCell(property,value,defaultPossible){
  
    $(".input__cell.selected").each(function(){
        console.log(property+value);
        $(this).css(property,value);
        //
        let [row,col]=getcolrow(this);
        if(cellData[selectedSheet][row]){
            if(cellData[selectedSheet][row][col]){
                cellData[selectedSheet][row][col][property]=value;
            }else {
                cellData[selectedSheet][row][col]={...defaultProporties};
                cellData[selectedSheet][row][col][property]=value;
            }

        }else{
            cellData[selectedSheet][row]={};
            cellData[selectedSheet][row][col]={...defaultProporties};
            cellData[selectedSheet][row][col][property]=value;
        }

        if(defaultPossible&&JSON.stringify(cellData[selectedSheet][row][col]===JSON.stringify(defaultProporties)))
        {
            delete cellData[selectedSheet][row][col];
            if(Object.keys(cellData[selectedSheet][row]).length==0){
                delete cellData[selectedSheet][row];
            }
        }
    })
console.log(cellData);
}
$(".icon-bold").click(function(){
  
    if($(this).hasClass('selected'))
    {
    updateCell('font-weight','',true)
    
   
} else{
        updateCell('font-weight','bold');
    }
})
$(".icon-italic").click(function(){
  
    if($(this).hasClass('selected'))
    {
    updateCell('font-style','',true)
    
   
} else{
        updateCell('font-style','italic');
    }
})
$(".icon-underline").click(function(){
  
    if($(this).hasClass('selected'))
    {
    updateCell('text-decoration','',true)
    
   
} else{
        updateCell('text-decoration','underline');
    }
})
//aligning update store
$('.icon-align_center').click(function(){
    if(!$(this).hasClass('selected'))
    {
        $(this).addClass('selected')
        updateCell('text-align','center',false)
    }
})
$('.icon-align_left').click(function(){
    if(!$(this).hasClass('selected'))
    {
        $(this).addClass('selected')
        updateCell('text-align','left',true)
    }
})
$('.icon-align_right').click(function(){
    if(!$(this).hasClass('selected'))
    {
        $(this).addClass('selected')
        updateCell('text-align','right',false)
    }
})

