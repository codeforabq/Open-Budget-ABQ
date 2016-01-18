module.exports = {

	/*
	 * getSlugName get the slug from a name
	 *
	 * @param   name   the name
	 * @return         the slug
	 */
	getSlugName: function(name) {
		return name.toLowerCase().trim().replace(/\s/g, '-');
	}

};