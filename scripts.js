// Selecionando todas as celulas
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.querySelector('[data-board')
const winningMessageTextElement = document.querySelector(
  '[data-winning-message-text]'
)
const winningMessage = document.querySelector('[data-winning-message]')
const restartButton = document.querySelector('[data-restart-button]')

// variavel que guarda se é a vez do circulo jogar
let isCircleTurn

// Combinações de vitorias
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

// função para iniciar o jogo
const startGame = () => {
  isCircleTurn = false

  // adicionando em cada celula um evento que vai ser o click, fazendo com que aconteça somente 1 vez executando a função handleClick
  for (const cell of cellElements) {
    cell.classList.remove('circle')
    cell.classList.remove('x')
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  }

  setBoardHoverClass()
  winningMessage.classList.remove('show-winning-message')
}

// Função para encerrar o jogo
const endGame = isDraw => {
  if (isDraw) {
    winningMessageTextElement.innerText = 'Empate!'
  } else {
    winningMessageTextElement.innerText = isCircleTurn
      ? 'Circulo Venceu!'
      : 'X Venceu!'
  }

  winningMessage.classList.add('show-winning-message')
}

// função que verifica a vitória
const checkForWin = currentPlayer => {
  return winningCombinations.some(combination => {
    // pega o array de combinações e joga na variavel combinations
    return combination.every(index => {
      // verifica todos os arrays dentro da variavel combionations
      return cellElements[index].classList.contains(currentPlayer) // verifica se o cellElements contem o currentPlayer em algum index da combionation, se sim, ele passa para o proximo index
    })
  })
}

// função que verifica por empate
const checkForDraw = () => {
  return [...cellElements].every(cell => {
    //pega todos os elementos e joga dentro da variavel cell
    return cell.classList.contains('x') || cell.classList.contains('circle') // cell verifica todas as celular tem a classe x ou a classe circle, significa que está tudo preenchido, ou seja, é empate
  })
}

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd)
}

// função para verificar quem está jogando
const setBoardHoverClass = () => {
  // removendo as informações adicionadas na classe board do html, para não armazenar varias informações
  board.classList.remove('circle')
  board.classList.remove('x')

  if (isCircleTurn) {
    board.classList.add('circle')
  } else {
    board.classList.add('x')
  }
}

// Mudando o simbolo
const swapTurns = () => {
  isCircleTurn = !isCircleTurn

  setBoardHoverClass()
}

const handleClick = e => {
  // colocar a marca (X ou Circulo)
  const cell = e.target
  const classToAdd = isCircleTurn ? 'circle' : 'x' // verificação para ver de quem é a vez de jogar

  placeMark(cell, classToAdd)

  // Verificar por vitória
  const isWin = checkForWin(classToAdd) // classToAdd é para saber quem está jogando

  // Verificar por empate
  const isDraw = checkForDraw()
  if (isWin) {
    endGame(false)
  } else if (isDraw) {
    endGame(true)
  } else {
    // Mudar simbolo
    swapTurns()
  }
}

startGame()

restartButton.addEventListener('click', startGame)
