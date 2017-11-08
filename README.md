# Marcus Vinicius
**Desafio React Native**

-------------------------------------------------------------------------------
## Considerações Gerais
Você deverá usar este repositório como o repo principal do projeto, i.e., todos os seus commits devem estar registrados aqui, pois queremos ver como você trabalha.

**Registre tudo**: testes que forem executados, ideias que gostaria de implementar se tivesse mais tempo (explique como você as resolveria, se houvesse tempo), decisões que forem tomadas e seus porquês, arquiteturas que forem testadas e os motivos de terem sido modificadas ou abandonadas. Crie um arquivo COMMENTS.md ou HISTORY.md no repositório para registrar essas reflexões e decisões.

É importante manter um histórico de commits consistente, não se sinta tentando a commitar e pushar tudo somente no último dia. Isso fere um dos princípios do desafio, que é avaliar a forma de trabalho.

-------------------------------------------------------------------------------
## O Desafio

O desafio que você irá desenvolver é o aplicativo "Tempo Real". Com ele, podemos acompanhar quais serão os jogos do dia de vários campeonatos e podemos ver, após o início de algum dos jogos os lances conforme eles vão acontecendo.

O aplicativo deverá funcionar tanto em Android quanto em iOS, nas versões em *portrait* e *landscape*.

-------------------------------------------------------------------------------
## Regras de negócio
1. O aplicativo deve mostrar em uma tela inicial os jogos do dia, incluindo os placares parciais quando disponíveis, o nome da campeonato e o nome da rodada do jogo. O json é acessível através da URL: http://globoesporte.globo.com/temporeal/futebol/central.json
1. Para jogos iniciados, o aplicativo deverá exibir uma segunda tela com os detalhes do jogo.  
   Para jogos que já iniciaram ou terminaram, a url retornada no json do item anterior, deverá ser combinada com outras informações para a obtenção de dados adicionais.  
   Um json que possui algumas informações adicionais é obtido adicionando *'/transmissao\_id.json'* ao final da url, onde *"transmissao\_id"* é encontrado no json anterior para cada jogo. Esse json deverá ser consumido apenas uma vez quando for necessário exibir os detalhes de uma jogo solicitado pelo usuário.  
   O json que contém os dados dos lances em tempo real é obtido adicionando *'/mensagens.json'* ao final da url.
1. Nos detalhes de um jogo, as informações mínimas a serem exibidas são lances de gol, cartão e substituição. Outros tipos são desejáveis e são um diferencial para a avaliação do desafio
1. O usuário deverá ter a opção de retornar a listagem inicial, clicando em botão para isso, ou utilizando o botão de back nativo (Android)
1. A tela principal deverá oferecer formas do usuário filtrar ou reordenar os jogos
1. Nas telas que fizerem sentido, deverá ser possível fazer o "pull to refresh" para atualizar as informações exibidas

-------------------------------------------------------------------------------
## Requisito técnicos
1. Seu código deve conter testes automatizados funcionais e de interface para os principais pontos do aplicativo.
1. Esperamos que o aplicativo faça o menor número de requisições possíveis para a API do Globoesporte (não deve fazer requisições no caso do usuário apenas fazer um filtro).
1. Se a API ficar indisponível ou o celular do usuário fique sem internet, esperamos que o aplicativo continue funcionando e permita pegar a lista de jogos novamente.

-------------------------------------------------------------------------------
## Avaliação da solução
1. As funcionalidades listadas anteriormente devem estar presentes na sua solução.
1. Seu código será observado por uma equipe de desenvolvedores que avaliarão a simplicidade e clareza da solução, a arquitetura, documentação, estilo de código, testes automatizados, o design da interface e a implementação do código.

-------------------------------------------------------------------------------
## Dicas
* Use ferramentas e bibliotecas open source, mas documente as decisões e os porquês
* Automatize o que for possível
* Em caso de dúvidas, pergunte
* Essa é uma API real em produção, o resultado do json da central muda diariamente, se planeje de acordo. Normalmente quarta, sábado e domingo são os dias que possuem mais jogos.

-------------------------------------------------------------------------------
## Diferenciais
Esses items são incrementos que podem ser desenvolvidos, caso você deseje adicionar um pouco mais de "sabor" ao seu desafio. Lembre-se que esses são diferencias, mas que não têm um grande impacto, caso os items obrigatórios não estejam presentes.
* Tela de configurações onde o usuário pode definir opções como utilizar internet somente com wi-fi disponível ou outras opções
* Polling dos detalhes de um jogo que esteja atualmente em curso, para manter a tela atualizada sem a necessidade de fazer pull-to-refresh manualmente
* Layout diferenciado para visualização em portrait e landscape
