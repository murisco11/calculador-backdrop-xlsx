function clicou() {
  const inputLargura = document.querySelector('#inputLargura').value
  const inputAltura = document.querySelector('#inputAltura').value
  const inputEstrutura = document.querySelector('#inputEstrutura').value || 1
  const htmlResultado = document.querySelector('#resultado')
  const selectElement = document.querySelector('#select').value.toUpperCase()
  let altura = Number(inputAltura * 100)
  let largura = Number(inputLargura * 100)

  if (isNaN(inputAltura) || isNaN(inputLargura) || inputAltura <= 0 || inputLargura <= 0) {
    alert('Por favor, insira valores válidos para altura e largura.')
    return
  }

  if (selectElement === 'BACKDROP') {
    altura -= 30
    largura -= 30
  }

  const tamanhoMetro = [400, 300, 200, 100]
  const tamanhoCm = [70, 50, 45, 40, 38, 36, 25, 20, 15]

  function calculo(tamanho) {
    let resultado = []
    let comprimentoRestante = tamanho
    while (comprimentoRestante > 0) {
      if (comprimentoRestante >= 100) {
        for (let i = 0; i < tamanhoMetro.length; i++) {
          if (tamanhoMetro[i] <= comprimentoRestante) {
            resultado.push(tamanhoMetro[i])
            comprimentoRestante -= tamanhoMetro[i]
            break
          }
        }
      }
      if (comprimentoRestante < 100) {
        comprimentoRestante = Math.round(comprimentoRestante)
        if (comprimentoRestante === 98) {
          resultado.push(tamanhoCm[4], tamanhoCm[3], tamanhoCm[7]); comprimentoRestante -= 98
        } else if (comprimentoRestante === 96) {
          resultado.push(tamanhoCm[5], tamanhoCm[3], tamanhoCm[7]); comprimentoRestante -= 96
        } else if (comprimentoRestante === 88) {
          resultado.push(tamanhoCm[4], tamanhoCm[1]); comprimentoRestante -= 88
        } else if (comprimentoRestante === 80) {
          resultado.push(tamanhoCm[3], tamanhoCm[3]); comprimentoRestante -= 80
        } else if (comprimentoRestante === 86) {
          resultado.push(tamanhoCm[5], tamanhoCm[1]); comprimentoRestante -= 86
        } else if (comprimentoRestante === 78) {
          resultado.push(tamanhoCm[4], tamanhoCm[3]); comprimentoRestante -= 78
        } else if (comprimentoRestante === 76) {
          resultado.push(tamanhoCm[5], tamanhoCm[3]); comprimentoRestante -= 76
        } else if (comprimentoRestante === 56) {
          resultado.push(tamanhoCm[5], tamanhoCm[7]); comprimentoRestante -= 56
        } else if (comprimentoRestante === 58) {
          resultado.push(tamanhoCm[4], tamanhoCm[7]); comprimentoRestante -= 58
        } else if (comprimentoRestante === 68) {
          resultado.push(tamanhoCm[4], tamanhoCm[8], tamanhoCm[8]); comprimentoRestante -= 68
        } else if (comprimentoRestante === 66) {
          resultado.push(tamanhoCm[5], tamanhoCm[8], tamanhoCm[8]); comprimentoRestante -= 66
        } else if (comprimentoRestante === 75) {
          resultado.push(tamanhoCm[1], tamanhoCm[6]); comprimentoRestante -= 75
        } else if (comprimentoRestante === 60) {
          resultado.push(tamanhoCm[3], tamanhoCm[7]); comprimentoRestante -= 60
        } else if (comprimentoRestante === 65) {
          resultado.push(tamanhoCm[1], tamanhoCm[8]); comprimentoRestante -= 65
        } else if (comprimentoRestante === 30) {
          resultado.push(tamanhoCm[8], tamanhoCm[8]); comprimentoRestante -= 30 
        } else if (comprimentoRestante === 55) {
          resultado.push(tamanhoCm[3], tamanhoCm[8]); comprimentoRestante -= 55
        } else if (comprimentoRestante === 35) {
          resultado.push(tamanhoCm[8], tamanhoCm[7]); comprimentoRestante -= 35
        } else {
          while (comprimentoRestante !== 0) {
            for (let i = 0; i < tamanhoCm.length; i++) {
              if (tamanhoCm[i] <= comprimentoRestante) {
                resultado.push(tamanhoCm[i])
                comprimentoRestante -= tamanhoCm[i]
                break
              }
            }
          }
        }
      }
    }
    return resultado
  }

  function agruparTreliças(treliças) {
    let contagem = {}
    treliças.forEach(treliça => {
      treliça /= 100
      if (contagem[treliça]) {
        contagem[treliça]++
      } else {
        contagem[treliça] = 1
      }
    })
    return contagem
  }

  const resultadoAltura = calculo(altura)
  const resultadoLargura = calculo(largura)

  const contagemAltura = agruparTreliças(resultadoAltura)
  const contagemLargura = agruparTreliças(resultadoLargura)

  function formatarResultado(contagem) {
    return Object.keys(contagem).map(tamanho => {
      let metro = 'metros'
      if (contagem[tamanho] === 1) {
        metro = 'metro'
      } else {
        metro ='metros'
      }
      return `${contagem[tamanho] * 2 * inputEstrutura} de ${tamanho} ${metro}, `
 }).join('<br> ')
  }

  htmlResultado.innerHTML = `Tipo: <b>${selectElement}</b><br><br> Cubos: <b>${4 * inputEstrutura}</b><br><br>Altura (considerando 2 lados): <br><b>${formatarResultado(contagemAltura)}</b><br><br>Largura (considerando 2 lados): <br><b>${formatarResultado(contagemLargura)}</b>`
  historico(selectElement, 4 * inputEstrutura, formatarResultado(contagemAltura), formatarResultado(contagemLargura))

  function historico(tipo, cubos, alturaResultado, larguraResultado) {
    const lista = document.querySelector('.lista')
    const div = document.createElement('div')
    div.innerHTML = `
    Tamanhos: <b>${altura / 100}x${largura / 100}</b><br><br>
    Tipo: <b>${tipo}</b><br><br>
    Cubos: <b>${cubos}</b><br><br>
    Altura (considerando 2 lados): <br><b>${alturaResultado}</b><br><br>
    Largura (considerando 2 lados): <br><b>${larguraResultado}</b>`
    div.classList.add('item-historico')
    lista.appendChild(div)
  }
}

function limparHistorico() {
  const lista = document.querySelectorAll('.item-historico')
  lista.forEach(e => {
    e.remove()
  })
}

function baixarHistoricoExcel() {
  const lista = document.querySelector('.lista')
  const data = []

  lista.querySelectorAll('.item-historico').forEach(item => {
    const tamanho = item.querySelector('b:nth-of-type(1)').innerText
    const tipo = item.querySelector('b:nth-of-type(2)').innerText
    const cubos = item.querySelector('b:nth-of-type(3)').innerText
    const altura = item.querySelector('b:nth-of-type(4)').innerText.replace(/<br>/g, '\n')
    const largura = item.querySelector('b:nth-of-type(5)').innerText.replace(/<br>/g, '\n')

    data.push({ Tamanho: tamanho, Tipo: tipo, Cubos: cubos, Altura: altura, Largura: largura })
  })

  const planilha = XLSX.utils.json_to_sheet(data)
  const pastaTrabalho = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(pastaTrabalho, planilha, 'Histórico')

  XLSX.writeFile(pastaTrabalho, 'historico.xlsx')
}