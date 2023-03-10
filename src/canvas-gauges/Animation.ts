/**
 * @ignore
 * @typedef {object} ns
 */


/**
 * Generic AnimationRule function interface
 *
 * @typedef {function(percent: number): number} AnimationRule
 */

/**
 * Callback for animation step draw event.
 * It will be called each time animation step is executed, bypassing
 * as first argument a percent of animation completeness. It is expected
 * that this callback will do an actual work of animating an elements or
 * whatever, as far as animation engine is just calculating and executing
 * animation steps without any knowledge about things under animation.
 *
 * @typedef {function(percent: number): *} DrawEventCallback
 */

/**
 * Callback for animation complete event.
 * It is called once each animation is complete.
 *
 * @typedef {function(): *} EndEventCallback
 */

/**
 * Predefined known animation rules.
 * It's a simple collection of math for some most used animations.
 *
 * @typedef {{
 *   linear: AnimationRule,
 *   quad: AnimationRule,
 *   dequad: AnimationRule,
 *   quint: AnimationRule,
 *   dequint: AnimationRule,
 *   cycle: AnimationRule,
 *   decycle: AnimationRule,
 *   bounce: AnimationRule,
 *   debounce: AnimationRule,
 *   elastic: AnimationRule,
 *   delastic: AnimationRule,
 * }} AnimationRules
 */

/* istanbul ignore next: no reason covering this */
let rules = {
    linear: p => p,
    quad: p => Math.pow(p, 2),
    dequad: p => 1 - rules.quad(1 - p),
    quint: p => Math.pow(p, 5),
    dequint: p => 1 - Math.pow(1 - p, 5),
    cycle: p => 1 - Math.sin(Math.acos(p)),
    decycle: p => Math.sin(Math.acos(1 - p)),
    bounce: p => 1 - rules.debounce(1 - p),
    //@ts-ignore
    debounce: p => {
        let a = 0, b = 1;
        for (; 1; a += b, b /= 2) {
            if (p >= (7 - 4 * a) / 11) {
                return -Math.pow((11 - 6 * a - 11 * p) / 4, 2) +
                    Math.pow(b, 2);
            }
        }
    },
    elastic: p => 1 - rules.delastic(1 - p),
    delastic: p => {
        let x = 1.5;
        return Math.pow(2, 10 * (p - 1)) *
            Math.cos(20 * Math.PI * x / 3 * p);
    }
};

/* istanbul ignore next: private, not testable */
/**
 * Evaluates animation step and decides if the next step required or
 * stops animation calling a proper events.
 *
 * @access private
 * @param {number} time
 * @param {DrawEventCallback} draw
 * @param {number} start
 * @param {AnimationRule} rule
 * @param {number} duration
 * @param {EndEventCallback} end
 * @param {Animation} anim
 */
function step(
    time,
    draw,
    start,
    rule,
    duration,
    end,
    anim
) {
    if (typeof rule !== 'function') {
        throw new TypeError('Invalid animation rule:', rule);
    }

    let progress = time - start;
    let percent = progress / duration;
    let animationTransformed = 0;

    if (percent > 1) {
        percent = 1;
    }

    if (percent !== 1) {
        animationTransformed = rule(percent);

        // make sure we have correct number after applying animation
        // transformation
        if (isFinite(animationTransformed) && !isNaN(animationTransformed)) {
            percent = animationTransformed;
        }
    }

    draw && draw(percent);

    if (progress < duration) {
        anim.frame = requestAnimationFrame(time =>
            step(time, draw, start, rule, duration, end, anim)
        );
    }

    else {
        end && end();
        anim.inProgress = false;
    }
}

/**
 * Animation engine API for JavaScript-based animations.
 * This is simply an animation core framework which simplifies creation
 * of various animations for generic purposes.
 *
 * @example
 * // create 'linear' animation engine, 500ms duration
 * let linear = new Animation('linear', 500);
 *
 * // create 'elastic' animation engine
 * let elastic = new Animation('elastic');
 *
 * // define animation behavior
 * let bounced = new Animation('bounce', 500, percent => {
 *     let value = parseInt(percent * 100, 10);
 *
 *     $('div.bounced').css({
 *         width: value + '%',
 *         height: value + '%'
 *     });
 * });
 *
 * // execute animation
 * bounced.animate();
 *
 * // execute animation and handle when its finished
 * bounced.animate(null, () => {
 *    console.log('Animation finished!');
 * });
 */
