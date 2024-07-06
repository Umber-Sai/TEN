
export function init2slider(idX, btwX, btn1X, btn2X, input1, input2) {
    var slider = document.getElementById(idX);
    var between = document.getElementById(btwX);
    var button1 = document.getElementById(btn1X);
    var button2 = document.getElementById(btn2X);
    var inpt1 = document.getElementById(input1);
    var inpt2 = document.getElementById(input2);

    var min = inpt1.min;
    var max = inpt1.max;



    const aliasValues = {
        '-1': 'minus one',
        0: 'zero',
        5: 'five'
    }

    // function aliasChecker (value) {
    //     if(aliasValues[value]) return aliasValues[value];
    //     const key = Object.keys(aliasValues).find(k => aliasValues[k] === value);
    //     if(key) return key;
    //     return value
    // }

    function aliasToKey(value) {
        const key = Object.keys(aliasValues).find(k => aliasValues[k] === value);
        if (key) return key;
        return value
    }

    function aliasToValue(key) {
        if (aliasValues[key]) return aliasValues[key];
        return key
    }

    /*init*/
    var sliderCoords = getCoords(slider);
    button1.style.marginLeft = '0px';
    button2.style.marginLeft = (slider.offsetWidth - button1.offsetWidth) + 'px';
    between.style.width = (slider.offsetWidth - button1.offsetWidth) + 'px';
    inpt1.value = aliasToValue(min);
    inpt2.value = aliasToValue(max);



    inpt1.onchange = function (evt) {
        const input1Value = aliasToKey(inpt1.value)
        if (parseInt(input1Value) < min) {
            inpt1.value = aliasToValue(min);
        }
        if (parseInt(input1Value) > max) {
            inpt1.value = aliasToValue(max);
        }

        if (parseInt(input1Value) > parseInt(aliasToKey(inpt2.value))) {
            var temp = input1Value;
            inpt1.value = aliasToValue(inpt2.value);
            inpt2.value = aliasToValue(temp);
        } else {
            inpt1.value = aliasToValue(inpt1.value)
        }


        var sliderCoords = getCoords(slider);
        var per1 = parseInt(aliasToKey(inpt1.value) - min) * 100 / (max - min);
        var per2 = parseInt(aliasToKey(inpt2.value) - min) * 100 / (max - min);
        var left1 = per1 * (slider.offsetWidth - button1.offsetWidth) / 100;
        var left2 = per2 * (slider.offsetWidth - button1.offsetWidth) / 100;

        button1.style.marginLeft = left1 + 'px';
        button2.style.marginLeft = left2 + 'px';

        if (left1 > left2) {
            between.style.width = (left1 - left2) + 'px';
            between.style.marginLeft = left2 + 'px';
        }
        else {
            between.style.width = (left2 - left1) + 'px';
            between.style.marginLeft = left1 + 'px';
        }
    }
    inpt2.onchange = function (evt) {
        const input2Value = aliasToKey(inpt2.value)
        if (parseInt(input2Value) < min)
            inpt2.value = aliasToValue(min);
        if (parseInt(input2Value) > max)
            inpt2.value = aliasToValue(max);
        if (parseInt(aliasToKey(inpt1.value)) > parseInt(input2Value)) {
            var temp = inpt1.value;
            inpt1.value = aliasToValue(inpt2.value);
            inpt2.value = aliasToValue(temp);
        } else {
            inpt2.value = aliasToValue(inpt2.value)
        }

        var sliderCoords = getCoords(slider);
        var per1 = parseInt(aliasToKey(inpt1.value) - min) * 100 / (max - min);
        var per2 = parseInt(aliasToKey(inpt2.value) - min) * 100 / (max - min);
        var left1 = per1 * (slider.offsetWidth - button1.offsetWidth) / 100;
        var left2 = per2 * (slider.offsetWidth - button1.offsetWidth) / 100;

        button1.style.marginLeft = left1 + 'px';
        button2.style.marginLeft = left2 + 'px';

        if (left1 > left2) {
            between.style.width = (left1 - left2) + 'px';
            between.style.marginLeft = left2 + 'px';
        }
        else {
            between.style.width = (left2 - left1) + 'px';
            between.style.marginLeft = left1 + 'px';
        }
    }

    /*mouse*/
    button1.onmousedown = function (evt) {
        var sliderCoords = getCoords(slider);
        var betweenCoords = getCoords(between);
        var buttonCoords1 = getCoords(button1);
        var buttonCoords2 = getCoords(button2);
        var shiftX2 = evt.pageX - buttonCoords2.left;
        var shiftX1 = evt.pageX - buttonCoords1.left;

        document.onmousemove = function (evt) {
            var left1 = evt.pageX - shiftX1 - sliderCoords.left;
            var right1 = slider.offsetWidth - button1.offsetWidth;
            if (left1 < 0) left1 = 0;
            if (left1 > right1) left1 = right1;
            button1.style.marginLeft = left1 + 'px';


            shiftX2 = evt.pageX - buttonCoords2.left;
            var left2 = evt.pageX - shiftX2 - sliderCoords.left;
            var right2 = slider.offsetWidth - button2.offsetWidth;
            if (left2 < 0) left2 = 0;
            if (left2 > right2) left2 = right2;

            var per_min = 0;
            var per_max = 0;
            if (left1 > left2) {
                between.style.width = (left1 - left2) + 'px';
                between.style.marginLeft = left2 + 'px';

                per_min = left2 * 100 / (slider.offsetWidth - button1.offsetWidth);
                per_max = left1 * 100 / (slider.offsetWidth - button1.offsetWidth);
            }
            else {
                between.style.width = (left2 - left1) + 'px';
                between.style.marginLeft = left1 + 'px';

                per_min = left1 * 100 / (slider.offsetWidth - button1.offsetWidth);
                per_max = left2 * 100 / (slider.offsetWidth - button1.offsetWidth);
            }
            const firstVal = (parseInt(min) + Math.round((max - min) * per_min / 100))
            inpt1.value = aliasValues[firstVal] ? aliasValues[firstVal] : firstVal;
            const secondVal = (parseInt(min) + Math.round((max - min) * per_max / 100))
            inpt2.value = aliasValues[secondVal] ? aliasValues[secondVal] : secondVal;

        };
        document.onmouseup = function () {
            document.onmousemove = document.onmouseup = null;
        };
        return false;
    };

    button2.onmousedown = function (evt) {
        var sliderCoords = getCoords(slider);
        var betweenCoords = getCoords(between);
        var buttonCoords1 = getCoords(button1);
        var buttonCoords2 = getCoords(button2);
        var shiftX2 = evt.pageX - buttonCoords2.left;
        var shiftX1 = evt.pageX - buttonCoords1.left;

        document.onmousemove = function (evt) {
            var left2 = evt.pageX - shiftX2 - sliderCoords.left;
            var right2 = slider.offsetWidth - button2.offsetWidth;
            if (left2 < 0) left2 = 0;
            if (left2 > right2) left2 = right2;
            button2.style.marginLeft = left2 + 'px';


            shiftX1 = evt.pageX - buttonCoords1.left;
            var left1 = evt.pageX - shiftX1 - sliderCoords.left;
            var right1 = slider.offsetWidth - button1.offsetWidth;
            if (left1 < 0) left1 = 0;
            if (left1 > right1) left1 = right1;

            var per_min = 0;
            var per_max = 0;

            if (left1 > left2) {
                between.style.width = (left1 - left2) + 'px';
                between.style.marginLeft = left2 + 'px';
                per_min = left2 * 100 / (slider.offsetWidth - button1.offsetWidth);
                per_max = left1 * 100 / (slider.offsetWidth - button1.offsetWidth);
            }
            else {
                between.style.width = (left2 - left1) + 'px';
                between.style.marginLeft = left1 + 'px';
                per_min = left1 * 100 / (slider.offsetWidth - button1.offsetWidth);
                per_max = left2 * 100 / (slider.offsetWidth - button1.offsetWidth);
            }
            const firstVal = (parseInt(min) + Math.round((max - min) * per_min / 100))
            inpt1.value = aliasValues[firstVal] ? aliasValues[firstVal] : firstVal;
            const secondVal = (parseInt(min) + Math.round((max - min) * per_max / 100));
            inpt2.value = aliasValues[secondVal] ? aliasValues[secondVal] : secondVal;

        };
        document.onmouseup = function () {
            document.onmousemove = document.onmouseup = null;
        };
        return false;
    };

    button1.ondragstart = function () {
        return false;
    };
    button2.ondragstart = function () {
        return false;
    };

    function getCoords(elem) {
        var box = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }

}