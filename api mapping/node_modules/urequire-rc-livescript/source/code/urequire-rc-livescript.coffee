LiveScript = require 'LiveScript'

# The alternative, even shorter `[]` way
# See also http://github.com/anodynos/urequire-rc-coffee-script &
# http://urequire.org/resourceconverters.coffee#the-alternative-less-verbose-array-way

module.exports = [
    '$LiveScript'

    [ '**/*.ls'] # if pos 1 is Array, its `filez` (& undefined `descr`)

    # `convert` Function at pos 2
    (m)-> LiveScript.compile m.converted, @options

    # if `convFilename` is String starting with '.',
    # it denotes an extension replacement of `dstFilename`
    # if `~` flag was used, eg `~.js`, ext replacement
    # would be applied on `srcFilename`
    '.js'
  ]