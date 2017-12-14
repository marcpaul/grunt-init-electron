const deepmerge = require('deepmerge')

exports.description = 'Setup grunt, linter, editorconfig etc in your electron-forge project'

exports.notes = 'Make sure you initialized your project with _electron-forge init projectname_.'

exports.template = function(grunt, init, done) {
  init.process({}, [
    init.prompt('description'),
    {
      name: 'travis',
      message: 'Will this project be tested with Travis CI?',
      default: 'Y/n',
      warning: 'If selected, you must enable Travis support for this project in https://travis-ci.org/profile'
    },
    {
      name: 'snyk',
      message: 'Add snyk for vulnerability testing?',
      default: 'Y/n',
      warning: 'If selected, you must enable project on snyk'
    }
  ], function(err, props) {
    const target = grunt.option('target')
    props.travis = /y/i.test(props.travis)
    props.snyk = /y/i.test(props.snyk)

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

    if (props.snyk) {
      Object.assign(props.devDependencies, {'snyk': 'latest'})
    }

    const files = init.filesToCopy(props)
    init.copyAndProcess(files, props)

    if (target === 'electron') {
      const pkg = grunt.file.readJSON('./package.json')
      pkg.config.forge.github_repository.owner = pkg.author
      pkg.config.forge.github_repository.name = pkg.name
      pkg.scripts.start = 'ELECTRON_IS_DEV=true electron-forge start'
      delete pkg.devDependencies['eslint-config-airbnb']
      delete props.travis
      delete props.snyk
      if (grunt.file.exists('node_modules')) {
        grunt.file.delete('node_modules')
      }
      const newPackage = deepmerge(pkg, props)
      init.writePackageJSON('package.json', newPackage, () => {return newPackage})
    }

    done()
  })
}
