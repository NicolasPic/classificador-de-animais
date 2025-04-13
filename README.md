
# 🐾 Classificador de Animais

Aplicação web interativa que utiliza **inteligência artificial com TensorFlow.js** para classificar imagens de animais. O sistema reconhece espécies com base em fotos tiradas com a câmera ou carregadas do computador, exibindo as probabilidades de cada classe.

> “Mesmo a menor criatura pode mudar o rumo do futuro.”  
> — Galadriel, *O Senhor dos Anéis*

---

## 🎯 Objetivo

Promover o conhecimento sobre animais através da identificação automática de espécies em imagens, aliando tecnologia e educação de forma prática e visual.

---

## 🧠 Animais Reconhecidos

O modelo é capaz de identificar as seguintes categorias:

- Ursos
- Leão
- Cachorro
- Lobo
- Elefante
- Cabras
- Gatos
- Cavalo
- Tigre

---

## 🚀 Funcionalidades

- 📷 Upload de imagens ou captura via câmera
- 🤖 Classificação em tempo real com modelo pré-treinado
- 📊 Exibição da porcentagem de confiança para cada animal
- 📚 Descrição detalhada do animal mais provável

---

## 💻 Como Usar

1. Certifique-se de que todos os arquivos estejam na mesma pasta:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `my_model/`
     - `model.json`
     - `metadata.json`
     - `weights.bin`

2. Rode um servidor local (veja instruções abaixo)

3. Acesse a aplicação via navegador:
   ```
   http://localhost:8000/index.html
   ```

4. Carregue uma imagem **ou** use a câmera

5. Clique em **"Classificar"** para obter os resultados

---

## 🌐 Rodar Localmente

É necessário executar um servidor local para que o navegador carregue o modelo corretamente:

### Usando Python 3

```bash
python -m http.server 8000
```

### Usando Node.js

```bash
npx http-server
```

---

## 📁 Estrutura do Projeto

```bash
classificador-animais/
├── index.html               # Página principal
├── styles.css               # Estilos da interface
├── script.js                # Lógica de classificação
├── my_model/                # Modelo Teachable Machine
│   ├── model.json
│   ├── metadata.json
│   └── weights.bin
└── README.md                # Este documento
```

---

## 🐞 Solução de Problemas

- Certifique-se de que todos os arquivos estão na estrutura correta
- Use um navegador moderno (Chrome, Firefox, Edge)
- Verifique o console (F12) em caso de erro no carregamento do modelo
- Câmera só funciona via servidor local (por segurança dos navegadores)

---

## 🤝 Contribuições

Sugestões, melhorias e colaborações são bem-vindas! Você pode:

- Sugerir melhorias na interface
- Expandir o modelo para mais espécies
- Corrigir bugs ou problemas de usabilidade

---


Desenvolvido por Nicolas Picoli
