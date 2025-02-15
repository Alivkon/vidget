const interactiveDiv = document.getElementById('interactive-div')!;
const itemList = document.getElementById('item-list')!;
const generateHtmlButton = document.getElementById('generate-html-button')!;
//const generatedHtmlTextarea = document.getElementById('generated-html')! as HTMLTextAreaElement;
  // Получаем элементы DOM по их ID. Важно указать тип, чтобы TypeScript знал, что это HTMLInputElement и HTMLElement
  const hiInput = document.getElementById('hi-Input') as HTMLInputElement;
  const houtputDiv = document.getElementById('hi-output') as HTMLElement;
  const wInput = document.getElementById('w-Input') as HTMLInputElement;
  const woutputDiv = document.getElementById('w-output') as HTMLElement;
  const generatedHtmlTextarea = document.getElementById('generated-html') as HTMLTextAreaElement;
  const displayDropdown = document.getElementById('display-dropdown') as HTMLSelectElement;
  const flexDirectionDropdown= document.getElementById('flex-direction-dropdown') as HTMLSelectElement;
  const justifyVerticaldropdown= document.getElementById('justify-vertical-dropdown') as HTMLSelectElement;
  var buttonData = [
  'Connect', 'Disconnect', 'Reset','Available', 'Preparing',  'Charging', 
  'Finishing', 'Reserved', 'Unavailable', 'Faulted', 'Stop Transaction', 
  'Plug`n`Charge', 'EmergencyButton'
];
var widthInteractiveDiv = interactiveDiv.style.width;
hiInput.style.width = "100px";
hiInput.value = "100";
interactiveDiv.style.height = "100px";
wInput.style.width = "100px";
wInput.value = "600";
interactiveDiv.style.width = "600px";


buttonData.forEach((text, index) => {
  // Add button elements to the interactive div
  const button = document.createElement('button');
  button.textContent = text;
  button.className = 'interactive-button';
  const buttonsContainer = document.getElementById('buttons-container');
  if (buttonsContainer) {
    buttonsContainer.appendChild(button);
  } else {
    console.error('Buttons container not found');
  }
  // Set button styles
  button.style.width='100px';
  button.style.height='50px';
  // Add corresponding list item with a checkbox
  const listItem = document.createElement('li');
  listItem.style.display = 'flex';
  listItem.style.alignItems = 'center';
  
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = `item-checkbox-${index}`;
  checkbox.addEventListener('change', (event) => {
    button.style.display = (event.target as HTMLInputElement).checked ? 'inline-block' : 'none';
  });

  const label = document.createElement('label');
  label.htmlFor = `item-checkbox-${index}`;
  label.textContent = text;

  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  itemList.appendChild(listItem);

  // Hide button initially
  button.style.display = 'none';

});
function getElementHTML(selector: string) {
  var element = document.querySelector(selector);
  if (element) {
      return element.outerHTML;
  }
  else {
      return null;
  }
}
generateHtmlButton.addEventListener('click', () => {
    if (interactiveDiv) {
      const htmlContent = interactiveDiv.outerHTML;
      generatedHtmlTextarea.value = htmlContent;
    } else {
      console.error('Interactive div not found');
    }
  });
// Добавляем обработчик события 'input'. 
hiInput.addEventListener('input', () => {
    // Получаем текущее значение из поля ввода. 
    let hi_inputValue = hiInput.value;
  //  Проверяем, не пустое ли поле ввода. Если пустое, ничего не делаем.
    if (hi_inputValue === "") {
        houtputDiv.textContent = ""; // Очищаем вывод
        generatedHtmlTextarea.style.height = 'auto';
        return;
    }
    numberValue= 100;
    // Преобразуем введенное значение в число с помощью parseInt. 
    // Основание 10 указывает на десятичную систему счисления.
    var numberValue: number = parseInt(hi_inputValue, 10);
    // Проверяем, удалось ли преобразование в число. isNaN (is Not a Number) возвращает true, 
    // если значение не является числом.
    if (isNaN(numberValue)) {
        houtputDiv.textContent = "Введено некорректное число"; // Выводим сообщение об ошибке
        hiInput.value = ""; // Очищаем поле ввода
        return; // Прерываем выполнение функции
    }
    // Если все проверки пройдены успешно, выводим число под полем ввода.
    houtputDiv.textContent = "Высота виджета: " + numberValue;
    interactiveDiv.style.height=numberValue+'px'
});
wInput.addEventListener('input', () => {
  let winputValue = wInput.value;
  if (winputValue === "") {
      woutputDiv.textContent = ""; 
      interactiveDiv.style.width = 'auto'
      return;
  }
  var wnumberValue: number = parseInt(winputValue, 10);
  if (isNaN(wnumberValue)) {
      woutputDiv.textContent = "Введено некорректное число"; 
      wInput.value = ""; 
      return; 
  }
  woutputDiv.textContent = "Ширина виджета: " + wnumberValue;
  interactiveDiv.style.width=wnumberValue+'px'
});

