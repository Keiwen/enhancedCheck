+function($) {
    'use strict';

    // TOGGLE PUBLIC CLASS DEFINITION
    // ==============================

    var Toggle = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, this.defaults(), options);
        this.render();
    };

    Toggle.DEFAULTS = {
        on: 'On',
        off: 'Off',
        onstyle: 'primary',
        offstyle: 'default',
        size: '',
        style: '',
        width: null,
        height: null,
        disabled: false,
        ngDisabled: null,
    };

    Toggle.prototype.defaults = function() {
        return {
            on: this.$element.attr('data-on') || Toggle.DEFAULTS.on,
            off: this.$element.attr('data-off') || Toggle.DEFAULTS.off,
            onstyle: this.$element.attr('data-onstyle') || Toggle.DEFAULTS.onstyle,
            offstyle: this.$element.attr('data-offstyle') || Toggle.DEFAULTS.offstyle,
            size: this.$element.attr('data-size') || Toggle.DEFAULTS.size,
            style: this.$element.attr('data-style') || Toggle.DEFAULTS.style,
            width: this.$element.attr('data-width') || Toggle.DEFAULTS.width,
            height: this.$element.attr('data-height') || Toggle.DEFAULTS.height,
            disabled: this.$element.attr('disabled') || Toggle.DEFAULTS.disabled,
            ngDisabled: this.$element.attr('ng-disabled')
                || this.$element.attr('data-ng-disabled')
                || this.$element.attr('x-ng-disabled')
                || Toggle.DEFAULTS.ngDisabled
        };
    };

    Toggle.prototype.render = function() {
        this.btnonstyle = 'btn-' + this.options.onstyle;
        this.btnoffstyle = 'btn-' + this.options.offstyle;
        this.btnsize = this.options.size ? 'btn-' + this.options.size : '';
        var $toggleOn = $('<label class="btn">').html(this.options.on)
            .addClass(this.btnonstyle).addClass(this.btnsize);
        var $toggleOff = $('<label class="btn">').html(this.options.off)
            .addClass(this.btnoffstyle).addClass(this.btnsize).addClass('active');
        var $toggleHandle = $('<span class="enhancedCheck-toggle-handle btn btn-default">')
            .addClass(this.btnsize);
        var $toggleGroup = $('<div class="enhancedCheck-toggle-group">')
            .append($toggleOn, $toggleOff, $toggleHandle);
        var $toggle = $('<div class="enhancedCheck-toggle-container btn" data-toggle="toggle">')
            .addClass( this.$element.prop('checked') ? this.btnonstyle : this.btnoffstyle+' off' )
            .addClass(this.btnsize);
        if(this.options.disabled) $toggle.attr('disabled', true);
        if(this.options.ngDisabled) $toggle.attr('ng-disabled', this.options.ngDisabled);
        if(this.options.style) $toggle.addClass('enhancedCheck-toggle-style-' + this.options.style);

        this.$element.wrap($toggle);
        $.extend(this, {
            $toggle: this.$element.parent(),
            $toggleOn: $toggleOn,
            $toggleOff: $toggleOff,
            $toggleGroup: $toggleGroup
        });
        this.$toggle.append($toggleGroup);

        var width = this.options.width || Math.max($toggleOn.outerWidth(), $toggleOff.outerWidth())+($toggleHandle.outerWidth()/2);
        var height = this.options.height || Math.max($toggleOn.outerHeight(), $toggleOff.outerHeight());
        $toggleOn.addClass('enhancedCheck-toggle-on');
        $toggleOff.addClass('enhancedCheck-toggle-off');
        this.$toggle.css({ width: width, height: height });
        if(this.options.height) {
            $toggleOn.css('line-height', $toggleOn.height() + 'px');
            $toggleOff.css('line-height', $toggleOff.height() + 'px');
        }
        this.update(true);
        this.trigger(true);
    };

    Toggle.prototype.toggle = function() {
        if(this.$element.prop('checked')) {
            this.off();
        } else {
            this.on();
        }
    };

    Toggle.prototype.on = function(silent) {
        if(this.$element.prop('disabled')) return false;
        this.$toggle.removeClass(this.btnoffstyle + ' off').addClass(this.btnonstyle);
        this.$element.prop('checked', true);
        if(!silent) this.trigger();
    };

    Toggle.prototype.off = function(silent) {
        if(this.$element.prop('disabled')) return false;
        this.$toggle.removeClass(this.btnonstyle).addClass(this.btnoffstyle + ' off');
        this.$element.prop('checked', false);
        if(!silent) this.trigger();
    };

    Toggle.prototype.enable = function() {
        this.$toggle.removeAttr('disabled');
        this.$element.prop('disabled', false);
    };

    Toggle.prototype.disable = function() {
        this.$toggle.attr('disabled', 'disabled');
        this.$element.prop('disabled', true);
    };

    Toggle.prototype.update = function(silent) {
        if(this.$element.prop('disabled')) {
            this.disable();
        } else {
            this.enable();
        }
        if(this.$element.prop('checked')) {
            this.on(silent);
        } else {
            this.off(silent);
        }
    };

    Toggle.prototype.trigger = function(silent) {
        this.$element.off('change.bs.toggle');
        if(!silent) this.$element.change();
        this.$element.on('change.bs.toggle', $.proxy(function() {
            this.update();
        }, this));
    };

    Toggle.prototype.destroy = function() {
        this.$element.off('change.bs.toggle');
        this.$toggleGroup.remove();
        this.$element.removeData('bs.toggle');
        this.$element.unwrap();
    };

    // TOGGLE PLUGIN DEFINITION
    // ========================

    function Plugin(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('bs.toggle');
            var options = (typeof option == 'object' && option);

            if(!data) $this.data('bs.toggle', (data = new Toggle(this, options)));
            if(typeof option == 'string' && data[option]) data[option]();
        })
    };

    var old = $.fn.bootstrapToggle;

    $.fn.bootstrapToggle = Plugin;
    $.fn.bootstrapToggle.Constructor = Toggle;

    // TOGGLE NO CONFLICT
    // ==================

    $.fn.toggle.noConflict = function() {
        $.fn.bootstrapToggle = old;
        return this;
    };

    // TOGGLE DATA-API
    // ===============

    $(function() {
        $('input[type=checkbox].enhancedCheck-toggle').bootstrapToggle();
    });

    $(document).on('click.bs.toggle', 'div.enhancedCheck-toggle-container', function(e) {
        var $checkbox = $(this).find('input[type=checkbox].enhancedCheck-toggle');
        $checkbox.bootstrapToggle('toggle');
        e.preventDefault();
    });

}(jQuery);