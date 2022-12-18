export class AnimationUpdater {
	static elements: any[] = [];
	static animId: null;

	static addAll(list: any) {
		return Array.from(list).map((elem: any) =>
			AnimationUpdater.elements.push(elem));
	}

	static add(object: any) {
		if (!Array.from(AnimationUpdater.elements).includes(object)) {
			return AnimationUpdater.elements.push(object);
		}
	}

	static run(force: boolean) {
		// 'force' can take three values, for which these paths should be taken
		//   true: Force repaint of the gauges (typically on first Gauge.set)
		//   false: Schedule repaint (2nd or later call to Gauge.set)
		//   a number: It's a callback. Repaint and schedule new callback if not done.
		if (force == null) { force = false; }
		const isCallback = isFinite(parseFloat(force));
		if (isCallback || (force === true)) {
			let k: number;
			let finished = true;
			const toRemove = [];
			for (k = 0; k < AnimationUpdater.elements.length; k++) {
				const elem = AnimationUpdater.elements[k];
				if (elem.update(force === true)) {
					finished = false;
				} else {
					toRemove.push(k);
				}
			}

			// Remove finished elements
			for (let i = toRemove.length - 1; i >= 0; i--) {
				k = toRemove[i];
				AnimationUpdater.elements.splice(k, 1);
			}

			return AnimationUpdater.animId = finished ? null : requestAnimationFrame(AnimationUpdater.run);
		} else if (force === false) {
			if (AnimationUpdater.animId === !null) {
				// Cancel pending callback if animId is already set to avoid overflow
				cancelAnimationFrame(AnimationUpdater.animId);
			}
			return AnimationUpdater.animId = requestAnimationFrame(AnimationUpdater.run);
		}
	}
};