function addDisplayDropdown(leftPaneId: string): void {
  const leftPane = document.getElementById(leftPaneId);
  if (!leftPane) {
      console.error(`Element with ID '${leftPaneId}' not found.`);
      return;
  }
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexDirection = "row";
  container.style.marginBottom = "15px";
  container.style.border = "2px solid #ccc";
  container.style.borderRadius = "5px";

  const displayDropdown = document.createElement("select");
  displayDropdown.style.marginBottom = "10px";
  displayDropdown.style.width = "75px";
  displayDropdown.style.height = "30px";
  displayDropdown.value = "flex";
  
  const options = ["flex", "grid", "block", "none", "inline-block"];
  options.forEach(option => {
      const opt = document.createElement("option");
      opt.value = option;
      opt.textContent = option;
      displayDropdown.appendChild(opt);
  });

  const textField = document.createElement("input");
  textField.type = "text";
  textField.readOnly = true;
  textField.style.padding = "10px";
  textField.value = options[0]; // Инициализируем первым значением

  //   displayDropdown.addEventListener("change", () => {
  //     textField.value = displayDropdown.value;
  //     const flexDirectionDropdown = document.getElementById("flex-direction-dropdown");
      
  //     if (displayDropdown.value === "flex") {
  //         if (flexDirectionDropdown) {
  //             flexDirectionDropdown.style.display = "inline-block";
  //            justifyVerticaldropdown.style.display = "none"; 
  //         } else {
  //             console.error("Flex direction dropdown not found");
  //         }
  //     }
  //     if (displayDropdown.value === "grid") {
  //       justifyVerticaldropdown.style.display = "inline-block";
  //       if (flexDirectionDropdown) {
  //         flexDirectionDropdown.style.display = "none";
  //       } else {
  //         console.error("Flex direction dropdown not found");
  //       }
  //     }
  //     const buttonsContainer = document.getElementById("buttons-container");
  //     if (buttonsContainer) {
  //         buttonsContainer.style.display = displayDropdown.value;
  //     } else {
  //         console.error("Buttons container not found");
  //     }
  // });


  container.appendChild(displayDropdown);
  container.appendChild(textField);
  leftPane.appendChild(container);
}

