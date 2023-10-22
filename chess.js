var squares = document.querySelectorAll('.square');
var btn=document.querySelector('.btn');
var d=document.querySelectorAll('.square');
var source =document.querySelectorAll('.row');
var board =document.querySelector('.board');
var pieces =document.querySelectorAll('img');
var play='white'
var checked;
var Bking=document.querySelector('.black-king');
var Wking=document.querySelector('.white-king');
var QBrook=document.querySelector('.QBrook');
var KBrook=document.querySelector('.KBrook');
var QWrook=document.querySelector('.QWrook');
var KWrook=document.querySelector('.KWrook');
var F1=document.querySelector('.f1');
var G1=document.querySelector('.g1');
var B1=document.querySelector('.b1');
var C1=document.querySelector('.c1');
var D1=document.querySelector('.d1');
var LastMovedPiece
var EnPassant;
var LastMovedPieceParentRow
var TempoBK;
var TempoWK;
var target
var game=new Array()
game[0]=board.innerHTML;
var i=1;
// btn.addEventListener('click',()=>{
    
//     console.log('xxxtentacion')
//     i++;   
//     board.innerHTML=game[game.length-i]
// })





pieces.forEach(piece=>{
piece.addEventListener('dragstart',()=>{piece.classList.add("active")

})
piece.addEventListener('dragend',()=>{ 
    piece.classList.remove('active')})
})
squares.forEach(square=>{
    square.addEventListener('dragover',e=>{
        e.preventDefault();  
    
    })
    square.addEventListener("drop", (event) => {
        
        event.preventDefault();
        
        const el=document.querySelector('.active');
        checked='none';
    
        var source=el.parentElement;
        target=square;

        console.log('square'+square.getAttribute('row')+square.getAttribute('file'))
        var og=target.getAttribute('state');
        var ogcolor
        var continu=true;

        if(el.getAttribute('color')== play){
            squares.forEach(square => {
                if(accepts(el,square,source)){
                    
                }
                
            });
           
        bestMove()
        if(accepts(el,target,source) == true){  
            tempoBK=Bking.parentElement
            tempoWk=Wking.parentElement
            if(el==Wking){
                tempoWk=target
            }else if(el ==Bking){
                tempoWk=Wking
            }
           
            
                
                
                source.setAttribute('state','empty');
                target.setAttribute('state',el.getAttribute('color'));
                if(target.childElementCount>0){
                    ogcolor==target.children[0].getAttribute('color');
                    target.children[0].setAttribute('color',el.getAttribute('color'))
                }
               
                if(check()&& checked==el.getAttribute('color')){
                    
                    continu=false;
                    source.setAttribute('state',el.getAttribute('color'));
                    target.setAttribute('state',og);
                    if(target.childElementCount>0){
                        target.children[0].setAttribute('color',ogcolor)
                    }
                }



            
            if(continu){
            
            source.setAttribute('state','empty');
            target.setAttribute('state',el.getAttribute('color'));
           
            if(target.childElementCount >0){
                target.removeChild(target.children[0]);
            }
            if(el.getAttribute('piece')=='king'||el.getAttribute('piece')=='rook'){
                el.setAttribute('moved','yes')
            }
            if(EnPassant){
                LastMovedPiece.parentElement.removeChild(LastMovedPiece)
            }
            target.appendChild(el);
            if(play =='white'){
                play='black'
            }else{
                play='white';
            }
            LastMovedPiece=el;
            LastMovedPieceParentRow=source.getAttribute('row')
            game.push(document.querySelector('.board').innerHTML);
            
            

            }}else if(castlesKW(el,target)){
                
               G1.appendChild(Wking)
                F1.appendChild(KWrook)
                Wking.setAttribute('moved','yes')
                KWrook.setAttribute('moved','yes')


                if(play =='white'){
                    play='black'
                }else{
                    play='white';
                }


            }else if(castlesQW(el,target)){
                C1.appendChild(Wking)
                D1.appendChild(QWrook)
                Wking.setAttribute('moved','yes')
                QWrook.setAttribute('moved','yes')


                if(play =='white'){
                    play='black'
                }else{
                    play='white';
                }


            }
        }
        
        console.log(checked+'king is in check')
        check()

            
        
      });
})
function accepts(el,target, source) { 
    
    Sfile=Number(source.getAttribute('row'));
    Srow=Number(source.getAttribute('file'));
    Dfile=Number(target.getAttribute('row'));
    Drow=Number(target.getAttribute('file'));    
 if (el.getAttribute('piece')==='knight'){
     if((((Dfile=== Number(Sfile)+1 || Dfile === Number(Sfile)-1) && (Drow === Number(Srow+2) || Drow === Number(Srow-2)))||
    ((Drow===Number(Srow)+1 || Drow === Number(Srow)-1) && (Dfile===Number(Sfile)-2 || Dfile=== Number(Sfile)+2))) ){
        
    if(target.childElementCount == 0 || target.children[0] == el){
        
        return true;
    }else if(target.children[0].getAttribute('color')!==el.getAttribute('color')){
        
       
        return true
        
    }else{
        return false; 
    }
    
}
 else{
    return false;}
 }
 if(el.getAttribute('piece') ==='bishop'){

                
                
                
                
                

                if((Number(Dfile-Sfile) == Number(Drow-Srow) &&Number(Dfile - Sfile)>0)){
                    var i1=1;
                    
                    var test1=true;
                    var con1=true;
                    while(test1 == true && i1<=Number(Dfile - Sfile)){
                        

                        
                        if (Dfile == Number(Sfile+i1) && Drow == Number(Srow+i1)){
                            
                                if(target.childElementCount == 0 || target.children[0] == el){
                                
                                return true;
                            }else if(target.children[0].getAttribute('color') !== el.getAttribute('color')){
                                
                                
                                
                                return true
                            }else{
                                return false
                            }

                        }
                       
                       
                        
                            for (let index = 0; index < document.querySelectorAll('.square').length; index++) {
                               
                                const element = document.querySelectorAll('.square')[index];
                                if(element.getAttribute('row') == Sfile+i1 && element.getAttribute('file') == Srow+i1 ){
                                  
                                if(element.getAttribute('state') == el.getAttribute('color')){
                                        test1=false;
                                        }else if(element.getAttribute('state') == 'empty'){

                                        }else{
                                            test1=false;

                                        }
                                       
                                }
                                
                            }
                            i1++;
                           
                    }
                }
                //second condition
                
                if((Number(Dfile - Sfile) == Number(Srow -Drow) &&Number(Dfile - Sfile)>0)){
                    var i2=1;
                    console.log('second '+ i2)
                    var test2=true;

                    while(test2 == true && i2<=Number(Dfile - Sfile)){
                        if (Dfile == Number(Sfile+i2) && Drow == Number(Srow-i2)){
                            
                            if(target.childElementCount == 0 || target.children[0] == el){
                                
                                return true;
                            }else if(target.children[0].getAttribute('color') !== el.getAttribute('color')){
                                
                                
                                return true
                            }else{
                                return false
                            }

                        }
                        
                        
                            for (let index = 0; index < squares.length; index++) {
                               
                                const element =squares[index];
                                if(element.getAttribute('file') == Srow-i2 && element.getAttribute('row') == Sfile+i2 ){
                                  
                                    
                                        if(element.getAttribute('state') == el.getAttribute('color')){
                                           

                                            test2=false;
                                        }else if(element.getAttribute('state') == 'empty'){

                                        }else{
                                            test2=false;

                                        }
                                }
                                
                            }
                            i2++;
                    }
                }
                //third condition
               if((Number(Sfile - Dfile) == Number(Drow -Srow) &&Number(Sfile - Dfile)>0)){
                var test3=true;
                var i3=1;
                    while(test3 == true && i3<=Number(Sfile - Dfile)){
                        if (Dfile == Number(Sfile-i3) && Drow == Number(Srow+i3)){
                            
                            if(target.childElementCount == 0 || target.children[0] == el){
                                
                                return true;
                            }else if(target.children[0].getAttribute('color') !== el.getAttribute('color')){
                                
                                
                                return true
                            }else{
                                return false
                            }

                        }
                       
                        
                            for (let index = 0; index < document.querySelectorAll('.square').length; index++) {
                               
                                const element = document.querySelectorAll('.square')[index];
                                if(element.getAttribute('file') == Srow+i3 && element.getAttribute('row') == Sfile-i3 ){
                                  
                                    
                                        if(element.getAttribute('state') == el.getAttribute('color')){
                                           

                                            test3=false;
                                        }else if(element.getAttribute('state') == 'empty'){

                                        }else{
                                            test3=false;

                                        }
                                }
                                
                            }
                            i3++;
                    }
                }
                //fourth condition
                if((Number(Sfile - Dfile) == Number(Srow -Drow) &&Number(Sfile - Dfile)>0)){
                    var test4=true;
                    var i4=1;
                    while(test4 == true && i4<=Number(Sfile - Dfile)){
                        if (Dfile == Number(Sfile-i4) && Drow == Number(Srow-i4)){
                            
                            if(target.childElementCount == 0 || target.children[0] == el){
                                
                                return true;
                            }else if(target.children[0].getAttribute('color') !== el.getAttribute('color')){
                                
                                
                                return true
                            }else{
                                return false
                            }

                        }
                        
                        
                            for (let index = 0; index < document.querySelectorAll('.square').length; index++) {
                               
                                const element = document.querySelectorAll('.square')[index];
                                if(element.getAttribute('row') == Sfile-i4 && element.getAttribute('file') == Srow-i4 ){
                                  
                                    
                                        if(element.getAttribute('state') == el.getAttribute('color')){
                                           

                                            test4=false;
                                        }else if(element.getAttribute('state') == 'empty'){

                                        }else{
                                            test4=false;

                                        }
                                }
                                
                            }
                            i4++;
                    }
                }
            





 }
 if(el.getAttribute('piece') ==='rook'){

    var DR=Number(target.getAttribute('row'))
    var DF=Number(target.getAttribute('file'))
    var SR=Number(source.getAttribute('row'))
    var SF=Number(source.getAttribute('file'))
   
    

    
    if(DR==SR){
        

        if(Number(DF-SF)>0){
            console.log('freak'+Number(DF-SF))
            
            var con=true;
            
            var i1 =1;
           


            
            while(i1<=Number(DF-SF) && con ==true){
                
                if(DF== Number(SF+i1)){
                    if(target.childElementCount == 0 || target.children[0]==el){
                        
                        return true;

                    }else if(target.childElementCount >0){
                        if (target.getAttribute('state')!== el.getAttribute('color')){
                            
                           
                            return true;
                        }
                        else{
                            return false;
                        }

                    }
                    


                }
               



                    squares.forEach(square=>{

                        
                        if(square.getAttribute('row') ==Number(SR)  && square.getAttribute('file') == Number(SF)+i1){
                            console.log(square.getAttribute('row')+ square.getAttribute('file')+'*//*')
                          
                            
                           if(square.getAttribute('state') == el.getAttribute('color')){
                            
                            con=false
                                

                                return false
                                
                            }else if(square.getAttribute('state') == 'empty'){
                                console.log('that why')

                            }else{
                                con=false
                                return false

                            }
                    }
                   

                    })
                    i1++;
            }
        }
        if(Number(SF-DF)>0){
            
            var con=true;
            last = true;
            var i =1;
            


            
            while(i<=Number(SF-DF) && con ==true){
                
                
                if(DF== Number(SF-i)){
                    if(target.childElementCount == 0 || target.children[0]==el){
                        
                        return true

                    }else if(target.childElementCount >0){
                        if (target.getAttribute('state')!== el.getAttribute('color')){
                            
                            
                            return true;
                        }
                        else{
                           
                            return false;
                        }

                    }
                    


                }
               



                    squares.forEach(square=>{

                        
                        if(square.getAttribute('row') ==Number(SR)  && square.getAttribute('file') == Number(SF)-i ){
                            
                          
                            
                           if(square.getAttribute('state') == el.getAttribute('color')){
                                

                                con=false;
                                
                            }else if(el.getAttribute('state') == 'empty'){

                            }else{
                                return false

                            }
                    }
                   

                    })
                    i++;
            }
        }
        return false;
       

    }
    if(DF==SF){

        

        if(Number(DR-SR)>0){
            
            var con=true;
          
            var i =1;
            
           


            
            while(i<=Number(DR-SR) && con ==true){
                
                if(DR== Number(SR+i)){
                    if(target.childElementCount == 0 || target.children[0]==el){
                        
                        return true

                    }else if(target.childElementCount >0){
                        if (target.getAttribute('state')!== el.getAttribute('color')){
                           
                            return true;
                        }
                        else{
                            con=false;
                            return false;
                        }

                    }
                    


                }
               



                    squares.forEach(square=>{
                        

                        
                        if(square.getAttribute('row') ==Number(SR)+i && square.getAttribute('file') ==  Number(SF)){
                            
                           if(square.getAttribute('state') == el.getAttribute('color')){
                                

                                con=false;
                                
                            }else if(el.getAttribute('state') == 'empty'){

                            }else{
                                return false

                            }
                    }
                    

                    })
                    i++;
            }
        }
        if(Number(SR-DR)>0){
            console.log('jakeYB')
            var con=true;
            
            var i =1;
           

            
            while(i<=Number(SR-DR) && con ==true){
                
                if(DR== Number(SR-i)){
                    if(target.childElementCount == 0 || target.children[0]==el){
                        
                        return true

                    }else if(target.childElementCount >0){
                        if (target.getAttribute('state')!== el.getAttribute('color')){
                           
                            
                            return true;
                        }
                        else{
                            con=false;
                            
                            return false;
                        }

                    }
                    


                }
               



                    squares.forEach(square=>{

                        
                        if((square.getAttribute('row') ==Number(SR)-i  && square.getAttribute('file') ==   
                        Number(SF) )){
                           
                          
                            
                            if(square.getAttribute('state') == el.getAttribute('color')){
                                

                                con=false;
                                
                            }else if(square.getAttribute('state') == 'empty'){

                            }else{
                                return false

                            }
                    }
                   

                    })
                    i++;
            }
        }
        return false;
       

    }
   
       
 }
 if(el.getAttribute('piece') ==='pawn'){
    

    if(el.getAttribute('color')=='white'){

    if(((Dfile === Number(Sfile)+1)||((Dfile === Number(Sfile)+2)&&(Number(source.getAttribute('row'))==2)))&&(target.childElementCount ==0)&&(Drow==Srow)){
        
        return true
    }else
    if((Number(Drow)==Number(Srow)+1||Number(Drow)==Number(Srow)-1)&&(Dfile === Number(Sfile)+1)&&(target.childElementCount >0 )&& (target.children[0].getAttribute('color')=='black')){
        
        return true;
    }else
    if(LastMovedPiece){
        
        
    if(Number(LastMovedPieceParentRow)==7 && LastMovedPiece.getAttribute('piece')=='pawn' &&Number(LastMovedPiece.parentElement.getAttribute('row'))== 5 &&(Number(LastMovedPiece.parentElement.getAttribute('file'))==Number(Srow)+1||LastMovedPiece.parentElement.getAttribute('file')==Number(Srow)-1 )&& LastMovedPiece.parentElement.getAttribute('file')==Drow && target.getAttribute('row')==Number(LastMovedPiece.parentElement.getAttribute('row'))+1 && LastMovedPiece.parentElement.getAttribute('row')==el.parentElement.getAttribute('row')){
   
        EnPassant=true;
        return true
        

    }}


}else{
    
    if(((Dfile === Number(Sfile)-1)||((Dfile === Number(Sfile)-2)&&(Number(source.getAttribute('row'))==7)))&&(target.childElementCount ==0)&&(Drow==Srow)){
        
        return true
    }
    if((Number(Drow)==Number(Srow)+1||Number(Drow)==Number(Srow)-1)&&(Dfile === Number(Sfile)-1)&&(target.childElementCount >0 )&& (target.children[0].getAttribute('color')=='white')){
        
        return true;
    }
    if(Number(LastMovedPieceParentRow)==2 && LastMovedPiece.getAttribute('piece')=='pawn' &&Number(LastMovedPiece.parentElement.getAttribute('row'))== 4 &&(Number(LastMovedPiece.parentElement.getAttribute('file'))==Number(Srow)+1||LastMovedPiece.parentElement.getAttribute('file')==Number(Srow)-1 )&& LastMovedPiece.parentElement.getAttribute('file')==Drow && target.getAttribute('row')==Number(LastMovedPiece.parentElement.getAttribute('row'))-1 && LastMovedPiece.parentElement.getAttribute('row')==el.parentElement.getAttribute('row')){
   
        EnPassant=true;
        return true
        

    }
}
    
 }
 if(el.getAttribute('piece') ==='king'){
    if(((Dfile === Number(Sfile)+1)||(Dfile === Number(Sfile)-1)||(Dfile ===Sfile))&& ((Drow === Number(Srow)+1)||(Drow === Number(Srow)-1)||(Drow ===Srow))){
       
        return true
    }
       
        
    
   
    
 }
 if(el.getAttribute('piece') ==='queen'){
    if((Number(Dfile-Sfile) == Number(Drow-Srow) &&Number(Dfile - Sfile)>0)){
        var i1=1;
        
        var test1=true;
        var con1=true;
        while(test1 == true && i1<=Number(Dfile - Sfile)){
            

            
            if (Dfile == Number(Sfile+i1) && Drow == Number(Srow+i1)){
                
                    if(target.childElementCount == 0 || target.children[0] == el){
                    
                    return true;
                }else if(target.children[0].getAttribute('color') !== el.getAttribute('color')){
                   
                   
                    
                    return true
                }else{
                    return false
                }

            }
           
           
            
                for (let index = 0; index < document.querySelectorAll('.square').length; index++) {
                   
                    const element = document.querySelectorAll('.square')[index];
                    if(element.getAttribute('row') == Sfile+i1 && element.getAttribute('file') == Srow+i1 ){
                      
                    if(element.getAttribute('state') == el.getAttribute('color')){
                            test1=false;
                            }else if(element.getAttribute('state') == 'empty'){

                            }else{
                                test1=false;

                            }
                           
                    }
                    
                }
                i1++;
               
        }
    }
    //second condition
    
    if((Number(Dfile - Sfile) == Number(Srow -Drow) &&Number(Dfile - Sfile)>0)){
        var i2=1;
        console.log('second '+ i2)
        var test2=true;

        while(test2 == true && i2<=Number(Dfile - Sfile)){
            if (Dfile == Number(Sfile+i2) && Drow == Number(Srow-i2)){
                
                if(target.childElementCount == 0 || target.children[0] == el){
                   
                    return true;
                }else if(target.children[0].getAttribute('color') !== el.getAttribute('color')){
                   
                    
                    return true
                }else{
                    return false
                }

            }
            
            
                for (let index = 0; index < squares.length; index++) {
                   
                    const element =squares[index];
                    if(element.getAttribute('file') == Srow-i2 && element.getAttribute('row') == Sfile+i2 ){
                      
                        
                            if(element.getAttribute('state') == el.getAttribute('color')){
                               

                                test2=false;
                            }else if(element.getAttribute('state') == 'empty'){

                            }else{
                                test2=false;

                            }
                    }
                    
                }
                i2++;
        }
    }
    //third condition
   if((Number(Sfile - Dfile) == Number(Drow -Srow) &&Number(Sfile - Dfile)>0)){
    var test3=true;
    var i3=1;
        while(test3 == true && i3<=Number(Sfile - Dfile)){
            if (Dfile == Number(Sfile-i3) && Drow == Number(Srow+i3)){
                
                if(target.childElementCount == 0 || target.children[0] == el){
                   
                    return true;
                }else if(target.children[0].getAttribute('color') !== el.getAttribute('color')){
                   
                    
                    return true
                }else{
                    return false
                }

            }
           
            
                for (let index = 0; index < document.querySelectorAll('.square').length; index++) {
                   
                    const element = document.querySelectorAll('.square')[index];
                    if(element.getAttribute('file') == Srow+i3 && element.getAttribute('row') == Sfile-i3 ){
                      
                        
                            if(element.getAttribute('state') == el.getAttribute('color')){
                               

                                test3=false;
                            }else if(element.getAttribute('state') == 'empty'){

                            }else{
                                test3=false;

                            }
                    }
                    
                }
                i3++;
        }
    }
    //fourth condition
    if((Number(Sfile - Dfile) == Number(Srow -Drow) &&Number(Sfile - Dfile)>0)){
        var test4=true;
        var i4=1;
        while(test4 == true && i4<=Number(Sfile - Dfile)){
            if (Dfile == Number(Sfile-i4) && Drow == Number(Srow-i4)){
                
                if(target.childElementCount == 0 || target.children[0] == el){
                    
                    return true;
                }else if(target.children[0].getAttribute('color') !== el.getAttribute('color')){
                    
                    
                    return true
                }else{
                    return false
                }

            }
            
            
                for (let index = 0; index < document.querySelectorAll('.square').length; index++) {
                   
                    const element = document.querySelectorAll('.square')[index];
                    if(element.getAttribute('row') == Sfile-i4 && element.getAttribute('file') == Srow-i4 ){
                      
                        
                            if(element.getAttribute('state') == el.getAttribute('color')){
                               

                                test4=false;
                            }else if(element.getAttribute('state') == 'empty'){

                            }else{
                                test4=false;

                            }
                    }
                    
                }
                i4++;
        }
    }
    var DR=Number(target.getAttribute('row'))
    var DF=Number(target.getAttribute('file'))
    var SR=Number(source.getAttribute('row'))
    var SF=Number(source.getAttribute('file'))
   
    

    
    if(DR==SR){
        

        if(Number(DF-SF)>0){
            console.log('freak'+Number(DF-SF))
            
            var con=true;
            
            var i1 =1;
           


            
            while(i1<=Number(DF-SF) && con ==true){
                
                if(DF== Number(SF+i1)){
                    if(target.childElementCount == 0 || target.children[0]==el){
                        
                        return true;

                    }else if(target.childElementCount >0){
                        if (target.getAttribute('state')!== el.getAttribute('color')){
                            
                           
                            return true;
                        }
                        else{
                            return false;
                        }

                    }
                    


                }
               



                    squares.forEach(square=>{

                        
                        if(square.getAttribute('row') ==Number(SR)  && square.getAttribute('file') == Number(SF)+i1){
                            console.log(square.getAttribute('row')+ square.getAttribute('file')+'*//*')
                          
                            
                           if(square.getAttribute('state') == el.getAttribute('color')){
                            
                            con=false
                                

                                return false
                                
                            }else if(square.getAttribute('state') == 'empty'){
                                console.log('that why')

                            }else{
                                con=false
                                return false

                            }
                    }
                   

                    })
                    i1++;
            }
        }
        if(Number(SF-DF)>0){
            
            var con=true;
            last = true;
            var i =1;
            


            
            while(i<=Number(SF-DF) && con ==true){
                
                
                if(DF== Number(SF-i)){
                    if(target.childElementCount == 0 || target.children[0]==el){
                        
                        return true

                    }else if(target.childElementCount >0){
                        if (target.getAttribute('state')!== el.getAttribute('color')){
                            
                            
                            return true;
                        }
                        else{
                           
                            return false;
                        }

                    }
                    


                }
               



                    squares.forEach(square=>{

                        
                        if(square.getAttribute('row') ==Number(SR)  && square.getAttribute('file') == Number(SF)-i ){
                            
                          
                            
                           if(square.getAttribute('state') == el.getAttribute('color')){
                                

                                con=false;
                                
                            }else if(square.getAttribute('state') == 'empty'){

                            }else{con=false;
                                return false

                            }
                    }
                   

                    })
                    i++;
            }
        }
        return false;
       

    }
    if(DF==SF){

        

        if(Number(DR-SR)>0){
            console.log('queen1')
            var con=true;
          
            var i =1;
            
           


            
            while(i<=Number(DR-SR) && con ==true){
                
                if(DR== Number(SR+i)){
                    if(target.childElementCount == 0 || target.children[0]==el){
                        
                        return true

                    }else if(target.childElementCount >0){
                        if (target.getAttribute('state')!== el.getAttribute('color')){
                           
                            return true;
                        }
                        else{
                            con=false;
                            return false;
                        }

                    }
                    


                }
               



                    squares.forEach(square=>{
                        

                        
                        if(square.getAttribute('row') ==Number(SR)+i && square.getAttribute('file') ==  Number(SF)){
                            
                           if(square.getAttribute('state') == el.getAttribute('color')){
                                

                                con=false;
                                
                            }else if(square.getAttribute('state') == 'empty'){

                            }else{
                                con=false;
                                return false

                            }
                    }
                    

                    })
                    i++;
            }
        }
        if(Number(SR-DR)>0){
            console.log('jakeYB')
            var con=true;
            
            var i =1;
           

            
            while(i<=Number(SR-DR) && con ==true){
                
                if(DR== Number(SR-i)){
                    if(target.childElementCount == 0 || target.children[0]==el){
                        
                        return true

                    }else if(target.childElementCount >0){
                        if (target.getAttribute('state')!== el.getAttribute('color')){
                           
                            
                            return true;
                        }
                        else{
                            con=false;
                            
                            return false;
                        }

                    }
                    


                }
               



                    squares.forEach(square=>{

                        
                        if((square.getAttribute('row') ==Number(SR)-i  && square.getAttribute('file') ==   
                        Number(SF) )){
                           
                          
                            
                            if(square.getAttribute('state') == el.getAttribute('color')){
                                

                                con=false;
                                
                            }else if(square.getAttribute('state') == 'empty'){

                            }else{
                                con=false;
                                return false

                            }
                    }
                   

                    })
                    i++;
            }
        }
        return false;
       

    }}
}


