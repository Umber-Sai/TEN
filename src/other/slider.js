
class CustomRangeSlider {
    constructor(id, element, max, min, aliasValues) {
        this.id = id
        if (!aliasValues) {
            this.aliasValues = { 0: 0 }
        } else {
            this.aliasValues = aliasValues;
        }

        this.slider = element
        this.between = document.createElement('div');
        this.between.className = 'range__between';

        this.button1 = document.createElement('button');
        this.button2 = document.createElement('button');

        this.inpt1 = document.createElement('input');
        this.inpt1.setAttribute('min', min);
        this.inpt1.setAttribute('max', max);
        this.inpt1.setAttribute('type', 'text');

        this.inpt2 = document.createElement('input');
        this.inpt2.setAttribute('min', min);
        this.inpt2.setAttribute('max', max);
        this.inpt2.setAttribute('type', 'text');

        this.slider.appendChild(this.between)
        this.slider.appendChild(this.button1)
        this.slider.appendChild(this.button2)
        this.slider.appendChild(this.inpt1)
        this.slider.appendChild(this.inpt2)

        this.min = min;
        this.max = max;

        this.init()
    }



    aliasToKey(value) {
        const key = Object.keys(this.aliasValues).find(k => this.aliasValues[k] === value);
        if (key) return key;
        return value
    }

    aliasToValue(key) {
        if (this.aliasValues[key]) return this.aliasValues[key];
        return key
    }