//display ["flex","grid", "block", "none", "inline-block"]
//flex-direction ["row", "row-reverse", "column", "column-reverse"];
function addFlexDirectionDropdown(leftPaneId: string): void {
  const leftPane = document.getElementById(leftPaneId);
  if (!leftPane) {
      console.error(`Element with ID '${leftPaneId}' not found.`);
      return;
  }

  const existingDropdown = document.querySelector("#left-pane select");
  if (existingDropdown) {
      existingDropdown.remove();
  }

  const container = document.createElement("div");
  container.style.marginBottom = "20px";
  container.style.display = "flex";

  const flexDirectionDropdown = document.createElement("select");
  flexDirectionDropdown.id = "flex-direction-dropdown";
  flexDirectionDropdown.style.width = "200px";
  flexDirectionDropdown.style.padding = "5px";
  flexDirectionDropdown.style.marginBottom = "10px";

  const options = ["row", "row-reverse", "column", "column-reverse"];
  options.forEach(option => {
      const opt = document.createElement("option");
      opt.value = option;
      switch (option) {
          case "row":
              opt.textContent = "Горизонтально";
              break;
          case "row-reverse":
              opt.textContent = "Горизонтально (обратно)";
              break;
          case "column":
              opt.textContent = "Вертикально";
              break;
          case "column-reverse":
              opt.textContent = "Вертикально (обратно)";
              break;
      }
      flexDirectionDropdown.appendChild(opt);
  });

  const textHorizontAlign = document.createElement("p");
  textHorizontAlign.id = "textOutput";
  textHorizontAlign.textContent = options[0];

  flexDirectionDropdown.addEventListener("change", () => {
      const buttonsContainer = document.getElementById("buttons-container");
      if (buttonsContainer) {
          buttonsContainer.style.flexDirection = flexDirectionDropdown.value;
          textHorizontAlign.textContent = flexDirectionDropdown.value;
      } else {
          console.error("Buttons container not found");
      }
  });

  container.appendChild(flexDirectionDropdown);
  container.appendChild(textHorizontAlign);
  leftPane.appendChild(container);
}
//writingMode ["horizontal-tb","vertical-rl","vertical-lr","sideways-rl","sideways-lr"];
function addWritingModeDropdown(leftPaneId: string): void {
  // Ищем левую панель
  const leftPane = document.getElementById(leftPaneId);
  if (!leftPane) {
      console.error(`Element with ID '${leftPaneId}' not found.`);
      return;
  }

  // Создаём контейнер для выпадающего списка и текстового поля
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.marginBottom = "20px";

  // Создаём выпадающий список
  const dropdown = document.createElement("select");
  dropdown.style.marginBottom = "10px";
  dropdown.style.width = "100px";
  dropdown.id = "writing-mode-dropdown";

  // Слова для выпадающего списка
  const options = ["horizontal-tb","vertical-rl","vertical-lr","sideways-rl","sideways-lr"];
  options.forEach(option => {
      const opt = document.createElement("option");
      opt.value = option;
      opt.textContent = option;
      dropdown.appendChild(opt);
  });

  // Создаём текстовое поле
  const textField = document.createElement("input");
  textField.type = "text";
  textField.readOnly = true;
  textField.style.padding = "5px";
  textField.style.border = "1px solid #ccc";
  textField.style.borderRadius = "5px";
  textField.style.width = "100px";

  // Обработчик изменений для выпадающего списка
  dropdown.addEventListener("change", () => {
      textField.value = dropdown.value; // Обновляем текстовое поле при выборе
      const buttonsContainer = document.getElementById('buttons-container');
      if (buttonsContainer) {
          buttonsContainer.style.writingMode = dropdown.value;
      } else {
          console.error('Buttons container not found');
      }
  });

  // Инициализируем текстовое поле первым значением
  textField.value = dropdown.value;

  // Добавляем элементы в контейнер, а затем в левую панель
  container.appendChild(dropdown);
  container.appendChild(textField);
  leftPane.appendChild(container);

}
//justifyContent ["flex-start", "center", "flex-end", "space-between"];
function addJustifyHorizontalDropdown(leftPaneId: string): void {
  // Ищем левую панель
  const leftPane = document.getElementById(leftPaneId);
  if (!leftPane) {
      console.error(`Element with ID '${leftPaneId}' not found.`);
      return;
  }

  // Создаём контейнер для выпадающего списка и текстового поля
  const container = document.createElement("div");
  container.style.justifyContent = "flex";
  container.style.flexDirection = "column";
  container.style.marginBottom = "20px";

  // Создаём выпадающий список
  const dropdown = document.createElement("select");
  dropdown.style.marginBottom = "10px";
  dropdown.style.width = "100px";
  dropdown.id = "justify-horizontal-dropdown";

  // Слова для выпадающего списка
  const options = ["flex-start", "center", "flex-end", "space-between"];
  options.forEach(option => {
      const opt = document.createElement("option");
      opt.value = option;
      opt.textContent = option;
      dropdown.appendChild(opt);
  });

  // Создаём текстовое поле
  const textField = document.createElement("input");
  textField.type = "text";
  textField.readOnly = true;
  textField.style.padding = "5px";
  textField.style.border = "1px solid #ccc";
  textField.style.borderRadius = "5px";
  textField.style.width = "100px";

  // Обработчик изменений для выпадающего списка
  dropdown.addEventListener("change", () => {
      textField.value = dropdown.value; // Обновляем текстовое поле при выборе
      const buttonsContainer = document.getElementById('buttons-container');
      if (buttonsContainer) {
          // Устанавливаем стиль display для buttons-container
          buttonsContainer.style.justifyContent = dropdown.value;
      } else {
          console.error('Buttons container not found');
      }
  });

  // Инициализируем текстовое поле первым значением
  textField.value = dropdown.value;
  const textFieldHorizontAlign = document.createElement('p');

  textFieldHorizontAlign.id = 'textOutput';
 // Добавляем контейнер в левую панель
  if (leftPane) {
    leftPane.appendChild(container);
  }
  textFieldHorizontAlign.textContent = 'Выравнивание по горизонтали:';
  // Добавляем чекбокс и текстовое поле в контейнер
  container.appendChild(textFieldHorizontAlign);
  // Добавляем элементы в контейнер, а затем в левую панель
  container.appendChild(dropdown);
  container.appendChild(textField);
  leftPane.appendChild(container);
}
function addJustifyVerticalDropdown(leftPaneId: string): void {
  // Ищем левую панель
  const leftPane = document.getElementById(leftPaneId);
  if (!leftPane) {
      console.error(`Element with ID '${leftPaneId}' not found.`);
      return;
  }

  // Создаём контейнер для выпадающего списка и текстового поля
  const container = document.createElement("div");
  container.style.alignItems = "flex";
  container.style.flexDirection = "column";
  container.style.marginBottom = "20px";

  // Создаём выпадающий список
  const justifyVerticaldropdown = document.createElement("select");
  justifyVerticaldropdown.style.marginBottom = "10px";
  justifyVerticaldropdown.style.width = "100px";
  justifyVerticaldropdown.id = "justify-vertical-dropdown";

  // Слова для выпадающего списка
  const options = ["flex-start", "center", "flex-end", "space-between"];
  options.forEach(option => {
      const opt = document.createElement("option");
      opt.value = option;
      opt.textContent = option;
      justifyVerticaldropdown.appendChild(opt);
  });

  // Создаём текстовое поле
  const textField = document.createElement("input");
  textField.type = "text";
  textField.readOnly = true;
  textField.style.padding = "5px";
  textField.style.border = "1px solid #ccc";
  textField.style.borderRadius = "5px";
  textField.style.width = "100px";

  // Обработчик изменений для выпадающего списка
  justifyVerticaldropdown.addEventListener("change", () => {
      textField.value = justifyVerticaldropdown.value; // Обновляем текстовое поле при выборе
      const buttonsContainer = document.getElementById('buttons-container');
      if (buttonsContainer) {
          // Устанавливаем стиль display для buttons-container
          buttonsContainer.style.alignItems = justifyVerticaldropdown.value;
      } else {
          console.error('Buttons container not found');
      }
  });

  // Инициализируем текстовое поле первым значением
  textField.value = justifyVerticaldropdown.value;
  const textFieldHorizontAlign = document.createElement('p');

  textFieldHorizontAlign.id = 'textOutput';
 // Добавляем контейнер в левую панель
  if (leftPane) {
    leftPane.appendChild(container);
  }
  textFieldHorizontAlign.textContent = 'Выравнивание по вертикали:';
  // Добавляем чекбокс и текстовое поле в контейнер
  container.appendChild(textFieldHorizontAlign);
  // Добавляем элементы в контейнер, а затем в левую панель
  container.appendChild(justifyVerticaldropdown);
  container.appendChild(textField);
  leftPane.appendChild(container);
}

addDisplayDropdown("left-pane");
addDisplayDropdown("left-pane");
//addDisplayDropdown("left-pane");

addFlexDirectionDropdown("left-pane");
flexDirectionDropdown.style.display = "none";
//addWritingModeDropdown("left-pane");
//addJustifyHorizontalDropdown("left-pane");
addJustifyVerticalDropdown("left-pane");
justifyVerticaldropdown.style.display = "none";

//  function addAfterDisplay(displayDropdown: string): void {
// //   const dispDrop = displayDropdown;
//    if (displayDropdown === "flex") {
//     flexDirectionDropdown.style.display = "flex";
//   }
//   else {
//     flexDirectionDropdown.style.display = "none";
//   }}
