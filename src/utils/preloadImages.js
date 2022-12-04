const preloadImages = (imgList, underway, accomplish) => {
	const loadImage = (src) =>
		new Promise((res, rej) => {
			const img = new Image();

			img.onload = () => res(img);
			img.onerror = () => rej(`Image src not defined: ${src}`);
			img.src = src;
		});

	function* fn() {
		for (let i = 0; i < imgList.length; i++) {
			yield loadImage(imgList[i]);
		}
	}
	const resume = async (result, load) => {
		const img = await result;
        const { value } = load.next();

        underway && underway(img);

        if (value) resume(value, load);
        else accomplish && accomplish();
    };

	const load = fn();
	const { value } = load.next();

	resume(value, load);
};

export default preloadImages;
