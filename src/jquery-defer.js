(function ($) {
    var slice = Array.prototype.slice;
    $.defer = function (func, delay) {
        var args = slice.call(arguments, 2),
            cancel = function (reject /* = true */) {
                clearTimeout(timerId);
                if ((!arguments.length || reject) && deferred.state() === "pending") {
                    deferred.reject(null, promise, args);
                }
            },
            deferred = $.Deferred(),
            timerId = setTimeout(function () {
                deferred.notify(promise, args);
                // if they cancel inside the progress call-back...
                if (deferred.state() === "rejected") {
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