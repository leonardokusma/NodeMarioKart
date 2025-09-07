 import PromptSync from "prompt-sync";

 const prompt = PromptSync();
 
 const player1 = {
    NOME: "Mario",
    VELOCIDADE:4,
    MANOBRABILIDADE:3,
    PODER:3,
    PONTOS:0,
 };

  const player2 = {
    NOME: "Luidi",
    VELOCIDADE:4,
    MANOBRABILIDADE:3,
    PODER:3,
    PONTOS:0,
 };

   const player3 = {
    NOME: "Ṕeach",
    VELOCIDADE:3,
    MANOBRABILIDADE:4,
    PODER:2,
    PONTOS:0,
 };

   const player4 = {
    NOME: "Yosh",
    VELOCIDADE:2,
    MANOBRABILIDADE:4,
    PODER:3,
    PONTOS:0,
 };

    const player5 = {
    NOME: "Browser",
    VELOCIDADE:5,
    MANOBRABILIDADE:2,
    PODER:5,
    PONTOS:0,
 };

    const player6 = {
    NOME: "Donkey KOng",
    VELOCIDADE:2,
    MANOBRABILIDADE:2,
    PODER:5,
    PONTOS:0,
 };
const players = [player1, player2,player3,player4,player5,player6];


 async function rollDIce(){
   return Math.floor( Math.random() * 6) + 1;

 };

 async function logRoll(characterName, block, diceResult, attribute){
    console.log(`${characterName} 📌 Rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);

}

async function getRandomBlock(){
    let random = Math.random();
    let result 
    switch(true){
        case random < 0.33 :
            result = "RETA"
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
    }
    return result

}



 async function playRaceEngine(character1,character2){

    for(let i = 1; i<= 5; i++){
        
        // sortear blocos
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

            
    // rolar os dados
        let diceResult1 = await rollDIce();
        let diceResult2  = await rollDIce();

        // teste skill
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if(block === "RETA"){
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character1.VELOCIDADE;

            await logRoll(character1.NOME,"VELOCIDADE",diceResult1,character1.VELOCIDADE);
            await logRoll(character2.NOME,"VELOCIDADE",diceResult2,character2.VELOCIDADE);
        }

        if(block === "CURVA"){
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character1.MANOBRABILIDADE;

            await logRoll(character1.NOME,"Manobrabilidade",diceResult1,character1.MANOBRABILIDADE);
            await logRoll(character2.NOME,"Manobrabilidade",diceResult2,character2.MANOBRABILIDADE);
        }

        if(block === "CONFRONTO"){
            var powerResult1 = diceResult1 + character1.PODER;
            var powerResult2 = diceResult2 + character1.PODER;

            console.log(`🥊 ${character1.NOME} confrontou com ${character2.NOME} 🥊`)
            await logRoll(character1.NOME,"poder",diceResult1,character1.PODER);
            await logRoll(character2.NOME,"poder",diceResult2,character2.PODER);

            if(powerResult1 > powerResult2 && character2.PONTOS >0 ){
                console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu um ponto 🍅🍅🍅`)
                character2.PONTOS--;
            }

            if(powerResult2 > powerResult1 && character1.PONTOS >0 ){
                console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu um ponto 🍅🍅🍅`)
                character1.PONTOS--;
            }
            //ternário
            //character2.PONTOS -= powerResult1 > powerResult2 && character2.PONTOS >0 ? 1 : 0;
            //character1.PONTOS -= powerResult2 > powerResult1 && character1.PONTOS >0 ? 1 : 0;

            console.log(powerResult1 === powerResult2
                ?"Confronto empatado! Nenhum ponto marcado."
                : ""
            );

        }
        // verificando o vencedor
        if(totalTestSkill1 > totalTestSkill2){
            console.log(`${character1.NOME} marcou um ponto!!`);
            character1.PONTOS ++;
        }else if (totalTestSkill2 > totalTestSkill1){
            console.log(`${character2.NOME} marcou um ponto!!`);
            character2.PONTOS ++;
        }

        console.log("\n_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-")



    }


}

async function listarPlayers(){
    for(let j = 0; j<5; j++){
        console.log(`- Player ${j + 1}: ${players[j].NOME}`);
    }

}

async function checkWinner(character1,character2){
    console.log("RESULTADO KART:");
    console.log(`${character1.NOME}:${character1.PONTOS}`);
    console.log(`${character2.NOME}:${character2.PONTOS}`);
    
    if(character1.PONTOS >character2.PONTOS){
        console.log(`\n ${character1.NOME} venceu a corrida! Parabéns!🏆`);
    }else if(character2.PONTOS >character1.PONTOS){
        console.log(`\n ${character2.NOME} venceu a corrida! Parabéns!🏆`)
    }else{
        console.log(`\n A corrida terminou em Empate 🏆`);
    }
}

 (async function main(){
    console.log("SELECIONE JOGADORES!\n");
    await listarPlayers();
    let indexPlayer1 = Number(prompt("Digite o Numero do primerio jogador:"))-1;
    let indexPlayer2 = Number(prompt("Digite o Numero do segundo jogador:"))-1;
    console.log(`\n🏁 🧨 Corrida Entre ${players[indexPlayer1].NOME} e ${players[indexPlayer2].NOME} ... \n`);
    await playRaceEngine(players[indexPlayer1],players[indexPlayer2]);
    await checkWinner(players[indexPlayer1],players[indexPlayer2]);
 })();