    init() {

        /*init*/
        const sliderCoords = this.getCoords(this.slider);
        this.button1.style.marginLeft = '0px';
        this.button2.style.marginLeft = (this.slider.offsetWidth - this.button1.offsetWidth) + 'px';
        this.between.style.width = (this.slider.offsetWidth - this.button1.offsetWidth) + 'px';
        this.inpt1.value = this.aliasToValue(this.min);
        this.inpt2.value = this.aliasToValue(this.max);

        this.inpt1.onchange = () => {
            const input1Value = this.aliasToKey(this.inpt1.value)
            if (parseInt(input1Value) < this.min) {
                this.inpt1.value = this.aliasToValue(this.min);
            }
            if (parseInt(input1Value) > this.max) {
                this.inpt1.value = this.aliasToValue(this.max);
            }
    
            if (parseInt(input1Value) > parseInt(this.aliasToKey(this.inpt2.value))) {
                var temp = input1Value;
                this.inpt1.value = this.aliasToValue(this.inpt2.value);
                this.inpt2.value = this.aliasToValue(temp);
            } else {
                this.inpt1.value = this.aliasToValue(this.inpt1.value)
            }
    
    
            var sliderCoords = this.getCoords(this.slider);
            var per1 = parseInt(this.aliasToKey(this.inpt1.value) - this.min) * 100 / (this.max - this.min);
            var per2 = parseInt(this.aliasToKey(this.inpt2.value) - this.min) * 100 / (this.max - this.min);
            var left1 = per1 * (this.slider.offsetWidth - this.button1.offsetWidth) / 100;
            var left2 = per2 * (this.slider.offsetWidth - this.button1.offsetWidth) / 100;
    
            this.button1.style.marginLeft = left1 + 'px';
            this.button2.style.marginLeft = left2 + 'px';
    
            if (left1 > left2) {
                this.between.style.width = (left1 - left2) + 'px';
                this.between.style.marginLeft = left2 + 'px';
            }
            else {
                this.between.style.width = (left2 - left1) + 'px';
                this.between.style.marginLeft = left1 + 'px';
            }
        }
        this.inpt2.onchange = () => {
            const input2Value = this.aliasToKey(this.inpt2.value)
            if (parseInt(input2Value) < this.min)
                this.inpt2.value = this.aliasToValue(this.min);
            if (parseInt(input2Value) > this.max)
                this.inpt2.value = this.aliasToValue(this.max);
            if (parseInt(this.aliasToKey(this.inpt1.value)) > parseInt(input2Value)) {
                var temp = this.inpt1.value;
                this.inpt1.value = this.aliasToValue(this.inpt2.value);
                this.inpt2.value = this.aliasToValue(temp);
            } else {
                this.inpt2.value = this.aliasToValue(this.inpt2.value)
            }
    
            var sliderCoords = this.getCoords(this.slider);
            var per1 = parseInt(this.aliasToKey(this.inpt1.value) - this.min) * 100 / (this.max - this.min);
            var per2 = parseInt(this.aliasToKey(this.inpt2.value) - this.min) * 100 / (this.max - this.min);
            var left1 = per1 * (this.slider.offsetWidth - this.button1.offsetWidth) / 100;
            var left2 = per2 * (this.slider.offsetWidth - this.button1.offsetWidth) / 100;
    
            this.button1.style.marginLeft = left1 + 'px';
            this.button2.style.marginLeft = left2 + 'px';
    
            if (left1 > left2) {
                this.between.style.width = (left1 - left2) + 'px';
                this.between.style.marginLeft = left2 + 'px';
            }
            else {
                this.between.style.width = (left2 - left1) + 'px';
                this.between.style.marginLeft = left1 + 'px';
            }
        }
        this.button1.onmousedown = (evt) => {
            const sliderCoords = this.getCoords(this.slider);
            this.betweenCoords = this.getCoords(this.between);
            const buttonCoords1 = this.getCoords(this.button1);
            const buttonCoords2 = this.getCoords(this.button2);
            const shiftX2 = evt.pageX - buttonCoords2.left;
            const shiftX1 = evt.pageX - buttonCoords1.left;
    
            document.onmousemove = (evt) => {
                var left1 = evt.pageX - shiftX1 - sliderCoords.left;
                var right1 = this.slider.offsetWidth - this.button1.offsetWidth;
                if (left1 < 0) left1 = 0;
                if (left1 > right1) left1 = right1;
                this.button1.style.marginLeft = left1 + 'px';
    
    
                const shiftX2 = evt.pageX - buttonCoords2.left;
                var left2 = evt.pageX - shiftX2 - sliderCoords.left;
                var right2 = this.slider.offsetWidth - this.button2.offsetWidth;
                if (left2 < 0) left2 = 0;
                if (left2 > right2) left2 = right2;
    
                var per_min = 0;
                var per_max = 0;
                if (left1 > left2) {
                    this.between.style.width = (left1 - left2) + 'px';
                    this.between.style.marginLeft = left2 + 'px';
    
                    per_min = left2 * 100 / (this.slider.offsetWidth - this.button1.offsetWidth);
                    per_max = left1 * 100 / (this.slider.offsetWidth - this.button1.offsetWidth);
                }
                else {
                    this.between.style.width = (left2 - left1) + 'px';
                    this.between.style.marginLeft = left1 + 'px';
    
                    per_min = left1 * 100 / (this.slider.offsetWidth - this.button1.offsetWidth);
                    per_max = left2 * 100 / (this.slider.offsetWidth - this.button1.offsetWidth);
                }
                const firstVal = (parseInt(this.min) + Math.round((this.max - this.min) * per_min / 100))
                this.inpt1.value = this.aliasValues[firstVal] ? this.aliasValues[firstVal] : firstVal;
                const secondVal = (parseInt(this.min) + Math.round((this.max - this.min) * per_max / 100))
                this.inpt2.value = this.aliasValues[secondVal] ? this.aliasValues[secondVal] : secondVal;
    
            };
            document.onmouseup = function () {
                document.onmousemove = document.onmouseup = null;
            };
            return false;
        };
        this.button2.onmousedown = (evt) => {
            var sliderCoords = this.getCoords(this.slider);
            this.betweenCoords = this.getCoords(this.between);
            var buttonCoords1 = this.getCoords(this.button1);
            var buttonCoords2 = this.getCoords(this.button2);
            var shiftX2 = evt.pageX - buttonCoords2.left;
            var shiftX1 = evt.pageX - buttonCoords1.left;
    
            document.onmousemove = (evt) => {
                var left2 = evt.pageX - shiftX2 - sliderCoords.left;
                var right2 = this.slider.offsetWidth - this.button2.offsetWidth;
                if (left2 < 0) left2 = 0;
                if (left2 > right2) left2 = right2;
                this.button2.style.marginLeft = left2 + 'px';
    
    
                shiftX1 = evt.pageX - buttonCoords1.left;
                var left1 = evt.pageX - shiftX1 - sliderCoords.left;
                var right1 = this.slider.offsetWidth - this.button1.offsetWidth;
                if (left1 < 0) left1 = 0;
                if (left1 > right1) left1 = right1;
    
                var per_min = 0;
                var per_max = 0;
    
                if (left1 > left2) {
                    this.between.style.width = (left1 - left2) + 'px';
                    this.between.style.marginLeft = left2 + 'px';
                    per_min = left2 * 100 / (this.slider.offsetWidth - this.button1.offsetWidth);
                    per_max = left1 * 100 / (this.slider.offsetWidth - this.button1.offsetWidth);
                }
                else {
                    this.between.style.width = (left2 - left1) + 'px';
                    this.between.style.marginLeft = left1 + 'px';
                    per_min = left1 * 100 / (this.slider.offsetWidth - this.button1.offsetWidth);
                    per_max = left2 * 100 / (this.slider.offsetWidth - this.button1.offsetWidth);
                }
                const firstVal = (parseInt(this.min) + Math.round((this.max - this.min) * per_min / 100))
                this.inpt1.value = this.aliasValues[firstVal] ? this.aliasValues[firstVal] : firstVal;
                const secondVal = (parseInt(this.min) + Math.round((this.max - this.min) * per_max / 100));
                this.inpt2.value = this.aliasValues[secondVal] ? this.aliasValues[secondVal] : secondVal;
    
            };
            document.onmouseup = function () {
                document.onmousemove = document.onmouseup = null;
            };
            return false;
        };


        this.button1.ondragstart = function () {
            return false;
        };
        this.button2.ondragstart = function () {
            return false;
        };

    }


    getCoords(elem) {
        var box = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }

    get minVal () {
        const val = this.aliasToKey(this.inpt1.value)
        return val === this.min ? null : val
    }

    get maxVal () {
        const val = this.aliasToKey(this.inpt2.value)
        return val === this.max ? null : val
    }
}


module.exports = CustomRangeSlider;