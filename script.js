// Elementos da DOM
const imageUpload = document.getElementById("imageUpload")
const cameraButton = document.getElementById("cameraButton")
const captureButton = document.getElementById("captureButton")
const webcam = document.getElementById("webcam")
const preview = document.getElementById("preview")
const placeholderDiv = document.getElementById("placeholderDiv")
const canvas = document.getElementById("canvas")
const classifyBtn = document.getElementById("classifyBtn")
const resultsSection = document.getElementById("resultsSection")
const topResult = document.getElementById("topResult")
const confidence = document.getElementById("confidence")
const predictionList = document.getElementById("predictionList")
const materialDescription = document.getElementById("materialDescription")

// Variáveis globais
let model
const ctx = canvas.getContext("2d")
let isWebcamActive = false

// Informações sobre os animais
const animalInfo = {
  bear: {
    nome: "Urso",
    descricao:
      "Ursos são mamíferos grandes encontrados em florestas e montanhas. Eles são conhecidos por sua força e habilidade de hibernar durante o inverno.",
  },
  cat: {
    nome: "Gato",
    descricao:
      "Gatos são animais domésticos ágeis e independentes. Eles são conhecidos por sua curiosidade e habilidades de caça.",
  },
  dog: {
    nome: "Cachorro",
    descricao:
      "Cachorros são animais leais e companheiros. Eles são conhecidos como os melhores amigos do homem e possuem diversas raças.",
  },
  elephant: {
    nome: "Elefante",
    descricao:
      "Elefantes são os maiores mamíferos terrestres. Eles são conhecidos por sua inteligência, memória e tromba versátil.",
  },
  goat: {
    nome: "Cabra",
    descricao:
      "Cabras são animais ágeis e resistentes, frequentemente encontrados em áreas montanhosas. Elas são criadas por seu leite, carne e lã.",
  },
  horse: {
    nome: "Cavalo",
    descricao:
      "Cavalos são animais fortes e rápidos, usados para transporte, trabalho e esportes. Eles têm uma longa história de domesticação.",
  },
  lion: {
    nome: "Leão",
    descricao:
      "Leões são conhecidos como os reis da selva. Eles vivem em grupos chamados de alcateias e são famosos por sua juba majestosa.",
  },
  tiger: {
    nome: "Tigre",
    descricao:
      "Tigres são grandes felinos com listras características. Eles são caçadores solitários e vivem em florestas densas.",
  },
  wolf: {
    nome: "Lobo",
    descricao:
      "Lobos são animais sociais que vivem em alcateias. Eles são conhecidos por sua comunicação vocal e habilidades de caça em grupo.",
  },
}

// Inicializar a aplicação
async function init() {
  try {
    console.log("Iniciando carregamento do modelo...")
    // Carregar o modelo usando a biblioteca Teachable Machine
    const modelURL = "./my_model/model.json"
    const metadataURL = "./my_model/metadata.json"
    model = await window.tmImage.load(modelURL, metadataURL)
    console.log("Modelo carregado com sucesso!")

    // Configurar os eventos de entrada
    setupEventListeners()
  } catch (error) {
    console.error("Erro ao carregar o modelo:", error)
    alert("Não foi possível carregar o modelo. Por favor, verifique o console para mais detalhes.")
  }
}

// Configurar os listeners de eventos
function setupEventListeners() {
  // Evento de upload de imagem
  imageUpload.addEventListener("change", handleImageUpload)

  // Evento de botão de câmera
  cameraButton.addEventListener("click", toggleWebcam)

  // Evento de captura de imagem
  captureButton.addEventListener("click", captureImage)

  // Evento de classificação
  classifyBtn.addEventListener("click", classifyImage)
}

// Lidar com o upload de imagens
function handleImageUpload(event) {
  const file = event.target.files[0]
  if (file) {
    // Desativar webcam se estiver ativa
    if (isWebcamActive) {
      toggleWebcam()
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      preview.src = e.target.result
      preview.hidden = false
      placeholderDiv.hidden = true
      preview.onload = () => {
        classifyBtn.disabled = false
      }
    }
    reader.readAsDataURL(file)
  }
}