export default class Animation {

    /**
     * @constructor
     * @param {string|AnimationRule} rule
     * @param {number} duration
     * @param {DrawEventCallback} [draw]
     * @param {EndEventCallback} [end]
     */
    constructor(rule = 'linear', duration = 250, draw = (()=>{}),
                end = (()=>{}))
    {
        /**
         * Overall animation duration in milliseconds.
         * By default is equal to 250 ms.
         *
         * @type {number}
         */
        //@ts-ignore
        this.duration = duration;

        /**
         * Animation rule. By default is linear animation.
         * Animation rule is a subject to animation rules, which are
         * a simple object containing math-based methods for calculating
         * animation steps.
         *
         * @type {string|AnimationRule}
         */
        //@ts-ignore
        this.rule = rule;

        /**
         * Callback function for the animation step draw event.
         *
         * @type {DrawEventCallback}
         */
        //@ts-ignore
        this.draw = draw;

        /**
         * Callback for the animation complete event.
         *
         * @type {EndEventCallback}
         */
        //@ts-ignore
        this.end = end;

        //@ts-ignore
        if (typeof this.draw !== 'function') {
            //@ts-ignore
            throw new TypeError('Invalid animation draw callback:', draw);
        }

        //@ts-ignore
        if (typeof this.end !== 'function') {
            //@ts-ignore
            throw new TypeError('Invalid animation end callback:', end);
        }
    }

    /* istanbul ignore next: non-testable */
    /**
     * Performs animation calling each animation step draw callback and
     * end callback at the end of animation. Callbacks are optional to this
     * method call. If them are not bypassed will be used that ones which
     * was pre-set on constructing an Animation object or pre-set after
     * construction.
     *
     * @example
     * function draw(percent) {
     *     $('.my-animated-divs').css({
     *         width: parseInt(percent * 100, 10) + '%'
     *     });
     * }
     * function done() {
     *     console.log('Animation complete!');
     * }
     *
     * // Define 'draw' and 'end' callbacks on construction
     * var animation = new Animation('cycle', 500, draw, done);
     * animation.animate();
     *
     * // Define 'draw' and 'end' callbacks after construction
     * var animation = new Animation('cycle', 500);
     * animation.draw = draw;
     * animation.end = done;
     * animation.animate();
     *
     * // Define 'draw' and 'end' callbacks at animation
     * var animation = new Animation('cycle', 500);
     * animation.animate(draw, done);
     *
     * @param {DrawEventCallback} [draw]
     * @param {EndEventCallback} [end]
     */
    animate(draw, end) {
        //@ts-ignore
        this.frame && this.cancel();

        // noinspection JSUnresolvedVariable
        const start = window.performance && window.performance.now ?
                window.performance.now() :
                //@ts-ignore
                (vendorize('animationStartTime') || Date.now());

                //@ts-ignore
        draw = draw || this.draw;
        //@ts-ignore
        end = end || this.end;

        //@ts-ignore
        this.draw = draw;
        //@ts-ignore
        this.end = end;

        /**
         * Current requested animation frame identifier
         *
         * @type {number}
         */
        //@ts-ignore
        this.frame = requestAnimationFrame(time =>
            //@ts-ignore
            step(time, draw, start, rules[this.rule] || this.rule,
                //@ts-ignore
                this.duration, end, this));
    }

    /**
     * Cancels current animation if any
     */
    cancel() {
        //@ts-ignore
        if (this.frame) {
            //@ts-ignore
            const cancelAnimationFrame = vendorize('cancelAnimationFrame') ||
                /* istanbul ignore next */
                ((id) => {});

                //@ts-ignore
            cancelAnimationFrame(this.frame);
            //@ts-ignore
            this.frame = null;
        }
    }

    /**
     * Destroys this object properly
     */
    destroy() {
        this.cancel();
        //@ts-ignore
        this.draw = null;
        //@ts-ignore
        this.end = null;
    }
}

/**
 * Animation rules bound statically to Animation constructor.
 *
 * @type {AnimationRules}
 * @static
 */
//@ts-ignore
Animation.rules = rules;

module.exports = Animation;