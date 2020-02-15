import Storage from 'web-storage-cache'

const localStorage = new Storage()

export function getLocalStorage(key) {
	return localStorage.get(key)
}

export function setLocalStorage(key, value, expire = 30 * 24 * 3600) {
	return localStorage.set(key, value, {exp: expire})
}

export function removeLocalStorage(key) {
	return localStorage.delete(key)
}

export function clearLocalStorage() {
	return localStorage.clear()
}

export function getHome() {
	return getLocalStorage('home')
}

export function saveHome(home) {
	return setLocalStorage('home', home, 1800)
}

export function getLocation(fileName) {
	return getBookObject(fileName, 'location')
}

export function saveLocation(fileName, location) {
	setBookObject(fileName, 'location', location)
}

export function getBookmark(fileName) {
	return getBookObject(fileName, 'bookmark')
}

export function saveBookmark(fileName, bookmark) {
	setBookObject(fileName, 'bookmark', bookmark)
}

export function getReadTime(fileName) {
	return getBookObject(fileName, 'time')
}

export function saveReadTime(fileName, theme) {
	setBookObject(fileName, 'time', theme)
}

export function getProgress(fileName) {
	return getBookObject(fileName, 'progress')
}

export function saveProgress(fileName, progress) {
	setBookObject(fileName, 'progress', progress)
}

export function getNavigation(fileName) {
	return getBookObject(fileName, 'navigation')
}

export function saveNavigation(fileName, navigation) {
	setBookObject(fileName, 'navigation', navigation)
}

export function getMetadata(fileName) {
	return getBookObject(fileName, 'metadata')
}

export function saveMetadata(fileName, metadata) {
	setBookObject(fileName, 'metadata', metadata)
}

export function getCover(fileName) {
	return getBookObject(fileName, 'cover')
}

export function saveCover(fileName, cover) {
	setBookObject(fileName, 'cover', cover)
}

export function getFontName() {
	return getBookObject('setting', 'fontName')
}

export function saveFontName(fontName) {
	setBookObject('setting', 'fontName', fontName)
}

export function getTheme() {
	return getBookObject('setting', 'theme')
}

export function saveTheme(theme) {
	setBookObject('setting', 'theme', theme)
}

export function getFontSize() {
	return getBookObject('setting', 'fontSize')
}

export function saveFontSize(fontSize) {
	setBookObject('setting', 'fontSize', fontSize)
}

// export function saveSectionName(fileName, sectionName) {
// 	setBookObject(fileName, 'sectionName', sectionName)
// }
//
// export function getSectionName(fileName) {
// 	getBookObject(fileName, 'sectionName')
// }

export function getBookObject(fileName, key) {
	let book = getLocalStorage(`${fileName}-info`)
	if (book) {
		return book[key]
	} else {
		return null
	}
}

export function setBookObject(fileName, key, value) {
	let book = getLocalStorage(`${fileName}-info`)
	if (!book) {
		book = {}
	}
	book[key] = value
	setLocalStorage(`${fileName}-info`, book)
}