// Alternar câmera
async function toggleWebcam() {
  if (!isWebcamActive) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 224, height: 224 },
      })
      webcam.srcObject = stream
      webcam.hidden = false
      captureButton.hidden = false
      cameraButton.textContent = "Desativar Câmera"
      isWebcamActive = true

      // Esconder o placeholder e a prévia quando a câmera estiver ativa
      placeholderDiv.hidden = true
      preview.hidden = true
    } catch (error) {
      console.error("Erro ao acessar a câmera:", error)
      alert("Não foi possível acessar a câmera. Verifique as permissões do navegador.")
    }
  } else {
    // Parar todos os streams de vídeo
    const tracks = webcam.srcObject.getTracks()
    tracks.forEach((track) => track.stop())
    webcam.srcObject = null
    webcam.hidden = true
    captureButton.hidden = true
    cameraButton.textContent = "Usar Câmera"
    isWebcamActive = false

    // Mostrar o placeholder se não houver imagem
    if (preview.src === "" || preview.src === window.location.href) {
      placeholderDiv.hidden = false
      preview.hidden = true
    }
  }
}

// Capturar imagem da webcam
function captureImage() {
  ctx.drawImage(webcam, 0, 0, canvas.width, canvas.height)
  const imageData = canvas.toDataURL("image/jpeg")
  preview.src = imageData
  preview.hidden = false
  placeholderDiv.hidden = true
  classifyBtn.disabled = false
}

// Classificar a imagem
async function classifyImage() {
  try {
    // Mostrar que está processando
    classifyBtn.disabled = true
    classifyBtn.textContent = "Processando..."

    // Garantir que a imagem está carregada no canvas
    if (preview.complete && preview.naturalHeight !== 0) {
      ctx.drawImage(preview, 0, 0, canvas.width, canvas.height)
    } else {
      throw new Error("Imagem não carregada corretamente")
    }

    // Fazer a previsão
    const predictions = await model.predict(canvas)
    console.log("Predições:", predictions)

    // Mostrar resultados
    displayResults(predictions)

    // Habilitar o botão novamente
    classifyBtn.disabled = false
    classifyBtn.textContent = "Classificar"
  } catch (error) {
    console.error("Erro ao classificar a imagem:", error)
    alert("Ocorreu um erro ao classificar a imagem. Verifique o console para mais detalhes.")
    classifyBtn.disabled = false
    classifyBtn.textContent = "Classificar"
  }
}

// Mapear nomes retornados pelo modelo para as chaves do animalInfo
function mapClassNameToKey(className) {
  const mapping = {
    Ursos: "bear",
    Leão: "lion",
    Cachorro: "dog",
    Lobo: "wolf",
    Elefante: "elephant",
    Cabras: "goat",
    Gatos: "cat",
    Cavalo: "horse",
    Tigre: "tiger",
  }
  return mapping[className] || className
}

// Obter nome em português a partir do nome da classe
function getPortugueseName(className) {
  const key = mapClassNameToKey(className)
  return animalInfo[key]?.nome || className
}

// Exibir os resultados da classificação
function displayResults(predictions) {
  // Ordenar predições por probabilidade (maior para menor)
  predictions.sort((a, b) => b.probability - a.probability)

  // Exibir a principal previsão
  const topPrediction = predictions[0]
  const key = mapClassNameToKey(topPrediction.className)
  const animalName = getPortugueseName(topPrediction.className)
  topResult.textContent = animalName
  confidence.textContent = `Confiança: ${(topPrediction.probability * 100).toFixed(2)}%`

  // Preencher a descrição do animal
  materialDescription.textContent = animalInfo[key]?.descricao || "Descrição não disponível."

  // Limpar e preencher a lista de todas as predições
  predictionList.innerHTML = ""
  predictions.forEach((prediction) => {
    const percentage = (prediction.probability * 100).toFixed(1)
    const ptName = getPortugueseName(prediction.className)

    const predictionItem = document.createElement("div")
    predictionItem.className = "prediction-item"
    predictionItem.innerHTML = `
      <span class="material-name">${ptName}</span>
      <span class="material-percentage">${percentage}%</span>
    `
    predictionList.appendChild(predictionItem)
  })

  // Mostrar a seção de resultados
  resultsSection.hidden = false

  // Rolar para a seção de resultados
  resultsSection.scrollIntoView({ behavior: "smooth" })
}

// Inicializar após o carregamento da página
window.addEventListener("DOMContentLoaded", init)
