## Comentários a cerca do aplicativo

* Optei por usar imagens, que estão localizadas na pasta src/assets/ a fim de não utilizar o plugin react-native-vector-icos, visto que usaria poucas imagens.
* Modifiquei o arquivo info.plist na pasta ios/desafioGlobo/ a fim de liberar/permitir requisições fora do dominio localhost.
* Optei por usar o plugin ModalBox por ser de simples e de fácil uso. 

## Reflexões sobre o aplicativo e sugestões de melhoria

* Na minha opinião, não vejo necessidade da Api retornar a elemento "data_hoje" na url principal, visto que todos os jogos já são do dia tual.


## Todo:
1. Verificar se o campo do placar existir, se não existir === 0x0
2. Navigation Logo no Android
3. Configurar Redux-Offilne
4. Fazer Menu Configurações AsyncStorage
5. Componetizar Modal e Ajustar tamanho para Android
6. Fazer Testes