const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

/* GAME */

const textNodes = [{
    id: 1,
    text: 'After leaving the wolf and take on the cub to look after for a day, the cub tires you out with his energetic behaviour. You then stumble upon a small village.',
    options: [{
        /* DOES NOT HAVE A PATH */
        text: 'Explore the village',
        nextText: -1
      },
      {
        /* DOES NOT HAVE A PATH */
        text: 'Find a place to rest in the town',
        nextText: -1
      },
    ]
  },
  {
    id: 2,
    text: 'A bush shakes beside you as you are walking. You are curious as to what is behind that bush. Suddenly, a wolf cub appears!',
    options: [{
        text: 'Ask where is its parents',
        nextText: 3
      },
      {
        text: 'Take the cub along for the ride',
        nextText: 4
      },
      {
        text: 'Ignore the cub and keep walking',
        nextText: 5
      }
    ]
  },
  {
    id: 3,
    text: 'The cub does not reply. Tilts its head in response to your question',
    options: [{
      text: 'Restart Game?',
      nextText: -1
    }]
  },
  {
    id: 4,
    text: 'Without any money to buy a room you break into the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell.',
    options: [{
      text: 'Restart Game?',
      nextText: -1
    }]
  },
  {
    id: 5,
    text: 'You wake up well rested and full of energy ready to explore the nearby castle.',
    options: [{
      text: 'Explore the castle',
      nextText: 7
    }]
  },
  {
    id: 6,
    text: 'While exploring the castle you come across a horrible monster in your path.',
    options: [{
        text: 'Try to run',
        nextText: 8
      },
      {
        text: 'Attack it with your sword',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'Hide behind your shield',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'Throw the blue goo at it',
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11
      }
    ]
  },
]

startGame()