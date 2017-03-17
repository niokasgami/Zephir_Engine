
/**
 * The static class who handles Zephir config loading
 * 
 * @static
 */
function ZephirManager() {
    throw new Error('this a static class');
}

ZephirManager._errorUrl = null;

ZephirManager._dataConfigFiles = [
    { name: 'splashScreen', src: 'splashScreen.json', path: 'splashScreen/' },
    { name: 'titleScreen', src: 'titlescreen.json', path: 'titlescreen/' }
];

ZephirManager.init = function () {
    this.loadConfigData();
};

ZephirManager.loadConfigData = function () {
    for (var i = 0; i < this._dataConfigFiles.length; i++) {
        var name = this._dataConfigFiles[i].name;
        var src = this._dataConfigFiles[i].src;
        var path = this._dataConfigFiles[i].path;
        this.loadConfigFile(name, src, path);
    }
};

ZephirManager.loadConfigFile = function (name, src, path) {
    var xhr = new XMLHttpRequest();
    var url = 'data/zephir/' + path + src;
    xhr.open('GET', url);
    xhr.overrideMimeType('application/json');
    xhr.onload = function () {
        if (xhr.status < 400) {
            Zephir.globals[name] = JSON.parse(xhr.responseText);
        }
    };
    xhr.onerror = function () {
        ZephirManager._errorUrl = ZephirManager._errorUrl || url;
    };
    Zephir.globals[name] = null;
    xhr.send();
};

ZephirManager.isConfigFilesLoaded = function () {
    this.checkError();
    for (var i = 0; i < this._dataConfigFiles.length; i++) {
        if (!Zephir.globals[this._dataConfigFiles[i].name]) {
            return false;
        }
    }
    return true;
};

ZephirManager.checkError = function () {
    if (ZephirManager._errorUrl) {
        throw new Error('Failed to load: ' + ZephirManager._errorUrl);
    }
};
