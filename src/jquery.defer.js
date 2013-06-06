;(function ($, undefined) {
    var slice = Array.prototype.slice;
    $.defer = function ( /*[func] [, delay] [, funcParameters]*/ ) {
        var args = arguments,
            isFunc = $.isFunction(args[0]),
            func = isFunc ? args[0] : $.noop,
            delay = (isFunc ? args[1] : args[0]) || 0,
            funcArgs = isFunc ? slice.call(args, 2) : undefined,
            isCancelled = false,
            cancel = function (reject /* = true */ ) {
                clearTimeout(timerId);
                isCancelled = true;
                if ((!arguments.length || reject) && deferred.state() === "pending") {
                    deferred.reject(null, promise, funcArgs);
                }
            },
            deferred = $.Deferred(),
            timerId = setTimeout(function () {
                deferred.notify(promise, funcArgs);
                if (isCancelled) {
                    return;
                }
                try {
                    var result = func.apply(this, funcArgs);
                    deferred.resolve(result, promise, funcArgs);
                } catch (e) {
                    deferred.reject(e, promise, funcArgs);
                }
            }, delay),
            promise = $.extend(deferred.promise(), {
                cancel: cancel
            });
        return promise;
    };
})(jQuery);
