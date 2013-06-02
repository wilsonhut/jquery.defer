(function ($) {
    var slice = Array.prototype.slice;
    $.defer = function (func, delay) {
        var args = slice.call(arguments, 2),
            isCancelled = false,
            cancel = function (reject /* = true */) {
                clearTimeout(timerId);
                isCancelled = true;
                if ((!arguments.length || reject) && deferred.state() === "pending") {
                    deferred.reject(null, promise, args);
                }
            },
            deferred = $.Deferred(),
            timerId = setTimeout(function () {
                deferred.notify(promise, args);
                if (isCancelled) {
                    return;
                }
                try {
                    var result = func.apply(this, args);
                    deferred.resolve(result, promise, args);
                } catch (e) {
                    deferred.reject(e, promise, args);
                }
            }, delay),
            promise = deferred.promise();

        promise.cancel = cancel;
        return promise;
    };
})(jQuery);
