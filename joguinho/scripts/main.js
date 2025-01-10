var player = (Math.random() < 0.5 ? false : true);  // randomiza o primeiro player
var tabela;
var jogo = true;
var jogadas = 0;

class Campo {
    // Propriedades
    conteudo;
    
    // Métodos
    constructor(){
        this.conteudo = ' ';
    }
    preenche(id){
        var cel = document.getElementById(id);
        this.conteudo = (player ? "X":"O");
        cel.textContent = this.conteudo;
        player = !player;
    }
    vazio(){
        return (this.conteudo == ' ');
    }
}

// Cria a matriz 
tabela = Array(3);
for(let i=0; i<3; i++){
    tabela[i] = Array(3);
}

// Intancia os objetos
for(let i=0; i<3; i++){
    for(let j=0; j<3; j++){
        tabela[i][j] = new Campo();
    }
}

// Função para verificar se algum jogador ganhou.
function verificaVitoria(){
    for(let i=0; i<2; i++){
        const simbolo = (i == 0? "X" : "O");
        
        // Verifica linhas
        for(let i=0; i<3; i++){
            let cont = 0;
            for(let j=0; j<3; j++){
                if((tabela[i][j]).conteudo == simbolo) cont++;
                else break; 
            }
            if (cont == 3) return simbolo;
        }
        
        // Verifica colunas
        for(let i=0; i<3; i++){
            let cont = 0;
            for(let j=0; j<3; j++){
                if((tabela[j][i]).conteudo == simbolo) cont++;
                else break; 
            }
            if (cont == 3) return simbolo;
        }
        
        // Verifica diagonais
        var cont = 0;
        for(let i=0; i<3; i++){
            if((tabela[i][i]).conteudo == simbolo) cont++;
            else break;
        }
        if(cont == 3) return simbolo;
        else cont = 0;

        for(let i=0; i<3; i++){
            if((tabela[2-i][i]).conteudo == simbolo) cont++;
        }
        if(cont == 3) return simbolo;
    }
    return ' ';
}

// Função para verificar se deu velha.
function verificaVelha(){
    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            if((tabela[i][j]).vazio()) return false;
        }
    }
    return true;
}

function telaVencedor(vencedor){
    var div = document.getElementById('resultado');
    div.textContent = ('Vencedor: ' + vencedor);
}

function telaVelha(){
    var div = document.getElementById('resultado');
    div.textContent = ('Deu velha!');
}

function seleciona(id){
    if(!jogo) return;

    jogadas++;
    const x = id[1];
    const y = id[2];
    if((tabela[x][y]).vazio()){
        (tabela[x][y]).preenche(id);
        if(verificaVitoria() != ' '){
            telaVencedor(verificaVitoria());
            jogo = false;
        }
        else if((jogadas == 9) && verificaVelha()){
            telaVelha();
            jogo = false;
        }
    }
}

function reset(){
    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            // Limpa a matriz
            (tabela[i][j]).conteudo = ' ';  

            // Apaga o texto dos quadrados
            const id = "c" + i + j;
            document.getElementById(id).textContent = '';
        }
    }
    // Apaga o texto do resultado
    document.getElementById('resultado').textContent = '';
    jogo = true;
    jogadas = 0;
    player = (Math.random() < 0.5 ? false : true);
}