# FunForm

## 1. Task 1 - Dynamic form

### 1.1. Overview

The HTML page in `task1/src/index.html` displays a series of inputs, and when valid, outputs a "summary" of this information in the textarea at the bottom of the page.

![page.png](./task1/page.PNG)

Make this form dynamic and interactive through use of Javascript only (Modification or addition of any  HTML or CSS is prohibited).

#### 1.1.1. The page

The page consists of a:

* Table
  * Text input for `Street` Name (must be between 3 and 50 characters inclusive).
  * Text input for `Suburb` (must be between 3 and 50 characters inclusive).
  * Text input for `Postcode` (must be a number that is exactly 4 digits).
  * Text input for `Date of birth` (valid input is the exactformat "DD/MM/YYYY" and must be a valid date. This means it must match the regex expression "[0-9]{2}/[0-9]{2}/[0-9]{4}" and when trying to parse it with the Javascript date object it does not return **NaN**).
  * Dropdown for `building type` (either "Apartment" or "House", no other options). Apartment is default.
  * Checkbox for `features` that the house has (Heating, AirConditioning, Pool, Sandpit).
  * Button to select / deselect all.
* Remove button
* Textarea (initially blank)

#### 1.1.2. Actions

The following are events that trigger a render that should be binded to particular actions

* Changing of the "building type" or "features" should trigger a render.
* Blur of the "street name", "suburb", "postcode", or "date of birth" should trigger a render.

There are key buttons on the page:

* When the `Select All` button is clicked inside the features section, all 4 feature checkboxes are selected.
  * At any time when all 4 features are selected, the `Select All` button's text is changed to `Deselect all`. When this button is pressed in this state, all 4 of the feature checkboxes become unselected.
* When the `reset` button is clicked, the `textarea` has all of its text removed (i.e. it becomes blank again), and all of the form elements in the table are reset to their default state.

#### 1.1.3. Rendering

The "output" refers to what the inner HTML text should be of the textarea at the bottom of the page.

* If they haven't inputted a `street name`, or the `street name` entered is invalid, the output should be _"Please input a valid street name"_
* If they have inputted a `street name`, but haven't inputted a `suburb` / the `suburb` is invalid, the output should be _"Please input a valid suburb"_
* If they have inputted a `street name` and `suburb`, but haven't inputted a `postcode` / the `postcode` is invalid, the output should be _"Please input a valid postcode"_
* If they have inputted a `street name`, `suburb`, and `postcode`, but haven't inputted a valid `date of birth`, the output should be _"Please enter a valid date of birth"_
* If they have entered the above correctly, the output is _"You are [age (integer)] years old, and your address is [street name] St, [suburb], [postcode], Australia. Your building is [a|an] [building type], and it has [features]"_
  * If no features are selected, [features] is _"no features"_
  * If 1 feature is selected, [features] is just _"[feature1]"_
  * If 2 or more feature are selected, [features] is just _"[feature1], [feature2], and [feature3]"_ etc, where "and" joins the last and second last feature.

Please note: The age needs to be accurate - you cannot just subtract this year from the date of birth year, you must also take into account months and days.

### 1.2. Getting started

This task requires you to modify `src/script.js` and **only** this file. Everything is done in this file. **Do NOT modify the HTML file**.

### 1.3. Sample outputs

The following are sample outputs for different valid combinations of value entries into the form.

1. You are 23 years old, and your address is UNSW St, Kingsford, 2210, Australia. Your building is a House, and it has no features

2. You are 38 years old, and your address is Ferrell St, Glebe, 2525, Australia. Your building is an Apartment, and it has AirConditioning

3. You are 24 years old, and your address is Colin St, Randwick, 2323, Australia. Your building is a House, and it has Heating, AirConditioning, Pool, and Sandpit

Ensure that your output in the textarea matches the **spacing, letter casing and wording** for each of the examples provided. Also note that features are listed in order of their checkbox.

Please note: features are listed in order of how we describe them, NOT in the order they are clicked. Regardless of the order they were clicked the output will follow the same pattern.

## 2. Constraints & Assumptions

You need to write Javascript (typically a combination of event listeners and DOM manipulations) that listen for actions described in `1.1.2` and render the page described in `1.1.3` in conjunction with any constraints described in `1.1.1`.

### 2.1. Browser Compatibility

You should ensure that your programs have been tested on one of the following two browsers:

* Locally, Google Chrome (various operating systems) latest version
* On CSE machines, Chromium

### 2.2. External libraries

It is restricted from using any third party JS libraries when completing this assessment. Basically, this means try not to import code using the `<script />` tag or `fetch` keyword if it's from a file written by somone else.
