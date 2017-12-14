const deepmerge = require('deepmerge')

exports.description = 'Setup grunt, linter, editorconfig etc in your electron-forge project'

exports.notes = 'Make sure you initialized your project with _electron-forge init projectname_.'

exports.template = function(grunt, init, done) {
  init.process({}, [
    // init.prompt('description'),
    // init.prompt('repository'),
     init.prompt('author_name'),
    // init.prompt('homepage'),
    // init.prompt('licenses')

  ], function(err, props) {

    props.devDependencies = {
      'stylelint': 'latest',
      'stylelint-config-standard': 'latest',
      'eslint-config-standard': 'latest',
      'eslint-plugin-html': 'latest',
      'eslint-plugin-import': 'latest',
      'eslint-plugin-jsx-a11y': 'latest',
      'eslint-plugin-markdown': 'latest',
      'eslint-plugin-node': 'latest',
      'eslint-plugin-promise': 'latest',
      'eslint-plugin-react': 'latest',
      'eslint-plugin-standard': 'latest'
    }

    const files = init.filesToCopy(props)
    init.addLicenseFiles(files, ['MIT'])
    init.copyAndProcess(files, props)

    const pkg = grunt.file.readJSON('./package.json')
    delete pkg.devDependencies['eslint-config-airbnb']

    grunt.file.delete('node_modules')
    const newPackage = deepmerge(pkg, props)
    init.writePackageJSON('package.json', newPackage, () => {return newPackage})

    done()
  })
}
