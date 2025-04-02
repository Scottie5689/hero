/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save() {
	return (
		<div { ...useBlockProps.save() }>
				<div className="hero__text">
					<h2 className="wp-block-heading">Welcome</h2>
					<h2 className="herp__title-1">Marketing</h2>
					<h2 className="herp__title-2">Design</h2>
					<h2 className="herp__title-2">Development</h2>
					<p>Welcome to my portfolio. I am Scott Vosburgh, a creative marketer specializing in technology and design. My current role is Marketing Director for Sierra-Olympia Technologies where I develop the web experience, content and help craft all levels of the customer funnel. My skills have helped me work with or lead digital teams and marketing campaigns with different agencies and in house marketing groups. I hold a BFA in Graphic Design from Columbia College Chicago.</p>
					<p>My goal is to craft high-quality marketing material with data to learn what captivates and engages people.</p>
				</div>
				<div class="hero__laptop">
					<div id="laptop-container"></div>
				</div>
		</div>
	);
}
