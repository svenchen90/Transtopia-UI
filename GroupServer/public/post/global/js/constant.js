/**
 * 
 */
$.fn.modal.Constructor.DEFAULTS.backdrop = 'static';
const URLPrefix = location.origin + "/Utopia_Beta/web"
const ImageURLPrefix = location.origin + "/";

const URL_GET_TAGS = URLPrefix + "/common/get_all_tags"
const URL_GET_TITILES = URLPrefix + "/common/get_all_titles"
const URL_ADD_TAG = URLPrefix + "/common/all_single_tag"
const URL_ADD_TITLE = URLPrefix + "/common/add_single_title"
const URL_Logout=URLPrefix+"/user/logout"

function getCookieAttribute(name) {
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2)
		return parts.pop().split(";").shift();
}