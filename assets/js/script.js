let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2')
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3')

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

function comecarEtapa () {
  //define a posição da etapa em relação ao js
  let etapa = etapas[etapaAtual];
  //define que os campos de quadrados iniciem ocultos, e depois vai atribuindo a classe pisca
  let numeroHtml = '';
  numero = '';
  votoBranco = false;
  for(let i=0; i<etapa.numeros;i++) {
    if(i===0) {
      numeroHtml += '<div class="numero pisca"></div>'
    } else {
      numeroHtml += '<div class="numero"></div>'
    }
  }
  //define os campos abaixo praticamente ocultos, para só aparecer com a interação correta
  seuVotoPara.style.display = 'none';
  cargo.innerHTML = etapa.titulo;
  descricao.innerHTML = '';
  aviso.style.display = 'none';
  lateral.innerHTML = '';
  numeros.innerHTML = numeroHtml;
}

//funcao que será chamada nos cliques para atualizar a tela
function atualizaInterface () {
  //define a posição da etapa em relação ao js
  let etapa = etapas[etapaAtual];
  //procura o candidato de acordo com o numero selecionado
  let candidato = etapa.candidatos.filter ((item) => {
    if(item.numero === numero) {
      return true;
    } else {
      return false;
    }
  });
  //se existir o candidato, vai aparecer os componentes na tela 
  if (candidato.length > 0) {
    candidato = candidato[0];
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    descricao.innerHTML = `Nome: ${candidato.nome} <br>Partido: ${candidato.partido}`;

    let fotosHtml = '';
    for(let i in candidato.fotos) {
      if(candidato.fotos[i].small) {
        fotosHtml += `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
      } else {
        fotosHtml += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
      }
    }
    lateral.innerHTML = fotosHtml;
  } else {
    //se nao, informa que é voto nulo
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    descricao.innerHTML = `<div class="aviso--grande pisca">VOTO NULO</div>`;
  }
}

//funcao de clicar
function clicou (n) {
  //define o elemento das caixas e atribui o pisca
  let elNumero = document.querySelector('.numero.pisca');
  //se o numero for diferente de nulo, vai preencher na tela o numero informado no clique, e vai adicionar na variavel numero e remover o estilo pisca
  if (elNumero !== null) {
    elNumero.innerHTML = n;
    numero = `${numero}${n}`;
    elNumero.classList.remove('pisca');
    //se o proximo elemento ao lado do anterior for diferente de nulo, aplica o estilo pisca
    if(elNumero.nextElementSibling !== null) {
      elNumero.nextElementSibling.classList.add('pisca');
    } else {
      atualizaInterface();
    }
  }
}
function branco () {
  //verifca se nao tem nenhum numero ja digitado. Se nao tiver, ele preenche as informações com voto em branco
  if(numero === '') {
    votoBranco = true;
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = `<div class="aviso--grande pisca">VOTO EM BRANCO</div>`;
  }else {
    //se nao informa que possui voto em andamento, sendo necessario apertar botao de corrigir
    alert("Para votar em BRANCO, não pode ser preenchido nenhum número!")
  }
}
function corrige () {
  //reinicia a interface e limpa os campos
  comecarEtapa();
}
function confirma () {
  let etapa = etapas[etapaAtual];
  let votoConfirmado = false;
  if (votoBranco === true) {
    votoConfirmado = true;
    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: 'branco'
    });
  } else if(numero.length=== etapa.numeros) {
    votoConfirmado = true;
    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: numero
    });
  }
  if (votoConfirmado) {
    etapaAtual++;
    if(etapas[etapaAtual] !== undefined) {
      comecarEtapa();
    } else {
      document.querySelector('.tela').innerHTML = `<div class="aviso--gigante pisca">FIM</div>`;
      console.log(votos);
    }
  }
}

comecarEtapa ();