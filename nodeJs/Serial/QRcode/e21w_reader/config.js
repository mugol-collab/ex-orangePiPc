const fs = require('fs')
const exec = require('child_process').exec
const { resolve } = require('path')

const INDENT_ENDPOINT = 'endpoint'
const DEFAULT_ENDPOINT = 'http://localhost/metodos/processinfo'
const INDENT_TIMEROUT_SAME_BUFFER = 'timerOutSameBuffer'
const DEFAULT_TIMEROUT_SAME_BUFFER = 1000

class config {

  constructor(path) {

    this._path = path

    if (fs.existsSync(this._path))
      this._config = JSON.parse(fs.readFileSync(this._path, 'utf-8'))
    else {
      this._config = {};
    }

    //check configs sections
    this._timerSave = null;

    this.config.endpoint = this.readAndWrite(INDENT_ENDPOINT, DEFAULT_ENDPOINT);
    this.config.timerOutSameBuffer = this.readAndWrite(INDENT_TIMEROUT_SAME_BUFFER, DEFAULT_TIMEROUT_SAME_BUFFER);

  }

  get config() {
    return this._config
  }

  set config(value) {
    console.log(value);

    const keys = Object.keys(value);
    keys.forEach(ident => {
      this._config[ident] = value[ident]
    });

    this.save();
  }

  get endpoint() { return this._config.endpoint }
  set endpoint(value) { if (value === undefined) return; this._config.endpoint = value; this.save(); }

  get timerOutSameBuffer() { return this._config.timerOutSameBuffer }
  set timerOutSameBuffer(value) { if (value === undefined) return; this._config.timerOutSameBuffer = value; this.save(); }


  readAndWrite(ident, defaultValue) {
    if (!(ident in this._config)) {
      this._config[ident] = defaultValue;
      this.save()
    }
    return this._config[ident];
  };


  // save() {

  //   try {

  //     fs.writeFileSync(this._path, JSON.stringify(this._config, null, 2))

  //     exec("sync", function (error, stdout, stderr) {
  //       if (error) {
  //         console.log('sync...Error')
  //         console.error(error);
  //         return;
  //       }
  //       console.log('sync...OK')
  //     });

  //   } catch (error) {
  //     console.log("config save error")
  //   }

  // }

  save() {
    if (this._timerSave) {
        console.log('[Config] debounce')
        clearTimeout(this._timerSave);
    }
    this._timerSave = setTimeout(() => {
        console.log('[Config] write file...')
        try {
            fs.writeFileSync(this._path, JSON.stringify(this._config, null, 2))
            console.log('[Config] write file...OK')
        } catch (error) {
            console.log('[Config] write file...Error')
            console.error(error);
        }
        console.log('[Config] sync...')
        exec("sync", function (error, stdout, stderr) {
            if (error) {
                console.log('[Config] sync...Error')
                console.error(error);
                return;
            }
            //if (stdout) console.log('sync ', stdout);
            console.log('[Config] sync...OK')
        });
    }, 200);

};
}

module.exports = new config(resolve(__dirname, 'config.json'))