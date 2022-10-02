document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".drop-zone");

  dropZoneElement.addEventListener("click", (e) => {
    inputElement.click();
  });

  inputElement.addEventListener("change", (e) => {
    if (inputElement.files.length) {
      updateThumbnail(dropZoneElement, inputElement.files[0]);
    }
  });

  dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("drop-zone--over");
  });

  ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });

  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
      updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
    }

    dropZoneElement.classList.remove("drop-zone--over");
  });
});

/**
 * Updates the thumbnail on a drop zone element.
 *
 * @param {HTMLElement} dropZoneElement
 * @param {File} file
 */

function updateThumbnail(dropZoneElement, file) {
  let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

  // First time - remove the prompt
  if (dropZoneElement.querySelector(".drop-zone__prompt")) {
    dropZoneElement.querySelector(".drop-zone__prompt").remove();
  }

  // First time - there is no thumbnail element, so lets create it
  if (!thumbnailElement) {
    thumbnailElement = document.createElement("div");
    thumbnailElement.classList.add("drop-zone__thumb");
    dropZoneElement.appendChild(thumbnailElement);
  }

  thumbnailElement.dataset.label = file.name;


  // Show thumbnail for image files
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();
    debugger;
    reader.readAsDataURL(file);
    reader.onload = () => {
      debugger;
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
      my_url = URL.createObjectURL(file);
    };
  } else {
    thumbnailElement.style.backgroundImage = null;
  }
}

var my_url
var loadFile = function(event) {
  // debugger;
  my_url = URL.createObjectURL(event.target.files[0]);
  return my_url
};


// defines the model inference function
async function predictModel(){
// debugger;
  // gets image data
  imageData = getData();
}

const img = document.getElementById('img');
        const button = document.getElementById('submit_button');
        const input = document.getElementById('image_url');
        const result = document.getElementById('prediction');

        let model;

        button.onclick = () => {
            // const url = input.value;
            const url = my_url;
            // //
            // imageData = getData();
            // //
            img.src = url;
            result.innerText = "Loading...";
        }

        img.onload = () => {
            doPrediction();
        }

        function doPrediction() {
            if( model ) {
                // model.classify(imageData).then(predictions => {
                model.classify(img).then(predictions => {
                    showPrediction(predictions);
                });
            } else {
                mobilenet.load().then(_model => {
                    model = _model;
                    // model.classify(imageData).then(predictions => {
                    model.classify(img).then(predictions => {
                        showPrediction(predictions);
                    });
                });
            }
        }

        function showPrediction(predictions) {
            result.innerText = "This might be a " + predictions[0].className;
        }
