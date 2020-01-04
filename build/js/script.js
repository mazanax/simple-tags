function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Tags =
/*#__PURE__*/
function () {
  function Tags(element, options) {
    _classCallCheck(this, Tags);

    options = options || {};
    this.DOMParent = element;
    this.data = options.data || [];
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

  _createClass(Tags, [{
    key: "DOMCreate",
    value: function DOMCreate() {
      var ul = document.createElement('ul');
      var input = document.createElement('input');
      this.DOMParent.appendChild(ul);
      this.DOMParent.appendChild(input); // first child is <ul>

      this.DOMList = this.DOMParent.firstElementChild; // last child is <input>

      this.DOMInput = this.DOMParent.lastElementChild;
    }
  }, {
    key: "DOMRender",
    value: function DOMRender() {
      var that = this;
      this.DOMList.innerHTML = ''; // render each <li> to <ul>

      this.arrayOfList.forEach(function (currentValue, index) {
        var li = document.createElement('li');
        li.innerHTML = "".concat(currentValue, " <a>&times;</a>");
        li.querySelector('a').addEventListener('click', function () {
          that.onDelete(index);
          return false;
        });
        that.DOMList.appendChild(li);
        that.setAttribute();
      });
    }
  }, {
    key: "onKeyUp",
    value: function onKeyUp() {
      var that = this;
      var previous = '';
      this.DOMInput.addEventListener('keyup', function (event) {
        var text = this.value.trim(); // check if ',' or 'enter' key was press

        if (event.keyCode === 13 && that.preventSubmitting) {
          event.preventDefault();
        }

        if (event.keyCode === 8 && that.arrayOfList && !previous && !text) {
          that.onDelete(that.arrayOfList.length - 1);
        }

        if (text.includes(',') || event.keyCode === 13) {
          // check if empty text when ',' is remove
          var addedTag = text.replace(',', '');

          if (addedTag !== '') {
            that.arrayOfList.push(addedTag);
            that.onTagAdded(addedTag);
          } // clear input


          this.value = '';
        }

        that.DOMRender();
        previous = this.value.trim();
      });
    }
  }, {
    key: "onDelete",
    value: function onDelete(id) {
      var that = this;

      if (that.deleteWithoutConfirmation || !confirm("Continue to remove tag ".concat(this.arrayOfList[id], "?"))) {
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
  }, {
    key: "getAttribute",
    value: function getAttribute() {
      var data = this.data || [],
          dataAttributes = '';

      if (!data && (dataAttributes = this.DOMParent.getAttribute('data-simple-tags'))) {
        data = dataAttributes.split(','); // store array of data attribute in arrayOfList
      }

      this.arrayOfList = data.map(function (currentValue) {
        return currentValue.trim();
      });
    }
  }, {
    key: "setAttribute",
    value: function setAttribute() {
      this.DOMParent.setAttribute('data-simple-tags', this.arrayOfList.toString());
    }
  }]);

  return Tags;
}();

export default Tags;