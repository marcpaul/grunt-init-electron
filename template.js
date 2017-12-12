exports.description = 'Setup grunt, linter, editorconfig etc in your electron-forge project'

exports.notes = 'Make sure you initialized your project with _electron-forge init projectname_.'

// exports.warnOn = '*'

exports.template = function(grunt, init, done) {
  init.process({}, [
    init.prompt('description'),
    init.prompt('repository'),

  ], function(err, props) {

    props.devDependencies = {
      'stylelint': 'latest',
      'stylelint-config-standard': 'latest'
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

    const pkg = grunt.file.readJSON('./back/package.json')

    const test = Object.assign(pkg, props)

    init.writePackageJSON('package.json', test)

    done()
  })
}
