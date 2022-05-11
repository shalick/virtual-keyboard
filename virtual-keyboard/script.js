let container = document.createElement("div");
container.classList.add("container");
document.body.appendChild(container);
let headline = document.createElement("h2");
headline.innerText = "Virtual keyboard";
container.appendChild(headline);

const Keyboard = {
  elements: {
    textarea: null,
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },
  properties: {
    value: "",
    capsLock: false,
  },
  init() {
    this.elements.textarea = document.createElement("textarea");
    this.elements.textarea.classList.add("use-keyboard-input", "text");

    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    this.elements.main.classList.add("keyboard", "keyboard-hidden");
    this.elements.keysContainer.classList.add("keyboard-keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys =
      this.elements.keysContainer.querySelectorAll(".keyboard-key");

    this.elements.main.appendChild(this.elements.keysContainer);
    container.appendChild(this.elements.textarea);
    container.appendChild(this.elements.main);

    document.querySelectorAll(".use-keyboard-input").forEach((element) => {
      element.addEventListener("focus", () => {
        this.open(element.value, (currentValue) => {
          element.value = currentValue;
        });
      });
    });
  },
  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      "`",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "-",
      "=",
      "backspace",
      "tab",
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "{",
      "}",
      " \ ",
      "caps",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      ";",
      '"',
      "enter",
      "done",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
      ",",
      ".",
      "?",
      "space",
    ];

    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    keyLayout.forEach((key) => {
      const keyElement = document.createElement("button");
      const insertLineBreak =
        ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard-key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("backspace-key");
          keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            this._triggerEvent("oninput");
          });
          break;
        case "tab":
          keyElement.classList.add("tab-key");
          keyElement.innerHTML = createIconHTML("keyboard_tab");
          break;
        case "caps":
          keyElement.classList.add("capslock-key");
          keyElement.innerHTML = createIconHTML("keyboard_capslock");

          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            this._triggerEvent("oninput");
          });
          break;
        case "enter":
          keyElement.classList.add("enter-key");
          keyElement.innerHTML = createIconHTML("keyboard_return");

          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });
          break;
        case "space":
          keyElement.classList.add("keyboard-key-extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");

          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            this._triggerEvent("oninput");
          });
          break;
        case "done":
          keyElement.classList.add("keyboard-key-extra-wide");
          keyElement.innerHTML = createIconHTML("check_circle");

          keyElement.addEventListener("click", () => {
            this.close();
            this._triggerEvent("onclose");
          });
          break;
        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener("click", () => {
            this.properties.value += this.properties.capsLock
              ? key.toUpperCase()
              : key.toLowerCase();
            this._triggerEvent("oninput");
          });
          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },
  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  },
  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard-hidden");
  },
  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard-hidden");
  },
};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
  Keyboard.open(
    "dcode",
    function (currentValue) {
      console.log("value " + currentValue);
    },
    function (currentValue) {
      console.log("keyboard closed! finishing value: " + currentValue);
    }
  );
});

let keys = document.querySelectorAll(".keyboard-key");

for (let i = 0; i < keys.length; i++) {
  keys[i].setAttribute("keyname", keys[i].innerText);
  keys[i].setAttribute("lowerCaseName", keys[i].innerText.toLowerCase());
}
console.log(keys);

window.addEventListener("keydown", (e) => {
  console.log(e.key);
  console.log("he");
});
