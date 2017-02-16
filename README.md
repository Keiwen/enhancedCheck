# enhancedCheck

**Require Bootstrap >= 3.0.0**

Enhance checkboxes and radio buttons design. Just put input and label (**label after input**) in a div with desired class
- enhancedCheck: base class:
- enhancedCheck-inline: display inputs inline if they are nested into not-inline div
- enhancedCheck-[primary|success|danger|warning]: change base color to [blue|green|red|orange]
- enhancedCheck-combine: alternate design for checkboxes, aiming at grouping values
- enhancedCheck-animate: color change slowly on select/unselect

*See html or png sample in demo folder*

Typical HTML sample:
```
<div class="enhancedCheck enhancedCheck-primary">
  <input type="checkbox" id="sampleCheckbox">
  <label for="sampleCheckbox">Checkbox</label>
</div>
```
Or:
```
<div class="enhancedCheck enhancedCheck-success">
  <input type="radio" name="rb" id="sampleRadio1">
  <label for="sampleRadio1">Radio one</label>
  <input type="radio" name="rb" id="sampleRadio2">
  <label for="sampleRadio2">Radio two</label>
</div>
```
