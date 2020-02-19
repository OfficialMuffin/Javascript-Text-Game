const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');

let state = {};

function startGame() {
  state = {};
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text;
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button');
      button.innerText = option.text;
      button.classList.add('btn');
      button.addEventListener('click', () => selectOption(option));
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId)
}

/* GAME */

const textNodes = [{
    id: 1,
    text: 'You are a red Fox. You wake up after some much needed rest from last nights catch. You lay beside a pile of blueberries on top of a peice of cloth. What do you do?',
    /* EASTER EGG */
    options: [{
        text: 'Take the Blueberries',
        setState: {
          blueberries: true
        },
        nextText: 2
      },
      {
        text: 'Leave the Blueberries',
        nextText: -1
      }
    ]
  },

  {
    id: 2,
    text: 'You get up and roam around the forest, looking for something to do. You then come accross a friendly wolf. He then mentions that he wants to trade the Blueberries ' +
      ' or you can look after one of his three cubs for a day.',
    options: [{
        text: 'Trade the Blueberries for a long durable stick',
        requiredState: (currentState) => currentState.blueberries,
        setState: {
          blueberries: false,
          stick: true
        },
        nextText: 3
      },
      {
        text: 'Trade the Blueberries for the Wolf cub',
        requiredState: (currentState) => currentState.blueberries,
        setState: {
          blueberries: false,
          cub: true
        },
        nextText: 5
      },
      {
        text: 'Attack the Wolf!',
        nextText: 4
      },
      {
        text: 'Ignore the wolf and keep walking',
        nextText: 5
      }
    ]
  },

  {
    id: 3,
    text: 'You take just take the long durable stick and carry on with your journey. You see the cub sticking to his fathers leg staring at you. You think nothing of it and keep walking.',
    options: [{
      text: 'Keep Walking...',
      nextText: 6
    }, ]
  },

  {
    id: 4,
    text: 'You foolishly attack the Wolf and it attacks back, slashing you across the face, killing you in the process.',
    options: [{
      text: 'Restart Game?',
      nextText: -1
    }]
  },

  {
    id: 5,
    text: 'You slowly reach out your hand to trade the blueberries, the wolf devours the blueberries out of your hand and licks the juice dripping from your hand.',
    options: [{
      text: 'Restart Game?',
      nextText: -1
    }]
  },

  {
    id: 6,
    text: 'As you keep walking, you hear rustling among the bushes behind you. You get your durable stick out to defend yourself. You turn around only to find there was nothing there. You carry on walking.',
    options: [{
      text: 'Restart Game?',
      nextText: -1
    }]
  },
];

/* 

    CONTINUED IN TOWN.JS 
    REDIRECT TO TOWN.HTML

*/

startGame();