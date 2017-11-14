## Comentários a cerca do aplicativo

* Optei por usar imagens, que estão localizadas na pasta src/assets/ a fim de não utilizar o plugin react-native-vector-icos, visto que usaria poucas imagens.
* Modifiquei o arquivo info.plist na pasta ios/desafioGlobo/ a fim de liberar/permitir requisições fora do dominio localhost.
* Optei por usar o plugin ModalBox por ser de simples e de fácil uso. 
* Optei por usar o Redux-Offline ao invés do Redux-Persist pelo motivo dele abranger mais coisas, e dar mais informações e configurações.
* Ao setar para checked a config "Somente com Wi-fi disponivel?", a ideia original era, se o usuário estivesse sem o wifi, aparecesse um alerta obrigando-o a fechar o aplicativo, porém o BackHandler não funciona no iOS, eu iria ter que criar um método no nativo, porém achei que não iria se encaixar, por isso criei um banner indicativo.

## Reflexões sobre o aplicativo e sugestões de melhoria

* Na minha opinião, não vejo necessidade da Api retornar a elemento "data_hoje" na url principal, visto que todos os jogos já são do dia tual.


## Todo:
1. Terminar Testes