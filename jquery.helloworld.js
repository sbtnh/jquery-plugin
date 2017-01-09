/**
 * Template for jQuery plugins
 */
(function($, window, undefined){

    var pluginName = "hello",
        defaults = {
            wrapper: {
                cssClass: 'hello__wrapper',
                text: 'Hello world plugin :)'
            },
            button: {
                cssClass: 'hello__button',
                text: 'Say hello'
            },
            hello: 'Hello!'
        };

    function Plugin(element, options) {
        var _this = this;

        _this.element = element;
        _this.$element = $(element);
        _this.settings = $.extend({}, defaults, options);
        _this._defaults = defaults;
        _this._name = pluginName;
        _this._pluginInitialized = false;

        _this.init();
        _this.bindEvents();
    }


    $.extend(Plugin.prototype, {
        init: function () {
            var _this = this;

            _this.create();
        },

        bindEvents: function () {
            var _this = this;

            if(_this._pluginInitialized) {
                this.$btn.on('click', function (e) {
                    _this.sayHello(e);
                });
            }
        },

        create: function() {
            var _this = this,
                o = _this.settings;


            _this.$intro = $('<p>')
                .text(o.wrapper.text);

            _this.$btn = $('<button />')
                .addClass(o.button.cssClass)
                .text(o.button.text);

            _this.$wrapper = $('<div />')
                .addClass(o.wrapper.cssClass)
                .append(_this.$intro);

            _this.$element
                .append(_this.$wrapper)
                .append(_this.$btn);

            _this._pluginInitialized = true;
        },

        speak: function(message) {
            var _this = this,
                $p = $('<p>').text(message);

            _this.$wrapper
                .append($p);
        },

        sayHello: function(e) {
            this.speak(this.settings.hello);
        },

        sayCustomMessage: function(message) {
            this.speak(message);
        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        var params = Array.prototype.slice.call(arguments, 1);
        this.each(function () {
            var d = $.data(this, "plugin_" + pluginName);
            if (!d) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
            else if (options in d) {
                d[options].apply(d, params);
            }
        });

        // chain jQuery functions
        return this;
    };
})(jQuery, window);