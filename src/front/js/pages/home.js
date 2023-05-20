import React from "react";
import catImageUrl from "../../img/cat-gallery.jpg";
import "../../styles/home.css";

export const Home = () => {

	return (
		<div className="text-center mt-5">
			<h1>The CatGallery</h1>
			<p >
				<img className="w-25" src={catImageUrl} />
			</p>
		</div>
	);
};
