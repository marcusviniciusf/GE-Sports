import _ from 'lodash';

export const verifyNetToRun = () => {
  
}

export const filterJogos = (jogos, filters) => {
  const pValue = filters[1].pickerValue;
  const sValue = filters[2].switchValue;
  let jgComFiltro = [];
  if (jogos) {
    if (sValue === true && pValue === 'all') {
      return (jgComFiltro = filtraPorHora(jogos, 'desc'));
    }
    if (sValue === true && pValue !== 'all') {
      _.map(jogos, jg => { if (pValue === jg.nome_campeonato) { jgComFiltro.push(jg); }});
      return jgComFiltro = filtraPorHora(jgComFiltro, 'desc');
    } 
    if (sValue === false) {
      _.map(jogos, jg => { 
        if (pValue === jg.nome_campeonato) { jgComFiltro.push(jg); }
        if (pValue === 'all') { jgComFiltro = jogos; }
      });
      return filtraPorHora(jgComFiltro, 'asc');
    }
  }
};

function filtraPorHora(array, flag) {
  if (flag === 'asc') {
    return array.sort((a, b) => {
      if (a.hora > b.hora) {
        return -1;
      }
      if (a.hora < b.hora) {
        return 1;
      }
      return 0;
    });
  }
  return array.sort((a, b) => {
    if (a.hora > b.hora) {
      return 1;
    }
    if (a.hora < b.hora) {
      return -1;
    }
    return 0;
  });
}
