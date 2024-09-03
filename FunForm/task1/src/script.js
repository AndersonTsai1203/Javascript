document.addEventListener('DOMContentLoaded', function() {
  //DoM Elements
  let streetNameInput = document.getElementById('street-name');
  let suburbInput = document.getElementById('suburb');
  let postcodeInput = document.getElementById('postcode');
  let dobInput = document.getElementById('dob');
  let buildingType = document.getElementById('building-type');
  let featureCheckBox = document.getElementsByName('features');
  let selectAllBtn = document.getElementById('select-all-btn');
  let resetBtn = document.getElementById('reset-form');
  let formResult = document.getElementById('form-result');
  
  /**
   * Event Listeners
   * input text using 'blur' to loose the focus, and recall to render the output (to change output in form result)
   * selecting two types of buildings with 'change' event, and recall to render the output
   * marking checkbox with 'click' event, and recall to render the output
   */
  streetNameInput.addEventListener('blur', rendering);
  suburbInput.addEventListener('blur', rendering);
  postcodeInput.addEventListener('blur', rendering);
  dobInput.addEventListener('blur', rendering);
  buildingType.addEventListener('change', rendering);

  /**
   * Function handling "Select All" button behaviour
   * if clicking all checkboxes one by one without clicking "Select All", the button value must be changed to "Deselect All"
   * if one of four checked checkboxes is unchecked, "Deselect All" then switch back to "Select All"
   */
  featureCheckBox.forEach((checkbox) => checkbox.addEventListener('change', function() {
    let count = 0;
    for (let i = 0; i < featureCheckBox.length; i++) {
      if (featureCheckBox[i].checked === true) {
        count++;
      }
    }
    if (count === 4) {
      selectAllBtn.value = "Deselect All";
    }
    else {
      selectAllBtn.value = "Select All";
    }
    rendering();
  }));

  /**
   * Function handling "Select All" button behaviour
   * selecting all checkboxes by clicking "Select All" and the button value will change to "Deselect All"
   * unclicking  all checkboxes by clicking "Deselect All" and the button value will change to "Select All"
   */
  selectAllBtn.addEventListener('click', function() {
    let elements = document.getElementsByName('features');
    if (selectAllBtn.value === "Deselect All") {
      for(let i = 0; i < elements.length; i++) {
        elements[i].checked = false;      
      }
      selectAllBtn.value = "Select All";
    } 
    else { 
      for(let i = 0; i < elements.length; i++) {
        elements[i].checked = true;      
      }
      selectAllBtn.value = "Deselect All";
    }
    rendering();
  });

  /**
   * Function handling "Reset" button behaviour
   * clicking the button will change all elements to their default values
   */
  resetBtn.addEventListener('click', function() {
    streetNameInput.value = "";
    suburbInput.value = "";
    postcodeInput.value = "";
    dobInput.value = "";
    buildingType.value = "apartment";
    featureCheckBox.forEach((checkbox) => (checkbox.checked = false));
    selectAllBtn.value = "Select All";
    formResult.value = "";
  });

  /**
   * Verifying "street name" input field contains between 3 and 50 characters
   * @param {*} street 
   * @returns true if the input is a valid street name, otherwise return false
   */
  function validStreetFormat(street) {
    if (street != "" && (street.length >= 3 && street.length <= 50)) {
      return true;
    }
    return false;
  }

  /**
   * Verifying ""uburb" input field contains between 3 and 50 characters
   * @param {*} suburb 
   * @returns true if the input is a valid suburb, otherwise return false
   */
  function validSuburbFormat(suburb) {
    if (suburb != "" && (suburb.length >= 3 && suburb.length <= 50)) {
      return true;
    }
    return false;
  }

  /**
   * Verifying "postcode" input field only contains 4 digits
   * @param {*} postcode 
   * @returns true if the input is a valid postcode, otherwise return false
   */
  function validPostcodeFormat(postcode) {
    const codeRegex = /^[0-9]{4}$/;
    return codeRegex.test(postcode);
  }

  /**
   * Verifying "date of birth" input field only contains digits and matches the regex expression "DD/MM/YYYY"
   * @param {*} dob 
   * @returns true if the input is a valid date of birth, otherwise return false
   */
  function validDoBFormat(dob) {
    const dobRegex = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
    const date = dob.split('/');
    const day = parseInt(date[0]);
    const month = parseInt(date[1]) - 1;
    const year = parseInt(date[2]);
    const newDateFormat = new Date(year, month, day);
    return dobRegex.test(dob) && day === newDateFormat.getDate() && month === newDateFormat.getMonth();
  }

  /**
   * Verifying building type that begin with a vowel or consonant sound
   * @returns "an" if type begin with a vowel sound otherwise return "a"
   */
  function labelBuildingType() {
    if (buildingType.value === "apartment") {
      return "an Apartment";
    }
    else {
      return "a House";
    }
  }

  /**
   * Calculating the actual age of the user based on current date
   * @param {*} dob 
   * @returns age (in integer)
   */
  function ageCalculation(dob) {
    const date = dob.split('/');
    const day = parseInt(date[0]);
    const month = parseInt(date[1]) - 1;
    const year = parseInt(date[2]);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - year;
    if (currentDate.getMonth() < month || (currentDate.getMonth() === month && currentDate.getDate() < day)) {
      age--;
    }
    return age;
  }
  
  /**
   * get the checked features and arrange to the correct order with required format
   * @returns a string of selected features
   */
  function handleFeaturesOrder() {
    const features = Array.from(featureCheckBox).filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value);
    if (features.length === 0) {
      return 'no features';
    }
    else if (features.length === 1) {
      return features[0];
    }
    else {
      return `${features.slice(0, -1).join(', ')} and ${features.slice(-1)}`;
    }
  }

  /**
   * Keep updating when event occurs
   */
  function rendering() {
    let street = streetNameInput.value.trim();
    let suburb = suburbInput.value.trim();
    let postcode = postcodeInput.value.trim();
    let dateOfBirth = dobInput.value.trim();
    if (!validStreetFormat(street)) {
      formResult.value = "Please input a valid street name";
    }
    else if (!validSuburbFormat(suburb)) {
      formResult.value = "Please input a valid suburb";
    }
    else if (!validPostcodeFormat(postcode)) {
      formResult.value = "Please input a valid postcode";
    }
    else if (!validDoBFormat(dateOfBirth)) {
      formResult.value = "Please enter a valid date of birth";
    }
    else {
      const age = ageCalculation(dateOfBirth);
      const address = `${street} St, ${suburb}, ${postcode}, Australia`;
      const buildingText = labelBuildingType();
      const featuresText = handleFeaturesOrder();
      formResult.value = `You are ${age} years old, and your address is ${address}. Your building is ${buildingText}, and it has ${featuresText}`;
    }
  }
});
