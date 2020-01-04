class Tags {
    constructor(element, options) {
        options = options || {};

        this.DOMParent = element;
        this.data = options.data || []
        this.preventSubmitting = options.preventSubmitting || false;
        this.inputClass = options.inputClass || null;
        this.deleteWithoutConfirmation = options.deleteWithoutConfirmation || false;
        this.onTagAdded = options.onTagAdded || function () {};
        this.onTagDeleted = options.onTagDeleted || function () {};

        this.getAttribute();
        this.DOMCreate();
        this.DOMRender();
        this.onKeyUp();
    }

    DOMCreate() {
        let ul = document.createElement('ul');
        let input = document.createElement('input');

        this.DOMParent.appendChild(ul);
        this.DOMParent.appendChild(input); // first child is <ul>

        this.DOMList = this.DOMParent.firstElementChild; // last child is <input>
        this.DOMInput = this.DOMParent.lastElementChild;
    }

    DOMRender() {
        const that = this;
        this.DOMList.innerHTML = ''; // render each <li> to <ul>

        this.arrayOfList.forEach(function (currentValue, index) {
            let li = document.createElement('li');
            li.innerHTML = "".concat(currentValue, " <a>&times;</a>");
            li.querySelector('a').addEventListener('click', function () {
                that.onDelete(index);

                return false;
            });
            that.DOMList.appendChild(li);
            that.setAttribute();
        });
    }

    onKeyUp() {
        const that = this;
        let previous = '';

        this.DOMInput.addEventListener('keyup', function (event) {
            let text = this.value.trim(); // check if ',' or 'enter' key was press

            if (event.keyCode === 13 && that.preventSubmitting) {
                event.preventDefault();
            }

            if (event.keyCode === 8 && that.arrayOfList && !previous && !text) {
                that.onDelete(that.arrayOfList.length - 1);
            }

            if (text.includes(',') || event.keyCode === 13) {
                // check if empty text when ',' is remove
                let addedTag = text.replace(',', '');
                if (addedTag !== '') {
                    that.arrayOfList.push(addedTag);
                    that.onTagAdded(addedTag)
                } // clear input

                this.value = '';
            }

            that.DOMRender();
            previous = this.value.trim();
        });
    }

    onDelete(id) {
        let that = this;

        if (that.deleteWithoutConfirmation || !confirm(`Continue to remove tag ${this.arrayOfList[id]}?`)) {
            return;
        }

        this.arrayOfList = this.arrayOfList.filter(function (currentValue, index) {
            if (index === id) {
                that.onTagDeleted(currentValue);

                return false;
            }

            return currentValue;
        });
        this.DOMRender();
    }

    getAttribute() {
        let data = this.data || [],
            dataAttributes = '';

        if (!data && (dataAttributes = this.DOMParent.getAttribute('data-simple-tags'))) {
            data = dataAttributes.split(','); // store array of data attribute in arrayOfList
        }

        this.arrayOfList = data.map(function (currentValue) {
            return currentValue.trim();
        });
    }

    setAttribute() {
        this.DOMParent.setAttribute('data-simple-tags', this.arrayOfList.toString());
    }
}

export default Tags;
