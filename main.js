enchant();

window.onload = function() {
    game = new Game(320, 320);
    game.fps = 24;
    game.preload(['chara1.gif','icon0.gif','espaço1.png']);

    

    game.onload = function() {
        bear = new Sprite(32, 32);
        bear.x = 0;
        bear.y = 240;
        bear.width = 32;
        bear.height = 32;

        bear.image = game.assets['chara1.gif'];
        bear.frame = 0;


        game.rootScene.addChild(bear);

        // Função para mudar o frame do sprite
        function changeFrame() {
        // Alterando o frame do sprite para o próximo frame
        bear.frame++;

        // Verificando se o frame atual ultrapassou o número total de frames
        // Se sim, voltamos ao primeiro frame
        if (bear.frame >= 7) {
        bear.frame = 5;
    }
}

// Chamando a função para mudar o frame a cada segundo (1000 milissegundos)
setInterval(changeFrame, 50);



        background = new Sprite(320, 320);
        background.x = background.y = 0;
        background.image = game.assets['espaço1.png']

        game.rootScene.addEventListener('touchstart', function(e){
            bear.x = e.localX
        });

        game.rootScene.addEventListener('touchmove', function(e){
            bear.x = e.localX
        });

        game.score = 0;

        game.rootScene.addEventListener('enterframe',function(){
            if(game.frame % 6 == 0){
                addBanana();
            }
            if(game.rootScene.age > game.fps * 20){
                game.end(game.score, game.score + " bananas capturadas!");
            }
        });

        game.rootScene.addChild(background);
        game.rootScene.addChild(bear);

    }
    game.start();
}

function addBanana(pos){
    var banana = new Sprite(16, 16);
    banana.x = rand(320);
    banana.y = 0;
    banana.image = game.assets['icon0.gif'];

    banana.frame = 24;

    banana.addEventListener('enterframe', function(e) {
        if(this.intersect(bear)){
            game.rootScene.removeChild(this);
            game.score ++;
        }else{
            this.y += 3;
        }
    });
    game.rootScene.addChild(banana);
}

function rand(num){
    return Math.floor(Math.random() * num);
}