function check(){
    var tempo=false;
  

   var pieces =document.querySelectorAll('img')
    pieces.forEach(piece => {
       
        if(piece.getAttribute('color') =='white' && piece !=Bking){
           
            


            if(accepts(piece,tempoBK,piece.parentElement)){
                console.log(piece.getAttribute('piece')+'on'+piece.parentElement.getAttribute('row')+piece.parentElement.getAttribute('file'))
                checked='black';
                tempo=true;
                

            }
            
            
        }else if(piece.getAttribute('color') =='black' && piece !=Wking){
            if (accepts(piece,tempoWk,piece.parentElement)&& piece !=   Wking){
                checked='white';
                
                tempo=true;
            
               
             }
        }
        
        
    });
   
    return tempo;
    
    
        
    



}
function castlesKW(el,target){
    var tmp=false
   
    if(el.getAttribute('moved')=='false' &&  (target.getAttribute('row')==1 && target.getAttribute('file')==7) ){
        console.log('Wking')
        Wking.parentElement.setAttribute('state','Empty')
       
       
            if(accepts(KWrook,Wking.parentElement,KWrook.parentElement)){
                
                tmp=true;
            }
            pieces.forEach(piece => {
                if(piece.getAttribute('color')=='black'){
                    if (accepts(piece,F1,piece.parentElement)||accepts(piece,G1,piece.parentElement)){
                        tmp=false;

                    }

                }
                
            });
            
            
       

    }
    return tmp



}
function castlesQW(el,target){
    var tmp=false
    if(!check()){
   
    if(el.getAttribute('moved')=='false' &&  (target)==C1 ){
        
        
        Wking.parentElement.setAttribute('state','Empty')
       
       
            if(accepts(QWrook,Wking.parentElement,QWrook.parentElement)){
                
                tmp=true;
            }
            pieces.forEach(piece => {
                if(piece.getAttribute('color')=='black'){
                    if (accepts(piece,C1,piece.parentElement)||accepts(piece,D1,piece.parentElement)){
                        tmp=false;

                    }

                }
                
            });
            
            
       

    }
}
    return tmp



}



//my engine 
function bestMove(){
    //finding all the moves basically if its not check
   var moves =new Array() ;
   var side=play;
    pieces.forEach(piece=>{
       
        if(piece.getAttribute('color')==play){
            squares.forEach(square=>{
                row=square.getAttribute('row')
                file=square.getAttribute('file')
               
                
                if(accepts(piece,square,piece.parentElement)){

                    //get evry possible move and evaluate them materialistically on certain depth
                    //initialization
                    //piece /row of target/row of target/depth/evaluation
                    moves.push[piece,row,file,0,0]

                }                

            })
        }

    }) 
    console.log(moves)
  
    

}

function PieceValue(piece){
    switch (piece.getAttribute('piece')){
        case 'pawn':
            return 1
        case 'knight':
            return 3
        case 'bishop':
            return 3
        case'rook':
            return 5
        case 'queen':
            return 9
    }

}
function getSquare(row,file){
    squares.forEach(square=>{
        if(square.getAttribute('row')==row &&(square.getAttribute('file')==file )){
            return square
        }
    })
}

  




