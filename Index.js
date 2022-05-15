const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

const colisaodomapa = []



for(let i = 0; i < blocoblock.length; i += 70){

    colisaodomapa.push((blocoblock.slice(i, 70 + i)))

}
//boundary
class Fronteira{
    static width = 48;
    static height = 48;
    constructor({posicao}){
        this.posicao = posicao
        this.width = 48
        this.height = 48
    }

    Desenhar(){
        ctx.fillStyle = 'rgba(255,0,0,0.0)'
        ctx.fillRect(this.posicao.x, this.posicao.y, this.width, this.height)
    }

}
// boundaries
const limites = []
const offset ={
    x:-1450,
    y:-450    
}

// row para cada "Fileira"
colisaodomapa.forEach((row, i) =>{
    row.forEach((symbol, j) =>{
        if(symbol === 336)
        limites.push(new Fronteira({posicao:{
            x: j * Fronteira.width + offset.x,
            y: i * Fronteira.height + offset.y
        }
        }))
    })
})

console.log(limites)
// ctx.fillStyle = 'white'
//  ctx.fillRect( 0, 0, canvas.width, canvas.height)

// Image com I MAIUSCULO
const Mapa = new Image()
const playerimage = new Image()
    
Mapa.src = './img/map400zoon.png'
playerimage.src = './Personagem/playerDown.png'

class Sprite{
    constructor({posicao,velocidade, Mapa, frames ={max: 1 } }) {
        this.posicao = posicao
        this.Mapa = Mapa
        this.frames = frames
        this.Mapa.onload = () =>{
            this.width = this.Mapa.width / this.frames.max
            this.height = this.Mapa.height
            console.log(this.width);
            console.log(this.height);
        }
        
    }

    Desenhar(){
        ctx.drawImage(
            this.Mapa,
            0,
            0,
            this.Mapa.width / this.frames.max,
            this.Mapa.height,
            this.posicao.x,
            this.posicao.y,
            this.Mapa.width / this.frames.max,
            this.Mapa.height
            
            )
    }
}

const player = new Sprite({
    posicao:{
                    // tamanho da sprite 192x68
        x:canvas.width / 2 - 192 / 4 / 2,
        y:canvas.height / 2 - 68 / 2,
    },    
    Mapa: playerimage,
    frames: {
        max: 4
    }
})


const background = new Sprite({posicao:{
    x: offset.x,
    y: offset.y // const offset com os valores padra de imagem posicao
},
Mapa: Mapa
})

const Tecla = {
    w:{
        pressionado: false
    },
    a:{
        pressionado: false
    },
    s:{
        pressionado: false
    },
    d:{
        pressionado: false
    }
}
const testelimite = new Fronteira({
    posicao:{
        x:400,
        y:400
    }
})



const itensmoveis = [background, ...limites]

function BlocoDeColisao({Bloco1,bloco2}){
    return(
    Bloco1.posicao.x + Bloco1.width >= bloco2.posicao.x &&
    Bloco1.posicao.x <= bloco2.posicao.x + bloco2.width &&
    Bloco1.posicao.y <= bloco2.posicao.y + bloco2.height &&
    Bloco1.posicao.y + Bloco1.height >= bloco2.posicao.y
    )
}

function animacao(){
    window.requestAnimationFrame(animacao)
    background.Desenhar()

    limites.forEach((fronteira) => {
        fronteira.Desenhar()

       
    })
 
    player.Desenhar()
    let moving = true   
     if(Tecla.w.pressionado && ultimaTecla === 'w'){
         for(let i = 0; i < limites.length; i++) {
             const fronteira = limites[i]
             if(
                BlocoDeColisao({
                Bloco1:player,
                bloco2:{
                    ...fronteira, 
                    posicao: {
                    x: fronteira.posicao.x,
                    y: fronteira.posicao.y + 3
                }}
            })
            ){
                console.log("colisao")
                moving = false
                break
            }
         }
         if(moving){
            itensmoveis.forEach((movel) =>{
                movel.posicao.y +=3
            })
         }
         
    }
    else if(Tecla.a.pressionado && ultimaTecla === 'a'){
        for(let i = 0; i < limites.length; i++) {
            const fronteira = limites[i]
            if(
               BlocoDeColisao({
               Bloco1:player,
               bloco2:{
                   ...fronteira, 
                   posicao: {
                   x: fronteira.posicao.x + 3,
                   y: fronteira.posicao.y 
               }}
           })
           ){
               console.log("colisao")
               moving = false
               break
           }
        }
        if(moving){
            itensmoveis.forEach((movel) =>{
                movel.posicao.x +=3
            })
        }
         
    }
    else if(Tecla.s.pressionado && ultimaTecla === 's'){
        for(let i = 0; i < limites.length; i++) {
            const fronteira = limites[i]
            if(
               BlocoDeColisao({
               Bloco1:player,
               bloco2:{
                   ...fronteira, 
                   posicao: {
                   x: fronteira.posicao.x,
                   y: fronteira.posicao.y - 3
               }}
           })
           ){
               console.log("colisao")
               moving = false
               break
           }
        }
        if(moving){
            itensmoveis.forEach((movel) =>{
                movel.posicao.y -=3
            })
        }
         
    }
    else if(Tecla.d.pressionado && ultimaTecla === 'd'){
        for(let i = 0; i < limites.length; i++) {
            const fronteira = limites[i]
            if(
               BlocoDeColisao({
               Bloco1:player,
               bloco2:{
                   ...fronteira, 
                   posicao: {
                   x: fronteira.posicao.x - 3,
                   y: fronteira.posicao.y 
               }}
           })
           ){
               console.log("colisao")
               moving = false
               break
           }
        }
        if(moving){
            itensmoveis.forEach((movel) =>{
                movel.posicao.x -=3
            })
        }
         
    }
}

animacao()

let ultimaTecla = '';

window.addEventListener('keydown', (e) => {
    
    switch(e.key){
        case 'w': 
        Tecla.w.pressionado = true
        ultimaTecla = 'w';
        break;

        case 'a':
            Tecla.a.pressionado = true
            ultimaTecla = 'a';
        break;
        case 's':
            Tecla.s.pressionado = true
            ultimaTecla = 's';
        break;
        case 'd':
            Tecla.d.pressionado = true
            ultimaTecla = 'd';
        break;
                
    }
   
})

window.addEventListener('keyup', (e) => {
    
    switch(e.key){
        case 'w': 
        Tecla.w.pressionado = false
        break;

        case 'a':
            Tecla.a.pressionado = false
        break;
        case 's':
            Tecla.s.pressionado = false
        break;
        case 'd':
            Tecla.d.pressionado = false
        break;
                

    }
    
})

console.log(blocoblock)



